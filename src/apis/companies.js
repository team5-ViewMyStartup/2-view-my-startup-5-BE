import express from "express";
import Company from "../models/company.schema.js";
import { asyncHandler } from "../utils/async-handler.js";

export const companiesRouter = express.Router();

function getSortOption(sortField) {
  const sortOption = {
    totalInvestment: "asc",
    revenue: "asc",
    employees: "asc",
  };

  switch (sortField) {
    case "totalInvestment":
      sortOption.totalInvestment = "desc";
      break;

    case "revenue":
      sortOption.revenue = "desc";
      break;

    default:
      sortOption.employees = "desc";
  }

  return sortOption;
}

companiesRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const sort = req.query.sort;
    const sortOption = getSortOption(sort);

    const companyList = await Company.find().sort(sortOption);

    res.json(companyList);
  }),
);

companiesRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const companyId = req.params.id;

    const company = await Company.findOne({ id: companyId });

    if (!company) {
      throw new NotFoundError("회사를 찾을 수 없습니다.");
    }

    return res.json({
      image: company.image,
      name: company.name,
      id: company.id,
      description: company.description,
      category: company.category,
      totalInvestment: company.totalInvestment,
      revenue: company.revenue,
      employees: company.employees,
    });
  }),
);
