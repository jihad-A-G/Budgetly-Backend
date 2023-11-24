import sequelize from "../db";
import DataTypes from 'sequelize'

const Report = sequelize.define('Report', {
    report_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Report;