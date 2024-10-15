import { InternalServerError } from "./error.js";

export function asyncHandler(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (e) {
      const error = e.statusCode ? e : new InternalServerError(e.message);
      next(error);
    }
  };
}
