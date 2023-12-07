import express from "express";
import * as authController from '../controllers/authController.js'

const router = express.Router();
router.post('/signup',authController.userSignUp);
router.post('/login', authController.userLogin);
router.post('/resetPassword',authController.requestResetPassword);
router.post('/setNewPassword',authController.resetPassword);

export default router;