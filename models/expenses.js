import sequelize from "../db";
import DataTypes from 'sequelize'

const expense = sequelize.define('Expense', {
    amount: {
        type: DataTypes.NUMBER,
        allowNull: false
    }
});


// date,category id foreign user id foreign