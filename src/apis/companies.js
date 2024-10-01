import express from "express";
import Company from "../models/company.schema.js";
import { ValidationError, NotFoundError, InternalServerError } from "../error/error.js";

export const companiesRouter = express.Router();

function asyncErrorHandler(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (e) {
      if (!(e instanceof ValidationError) && !(e instanceof NotFoundError)) {
        e = new InternalServerError(e.message);
      }
      next(e);
    }
  };
}

// 기업 상세 조회 api
companiesRouter.get(
  "/:id",
  asyncErrorHandler(async (req, res) => {
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
