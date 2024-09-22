import { Flash } from "../models/flashcard.model.js";

export const createFlash = async (req, res) => {
  try {
    const flaskResponse = await fetch(
      `http://127.0.0.1:5000/generate_quiz_with_flashcards`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ video_url: req.body.url }),
      }
    );

    if (!flaskResponse.ok) {
      return res
        .status(400)
        .json({ message: "Failed to fetch videos from playlist." });
    }

    const flaskData = await flaskResponse.json();
    const flashCardList = flaskData.flashcards;
    for (const quiz of flashCardList) {
      const flashcard = new Flash({
        startTime: quiz.start_time,
        question: quiz.question,
        answer: quiz.answer,
      });
      await flashcard.save();
    }

    return res
      .status(201)
      .json({ message: "Flash created successfully!", flash: flashCardList });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
