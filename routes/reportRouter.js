import express from "express";
import * as reportController from "../controllers/reportController.js";

const router = express.Router();

router.post('/report', reportController.postReport);
// router.get('/report', reportController.getReport);

export default router;