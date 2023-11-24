import sequelize from "../db.js";
import { DataTypes } from "sequelize";
// import Income from "./income.js";
const Category = sequelize.define("Category", {
  category_name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  category_image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
});

export default Category;
