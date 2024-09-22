// Function to get all videos
import { Video } from "../model/video.model.js";
export async function getVideos(req, res, next) {
  try {
    const videos = await Video.find();
    return res.status(200).send({
      message: "Videos retrieved successfully!",
      data: videos,
    });
  } catch (e) {
    return res.status(500).send({
      message: "Internal Server Error",
      error: e,
    });
  }
}

export async function getVideobyId(req, res) {
  try {
    const courseId = req.params.id;
    const course = await Video.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    return res.status(200).json(course);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}
