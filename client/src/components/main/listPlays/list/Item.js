import React, { useCallback } from 'react';
import { FiMusic } from 'react-icons/fi'
import { ImPlay3 } from 'react-icons/im'

function Item({ dataItem, handleChangeSong, itemActive, index, changeList }) {

    // console.log(dataItem);
    const formatTime = (time) => {
        let s;
        let m;
        s = time
        m = Math.floor(s / 60);
        s = Math.floor(s % 60);
        m = m < 10 ? "0" + m : m;
        s = s < 10 ? "0" + s : s;
        return { s: s, m: m }
    }
    const duration = formatTime(dataItem.duration).m + ":" + formatTime(dataItem.duration).s;

    const event = useCallback(() => {
        handleChangeSong(dataItem.encodeId, index);
        if (changeList) {
            changeList();
        }
    }, [changeList, dataItem.encodeId, index]);

    return (
        <div className={`group hover:bg-navbar-bg ${itemActive === dataItem.encodeId && "bg-navbar-bg"}`} style={{ "borderBottom": "1px solid #ffffff0d" }}>
            <div className="p-2 flex items-center justify-between">
                <div className="flex items-center">
                    <div className="mr-2 text-slate-700"><FiMusic /></div>
                    <div onClick={() => event()} className="w-[24px] h-[24px] rounded overflow-hidden mr-2 relative cursor-pointer">
                        <div className="absolute inset-0 group-hover:flex items-center justify-center hidden "><ImPlay3 /></div>
                        <figure>
                            <img src={dataItem.thumbnailM} />
                        </figure>
                    </div>
                    <div className="flex flex-col justify-center h-[24px] box-border leading-[9px]">
                        <div className="text-[12px] font-semibold m-0 p-0 ">{dataItem.title}</div>
                        <div className="m-0 p-0 ">
                            {
                                dataItem.artists.map((artist, i) => {
                                    return <a key={i} className="text-stone-400 font-bold text-[9px] hover:text-fuchsia-900 " href={artist.link}><span className="leading-4">{i !== 0 && ", "}{artist.name} </span></a>
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="text-stone-400 text-[10px]">
                    {duration}
                </div>
            </div>
        </div>
    );
}

export default Item;