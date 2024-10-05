import { UnauthorizedError } from "../error/error.js";

export const loginChecker = async (req, res, next) => {
  const bearerToken = req.get("Authorization");
  const [_, token] = (bearerToken || "").split(" ");

  if (!token) {
    throw new UnauthorizedError("잘못된 토큰 형식입니다.");
  }

  try {
    const { email } = tokenService.getPayload(token);

    const user = await User.findOne({ email }).exec();
    if (!user) {
      throw new Error("사용자를 찾을 수 없습니다.");
    }

    req.email = email;

    next();
  } catch (err) {
    throw new Error(`유효하지 않은 토큰입니다. - ${err.message}`);
  }
};
