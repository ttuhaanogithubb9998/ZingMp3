import React from 'react';
function ItemBanner({ banner, handleChangeSong, handleChangeList }) {

    const event = () => {
        handleChangeSong(banner.encodeId);
        handleChangeList({type:"songs",id:banner.encodeId});
    }
    return (
        <div onClick={() => event()} className="cursor-pointer rounded m-2 overflow-hidden" >
            <img src={banner.banner}></img>
        </div>
    );
}

export default ItemBanner;