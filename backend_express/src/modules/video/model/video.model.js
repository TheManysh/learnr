import mongoose from "mongoose";

const videoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      min: 3,
      max: 100,
      trim: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    original_author: { type: String, required: true, trim: true },
    length: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

export const Video = mongoose.model("Video", videoSchema);
