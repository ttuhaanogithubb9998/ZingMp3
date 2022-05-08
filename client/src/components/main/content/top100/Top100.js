import React, { useState, useEffect } from 'react';
import axios from 'axios'

import Channel from '../discover/channel/Channel';

function Top100() {
    const [data, setData] = useState();

    useEffect(() => {
        axios.get(`/api/top100`)
            .then(res => {
                setData(res.data.data)
            })
    }, [])
    // console.log("dataGenreDetail", data)
    let style = {
        background: `url(https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.6.24/static/media/banner-100.33cafe6b.png) top/cover no-repeat`,

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
            <div className="text-zinc-50  ">
                <div className="inset-x-0 top-0 h-[250px] relative" style={style}>
                    <div style={style2}></div>
                </div>
                <div className="text-black mt-[-80px] px-[15%] relative">
                    {
                        data.map((item, i) => {
                            return <Channel isGenre={true} dataChannel={item} />
                        })
                    }
                </div>
            </div>
        }
        </>

    );
}

export default Top100;