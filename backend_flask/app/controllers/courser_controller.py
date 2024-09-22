from flask import request, jsonify
from bson import ObjectId
from app.models.course import CourseModel
from app.models.user import UserModel

# Function to create a course
def create_course(request):
    data = request.get_json()

    
    user_id = data['created_by']
    user = UserModel.find_by_id(user_id)
    if not user:
        return jsonify({"message": "User does not exist."}), 400

    result = CourseModel.create_course(data)
    if isinstance(result, tuple):  # Check for validation errors
        return jsonify(result), 400

    return jsonify(result), 201


def edit_course(course_id,request):
    data = request.get_json()

  
    course = CourseModel.find_by_id(course_id)
    if not course:
        return jsonify({"message": "Course not found."}), 404

    # Update the course with the provided data
    updated_data = {key: value for key, value in data.items() if key in ['title', 'description', 'ideas', 'original_author']}
    
    # Validate if 'created_by' is being updated
    if 'created_by' in data:
        user_email = data['created_by']['email']
        user = UserModel.find_by_email(user_email)
        if not user:
            return jsonify({"message": "Creator does not exist."}), 400
        updated_data['created_by'] = data['created_by']

    # Update course in the database
    CourseModel.update_course(course_id, updated_data)
    return jsonify({"message": "Course updated successfully!"}), 200

# Function to delete a course by ID
def delete_course(course_id):
    course = CourseModel.find_by_id(course_id)
    if not course:
        return jsonify({"message": "Course not found."}), 404

    CourseModel.delete_course(course_id)
    return jsonify({"message": "Course deleted successfully!"}), 200
