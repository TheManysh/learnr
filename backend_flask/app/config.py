# app/config.py
import os

class Config:
    GOOGLE_API_KEY = "AIzaSyBW-7GXJk7LWGdJdHGQUFvtCNi3OULJRaU" # Ensure your API key is set in the environment
    UPLOAD_FOLDER=os.path.join(os.path.dirname(__file__),'../uploads')
    MONGO_URI = "mongodb+srv://sudeepbhattarai1792:d0ICAoLMDsmsgP5K@hackademia.anr9l.mongodb.net/learner?retryWrites=true&w=majority&appName=Hackademia" 
    JWT_SECRET_KEY = "TOKEN"
    AZURE_OPENAI_ENDPOINT="https://learnrapp-test.openai.azure.com/"
    AZURE_OPENAI_API_KEY="d4bc4f2695fc4269bf41ce18578fde6f"
    AZURE_OPENAI_API_VERSION="2024-02-01"