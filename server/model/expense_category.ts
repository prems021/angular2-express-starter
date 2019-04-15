import {  sequelize , Sequelize } from '../routes/dbcon';

  const Expence_category = sequelize.define('expence_category', {
    ID: {
      type: Sequelize.INTEGER(15),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    CATEGORY_NAME: {
      type: Sequelize.STRING(15),
      allowNull: true
    }
  
  
  }, {
    tableName: 'expence_category',
     timestamps: false
  });


export {Expence_category};
