import React from 'react';

import ItemChannel from './ItemChannel';

function Channel({ dataChannel, isGenre=false }) {

    // console.log("dataChannel", dataChannel)

    return (
        <div className="channel">
            <h1 className="text-zinc-50 font-semibold my-4">{dataChannel !== undefined && dataChannel.title}</h1>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 sm:gap-7 gap-4">
                {
                    dataChannel.items&&
                    dataChannel.items.map((item, i) => {
                        if (i < 5 ||isGenre)
                            return <ItemChannel  key={i} dataItem={item} />
                        return ""
                    })
                    ||
                    dataChannel.playlists.map((item, i) => {
                        if (i < 5 ||isGenre)
                            return <ItemChannel  key={i} dataItem={item} />
                        return ""
                    })
                }
            </div>
        </div>
    );
}

export default Channel;