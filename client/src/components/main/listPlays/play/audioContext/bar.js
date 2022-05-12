class Bar {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.volume = 0;
    }

    draw(context, fftSize) {
        // context.strokeStyle = this.color;
        // context.save();
        // context.rotate(this.y*0.03)
        // context.beginPath();
        // context.moveTo(this.x+100,this.y);
        // context.lineTo(this.y,this.height)
        // context.stroke();

        // context.restore();

        context.strokeStyle = this.color;
        context.save();
        context.lineWidth = 0.4

        context.rotate(this.y * 0.03);



        context.beginPath();
        context.moveTo(this.x, this.y);
        context.quadraticCurveTo((this.x+this.y)/2+this.y*0.5,0,this.y,this.y*0.6);
        // context.lineTo(this.y, this.y * 0.6);
        context.stroke();

        context.beginPath();
        context.lineWidth = this.y * 0.0036
        context.strokeRect(this.x, this.y, this.y / fftSize * 15, 1)
        context.lineWidth = this.y * 0.0036
        context.strokeRect(this.y, this.y * 0.6, this.height * this.y * 0.0082 + this.y * 2 / fftSize * 2 * 20, this.y / fftSize * 10)
        context.fill();
        context.stroke();

        context.beginPath();
        context.fillStyle = this.color
        context.lineWidth = 0;
        context.arc(this.y + this.height * this.y * 0.0082 + this.y * 2 / fftSize * 2 * 40, this.y * 0.6 + this.y / fftSize * 5, this.y / fftSize * 5, 0, Math.PI * 2)
        context.fill();
        context.stroke();


        context.restore();
    }
    update(height, volume) {
        // console.log(volume);
        if (height * 70 > this.height) {
            this.height = height * 70;
        } else {
            this.height -= this.height * 0.03
        }

        if (volume > this.volume) {
            this.volume = volume
        } else {
            this.volume -= this.volume * 0.06
        }
    }
}

export default Bar;