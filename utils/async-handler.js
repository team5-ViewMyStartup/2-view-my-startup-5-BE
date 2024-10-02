import {
  ValidationError,
  NotFoundError,
  ConflictError,
  InternalServerError,
} from "../src/error.js";

export function asyncHandler(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (e) {
      if (
        !(e instanceof ValidationError) &&
        !(e instanceof NotFoundError) &&
        !(e instanceof ConflictError)
      ) {
        e = new InternalServerError(e.message);
      }
      next(e);
    }
  };
}
