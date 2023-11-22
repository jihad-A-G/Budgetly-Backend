import sequelize from "../db.js";
import { DataTypes } from "sequelize";
import Income from "./income.js";
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

//to make the link
const associateModels = () => {
  Category.hasMany(Income);
};

export { associateModels };
export default Category;
