import express  from "express";
import dotenv from "dotenv";
import sequelize from "./db.js";
dotenv.config();

const app = express();

await sequelize.sync();

app.listen(process.env.PORT, (error)=>{
    if(error){
        console.error(error);
    }
    else{
        console.log(`Server is listening at port ${process.env.PORT}`);
    }
})

