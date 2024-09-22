from app import client
import json
from flask import  jsonify
def generate_image_url(prompt: str, number_of_images: int = 1):

    result = client.images.generate(
        model="dall-e", 
        prompt=prompt,
        n=number_of_images,
    )

    imageurl=json.loads(result.model_dump_json())['data'][0]['url']

    return jsonify({
            "image_url": imageurl,
        }), 200