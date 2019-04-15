
import {  sequelize , Sequelize } from '../routes/dbcon';

  const Expence_detail = sequelize.define('expense_detail', {
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
     SI_NO: {
      type: Sequelize.INTEGER,
      allowNull: true
    },

    
    PRODUCT_NAME: {
      type: Sequelize.STRING,
      allowNull: true
    },
      HSN_CODE: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
     QUANTITY: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
   PRICE: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true
    },
    
  
    UNIT: {
      type: Sequelize.STRING,
      allowNull: true
    },
  
      NET_TOTAL: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true
    },
    

   

  
  }, {
    tableName: 'expense_detail',
     timestamps: true
  });


export {Expence_detail};
