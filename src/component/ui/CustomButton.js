class CustomButton extends Phaser.GameObjects.Container {
  constructor(scene, x, y, textureKey, frame, onClickCallback) {
    super(scene, x, y);
    scene.add.existing(this);

    // Membuat gambar tombol
    this.buttonImage = scene.add
      .image(0, 0, textureKey, frame)
      .setInteractive({ cursor: "pointer" })
      .setScale(1);
    this.add(this.buttonImage);

    // Event saat pointer hover
    this.buttonImage.on("pointerover", () => {
      this.buttonImage.setTint(0xdddddd); // Memberi tint gelap saat hover
    });

    // Event saat pointer keluar
    this.buttonImage.on("pointerout", () => {
      this.buttonImage.clearTint(); // Menghapus tint saat kursor keluar
    });

    // Event saat tombol diklik
    this.buttonImage.on("pointerup", () => {
      if (onClickCallback) {
        onClickCallback.call(scene, this.buttonImage);
      }
    });

    // Set posisi tombol di scene
    this.setPosition(x, y);
  }
}

export default CustomButton;

// Fungsi untuk tombol Vlab
// function onVlabButtonClick(buttonImage) {
//   this.tw = this.tweens.add({
//     targets: buttonImage,
//     scale: { from: 1.02, to: 1 },
//     ease: "linear",
//     duration: 100,
//     repeat: 0,
//     yoyo: false,
//   });
//   this.tw.on(
//     "complete",
//     function (tween, targets) {
//       this.sound.add("pop").play();
//       this.scene.start("GameScene");
//     },
//     this
//   );
// }

// // Membuat tombol Vlab
// var vlabButton = new CustomButton(this, 786, 464, "cover", "BtnVlab1.png", onVlabButtonClick);
