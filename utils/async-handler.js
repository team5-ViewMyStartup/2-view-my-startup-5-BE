export function asyncHandler(routerFunction) {
  return (req, res, next) => {
    Promise.resolve(routerFunction(req, res, next)).catch(next);
  };
}
//promise 반환하지 않게 하기.
