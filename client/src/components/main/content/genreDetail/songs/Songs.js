import React,{useCallback} from 'react';

import Item from '../../../listPlays/list/Item'

function Songs({ handleChangeSong, handleChangeList, idSong ,data}) {
    // console.log("songs",data)
    const changeList = useCallback((idList) => {
        handleChangeList({ type: "songs", id: idList })
    },[])
    return (
        <div>
            <h1 className="text-zinc-50 font-semibold my-4">{data.title}</h1>
            <div className="col-span-6 text-zinc-50 pb-[90px]">
                {
                    data.items.map((item, i) => {
                        return <Item vip={item.streamingStatus === 2} changeList={changeList} index={i} itemActive={idSong} key={i} dataItem={item} handleChangeSong={handleChangeSong} />
                    })
                }
            </div>
        </div>
    );
}

export default Songs;