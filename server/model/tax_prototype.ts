import {  sequelize , Sequelize } from '../routes/dbcon';

  const Tax_prototype = sequelize.define('tax_prototype', {
    ID: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    
   TAX_NAME : {
    type: Sequelize.STRING,
    allowNull: true
   },
   
    TAX_DISPLAY_NAME : {
    type: Sequelize.STRING,
    allowNull: true
   },
     
    TAX_RATE : {
      type: Sequelize.INTEGER,
      allowNull: true
    },

    IS_ACTIVE : {
      type: Sequelize.BOOLEAN,
      allowNull: true
    },
    

  
    
  
  }, {
    tableName: 'tax_prototype',
     timestamps: false
  });


export {Tax_prototype};