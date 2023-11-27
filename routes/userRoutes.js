import express from "express";
import * as usersController from "../controllers/usersController.js";

const router = express.Router();


router.post("/register", usersController.registerUser)
router.post("/login", usersController.loginUser)
router.get("/getUser", usersController.getUser)




export default router;