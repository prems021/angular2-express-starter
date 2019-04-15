

import {  sequelize , Sequelize } from '../routes/dbcon';
const dbcon_1 = require("../routes/dbcon");
  const Income_expence = sequelize.define('income_expense', {
    ID: {
      type: dbcon_1.Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    EXPENCE_ENTRY_NO: {
      type: dbcon_1.Sequelize.INTEGER,
      allowNull: true
    },
    EXPENCE_CATEGORY: {
      type: dbcon_1.Sequelize.STRING,
      allowNull: true
    },
    VENDOR: {
      type: dbcon_1.Sequelize.STRING,
      allowNull: true
    },
     BILL_NO: {
      type: dbcon_1.Sequelize.INTEGER,
      allowNull: true
    },
        
      EXP_DATE : {
        type : dbcon_1.Sequelize.DATEONLY,
        allowNull : true
      },

      TOTAL_AMOUNT: {
      type: dbcon_1.Sequelize.DECIMAL(10, 2),
      allowNull: true
    },
    

   

  
  }, {
    tableName: 'income_expense',
     timestamps: true
  });


export {Income_expence};
