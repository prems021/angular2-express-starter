
import {  sequelize , Sequelize } from '../routes/dbcon';
const dbcon_1 = require("../routes/dbcon");
  const Expence_detail = sequelize.define('expense_detail', {
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
     SI_NO: {
      type: dbcon_1.Sequelize.INTEGER,
      allowNull: true
    },

    
    PRODUCT_NAME: {
      type: dbcon_1.Sequelize.STRING,
      allowNull: true
    },
      HSN_CODE: {
      type: dbcon_1.Sequelize.INTEGER,
      allowNull: true
    },
     QUANTITY: {
      type: dbcon_1.Sequelize.INTEGER,
      allowNull: true
    },
   PRICE: {
      type: dbcon_1.Sequelize.DECIMAL(10, 2),
      allowNull: true
    },
    
  
    UNIT: {
      type: dbcon_1.Sequelize.STRING,
      allowNull: true
    },
  
      NET_TOTAL: {
      type: dbcon_1.Sequelize.DECIMAL(10, 2),
      allowNull: true
    },
    

   

  
  }, {
    tableName: 'expense_detail',
     timestamps: true
  });


export {Expence_detail};
