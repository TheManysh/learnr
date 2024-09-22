# app/utils.py
from flask import jsonify
import google.generativeai as genai
from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import Chroma
from langchain.chains import RetrievalQA
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
import os
from ..config import Config

# Set up Google API Key
GOOGLE_API_KEY = Config.GOOGLE_API_KEY
print(GOOGLE_API_KEY) # Use environment variable
genai.configure(api_key=GOOGLE_API_KEY)

model = ChatGoogleGenerativeAI(model="gemini-1.5-flash", google_api_key=GOOGLE_API_KEY,temperature =0.2,convert_system_message_to_human=True)
vector_index = None
qa_chain = None

def process_pdf(request):
    global vector_index, qa_chain

    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files['file']
    if file.filename == '' or not file.filename.endswith('.pdf'):
        return jsonify({"error": "Invalid file type. Please upload a PDF."}), 400

    temp_pdf_path = os.path.join("uploads",file.filename)
    file.save(temp_pdf_path)

    pdf_loader = PyPDFLoader(temp_pdf_path)
    pages = pdf_loader.load_and_split()

    text_splitter = RecursiveCharacterTextSplitter(chunk_size=10000, chunk_overlap=1000)
    context = "\n\n".join(p.page_content for p in pages)
    texts = text_splitter.split_text(context)

    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001", google_api_key=GOOGLE_API_KEY)
    vector_index = Chroma.from_texts(texts, embeddings).as_retriever(search_kwargs={"k": 1})

    global qa_chain
    qa_chain = RetrievalQA.from_chain_type(
        model,
        retriever=vector_index,
        return_source_documents=True
    )

    os.remove(temp_pdf_path)
    return jsonify({"message": "PDF uploaded and processed successfully."}), 200

def ask_question(request):
    global qa_chain

    if qa_chain is None:
        return jsonify({"error": "No PDF has been processed. Please upload a PDF first."}), 400

    data = request.get_json()
    question = data.get("question")
    if not question:
        return jsonify({"error": "No question provided"}), 400

    result = qa_chain({"query": question})
    response = {
        "answer": result["result"],
        "source_documents": [
            {"content": doc.page_content[:20], "metadata": doc.metadata} for doc in result["source_documents"]
        ]
    }
    return jsonify(response)
