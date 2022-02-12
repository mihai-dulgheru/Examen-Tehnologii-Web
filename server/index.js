'use strict'

const cors = require('cors')
const express = require('express')
const path = require('path')
const router = require('./router')
const sequelize = require('./sequelize')
const { config } = require('dotenv')
config({})
const port = process.env.PORT || 8080

const FavouriteList = require('./models/favouriteList')
const Video = require('./models/video')

FavouriteList.hasMany(Video, { foreignKey: 'favouriteListId' })
Video.belongsTo(FavouriteList, { foreignKey: 'favouriteListId' })

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(path.resolve(), 'public')))

app.get('/sync', async (req, res, next) => {
  try {
    sequelize.sync({ force: true }).then(() => {
      console.log('All models were synchronized successfully')
    })
    res.status(200).json({ message: 'All models were synchronized successfully' })
  } catch (error) {
    next(error)
  }
})
app.use('/api', router)

app.use((err, req, res, next) => {
  console.error(`[ERROR]: ${err}`)
  res.status(500).json(err)
})

app.listen(port, async () => {
  console.log(`Server started on http://localhost:${port}`)
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully!')
  } catch (err) {
    console.error('Unable to connect to the database: ', err)
  }
})
