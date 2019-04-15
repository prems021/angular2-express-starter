import {  sequelize , Sequelize } from '../routes/dbcon';
const dbcon_1 = require("../routes/dbcon");
  const Third_party = sequelize.define('third_party', {
    ID: {
      type: dbcon_1.Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
  
    PARTY_NAME: {
      type: dbcon_1.Sequelize.STRING,
      allowNull: true
    },

      PARTY_ADDRESS: {
      type: dbcon_1.Sequelize.STRING,
      allowNull: true
    },
      PHONE_NUMBER: {
      type: dbcon_1.Sequelize.INTEGER,
      allowNull: true
    },
    

  
    
  
  }, {
    tableName: 'third_party',
     timestamps: false
  });


export {Third_party};
