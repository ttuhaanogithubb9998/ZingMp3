import axios from 'axios';
import React, { useState, useEffect } from 'react';

import Topic from './topic/Topic'
import Nation from './nation/Nation';
import ListGenre from './listGenre/ListGenre';

function Genre({handleChangeIdAlbum ,handleChangeIdGenre}) {

    const [data, setData] = useState();
    // console.log("data",data);
    useEffect(() => {
        axios.get(`api/genre`)
            .then(res => {

                setData(res.data.data)
            })
    }, [])


    return (
        <div className="grid grid-cols-9 gap-1 pb-[90px]">
            {
                data && <>
                    <div className="col-span-1"></div>
                    <div className="col-span-7">
                        <Topic handleChangeIdGenre={handleChangeIdGenre} data={data.topic} />
                        <Nation handleChangeIdGenre={handleChangeIdGenre} data = {data.nations}/>
                        <ListGenre data = {data.genre} handleChangeIdAlbum = {handleChangeIdAlbum}/>
                    </div>
                    <div className="col-span-1"></div>
                </>
            }
        </div>
    );
}

export default Genre;