import express  from "express";
import dotenv from "dotenv";
import sequelize from "./db.js";
import bodyParser from "body-parser";
import './associations.js';
//Routers
import companyRouter from './routes/companyRouter.js';
import AdminRouter from './routes/AdminRouter.js';
import userRouter from './routes/userRouter.js';
import authRouter from './routes/authRouter.js';
import goalRouter from './routes/goalRouter.js';
dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
app.use('/images',express.static("images"));

app.use((req,res,next)=>{
    console.log(req.path, req.method);
    next();
})
app.use('/api/auth',authRouter);
app.use('/api/company',companyRouter);
app.use('/api/admin',AdminRouter);
app.use('/api/user',userRouter);
app.use('/api/goal',goalRouter);

await sequelize.sync();

app.listen(process.env.PORT, (error)=>{
    if(error){
        console.error(error);
    }
    else{
        console.log(`Server is listening at port ${process.env.PORT}`);
    }
})

