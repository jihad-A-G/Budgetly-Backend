import sequelize from "../db.js";
import { DataTypes } from "sequelize";
import Category from "./categoryModel.js";
import User from "./userModel.js";

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
  Income.belongsTo(User, {
    foreignKey: {
      name: "UserId",
      allowNull: false,
    },
    onDelete: "CASCADE",
  });
}
export { associateModels };

const associateModels1 =() => {
  Income.belongsTo(Category, {
    foreignKey: {
      name: "CategoryId",
      allowNull: false,
    },
    onDelete: "CASCADE",
  });
  
};
export { associateModels1}

export default Income;

