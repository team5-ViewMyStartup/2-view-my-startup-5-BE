import { UnauthorizedError, NotFoundError } from "../utils/error.js";
import jwt from "../utils/jwt.js";
import User from "../models/user.schema.js";

export const loginChecker = async (req, res, next) => {
  const bearerToken = req.get("Authorization");

  if (!bearerToken) {
    throw new UnauthorizedError("API 요청에서 Authorization 헤더가 전달되지 않았습니다.");
  }

  const [_, token] = (bearerToken || "").split(" ");

  if (!token) {
    throw new UnauthorizedError("잘못된 토큰 형식입니다.");
  }

  try {
    const { email, nickname } = jwt.getPayload(token);
    const user = await User.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundError("사용자를 찾을 수 없습니다.");
    }

    req.user = { email, nickname };

    next();
  } catch (err) {
    throw new UnauthorizedError(`유효하지 않은 토큰입니다. - ${err.message}`);
  }
};
