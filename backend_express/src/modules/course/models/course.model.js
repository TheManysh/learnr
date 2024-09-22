import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    video_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }], // Array of references to Video schema
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image_url: { type: String },
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", courseSchema);
