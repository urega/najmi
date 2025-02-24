import { Scene } from "phaser";
import FullscreenButton from "../component/ui/FullscreenButton";
import CustomButton from "../component/ui/CustomButton";

export class GameOver extends Scene {
  constructor() {
    super("GameOver");
  }

  create() {
    // this.cameras.main.setBackgroundColor(0xff0000);

    this.add.image(640, 360, "BgGame");
    this.add.image(640, 360, "mainMenu");
    this.bgOver = this.add.image(640, 360, "gameOver");

    new FullscreenButton(this, 61.05, 666, "fullScreen");

    this.sound.add("2").play();

    // Fungsi untuk tombol Restart
    function onRestartButtonClick(buttonImage) {
      this.tw = this.tweens.add({
        targets: buttonImage,
        scale: { from: 1.02, to: 1 },
        ease: "linear",
        duration: 100,
        repeat: 0,
        yoyo: false,
      });
      this.tw.on(
        "complete",
        function (tween, targets) {
          this.sound.add("pop").play();
          this.scene.start("Game");
        },
        this
      );
    }

    // Membuat tombol Restart
    let RestartButton = new CustomButton(
      this,
      507.95,
      489.45,
      "content",
      "btnRestart.png",
      onRestartButtonClick
    );

    //  Fungsi untuk tombol Over
    function onOverButtonClick(buttonImage) {
      this.tw = this.tweens.add({
        targets: buttonImage,
        scale: { from: 1.02, to: 1 },
        ease: "linear",
        duration: 100,
        repeat: 0,
        yoyo: false,
      });
      this.tw.on(
        "complete",
        function (tween, targets) {
          this.sound.add("pop").play();
          this.scene.start("MainMenu");
        },
        this
      );
    }

    // Membuat tombol Over
    let OverButton = new CustomButton(
      this,
      772.4,
      489.45,
      "content",
      "btnEnd.png",
      onOverButtonClick
    );

    // this.add
    //   .text(512, 384, "Game Over", {
    //     fontFamily: "Arial Black",
    //     fontSize: 64,
    //     color: "#ffffff",
    //     stroke: "#000000",
    //     strokeThickness: 8,
    //     align: "center",
    //   })
    //   .setOrigin(0.5);

    // this.input.once("pointerdown", () => {
    //   this.scene.start("MainMenu");
    // });
  }
}
