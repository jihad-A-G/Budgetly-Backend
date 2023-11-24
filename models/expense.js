import sequelize from "../db.js";
import DataTypes from 'sequelize'

const Expense = sequelize.define('Expense', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },

    expense_amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },

    expense_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
},
    {
        timestamps: true,
        paranoid: true
    }
);

Expense.sync()

export default Expense;

// date,category id foreign user id foreign

// Expense.sync();