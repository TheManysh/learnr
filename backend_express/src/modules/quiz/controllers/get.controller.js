import { Quiz } from "../models/quiz.model.js";

// Function to get quizzes by video ID
export const getQuizzesByVideo = async (req, res) => {
  try {
    const videoId = req.params.videoId;

    const quizzes = await Quiz.find({ video_id: videoId });
    if (quizzes.length === 0) {
      return res
        .status(404)
        .json({ message: "No quizzes found for this video." });
    }

    return res.status(200).json({ quizzes });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Function to get all quizzes
export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    if (quizzes.length === 0) {
      return res.status(404).json({ message: "No quizzes found." });
    }

    return res.status(200).json({ quizzes });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
