import Drag from "phaser3-rex-plugins/plugins/drag";

class DragImage extends Phaser.GameObjects.Image {
  constructor(scene, x, y, texture, frame, i, parent) {
    super(scene, x, y, texture, frame);
    scene.add.existing(this);
    this.index = i - 1;
    this.initX = this.x;
    this.initY = this.y;

    // Posisi drop yang sesuai
    const dropPositions = [
      { x: 157.46, y: 403.3 },
      { x: 364.8, y: 157.5 },
      { x: 1006.9, y: 123 },
      { x: 1121.8, y: 322.5 },
      { x: 1073.5, y: 506.6 },
      { x: 297.3, y: 529 },
    ];

    // fungsi drag
    this.drag = new Drag(this, {});

    this.on(
      "dragstart",
      function (pointer, dragX, dragY, e) {
        this.setTint(0xcccccc); // Memberi efek saat mulai di-drag
        parent.bringToTop(this);
      },
      this
    );

    this.on("dragend", function (pointer, dragX, dragY, dropped) {
      this.clearTint(); // Menghilangkan efek tint saat dilepas

      let indexTarget = null;
      for (let i = 0; i < dropPositions.length; i++) {
        let dist = Phaser.Math.Distance.Between(
          this.x,
          this.y,
          dropPositions[i].x,
          dropPositions[i].y
        );
        if (dist < 50) {
          indexTarget = i;
          break;
        }
      }
      if (indexTarget != null && this.index == indexTarget) {
        // Jika posisi drop sesuai, letakkan di posisi drop
        // console.log('masuk')
        this.x = dropPositions[indexTarget].x;
        this.y = dropPositions[indexTarget].y;
        this.drag.setEnable(false);
      } else {
        // Jika tidak sesuai, kembalikan ke posisi semula
        this.x = this.initX;
        this.y = this.initY;
      }
    });
  }
  resetPosition() {
    this.x = this.initX;
    this.y = this.initY;
    this.drag.setEnable(true);
  }
}

export default DragImage;
