import React from 'react';
import { Routes, Route, Link } from 'react-router-dom'

import Discover from './discover/Discover'
import ListPlays from './listPlays/ListPlay'

function Content({dataContent,handlePlaySong}) {




    return (
        <div className="content col-span-10  bg-neutral-900">
            <Routes>
                <Route path="/discover" element={<Discover handlePlaySong={handlePlaySong} />} />
                <Route path="/list-plays" element={<ListPlays handlePlaySong = {handlePlaySong} data={dataContent} />} />
            </Routes>
        </div>
    );
}

export default Content;