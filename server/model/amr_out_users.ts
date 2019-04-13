import {  sequelize , Sequelize } from '../routes/dbcon';
const dbcon_1 = require("../routes/dbcon");
  const Amr_out_users = sequelize.define('amr_out_users', {
    ID: {
      type: dbcon_1.Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    NAME: {
      type: dbcon_1.Sequelize.STRING(25),
      allowNull: true
    },
      COMPANY_NAME: {
      type: dbcon_1.Sequelize.STRING(15),
      allowNull: true
    },
    ADDRESS: {
      type: dbcon_1.Sequelize.STRING(50),
      allowNull: true
    },
      MOBILE_NO: {
      type: dbcon_1.Sequelize.INTEGER(12),
      allowNull: true
    },
     BANK_AC_NO: {
      type: dbcon_1.Sequelize.INTEGER(20),
      allowNull: true
    },
      BANK_IFSC: {
      type: dbcon_1.Sequelize.INTEGER(20),
      allowNull: true
    },
    
    IS_INTAKE: {
      type: dbcon_1.Sequelize.BOOLEAN,
      allowNull: true
    },
  
  }, {
    tableName: 'amr_out_users',
     timestamps: false
  });


export {Amr_out_users};
