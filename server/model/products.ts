import {  sequelize , Sequelize } from '../routes/dbcon';
const dbcon_1 = require("../routes/dbcon");
  const Hb_products = sequelize.define('hb_products', {
    ID: {
      type: dbcon_1.Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    PRODUCT_NAME: {
      type: dbcon_1.Sequelize.STRING(98),
      allowNull: true
    },
    HSN_CODE: {
      type: dbcon_1.Sequelize.STRING(15),
      allowNull: true
    },

      PRICE: {
      type: dbcon_1.Sequelize.FLOAT,
      allowNull: true
    },
    
    AVAIL_QTY: {
                      type: dbcon_1.Sequelize.FLOAT,
                      allowNull: true
               },
      UNIT: {
      type: dbcon_1.Sequelize.STRING(10),
      allowNull: true
    },
  
  }, {
    tableName: 'hb_products',
     timestamps: false
  });


export {Hb_products};
