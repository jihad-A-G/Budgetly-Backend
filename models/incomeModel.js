import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const Income = sequelize.define("Income", {
  income_name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  income_amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  }, 
});



export default Income;
