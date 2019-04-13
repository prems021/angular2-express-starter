import {  sequelize , Sequelize } from '../routes/dbcon';

  const Admin_users = sequelize.define('admin_users', {
    ID: {
      type: Sequelize.INTEGER(6),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    USER_NAME: {
      type: Sequelize.STRING(15),
      allowNull: true
    },
    PASSWORD: {
      type: Sequelize.STRING(15),
      allowNull: true
    },
   
    
    IS_ADMIN: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    },
  
  }, {
    tableName: 'amr_admin_users',
     timestamps: false
  });


export {Admin_users};
