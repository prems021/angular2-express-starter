import {  sequelize , Sequelize } from '../routes/dbcon';
const dbcon_1 = require("../routes/dbcon");
  const Tax_detail = sequelize.define('tax_detail', {
    ID: {
      type: dbcon_1.Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    
   INVOICE_NUMBER : {
    type: dbcon_1.Sequelize.INTEGER,
    allowNull: true
   },
     
    TAX_NAME : {
      type: dbcon_1.Sequelize.STRING,
      allowNull: true
    },
     TAX_PER : {
      type: dbcon_1.Sequelize.FLOAT,
      allowNull: true
    },
      TAX_AMT : {
      type: dbcon_1.Sequelize.FLOAT,
      allowNull: true
    },
    
     IS_B2B: {
      type: dbcon_1.Sequelize.BOOLEAN,
      allowNull: true
    },
    
    
  
  }, {
    tableName: 'tax_detail',
     timestamps: false
  });


export {Tax_detail};
