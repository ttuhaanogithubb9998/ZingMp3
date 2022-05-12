import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios'

import Audio from './Audio'

function Play({ fftSize, myAudio, encodeId, handleChangeSong, indexSong, handleActiveList, activeList, dataList, handleFirstPlay }) {

    const list = [];
    dataList.forEach((item) => {
        if (item.streamingStatus === 1) {
            list.push(item)
        }
    })
    // console.log("dataList", dataList);   

    const [dataAudio, setDataAudio] = useState({});
    const [encodeIdSong, setEncodeIdSong] = useState(encodeId);
    const [status, setStatus] = useState("normal");
    const [handleControls, setHandleControls] = useState({});


    useEffect(() => {
        setEncodeIdSong(encodeId);
    }, [encodeId]);

    useEffect(() => {
        axios.get(`/api/song?id=${encodeIdSong}`)
            .then(res => {
                // console.log("Play", res)
                if (res.data.err == 0) {
                    setDataAudio((pre) => {
                        if (res.data.data[320] === "VIP")
                            return { ...pre, linkSong: res.data.data[128] }
                        return { ...pre, linkSong: res.data.data[320] }
                    });
                } else {
                    alert(res.data.msg);
                }
            })
        axios.get(`/api/info?id=${encodeIdSong}`)
            .then(res => {
                // console.log("info", res.data)
                setDataAudio((pre) => {
                    return {
                        ...pre,
                        linkThumbnail: res.data.data.thumbnail,
                        title: res.data.data.title,
                        artists: res.data.data.artists,
                    }
                });
            })
    }, [encodeIdSong]);

    useEffect(() => {

        if (list.length > 0) {
            let Ids = [];
            list.map((data) => {
                Ids.push(data.encodeId)
            })

            const getListShuffle = () => {
                let listShuffle = [];
                do {

                    let i = Math.floor(Math.random() * Ids.length);
                    if (listShuffle.length > 0) {
                        let check = listShuffle.some((id) => {
                            return id === Ids[i]
                        })
                        check !== true && listShuffle.push(Ids[i])
                    } else {
                        listShuffle.push(Ids[i])
                    }
                } while (Ids.length !== listShuffle.length)

                return listShuffle
            }
            const IdsShf = getListShuffle();



            const next = (audio, index) => {
                if (status === "shuffle") {
                    if (index >= IdsShf.length - 1) {
                        handleChangeSong(IdsShf[0], 0)
                    } else {
                        handleChangeSong(IdsShf[index + 1], index + 1)
                    }

                } else if (status === "normal") {
                    if (index >= Ids.length - 1) {
                        handleChangeSong(Ids[0], 0)
                    } else {
                        handleChangeSong(Ids[index + 1], index + 1)
                    }
                }
                else {
                    audio.currentTime = 0
                }
            }
            const previous = (audio, index) => {
                if (status === "shuffle") {
                    if (index < 1 || index > IdsShf.length - 1) {
                        handleChangeSong(IdsShf[IdsShf.length - 1], IdsShf.length - 1)
                    } else {
                        handleChangeSong(IdsShf[index - 1], index - 1)
                    }

                } else if (status === "normal") {
                    if (index < 1 || index > Ids.length - 1) {
                        handleChangeSong(Ids[Ids.length - 1], Ids.length - 1)
                    } else {
                        handleChangeSong(Ids[index - 1], index - 1)
                    }
                } else {
                    audio.currentTime = 0
                }
            }

            const shuffle = () => {
                if (status !== "shuffle") {
                    setStatus("shuffle")
                } else {
                    setStatus("normal")
                }
            }

            const repeat = () => {
                if (status !== "repeat") {
                    setStatus("repeat")
                } else {
                    setStatus("normal");
                }
            }


            setHandleControls({
                next,
                previous,
                shuffle,
                repeat
            })
        }

    }, [status, dataList])



    return (
        <div className={`play absolute  inset-x-0 bottom-0 ${!activeList && "bg-[#120c1c]"}`}>
            {encodeId &&
                <Audio
                    fftSize={fftSize}
                    myAudio={myAudio}
                    handleFirstPlay={handleFirstPlay}
                    handleActiveList={handleActiveList}
                    activeList={activeList}
                    status={status}
                    handleControls={handleControls}
                    indexSong={indexSong}
                    linkSong={dataAudio.linkSong}
                    linkThumbnail={dataAudio.linkThumbnail}
                    title={dataAudio.title}
                    artists={dataAudio.artists}
                />
            }
        </div>
    );
}

export default React.memo(Play);