import sequelize from "../db.js";
import { DataTypes } from "sequelize";
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
    defaultValue:null,
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
