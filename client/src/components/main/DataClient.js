
// function setDataClient(obj) {
//     localStorage.setItem("zing_mp3_client",JSON.stringify(obj));
// };
function setDataClient(callback) {
    let data = localStorage.getItem("zing_mp3_client");
    let obj;
    if (data !== "undefined") {
        obj = callback(JSON.parse(data))
        localStorage.setItem("zing_mp3_client", JSON.stringify(obj));
    }else{
        obj = callback({})
        localStorage.setItem("zing_mp3_client", JSON.stringify(obj));
    }
}
function getDataClient() {
    const data = localStorage.getItem("zing_mp3_client");
    if (data !== "undefined") {
        return JSON.parse(data);
    }
    return {}
}

export {
    setDataClient,
    getDataClient
};