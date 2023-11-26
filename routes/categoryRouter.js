import express from "express";
import * as categoryController from "../controllers/categoryContoller.js";
import upload from "../multer.js";

const router = express.Router();
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
router.get("/", categoryController.allCategories);
router.delete("/:id", categoryController.deleteCategory);
router.get("/:id", categoryController.singleCategory);

router.get(
  "/filter/categoriesbymonth",
  categoryController.getCategoriesByMonth
);
router.get("/categoriesbydate/:date", categoryController.getCategoriesByDay);
router.get(
  "/categoriesbyweek/:selectedDate",
  categoryController.getCategoriesByWeek
);
export default router;
