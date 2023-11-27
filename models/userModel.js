import sequelize from "../db.js";
import { DataTypes } from "sequelize";
import Category from "./categoryModel.js";
import Income from "./incomeModel.js";
const User = sequelize.define("User", {
  username: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  role: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  user_img: {
    type: DataTypes.TEXT, //edit this
    defaultValue: null,
    allowNull: true,
  },
  authorized: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});


export default User;
