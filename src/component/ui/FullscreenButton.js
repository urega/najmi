class FullscreenButton extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);
    scene.add.existing(this);

    // Tombol fullscreen (gambar)
    this.fullscreenImg = scene.add
      .image(0, 0, "pack", "fs_0001.png")
      .setInteractive({ cursor: "pointer" })
      .setScale(0.7) // Sesuaikan ukuran jika perlu
      .setOrigin(0.5, 0.5);
    this.add(this.fullscreenImg);

    // Event saat pointer hover
    this.fullscreenImg.on("pointerover", () => {
      this.fullscreenImg.setTint(0xdddddd); // Memberi tint gelap saat hover
    });

    // Event saat pointer keluar
    this.fullscreenImg.on("pointerout", () => {
      this.fullscreenImg.clearTint(); // Menghapus tint saat kursor keluar
    });

    // Event saat tombol dilepas (pointerup)
    this.fullscreenImg.on("pointerup", () => {
      scene.sound.add("pop").play();
      if (scene.scale.isFullscreen) {
        scene.scale.stopFullscreen();
        this.fullscreenImg.setTexture("pack", "fs_0001.png"); // Ganti dengan tekstur normal
      } else {
        scene.scale.startFullscreen();
        this.fullscreenImg.setTexture("pack", "fs_0002.png"); // Ganti tekstur jika dibutuhkan
      }
    });

    // Set posisi tombol di scene
    this.setPosition(x, y);
  }
}

export default FullscreenButton;
