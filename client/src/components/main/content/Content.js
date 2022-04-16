import React, { useState, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom'
import Album from './album/Album';

import Discover from './discover/Discover'

function Content({ handleChangeSong, idSong, handleChangeList }) {
    const [idAlbum, setIdAlbum] = useState(document.location.href.slice(-13, -5))

    const handleChangeIdAlbum = useCallback((id) => {
        setIdAlbum(id)
    }, [])


    return (
        <div className="content col-span-8  bg-neutral-900  overflow-y-scroll h-screen scroll-none">
            <Routes>
                <Route path="/" element={<Discover handleChangeIdAlbum={handleChangeIdAlbum} handleChangeList={handleChangeList} handleChangeSong={handleChangeSong} />} />
                <Route path="/discover/*" element={<Discover handleChangeIdAlbum={handleChangeIdAlbum} handleChangeList={handleChangeList} handleChangeSong={handleChangeSong} />} />
                <Route path="/album/*" element={<Album idSong={idSong} idAlbum={idAlbum} handleChangeList={handleChangeList} handleChangeSong={handleChangeSong} />} />
            </Routes>
        </div>
    );
}

export default Content;