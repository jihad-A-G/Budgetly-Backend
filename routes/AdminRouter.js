import express  from "express";
import * as AdminController from "../controllers/AdminController.js";
import upload from "../multer.js";

const router= express.Router();
router.get('/',AdminController.getAdmins);
router.get('/:adminId',AdminController.getAdminById); 
router.post('/',AdminController.addAdmin);
router.delete('/:adminId',AdminController.deleteAdmin);

export default router;