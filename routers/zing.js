const zing = require('../controllers/ZingController')
const express = require('express')
const router = express.Router();

// get song
router.get("/song", zing.getSong)

// get playlist
router.get("/playlist", zing.getPlaylist)

// get top100
router.get("/top100", zing.getTop100)

// get charthome
router.get("/chart-home", zing.getChartHome)

// get pagehome
router.get("/page-home", zing.getPageHome)

// get info song
router.get("/info", zing.getInfo)

module.exports = router
