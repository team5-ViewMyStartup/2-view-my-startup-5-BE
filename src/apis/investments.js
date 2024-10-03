import express from "express";
import { NotFoundError } from "../error.js";
import Investment from "../models/investment.schema.js";
import Company from "../models/company.schema.js";
import User from "../models/user.schema.js";
import { asyncHandler } from "../../utils/async-handler.js";

export const investmentsRouter = express.Router();

investmentsRouter.get(
  "/:companyId",
  asyncHandler(async (req, res) => {
    res.send({ message: "test" });
    const { companyId } = req.params;

    const investments = await Investment.where({ companyId }).select({
      investorName: 1,
      amount: 1,
      comment: 1,
    });

    if (!investments?.length) {
      throw new NotFoundError("기업에 투자한 정보가 없습니다.");
    }
    res.json(investments);
  }),
);

investmentsRouter.put(
  "/:investmentId",
  asyncHandler(async (req, res) => {
    const { investmentId } = req.params;
    const { comment, password, nickname } = req.body;

    //임시
    const user = await User.findOne({ nickname });
    if (!user || user.password !== password) {
      throw new Error("잘못된 비밀번호입니다.");
    }

    const investment = await Investment.findById(investmentId);
    if (!investment) {
      throw new NotFoundError("투자 정보를 찾을 수 없습니다.");
    }

    investment.comment = comment;

    await investment.save();

    res.json(investment);
  }),
);

investmentsRouter.delete(
  "/:investmentId",
  asyncHandler(async (req, res) => {
    const { investmentId } = req.params;
    const { password, nickname } = req.body;

    // 임시
    const user = await User.findOne({ nickname });
    if (!user || user.password !== password) {
      throw new Error("투자 정보를 찾을 수 없습니다.");
    }

    const investment = await Investment.findById(investmentId);
    if (!investment) {
      throw new NotFoundError("투자 정보를 찾을 수 없습니다.");
    }

    await investment.deleteOne();

    res.json();
  }),
);

// if (error instanceof ValidationError || error instanceof NotFoundError) {
// return res.status(error.statusCode).json({ error: error.message });
// }
// throw new InternalServerError("투자 fetch 중 에러 발생"); //global error handler
