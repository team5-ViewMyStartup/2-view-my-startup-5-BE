import jwt from "jsonwebtoken";

const tokenService = {
  getToken(email) {
    return jwt.sign({ email }, process.env.SECRET_KEY, {
      expiresIn: "30m",
    });
  },

  getPayload: (token) => {
    return jwt.verify(token, process.env.SECRET_KEY);
  },
};

export default tokenService;
