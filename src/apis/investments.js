import express from "express";
import { NotFoundError, UnauthorizedError } from "../utils/error.js";
import Investment from "../models/investment.schema.js";
import { asyncHandler } from "../utils/async-handler.js";
// import { loginChecker } from "../middlewares/login-checker.js";

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

investmentsRouter.patch(
  "/",
  // loginChecker,
  asyncHandler(async (req, res) => {
    const { user } = req;
    const { investmentId } = req.params;
    const { comment, password } = req.body;

    const investment = await Investment.findById(investmentId);
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

    investment.comment = comment;

    await investment.save();

    res.status(200).json(investment);
  }),
);

investmentsRouter.delete(
  "/:investmentId",
  // loginChecker,
  asyncHandler(async (req, res) => {
    const { user } = req;
    const { investmentId } = req.params;
    const { password } = req.body;

    const investment = await Investment.findById(investmentId);
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

    await Investment.findByIdAndDelete(investmentId);

    res.status(200).json({ message: "투자 정보가 삭제되었습니다." });
  }),
);

// if (error instanceof ValidationError || error instanceof NotFoundError) {
// return res.status(error.statusCode).json({ error: error.message });
// }
// throw new InternalServerError("투자 fetch 중 에러 발생"); //global error handler
