import { Audio } from "../models/audio.model.js";

// Function to get audio by video ID
export async function getAudiosByVideo(req, res) {
  const { videoId } = req.params;
  try {
    const audios = await Audio.find({ video_id: videoId });
    if (audios.length === 0) {
      return res
        .status(404)
        .json({ message: "No audios found for this video." });
    }
    return res.status(200).json({ audios });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
