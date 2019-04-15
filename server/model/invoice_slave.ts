import {  sequelize , Sequelize } from '../routes/dbcon';

  const Invoice_slave = sequelize.define('invoice_slave', {
    ID: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },   
    MASTER_ID: {
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
      type: Sequelize.STRING,
      allowNull: true
    },
    QUANTITY: {
       type: Sequelize.INTEGER,
    allowNull: true
    },
       
      PRICE: {
      type: Sequelize.FLOAT,
      allowNull: true
    },
  
     UNIT: {
      type: Sequelize.STRING,
      allowNull: true
    },
    
   
    IS_B2B: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    },

      BILL_DATE : {
        type : Sequelize.DATEONLY,
        allowNull : true
      },
 
  
  }, {
    tableName: 'invoice_slave',
     timestamps: false
  });


export {Invoice_slave};
