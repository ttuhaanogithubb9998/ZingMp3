import React, { useLayoutEffect } from 'react';


function Karaoke({ dataKara }) {

    console.log(dataKara)

    useLayoutEffect(() => {
        const audio = document.getElementById("audio-tag-1");
        const canvas = document.getElementById("canvasKara");
        canvas.width = canvas.parentElement.offsetWidth
        const ctx = canvas.getContext("2d");
        let idAnimation

        const animate = () => {
            let currentTime = audio.currentTime;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            dataKara.sentences.map((line, i) => {
                let xStartText = 0;
                let widthTextForTime = 0;

                line.words.map((word, j) => {
                    if (currentTime * 1000 > word.startTime) {
                        if (currentTime * 1000 < word.endTime) {
                            let ratio = (currentTime * 1000 - word.startTime) / (word.endTime - word.startTime)
                            widthTextForTime += ctx.measureText(word.data + " ").width * ratio;
                        } else {
                            widthTextForTime += ctx.measureText(word.data + " ").width
                        }
                    }
                });
                if (currentTime * 1000 > line.words[0].startTime && currentTime * 1000 < line.words[line.words.length - 1].endTime) {
                    let text = line.words.reduce((pre, cur, i) => {
                        if (i === line.words.length - 1)
                            return pre + cur.data;
                        return pre + cur.data + " "
                    }, "");
                    

                    let widthText = ctx.measureText(text).width;
                    xStartText = canvas.width / 2 - widthText / 2;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);


                    ctx.font = "50px ui-sans-serif";
                    ctx.strokeStyle = "transparent";

                    ctx.save();
                    ctx.beginPath();
                    ctx.fillStyle = "lightblue";
                    ctx.textAlign = "center";
                    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
                    ctx.stroke();
                    ctx.restore();

                    ctx.save();
                    ctx.fillStyle = "yellow";
                    ctx.beginPath();
                    ctx.clearRect(xStartText, 0, widthTextForTime, canvas.height);
                    ctx.rect(xStartText, 0, widthTextForTime, canvas.height);
                    ctx.clip();
                    ctx.textAlign = "center";
                    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
                    ctx.stroke();
                    ctx.restore();


                }
            })

            idAnimation = requestAnimationFrame(animate);
        }
        animate();
        return () => {
            cancelAnimationFrame(idAnimation);
        }
    }, [dataKara])

    return (
        <div>
            <canvas id="canvasKara"  height="200" ></canvas>
        </div>
    );
}

export default Karaoke;