import React from 'react';
import { Link } from 'react-router-dom'

import { BiDisc, BiCategoryAlt } from 'react-icons/bi'
import { MdOutlineMultilineChart } from 'react-icons/md'
import { IoMusicalNotesOutline } from 'react-icons/io5'
import { BsStar } from 'react-icons/bs'

function Navbar() {
    // console.log("na")
    return (

        <div className="navbar flex flex-col bg-[#312640] col-span-1 justify-start p-[10px]">
            <div className="w-[100%]" >
                <Link to="/">
                    <div className="navbar-logo h-8 bg-contain bg-no-repeat bg-[url('https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/backgrounds/logo-dark.svg')]"></div>
                </Link>
            </div>
            <div className="navbar-item  my-[10px] text-gray-400 hover:text-zinc-100 cursor-pointer mt-[25px]">
                <Link to="/discover">
                    <div className="flex items-center">
                        <BiDisc size="25px" />
                        <span className="font-semibold ml-[4px]">Khám phá</span>
                    </div>
                </Link>
            </div>
            <div className="navbar-item  my-[7px] text-gray-400 hover:text-zinc-100 cursor-pointer">
                <Link to="/zing-chart">
                    <div className="flex items-center">
                        <MdOutlineMultilineChart size="25px" />
                        <span className="font-semibold ml-[4px]">#zingchart</span>
                    </div>
                </Link>
            </div>
            <div className="navbar-item  my-[7px] text-gray-400 hover:text-zinc-100 cursor-pointer">
                <Link to="/moi-phat-hanh">
                    <div className="flex items-center">
                        <IoMusicalNotesOutline size="25px" />
                        <span className="font-semibold ml-[4px]">Nhạc mới</span>
                    </div>
                </Link>
            </div>
            <div className="navbar-item  my-[7px] text-gray-400 hover:text-zinc-100 cursor-pointer">
                <Link to="/genre">
                    <div className="flex items-center">
                        <BiCategoryAlt size="25px" />
                        <span className="font-semibold ml-[4px]">Thể loại</span>
                    </div>
                </Link>
            </div>
            <div className="navbar-item  my-[7px] text-gray-400 hover:text-zinc-100 cursor-pointer">
                <Link to="/top100">
                    <div className="flex items-center">
                        <BsStar size="25px" />
                        <span className="font-semibold ml-[4px]">Top 100</span>
                    </div>
                </Link>
            </div>

        </div>
    );
}

export default React.memo(Navbar);