export function asyncHandler(routerFunction) {
  return async (req, res, next) => {
    try {
      await routerFunction(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}
