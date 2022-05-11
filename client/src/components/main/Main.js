import React, { useState, useCallback } from 'react';

import Navbar from './navbar/Navbar'
import Content from './content/Content'
import ListPlays from './listPlays/ListPlay'


function Main(props) {

    const [idSong, setIdSong] = useState("");
    const [list, setList] = useState({});


    const handleChangeSong = useCallback((encodeId) => {
        setIdSong(encodeId);
    }, [])

    const handleChangeList = useCallback((list) => {
        setList(list);
    }, [])

    return (
        <div className="main grid grid-cols-9 gap-0 scroll-none" >
            <Navbar />
            <Content
                idSong={idSong}
                handleChangeList={handleChangeList}
                handleChangeSong={handleChangeSong}
            />
            <ListPlays
                idSong={idSong}
                changeSong={handleChangeSong}
                list={list}
            />
        </div>
    );
}

export default React.memo(Main);