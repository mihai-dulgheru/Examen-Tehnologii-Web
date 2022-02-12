const sequelize = require('../sequelize')
const { DataTypes } = require('sequelize')

const Video = sequelize.define(
  'Video',
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
        len: [5]
      }
    },
    titlu: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5]
      }
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    }
  },
  {
    tableName: 'Videos'
  }
)

module.exports = Video
