import express  from "express";
import * as companyController from '../controllers/companyController.js';

const router =express.Router();

router.post("/",companyController.addCompany);
router.patch("/",companyController.updateCompany);

export default router;
