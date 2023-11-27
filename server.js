import express  from "express";
import dotenv from "dotenv";
import sequelize from "./db.js";
import bodyParser from "body-parser";
import companyRouter from './routes/companyRouter.js';
import expenseRouter from './routes/expenseRouter.js';
import reportRouter from './routes/reportRouter.js';
import usersRouter from './routes/userRoutes.js';
dotenv.config();
const app = express();
//in order to let node understand the written code extended no need for it(we need only one thing)
//check for urlencoded when true when false
// app.use(bodyParser.urlencoded({extended:false}));
// app.use(bodyParser.json());
app.use(express.json());

// it log what method u did (patch,create...)
app.use((req,res,next)=>{
    console.log(req.path, req.method);
    next();
})

app.use('/api',companyRouter);
app.use('/api',expenseRouter);
app.use('/api',reportRouter);
app.use('/api',usersRouter);

await sequelize.sync();

app.listen(process.env.PORT, (error)=>{
    if(error){
        console.error(error);
    }
    else{
        console.log(`Server is listening at port ${process.env.PORT}`);
    }
})