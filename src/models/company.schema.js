import mongoose from "mongoose";

export const companySchema = new mongoose.Schema(
  {
    name: {
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
      required: true,
    },
    selectOtherCount: {
      type: Number,
      required: true,
    },
  },
  { collection: "company" },
);

const Company = mongoose.model("Company", companySchema);
export default Company;
