from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
import logging
import re
from langchain_google_genai import ChatGoogleGenerativeAI

from ..config import Config


def generate_quiz_from_transcript(transcript, qa_chain, num_questions=1):
    template = """
    You are a quiz generator. I will give you some text. 
    Your task is to create a quiz question with 4 multiple choice options based on the text.
    The correct answer should be clear from the provided text.
    Text: {text}
    """
    
    quiz_prompt = PromptTemplate(template=template, input_variables=["text"])
    GOOGLE_API_KEY= Config.GOOGLE_API_KEY
    questions_with_timestamps = []
    chunk_size = len(transcript) // num_questions
    model = ChatGoogleGenerativeAI(model="gemini-1.5-flash", google_api_key=GOOGLE_API_KEY)

    for i in range(num_questions):
        text_chunk = transcript[i * chunk_size: (i + 1) * chunk_size]
        llm_chain = LLMChain(llm=model, prompt=quiz_prompt)
        question_and_options = llm_chain.run(text_chunk)
        
        try:
            question, options_str = question_and_options.split("\n", 1)
            options = re.findall(r'[a-d]\) (.+)', options_str)
            if len(options) < 4:
                continue

            result = qa_chain({"query": question})
            relevant_chunk = result["source_documents"][0]
            start_time = relevant_chunk.metadata.get('start_time', None)
            end_time = relevant_chunk.metadata.get('end_time', None)

            questions_with_timestamps.append({
                "question": question.strip(),
                "options": options[:4],
                "correct_answer": options[4], 
                "start_time": start_time,
                "end_time": end_time
            })

        except Exception as e:
            logging.error(f"Error generating quiz: {e}")
            continue

    return questions_with_timestamps

def create_flashcards(quiz_data, days=[1, 3, 5]):
    flashcards = []
    
    for day in days:
        index = day - 1
        if index < len(quiz_data):
            flashcard = {
                "question": quiz_data[index]["question"],
                "answer": quiz_data[index]["correct_answer"],
                "start_time": quiz_data[index]["start_time"],
                "end_time": quiz_data[index]["end_time"]
            }
            flashcards.append(flashcard)
    
    return flashcards
