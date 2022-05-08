import React from 'react';
import {Link} from 'react-router-dom'
function ItemChannel({ dataItem }) {
    // console.log("ItemChannel",dataItem);
    const content = ()=>{
        if(dataItem.artists){
            return <div className="text-[9px] leading-[10px] text-zinc-700">
                {dataItem.artists.map((item,i)=>{
                    return <span key={i}>{i>0&&","} <Link  className=" font-bold hover:text-fuchsia-800 " to={item.link}>{item.name}</Link></span>
                })}
            </div>
        }return <h6 className="text-zinc-700 font-semibold text-xs">{dataItem.sortDescription}</h6>
    }

    return (
        <div className="">
            <div  className="overflow-hidden rounded">
                <Link to={dataItem.link}>
                    <img className="hover:scale-105 ease-in duration-300" src={dataItem.thumbnailM}></img>
                </Link>
            </div>
            <div className="" >
                <Link to={dataItem.link}>
                    <h5 className="text-zinc-50 font-semibold text-xs my-1 hover:text-fuchsia-900">{dataItem.title}</h5>
                </Link>
                {content()}
            </div>
        </div>
    );
}

export default ItemChannel;