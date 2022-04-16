import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

import Banner from './banner/Banner'
import Channel from './channel/Channel'
import NewSongs from './newSongs/NewSongs';

function Discover({ handleChangeSong, handleChangeList,handleChangeIdAlbum }) {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('/api/page-home')
            .then(res => {
                // console.log("discover: ", res.data.data.items)
                setData(res.data.data.items)
            })
    }, [])

    return (
        <div className="discover col-span-10 m-4 pb-[90px]">
            {data.length > 0 &&
                <>
                    {data.map((item, i) => {
                        if (item.sectionId === "hSlider" && item.sectionType === "banner") {
                            return <Banner key={i} handleChangeList={handleChangeList} handleChangeSong={handleChangeSong} dataBanner={data[0]} />
                        } else if (item.sectionId === "hSuggestPl" && item.sectionType === "playlist") {
                            return <Channel handleChangeIdAlbum={handleChangeIdAlbum}  key={i} dataChannel={item} />
                        } else if (item.sectionId === "hAutoTheme2" && item.sectionType === "playlist") {
                            return <Channel  handleChangeIdAlbum={handleChangeIdAlbum} key={i} description="link" dataChannel={item} />
                        } else if (item.sectionId === "h100" && item.sectionType === "playlist") {
                            return <Channel handleChangeIdAlbum={handleChangeIdAlbum} key={i} description="link" dataChannel={item} />
                        } else if (item.sectionId === "hNewrelease" && item.sectionType === "newReleaseChart") {
                            return <NewSongs handleChangeList={handleChangeList} handleChangeSong={handleChangeSong} key={i} dataNewSongs={item} />
                        }
                    })}
                </>
            }
        </div >
    );
}

export default Discover;