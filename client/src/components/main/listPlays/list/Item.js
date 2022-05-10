import React, { useCallback } from 'react';
import { Link } from 'react-router-dom'
import { FiMusic } from 'react-icons/fi'
import { ImPlay3 } from 'react-icons/im'
import { RiVipFill } from 'react-icons/ri'

function Item({ dataItem, handleChangeSong, itemActive, index, changeList, vip }) {

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
        if (!vip) {
            handleChangeSong(dataItem.encodeId, index);
            if (changeList) {
                changeList(dataItem.encodeId);
            }
        }
    }, [changeList, dataItem.encodeId, index, vip]);

    return (
        <div className={`${vip && "opacity-50"} group grow hover:bg-navbar-bg ${itemActive === dataItem.encodeId && "bg-[#ffffff1a]"}`} style={{ "borderBottom": "1px solid #ffffff0d" }}>
            <div className="p-2 flex items-center justify-between">
                <div className="flex items-center">
                    <div className="mr-2 text-slate-700"><FiMusic /></div>
                    <div onClick={() => event()} className="w-[24px] h-[24px] rounded overflow-hidden mr-2 relative cursor-pointer">
                        {itemActive === dataItem.encodeId &&
                            <div className="absolute inset-0 flex items-center justify-center "><i className="bg-playMp3 h-[60%] w-[60%] bg-cover "></i></div>
                            ||
                            <div className="absolute inset-0 group-hover:flex items-center justify-center hidden "><ImPlay3 /></div>
                        }

                        <figure>
                            <img src={dataItem.thumbnailM} />
                        </figure>
                    </div>
                    <div className="flex flex-col justify-center h-[24px] box-border leading-[9px]">
                        <div className="text-[12px] font-semibold m-0 p-0 flex">
                            {dataItem.title}
                            {vip && <span className="text-[#dfdf3d] ml-2"><RiVipFill /></span>}
                        </div>
                        <div className="m-0 p-0 ">
                            {
                                dataItem.artists && dataItem.artists.map((artist, i) => {
                                    let link;
                                    if (artist.link.length >= "/nghe-si/".length) {
                                        if (artist.link.slice(0, 9) === "/nghe-si/")
                                            link = artist.link
                                        else
                                            link = "/nghe-si" + artist.link
                                    } else
                                        link = "/nghe-si" + artist.link
                                    return <Link to={link} key={i} className="text-stone-400 font-bold text-[9px] hover:text-fuchsia-900 "><span className="leading-4">{i !== 0 && ", "}{artist.name} </span></Link>
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