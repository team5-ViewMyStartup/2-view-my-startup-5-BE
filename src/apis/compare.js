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

compareRouter.get(
  "/rank",
  asyncHandler(async (req, res) => {
    const { id } = req.query;
    if (!id) {
      throw new NotFoundError("없는 ID입니다.");
    }
    const company = (await CompanyModel.findById([id]))[0];
    let greatRevenueCase = await Company.find({
      revenue: { $gte: company.revenue },
      id: { $ne: id },
    })
      .limit(2)
      .sort({ revenue: 1 })
      .lean()
      .exec();
    let lessRevenueCase = await Company.find({
      revenue: { $lte: company.revenue },
      id: { $ne: id },
    })
      .limit(2)
      .sort({ revenue: -1 })
      .lean()
      .exec();
    let greatEmployeesCase = await Company.find({
      employees: { $gte: company.employees },
      id: { $ne: id },
    })
      .limit(2)
      .sort({ employees: 1 })
      .lean()
      .exec();
    let lessEmployeesCase = await Company.find({
      employees: { $lte: company.employees },
      id: { $ne: id },
    })
      .limit(2)
      .sort({ employees: -1 })
      .lean()
      .exec(); // 순위 데이터를 회사 데이터에다가 합쳐서 줄 생각하기

    let companyRevenueRank = await Company.countDocuments({ revenue: { $gt: company.revenue } });
    companyRevenueRank += 1;
    let companyEmployeesRank = await Company.countDocuments({
      employees: { $gt: company.employees },
    });
    companyEmployeesRank += 1; // top 5, bottom 5
    if (greatRevenueCase.length < 2) {
      const great5Revenue = await Company.find().limit(5).sort({ revenue: -1 }).lean().exec();
      greatRevenueCase = great5Revenue;
    } else if (lessRevenueCase.length < 2) {
      const less5Revenue = await Company.find().limit(5).sort({ revenue: 1 }).lean().exec();
      lessRevenueCase = less5Revenue;
    }
    if (greatEmployeesCase.length < 2) {
      const great5Employees = await Company.find().limit(5).sort({ employees: -1 }).lean().exec();
      greatEmployeesCase = great5Employees;
    } else if (lessEmployeesCase.length < 2) {
      const less5Employees = await Company.find().limit(5).sort({ employees: 1 }).lean().exec();
      lessEmployeesCase = less5Employees;
    }
    const revenueResult = { greatRevenueCase, lessRevenueCase, companyRevenueRank };
    const employeesResult = { greatEmployeesCase, lessEmployeesCase, companyEmployeesRank };
    const result = { revenueResult, employeesResult };

    res.json(result);
  }),
);
