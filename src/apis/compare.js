import express from "express";
import Company from "../models/company.schema.js";
import { asyncHandler } from "../utils/async-handler.js";
import { CompanyModel } from "../models/company.model.js";
import { NotFoundError } from "../utils/error.js";

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

    let greatRevenueCase = Company.find({
      revenue: { $gte: company.revenue },
      id: { $ne: id },
    })
      .limit(2)
      .sort({ revenue: 1 })
      .lean()
      .exec();

    let lessRevenueCase = Company.find({
      revenue: { $lt: company.revenue },
      id: { $ne: id },
    })
      .limit(2)
      .sort({ revenue: -1 })
      .lean()
      .exec();

    let greatEmployeesCase = Company.find({
      employees: { $gte: company.employees },
      id: { $ne: id },
    })
      .limit(2)
      .sort({ employees: 1 })
      .lean()
      .exec();

    let lessEmployeesCase = Company.find({
      employees: { $lt: company.employees },
      id: { $ne: id },
    })
      .limit(2)
      .sort({ employees: -1 })
      .lean()
      .exec();

    [greatRevenueCase, lessRevenueCase, greatEmployeesCase, lessEmployeesCase] = await Promise.all([
      greatRevenueCase,
      lessRevenueCase,
      greatEmployeesCase,
      lessEmployeesCase,
    ]);

    // 순위 데이터를 회사 데이터에다가 합쳐서 줄 생각하기
    let companyRevenueRank = Company.countDocuments({
      revenue: {
        $gt: company.revenue,
      },
    });
    let companyEmployeesRank = Company.countDocuments({
      employees: {
        $gt: company.employees,
      },
    });

    [companyRevenueRank, companyEmployeesRank] = await Promise.all([
      companyRevenueRank,
      companyEmployeesRank,
    ]);

    companyRevenueRank += 1;
    companyEmployeesRank += 1;

    /**
     * {
     *  revenue: {
     *    gte: [],
     *    lt: []
     *  },
     *  employee: {
     *    gte: [],
     *    lt: []
     *  }
     * }
     */

    const revenue = {
      gte: greatRevenueCase,
      lt: lessRevenueCase,
    };
    const employee = {
      gte: greatEmployeesCase,
      lt: lessEmployeesCase,
    };

    if (greatRevenueCase.length < 2) {
      const rankCompanies = await Company.find({}).limit(5).sort({ revenue: -1 }).lean().exec();
      revenue.gte = [];
      revenue.lt = [];

      rankCompanies.forEach((rankCompany) => {
        if (rankCompany.revenue > company.revenue) revenue.gte.push(rankCompany);
        if (rankCompany.revenue < company.revenue) revenue.lt.push(rankCompany);
      });
    } else if (lessRevenueCase.length < 2) {
      const rankCompanies = await Company.find({}).limit(5).sort({ revenue: 1 }).lean().exec();
      revenue.gte = [];
      revenue.lt = [];

      rankCompanies.forEach((rankCompany) => {
        if (rankCompany.revenue > company.revenue) revenue.gte.push(rankCompany);
        if (rankCompany.revenue < company.revenue) revenue.lt.push(rankCompany);
      });
    }

    if (greatEmployeesCase.length < 2) {
      const rankCompanies = await Company.find({}).limit(5).sort({ employees: -1 }).lean().exec();
      employee.gte = [];
      employee.lt = [];

      rankCompanies.forEach((rankCompany) => {
        if (rankCompany.employees > company.employees) employee.gte.push(rankCompany);
        if (rankCompany.employees < company.employees) employee.lt.push(rankCompany);
      });
    } else if (lessEmployeesCase.length < 2) {
      const rankCompanies = await Company.find({}).limit(5).sort({ employees: 1 }).lean().exec();
      employee.gte = [];
      employee.lt = [];

      rankCompanies.forEach((rankCompany) => {
        if (rankCompany.employees > company.employees) employee.gte.push(rankCompany);
        if (rankCompany.employees < company.employees) employee.lt.push(rankCompany);
      });
    }

    res.json({ revenue, employee, companyRevenueRank, companyEmployeesRank });
  }),
);
