import { UnauthorizedError, NotFoundError, InternalServerError } from "../error/error.js";
import User from "../models/user.schema.js";
import bcrypt from "bcryptjs/dist/bcrypt";

export const passwordChecker = async (req, res, next) => {
  const { nickname, password } = req.body;

  try {
    const user = await User.findOne({ nickname });
    if (!user) {
      throw new NotFoundError("사용자를 찾을 수 없습니다.");
    }

    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) {
      throw new UnauthorizedError("비밀번호가 일치하지 않습니다.");
    }

    next();
  } catch (err) {
    throw new InternalServerError("비밀번호 확인 중 오류가 발생했습니다.");
  }
};
