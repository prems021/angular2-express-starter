import {  sequelize , Sequelize } from '../routes/dbcon';

  const Hb_customers = sequelize.define('hb_customers', {
    ID: {
      type: Sequelize.INTEGER(15),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    CUSTOMER_NAME: {
      type: Sequelize.STRING,
      allowNull: true
    },
    STREET: {
      type: Sequelize.STRING,
      allowNull: true
    },
     CITY: {
      type: Sequelize.STRING,
      allowNull: true
    },
    
    GSTIN: {
      type: Sequelize.STRING(15),
      allowNull: true
    },
    PHONE: 
    {
      type: Sequelize.STRING(15),
      allowNull : true
    },
      MOBILE: 
    {
      type: Sequelize.STRING(15),
      allowNull : true
    },
        OPENING_BALANCE: 
    {
      type: Sequelize.FLOAT,
      allowNull : true
    },
    LAST_PAYED_INVO_NUM:
    {
      type: Sequelize.INTEGER,
      allowNull : true
    },
    
 
  
  }, {
    tableName: 'hb_customers',
     timestamps: false
  });


export {Hb_customers};
