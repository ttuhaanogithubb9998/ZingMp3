import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom'

import { BsShuffle, BsPlayCircle, BsPauseCircle } from 'react-icons/bs'
import { BiSkipPrevious, BiSkipNext } from 'react-icons/bi'
import { FiVolume2, FiRepeat } from 'react-icons/fi'
import SubCanvas from './SubCanvas'

function Audio({ activeList,fftSize, myAudio, linkSong, linkThumbnail, title, artists, handleControls, status, indexSong, handleActiveList, handleFirstPlay }) {

    const [audio, setAudio] = useState();
    let mouseChange = false;
    // console.log(status)

    useEffect(() => { setAudio(document.getElementById("audio-tag-1")) }, []);

    useEffect(() => {
        if (audio) {
            const duration = audio.parentElement.querySelector("#duration")
            audio.onloadeddata = () => {
                // console.log("loaded");
                let s, m;
                s = formatTime(audio.duration).s;
                m = formatTime(audio.duration).m;
                if (m && s) {
                    duration.textContent = m + ":" + s;
                } else {
                    duration.textContent = "00:00"
                }

                audio.play();

            }
        }
    }, [audio]);

    useEffect(() => {
        if (audio) {

            audio.ontimeupdate = (e) => {
                // console.log(e.target,audio)
                if (!mouseChange) {
                    const timeNow = audio.parentElement.querySelector("#time-now");
                    const lineNow = audio.parentElement.querySelector("#line-now");
                    let width = audio.currentTime / audio.duration * 100;
                    lineNow.style.width = width + "%";

                    let s, m;
                    s = formatTime(audio.currentTime).s;
                    m = formatTime(audio.currentTime).m;
                    if (m && s) {
                        timeNow.textContent = m + ":" + s;
                    } else {
                        timeNow.textContent = "00:00"
                    }

                    if (width == 100) {
                        if (status === "repeat") {
                            audio.currentTime = 0;
                            audio.play();
                        } else {
                            handleControls.next(audio, indexSong);
                        }
                    }
                }
            }
        }
    }, [audio, mouseChange, handleControls, status, indexSong])

    useEffect(() => {
        if (audio) {
            const btnPause = audio.parentElement.querySelector("#btn-pause");
            const btnPlay = audio.parentElement.querySelector("#btn-play");

            btnPause.onclick = (e) => {
                audio.pause()
            }
            audio.onpause = (e) => {
                btnPlay.style.display = "flex";
                btnPause.style.display = "none";

            }


            btnPlay.onclick = () => {
                audio.play();
            }

            audio.onplay = () => {
                btnPlay.style.display = "none";
                btnPause.style.display = "flex";
                handleFirstPlay();
            }
        }
    }, [audio])


    useEffect(() => {
        if (audio) {
            const timeLine = audio.parentElement.querySelector("#time-line");
            const lineNow = audio.parentElement.querySelector("#line-now");
            const widthLine = timeLine.offsetWidth;
            const timeNow = audio.parentElement.querySelector("#time-now");
            let mouseDown = false;
            timeLine.parentElement.onmousedown = (eDown) => {
                mouseDown = true;

                document.onmousemove = eMove => {
                    if (mouseDown) {
                        mouseChange = true;

                        let x = eMove.pageX - eDown.target.getBoundingClientRect().left
                        let width = x / widthLine * 100;

                        width = width > 99 ? 100 : width;
                        width = width < 1 ? 0 : width;
                        lineNow.style.width = width + "%";

                        let s, m;

                        s = formatTime(audio.duration * width / 100).s;
                        m = formatTime(audio.duration * width / 100).m;
                        if (m && s) {
                            timeNow.textContent = m + ":" + s;
                        } else {
                            timeNow.textContent = "00:00"
                        }
                    }
                }


                document.onmouseup = eUp => {
                    if (mouseDown) {
                        let x = eUp.clientX - eDown.target.getBoundingClientRect().left
                        let width = x / widthLine * 100;

                        width = width > 99 ? 100 : width;
                        width = width < 1 ? 0 : width;
                        lineNow.style.width = width + "%";
                        audio.currentTime = audio.duration / 100 * width;
                        // console.log(audio.currentTime)
                        let s, m;
                        s = formatTime(audio.currentTime).s;
                        m = formatTime(audio.currentTime).m;
                        timeNow.textContent = m + ":" + s;
                    }
                    mouseDown = false;
                    mouseChange = false;
                }
            }

        }
    }, [audio, handleControls, status,indexSong]);


    useEffect(() => {
        let mouseDownState = false;
        let addEvent = false;
        const mouseUp = (eUp, eDown, widthLine, volumeNow) => {
            if (mouseDownState) {
                let x = eUp.clientX - eDown.target.getBoundingClientRect().left
                let width = x / widthLine * 100;

                width = width > 99 ? 100 : width;
                width = width < 1 ? 0 : width;
                volumeNow.style.width = width + "%";
                audio.volume = width / 100;
            }
            mouseDownState = false;

        }

        const mouseMove = (eMove, eDown, widthLine, volumeNow) => {

            if (mouseDownState) {

                let x = eMove.pageX - eDown.target.getBoundingClientRect().left
                let width = x / widthLine * 100;

                width = width > 99 ? 100 : width;
                width = width < 1 ? 0 : width;
                volumeNow.style.width = width + "%";
                audio.volume = width / 100;
            }
        }

        if (audio) {
            const volumeLine = audio.parentElement.querySelector("#volume-line");
            const volumeNow = audio.parentElement.querySelector("#volume-now");
            const widthLine = volumeLine.offsetWidth;

            volumeLine.parentElement.onmousedown = (eDown) => {
                mouseDownState = true;
                addEvent = true;
                document.addEventListener("mousemove", (e) => { mouseMove(e, eDown, widthLine, volumeNow) })
                document.addEventListener("mouseup", (e) => { mouseUp(e, eDown, widthLine, volumeNow) })
            }
        }

        return () => {
            if (addEvent) {
                document.removeEventListener("mouseup", mouseUp)
                document.removeEventListener("mousemove", mouseMove)
                addEvent = false;
            }
        }
    }, [audio]);


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


    return (
        <div className="audio">
            <audio crossOrigin="anonymous" id="audio-tag-1" className="m-auto my-5" src={linkSong} />
            <div className={`player-controls-container ease-in duration-300 flex justify-between items-center  p-2`}>
                <div className="flex items-center  ">
                    <div className="mr-2">
                        <figure onClick={() => handleActiveList()} className=" cursor-pointer h-[64px] w-[64px] rounded overflow-hidden">
                            <img src={linkThumbnail} />
                        </figure>
                    </div>
                    <div className="grow text-left">
                        <div className="text-zinc-50 text-[12px] font-semibold">{title}</div>
                        <div className="leading-[0px]">
                            {artists && artists.map((artist, i) => {
                                return <Link key={i} className="text-stone-400 font-bold text-[10px] hover:text-fuchsia-900 " to={`${artist.link}`}><span className="leading-4">{i !== 0 && ", "}{artist.name} </span></Link>
                            })}
                        </div>
                    </div>
                </div>
                <div>
                {!activeList&&<SubCanvas
                        myAudio={myAudio}
                        fftSize={fftSize}
                    />}
                </div>
                <div className="player-controls-bar flex">
                    <div>
                        <div className="flex justify-center text-zinc-50">
                            <button onClick={() => handleControls.shuffle()} className={`${status === "shuffle" && "text-[#a231da]"} mx-1 justify-center flex items-center w-[25px] h-[25px] rounded-full hover:bg-[#271b38]`}><BsShuffle size="12px" /></button>
                            <button onClick={() => handleControls.previous(audio, indexSong)} className="mx-1 justify-center flex items-center w-[25px] h-[25px] rounded-full hover:bg-[#271b38]"><BiSkipPrevious /></button>
                            <button id="btn-play" className=" justify-center flex items-center w-[28px] h-[28px] rounded-full hover:text-[#a231da]"><BsPlayCircle size="20px" /></button>
                            <button id="btn-pause" className=" hidden  justify-center items-center w-[28px] h-[28px] rounded-full hover:text-[#a231da]"><BsPauseCircle size="20px" /></button>
                            <button onClick={() => handleControls.next(audio, indexSong)} className="mx-1 justify-center flex items-center w-[25px] h-[25px] rounded-full hover:bg-[#271b38]"><BiSkipNext /></button>
                            <button onClick={() => handleControls.repeat()} className={`${status === "repeat" && "text-[#a231da]"} mx-1 justify-center flex items-center w-[25px] h-[25px] rounded-full hover:bg-[#271b38]`}><FiRepeat size="12px" /></button>
                        </div>
                        <div className="text-zinc-50 flex text-[12px] grow justify-between items-center group cursor-pointer">
                            <span id="time-now">00:00</span>
                            <div className="h-5 flex items-center">
                                <div onClick={() => { }} id="time-line" className="w-[200px] bg-gray-700 h-[2px] mx-[2px]  group-hover:h-[3px]">
                                    <div id="line-now" className="w-0 bg-white h-[2px] group-hover:h-[3px] flex justify-end items-center" >
                                        <div className="group-hover:h-[6px] group-hover:w-[6px] group-hover:rounded-full group-hover:bg-white"></div>
                                    </div>
                                </div>
                            </div>
                            <span id="duration">00:00</span>
                        </div>
                    </div>
                    <div className="text-zinc-50 flex items-center group cursor-pointer ml-4">
                        <div><FiVolume2 /></div>
                        <div className="h-5 flex items-center">
                            <div id="volume-line" className="w-[50px] bg-gray-700 h-[2px] mx-[2px]  group-hover:h-[3px]">
                                <div id="volume-now" className="w-[100%] bg-white h-[2px] group-hover:h-[3px] flex justify-end items-center" >
                                    <div className="group-hover:h-[6px] group-hover:w-[6px] group-hover:rounded-full group-hover:bg-white"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(Audio);