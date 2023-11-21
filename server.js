import express  from "express";
import dotenv from "dotenv";
import sequelize from "./db.js";
import bodyParser from "body-parser";
import companyRouter from './routes/companyRouter.js';
dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({extended:false}));


app.use((req,res,next)=>{
    console.log(req.path, req.method);
    next();
})

app.use('/api/company',companyRouter);

await sequelize.sync();

app.listen(process.env.PORT, (error)=>{
    if(error){
        console.error(error);
    }
    else{
        console.log(`Server is listening at port ${process.env.PORT}`);
    }
})