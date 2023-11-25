import Expense from "../models/expense.js";

//Get All Expenses
export const getAllExpense = async (req, res) => {
    const expenses = await Expense.findAll()
    res.status(200).json(expenses);
}

//Get One Expense
export const getOneExpense = async (req, res) => {
    const { id } = req.params
    try {
        const expenses = await Expense.findOne({ where: { id: id } })
        if (!expenses) {
            res.status(404).json({ error: 'No such id' });
        }
        else {
            res.status(200).json(expenses);
        }
    } catch (err) {
        console.log(err)
    }
}


//Create Expense
export const createExpense = async (req, res) => {
    try {

        const createdExpense = await Expense.create(req.body);
        res.status(200).json(createdExpense);
    }
    catch (err) {
        console.error(err);
    }
}

//Update Expense
export const updateExpense = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedExpense = await Expense.findOne({ where: { id: id } })
        if (!updatedExpense) {
            res.status(404).json({ error: 'No such id' })
        } else {
            await Expense.update(req.body, { where: { id: id } })
            res.status(200).json(updatedExpense)
        }
    }
    // await Expense.update(req.body, { where: { id: id } })
    //HASHHHHHHHHH

    catch (err) {
        console.error(err);
    }
}

//Delete Expense
export const deleteExpense = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedExpense = await Expense.findOne({ where: { id: id } });
        if (!deletedExpense) {
            res.status(404).json({ error: 'No Such ID' });
        }
        else {
            await Expense.destroy({ where: { id: id } });
            res.status(200).json({ deletedExpense });
        }
    }
    catch (err) {
        console.error(err);
    }
}

//Get Sum Expenses
export const getSumExpense = async (req, res) => {
    try {
        const sum = await Expense.sum('expense_amount');
        if (!sum) {
            res.status(404).json({ error: 'No expenses found' });
        } else {
            res.status(200).json({ "Expense Sum": sum });
        }
    } catch (err) {
        console.log(err);
    }
}