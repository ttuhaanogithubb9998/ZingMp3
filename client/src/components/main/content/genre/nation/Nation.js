import React from 'react';
import {Link } from 'react-router-dom'


function Nation({ data }) {
    // console.log("nations", data);
    return (
        <div className="text-zinc-50 my-8">
            <h1 className="text-[20px] font-semibold my-2">Quốc gia</h1>
            <div className="grid grid-cols-4 gap-4">
                {data.map((item, i) => {
                    return <div key ={i} className="relative group">
                        <Link to={`/genre-detail${item.link.slice(4)}`}>
                            <div className="opacity-70 overflow-hidden rounded">
                                <figure>
                                    <img className="group-hover:scale-105 ease-in duration-200" src={item.thumbnail} alt=""></img>
                                </figure>
                            </div>
                            <div className="absolute bottom-[20px] text-center w-[100%]">
                                <h3 className="text-[20px] font-semibold my-2">{item.title}</h3>
                            </div>
                        </Link>
                    </div>
                })}
            </div>
        </div>
    );
}

export default Nation;