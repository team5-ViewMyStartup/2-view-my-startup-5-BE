import mongoose, { Collection } from "mongoose";

export const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    nickname: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { collection: "user" },
);
