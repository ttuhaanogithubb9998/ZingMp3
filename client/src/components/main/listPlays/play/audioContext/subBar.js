class Bar {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw(context, fftSize) {


        context.strokeStyle = this.color;
        context.save();

        context.beginPath();
        context.fillStyle = this.color;
        context.lineJoin = 'round';
        // if (this.y > 10)
        // context.fillRect(this.y * 2, this.y * 2, 200 / this.y + this.height, 200 / this.y + this.height)
        context.lineWidth = 0.6
        context.rect(this.y + 8 * this.y, this.x, 5, -this.height * 0.4 - 0.5)

        // context.fill()
        context.stroke();

        context.restore();
    }
    update(height) {
        // if (height * 100 > this.height) {
        //     this.height = height * 100;
        // } else {
        //     this.height -= this.height * 0.06
        // }

        if (height * 100 > 0)
            this.height = height * 100;
        else
            this.height = 0

    }
}

export default Bar;