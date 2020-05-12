const Sequelize = require('sequelize')

module.exports = function (sequelize) {
  return sequelize.define(
    'product',
    {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW
      }
    },
    {
      tableName: 'product',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      timestamps: true
    }
  )
}
