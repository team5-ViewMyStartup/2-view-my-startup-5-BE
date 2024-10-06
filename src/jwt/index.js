import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../error/error.js";

const tokenService = {
  getToken(email) {
    return jwt.sign({ email }, process.env.SECRET_KEY, {
      expiresIn: "30m",
    });
  },

  getPayload: (token) => {
    try {
      return jwt.verify(token, process.env.SECRET_KEY);
    } catch (e) {
      throw new UnauthorizedError("유효하지 않은 토큰입니다.");
    }
  },
};

export default tokenService;
