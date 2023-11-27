import express  from "express";
import * as companyController from '../controllers/companyController.js';

const router =express.Router();
router.get('/',companyController.getCompany);
router.post("/",companyController.addCompany);
router.put("/",companyController.updateCompany);

export default router;
