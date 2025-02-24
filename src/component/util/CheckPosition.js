import Drag from "phaser3-rex-plugins/plugins/drag";
class CheckPosition extends Phaser.GameObjects.Container {
  constructor(scene, target) {
    super(scene);
    scene.add.existing(this);

    var drag = new Drag(target, {});
    target.on(
      "dragend",
      function (pointer, dragX, dragY, dropped) {
        console.log(target.x, target.y);
      },
      this
    );
  }
}
export default CheckPosition;
