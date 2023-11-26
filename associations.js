import Company from "./models/companyModel.js";
import User from "./models/userModel.js";
import Admin from "./models/adminModel.js";
import Goal from "./models/goalModel.js";
import Category from "./models/categoryModel.js";
import Income from "./models/incomeModel.js";

//One-To-Many relation between company and users
Company.hasMany(User, { foreignKey: { name: "compId", allowNull: false } });
User.belongsTo(Company, { foreignKey: { name: "compId", allowNull: false } });

//One-To-Many relation between the admin and company
Company.hasMany(Admin, { foreignKey: { name: "compId", allowNull: false } });
Admin.belongsTo(Company, { foreignKey: { name: "compId", allowNull: false } });

//One-To-Many relation between the user and goal
User.hasMany(Goal, { foreignKey: { name: "userId", allowNull: false } });
Goal.belongsTo(User, { foreignKey: { name: "userId", allowNull: false } });

//One-To-Many relation between the user and income
User.hasMany(Income, {
  foreignKey: { name: "UserId", allowNull: false },
  onDelete: "CASCADE",
});
Income.belongsTo(User, { foreignKey: { name: "UserId", allowNull: false } });

//One-To-Many relation between the user and category
User.hasMany(Category, {
  foreignKey: { name: "UserId", allowNull: false },
  onDelete: "CASCADE",
});
Category.belongsTo(User, { foreignKey: { name: "UserId", allowNull: false } });

//One-To-Many relation between the category and income
Category.hasMany(Income, {
  foreignKey: { name: "CategoryId", allowNull: false },
  onDelete: "CASCADE",
});
Income.belongsTo(Category, {
  foreignKey: { name: "CategoryId", allowNull: false },
});
