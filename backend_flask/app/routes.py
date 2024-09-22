# app/routes.py
from flask import  request, jsonify
import os

from .controllers.question_controller import get_answer, initialize_qa_chain, load_youtube_transcript
from .controllers.quiz_controller import create_flashcards, generate_quiz_from_transcript
from .controllers.courser_controller import create_course,edit_course,delete_course
from .controllers.quiz_controller import generate_quiz_from_transcript
from .controllers.video_controller import get_youtube_playlist
from .controllers.rag_controller import ask_question,process_pdf
from .controllers.audio_controller import create_audio,edit_audio,delete_audio,get_audios_by_video
from .controllers.image_controller import generate_image_url
from app import app
@app.route('/',  methods=['GET'])
def index():
    return 'Hello its working'

@app.route('/ask', methods=['POST'])
def ask():
    return ask_question(request)

@app.route('/upload_pdf', methods=['POST'])
def upload_pdf():
    return process_pdf(request)




# Course routes
@app.route('/courses', methods=['POST'])
def create_course_route():
    return create_course(request)

@app.route('/courses/<course_id>', methods=['PATHC'])
def edit_course_route(course_id):
    return edit_course(course_id,request)

@app.route('/courses/<course_id>', methods=['DELETE'])
def delete_course_route(course_id,request):
    return delete_course(course_id)



@app.route('/getPlaylist' ,methods=['POST'])
def extractPlaylist():
    data= request.get_json()
    return get_youtube_playlist(data['url'])



@app.route('/audio', methods=['POST'])
def add_audio():
    return create_audio(request)

@app.route('/audio/<audio_id>', methods=['PUT'])
def update_audio(audio_id):
    return edit_audio(audio_id,request)

@app.route('/audio/<audio_id>', methods=['DELETE'])
def remove_audio(audio_id):
    return delete_audio(audio_id)

@app.route('/video/<video_id>/audios', methods=['GET'])
def get_audios(video_id):
    return get_audios_by_video(video_id)

@app.route('/ask_question', methods=['POST'])
def ask_question():
    data = request.json
    video_url = data.get('video_url')
    question = data.get('question')

    result = get_answer(video_url, question)
    relevant_chunks = [{
        "start_time": doc.metadata.get('start_time', None),
        "end_time": doc.metadata.get('end_time', None),
        "content": doc.page_content[:200]
    } for doc in result["source_documents"]]

    response = {
        "answer": result["result"],
        "relevant_chunks": relevant_chunks
    }

    return jsonify(response)

@app.route('/generate_quiz_with_flashcards', methods=['POST'])
def generate_quiz_with_flashcards():
    data = request.json
    video_url = data.get('video_url')
    print(video_url)
    num_questions = data.get('num_questions', 5)
    days = data.get('days', [1, 3, 5])

    documents = load_youtube_transcript(video_url)
    full_transcript = " ".join([doc.page_content for doc in documents])
    qa_chain = initialize_qa_chain(video_url)

    quiz = generate_quiz_from_transcript(full_transcript, qa_chain, num_questions)
    flashcards = create_flashcards(quiz, days)

    response = {
        "quiz": quiz,
        "flashcards": flashcards
    }

    return jsonify(response)

@app.route('/generateimage/<title>',methods=['GET'])
def generate_image(title):
    prompt="generate image for course title"+title
    return generate_image_url(prompt=prompt)

