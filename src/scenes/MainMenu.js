import { Scene } from "phaser";
import FullscreenButton from "../component/ui/FullscreenButton";
import CustomButton from "../component/ui/CustomButton";
// import VolumeControl from "../component/ui/VolumeControl ";

export class MainMenu extends Scene {
  constructor() {
    super("MainMenu");
  }
  preload() {}

  create() {
    this.add.image(640, 360, "BgGame");
    this.add.image(640, 360, "mainMenu");
    new FullscreenButton(this, 61.05, 666, "fullScreen");
    this.add.image(95, 666, "sfxIcon3").setScale(0.5);

    // let audioList = this.sound.getAll();

    // new VolumeControl(this, 120, 666, audioList);

    // Fungsi untuk tombol Vlab
    function onVlabButtonClick(buttonImage) {
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

    // Membuat tombol Vlab
    let vlabButton = new CustomButton(
      this,
      688,
      484.9,
      "content",
      "btnStart.png",
      onVlabButtonClick
    );

    // this.add.image(640, 300, "logo");

    // this.add
    //   .text(640, 460, "Main Menu", {
    //     fontFamily: "Arial Black",
    //     fontSize: 38,
    //     color: "#ffffff",
    //     stroke: "#000000",
    //     strokeThickness: 8,
    //     align: "center",
    //   })
    //   .setOrigin(0.5);

    // this.input.once("pointerdown", () => {
    //   this.scene.start("Game");
    // });
  }
}
