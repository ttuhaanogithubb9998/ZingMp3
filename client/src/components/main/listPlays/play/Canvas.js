import React, { useLayoutEffect, useEffect, useState } from 'react';

import Bar from './audioContext/bar'
// import SubBar from './audioContext/subBar'
import Snail from './snail/Snail';
import Karaoke from './karaoke/Karaoke'

function Canvas({ myAudio, fftSize, dataKara }) {
    // console.log(myAudio);

    const [canvas, setCanvas] = useState();


    useLayoutEffect(() => {
        setCanvas(document.getElementById('canvas'))
    }, [])

    useEffect(() => {
        if (canvas && myAudio) {
            const ctx = canvas.getContext('2d');
            const bars = [];
            const createBars = () => {
                for (let i = 0; i < (fftSize / 2); i++) {
                    let color = `hsl(${i * 360 / (fftSize / 2) + 174},100%,50%)`
                    bars.push(new Bar(0, i + 1, 10, 50, color, i + 1))
                    // bars.push(new SubBar(0, i + 1, 10, 50, color, i + 1))
                }
            }
            createBars();

            let animateID;

            const animate = () => {

                let volume = myAudio.getVolume();
                let samples = myAudio.getSamples();
                // let samples = myAudio.getSubSamples();
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                ctx.save();
                ctx.beginPath();

                let gradient = ctx.createLinearGradient(0, 0, 0, canvas.height / 1.7);
                gradient.addColorStop(0, 'red');
                gradient.addColorStop(0.2, 'yellow');
                gradient.addColorStop(0.4, 'green');
                gradient.addColorStop(0.6, 'cyan');
                gradient.addColorStop(0.8, 'blue');
                gradient.addColorStop(1, 'magenta');
                ctx.strokeStyle = gradient
                let p1 = new Path2D(Snail.d1)
                let p2 = new Path2D(Snail.d2)
                let p3 = new Path2D(Snail.d3)
                let p4 = new Path2D(Snail.d4)
                ctx.lineWidth = 2;
                ctx.stroke(p1);
                ctx.stroke(p2);
                ctx.stroke(p3);
                ctx.stroke(p4);
                ctx.stroke();

                ctx.translate(canvas.width / 2, canvas.height / 2.9);
                ctx.rotate(10.1)
                ctx.scale(0.45 + volume * 0.03, 0.45 + volume * 0.03);


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
    }, [canvas, myAudio])




    return (
        <div className="top-[40px] bottom-[90px] absolute left-[10px] right-[400px] overflow-hidden">
            <canvas width="500" height="500" className="absolute inset-0" id="canvas" ></canvas>
            <div className="absolute inset-x-0 bottom-[0] h-[200px] ">
                {dataKara && <Karaoke
                    dataKara={dataKara}
                />}
            </div>
        </div>
    );
}

export default React.memo(Canvas);