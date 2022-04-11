import React, { useState, useEffect } from 'react';
import axios from 'axios';


import Play from './play/Play';
import List from './List';


function ListPlay({ data ,handlePlaySong}) {
    console.log(data);
    const [encodeIdSong, setEncodeIdSong] = useState(data)

    // useEffect(()=>{
    //     axios.get(`/api/song?id=${encodeId}`)
    //     .then(res=>{
    //         console.log(res)
    //     })
    // },[encodeId]);

    return (
        <div className="grid grid-cols-10 gap-0">
            <Play encodeId = {encodeIdSong} />
            <List handlePlaySong={handlePlaySong} encodeId = {encodeIdSong} />
        </div>
    );
}

export default ListPlay;