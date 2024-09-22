from app import db
from marshmallow import Schema, fields, validate, ValidationError
from bson import ObjectId

# Define Video Schema using Marshmallow
class VideoSchema(Schema):
    title = fields.Str(required=True)
    url = fields.Url(required=True, validate=validate.URL())
    

# Video model with database interaction methods
class VideoModel:
    schema = VideoSchema()

    @staticmethod
    def find_by_id(video_id):
        if ObjectId.is_valid(video_id):
            return db.videos.find_one({"_id": ObjectId(video_id)})
        return None

    @staticmethod
    def find_by_title(title):
        return db.videos.find_one({"title": title})

    @staticmethod
    def create_video(data):
        try:
            # Validate the incoming data
            validated_data = VideoModel.schema.load(data)
            db.videos.insert_one(validated_data)
            return {"message": "Video created successfully!"},validated_data
        except ValidationError as err:
            return {"errors": err.messages}, 400

    @staticmethod
    def update_video(video_id, data):
        db.videos.update_one({"_id": ObjectId(video_id)}, {"$set": data})

    @staticmethod
    def delete_video(video_id):
        db.videos.delete_one({"_id": ObjectId(video_id)})
