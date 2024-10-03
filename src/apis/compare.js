import express from "express";
import Company from "../models/company.schema.js";
import { asyncHandler } from "../../utils/async-handler.js";

export const compareRouter = express.Router();

// 기업 선택 API
companiesRouter.post(
  "/select",
  asyncHandler(async (req, res) => {
    const { companyId, isMyCompany } = req.body;
    const company = await Company.findOne({ id: companyId });

    if (!company) {
      throw new NotFoundError("회사를 찾을 수 없습니다.");
    }

    if (!isMyCompany) {
      company.selectMyCount += 1;
    } else {
      company.selectOtherCount += 1;
    }

    await company.save();

    return res.json(company);
  }),
);
