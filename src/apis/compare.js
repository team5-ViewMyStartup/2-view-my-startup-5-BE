import express from "express";
import Company from "../models/company.schema.js";
import { asyncHandler } from "../../utils/async-handler.js";

export const compareRouter = express.Router();

// 기업 선택 시 selectMyCount, selectOtherCount 업데이트 API
compareRouter.post(
  "/select",
  asyncHandler(async (req, res) => {
    const { companyId, isMyCompany } = req.body;
    const company = await Company.findOne({ id: companyId });

    if (!company) {
      throw new NotFoundError("회사를 찾을 수 없습니다.");
    }

    const query = {
      $inc: {},
    };

    if (isMyCompany) {
      query.$inc.selectMyCount = 1;
    } else {
      query.$inc.selectOtherCount = 1;
    }

    // atomic

    const updatedCompany = await Company.findOneAndUpdate({ id: companyId }, query, { new: true });

    return res.json(updatedCompany);
  }),
);
