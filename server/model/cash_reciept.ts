import {  sequelize , Sequelize } from '../routes/dbcon';

  const Cash_reciept = sequelize.define('cash_reciept', {
    ID: {
      type: Sequelize.INTEGER(15),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
     RECIEPT_NO: {
    type: Sequelize.INTEGER,
    allowNull: true
    },
    CUS_NAME: {
      type: Sequelize.STRING(25),
      allowNull: true
    },
    CUS_STREET: {
      type: Sequelize.STRING(25),
      allowNull: true
    },
      CASH_DATE: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
     IS_CASH_PAY: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    },
    AMOUNT_PAYED: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true
    },
    AMOUNT_DUE: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true
    },
     CHEQUE_NO: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    CHEQUE_DATE: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    BANK_NAME: {
      type: Sequelize.STRING(25),
      allowNull: true
    },

  
  }, {
    tableName: 'cash_reciept',
     timestamps: true
  });


export {Cash_reciept};