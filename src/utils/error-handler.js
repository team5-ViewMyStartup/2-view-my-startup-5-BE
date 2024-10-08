import { InternalServerError } from "./error.js";

export function errorHandler(err, req, res, next) {
  const error = err.statusCode ? err : new InternalServerError();
  res.status(error.statusCode).json({ message: error.message || "서버 내부 오류가 발생했습니다." });
}
