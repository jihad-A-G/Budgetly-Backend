import sequelize from "../db";
import {DataTypes} from "sequelize";

const Admin = sequelize.define('Admin',{
    username:{
        type:DataTypes.TEXT,
        allowNull:false,
    },
email:{
    type:DataTypes.TEXT,
    allowNull:false
},
password:{
    type:DataTypes.TEXT,
    allowNull:false
},
admin_img:{
    type:DataTypes.TEXT,
    allowNull:false
},


})

export default Admin;