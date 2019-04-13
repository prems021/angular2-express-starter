// import {  sequelize , Sequelize } from '../routes/dbcon';

//   const Admin_users = sequelize.define('admin_users', {
//     ID: {
//       type: Sequelize.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true
//     },
//     USER_NAME: {
//       type: Sequelize.STRING(15),
//       allowNull: true
//     },
//     PASSWORD: {
//       type: Sequelize.STRING(15),
//       allowNull: true
//     },
   
    
//     IS_ADMIN: {
//       type: Sequelize.BOOLEAN,
//       allowNull: true
//     },
  
//   }, {
//     tableName: 'amr_admin_users',
//      timestamps: false
//   });


// export {Admin_users};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbcon_1 = require("../routes/dbcon");
const Admin_users = dbcon_1.sequelize.define('amr_admin_users', {
    ID: {
        type: dbcon_1.Sequelize.INTEGER(15),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    USER_NAME: {
        type: dbcon_1.Sequelize.INTEGER,
        allowNull: true
    },
   
    PASSWORD: {
        type: dbcon_1.Sequelize.STRING(25),
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
exports.Admin_users = Admin_users;
