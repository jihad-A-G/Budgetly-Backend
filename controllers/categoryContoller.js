import Category from "../models/category.js";

//Create a new category
export const addCategory = async (req, res, next) => {
  try {
    const { category_name, category_image } = req.body;
    // check if the category is already created
    const existingCategory = await Category.findOne({
      where: { category_name: category_name },
    });

    if (existingCategory) {
      return res
        .status(400)
        .json({ message: "Category with this name already exists." });
    }

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
      const category = await Category.update(
        { ...req.body },
        { where: { id: req.params.id } }
      );
      // in sql update returns this [numRowsUpdated, [updatedRows]]
      // so if the category was found it will return 1 updated row with the name of the new row
      // category[0] === 1 means 1 row was updated
      // if no categories were update it will return as category[0] === 0; which means no row was updated
      if (category[0] === 1) {
        return res
          .status(200)
          .json({ message: `Category updated successfully!` });
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
// should we put the category's name that's being deleted in the response??
export const deleteCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (id) {
      const category = await Category.destroy({
        where: { id: id },
      });
      // same concept as before if the number of rows is greater than 0 then it means rows' number updated
      // if it is 0 then it did not update/delete
      if (category > 0) {
        return res.status(200).json({ message: `Category was deleted!` });
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
