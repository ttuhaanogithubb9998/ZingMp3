import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import ItemSong from './ItemSong'

function NewSongs({ dataNewSongs,handleChangeSong,handleChangeList }) {
    // console.log(dataNewSongs);
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    }

    return (
        <div className="my-1">
            <h1 className="text-zinc-50 my-4 font-semibold">Mới Phát Hành</h1>
            <Carousel
                arrows={false}
                swipeable={false}
                draggable={false}
                showDots={false}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={4000}
                keyBoardControl={true}
                customTransition="transform 1000ms ease-in-out"
                transitionDuration={0}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >
                {dataNewSongs !== undefined &&
                    dataNewSongs.items.map((item, i) => {
                        return <ItemSong handleChangeList={handleChangeList} handleChangeSong={handleChangeSong} key={i} data={item} index={i}/>
                    })
                }
            </Carousel>
        </div>
    );
}

export default NewSongs;