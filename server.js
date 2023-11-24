import express from "express";
import dotenv from "dotenv";
dotenv.config();

import sequelize from "./db.js";
import bodyParser from "body-parser";
import companyRouter from "./routes/companyRouter.js";
import categoryRouter from "./routes/categoryRouter.js";
import incomeRouter from "./routes/incomeRouter.js";

import { associateModels as associateIncomeModels } from "./models/income.js";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/company", companyRouter);
app.use("/api/category", categoryRouter);
app.use("/api/income", incomeRouter);

associateIncomeModels();

await sequelize.sync();
// await sequelize.sync({ alter: true });
// await sequelize.sync({ force: true });

app.listen(process.env.PORT, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log(`Server is listening at port ${process.env.PORT}`);
  }
});
