import mongoose, { Schema } from "mongoose";

// Define the Audio Schema
const audioSchema = new mongoose.Schema(
  {
    language: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
      match: /https?:\/\/(www\.)?[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+/, // URL validation regex
    },
    video_id: {
      type: Schema.Types.ObjectId,
      ref: "Video",
      required: true,
    },
  },
  { timestamps: true }
);

// Audio model
export const Audio = mongoose.model("Audio", audioSchema);
