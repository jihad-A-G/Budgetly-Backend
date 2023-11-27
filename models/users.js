import sequelize from "../db.js";
import {DataTypes} from "sequelize";

const Users = sequelize.define('Users',{
    username:{
        type:DataTypes.STRING,
        allowNull:false,
    },
email:{
    type:DataTypes.STRING,
    allowNull:false ["Please add an email"],
    unique:true 
},
password:{
    type:DataTypes.STRING,
    allowNull:false ["Please add a password"],
    unique:true 
}


})

export default Users;