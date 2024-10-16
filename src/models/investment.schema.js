import mongoose from "mongoose";

export const investmentSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
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
    companyId: {
      type: String,
      required: true,
    },
  },
  { collection: "investment" },
);

const Investment = mongoose.model("Investment", investmentSchema);
export default Investment;
