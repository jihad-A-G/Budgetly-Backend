import {Sequelize} from "sequelize";

const sequelize = new Sequelize('Budgelty', 'sa', 'Node@7327', {
    host: 'localhost',
    dialect:'mssql'
  });

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  export default sequelize;