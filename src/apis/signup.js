import express from "express";
import {
  ValidationError,
  UnauthorizedError,
  NotFoundError,
  ConflictError,
} from "../utils/error.js";
import User from "../models/user.schema.js";
import { asyncHandler } from "../utils/async-handler.js";
import { hasWhiteSpace } from "../utils/validation.js";
import { jwt } from "../utils/jwt.js";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

export const signUpRouter = express.Router();

signUpRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const { email, nickname, password } = req.body;

    if (hasWhiteSpace(email) || hasWhiteSpace(nickname) || hasWhiteSpace(password)) {
      throw new ValidationError("정보 입력란에 공백을 사용할 수 없습니다.");
    }

    const existingUser = await User.findOne({
      $or: [{ email: email }, { nickname: nickname }],
    });

    if (existingUser) {
      throw new ConflictError("이미 사용중인 이메일 혹은 닉네임입니다.");
    }

    const saltRound = 10;
    const dbPassword = await bcrypt.hash(password, saltRound);

    const newUser = new User({
      id: uuidv4(),
      email,
      nickname,
      password: dbPassword,
    });

    await newUser.save();

    res.status(201).json("회원가입이 정상적으로 완료되었습니다.");
  }),
);

signUpRouter.post(
  "/signIn",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (hasWhiteSpace(email) || hasWhiteSpace(password)) {
      throw new ValidationError("정보 입력란에 공백을 사용할 수 없습니다.");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new NotFoundError("존재하지 않는 사용자입니다.");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedError("비밀번호가 일치하지 않습니다.");
    }

    const token = jwt.getToken(email, user.nickname);

    res
      .set("Access-Control-Expose-Headers", "Authorization")
      .set("Authorization", `Bearer ${token}`);
    res.status(200).json({ message: "로그인에 성공했습니다." });
  }),
);
