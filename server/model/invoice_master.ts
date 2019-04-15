import {  sequelize , Sequelize } from '../routes/dbcon';
const dbcon_1 = require("../routes/dbcon");
  const Invoice_master = sequelize.define('invoice_master', {
    ID: {
      type: dbcon_1.Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    INVOICE_NUMBER: {
      type: dbcon_1.Sequelize.INTEGER,
      allowNull: true
    },
    CUSTOMER_NAME: {
      type: dbcon_1.Sequelize.STRING,
      allowNull: true
    },
      CUSTOMER_CITY: {
      type: dbcon_1.Sequelize.STRING,
      allowNull: true
    },

       CUSTOMER_STREET: {
      type: dbcon_1.Sequelize.STRING,
      allowNull: true
    },
     
     CUSTOMER_GST_IN: {
      type: dbcon_1.Sequelize.STRING,
      allowNull: true
    },
     
      CUSTOMER_PHONE: {
      type: dbcon_1.Sequelize.STRING,
      allowNull: true
    },
       CUSTOMER_MOBILE: {
      type: dbcon_1.Sequelize.STRING,
      allowNull: true
    },
      PAN_NO: {
      type: dbcon_1.Sequelize.STRING,
      allowNull: true
    },

      VEH_NO: {
      type: dbcon_1.Sequelize.STRING,
      allowNull: true
    },

      PLACE_SUPPLY: {
      type: dbcon_1.Sequelize.STRING,
      allowNull: true
    },
    BUNDLES : {
     type: dbcon_1.Sequelize.INTEGER,
     allowNull: true
    },
      BILL_DATE : {
        type : dbcon_1.Sequelize.DATEONLY,
        allowNull : true
      },

      SUB_TOTAL: {
      type: dbcon_1.Sequelize.DECIMAL(10, 2),
      allowNull: true
    },
    
    TAX_COLLECTED: {
      type: dbcon_1.Sequelize.DECIMAL(10, 2),
      allowNull: true
    },
     GRAND_TOTAL: {
      type: dbcon_1.Sequelize.DECIMAL(10, 2),
      allowNull: true
    },
      ITEM_LENGTH: {
      type: dbcon_1.Sequelize.INTEGER,
      allowNull: true
    },
    
    TOTAL_PAYED: {
      type: dbcon_1.Sequelize.DECIMAL(10, 2),
      allowNull: true
    },
    TOTAL_DUE: {
      type: dbcon_1.Sequelize.DECIMAL(10, 2),
      allowNull: true
    },
     IS_PARTIAL_PAY: {
      type: dbcon_1.Sequelize.BOOLEAN,
      allowNull: true
    },
   

     IS_B2B: {
      type: dbcon_1.Sequelize.BOOLEAN,
      allowNull: true
    },


  
  }, {
    tableName: 'invoice_master',
     timestamps: true
  });


export {Invoice_master};
