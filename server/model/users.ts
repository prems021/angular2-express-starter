import {  sequelize , Sequelize } from '../routes/dbcon';
const dbcon_1 = require("../routes/dbcon");
  const Hb_users = sequelize.define('hb_users', {
    ID: {
      type: dbcon_1.Sequelize.INTEGER(6),
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
      MAC: {
      type: dbcon_1.Sequelize.STRING(18),
      allowNull: true
           },
    
    IS_ADMIN: {
      type: dbcon_1.Sequelize.BOOLEAN,
      allowNull: true
    },
  
  }, {
    tableName: 'hb_users',
     timestamps: false
  });


export {Hb_users};
