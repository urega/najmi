class Reward extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);
    scene.add.existing(this);
    this.setVisible(false);

    scene.anims.create({
      key: "star_0",
      frames: scene.anims.generateFrameNames("star_pack", {
        prefix: "anim_star_",
        start: 1,
        end: 1,
        suffix: ".png",
        zeroPad: 4,
      }),
      repeat: 0,
    });
    scene.anims.create({
      key: "star_1",
      frames: scene.anims.generateFrameNames("star_pack", {
        prefix: "anim_star_",
        start: 1,
        end: 6,
        suffix: ".png",
        zeroPad: 4,
      }),
      repeat: 0,
    });
    scene.anims.create({
      key: "star_2",
      frames: scene.anims.generateFrameNames("star_pack", {
        prefix: "anim_star_",
        start: 1,
        end: 13,
        suffix: ".png",
        zeroPad: 4,
      }),
      repeat: 0,
    });
    scene.anims.create({
      key: "star_3",
      frames: scene.anims.generateFrameNames("star_pack", {
        prefix: "anim_star_",
        start: 1,
        end: 21,
        suffix: ".png",
        zeroPad: 4,
      }),
      repeat: 0,
    });

    this.starAnimation = scene.add.sprite(0, 0).setOrigin(0.5);
    this.add(this.starAnimation);
  }

  showMenu(score) {
    this.setVisible(true);

    let animKey = "star_0";
    if (score === 2) animKey = "star_1";
    else if (score === 3 || score === 4) animKey = "star_2";
    else if (score === 5) animKey = "star_3";

    this.starAnimation.play(animKey);
  }

  hideMenu() {
    this.setVisible(false);
  }
}

export default Reward;
