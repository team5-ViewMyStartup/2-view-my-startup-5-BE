import mongoose from 'mongoose';

export const companySchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    description: {
      type: String
    },
    category: {
      type: String
    },
    totalInvestment: {
      type: Number
    },
    revenue: {
      type: Number
    },
    employees: {
      type: Number
    }
  },
  { collection: 'company' }
);
