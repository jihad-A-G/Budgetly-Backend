import express  from "express";
import dotenv from "dotenv";
import sequelize from "./db.js";
import bodyParser from "body-parser";
import session from "express-session";
import connectionSession from "connect-session-sequelize";
//Routers
import companyRouter from './routes/companyRouter.js';
import AdminRouter from './routes/AdminRouter.js';
import authRouter from './routes/authRouter.js';
dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
app.use('/images',express.static("images"));
//Initializing session sequelize store.
const sequelizeStore = connectionSession(session.Store);

app.use(session({
    secret:'super user',
    store:new sequelizeStore({
        db:sequelize,
    }),
    resave:false,
    saveUninitialized:false,
}))



app.use((req,res,next)=>{
    console.log(req.path, req.method);
    next();
})
app.use('/api/auth',authRouter);
app.use('/api/company',companyRouter);
app.use('/api/user',AdminRouter);

await sequelize.sync();

app.listen(process.env.PORT, (error)=>{
    if(error){
        console.error(error);
    }
    else{
        console.log(`Server is listening at port ${process.env.PORT}`);
    }
})

