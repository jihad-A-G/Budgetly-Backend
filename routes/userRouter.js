import express  from "express";
import * as AdminController from "../controllers/AdminController.js";
import upload from "../multer.js";

const router= express.Router();
router.get('/',AdminController.getUsers);
router.get('/:id',AdminController.getUserById);
router.post('/',AdminController.addUser);
router.delete('/:id',AdminController.deleteUser);

export default router;