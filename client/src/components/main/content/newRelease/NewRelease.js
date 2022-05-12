import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';

import Item from '../../listPlays/list/Item';


function NewRelease({ handleChangeList, idSong, handleChangeSong }) {
    const [data, setData] = useState();

    const style = {
        "background": "linear-gradient(#170f23f9 1px , #170f23), url('https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.6.20/static/media/new-release-bg.73d8f976.jpg')",
        "backgroundRepeat": "no-repeat",
        "backgroundSize": "contain"
    }

    useEffect(() => {
        axios.get(`/api/newrelease`)
            .then(res => {
                // console.log(res);
                setData(res.data.data)
            })
    }, [])
    const changeList = useCallback(() => {
        handleChangeList({ type: "newrelease", id: "" })
    }, [])

    return (
        <div style={style} className="grid grid-cols-10 gap-4 bg-no-repeat bg-contain  pt-[20px]">
            <div className="col-span-2"></div>
            <div className="col-span-6 text-zinc-50 pb-[90px]">
                <h1 className="ml-[-20px] my-2 font-bold text-[25px]">Mới Phát Hành</h1>
                {
                    data && data.items.map((item, i) => {

                        return <div key={i} className="flex items-center">
                            <div className="mr-3 text-gray-100">{i + 1}</div>
                            <Item
                                vip={item.streamingStatus === 2}
                                changeList={changeList}
                                index={i}
                                itemActive={idSong}
                                dataItem={item}
                                handleChangeSong={handleChangeSong}
                            />
                        </div>
                    })
                }
            </div>
            <div className="col-span-2"></div>
        </div>
    );
}

export default React.memo(NewRelease);