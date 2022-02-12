const FavouriteList = require('./models/favouriteList')
const Video = require('./models/video')
const { Op } = require('sequelize')
const router = require('express').Router()

router
  .route('/favouriteLists')
  .get(async (req, res, next) => {
    // Filtrare + Sortare
    const { simplified, sortBy, DESC, descriere, data } = req.query
    const whereClause = {}
    if (descriere) {
      whereClause.descriere = { [Op.like]: `%${descriere}%` }
    }
    if (data) {
      whereClause.data = { [Op.eq]: new Date(data) }
    }
    try {
      const favouriteLists = await FavouriteList.findAll({
        attributes: simplified ? { exclude: 'id' } : undefined,
        order: sortBy ? [[sortBy, DESC ? 'DESC' : 'ASC']] : undefined,
        where: whereClause
      })
      res.status(200).json(favouriteLists)
    } catch (err) {
      next(err)
    }
  })
  .post(async (req, res, next) => {
    try {
      const newFavouriteList = await FavouriteList.create(req.body)
      res.status(200).json(newFavouriteList)
    } catch (err) {
      next(err)
    }
  })

router
  .route('/favouriteLists/:id')
  .get(async (req, res, next) => {
    try {
      const favouriteList = await FavouriteList.findByPk(req.params.id)
      if (favouriteList) {
        res.status(200).json(favouriteList)
      } else {
        res.status(404).json({ message: '404 - FavouriteList Not Found' })
      }
    } catch (err) {
      next(err)
    }
  })
  .put(async (req, res, next) => {
    try {
      const favouriteList = await FavouriteList.findByPk(req.params.id)
      if (favouriteList) {
        await favouriteList.update(req.body)
        res.status(202).json({ message: 'FavouriteList updated' })
      } else {
        res.status(404).json({ message: '404 - FavouriteList Not Found' })
      }
    } catch (err) {
      next(err)
    }
  })
  .delete(async (req, res, next) => {
    try {
      const favouriteList = await FavouriteList.findByPk(req.params.id)
      if (favouriteList) {
        await favouriteList.destroy()
        res.status(202).json({ message: 'FavouriteList deleted' })
      } else {
        res.status(404).json({ message: '404 - FavouriteList Not Found' })
      }
    } catch (err) {
      next(err)
    }
  })

router
  .route('/favouriteLists/:favouriteListId/videos')
  .get(async (req, res, next) => {
    try {
      const favouriteList = await FavouriteList.findByPk(req.params.favouriteListId)
      if (favouriteList) {
        const videos = await favouriteList.getVideos()
        res.status(200).json(videos)
      } else {
        res.status(404).json({ message: '404 - FavouriteList Not Found' })
      }
    } catch (err) {
      next(err)
    }
  })
  .post(async (req, res, next) => {
    try {
      const favouriteList = await FavouriteList.findByPk(req.params.favouriteListId)
      if (favouriteList) {
        const video = new Video(req.body)
        video.favouriteListId = favouriteList.id
        await video.save()
        res.status(201).json({ message: 'Video created' })
      } else {
        res.status(404).json({ message: '404 - FavouriteList Not Found' })
      }
    } catch (err) {
      next(err)
    }
  })

router
  .route('/favouriteLists/:favouriteListId/videos/:videoId')
  .get(async (req, res, next) => {
    try {
      const favouriteList = await FavouriteList.findByPk(req.params.favouriteListId)
      if (favouriteList) {
        const videos = await favouriteList.getVideos()
        const video = videos.find((element) => element.id === parseInt(req.params.videoId))
        if (video) {
          res.status(202).json(video)
        } else {
          res.status(404).json({ message: '404 - Video Not Found' })
        }
      } else {
        res.status(404).json({ message: '404 - FavouriteList Not Found' })
      }
    } catch (err) {
      next(err)
    }
  })
  .put(async (req, res, next) => {
    try {
      const favouriteList = await FavouriteList.findByPk(req.params.favouriteListId)
      if (favouriteList) {
        const videos = await favouriteList.getVideos()
        const video = videos.find((element) => element.id === parseInt(req.params.videoId))
        if (video) {
          video.descriere = req.body.descriere
          video.titlu = req.body.titlu
          video.url = req.body.url
          await video.save()
          res.status(202).json({ message: 'Video updated' })
        } else {
          res.status(404).json({ message: '404 - Video Not Found' })
        }
      } else {
        res.status(404).json({ message: '404 - FavouriteList Not Found' })
      }
    } catch (err) {
      next(err)
    }
  })
  .delete(async (req, res, next) => {
    try {
      const favouriteList = await FavouriteList.findByPk(req.params.favouriteListId)
      if (favouriteList) {
        const videos = await favouriteList.getVideos()
        const video = videos.find((element) => element.id === parseInt(req.params.videoId))
        if (video) {
          await video.destroy()
          res.status(202).json({ message: 'Video deleted' })
        } else {
          res.status(404).json({ message: '404 - Video Not Found' })
        }
      } else {
        res.status(404).json({ message: '404 - FavouriteList Not Found' })
      }
    } catch (err) {
      next(err)
    }
  })

// Import
router.route('/import').post(async (req, res, next) => {
  try {
    for (const fl of req.body) {
      const favouriteList = await FavouriteList.create(fl)
      for (const v of fl.videos) {
        const video = await Video.create(v)
        favouriteList.addVideo(video)
      }
      await favouriteList.save()
    }
    res.status(204).json({ message: 'No Content' })
  } catch (err) {
    next(err)
  }
})

// Export
router.route('/export').get(async (req, res, next) => {
  try {
    const result = []
    for (const fl of await FavouriteList.findAll()) {
      const favouriteList = {
        descriere: fl.descriere,
        data: fl.data,
        videos: []
      }
      for (const v of await fl.getVideos()) {
        favouriteList.videos.push({
          descriere: v.descriere,
          titlu: v.titlu,
          url: v.url
        })
      }
      result.push(favouriteList)
    }
    if (result.length > 0) {
      res.status(200).json(result)
    } else {
      res.status(204).json({ message: 'No Content' })
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
