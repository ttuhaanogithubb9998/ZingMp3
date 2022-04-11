import React from 'react';
import axios from 'axios';
import { useState,useEffect } from 'react';

import Banner from './banner/Banner'
import Channel from './channel/Channel'
import NewSongs from './newSongs/NewSongs';

function Discover({handlePlaySong}) {
    const [data,setData] = useState('')

    useEffect(()=>{
        axios.get('/api/page-home')
        .then(res=>{
            console.log("discover: ",res)
            setData(res.data.data.items)
        })
    },[])

    return (
        <div className="discover col-span-10 m-4">
            <Banner handlePlaySong={handlePlaySong} dataBanner = {data[0]} />
            <Channel dataChannel={data[3]} />
            <Channel description="link" dataChannel={data[6]} />
            <Channel description="link" dataChannel={data[10]} />
            <NewSongs dataNewSongs = {data[12]} />
        </div>
    );
}

export default Discover;