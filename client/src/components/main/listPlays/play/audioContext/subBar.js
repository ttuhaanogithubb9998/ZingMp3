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
        

        context.strokeStyle = this.color;
        context.save();
        
        context.beginPath();
        console.log(this.height)
        context.fillStyle = this.color;
        context.lineJoin = 'round';
        context.fillRect(this.y, this.y +100, this.height , this.height)
        context.fill()
        context.stroke();

        context.restore();
    }
    update(height, volume) {
        // console.log(volume);
        if (height * 100 > this.height) {
            this.height = height * 100;
        } else {
            this.height -= this.height * 0.03
        }

        if (volume  > this.volume) {
            this.volume = volume 
        } else {
            this.volume -= this.volume * 0.06
        }
    }
}

export default Bar;