class Line extends Phaser.GameObjects.Container {
    constructor(scene, x, y, color, lineWidth, arrow) {
        super(scene, x, y);
        scene.add.existing(this);
        this.isArrowShow = arrow
        this.color = color
        this.add(this.g = scene.add.graphics(0, 0))
        this.g.setDefaultStyles({
            lineStyle: {
                width: lineWidth,
                color: this.color,
                alpha: 1
            }
        });
        this.g.lineBetween(0, 0, 100, 100);
        if (this.isArrowShow === true) {
            this.add(this.arrow = new Arrow(scene, {}, color, lineWidth))
        }
        // if (this.isArrowShow === true) {
        //     this.add(this.arrow = scene.add.image(0, 0, "ui", "edge_arrow.png").setOrigin(1, 0.5))
        // }
    }
    update(w, h) {
        this.g.clear()
        this.g.lineBetween(0, 0, w, -h);

        if (this.isArrowShow === true) {
            this.arrow.tint = this.color
            this.arrow.setPosition(w, -h)
            const angle = Math.atan2(h, w) * 180 / Math.PI;
            this.arrow.setAngle(-angle)
        }
    }
}

export default Line;

class Arrow extends Phaser.GameObjects.Graphics {
    constructor(scene, options, color, lineWidth) {
        super(scene, options);
        scene.add.existing(this);
        this.setDefaultStyles({
            lineStyle: {
                width: lineWidth,
                color: color,
                alpha: 1
            }
        });
        this.lineBetween(0, 1, -20, -12);
        this.lineBetween(0, -1, -20, 12);
    }
}