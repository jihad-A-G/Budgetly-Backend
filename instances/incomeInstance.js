import Income from "../models/income";

async function createAndSaveIncome() {
  try {
    // Create an instance of the Income model in memory
    const incomeInstance = Income.build({ incomeAmount: 2000 });

    // Save the instance to the database
    await incomeInstance.save();

    console.log(
      "Income instance created and saved to the database:",
      incomeInstance.toJSON()
    );
  } catch (error) {
    console.error("Error creating and saving income instance:", error.message);
  }
}

createAndSaveIncome();

// async function createIncome() {
//   try {
//     const incomeInstance = await Income.create({
//       incomeAmount: 9000,
//       // Other attributes...
//     });

//     console.log("Income instance created:", incomeInstance.toJSON());
//   } catch (error) {
//     console.error("Error creating income instance:", error.message);
//   }
// }

// createIncome();
