import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const Income = sequelize.define("Income", {
  incomeAmount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Income;
