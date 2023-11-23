import express from "express";
import * as authController from '../controllers/authController.js'

const router =express.Router();
router.post('/signup',authController.userSignUp);
router.post('/login', authController.userLogin);

export default router;