import React from 'react';

import Channel from '../discover/channel/Channel'
import Songs from './songs/Songs';


function Container({ handleChangeSong, handleChangeList, idSong ,data}) {
    // console.log("data", data);

    return (
        <div>
            {data.map((item, i) => {
                if (item.sectionType === "playlist")
                    return <Channel key={i}  dataChannel={item} />
                else if (item.sectionType === "song")
                    return <Songs key={i} idSong={idSong}  handleChangeList={handleChangeList} handleChangeSong={handleChangeSong} data = {item}  />
            })}
        </div>
    );
}

export default Container;