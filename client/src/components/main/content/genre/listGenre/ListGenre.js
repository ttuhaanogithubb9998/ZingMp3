import React from 'react';

import Channel from '../../discover/channel/Channel';


function ListGenre({ data, handleChangeIdAlbum }) {
    // console.log('ListGenre', data)
    return (
        <div>
            {data.map((item, i) => {
                return <Channel handleChangeIdAlbum={handleChangeIdAlbum} key={i} dataChannel={item} />
            })}
        </div>
    );
}

export default ListGenre;