from flask import request, jsonify
from bson import ObjectId
from pytube import Playlist
from app.models.video import VideoModel



def get_youtube_playlist(playlist_url):
    try:

        if not playlist_url:
            return jsonify({"error": "Playlist URL is required."}), 400

        yt_play = Playlist(playlist_url)

        playlist_title = yt_play.title
        
      
        videos = []
        for video in yt_play.videos:
            videos.append({
                "title": video.title,
                "url": video.watch_url,
                "author":video.author,
                "length":video.length
            })

        # Return the playlist and video details as JSON
        return jsonify({
            "title": playlist_title,
            "videos": videos
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500






