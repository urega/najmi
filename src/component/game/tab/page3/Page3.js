class Page3 extends Phaser.GameObjects.Container {
  constructor(scene, x, y, list, onClick) {
    super(scene, x, y);
    scene.add.existing(this);
    this.add(
      scene.add.text(0, 0, "Page 3", {
        fontFamily: "roboto_bold",
        fontSize: 22,
        color: "#ff0000",
      })
    );
  }

  init() {}
}

export default Page3;
