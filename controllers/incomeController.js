import Income from "../models/income.js";
import sequelize from "../db.js";
import Category from "../models/category.js";
import { Op } from 'sequelize';

//Create a new Income
export const addIncome = async (req, res, next) => {
  try {
    const { income_name, income_amount, CategoryId } = req.body;

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
      CategoryId: CategoryId,
    });

    const { category_name } = await newIncome.getCategory();

    return res.status(201).json({
      message: `${newIncome.income_name} was created successfully!`,
      category_name: category_name,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update an existing Income
export const updateIncome = async (req, res, next) => {
  try {
    const { income_name, income_amount, CategoryId } = req.body;
    const income = await Income.findByPk(req.params.id);

    const existingCategory = await Category.findByPk(CategoryId);
    if (!existingCategory) {
      return res.status(404).json({
        message: `Category with id ${CategoryId} not found.`,
      });
    }

    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }

    await income.update({
      income_name: income_name,
      income_amount: income_amount,
      CategoryId: CategoryId,
    });

    return res.status(200).json({ message: "Income updated successfully!" });
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
    });

    if (!oneIncome) {
      return res.status(404).json({ error: "Income is not found" });
    }

    res.status(200).json(oneIncome);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve the requested Income" });
  }
};

// get all incomes without sorting
export const allIncomes = async (req, res, next) => {
  try {
    const incomes = await Income.findAll();

    if (!incomes) {
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
      include: [Category],
    });

    if (incomes.length === 0) {
      return res
        .status(404)
        .json({ error: `No incomes found in category '${category}'` });
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
// Asc order for income
export const allIncomesAsc = async (req, res, next) => {
  try {
    const incomes = await Income.findAll({
      order: [["income_amount", "ASC"]],
    });
    res.json(incomes);
  } catch (error) {
    console.error("Error fetching incomes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Desc order for income
export const allIncomesDesc = async (req, res, next) => {
  try {
    const incomes = await Income.findAll({
      order: [["income_amount", "DESC"]],
    });
    res.json(incomes);
  } catch (error) {
    console.error("Error fetching incomes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Filter incomes by daily interval
export const getDailyIncomes = async (req, res, next) => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);

    const dailyIncomes = await Income.findAll({
      where: {
        createdAt: {
          [Op.between]: [startOfDay, endOfDay],
        },
      },
    });

    res.status(200).json(dailyIncomes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching daily incomes" });
  }
};

// Filter incomes by weekly interval
export const getWeeklyIncomes = async (req, res, next) => {
  try {
    const today = new Date();
    const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay(), 0, 0, 0, 0);
    const endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 6, 23, 59, 59, 999);

    const weeklyIncomes = await Income.findAll({
      where: {
        createdAt: {
          [Op.between]: [startOfWeek, endOfWeek],
        },
      },
    });

    res.status(200).json(weeklyIncomes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching weekly incomes" });
  }
};

// Filter incomes by monthly interval
export const getMonthlyIncomes = async (req, res, next) => {
  try {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0, 0);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999);

    const monthlyIncomes = await Income.findAll({
      where: {
        createdAt: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
      },
    });

    res.status(200).json(monthlyIncomes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching monthly incomes" });
  }
};
