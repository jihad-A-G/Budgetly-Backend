import sequelize from "../db";
import {DataTypes} from "sequelize";

const Company = sequelize.define('Company',{
name:{
    type:DataTypes.TEXT,
    allowNull:false
},
description:{
    type:DataTypes.TEXT,
    allowNull:false
},
profit:{
    type:DataTypes.NUMBER,
    allowNull:false
},


},{
    freezeTableName:true,
})

export default Company;