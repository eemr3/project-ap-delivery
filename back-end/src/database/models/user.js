// const {
//   Model,
// } = require('sequelize');

// module.exports = (sequelize, DataTypes) => {
//   class user extends Model {}
  
//   user.init({
//     name: DataTypes.STRING,
//     email: DataTypes.STRING,
//     password: DataTypes.STRING,
//     role: DataTypes.STRING,
//   }, {
//     sequelize,
//     modelName: 'users',
//     timestamps: false,
//   });

//   user.hasMany(sales, { foreignKey: 'user_id', as: 'user' });
//   user.hasMany(sales, { foreignKey: 'seller_id', as: 'seller' });

//   sale.belongsTo(user, { foreignKey: 'user_id', as: 'user' });
//   sale.belongsTo(user, { foreignKey: 'seller_id', as: 'seller' });

//   return user;
// };


module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    tableName: 'users',
    timestamps: false
  });

  User.associate = (models) => {
    User.hasMany(models.Sale, {
      as: 'sales',
      foreignKey: 'id',
    });
  };

  return User;
};
