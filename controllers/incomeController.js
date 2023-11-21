import Income from "../models/income.js";

//Create a new Income
export const addIncome = async (req, res, next) => {
  try {
    const { income_name, income_amount } = req.body;

    // check if the inserted data is the right type of data
    if (
      !income_name ||
      typeof income_name !== "string" ||
      !income_amount ||
      isNaN(income_amount)
    ) {
      return res.status(400).json({ message: "Invalid input data" });
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

    if (
      !income_name ||
      typeof income_name !== "string" ||
      !income_amount ||
      isNaN(income_amount)
    ) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const income = await Income.findByPk(req.params.id);

    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }

    await income.update(req.body);

    return res.status(200).json({ message: "Income updated successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
