import jwtLib from "jsonwebtoken";
import { UnauthorizedError } from "./error.js";

export const jwt = {
  getToken(email, nickname) {
    return jwtLib.sign({ email, nickname }, process.env.SECRET_KEY, {
      expiresIn: "30m",
    });
  },

  getPayload(token) {
    try {
      return jwtLib.verify(token, process.env.SECRET_KEY);
    } catch (err) {
      throw new UnauthorizedError("유효하지 않은 토큰입니다.");
    }
  },
};
