from app import db
from marshmallow import Schema, fields, validate, ValidationError
from bson import ObjectId
from app.models.video import VideoSchema
from app.models.user import UserSchema

class CourseSchema(Schema):
    video_list = fields.List(fields.Nested(VideoSchema), required=True)
    created_by = fields.Nested(UserSchema, required=True)
    original_author = fields.Str(required=True)

class CourseModel:
    schema = CourseSchema()

    @staticmethod
    def find_by_id(course_id):
        # Find a course by its ObjectId
        return db.courses.find_one({"_id": ObjectId(course_id)})

 

    @staticmethod
    def create_course(data):
        try:
            validated_data = CourseModel.schema.load(data)
            db.courses.insert_one(validated_data)
            return {"message": "Course created successfully!"}
        except ValidationError as err:
            return {"errors": err.messages}, 400

    @staticmethod
    def update_course(course_id, data):
        # Update the course with new data
        db.courses.update_one({"_id": ObjectId(course_id)}, {"$set": data})

    @staticmethod
    def delete_course(course_id):
        # Delete the course by ID
        db.courses.delete_one({"_id": ObjectId(course_id)})
