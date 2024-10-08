import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { companiesRouter } from "./apis/companies.js";
import { investmentsRouter } from "./apis/investments.js";
import { signUpRouter } from "./apis/signup.js";
import { compareRouter } from "./apis/compare.js";
import { errorHandler } from "./utils/error-handler.js";

const app = express();
app.use(cors());

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Connected to DB"))
  .catch((e) => console.log(e)); //.env 연결 및 실패

mongoose.connection.on("disconnected", () => console.log("disconnected"));
mongoose.connection.on("reconnected", () => console.log("reconnected"));
mongoose.connection.on("disconnecting", () => console.log("disconnecting"));
mongoose.connection.on("close", () => console.log("close"));

app.use(express.json());
app.use("/companies", companiesRouter);
app.use("/investments", investmentsRouter);
app.use("/users", signUpRouter);
app.use("/compare", compareRouter);

app.use(errorHandler);

app.use((req, res, next) => {
  res.status(404).json({ message: "잘못된 접근입니다." });
});

app.listen(4000, () => console.log("Server Started"));
