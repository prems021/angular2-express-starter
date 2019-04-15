import {  sequelize , Sequelize } from '../routes/dbcon';

  const Hb_products = sequelize.define('hb_products', {
    ID: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    PRODUCT_NAME: {
      type: Sequelize.STRING(98),
      allowNull: true
    },
    HSN_CODE: {
      type: Sequelize.STRING(15),
      allowNull: true
    },

      PRICE: {
      type: Sequelize.FLOAT,
      allowNull: true
    },
    
    AVAIL_QTY: {
                      type: Sequelize.FLOAT,
                      allowNull: true
               },
      UNIT: {
      type: Sequelize.STRING(10),
      allowNull: true
    },
  
  }, {
    tableName: 'hb_products',
     timestamps: false
  });


export {Hb_products};
