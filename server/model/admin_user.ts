
import {  sequelize , Sequelize } from '../routes/dbcon';
const dbcon_1 = require("../routes/dbcon");
  const Admin_users = sequelize.define('amr_admin_users', {
    ID: {
      type: dbcon_1.Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    USER_NAME: {
      type: dbcon_1.Sequelize.STRING(15),
      allowNull: true
    },
    PASSWORD: {
      type: dbcon_1.Sequelize.STRING(15),
      allowNull: true
    },
   
    
    IS_ADMIN: {
      type: dbcon_1.Sequelize.BOOLEAN,
      allowNull: true
    },
  
  }, {
    tableName: 'amr_admin_users',
     timestamps: false
  });


export {Admin_users};

