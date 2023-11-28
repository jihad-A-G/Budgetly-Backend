import Expense from "../models/expense.js";
import { Op } from "sequelize";

//POST Report
export const postReport = async (req, res) => {
    try {
        const { start_date, end_date } = req.body;
        const report = await Expense.findAll({ where: { date: { [Op.gte]: start_date, [Op.lte]: end_date } } })
        res.status(200).json(report);
    }
    catch (err) {
        console.log(err);
    }
}

// //GET Report
// export const getReport = async (req, res) => {
//     try {
//         const reports = await Expense.findAll()
//         if (!reports) {
//             res.status(404).json({ error: 'No reports found in this range' });
//         }
//         else {
//             res.status(200).json(reports);
//         }
//     }
//     catch (err) {
//         console.log(err);
//     }
// }