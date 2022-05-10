import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios'

import Play from './play/Play';
import List from './list/List';
import { setDataClient, getDataClient } from '../DataClient'

import { BsChevronDown } from 'react-icons/bs'


function ListPlay({ idSong, list, changeSong }) {

    // console.log("list",list)

    const codeSong = getDataClient().encodeIdSong;
    const codeList = getDataClient().encodeIdList;
    const type = getDataClient().listType;
    const indexS = getDataClient().indexSong;




    const [encodeIdSong, setEncodeIdSong] = useState(codeSong);
    const [encodeIdList, setEncodeIdList] = useState(codeList);
    const [typeList, setTypeList] = useState(type);
    const [indexSong, setIndexSong] = useState(indexS || -1)
    const [activeList, setActiveList] = useState(false)

    const [dataList, setDataList] = useState();


    useEffect(() => {
        // console.log("test",encodeIdList)
        if (encodeIdList.length > 0)
            axios.get(`/api/${typeList}?id=${encodeIdList}`)
                .then(res => {
                    if (res.data.data.items) {
                        setDataList(res.data.data.items);
                    } else if (res.data.data.song) {
                        setDataList(res.data.data.song.items);
                    }else if(res.data.data.RTChart){
                        setDataList(res.data.data.RTChart.items);
                    }
                })
                .catch(res => console.log("error", typeList))
    }, [encodeIdList, typeList]);


    // console.log("encodeIdSong", encodeIdSong)
    // console.log("encodeIdList", encodeIdList)
    // console.log("typeList", typeList)


    useEffect(() => {
        if (idSong) {
            setEncodeIdSong(idSong);
            setDataClient((pre) => {
                return {
                    ...pre,
                    encodeIdSong: idSong,
                }
            })
        }
    }, [idSong]);


    useEffect(() => {
        // console.log("idlist",list.id)
        if (list.id) {
            setEncodeIdList(list.id);
            setDataClient((pre) => {
                return {
                    ...pre,
                    encodeIdList: list.id,
                }
            })
        }
    }, [list.id])

    useEffect(() => {
        if (list.type) {
            setTypeList(list.type);
            setDataClient((pre) => {
                return {
                    ...pre,
                    listType: list.type
                }
            })
        }
    }, [list.type]);

    const handleChangeSong = useCallback((id, index) => {
        setEncodeIdSong(id);
        setIndexSong(index);
        setDataClient((pre) => {
            return {
                ...pre,
                encodeIdSong: id,
                indexSong: index
            }
        })
        changeSong(id);
    }, [changeSong]);


    const handleActiveList = useCallback(() => {
        setActiveList(pre => !pre);
    }, [])


    return (
        <div className={`fixed inset-x-0 z-[5000] bottom-0 ease-in duration-300 bg-gray-800 ${activeList && "h-screen" || "h-0"}`}>
            {
                (encodeIdSong && dataList) && <>
                    <div className="top-0 inset-x-0 h-[40px] text-zinc-50 flex justify-end items-center pr-5">
                        <div onClick={() => handleActiveList()} className="rounded-full p-1 cursor-pointer bg-[#ffffff1a]" >
                            <BsChevronDown />
                        </div>
                    </div>
                    
                    <List
                        dataList={dataList}
                        itemActive={encodeIdSong}
                        handleChangeSong={handleChangeSong}
                    />
                    < Play
                        dataList={dataList}
                        activeList={activeList}
                        handleActiveList={handleActiveList}
                        handleChangeSong={handleChangeSong}
                        indexSong={indexSong}
                        encodeId={encodeIdSong}
                    />
                </>
            }
        </div>
    );
}

export default React.memo(ListPlay);