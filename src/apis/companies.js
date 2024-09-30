import express from "express";
import mongoose from "mongoose";
import { companySchema } from "../models/company.schema.js";
import { investmentsRouter } from "./investments.js";
import { ValidationError, NotFoundError, InternalServerError } from "../error.js";

const companyModel = mongoose.model("company", companySchema);
export const companiesRouter = express.Router();

companiesRouter.use("/:companyId/investments", investmentsRouter); //investment api를 위한 부모 라우터

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

// 기업 상세 조회 api
companiesRouter.get(
  "/:id",
  asyncErrorHandler(async (req, res) => {
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
