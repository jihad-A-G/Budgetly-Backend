import sequelize from "../db.js";
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
role:{
    type:DataTypes.TEXT,
    defaultValue:'admin'
},
admin_img:{
    type:DataTypes.TEXT,
    defaultValue:null
},


})

export default Admin;