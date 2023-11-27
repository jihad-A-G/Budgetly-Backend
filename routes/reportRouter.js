import express from "express";
import * as reportController from "../controllers/reportController.js";

const router = express.Router();

router.get("/report", reportController.getAllReports)
router.get("/report/:id", reportController.getOneReport)
router.post("/report", reportController.createReport )
router.put("/report/:id", reportController.updateReport)
router.post('/reportByDate',reportController.createdReportByDate);

export default router;