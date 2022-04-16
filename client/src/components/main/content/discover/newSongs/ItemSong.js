import React, { useCallback } from 'react';
import { Link } from 'react-router-dom'


function ItemSong({ data, index, handleChangeSong, handleChangeList }) {
    // console.log(data);
    const date = new Date();
    const format = (number) => {
        return number < 10 ? "0" + number : number
    }


    date.setTime(data.releaseDate * 1000 + 86400000 * 30)
    const releaseDate = format(date.getDate()) + "." + format(date.getMonth()) + "." + date.getFullYear();


    const event = useCallback(() => {
        handleChangeSong(data.encodeId);
        handleChangeList({ type: "songs", id: data.encodeId })
    })


    return (
        <div className="rounded media flex p-3 bg-slate-600 m-4 " >
            <a></a>
            <div className="left">
                <div className="media-img h-24 w-24 mr-2 overflow-hidden rounded">
                    <figure onClick={() => event()}>
                        <img className="hover:scale-105 ease-in duration-300 cursor-pointer" src={data.thumbnailM} />
                    </figure>
                </div>
            </div>
            <div className="content flex justify-between flex-col w-full">
                <div>
                    <div >
                        <span className="text-zinc-50 font-semibold text-[14px]">{data.title}</span>
                    </div>
                    <div className="leading-4">
                        {data.artists.map((item, i) => {
                            return <Link
                                to={item.link}
                                key={i}
                                className="text-stone-400 font-bold text-[10px] hover:text-fuchsia-900 "
                            >
                                <span className="leading-4">{i !== 0 && ", "}{item.name} </span>
                            </Link>
                        })}
                    </div>
                </div>
                <div className="flex flex-row justify-between text-stone-400 text-[13px] font-semibold">
                    <div className="text-[20px] font-['sans-serif'] font-bold" >#{index + 1}</div>
                    <div>{releaseDate}</div>
                </div>
            </div>
        </div>
    );
}

export default ItemSong;