import React from 'react';
import { Link } from 'react-router-dom'

function ItemBanner({ banner, handleChangeSong, handleChangeList }) {
    // console.log(banner);

    const event = () => {
        handleChangeSong(banner.encodeId);
        handleChangeList({ type: "songs", id: banner.encodeId });
    }

    if (banner.link.slice(0, 9) === "/bai-hat/")
        return (
            <div onClick={() => event()} className="cursor-pointer rounded m-2 overflow-hidden" >
                <img src={banner.banner}></img>
            </div>
        );
    if (banner.link.slice(0, 7) === "/album/")
        return (
            <div onClick={() => event()} className="cursor-pointer rounded m-2 overflow-hidden" >
                <Link to={banner.link}>
                    <img src={banner.banner}></img>
                </Link>
            </div>
        );

    return ""
}

export default ItemBanner;