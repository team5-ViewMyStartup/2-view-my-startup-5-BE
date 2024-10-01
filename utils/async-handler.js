import { ValidationError, NotFoundError, InternalServerError } from "../error/error.js";

export function asyncHandler(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (e) {
      if (!(e instanceof ValidationError) && !(e instanceof NotFoundError)) {
        e = new InternalServerError(e.message);
      }
      next(e);
    }
  };
}
