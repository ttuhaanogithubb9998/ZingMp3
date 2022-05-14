const { getSongs } = require("../modules/zing");
const ZingMp3 = require("../modules/zing");


class ZingController {

    getSong(req, res) {
        ZingMp3.getSong(req.query.id, data => {
            res.json(data);
        })
    }

    getSongs(req, res) {
        ZingMp3.getSongs(req.query.id, data => {
            res.json(data)
        })
    }

    getPlaylist(req, res) {
        ZingMp3.getPlaylist(req.query.id, (data) => {
            res.json(data)
        })
    }



    getTop100(req, res) {
        ZingMp3.getTop100((data) => {
            res.json(data)
        })
    }

    getNewRelease(req, res) {
        ZingMp3.getNewRelease((data) => {
            res.json(data)
        })
    }


    getGenre(req, res) {
        ZingMp3.getGenre((data) => {
            res.json(data)
        })
    }

    getGenreDetail(req, res) {
        ZingMp3.getGenreDetail(req.query.id, (data) => {
            res.json(data)
        })
    }

    getPageHome(req, res) {
        ZingMp3.getPageHome((data) => {
            res.json(data)
        })
    }

    getChartHome(req, res) {
        ZingMp3.getChartHome((data) => {
            res.json(data)
        })
    }

    getInfo(req, res) {
        ZingMp3.getInfo(req.query.id, (data) => {
            res.json(data)
        })
    }
    getLyric(req,res){
        ZingMp3.getLyric(req.query.id,(data)=>{
            res.json(data)
        })
    }
}

module.exports = new ZingController();