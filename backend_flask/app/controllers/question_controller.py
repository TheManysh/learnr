from langchain.chains import RetrievalQA
from langchain_community.document_loaders.youtube import YoutubeLoader, TranscriptFormat
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from langchain.vectorstores import Chroma
import logging
from ..config import Config

# Set up logging
logging.basicConfig(level=logging.INFO)

# Set up your Google API Key
GOOGLE_API_KEY = Config.GOOGLE_API_KEY
model = ChatGoogleGenerativeAI(model="gemini-1.5-flash", google_api_key=GOOGLE_API_KEY)

def load_youtube_transcript(video_url):
    loader = YoutubeLoader.from_youtube_url(
        video_url,
        add_video_info=True,
        transcript_format=TranscriptFormat.CHUNKS,
        chunk_size_seconds=15,
    )
    documents = loader.load()
    for idx, doc in enumerate(documents):
        start_time = idx * 15
        end_time = start_time + 15
        doc.metadata['start_time'] = start_time
        doc.metadata['end_time'] = end_time
    return documents

def create_vector_index(texts, metadata):
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001", google_api_key=GOOGLE_API_KEY)
    vector_index = Chroma.from_texts(texts, embeddings, metadatas=metadata).as_retriever(search_kwargs={"k": 1})
    return vector_index

def initialize_qa_chain(video_url):
    documents = load_youtube_transcript(video_url)
    texts = [doc.page_content for doc in documents]
    metadata = [doc.metadata for doc in documents]
    vector_index = create_vector_index(texts, metadata)

    qa_chain = RetrievalQA.from_chain_type(
        llm=model,
        retriever=vector_index,
        return_source_documents=True
    )

    return qa_chain

def get_answer(video_url, question):
    qa_chain = initialize_qa_chain(video_url)
    result = qa_chain({"query": question})
    return result
