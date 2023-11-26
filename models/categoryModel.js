import sequelize from "../db.js";
import { DataTypes } from "sequelize";
import User from "./userModel.js";
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

const associateModels = ()=> {
  User.hasMany(Category, {
    onDelete: "CASCADE",
    hooks: true,
    foreignKey: { name: "UserId", allowNull: false },
  });
  Category.belongsTo(User, {
    foreignKey: { name: "UserId", allowNull: false }, 
  });
}
export {associateModels};


export default Category;
