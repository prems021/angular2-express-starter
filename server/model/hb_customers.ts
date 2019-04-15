import {  sequelize , Sequelize } from '../routes/dbcon';
const dbcon_1 = require("../routes/dbcon");
  const Hb_customers = sequelize.define('hb_customers', {
    ID: {
      type: dbcon_1.Sequelize.INTEGER(15),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    CUSTOMER_NAME: {
      type: dbcon_1.Sequelize.STRING,
      allowNull: true
    },
    STREET: {
      type: dbcon_1.Sequelize.STRING,
      allowNull: true
    },
     CITY: {
      type: dbcon_1.Sequelize.STRING,
      allowNull: true
    },
    
    GSTIN: {
      type: dbcon_1.Sequelize.STRING(15),
      allowNull: true
    },
    PHONE: 
    {
      type: dbcon_1.Sequelize.STRING(15),
      allowNull : true
    },
      MOBILE: 
    {
      type: dbcon_1.Sequelize.STRING(15),
      allowNull : true
    },
        OPENING_BALANCE: 
    {
      type: dbcon_1.Sequelize.FLOAT,
      allowNull : true
    },
    LAST_PAYED_INVO_NUM:
    {
      type: dbcon_1.Sequelize.INTEGER,
      allowNull : true
    },
    
 
  
  }, {
    tableName: 'hb_customers',
     timestamps: false
  });


export {Hb_customers};
