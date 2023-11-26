import express from "express";
import dotenv from "dotenv";
dotenv.config();

import sequelize from "./db.js";
import bodyParser from "body-parser";
import "./associations.js";

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
app.use("/images", express.static("images"));
//Initializing session sequelize store.
// const sequelizeStore = connectionSession(session.Store);

// app.use(
//   session({
//     secret: "super user",
//     store: new sequelizeStore({
//       db: sequelize,
//     }),
//     resave: false,
//     saveUninitialized: false,
//   })
// );

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
