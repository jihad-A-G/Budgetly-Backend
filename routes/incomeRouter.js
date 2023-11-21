import express from "express";
import * as incomeController from "../controllers/incomeController.js";

const router = express.Router();

router.post("/", incomeController.addIncome);
router.patch("/:id", incomeController.updateIncome);
// router.delete("/:id", incomeController.deleteIncome);
// router.get("/:id", incomeController.singleIncome);
// router.get("/", incomeController.allIncomes);

export default router;
