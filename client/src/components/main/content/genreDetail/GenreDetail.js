import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {  useParams } from 'react-router-dom'

import Channel from '../discover/channel/Channel'
import Container from './Container'

function GenreDetail({ handleChangeList, idSong, handleChangeSong }) {

    const { idGenre } = useParams();
    const [data, setData] = useState();

    useEffect(() => {
        axios.get(`/api/genre-detail/?id=${idGenre.slice(0, 8)}`)
            .then(res => {
                setData(res.data.data)
            })
    }, [idGenre])
    // console.log("dataGenreDetail", data)
    let style = {
        background: `url("${data && data.cover}") center top / cover no-repeat`,

    }
    let style2 = {
        clear: "both",
        position: "absolute",
        width: "100%",
        height: "100%",
        bottom: 0,
        left: 0,
        "backgroundImage": "linear-gradient(0deg, black 10px, #060007a6, transparent)"
    }



    return (
        <>{
            data &&
            <div className="text-zinc-50 pb-[90px] ">
                <div className="inset-x-0 top-0 h-[300px] relative" style={style}>
                    <div style={style2}></div>
                </div>
                <div className="text-black mt-[-80px] px-[15%] relative">
                    {
                        data.sections.length > 1 &&
                        <Container idSong={idSong}  handleChangeList={handleChangeList} handleChangeSong={handleChangeSong} data={data.sections} />
                        ||
                        <Channel isGenre={true} description="link" dataChannel={data.sections[0]} />
                    }
                </div>
            </div>
        }
        </>

    );
}

export default React.memo(GenreDetail);