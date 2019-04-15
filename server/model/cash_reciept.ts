import {  sequelize , Sequelize } from '../routes/dbcon';
const dbcon_1 = require("../routes/dbcon");
  const Cash_reciept = sequelize.define('cash_reciept', {
    ID: {
      type: dbcon_1.Sequelize.INTEGER(15),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
     RECIEPT_NO: {
    type: dbcon_1.Sequelize.INTEGER,
    allowNull: true
    },
    CUS_NAME: {
      type: dbcon_1.Sequelize.STRING(25),
      allowNull: true
    },
    CUS_STREET: {
      type: dbcon_1.Sequelize.STRING(25),
      allowNull: true
    },
      CASH_DATE: {
      type: dbcon_1.Sequelize.DATEONLY,
      allowNull: true
    },
     IS_CASH_PAY: {
      type: dbcon_1.Sequelize.BOOLEAN,
      allowNull: true
    },
    AMOUNT_PAYED: {
      type: dbcon_1.Sequelize.DECIMAL(10, 2),
      allowNull: true
    },
    AMOUNT_DUE: {
      type: dbcon_1.Sequelize.DECIMAL(10, 2),
      allowNull: true
    },
     CHEQUE_NO: {
      type: dbcon_1.Sequelize.INTEGER,
      allowNull: true
    },
    CHEQUE_DATE: {
      type: dbcon_1.Sequelize.DATEONLY,
      allowNull: true
    },
    BANK_NAME: {
      type: dbcon_1.Sequelize.STRING(25),
      allowNull: true
    },

  
  }, {
    tableName: 'cash_reciept',
     timestamps: true
  });


export {Cash_reciept};
