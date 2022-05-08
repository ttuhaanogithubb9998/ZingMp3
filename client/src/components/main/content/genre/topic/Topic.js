import React, { useState, useEffect } from 'react';

import Item from './Item'


function Topic({ data,handleChangeIdGenre }) {

    // console.log("dataTopic", data);
    const [showAll, setShowAll] = useState(false);

    return (
        <div className="text-zinc-50 my-8">
            <h1 className="text-[20px] font-semibold my-2">Tâm trạng và hoạt động</h1>
            <div className="grid grid-cols-4 gap-4">
                {data.map((item, i) => {
                    if (i > 7) {
                        return <Item handleChangeIdGenre={handleChangeIdGenre} key={i} data={item} showAll={showAll} />
                    } else
                        return <Item handleChangeIdGenre={handleChangeIdGenre} key={i} data={item} showAll={true} />
                })}
            </div>
            <div className="text-center">
                <div className={`${showAll&& "hidden"} rounded-full border border-violet-900 w-[100px] cursor-pointer m-[auto] my-4`} onClick={() => setShowAll(pre => !pre)} >Tất cả</div>
            </div>
        </div>
    );
}

export default Topic;