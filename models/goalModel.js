import sequelize from "../db.js";
import { DataTypes } from "sequelize";
import Users from './users.js';

const Goal = sequelize.define('User', {
    username: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false["Please add a text value"],
        unique: true
    }
})


Users.hasMany(Goal,{
    foreignKey: 'goalId',
    as: 'goal'
});
Goal.belongsTo(Users)

export default Goal;