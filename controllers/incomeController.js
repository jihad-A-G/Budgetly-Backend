import Income from "../models/incomeModel.js";
import Category from "../models/categoryModel.js";
import User from "../models/userModel.js";
import { Op } from "sequelize";

//Create a new Income
export const addIncome = async (req, res, next) => {
  try {
    const { income_name, income_amount, CategoryId, date, userId } = req.body;
    const existingUser = await User.findOne({
      where: { id: userId },
    });

    if (!existingUser) {
      return res.status(400).json({ message: "User not found." });
    }

    // check if the category exists
    const existingCategory = await Category.findByPk(CategoryId);

    if (!existingCategory) {
      return res.status(404).json({
        message: `Category with id ${CategoryId} not found.`,
      });
    }

    // check if the income is already created
    const existingIncome = await Income.findOne({
      where: { income_name: income_name },
    });

    if (existingIncome) {
      return res
        .status(409)
        .json({ message: "Income with this name already exists." });
    }

    // creates the Income if its not created previously
    const newIncome = await Income.create({
      income_name: income_name,
      income_amount: income_amount,
      date: date,
      CategoryId: CategoryId,
      userId: userId,
    });

    // include category
    const createdIncome = await Income.findByPk(newIncome.id, {
      include: [Category, User],
    });
    const category_name = createdIncome.Category.category_name;
    const user_name = createdIncome.User.username;
    return res.status(201).json({
      message: `${newIncome.income_name} was created successfully!`,
      Category: category_name,
      User: user_name,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update an existing Income
export const updateIncome = async (req, res, next) => {
  try {
    const income = await Income.findByPk(req.params.id);

    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }

    // Update only the specified fields
await Income.update({...req.body}, {
      where: { id: req.params.id },
    });

    // Include category and user
    const updatedIncome = await Income.findByPk(req.params.id, {
      include: [Category, User],
    });

    return res.status(200).json({
      message: "Income updated successfully!",
      updatedIncome: updatedIncome,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete an existing income
export const deleteIncome = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (id) {
      const incomeNameToDelete = await Income.findByPk(id);

      const income = await Income.destroy({
        where: { id: id },
      });

      // same concept as before if the number of rows is greater than 0 then it means rows' number updated
      // if it is 0 then it did not update/delete
      if (income > 0) {
        return res.status(200).json({
          message: `Income ${incomeNameToDelete.income_name} was deleted!`,
        });
      } else {
        return res.status(404).json({ message: `Income is not found` });
      }
    }

    return res.status(400).json({ message: "Invalid Income ID" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//Get a single income
export const singleIncome = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ error: "Invalid ID provided" });
    }

    const oneIncome = await Income.findOne({
      where: { id: id },
      include: [Category, User],
    });

    if (!oneIncome) {
      return res.status(404).json({ error: "Income is not found" });
    }

    res.status(200).json(oneIncome);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve the requested Income" });
  }
};

// get all incomes (based on income amount desc/asc)
export const allIncomes = async (req, res, next) => {
  try {
    const orderDirection = req.query.order === "asc" ? "ASC" : "DESC";

    const incomes = await Income.findAll({
      order: [["income_amount", orderDirection]],
      include: [Category, User],
    });

    if (!incomes.length) {
      return res.status(404).json({ error: "No incomes found" });
    }

    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve the incomes" });
  }
};

// get all incomes (based on income name desc/asc)
export const allIncomesByName = async (req, res, next) => {
  try {
    const orderDirection = req.query.order === "asc" ? "ASC" : "DESC";

    const incomes = await Income.findAll({
      order: [["income_name", orderDirection]],
      include: [Category, User],
    });

    if (!incomes.length) {
      return res.status(404).json({ error: "No incomes found" });
    }

    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve the incomes" });
  }
};

// get all incomes by category
export const getIncomesByCategory = async (req, res, next) => {
  const { category } = req.params;

  try {
    const foundCategory = await Category.findOne({
      where: { category_name: category },
    });
    if (!foundCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    const incomes = await Income.findAll({
      where: { CategoryId: foundCategory.id },
      include: [Category, User],
    });

    if (incomes.length === 0) {
      return res
        .status(404)
        .json({ error: `No incomes found in category ${category}` });
    }

    res.status(200).json(incomes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching incomes by category" });
  }
};

// Get the sum of all incomes
export const sumOfIncomes = async (req, res, next) => {
  try {
    const totalIncome = await Income.sum("income_amount");
    res.json({ totalIncome: totalIncome || 0 });
  } catch (error) {
    console.error("Error calculating total incomes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//filtering
// Get Incomes by Day
export const getIncomesByDay = async (req, res) => {
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

    const incomesByDay = await Income.findAll({
      where: {
        date: {
          [Op.between]: [startOfDay, endOfDay],
        },
      },
      order: [["date", "DESC"]],
    });

    if (incomesByDay.length === 0) {
      return res
        .status(200)
        .json({ message: "No incomes found for the specified period." });
    }

    res.status(200).json(incomesByDay);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error fetching incomes for the specified day" });
  }
};

// Get Incomes by Week
export const getIncomesByWeek = async (req, res) => {
  try {
    const selectedDate = new Date(req.params.selectedDate);
    const sortOrder = req.query.order === "asc" ? "ASC" : "DESC";

    const startOfInterval = new Date(selectedDate);
    startOfInterval.setHours(0, 0, 0, 0);

    const endOfInterval = new Date(selectedDate);
    endOfInterval.setDate(selectedDate.getDate() + 6);
    endOfInterval.setHours(23, 59, 59, 999);

    const IncomesByWeek = await Income.findAll({
      where: {
        date: {
          [Op.between]: [startOfInterval, endOfInterval],
        },
      },
      order: [["date", sortOrder]],
    });

    if (IncomesByWeek.length === 0) {
      return res.status(200).json({
        message: "No incomes found for the specified period.",
      });
    }

    res.status(200).json(IncomesByWeek);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error fetching incomes for the specified week",
    });
  }
};

// Get Incomes by Month
export const getIncomesByMonth = async (req, res) => {
  try {
    const { year, month, order } = req.query;

    const startOfMonth = new Date(year, month - 1, 1, 0, 0, 0, 0);
    const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);

    // Check if there's an "order" parameter
    const sortOrder = order === "asc" ? "ASC" : "DESC";

    const incomesByMonth = await Income.findAll({
      where: {
        date: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
      },
      order: [["date", sortOrder]],
    });

    if (incomesByMonth.length === 0) {
      return res
        .status(200)
        .json({ message: "No incomes found for the specified period." });
    }

    res.status(200).json(incomesByMonth);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error fetching incomes for the specified month" });
  }
};
