import Drag from "phaser3-rex-plugins/plugins/drag"

class DragImg extends Phaser.GameObjects.Container {
    constructor(scene, x, y, value) {
        super(scene, x, y)
        scene.add.existing(this)
        // console.log(value)
        this.value = value
        this.indexDrop = null
        this.initX = x
        this.initY = y
        this.isInTarget = false

        this.add(this.img = scene.add.image(0, 0, "item", "btn2.png"))
        this.setSize(this.img.width, this.img.height)
        this.add(this.text = scene.add.text(
            0, 0,
            value,
            {
                fontFamily: "blogger-bold",
                fontSize: 50,
                color: "#ffffff",
            }
        ).setOrigin(0.5))


        this.drag = new Drag(this, { enable: true })
        // this.drag.setEnable(false)
        this.on('dragstart', function (pointer, dragX, dragY) {
            // console.log(this.parentContainer)
            this.parentContainer.bringToTop(this)
            if (this.isInTarget) {
                // var index = this.parentContainer.parentContainer.answer.indexOf(this.value)
                // this.parentContainer.parentContainer.answer[index] = null
                this.parentContainer.parentContainer.dropContainer.list[this.indexDrop].isLock = false
                this.parentContainer.parentContainer.dropContainer.list[this.indexDrop].value = null

            }
        });
        // gameObject.on('drag', function(pointer, dragX, dragY){ /*...*/ });
        this.on('dragend', function (pointer, dragX, dragY, dropped) {
            var target = null
            var drops = this.parentContainer.parentContainer.dropContainer.list
            // console.log(this.parentContainer)
            // console.log(drops)
            var answer = this.parentContainer.parentContainer.answer
            for (let i = 0; i < drops.length; i++) {
                var distX = Phaser.Math.Distance.Between(
                    this.x, 0,
                    drops[i].x, 0
                )
                var distY = Phaser.Math.Distance.Between(
                    0, this.y,
                    0, drops[i].y
                )
                // console.log(dist)
                if (distX <= 50 && distY <= 30) {
                    target = drops[i]
                }
            }
            // console.log(target)
            // console.log(target.value)
            if (target != null && !target.isLock) {
                this.setPosition(target.x, target.y)
                this.indexDrop = target.index
                this.isInTarget = true
                target.isLock = true
                target.value = this.value
                // console.log(answer)
            } else {
                this.setPosition(this.initX, this.initY)
                this.isInTarget = false
                // console.log(this.indexDrop)
                if(this.indexDrop != null) {
                    if(drops[this.indexDrop].value != null) {
                        drops[this.indexDrop].isLock = false
                        drops[this.indexDrop].value = null
                    }
                }
                
            }
            // console.log(this.parentContainer.parentContainer.getAnswer())


        });

    }
}

export default DragImg;