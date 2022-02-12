const sequelize = require('../sequelize')
const { DataTypes } = require('sequelize')

const FavouriteList = sequelize.define(
  'FavouriteList',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    descriere: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3]
      }
    },
    data: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
        isAfter: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
      }
    }
  },
  {
    tableName: 'FavouriteLists'
  }
)

module.exports = FavouriteList
