import {  sequelize , Sequelize } from '../routes/dbcon';
const dbcon_1 = require("../routes/dbcon");
  const Super_admin = sequelize.define('super_admin', {
    ID: {
      type: dbcon_1.Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    ADMIN_NAME: {
      type: dbcon_1.Sequelize.STRING(8),
      allowNull: true
    },
    PASS_CODE: {
      type: dbcon_1.Sequelize.STRING(15),
      allowNull: true
    },
      ACTIVATION_KEY: {
      type: dbcon_1.Sequelize.STRING(25),
      allowNull: true
    },
    DEMO_CLICKS: {
      type: dbcon_1.Sequelize.INTEGER(5),
      allowNull: true
    },
    EXPIRY_DATE: 
    {
      type: dbcon_1.Sequelize.STRING(15),
      allowNull: true
    },
 

  
  }, {
    tableName: 'super_admin',
     timestamps: false
  });


export {Super_admin};
