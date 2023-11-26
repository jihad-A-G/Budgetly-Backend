// import Category from "./models/categoryModel.js";
// import User from "./models/userModel.js";
// import Income from "./models/incomeModel.js";

// //relation between Income with Category and User
// export const associateModels = () => {
//   //relation between Category and User
//   User.hasMany(Category, {
//     onDelete: "CASCADE",
//     hooks: true,
//     foreignKey: { name: "UserId", allowNull: false }, // Correct placement of options
//   });
//   Category.belongsTo(User, {
//     foreignKey: { name: "UserId", allowNull: false }, // Correct placement of options
//   });

//     User.hasMany(Income, {
//     onDelete: "CASCADE",
//     hooks: true,
//     foreignKey: { name: "UserId", allowNull: false }
//   });
//   Income.belongsTo(User,{foreignKey: { name: "UserId", allowNull: false }});

//   Category.hasMany(Income, {
//     onDelete: "CASCADE",
//     hooks: true,
//     foreignKey: { name: "CategoryId", allowNull: false }
//   });
//   Income.belongsTo(Category, {foreignKey: { name: "CategoryId", allowNull: false }});
// }; 

// Import models with no dependencies
import User from "./models/userModel.js";
import Category from "./models/categoryModel.js";
import Income from "./models/incomeModel.js";

// Import association functions

// Associate models in the correct order
// associateUserModels();
// associateCategoryModels();
// associateIncomeModels();
