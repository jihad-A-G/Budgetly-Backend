import express from "express";
import * as expenseController from "../controllers/expenseController.js"

const router = express.Router();

router.get("/", expenseController.getAllExpense)
router.get("/:id", expenseController.getOneExpense)
router.post("/", expenseController.createExpense)
router.put("/:id", expenseController.updateExpense)
router.delete("/:id", expenseController.deleteExpense)
router.get("/filter/sum", expenseController.getSumExpense)


export default router;