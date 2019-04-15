import {  sequelize , Sequelize } from '../routes/dbcon';
const dbcon_1 = require("../routes/dbcon");
  const Expence_category = sequelize.define('expence_category', {
    ID: {
      type: dbcon_1.Sequelize.INTEGER(15),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    CATEGORY_NAME: {
      type: dbcon_1.Sequelize.STRING(15),
      allowNull: true
    }
  
  
  }, {
    tableName: 'expence_category',
     timestamps: false
  });


export {Expence_category};
