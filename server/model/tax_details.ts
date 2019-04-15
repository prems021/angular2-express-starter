import {  sequelize , Sequelize } from '../routes/dbcon';

  const Tax_detail = sequelize.define('tax_detail', {
    ID: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    
   INVOICE_NUMBER : {
    type: Sequelize.INTEGER,
    allowNull: true
   },
     
    TAX_NAME : {
      type: Sequelize.STRING,
      allowNull: true
    },
     TAX_PER : {
      type: Sequelize.FLOAT,
      allowNull: true
    },
      TAX_AMT : {
      type: Sequelize.FLOAT,
      allowNull: true
    },
    
     IS_B2B: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    },
    
    
  
  }, {
    tableName: 'tax_detail',
     timestamps: false
  });


export {Tax_detail};