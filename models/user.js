import sequelize from "../db";
import {DataTypes} from "sequelize";

const User = sequelize.define('User',{
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
    allowNull:false
},
user_img:{
    type:DataTypes.TEXT,
    allowNull:false
},
authorized:{
    type:DataTypes.BOOLEAN,
    defaultValue:false
}


})

export default User;