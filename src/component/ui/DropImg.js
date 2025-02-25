class DropImg extends Phaser.GameObjects.Container {
    constructor(scene, x, y, index) {
        super(scene, x, y)
        scene.add.existing(this)
        this.value = null
        this.index = index
        this.isLock = false
        this.add(this.img = scene.add.image(0, 0, "item", "btn1.png"))

    }
}

export default DropImg;