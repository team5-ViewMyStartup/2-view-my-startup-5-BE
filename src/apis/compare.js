import express from "express";
import Company from "../models/company.schema.js";
import { asyncHandler } from "../utils/async-handler.js";
import { CompanyModel } from "../models/company.model.js";

export const compareRouter = express.Router();

compareRouter.get(
  "/select",
  asyncHandler(async (req, res) => {
    const { baseCompanyId, compareCompanyId, sortKeys } = req.query;

    const compareCompanyIdList = [compareCompanyId].flat();
    const sortKeyList = [sortKeys].flat();

    const companies = await CompanyModel.findById(
      [baseCompanyId, ...compareCompanyIdList],
      sortKeyList,
    );

    await CompanyModel.increaseCount(baseCompanyId, compareCompanyIdList);

    res.json(companies);
  }),
);
