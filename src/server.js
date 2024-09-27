import express from "express";

const app = express();
app.use(express.json());

const users = [];

const errorMessage = {
  blankAlert: "빈칸을 사용할 수 없습니다.",
  storedValue: "이미 사용중인 이메일(닉네임)입니다.",
};

const successMessage = "회원가입이 정상적으로 완료되었습니다.";

app.post("/signup", (req, res) => {
  const { email, nickname, password } = req.body.user;

  if (!email?.trim() || !nickname?.trim() || !password.trim()) {
    return res.status(400).json(errorMessage.blankAlert);
  }

  const storedUser = users.find(
    (storedUser) => storedUser.email === email || storedUser.nickname === nickname,
  );

  if (storedUser) {
    return res.status(409).json(errorMessage.storedValue);
  }

  const newUser = {
    email,
    nickname,
    password,
  };

  users.push(newUser);

  res.status(201).json(successMessage);
});

// 구분선

// app.post("/login", (req, res) => {
//   const user = users.find((user) => user.nickname === req.body.user.nickname);
//   console.log(users, req.body.user.nickname);

//   // const newLogin = req.body;
//   // res.send(user);
//   // res.status(201).send("로그인이 완료되었습니다.");
//   res.status(201).json(user);
// });

// app.listen(3000, () => {
//   console.log("http://localhost:3000 에서 서버 실행중");
// });
