import React, { useLayoutEffect, useEffect, useState } from 'react';

import Bar from './audioContext/bar'
import MyAudio from './audioContext/myAudio'
import SubBar from './audioContext/subBar'
import Snail from './svg/Snail';


function Canvas({ activeList, isPlayFirst }) {

    const [elementAudio, setEleAUdio] = useState();
    const [canvas, setCanvas] = useState();
    const [myAudio, setMyAudio] = useState();
    const fftSize = 512;


    useLayoutEffect(() => {
        setEleAUdio(document.getElementById('audio-tag-1'))
        setCanvas(document.getElementById('canvas'))
    }, [])

    useEffect(() => {
        if (elementAudio && canvas && myAudio) {
            const ctx = canvas.getContext('2d');

            const bars = [];
            const createBars = () => {
                for (let i = 0; i < (fftSize / 2); i++) {
                    let color = `hsl(${i * 360 / (fftSize / 2)+174},100%,50%)`
                    bars.push(new Bar(0, i + 1, 10, 50, color, i + 1))
                    // bars.push(new SubBar(0, i + 1, 10, 50, color, i + 1))
                }
            }
            createBars();

            const animate = () => {

                let volume = myAudio.getVolume();
                let samples = myAudio.getSamples();
                // let samples = myAudio.getSubSamples();

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.save();
                ctx.translate(canvas.width / 2, canvas.height / 2);
                ctx.rotate(10.1)
                // ctx.rotate(2)
                ctx.scale(0.6 + volume * 0.03, 0.6 + volume * 0.03);


                bars.forEach((bar, i) => {
                    bar.update(samples[i], volume)
                    bar.draw(ctx, fftSize);
                });

                ctx.restore();
                requestAnimationFrame(animate)

            }
            animate();

        }
    }, [elementAudio, canvas, myAudio])

    useEffect(() => {
        canvas && setTimeout(() => {
            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = canvas.parentElement.clientHeight;
        }, 400)
    }, [activeList, canvas])

    useEffect(() => {
        if (elementAudio) {
            isPlayFirst && setMyAudio(new MyAudio(elementAudio, fftSize));
        }
    }, [elementAudio, isPlayFirst])
    // console.log(myAudio);

    return (
        <div className="top-[0px] bottom-[90px] absolute left-[0px] right-[400px] overflow-hidden">
            <div className="absolute inset-0 ">
                <div className="scale-[0.8] translate-y-[-3%] translate-x-[-2%]">
                    <Snail />
                </div>
            </div>
            <canvas className="absolute inset-0" id="canvas" ></canvas>
        </div>
    );
}

export default React.memo(Canvas);