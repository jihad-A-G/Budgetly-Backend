import express from "express";
import dotenv from "dotenv";
dotenv.config();

import sequelize from "./db.js";
import bodyParser from "body-parser";
import './associations.js';
import verfiyToken from "./authenticate.js";
//Routers
import companyRouter from "./routes/companyRouter.js";
import AdminRouter from "./routes/AdminRouter.js";
import userRouter from "./routes/userRouter.js";
import authRouter from "./routes/authRouter.js";
import categoryRouter from "./routes/categoryRouter.js";
import incomeRouter from "./routes/incomeRouter.js";
import goalRouter from "./routes/goalRouter.js"
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use('/images',express.static("images"));

//Authenticate user
app.use(verfiyToken);

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use("/api/auth", authRouter);
app.use("/api/company", companyRouter);
app.use("/api/admin", AdminRouter);
app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/income", incomeRouter);
app.use("/api/goal", goalRouter);

sequelize.sync({ force:false }).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
}).catch((err) => {
  console.error("Sequelize sync error:", err);
});

