import express from "express";
import * as incomeController from "../controllers/incomeController.js";

const router = express.Router();

router.get("/filter/sum", incomeController.sumOfIncomes);
router.get("/filter/incomeasc", incomeController.allIncomesAsc);
router.get("/filter/incomesbymonth", incomeController.getIncomesByMonth);
router.get("/filter/:category", incomeController.getIncomesByCategory);
router.get("/", incomeController.allIncomes);
router.get("/:id", incomeController.singleIncome);
router.post("/", incomeController.addIncome);
router.patch("/:id", incomeController.updateIncome);
router.delete("/:id", incomeController.deleteIncome);

router.get("/incomesbydate/:date", incomeController.getIncomesByDay);
router.get("/incomesbyweek/:selectedDate", incomeController.getIncomesByWeek);

export default router;
