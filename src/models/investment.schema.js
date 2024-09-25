import mongoose from "mongoose";

export const investmentSchema = new mongoose.Schema(
  {
    company: {
      type: String,
    },
    investorName: {
      type: String,
    },
    investmentAmount: {
      type: Number,
    },
    investmentComment: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { collection: "investment" },
);
