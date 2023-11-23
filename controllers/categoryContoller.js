import Category from "../models/category.js";
import fs from 'fs/promises';

//Create a new category
export const addCategory = async (req, res, next) => {
  try {
    const { category_name } = req.body;

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
      
      if(req.file){
       // Delete the existing image file if it exists
       if (updateCategory.category_image) {
        await fs.unlink(updateCategory.category_image);
      }
      // Update the category with the new image path
      req.body.category_image = req.file.path;
      }

      // Update the category
      const [numRowsUpdated, [updatedCategory]] = await Category.update(
        { ...req.body },
        { where: { id: req.params.id }, returning: true }
      );

      // numRowsUpdated is the number of rows affected by the update
      if (numRowsUpdated === 1) {
        const oldCategoryName = updateCategory.category_name;
        const newCategoryName = updatedCategory.category_name;

        return res.status(200).json({
          message: `Category ${oldCategoryName} was updated successfully to ${newCategoryName}!`,
        });
      } else {
        return res.status(404).json({ message: `Category not found` });
      }
    }
    res.status(400).json({ message: "Invalid request body" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a category
export const deleteCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedCategoryName = await Category.findByPk(req.params.id);
    if (id) {
      const category = await Category.destroy({
        where: { id: id },
      });
      // same concept as before if the number of rows is greater than 0 then it means rows' number updated
      // if it is 0 then it did not update/delete
      if (category > 0) {
        return res.status(200).json({
          message: `Category ${deletedCategoryName.category_name} was deleted!`,
        });
      } else {
        return res.status(404).json({ message: `Category not found` });
      }
    }

    return res.status(400).json({ message: "Invalid category ID" });
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
    const categories = await Category.findAll();

    if (!categories) {
      return res.status(404).json({ error: "No categories found" });
    }

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve the categories" });
  }
};
