import express from "express";
import * as incomeController from "../controllers/incomeController.js";

const router = express.Router();

router.get("/daily", incomeController.getDailyIncomes);
router.get("/weekly", incomeController.getWeeklyIncomes);
router.get("/monthly", incomeController.getMonthlyIncomes);

router.get("/:id", incomeController.singleIncome);
router.get("/filter/incomeasc", incomeController.allIncomesAsc);
router.get("/filter/incomedesc", incomeController.allIncomesDesc);
router.get("/filter/:category", incomeController.getIncomesByCategory);
router.get("/total/sumofincomes", incomeController.sumOfIncomes);
router.get("/", incomeController.allIncomes);
router.post("/", incomeController.addIncome);
router.patch("/:id", incomeController.updateIncome);
router.delete("/:id", incomeController.deleteIncome);

export default router;
