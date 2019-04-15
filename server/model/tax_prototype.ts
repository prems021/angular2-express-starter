import {  sequelize , Sequelize } from '../routes/dbcon';
const dbcon_1 = require("../routes/dbcon");
  const Tax_prototype = sequelize.define('tax_prototype', {
    ID: {
      type: dbcon_1.Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    
   TAX_NAME : {
    type: dbcon_1.Sequelize.STRING,
    allowNull: true
   },
   
    TAX_DISPLAY_NAME : {
    type: dbcon_1.Sequelize.STRING,
    allowNull: true
   },
     
    TAX_RATE : {
      type: dbcon_1.Sequelize.INTEGER,
      allowNull: true
    },

    IS_ACTIVE : {
      type: dbcon_1.Sequelize.BOOLEAN,
      allowNull: true
    },
    

  
    
  
  }, {
    tableName: 'tax_prototype',
     timestamps: false
  });


export {Tax_prototype};
