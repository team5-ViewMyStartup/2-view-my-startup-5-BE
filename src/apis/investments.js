import express from "express";
import { NotFoundError } from "../error.js";
import Investment from "../models/investment.schema.js";
import { asyncHandler } from "../../utils/async-handler.js";
import cors from "cors"

export const investmentsRouter = express.Router();

investmentsRouter.get(
  "/:companyId",
  asyncHandler(async (req, res) => {
    // res.send({ message: "test" });
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

// if (error instanceof ValidationError || error instanceof NotFoundError) {
// return res.status(error.statusCode).json({ error: error.message });
// }
// throw new InternalServerError("투자 fetch 중 에러 발생"); //global error handler
