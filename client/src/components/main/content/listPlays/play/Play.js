import React, { useState, useEffect } from 'react';
import axios from 'axios'

import Audio from './Audio'

function Play({ encodeId }) {
    const [dataAudio, setDataAudio] = useState({});

    useEffect(() => {
        axios.get(`/api/song?id=${encodeId}`)
            .then(res => {
                console.log("Play", res)
                setDataAudio((pre) => {
                    return { ...pre, linkSong: res.data.data[128] }
                });
            })
        axios.get(`/api/info?id=${encodeId}`)
            .then(res => {
                console.log("info", res.data)
                setDataAudio((pre) => {
                    return {
                        ...pre,
                        linkThumbnail: res.data.data.thumbnail,
                        title: res.data.data.title,
                        artists: res.data.data.artists,
                    }
                });
            })
    }, [encodeId]);
    const test = () => {
        console.log("test")
        setDataAudio(pre => {
            return { ...pre, linkSong: "test" }
        })
    }

    return (
        <div className="play col-span-5 bg-red-300">
            <button onClick={e => test()} className="">test</button>
            <Audio linkSong={dataAudio.linkSong} linkThumbnail={dataAudio.linkThumbnail} title={dataAudio.title} artists={dataAudio.artists} />
        </div>
    );
}

export default Play;