import sequelize from "../db.js";
import DataTypes from 'sequelize'
// import Report from '../models/report.js'

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


// Expense.belongsTo(Report, {
//     foreignKey: 'reportId',
//     as: 'report'
//    });

Expense.sync()

export default Expense;

// date,category id foreign user id foreign

// Expense.sync();