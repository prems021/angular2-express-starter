import {  sequelize , Sequelize } from '../routes/dbcon';

  const Third_party = sequelize.define('third_party', {
    ID: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
  
    PARTY_NAME: {
      type: Sequelize.STRING,
      allowNull: true
    },

      PARTY_ADDRESS: {
      type: Sequelize.STRING,
      allowNull: true
    },
      PHONE_NUMBER: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    

  
    
  
  }, {
    tableName: 'third_party',
     timestamps: false
  });


export {Third_party};