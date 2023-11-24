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
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
});

// relation with category
const associateModels = () => {
  Category.hasMany(Income);
  Income.belongsTo(Category);
};
export { associateModels };

export default Income;
