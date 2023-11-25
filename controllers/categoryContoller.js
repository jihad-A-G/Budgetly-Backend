import Category from "../models/categoryModel.js";
import Income from "../models/incomeModel.js";
import fs from "fs/promises";
import { Op } from "sequelize";

//Create a new category
export const addCategory = async (req, res, next) => {
  try {
    const { category_name, date } = req.body;

    // check if the category is already created
    const existingCategory = await Category.findOne({
      where: { category_name: category_name },
    });

    if (existingCategory) {
      return res
        .status(400)
        .json({ message: "Category with this name already exists." });
    }

    const category_image = req.file ? req.file.path : null;

    // creates the category if its not created previously
    const newCategory = await Category.create({
      category_name: category_name,
      category_image: category_image,
      date: date,
    });

    return res.status(200).json({
      message: `${newCategory.category_name} was created successfully!`,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update an existing category
export const updateCategory = async (req, res, next) => {
  try {
    if (req.body) {
      // Find the category by ID before the update
      const updateCategory = await Category.findByPk(req.params.id);

      if (req.file) {
        // Delete the existing image file if it exists
        if (updateCategory.category_image) {
          await fs.unlink(updateCategory.category_image);
        }
        // update the category with the new image path
        req.body.category_image = req.file.path;
      } else {
        req.body.category_image = null;
      }

      // Update the category
      const [numRowsUpdated] = await Category.update(
        { ...req.body },
        { where: { id: req.params.id }, returning: true }
      );

      // numRowsUpdated is the number of rows affected by the update
      if (numRowsUpdated === 1) {
        return res.status(200).json({
          message: `Category updated successfully!`,
        });
      } else {
        return res.status(404).json({ message: `Category not found!` });
      }
    }
    res.status(400).json({ message: "Invalid request body!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    const deletedCategory = await Category.findByPk(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    await Category.destroy({
      where: { id: id },
    });

    return res.status(200).json({
      message: `Category ${deletedCategory.category_name} and its related incomes were deleted!`,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// get a single category
export const singleCategory = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ error: "Invalid ID provided" });
    }

    const oneCategory = await Category.findOne({
      where: { id: id },
      include: Income,
    });

    if (!oneCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json(oneCategory);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to retrieve the requested Category" });
  }
};

// get all categories without sorting
export const allCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      include: Income,
    });

    if (!categories) {
      return res.status(404).json({ error: "No categories found" });
    }

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve the categories" });
  }
};

// Get Categories by Day
export const getCategoriesByDay = async (req, res) => {
  try {
    const requestedDate = new Date(req.params.date);
    const startOfDay = new Date(
      requestedDate.getFullYear(),
      requestedDate.getMonth(),
      requestedDate.getDate(),
      0,
      0,
      0,
      0
    );
    const endOfDay = new Date(
      requestedDate.getFullYear(),
      requestedDate.getMonth(),
      requestedDate.getDate(),
      23,
      59,
      59,
      999
    );

    const categoriesByDay = await Category.findAll({
      where: {
        date: {
          [Op.between]: [startOfDay, endOfDay],
        },
      },
      order: [["date", "DESC"]],
      include: Income,
    });

    if (categoriesByDay.length === 0) {
      return res
        .status(200)
        .json({ message: "No categories found for the specified period." });
    }

    res.status(200).json(categoriesByDay);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error fetching categories for the specified day" });
  }
};

// Get Categories by Week
export const getCategoriesByWeek = async (req, res) => {
  try {
    const selectedDate = new Date(req.params.selectedDate);
    const sortOrder = req.query.order === "asc" ? "ASC" : "DESC";

    const startOfInterval = new Date(selectedDate);
    startOfInterval.setHours(0, 0, 0, 0);

    const endOfInterval = new Date(selectedDate);
    endOfInterval.setDate(selectedDate.getDate() + 6);
    endOfInterval.setHours(23, 59, 59, 999);

    const categoriesByWeek = await Category.findAll({
      where: {
        date: {
          [Op.between]: [startOfInterval, endOfInterval],
        },
      },
      order: [["date", sortOrder]],
      include: Income,
    });

    if (categoriesByWeek.length === 0) {
      return res.status(200).json({
        message: "No categories found for the specified period.",
      });
    }

    res.status(200).json(categoriesByWeek);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error fetching categories for the specified week",
    });
  }
};

// Get Categories by Month
export const getCategoriesByMonth = async (req, res) => {
  try {
    const { year, month, order } = req.query;

    const startOfMonth = new Date(year, month - 1, 1, 0, 0, 0, 0);
    const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);

    // Check if there's an "order" parameter
    const sortOrder = order === "asc" ? "ASC" : "DESC";

    const categoriesByMonth = await Category.findAll({
      where: {
        date: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
      },
      order: [["date", sortOrder]],
      include: Income,
    });

    if (categoriesByMonth.length === 0) {
      return res
        .status(200)
        .json({ message: "No categories found for the specified period." });
    }

    res.status(200).json(categoriesByMonth);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error fetching categories for the specified month" });
  }
};
