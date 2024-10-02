import express from "express";
import mongoose from "mongoose";
import { companySchema } from "../models/company.schema.js";
import { ValidationError, NotFoundError, InternalServerError } from "../error.js";

const companyModel = mongoose.model("company", companySchema);
export const companiesRouter = express.Router();

function asyncErrorHandler(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (e) {
      if (!(e instanceof ValidationError) && !(e instanceof NotFoundError)) {
        // 400 404 아닌 경우 500으로 취급
        e = new InternalServerError(e.message);
      }
      next(e);
    }
  };
}

// 기업 전체 리스트 api (메인 페이지)
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

// 기업 상세 조회 api
companiesRouter.get(
  "/:id",
  asyncErrorHandler(async (req, res) => {
    const company = await companyModel.findById(req.params.id);

    return res.send({
      name: company.getId(),
      id: company.getName(),
      description: company.getDescription(),
      category: company.getPrice(),
      totalInvestment: company.getTags(),
      revenue: company.getImages(),
      employees: company.getCreatedAt(),
      image: company.getUpdatedAt(),
    });
  }),
);
