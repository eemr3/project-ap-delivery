// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class product extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   product.init({
//     name: DataTypes.STRING,
//     price: DataTypes.DECIMAL,
//     urlImage: DataTypes.STRING,
//   }, {
//     underscored: true,
//     sequelize,
//     modelName: 'products',
//     timestamps: false,
//   });
//   return product;
// };

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    urlImage: DataTypes.STRING,
  },
    {
    tableName: 'products',
    underscored: true,
    timestamps: false
  });

  return Product;
};
