# from flask import Flask, request,jsonify
# from dotenv import load_dotenv
# from app.config import Config
# from flask_pymongo import PyMongo
# from flask_jwt_extended import JWTManager
# from app.extension import mongo, jwt
# from app.models.user import create_user
# import os

# mongo=PyMongo()
# def create_app():
#     load_dotenv()  # Load environment variables
#     app = Flask(__name__)
#     # Load configuration from config.py
#     app.config.from_object(Config)
#     mongo.init(app)
#     @app.route('/',  methods=['GET'])
#     def index():
#         return 'Hello its working'
   
#     @app.route("/signup", methods=['POST'])
#     def register():
#         print(f"MongoDB instance: {mongo.db}")
#         data = request.get_json()
#         if mongo.db.users.find_one({"email": data['email']}):
#             return jsonify({"error": "User already exists"}), 400
#         print(data)
#         user = create_user(data)
#         mongo.db.users.insert_one(user)
#         return jsonify({"message": "User registered successfully"}), 201

#     from .routes import route_bp
#     app.register_blueprint(route_bp)
#     from app.routes.user_routes import user_bp
#     app.register_blueprint(user_bp)

#     return app

from flask import Flask
from flask_pymongo import PyMongo
from openai import AzureOpenAI
app = Flask(__name__)
app.config["SECRET_KEY"] = "db24c608640f5034b30b8e1e1eb5618ed0ffdbf5"
app.config["MONGO_URI"] = "mongodb+srv://sudeepbhattarai1792:d0ICAoLMDsmsgP5K@hackademia.anr9l.mongodb.net/learner?retryWrites=true&w=majority&appName=Hackademia"
from .config import Config

# Set up Google API Key
GOOGLE_API_KEY = Config.GOOGLE_API_KEY
# Initialize MongoDB client
mongodb_client = PyMongo(app)
db = mongodb_client.db

client = AzureOpenAI(
    api_version="2024-05-01-preview",
    azure_endpoint=Config.AZURE_OPENAI_ENDPOINT,
    api_key=Config.AZURE_OPENAI_API_KEY,
)

# Check MongoDB connection
try:
    db.command('ping')  
    print("MongoDB connected successfully!")
except Exception as e:
    print(f"MongoDB connection error: {e}")

# Import and register routes
from app import routes 


