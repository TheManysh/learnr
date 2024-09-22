import { Video } from "../model/video.model.js"; // Adjust the path as needed

// Function to create a video
export async function createVideo(req, res, next) {
  try {
    const { title, url, original_author, length } = req.body;

    const videoData = new Video({ title, url, original_author, length });

    const savedVideo = await videoData.save();
    return res.status(201).send({
      message: "Video created successfully!",
      data: savedVideo,
    });
  } catch (e) {
    return res.status(500).send({
      message: "Internal Server Error",
      error: e,
    });
  }
}

// Function to update a video by ID
export async function updateVideo(req, res, next) {
  try {
    const videoId = req.params.id;
    const { title, url, original_author, length } = req.body;

    const updatedVideo = await Video.findByIdAndUpdate(
      videoId,
      { title, url, original_author },
      { new: true }
    );
    if (!updatedVideo) {
      return res.status(404).send({
        message: "Video not found!",
      });
    }

    return res.status(200).send({
      message: "Video updated successfully!",
      data: updatedVideo,
    });
  } catch (e) {
    return res.status(500).send({
      message: "Internal Server Error",
      error: e,
    });
  }
}

// Function to delete a video by ID
export async function deleteVideo(req, res, next) {
  try {
    const videoId = req.params.id;

    const deletedVideo = await Video.findByIdAndDelete(videoId);
    if (!deletedVideo) {
      return res.status(404).send({
        message: "Video not found!",
      });
    }

    return res.status(200).send({
      message: "Success",
    });
  } catch (e) {
    return res.status(500).send({
      message: "Internal Server Error",
      error: e,
    });
  }
}
