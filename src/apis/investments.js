import express from "express";
import { NotFoundError } from "../utils/error.js";
import Investment from "../models/investment.schema.js";
import { asyncHandler } from "../utils/async-handler.js";
import { loginChecker } from "../middlewares/login-checker.js";
import User from "../models/user.schema.js";

export const investmentsRouter = express.Router();

investmentsRouter.get(
  "/:companyId",
  asyncHandler(async (req, res) => {
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

investmentsRouter.post(
  "/",
  loginChecker,
  asyncHandler(async (req, res) => {
    const { investorName, amount, comment, companyId, password } = req.body;

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

    res.status(201).json(newInvestment);
  }),
);

// if (error instanceof ValidationError || error instanceof NotFoundError) {
// return res.status(error.statusCode).json({ error: error.message });
// }
// throw new InternalServerError("투자 fetch 중 에러 발생"); //global error handler
