import mongoose from "mongoose";
import { companySchema } from "./company.schema.js";

export const Company = mongoose.model("Company", companySchema);

export const CompanyModel = {
  async findById(ids, sortKeyList) {
    const sort = {
      totalInvestment: -1,
      revenue: -1,
      employees: -1,
    };

    sortKeyList?.forEach((sortKey) => {
      if (sortKey === "totalInvestment") {
        sort.totalInvestment = 1;
      } else if (sortKey === "revenue") {
        sort.revenue = 1;
      } else if (sortKey === "employees") {
        sort.employees = 1;
      }
    });

    return await Company.find({ id: { $in: ids } })
      .sort(sort)
      .lean()
      .exec();
  },

  _increaseMyCount(id) {
    return Company.updateOne(
      { id },
      {
        $inc: { selectMyCount: 1 },
      },
    );
  },

  _increaseCompaniesCount(ids) {
    return Company.updateMany(
      {
        id: { $in: ids },
      },
      {
        $inc: {
          selectOtherCount: 1,
        },
      },
    );
  },

  async increaseCount(baseCompanyId, compareCompanyIdList) {
    await this._transaction(
      this._increaseMyCount(baseCompanyId),
      this._increaseCompaniesCount(compareCompanyIdList),
    );
  },

  async _transaction(...quries) {
    const session = await Company.startSession();
    session.startTransaction();

    try {
      await Promise.all(quries.map((query) => query.session(session)));
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  },
};
