import sequelize from "../db";
import DataTypes from 'sequelize'

const report = sequelize.define('Report', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});