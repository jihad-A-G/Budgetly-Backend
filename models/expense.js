import sequelize from "../db.js";
import DataTypes from 'sequelize'

const Expense = sequelize.define('Expense', {

    expense_amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },

    expense_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    date: {
        type: DataTypes.DATE,
        allowNull: false
    }
},
    // {
    //     timestamps: true,
    //     paranoid: true,
    //     freezeTableName: true
    // }
);



export default Expense;

// date,category id foreign user id foreign
