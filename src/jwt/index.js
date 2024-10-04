import jwt from "jsonwebtoken";

const tokenService = {
  getToken(email) {
    return jwt.sign({ email }, process.env.SECRET_KEY, {
      expiresIn: "30m",
    });
  },

  // user_email을 secret_key로 처리해서 토큰을 주는 것

  getPayload: (token) => {
    return jwt.verify(token, process.env.SECRET_KEY);
  },
};

export default tokenService;

// payload: jwt에 담긴 데이터 (그 자체로 암호화는 아님)

/**
 * await bcrypt.hash
 * 솔트: 랜덤값을 암호화할 때마다 추가
 *
 * EX)
 * 단방향:
 * 암호화 결과물 111 (원래 ABC) 결과물끼리의 비교만 가능
 *
 * 양방향: 복호화 가능
 *
 * getPayload는 미들웨어 사용해볼 것
 *
 * 하루 0레벨 5개
 *
 */
