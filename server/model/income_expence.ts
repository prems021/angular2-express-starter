

import {  sequelize , Sequelize } from '../routes/dbcon';

  const Income_expence = sequelize.define('income_expense', {
    ID: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    EXPENCE_ENTRY_NO: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    EXPENCE_CATEGORY: {
      type: Sequelize.STRING,
      allowNull: true
    },
    VENDOR: {
      type: Sequelize.STRING,
      allowNull: true
    },
     BILL_NO: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
        
      EXP_DATE : {
        type : Sequelize.DATEONLY,
        allowNull : true
      },

      TOTAL_AMOUNT: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true
    },
    

   

  
  }, {
    tableName: 'income_expense',
     timestamps: true
  });


export {Income_expence};
