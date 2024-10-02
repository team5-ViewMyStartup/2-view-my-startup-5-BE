import mongoose from "mongoose";
import data from "./investment-data.js";
import Investment from "../../models/investment.schema.js";

const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL);

await Investment.insertMany(data);

mongoose.connection.close();
