import express from "express";
import { ValidationError, ConflictError } from "../error.js";
import User from "../models/user.schema.js";
import { asyncHandler } from "../../utils/async-handler.js";

export const signUpRouter = express.Router();

signUpRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const { email, nickname, password } = req.body.user;

    const banningEmptySpaces = (str) => !str || /\s/g.test(str);

    if (banningEmptySpaces(email) || banningEmptySpaces(nickname) || banningEmptySpaces(password)) {
      throw new ValidationError("정보 입력란에 공백을 사용할 수 없습니다.");
    }

    const existingUser = await User.findOne({
      email: email,
    });

    const existingNickname = await User.findOne({
      nickname: nickname,
    });

    console.log(existingUser, existingNickname);

    if (existingUser || existingNickname) {
      throw new ConflictError("이미 사용중인 이메일(닉네임)입니다.");
    }

    const newUser = new User({
      email,
      nickname,
      password,
    });

    await newUser.save();

    res.status(201).json("회원가입이 정상적으로 완료되었습니다.");
  }),
);
