import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Item from '../../listPlays/list/Item'

function Album({ handleChangeSong, handleChangeList, idSong }) {
    const history = useNavigate()
    

    const {idAlbum} =  useParams();
    const [dataAlbum, setDataAlbum] = useState();
    const [timeUpdate, setTimeUpdate] = useState("");
    const date = new Date();
    const format = (number) => number < 10 ? "0" + number : number;
    
    useEffect(() => {
        axios.get(`api/playlist?id=${idAlbum.slice(0,8)}`)
            .then(res => {
                if(res.data.data){
                    setDataAlbum(res.data.data);
                    date.setTime(res.data.data.contentLastUpdate * 1000)
                    setTimeUpdate(format(date.getDate()) + "." + format(date.getMonth()) + "." + date.getFullYear())
                }
            })
    }, [idAlbum])


    const changeList = useCallback(() => {
        handleChangeList({ type: "playlist", id: idAlbum.slice(0,8) })
    }, [idAlbum])


    return (<> {dataAlbum &&
        <div className="grid grid-cols-10 gap-4 bg-[#170f23] pt-[20px]">
            <div className="col-span-1"></div>
            <div className="col-span-2 py-3 relative">
                <div className="sticky top-1">
                    <div className="rounded overflow-hidden">
                        <figure className="hover:scale-105 ease-in-out duration-300 cursor-pointer">
                            <img src={dataAlbum.thumbnailM}></img>
                        </figure>
                    </div>
                    <div className="text-zinc-50 font-semibold text-center mt-1">
                        <div>
                            <h3>{dataAlbum.title}</h3>
                            <div className="text-[#534d5b] text-[9px] ">Cập nhật: {timeUpdate}</div>
                            <div className="text-[#534d5b] text-[9px]" >
                                {dataAlbum.artists && dataAlbum.artists.map((artist, i) => {
                                    return <span key={i}> {i !== 0 && ", "}<Link className="hover:text-purple-900" to={artist.link}>{artist.name}</Link></span>
                                })}
                            </div>
                            <div className="text-[#534d5b] text-[9px]" >
                                {dataAlbum.like} người yêu thích
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-6 text-zinc-50 pb-[90px]">
                {
                    dataAlbum.song.items.map((item, i) => {
                        return <Item vip={item.streamingStatus === 2} changeList={changeList} index={i} itemActive={idSong} key={i} dataItem={item} handleChangeSong={handleChangeSong} />
                    })
                }
            </div>
            <div className="col-span-1"></div>
        </div>
    }</>
    );
}

export default React.memo(Album);