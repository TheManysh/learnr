import mongoose from "mongoose";

const flashSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    video_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
    },
    startTime: { type: Date, required: true }, // New field for start time
  },
  { timestamps: true }
);

export const Flash = mongoose.model("Flash", flashSchema);
