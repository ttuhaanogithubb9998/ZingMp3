import React from 'react';


import Item from './Item'

function List({  handleChangeSong,itemActive,dataList}) {

    const list = [];
    dataList.forEach((item)=>{
        if(item.streamingStatus===1){
            list.push(item)
        }
    })

    

    return (
        <div className="list top-[40px] w-[400px] bottom-[90px] px-1 absolute  right-0 overflow-y-scroll scroll-none" >
            <h1 className="text-zinc-50 font-semibold text-[14px]">{dataList.length>0&&"Có thể bạn quan tâm"||"Không có bài hát liên quan"}</h1>
            <div className="px-1 text-zinc-50">
                { list.length>0&&
                    list.map((item, i) => {
                        return <Item index={i} itemActive={itemActive} key={i} dataItem={item} handleChangeSong={handleChangeSong}/>
                    })
                }
            </div>
        </div>
    );
}

export default React.memo(List);