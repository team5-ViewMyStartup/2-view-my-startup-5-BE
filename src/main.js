import express from "express";
import mongoose from "mongoose";
import { companiesRouter } from "./apis/companies.js";
import { compareRouter } from "./apis/compare.js";
import { investmentsRouter } from "./apis/investments.js";
import { signUpRouter } from "./apis/signup.js";
import cors from "cors";

const app = express();
app.use(cors());

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Connected to DB"))
  .catch((e) => console.log(e)); //.env 연결 및 실패

mongoose.connection.on("connected", () => console.log("connected"));
mongoose.connection.on("open", () => console.log("open"));
mongoose.connection.on("disconnected", () => console.log("disconnected"));
mongoose.connection.on("reconnected", () => console.log("reconnected"));
mongoose.connection.on("disconnecting", () => console.log("disconnecting"));
mongoose.connection.on("close", () => console.log("close"));

app.use(express.json());
app.use("/companies", companiesRouter);
app.use("/investments", investmentsRouter);
<<<<<<< HEAD
app.use("/users", signUpRouter);
app.use("/compare", compareRouter);
=======
app.use("/compare", compareRouter);
app.use("/signup", signUpRouter);

>>>>>>> ca2c34e (refactor: conflict resolve)
app.listen(4000, () => console.log("Server Started"));
