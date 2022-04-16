import React, { useState, useEffect } from 'react';
import axios from 'axios';


import Item from './Item'

function List({  handleChangeSong,itemActive,dataList}) {


    

    

    return (
        <div className="list top-[40px] min-w-[400px] bottom-[90px] px-1 absolute inset-y-0 right-0 overflow-y-scroll scroll-none" >
            <h1 className="text-zinc-50 font-semibold text-[14px]">{dataList.length>0&&"Có thể bạn quan tâm"||"Không có bài hát liên quan"}</h1>
            <div className="px-1 text-zinc-50">
                { dataList.length>0&&
                    dataList.map((item, i) => {
                        return <Item index={i} itemActive={itemActive} key={i} dataItem={item} handleChangeSong={handleChangeSong}/>
                    })
                }
            </div>
        </div>
    );
}

export default List;