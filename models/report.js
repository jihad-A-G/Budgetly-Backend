import sequelize from "../db.js";
import DataTypes from 'sequelize';

const Report = sequelize.define('Report', {

    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },

    report_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },

    // start_date: {
    //     type: DataTypes.DATE,
    //     allowNull: false
    // },
    
    // end_date: {
    //     type:DataTypes.DATE,
    //     allowNull: false
    // }

}
);


Report.sync()

export default Report;