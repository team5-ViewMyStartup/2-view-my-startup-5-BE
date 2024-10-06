import express from "express";
import Company from "../models/company.schema.js";
import { asyncHandler } from "../utils/async-handler.js";

export const compareRouter = express.Router();

/**
 * 기업명, 기업 소개, 카테고리, 누적 투자 금액, 매출액, 고용 인원이 조회됩니다.
 * 누적 투자 금액 (totalInvestment), 매출액 (revenue), 고용 인원(employees) 별 오름차순/내림차순 정렬을 제공합니다.
 *
 * baseCompanyId: string
 * compareCompanyId: string[]
 * sortKeys: string[]
 */
compareRouter.get(
  "/select",
  asyncHandler(async (req, res) => {
    const { baseCompanyId, compareCompanyId, sortKeys } = req.query;

    const compareCompanyIdList = [compareCompanyId].flat();
    const sortKeyList = [sortKeys].flat();

    const sort = {
      totalInvestment: -1,
      revenue: -1,
      employees: -1,
    };

    sortKeyList.forEach((sortKey) => {
      if (sortKey === "totalInvestment") {
        sort.totalInvestment = 1;
      } else if (sortKey === "revenue") {
        sort.revenue = 1;
      } else if (sortKey === "employees") {
        sort.employees = 1;
      }
    });

    const companies = await Company.find({ id: { $in: [baseCompanyId, ...compareCompanyIdList] } })
      .sort(sort)
      .lean()
      .exec();

    await Promise.all([
      Company.updateOne(
        { id: baseCompanyId },
        {
          $inc: {
            selectMyCount: 1,
          },
        },
      ),
      Company.updateMany(
        { id: { $in: compareCompanyIdList } },
        {
          $inc: {
            selectOtherCount: 1,
          },
        },
      ),
    ]);

    res.json(companies);
  }),
);
