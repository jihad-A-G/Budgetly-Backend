import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const Category = sequelize.define("Category", {
  categoryName: {
    type: DataTypes.CHAR,
    allowNull: false,
  },
  categoryImage: {
    type: DataTypes.BLOB,
    allowNull: true,
  },
});

export default Category;
