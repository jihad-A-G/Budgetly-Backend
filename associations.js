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
User.hasMany(Goal, { foreignKey: { name: "userId", allowNull: true } });
Goal.belongsTo(User, { foreignKey: { name: "userId", allowNull: true } });

//One-To-Many relation between the user and income
User.hasMany(Income, {
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE',
  foreignKey: { name: "userId", allowNull: true },
});
Income.belongsTo(User, { foreignKey: { name: "userId", allowNull: true } });

//One-To-Many relation between the user and category
User.hasMany(Category, {
  onDelete: 'SET NULL',
  onUpdate: 'SET DEFAULT',
  foreignKey: { name: "userId", allowNull: true },
});
Category.belongsTo(User, { foreignKey: { name: "userId", allowNull: true } });

//One-To-Many relation between the category and income
Category.hasMany(Income, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  foreignKey: {
    name: "CategoryId",
    allowNull: true,
  },
});

Income.belongsTo(Category, {
  foreignKey: {
    name: "CategoryId",
    allowNull: true,
  },
});
