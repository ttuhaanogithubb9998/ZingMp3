import React from 'react';

import { Link } from 'react-router-dom'

function Item({ data, showAll,handleChangeIdGenre }) {
    // console.log("link", data.link.slice(4));
    return (
        <div className={`relative overflow-hidden group ${!showAll && "hidden"}`}  >
            <Link to={`/genre-detail${data.link.slice(4)}`}>
                <div className="rounded overflow-hidden">
                    <figure>
                        <img className="group-hover:scale-110 ease-in duration-300 opacity-70" src={data.thumbnail} alt=""></img>
                    </figure>
                </div>
                <div className="absolute bottom-2 left-2   flex justify-end flex-col">
                    <h2 className="my-3 font-semibold">{data.title}</h2>
                    <div className="grid grid-cols-5 gap-2">
                        {data.playlists.map((item, i) => {
                            return <div key={i} className="rounded overflow-hidden ">
                                <figure>
                                    <img src={item.thumbnail} alt=""></img>
                                </figure>
                            </div>
                        })}
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default Item;