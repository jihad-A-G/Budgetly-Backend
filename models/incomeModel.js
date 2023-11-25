import sequelize from "../db.js";
import { DataTypes } from "sequelize";
import Category from "./categoryModel.js";

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

// relation with category (one to many)
const associateModels = () => {
  Category.hasMany(Income, {
    onDelete: "CASCADE",
    hooks: true,
  });
  Income.belongsTo(Category);
};
export { associateModels };

export default Income;
