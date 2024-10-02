import express from "express";
import Company from "../models/company.schema.js";
import { asyncHandler } from "../../utils/async-handler.js";

export const companiesRouter = express.Router();

// 기업 전체리스트 (메인페이지) API
function getSortOption(query) {
  const sortOption = {};

  switch (query) {
    case "totalInvestment":
      sortOption.totalInvestment = "desc";
      sortOption.revenue = "asc";
      sortOption.employees = "asc";
      break;

    case "revenue":
      sortOption.revenue = "desc";
      sortOption.totalInvestment = "asc";
      sortOption.employees = "asc";
      break;

    default:
      sortOption.employees = "desc";
      sortOption.totalInvestment = "asc";
      sortOption.revenue = "asc";
  }

  return sortOption;
}

companiesRouter.get("/", async (req, res) => {
  const sort = req.query.sort;
  const sortOption = getSortOption(sort);

  const companyList = await companyModel.find().sort(sortOption);

  res.send(companyList);
});

// 기업 상세 조회 APT
companiesRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const companyId = req.params.id;

    const company = await Company.findOne({ id: companyId });

    if (!company) {
      throw new NotFoundError("회사를 찾을 수 없습니다.");
    }

    return res.send({
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
