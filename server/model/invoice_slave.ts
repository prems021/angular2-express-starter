import {  sequelize , Sequelize } from '../routes/dbcon';
const dbcon_1 = require("../routes/dbcon");
  const Invoice_slave = sequelize.define('invoice_slave', {
    ID: {
      type: dbcon_1.Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },   
    MASTER_ID: {
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
      type: dbcon_1.Sequelize.STRING,
      allowNull: true
    },
    QUANTITY: {
       type: dbcon_1.Sequelize.INTEGER,
    allowNull: true
    },
       
      PRICE: {
      type: dbcon_1.Sequelize.FLOAT,
      allowNull: true
    },
  
     UNIT: {
      type: dbcon_1.Sequelize.STRING,
      allowNull: true
    },
    
   
    IS_B2B: {
      type: dbcon_1.Sequelize.BOOLEAN,
      allowNull: true
    },

      BILL_DATE : {
        type : dbcon_1.Sequelize.DATEONLY,
        allowNull : true
      },
 
  
  }, {
    tableName: 'invoice_slave',
     timestamps: false
  });


export {Invoice_slave};
