import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import axios from 'axios'

import Play from './play/Play';
import List from './list/List';
import Canvas from './play/Canvas';
import MyAudio from './play/audioContext/myAudio'

import { setDataClient, getDataClient } from '../DataClient'

import { BsChevronDown } from 'react-icons/bs'


function ListPlay({ idSong, list, changeSong }) {

    // console.log("list",list)

    const codeSong = getDataClient().encodeIdSong;
    const codeList = getDataClient().encodeIdList;
    const type = getDataClient().listType;
    const indexS = getDataClient().indexSong;
    const fftSize = 512;




    const [encodeIdSong, setEncodeIdSong] = useState(codeSong);
    const [encodeIdList, setEncodeIdList] = useState(codeList);
    const [typeList, setTypeList] = useState(type);
    const [indexSong, setIndexSong] = useState(indexS || -1)
    const [activeList, setActiveList] = useState(false)
    const [isPlayFirst, setIsPlay] = useState(false);
    const [dataKara, setDataKara] = useState();

    const [myAudio, setMyAudio] = useState();
    const [elementAudio, setEleAUdio] = useState();

    const [dataList, setDataList] = useState();
    // console.log("asdf",encodeIdSong)

    useLayoutEffect(() => {
        setEleAUdio(document.getElementById('audio-tag-1'))
    }, [encodeIdSong, dataList])

    useEffect(() => {
        // console.log(elementAudio)
        if (elementAudio) {
            isPlayFirst && setMyAudio(new MyAudio(elementAudio, fftSize));
        }
    }, [elementAudio, isPlayFirst])


    const handleFirstPlay = useCallback(() => {
        setIsPlay(true)
    }, [])


    useEffect(() => {
        if (encodeIdSong) {
            axios.get(`/api/lyric?id=${encodeIdSong}`)
            .then(res=>{
                // console.log(res.data)
                if(res.data.err===0){
                    setDataKara(res.data.data);
                }
            })
        }
    }, [encodeIdSong])


    useEffect(() => {
        // console.log("test",encodeIdList)
        if (typeList.length > 0)
            axios.get(`/api/${typeList}?id=${encodeIdList}`)
                .then(res => {
                    if (res.data.data.items) {
                        setDataList(res.data.data.items);
                    } else if (res.data.data.song) {
                        setDataList(res.data.data.song.items);
                    } else if (res.data.data.RTChart) {
                        setDataList(res.data.data.RTChart.items);
                    }
                })
                .catch(res => console.log("error", typeList))
    }, [encodeIdList, typeList]);




    useEffect(() => {
        if (idSong) {
            // console.log(idSong)
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
                    {activeList && <Canvas
                        fftSize={fftSize}
                        dataKara={dataKara}
                        myAudio={myAudio}
                    />}
                    <List
                        dataList={dataList}
                        itemActive={encodeIdSong}
                        handleChangeSong={handleChangeSong}
                    />
                    < Play
                        myAudio={myAudio}
                        fftSize={fftSize}
                        handleFirstPlay={handleFirstPlay}
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