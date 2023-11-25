import express  from "express";
import * as GoalController from "../controllers/goalController.js";

const router= express.Router();
router.get('/',GoalController.getGoals);
router.get('/:id',GoalController.getGoalById); 
router.post('/',GoalController.addGoal);
router.put('/:id',GoalController.updateGoal);
router.delete('/:id',GoalController.deleteGoal);

export default router;