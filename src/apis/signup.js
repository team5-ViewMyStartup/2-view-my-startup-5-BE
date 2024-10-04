import express from "express";
import { ValidationError, UnauthorizedError, ConflictError } from "../error/error.js";
import User from "../models/user.schema.js";
import { asyncHandler } from "../utils/async-handler.js";
import { banningEmptySpaces } from "../utils/validation.js";
import tokenService from "../jwt/index.js";
import bcrypt from "bcryptjs";

export const signUpRouter = express.Router();

signUpRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const { email, nickname, password } = req.body.user;

    if (banningEmptySpaces(email) || banningEmptySpaces(nickname) || banningEmptySpaces(password)) {
      throw new ValidationError("정보 입력란에 공백을 사용할 수 없습니다.");
    }

    const existingUserPromise = User.findOne({ email });
    /**
     * await의 역할은 비동기 코드를 동기적으로 작동하게 한다.
     * await 안 붙이면 pending상태인 프로미스를 반환한다.
     */

    const existingNicknamePromise = User.findOne({ nickname });

    const [existingUser, existingNickname] = await Promise.all([
      existingUserPromise,
      existingNicknamePromise,
    ]);

    // Promise.all 공부하기

    console.log(existingUser, existingNickname);

    if (existingUser || existingNickname) {
      throw new ConflictError("이미 사용중인 이메일 혹은 닉네임입니다.");
    }

    const saltRound = 10;
    const dbPassword = await bcrypt.hash(password, saltRound);

    const newUser = new User({
      email,
      nickname,
      password: dbPassword,
    });

    await newUser.save();
    // await를 안 붙이면 코드를 한 싸이클 돌고 실행된다. (별로 안 중요한 거, 즉시 저장할 필요 없는거는 await를 떼기도 함)

    res.status(201).json("회원가입이 정상적으로 완료되었습니다.");
  }),
);

signUpRouter.post(
  "/:login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (banningEmptySpaces(email) || banningEmptySpaces(password)) {
      throw new ValidationError("정보 입력란에 공백을 사용할 수 없습니다.");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new ValidationError("존재하지 않는 사용자입니다.");
    }

    const comparingPassword = await bcrypt.compare(password, user.password);
    if (!comparingPassword) {
      throw new UnauthorizedError("비밀번호가 일치하지 않습니다.");
    }

    const token = tokenService.getToken(email);

    res.set("Authorization", `Bearer ${token}`).status(200).json({ message: "success" });
  }),
);
