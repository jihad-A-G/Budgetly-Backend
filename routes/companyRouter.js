import express  from "express";
import * as companyController from '../controllers/companyController.js';

const router =express.Router();

router.post("/company",companyController.addCompany);
router.patch("/company",companyController.updateCompany);

export default router;
