import bcrypt
from app import db
from marshmallow import Schema, fields, validate, ValidationError
from bson import ObjectId
# Define User Schema using Marshmallow
class UserSchema(Schema):
    email = fields.Email(required=True)
    password = fields.Str(required=True, validate=validate.Length(min=8))
    name = fields.Str(required=True)

# User model with database interaction methods
class UserModel:
    schema = UserSchema()

    @staticmethod
    def find_by_email(email):
        return db.users.find_one({"email": email})
    @staticmethod
    def  find_by_id(id):
        return db.courses.find_one({"_id": ObjectId(id)})
    
    @staticmethod
    def create_user(data):
        try:
            # Validate the incoming data
            validated_data = UserModel.schema.load(data)

            # Hash the password: Ensure the password is encoded to bytes
            hashed_password = bcrypt.hashpw(validated_data['password'].encode('utf-8'), bcrypt.gensalt())

            # Convert the hashed password to a string for storage (optional, can store as bytes)
            validated_data['password'] = hashed_password.decode('utf-8')

            # Insert the user into the database
            db.users.insert_one(validated_data)
            return {"message": "User created successfully!"}
        except ValidationError as err:
            return {"errors": err.messages}, 400

    @staticmethod
    def verify_password(stored_password, provided_password):
        # Convert stored password back to bytes
        stored_password = stored_password.encode('utf-8')

        # Compare the hashed password with the provided password
        return bcrypt.checkpw(provided_password.encode('utf-8'), stored_password)
