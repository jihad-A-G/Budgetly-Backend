import Income from '../models/incomeModel.js';
import Expense from '../models/expense.js';
import Company from '../models/companyModel.js';
import sequelize from '../db.js';
const getDashboardData = async (req,res,next) =>{
    try{
        const incomes = await Income.findAll();
        const expenses = await Expense.findAll();
        const profit = await Company.findOne({attributes:['profit']});
        const income_amount = incomes.reduce((accumelator,current) => accumelator+current,0);
        const expense_amount = expenses.reduce((accumelator,current) => accumelator+current,0);
        const balance = profit + (income_amount - expense_amount);
        console.log(incomes,expenses,profit,balance);
        return res.json('done');
    }catch(err){
        console.log(err);
    }
}

export default getDashboardData;