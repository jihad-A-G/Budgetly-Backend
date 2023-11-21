import sequelize from "../db.js";
import {DataTypes} from "sequelize";

const Company = sequelize.define('Company',{
company_name:{
    type:DataTypes.TEXT,
    allowNull:false
},
description:{
    type:DataTypes.TEXT,
    allowNull:false
},
profit:{
    type:DataTypes.INTEGER,
    allowNull:false
},


},{
    freezeTableName:true,
})

export default Company;