import sequelize from "../db.js";
import DataTypes from 'sequelize'
import Report from '../models/report.js'

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

Report.hasMany(Expense,{foreignKey:{name:'reportId',allowNull:true}});
Expense.belongsTo(Report, {
    foreignKey: 'reportId',
   });


export default Expense;

// date,category id foreign user id foreign

// Expense.sync();