module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    userId: DataTypes.INTEGER,
    sellerId: DataTypes.INTEGER,
    totalPrice: DataTypes.DECIMAL,
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING,
    saleDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    status: DataTypes.STRING
  }, {
    underscored: true,
    tableName: 'sales',
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
