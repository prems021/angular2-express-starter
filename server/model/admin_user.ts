import {  sequelize , Sequelize } from '../routes/dbcon';

  const Hb_users = sequelize.define('hb_users', {
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
      MAC: {
      type: Sequelize.STRING(18),
      allowNull: true
           },
    
    IS_ADMIN: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    },
  
  }, {
    tableName: 'hb_users',
     timestamps: false
  });


export {Hb_users};








// import {  sequelize , Sequelize } from '../routes/dbcon';
// const dbcon_1 = require("../routes/dbcon");
//   const Admin_users = sequelize.define('amr_admin_users', {
//     ID: {
//       type: dbcon_1.Sequelize.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true
//     },
//     USER_NAME: {
//       type: dbcon_1.Sequelize.STRING(15),
//       allowNull: true
//     },
//     PASSWORD: {
//       type: dbcon_1.Sequelize.STRING(15),
//       allowNull: true
//     },
   
    
//     IS_ADMIN: {
//       type: dbcon_1.Sequelize.BOOLEAN,
//       allowNull: true
//     },
  
//   }, {
//     tableName: 'amr_admin_users',
//      timestamps: false
//   });


// export {Admin_users};

// "use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
// const dbcon_1 = require("../routes/dbcon");
// const Admin_users = dbcon_1.sequelize.define('amr_admin_users', {
//     ID: {
//         type: dbcon_1.Sequelize.INTEGER(15),
//         allowNull: false,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     USER_NAME: {
//         type: dbcon_1.Sequelize.INTEGER,
//         allowNull: true
//     },
   
//     PASSWORD: {
//         type: dbcon_1.Sequelize.STRING(25),
//         allowNull: true
//     },
//    IS_ADMIN: {
//         type: dbcon_1.Sequelize.BOOLEAN,
//         allowNull: true
//     },
  
// }, {
//     tableName: 'amr_admin_users',
//     timestamps: false
// });
// exports.Admin_users = Admin_users;
