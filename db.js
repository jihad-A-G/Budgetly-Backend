import {Sequelize} from "sequelize";

const sequelize = new Sequelize('Budgetly', 'sa', `Jihad@2711`, {
    host: 'localhost',
    port:'1433',
    dialect:'mssql'
  });

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  export default sequelize;