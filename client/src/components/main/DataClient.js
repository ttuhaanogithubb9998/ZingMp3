
// function setDataClient(obj) {
//     localStorage.setItem("zing_mp3_client",JSON.stringify(obj));
// };
function setDataClient(callback) {
    let data = getDataClient();
    let obj;
    obj = callback(data)
    localStorage.setItem("zing_mp3_client", JSON.stringify(obj));
}
function getDataClient() {
    const data = localStorage.getItem("zing_mp3_client");
    // console.log(data)
    if (data !== null) {
        return JSON.parse(data);
    }
    return {
        encodeIdSong:"",
        encodeIdList:"",
        listType:"",
        indexSong:""
    }
}

export {
    setDataClient,
    getDataClient
};