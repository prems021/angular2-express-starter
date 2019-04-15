import {  sequelize , Sequelize } from '../routes/dbcon';

  const Invoice_master = sequelize.define('invoice_master', {
    ID: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    INVOICE_NUMBER: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    CUSTOMER_NAME: {
      type: Sequelize.STRING,
      allowNull: true
    },
      CUSTOMER_CITY: {
      type: Sequelize.STRING,
      allowNull: true
    },

       CUSTOMER_STREET: {
      type: Sequelize.STRING,
      allowNull: true
    },
     
     CUSTOMER_GST_IN: {
      type: Sequelize.STRING,
      allowNull: true
    },
     
      CUSTOMER_PHONE: {
      type: Sequelize.STRING,
      allowNull: true
    },
       CUSTOMER_MOBILE: {
      type: Sequelize.STRING,
      allowNull: true
    },
      PAN_NO: {
      type: Sequelize.STRING,
      allowNull: true
    },

      VEH_NO: {
      type: Sequelize.STRING,
      allowNull: true
    },

      PLACE_SUPPLY: {
      type: Sequelize.STRING,
      allowNull: true
    },
    BUNDLES : {
     type: Sequelize.INTEGER,
     allowNull: true
    },
      BILL_DATE : {
        type : Sequelize.DATEONLY,
        allowNull : true
      },

      SUB_TOTAL: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true
    },
    
    TAX_COLLECTED: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true
    },
     GRAND_TOTAL: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true
    },
      ITEM_LENGTH: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    
    TOTAL_PAYED: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true
    },
    TOTAL_DUE: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true
    },
     IS_PARTIAL_PAY: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    },
   

     IS_B2B: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    },


  
  }, {
    tableName: 'invoice_master',
     timestamps: true
  });


export {Invoice_master};
