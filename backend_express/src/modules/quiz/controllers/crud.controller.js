import { Quiz } from "../models/quiz.model.js";
import { Video } from "../../video/model/video.model.js";
import { video } from "../../video/index.js";
// Function to create a quiz
export const createQuiz = async (req, res) => {
  try {
    const video_id = req.body.video_id;
    const video_details = await Video.findById(video_id);
    const flaskResponse = await fetch(
      `http://127.0.0.1:5000/generate_quiz_with_flashcards`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ video_url: video_details.url }),
      }
    );

    if (!flaskResponse.ok) {
      return res
        .status(400)
        .json({ message: "Failed to fetch videos from playlist." });
    }

    const flaskData = await flaskResponse.json();
    const quizList = flaskData.quiz;
    for (const quiz of quizList) {
      const newQuiz = new Quiz({
        startTime: quiz.start_time,
        question: quiz.question,
        options: quiz.options,
        video_id: video_id,
        answer: quiz.correct_answer,
      });
      await newQuiz.save();
    }

    return res
      .status(201)
      .json({ message: "Quiz created successfully!", quiz: flaskData });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
// Function to edit a quiz by ID
export const editQuiz = async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const updatedData = req.body;

    const updatedQuiz = await Quiz.findByIdAndUpdate(quizId, updatedData, {
      new: true,
    });
    if (!updatedQuiz) {
      return res.status(404).json({ message: "Quiz not found." });
    }

    return res
      .status(200)
      .json({ message: "Quiz updated successfully!", quiz: updatedQuiz });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Function to delete a quiz by ID
export const deleteQuiz = async (req, res) => {
  try {
    const quizId = req.params.quizId;

    const deletedQuiz = await Quiz.findByIdAndDelete(quizId);
    if (!deletedQuiz) {
      return res.status(404).json({ message: "Quiz not found." });
    }

    return res.status(200).json({ message: "Quiz deleted successfully!" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
