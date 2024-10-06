import mongoose from "mongoose";

export const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    totalInvestment: {
      type: Number,
      required: true,
    },
    revenue: {
      type: Number,
      required: true,
    },
    employees: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    selectMyCount: {
      type: Number,
      default: 0,
    },
    selectOtherCount: {
      type: Number,
      default: 0,
    },
  },
  { collection: "company" },
);

const Company = mongoose.model("Company", companySchema);
export default Company;
