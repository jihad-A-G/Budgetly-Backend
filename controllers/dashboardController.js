import Income from '../models/incomeModel.js';
import Expense from '../models/expense.js';
import Company from '../models/companyModel.js';
import sequelize from '../db.js';
const getDashboardData = async (req,res,next) =>{
    try{
        const incomes = await Income.findAll();
        const expenses = await Expense.findAll();
        const profit = await Company.findOne({attributes:['profit']});
        const income_amount = incomes.reduce((accumelator,current) => accumelator+current.income_amount,0);
        const expense_amount = expenses.reduce((accumelator,current) => accumelator+current.expense_amount,0);
        const balance = profit.dataValues.profit + (income_amount - expense_amount);
if(incomes && expenses){
    return res.status(200).json({incomes:incomes,expenses:expenses,expense_amount:expense_amount,income_amount:income_amount,balance:balance});
}
       res.status(404).json({message:'expenses or incomes may be null!'});
    }catch(err){
        console.log(err);
    }
}

export default getDashboardData;