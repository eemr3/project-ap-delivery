// 'use strict';
// const { Model } = require('sequelize');

// module.exports = (sequelize, DataTypes) => {
//   class sale extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       sale.belongsTo(models.user)
//     }
//   }
//   sale.init({
//     userId: DataTypes.INTEGER,
//     sellerId: DataTypes.INTEGER,
//     totalPrice: DataTypes.DECIMAL,
//     deliveryAddress: DataTypes.STRING,
//     deliveryNumber: DataTypes.STRING,
//     saleDate: DataTypes.DATETIME,
//     status: DataTypes.STRING
//   }, {
//     sequelize,
//     underscored: true,
//     modelName: 'sales',
//     timestamps: false,
//   });
//   return sale;
// };

module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    userId: DataTypes.INTEGER,
    sellerId: DataTypes.INTEGER,
    totalPrice: DataTypes.DECIMAL,
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING,
    saleDate: DataTypes.DATEONLY,
    status: DataTypes.STRING
  }, {
    underscored: true,
    tableName: 'users',
    timestamps: false
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, {
      as: 'users',
      foreignKey: 'id',
    });
  };

  return Sale;
};
