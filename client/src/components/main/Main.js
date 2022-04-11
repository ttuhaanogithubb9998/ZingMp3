import React, {useState,useEffect,useCallback,useMemo} from 'react';
import axios from 'axios'

import Navbar from './navbar/Navbar'
import Content from './content/Content'


function Main(props) {

    const [dataContent, setDataContent] = useState("ZZ9BA689");
    const handlePlaySong = useCallback((encodeId)=>{    
        console.log(encodeId);
        setDataContent(encodeId);
    })  
    // axios.get('/api/')

    return (
        <div className = "main grid grid-cols-11 gap-0 " >
            <Navbar />
            <Content dataContent={dataContent} handlePlaySong={handlePlaySong} />
        </div>
    );
}

export default Main;