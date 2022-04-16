import React from 'react';
import {Link} from 'react-router-dom'
function ItemChannel({ dataItem,description,handleChangeIdAlbum }) {
    // console.log(dataItem);
    const content = ()=>{
        if(description==="link"){
            return <div className="text-[14px] leading-4 text-zinc-700">
                {dataItem.artists.map((item,i)=>{
                    return <div key={i}><Link  className=" font-semibold hover:text-fuchsia-800 " to={item.link}>{item.name}</Link>, </div>
                })}
            </div>
        }return <h6 className="text-zinc-700 font-semibold text-xs">{dataItem.sortDescription}</h6>
    }

    return (
        <div className="">
            <div onClick={()=>handleChangeIdAlbum(dataItem.encodeId)} className="overflow-hidden">
                <Link to={dataItem.link}>
                    <img className="hover:scale-105 ease-in duration-300" src={dataItem.thumbnailM}></img>
                </Link>
            </div>
            <div className="">
                <Link to={dataItem.link}>
                    <h5 className="text-zinc-50 font-semibold text-xs my-1 hover:text-fuchsia-900">{dataItem.title}</h5>
                </Link>
                {content()}
            </div>
        </div>
    );
}

export default ItemChannel;