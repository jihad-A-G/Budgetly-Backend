import Income from "../models/income.js";

//Create a new Income
export const addIncome = async (req, res, next) => {
  try {
    const { income_name, income_amount } = req.body;

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
    });

    return res.status(201).json({
      message: `${newIncome.income_name} was created successfully!`,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update an existing Income
export const updateIncome = async (req, res, next) => {
  try {
    const { income_name, income_amount } = req.body;
    const income = await Income.findByPk(req.params.id);

    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }

    await income.update({
      income_name: income_name,
      income_amount: income_amount,
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
      const income = await Income.destroy({
        where: { id: id },
      });
      // same concept as before if the number of rows is greater than 0 then it means rows' number updated
      // if it is 0 then it did not update/delete
      if (income > 0) {
        return res.status(200).json({ message: `Income was deleted!` });
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
