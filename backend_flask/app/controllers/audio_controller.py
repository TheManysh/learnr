from flask import request, jsonify
from app.models.audio import AudioModel

# Function to create an audio entry
def create_audio(request):
    data = request.get_json()
    result = AudioModel.create_audio(data)

    if isinstance(result, tuple):  # Check for validation errors
        return jsonify(result), 400

    return jsonify(result), 201

# Function to edit an audio entry by ID
def edit_audio(audio_id,request):
    data = request.get_json()

    # Find the audio entry by ID
    audio = AudioModel.find_by_id(audio_id)
    if not audio:
        return jsonify({"message": "Audio not found."}), 404

    # Update the audio with the provided data
    AudioModel.update_audio(audio_id, data)
    return jsonify({"message": "Audio updated successfully!"}), 200

# Function to delete an audio entry by ID
def delete_audio(audio_id):
    audio = AudioModel.find_by_id(audio_id)
    if not audio:
        return jsonify({"message": "Audio not found."}), 404

    AudioModel.delete_audio(audio_id)
    return jsonify({"message": "Audio deleted successfully!"}), 200

# Function to get audio by video ID
def get_audios_by_video(video_id):
    audios = AudioModel.find_by_video_id(video_id)
    if not audios:
        return jsonify({"message": "No audios found for this video."}), 404

    return jsonify({"audios": audios}), 200
