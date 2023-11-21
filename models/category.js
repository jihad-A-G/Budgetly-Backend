import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const Category = sequelize.define("Category", {
  category_name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  category_image: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

export default Category;
