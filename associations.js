import Company from "./models/companyModel.js";
import User from "./models/userModel.js";
import Admin from "./models/adminModel.js";
import Goal from "./models/goalModel.js";

//One-To-Many relation between company and users
Company.hasMany(User,{foreignKey:{name:'compId',allowNull:false}});
User.belongsTo(Company,{foreignKey:{name:'compId',allowNull:false}});

//One-To-Many relation between the admin and company
Company.hasMany(Admin,{foreignKey:{name:'compId',allowNull:false}});
Admin.belongsTo(Company,{foreignKey:{name:'compId',allowNull:false}});

//One-To-Many relation between the user and goal
User.hasMany(Goal,{foreignKey:{name:'userId',allowNull:false}});
Goal.belongsTo(User,{foreignKey:{name:'userId',allowNull:false}});

