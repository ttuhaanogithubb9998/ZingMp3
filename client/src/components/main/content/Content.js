import React, { useState, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom'

import Album from './album/Album';
import Discover from './discover/Discover'
import NewRelease from './newRelease/NewRelease';
import Genre from './genre/Genre'
import GenreDetail from './genreDetail/GenreDetail';
import Top100 from './top100/Top100'
import ZingChart from './zingchart/ZingChart';

function Content({ handleChangeSong, idSong, handleChangeList }) {

    return (
        <div className="content col-span-8  bg-[#170f23]  overflow-y-scroll h-screen scroll-none">
            <Routes>
                <Route path = '/*' element={<div className="text-zinc-50 text-[30px] text-center ">Page này chưa hoàn thiện</div>}/>
                <Route path="/discover/*" element={<Discover handleChangeList={handleChangeList} handleChangeSong={handleChangeSong} />} />
                <Route path="/" element={<Discover handleChangeList={handleChangeList} handleChangeSong={handleChangeSong} />} />
                <Route path="/zing-chart" element={<ZingChart idSong={idSong} handleChangeList={handleChangeList} handleChangeSong={handleChangeSong} />}/>
                <Route path="/album/:s/:idAlbum" element={<Album idSong={idSong} handleChangeList={handleChangeList} handleChangeSong={handleChangeSong} />} />
                <Route path="/moi-phat-hanh/*" element={<NewRelease idSong={idSong} handleChangeList={handleChangeList} handleChangeSong={handleChangeSong} />} />
                <Route path="/genre/*" element={<Genre />} />
                <Route path="/genre-detail/:s/:idGenre" element={<GenreDetail idSong={idSong} handleChangeList={handleChangeList} handleChangeSong={handleChangeSong} />} />
                <Route path="/top100" element={<Top100 />} />
            </Routes>
        </div>
    );
}

export default Content;