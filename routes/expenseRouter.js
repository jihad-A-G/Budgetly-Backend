import express from "express";
import * as expenseController from "../controllers/expenseController.js"

const router = express.Router();

router.get("/expense", expenseController.getAllExpense)
router.get("/expense/:id", expenseController.getOneExpense)
router.post("/expense", expenseController.createExpense)
router.put("/expense/:id", expenseController.updateExpense)
router.delete("/expense/:id", expenseController.deleteExpense)
router.get("/expense/filter/sum", expenseController.getSumExpense)




export default router;