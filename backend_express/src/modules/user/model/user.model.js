import mongoose, { model } from "mongoose";

export const User = mongoose.model(
  "User",
  mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        min: 3,
        max: 25,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match:
          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
      },
      password: { type: String, required: true, trim: true },
    },
    {
      toJSON: {
        transform: (doc, ret) => {
          delete ret.password;
        },
      },
    },

    { timestamps: true }
  )
);
