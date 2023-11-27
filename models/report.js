import sequelize from "../db.js";
import DataTypes from 'sequelize';

const Report = sequelize.define('Report', {


    report_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },

    start_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    
    end_date: {
        type:DataTypes.DATE,
        allowNull: false
    }
    // Expense:{
    //     type:DataTypes.STRING,
    //     get: function(){
    //         return JSON.stringify(this.getDataValue('Expense'));
    //     },
    //     set: function(exp){
    //         return this.setDataValue('Expense', JSON.stringify(exp));
    //     }

    // }

}
);


export default Report;