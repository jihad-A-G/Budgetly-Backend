import express  from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.listen(process.env.PORT, (error)=>{
    if(error){
        console.error(error);
    }
    else{
        console.log(`Server is listening at port ${process.env.PORT}`);
    }
})

