import express from "express";
import { NotFoundError, UnauthorizedError } from "../utils/error.js";
import Investment from "../models/investment.schema.js";
import { asyncHandler } from "../utils/async-handler.js";
import { loginChecker } from "../middlewares/login-checker.js";
import User from "../models/user.schema.js";
import bcrypt from "bcrypt";
import crypto from "node:crypto";
import Company from "../models/company.schema.js";

export const investmentsRouter = express.Router();

const updateTotalInvestment = async (companyId) => {
  const investments = await Investment.where({ companyId }).select({ _id: 0 }).lean().exec();
  const totalInvestmentAmount = investments.reduce((sum, investment) => sum + investment.amount, 0);

  await Company.findOneAndUpdate(
    { id: companyId },
    { startupTotal: totalInvestmentAmount },
    { new: true },
  );
};

investmentsRouter.get(
  "/:companyId",
  asyncHandler(async (req, res) => {
    const { companyId } = req.params;

    const investments = await Investment.where({ companyId }).select({ _id: 0 }).lean().exec();

    if (!investments?.length) {
      throw new NotFoundError("기업에 투자한 정보가 없습니다.");
    }

    const totalInvestmentAmount = investments.reduce(
      (sum, investment) => sum + investment.amount,
      0,
    );

    const company = await Company.findOne({ id: companyId }).select("startupTotal").lean();

    res.json({ investments, totalInvestmentAmount, startupTotal: company.startupTotal });
  }),
);

investmentsRouter.patch(
  "/:id",
  loginChecker,
  asyncHandler(async (req, res) => {
    const { email } = req.user;
    const { id } = req.params;
    const { comment, password } = req.body;

    const user = await User.findOne({ email });

    const investment = await Investment.findOne({ id });
    if (!investment) {
      throw new NotFoundError("해당 투자 정보를 찾을 수 없습니다.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError("비밀번호가 올바르지 않습니다.");
    }

    if (investment.investorName !== user.nickname) {
      throw new UnauthorizedError("본인이 투자한 정보만 수정할 수 있습니다.");
    }
    const updateInvestment = await Investment.findOneAndUpdate({ id }, { comment }, { new: true });
    await updateTotalInvestment(investment.companyId);

    res.status(200).json(updateInvestment);
  }),
);

investmentsRouter.delete(
  "/:id",
  loginChecker,
  asyncHandler(async (req, res) => {
    const { email } = req.user;
    const { id } = req.params;
    const { password } = req.body;

    const user = await User.findOne({ email });

    const investment = await Investment.findOne({ id });
    if (!investment) {
      throw new NotFoundError("해당 투자 정보를 찾을 수 없습니다.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError("비밀번호가 올바르지 않습니다.");
    }

    if (investment.investorName !== user.nickname) {
      throw new UnauthorizedError("본인이 투자한 정보만 삭제할 수 있습니다.");
    }

    await Investment.findOneAndDelete({ id });

    await updateTotalInvestment(investment.companyId);

    res.status(200).json({ message: "투자 정보가 삭제되었습니다." });
  }),
);

investmentsRouter.post(
  "/",
  loginChecker,
  asyncHandler(async (req, res) => {
    const { email } = req.user;
    const { companyId, amount, comment, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "유저를 찾을 수 없음" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError("비밀번호가 올바르지 않습니다.");
    }
    const company = await Company.findOne({ id: companyId }).lean().exec();

    const newInvestment = await new Investment({
      companyId,
      investorName: user.nickname,
      amount,
      comment,
      userId: user.id,
      id: crypto.randomUUID(),
    }).save();

    await updateTotalInvestment(companyId);

    res.status(201).json(newInvestment);
  }),
);

// if (error instanceof ValidationError || error instanceof NotFoundError) {
// return res.status(error.statusCode).json({ error: error.message });
// }
// throw new InternalServerError("투자 fetch 중 에러 발생"); //global error handler
