import express from "express";
import mongoose from "mongoose";

const app = express();

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
app.listen(3000, () => console.log("Server Started"));

const router = express.Router();

router.get("/api", async () => {
  const companies = await CompanyModel(options);
  const inventments = await InvestmentModel(options2);

  /**
   * [
   *    {
   *        id: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b'
   *        name: '투자정보1'
   *    },
   *    {
   *        id: 'asdfasdf-sadfadsfdsa-sdafasdfads-fasd',
   *        name: '투자정보2'
   *    },
   *    ...
   *    ...
   * ]
   */

  const investmentMap = inventments.reduce((obj, investment) => {
    obj[investment.companyId] = investment;
    return obj;
  }, {});
  /**
   * {
   *  '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b': {
   *        compnayId: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b'
   *        name: '투자정보1'
   *    },
   *  'asdfasdf-sadfadsfdsa-sdafasdfads-fasd': {
   *        compnayId: 'asdfasdf-sadfadsfdsa-sdafasdfads-fasd',
   *        name: '투자정보2'
   *    },
   *    ,,,
   *    ,,,
   *    ,,,
   * }
   */

  const realResult = companies.map((company) => {
    return {
      ...company,
      investment: investmentMap[company.id],
    };
  });

  /**
   * {
   *    name: '회사이름',
   *    location: '회사위치',
   *    investment: {
   *        compnayId: 'asdfasdf-sadfadsfdsa-sdafasdfads-fasd',
   *        name: '투자정보2'
   *    }
   * }
   */

  res.json(realResult);
});
