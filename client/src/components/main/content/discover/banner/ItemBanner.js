import React from 'react';
import { Link } from 'react-router-dom'
function ItemBanner({ banner, handlePlaySong }) {

    return (
        <Link to="/list-plays">
            <div onClick={() => handlePlaySong(banner.encodeId)} className="cursor-pointer rounded m-2 overflow-hidden" >
                <img src={banner.banner}></img>
            </div>
        </Link>
    );
}

export default ItemBanner;