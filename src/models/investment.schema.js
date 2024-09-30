import mongoose from "mongoose";

export const investmentSchema = new mongoose.Schema(
  {
    investorName: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  { collection: "investment" },
);
