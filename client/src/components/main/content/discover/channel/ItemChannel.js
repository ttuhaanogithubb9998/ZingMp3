import React from 'react';

function ItemChannel({ dataItem,description }) {
    // console.log(dataItem);

    const content = ()=>{
        if(description==="link"){
            return <div className="text-[14px] leading-4 text-zinc-700">
                {dataItem.artists.map((item,i)=>{
                    return <div key={i}><a  className=" font-semibold hover:text-fuchsia-800 " href={item.link}>{item.name}</a>, </div>
                })}
            </div>
        }return <h6 className="text-zinc-700 font-semibold text-xs">{dataItem.sortDescription}</h6>
    }

    return (
        <div className="">
            <div className="overflow-hidden">
                <a href={dataItem.link}>
                    <img className="hover:scale-105 ease-in duration-300" src={dataItem.thumbnailM}></img>
                </a>
            </div>
            <div className="">
                <a href={dataItem.link}>
                    <h5 className="text-zinc-50 font-semibold text-xs my-1 hover:text-fuchsia-900">{dataItem.title}</h5>
                </a>
                {content()}
            </div>
        </div>
    );
}

export default ItemChannel;