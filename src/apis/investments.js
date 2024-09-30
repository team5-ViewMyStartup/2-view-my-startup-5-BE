import express from "express";
import mongoose from "mongoose";
import { ValidationError, NotFoundError, InternalServerError } from "../error.js";
import Investment from "../models/investment.schema.js";

export const investmentsRouter = express.Router({ mergeParams: true });

investmentsRouter.get("/", async (req, res, next) => {
  //all-company에서 받아와야함
  try {
    const companyId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      throw new ValidationError("회사가 존재하지 않습니다");
    }

    const investments = await Investment.find({ companyId: companyId }).select(
      "investorName amount comment",
    );

    if (!investments || investments.length === 0) {
      throw new NotFoundError("기업에 투자한 정보가 없습니다.");
    }

    res.status(200).json(investments);
  } catch (error) {
    if (error instanceof ValidationError || error instanceof NotFoundError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    next(new InternalServerError("투자 fetch 중 에러 발생"));
  }
});
