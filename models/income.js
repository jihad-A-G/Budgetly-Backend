import sequelize from "../db.js";
import { DataTypes } from "sequelize";
import Category from "./category.js";
const Income = sequelize.define("Income", {
  income_name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  income_amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// to make the link
const associateModels = () => {
  Income.belongsTo(Category);
};

export { associateModels };
export default Income;
