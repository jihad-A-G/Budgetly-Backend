import Report from '../models/report.js';
// import Expense from '../models/expense.js';
// import { Op } from 'sequelize';

//Get All Reports
export const getAllReports = async (req, res) => {
    try {
        const reports = await Report.findAll()
        res.status(200).json(reports);

    }
    catch (err) {
        console.log(err)
    }
}

//Get Report By ID
export const getOneReport = async (req, res) => {
    const { id } = req.params;
    try {
        const oneReport = await Report.findOne({ where: { id: id } });
        if (!oneReport) {
            res.status(404).json({ error: 'No such Report' });
        }
        else {
            res.status(200).json(oneReport);
        }
    }
    catch (err) {
        console.log(err)
    }
}

//Create Report 
export const createReport = async (req, res) => {
    try {
        const createdReport = await Report.create(req.body)
        res.status(200).json(createdReport)
    }
    catch (err) {
        console.log(err)
    }
}

//Update Report
export const updateReport = async (req, res) => {
    const { id } = req.params;
    try {
        const updateReport = await Report.findOne({ where: { id: id } })
        if (!updateReport) {
            res.status(404).json({ error: 'No Such id' })
        } else {
            await Report.update(req.body, { where: { id: id } })
            res.status(200).json(updateReport)
        }
    }
    catch (err) {
        console.log(err);
    }
}

// //CREATE Report By Date
// export const createdReportByDate = async (req, res) => {
//     try {
//         const { start_date, end_date } = req.body;
//         const start = new Date(start_date);
//         const end = new Date(end_date);

//         const expenses = await Expense.findAll({
//             where: {
//                 date: {
//                     [Op.between]: [start, end]
//                 }
//             },
//             attributes: ['expense_name', 'expense_amount']
//         })

//         const report = {
//             report_name: req.body.report_name,
//             start_date: start,
//             end_date: end,
//             Expense: expenses.map(expense => ({
//                 name: expense.expense_name,
//                 amount: expense.expense_amount
//             }))
//         };

//         const createdReport = await Report.create(report);
//         res.status(200).json(createdReport);
//     }
//     catch (err) {
//         console.log(err);
//     }
// }