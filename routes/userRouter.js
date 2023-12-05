import express  from "express";
import * as AdminController from "../controllers/AdminController.js";
import getDashboardData from "../controllers/dashboardController.js";
import upload from "../multer.js";

const router= express.Router();
router.get('/',AdminController.getUsers);
router.get('/dashboard',getDashboardData);
router.get('/:id',AdminController.getUserById);
router.post('/',AdminController.addUser);
router.put('/:id',upload.single('user_img'),AdminController.updateUserProfileImg);
router.delete('/:id',AdminController.deleteUser);

export default router;