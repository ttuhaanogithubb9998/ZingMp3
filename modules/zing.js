const sha256 = require('crypto-js/sha256');
const hmacSha512 = require('crypto-js/hmac-sha512');
const axios = require('axios');

const VERSION = "1.6.22";
const VERSION_COOKIE = "1411";
const URL = "https://zingmp3.vn";
const PATH_SONG = "/api/v2/song/get/streaming";
const PATH_LYRIC = "/api/v2/lyric/get/lyric"
const PATH_SONGS = "/api/v2/recommend/get/songs"
const PATH_PLAYLIST = "/api/v2/page/get/playlist";
const PATH_NEWRELEASE = "/api/v2/page/get/newrelease-chart";
const PATH_GENRE = "/api/v2/page/get/hub-home";
const PATH_GENRE_DETAIL = "/api/v2/page/get/hub-detail";
const PATH_TOP = "/api/v2/page/get/top-100";
const PATH_INFO = "/api/v2/song/get/info";
const PATH_CHARTHOME = "/api/v2/page/get/chart-home";
const PATH_PAGEHOME = "/api/v2/page/get/home"
const SECRET_KEY = "2aa2d1c561e809b267f3638c4a307aab";
const API_KEY = "88265e23d4284f25963e6eedac8fbfa3";


class Zing {

    setCookie(callback) {
        axios.get(`${URL}`).then(res => {
            callback(res.headers["set-cookie"][1])
        })
    }

    getUrlPage() {
        let CTIME = Math.floor(Date.now() / 1000);
        let signature_page = hmacSha512(
            PATH_PAGEHOME + sha256(`count=30ctime=${CTIME}page=1version=${VERSION}`),
            SECRET_KEY
        )
        let pageUrl = `${URL}${PATH_PAGEHOME}?page=1&count=30&segmentId=-1&ctime=${CTIME}&version=${VERSION}&sig=${signature_page}&apiKey=${API_KEY}`;
        return pageUrl;
    }

    getPageHome(callback) {
        this.setCookie(cookie => {
            axios.get(this.getUrlPage(), {
                headers: {
                    Cookie: cookie
                }
            }).then(res => {
                console.log("page", res)
                callback(res.data)
            })
        })
    }

    getUrlSong(id) {
        let CTIME = Math.floor(Date.now() / 1000);
        let signature_song = hmacSha512(
            PATH_SONG + sha256(`ctime=${CTIME}id=${id}version=${VERSION}`),
            SECRET_KEY
        )
        let songUrl = `${URL}${PATH_SONG}?id=${id}&ctime=${CTIME}&version=${VERSION}&sig=${signature_song}&apiKey=${API_KEY}`;
        return songUrl;
    }

    getSong(id, callback) {
        this.setCookie(cookie => {
            axios.get(this.getUrlSong(id), {
                headers: {
                    Cookie: cookie,
                }
            }).then(res => {
                console.log("song", res);
                callback(res.data);
            })
        })
    }


    getUrlSongs(id) {
        let CTIME = Math.floor(Date.now() / 1000);
        let signature_songs = hmacSha512(
            PATH_SONGS + sha256(`count=20ctime=${CTIME}id=${id}version=${VERSION}`),
            SECRET_KEY
        )
        let songUrls = `${URL}${PATH_SONGS}?id=${id}&start=0&count=20&ctime=${CTIME}&version=${VERSION}&sig=${signature_songs}&apiKey=${API_KEY}`;
        return songUrls;
    }

    getSongs(id, callback) {
        this.setCookie(cookie => {
            axios.get(this.getUrlSongs(id), {
                headers: {
                    Cookie: cookie,
                }
            }).then(res => {
                console.log("song", res);
                callback(res.data);
            })
        })
    }



    getUrlPlaylist(id) {
        let CTIME = Math.floor(Date.now() / 1000);
        let signature_playlist = hmacSha512(
            PATH_PLAYLIST + sha256(`ctime=${CTIME}id=${id}version=${VERSION}`),
            SECRET_KEY
        )
        let playlistUrl = `${URL}${PATH_PLAYLIST}?id=${id}&ctime=${CTIME}&version=${VERSION}&sig=${signature_playlist}&apiKey=${API_KEY}`;

        return playlistUrl
    }

    getPlaylist(id, callback) {
        this.setCookie(cookie => {
            axios.get(this.getUrlPlaylist(id), {
                headers: {
                    Cookie: cookie
                }
            }).then(res => {
                console.log("list", res)
                callback(res.data)
            })
        })
    }


    getUrlInfo(id) {
        let CTIME = Math.floor(Date.now() / 1000);
        let signature_info = hmacSha512(
            PATH_INFO + sha256(`ctime=${CTIME}id=${id}version=${VERSION}`),
            SECRET_KEY
        );
        let infoUrl = `${URL}${PATH_INFO}?id=${id}&ctime=${CTIME}&version=${VERSION}&sig=${signature_info}&apiKey=${API_KEY}`;
        return infoUrl
    }

    getInfo(id, callback) {
        this.setCookie(cookie => {
            axios.get(this.getUrlInfo(id), {
                headers: {
                    Cookie: cookie,
                }
            }).then(res => {
                console.log("info", res)
                callback(res.data)
            })
        })
    }

    getUrlTop100() {
        let CTIME = Math.floor(Date.now() / 1000);
        let signature_top100 = hmacSha512(
            PATH_TOP + sha256(`ctime=${CTIME}version=${VERSION}`),
            SECRET_KEY
        )
        let urlTop100 = `${URL}${PATH_TOP}?ctime=${CTIME}&version=${VERSION}&sig=${signature_top100}&apiKey=${API_KEY}`;
        return urlTop100;
    }

    getTop100(callback) {
        this.setCookie(cookie => {
            axios.get(this.getUrlTop100(), {
                headers: {
                    Cookie: cookie
                }
            }).then(res => {
                console.log("top100", res)
                callback(res.data)
            })
        })
    }

    getUrlChartHome() {
        let CTIME = Math.floor(Date.now() / 1000);
        let signature_chart = hmacSha512(
            PATH_CHARTHOME + sha256(`ctime=${CTIME}version=${VERSION}`),
            SECRET_KEY
        )
        let urlChart = `${URL}${PATH_CHARTHOME}?ctime=${CTIME}&version=${VERSION}&sig=${signature_chart}&apiKey=${API_KEY}`;
        return urlChart;
    }


    getChartHome(callback) {
        this.setCookie(cookie => {
            axios.get(this.getUrlChartHome(), {
                headers: {
                    Cookie: cookie
                }
            }).then(res => {
                console.log("chart", res)
                callback(res.data)
            })
        })
    }

    getUrlNewRelease() {
        let CTIME = Math.floor(Date.now() / 1000);
        let signature_chart = hmacSha512(
            PATH_NEWRELEASE + sha256(`ctime=${CTIME}version=${VERSION}`),
            SECRET_KEY
        )
        let urlChart = `${URL}${PATH_NEWRELEASE}?ctime=${CTIME}&version=${VERSION}&sig=${signature_chart}&apiKey=${API_KEY}`;
        return urlChart;
    }


    getNewRelease(callback) {
        this.setCookie(cookie => {
            axios.get(this.getUrlNewRelease(), {
                headers: {
                    Cookie: cookie
                }
            }).then(res => {
                console.log("chart", res)
                callback(res.data)
            })
        })
    }

    getUrlGenre() {
        let CTIME = Math.floor(Date.now() / 1000);
        let signature_chart = hmacSha512(
            PATH_GENRE + sha256(`ctime=${CTIME}version=${VERSION}`),
            SECRET_KEY
        )
        let urlChart = `${URL}${PATH_GENRE}?ctime=${CTIME}&version=${VERSION}&sig=${signature_chart}&apiKey=${API_KEY}`;
        return urlChart;
    }


    getGenre(callback) {
        this.setCookie(cookie => {
            axios.get(this.getUrlGenre(), {
                headers: {
                    Cookie: cookie
                }
            }).then(res => {
                console.log("chart", res)
                callback(res.data)
            })
        })
    }

    getUrlGenreDetail(id) {
        let CTIME = Math.floor(Date.now() / 1000);
        let signature = hmacSha512(
            PATH_GENRE_DETAIL + sha256(`ctime=${CTIME}id=${id}version=${VERSION}`),
            SECRET_KEY
        )
        let url = `${URL}${PATH_GENRE_DETAIL}?id=${id}&ctime=${CTIME}&version=${VERSION}&sig=${signature}&apiKey=${API_KEY}`
        return url
    }

    getGenreDetail(id, callback) {
        this.setCookie(cookie => {
            axios.get(this.getUrlGenreDetail(id), {
                headers: {
                    Cookie: cookie
                }
            })
                .then(res => {
                    callback(res.data)
                })
        })
    }

    getUrlLyric(id) {
        let CTIME = Math.floor(Date.now() / 1000);
        let signature_song = hmacSha512(
            PATH_LYRIC + sha256(`ctime=${CTIME}id=${id}version=${VERSION}`),
            SECRET_KEY
        )
        let songUrl = `${URL}${PATH_LYRIC}?id=${id}&BGId=0&ctime=${CTIME}&version=${VERSION}&sig=${signature_song}&apiKey=${API_KEY}`;
        return songUrl;
    }

    getLyric(id, callback) {
        this.setCookie(cookie => {
            axios.get(this.getUrlLyric(id), {
                headers: {
                    Cookie: cookie,
                }
            }).then(res => {
                console.log("song", res);
                callback(res.data);
            })
        })
    }

}

module.exports = new Zing();