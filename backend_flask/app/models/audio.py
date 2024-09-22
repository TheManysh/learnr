from app import db
from marshmallow import Schema, fields, validate, ValidationError
from bson import ObjectId
from app.models.video import VideoSchema
# Define Audio Schema using Marshmallow
class AudioSchema(Schema):
    language = fields.Str(required=True)
    url = fields.Url(required=True)  
    video_id = fields.Nested(VideoSchema, required=True)

# Audio model with database interaction methods
class AudioModel:
    schema = AudioSchema()

    @staticmethod
    def find_by_id(audio_id):
        if ObjectId.is_valid(audio_id):
            return db.audios.find_one({"_id": ObjectId(audio_id)})
        return None

    @staticmethod
    def find_by_video_id(video_id):
        if ObjectId.is_valid(video_id):
            return list(db.audios.find({"video_id": video_id}))
        return None

    @staticmethod
    def create_audio(data):
        try:
            # Validate the incoming data
            validated_data = AudioModel.schema.load(data)
            db.audios.insert_one(validated_data)
            return {"message": "Audio created successfully!"}
        except ValidationError as err:
            return {"errors": err.messages}, 400

    @staticmethod
    def update_audio(audio_id, data):
        db.audios.update_one({"_id": ObjectId(audio_id)}, {"$set": data})

    @staticmethod
    def delete_audio(audio_id):
        db.audios.delete_one({"_id": ObjectId(audio_id)})
