import React, { useState, useEffect, useLayoutEffect } from 'react';
import SubBar from './audioContext/subBar'


function SubCanvas({ myAudio, fftSize }) {


    const [canvasSub, setCanvas] = useState();

    useLayoutEffect(() => {
        setCanvas(document.getElementById('subCanvas'))
    }, [])

    useEffect(() => {
        if (canvasSub && myAudio) {
            // console.log(myAudio);

            const ctx = canvasSub.getContext('2d');
            const bars = [];
            const createBars = () => {
                for (let i = 0; i < (32 / 2); i++) {
                    let color = `hsl(${i * 360 / (32 / 2) + 174},100%,50%)`
                    bars.push(new SubBar(0, i + 1, 10, 50, "#00FF59", i + 1))
                }
            }
            createBars();

            let animateID;

            const animate = () => {

                let volume = myAudio.getVolume();
                let samples = myAudio.getSubSamples();
                ctx.clearRect(0, 0, canvasSub.width, canvasSub.height);

                ctx.save();
                // ctx.translate(canvasSub.width/4, canvasSub.height / 2);
                ctx.translate(canvasSub.height + 150, canvasSub.height / 1.2);

                // ctx.rotate(-1.5707963268)
                // ctx.rotate(-0.7853981634)
                // ctx.scale(0.45 + volume * 0.03, 0.45 + volume * 0.03);
                // ctx.scale(0.45,0.45);


                bars.forEach((bar, i) => {
                    bar.update(samples[i])
                    bar.draw(ctx, fftSize);
                });

                ctx.restore();
                animateID = requestAnimationFrame(animate)

            }
            animate();
            return () => {
                cancelAnimationFrame(animateID);
            }
        }
    }, [canvasSub, myAudio])


    return (
        <div >
            <canvas width="500" height="65" id="subCanvas"></canvas>
        </div>
    );
}

export default SubCanvas;