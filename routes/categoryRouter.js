import express from "express";
import * as categoryController from "../controllers/categoryContoller.js";
import upload from "../uploadMiddleware.js";

const router = express.Router();

// router.post("/", categoryController.addCategory);
// router.patch("/:id", categoryController.updateCategory);
// router.delete("/:id", categoryController.deleteCategory);
// router.get("/:id", categoryController.singleCategory);
// router.get("/", categoryController.allCategories)

router.post(
  "/",
  upload.single("category_image"),
  categoryController.addCategory
);
router.patch(
  "/:id",
  upload.single("category_image"),
  categoryController.updateCategory
);
router.delete("/:id", categoryController.deleteCategory);
router.get("/:id", categoryController.singleCategory);
router.get("/", categoryController.allCategories);
export default router;
