// import express  from "express";
// import dotenv from "dotenv";
// import sequelize from "./db.js";
// dotenv.config();

// const app = express();

// await sequelize.sync();

// app.listen(process.env.PORT, (error)=>{
//     if(error){
//         console.error(error);
//     }
//     else{
//         console.log(`Server is listening at port ${process.env.PORT}`);
//     }
// })

import express from "express";
import dotenv from "dotenv";
import sequelize from "./db.js";
import Income from "./models/income.js"; // Import your Sequelize models
import Category from "./models/category.js";
dotenv.config();

const app = express();

async function startServer() {
  try {
    // Synchronize Sequelize models with the database
    sequelize.sync({ force: true }).then(() => {
      console.log("Database and tables synced");
    });
    // Start the Express.js server
    app.listen(process.env.PORT, (error) => {
      if (error) {
        console.error(error);
      } else {
        console.log(`Server is listening at port ${process.env.PORT}`);
      }
    });
  } catch (error) {
    console.error("Error syncing Sequelize models:", error);
  }
}

// Call the async function to start the server
startServer();
