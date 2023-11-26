import sequelize from "../db.js";
import {DataTypes} from "sequelize";

const Goal = sequelize.define('Goal',{
goal_name:{
    type:DataTypes.TEXT,
    allowNull:false
},
start_date:{
    type:DataTypes.DATE,
    allowNull:false
},
end_date:{
    type:DataTypes.DATE,
    allowNull:false
},

target_amount:{
    type:DataTypes.INTEGER,
    allowNull:false
},
})

export default Goal;