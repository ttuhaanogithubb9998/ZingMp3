const zing = require('../controllers/ZingController')
const express = require('express');
const { route } = require('express/lib/router');
const router = express.Router();

// get song
router.get("/song", zing.getSong)

// get playlist
router.get("/playlist", zing.getPlaylist)

// get songs (playlist)
router.get("/songs",zing.getSongs)

// get top100
router.get("/top100", zing.getTop100)

// get newrelease
router.get("/newrelease", zing.getNewRelease)

// get genre
router.get("/genre", zing.getGenre)

// get genre detail
router.get("/genre-detail", zing.getGenreDetail)

// get charthome
router.get("/chart-home", zing.getChartHome)

// get pagehome
router.get("/page-home", zing.getPageHome)

// get info song
router.get("/info", zing.getInfo)

//get lyric song
router.get("/lyric",zing.getLyric)

module.exports = router
