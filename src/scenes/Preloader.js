import { Scene } from "phaser";
import LoadingPanel from "../component/ui/LoadingPanel";
import FontFaceObserver from "fontfaceobserver";
// import WebFontLoader from "phaser3-rex-plugins/plugins/webfontloader.js";

export class Preloader extends Scene {
  constructor() {
    super("Preloader");
  }

  init() {
    //  We loaded this image in our Boot Scene, so we can display it here
    // this.add.image(640, 360, "background");
    //  A simple progress bar. This is the outline of the bar.
    // this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);
    // //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
    // const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);
    // //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
    // this.load.on("progress", (progress) => {
    //   //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
    //   bar.width = 4 + 460 * progress;
    // });
  }

  preload() {
    new LoadingPanel(
      this,
      this.cameras.main.width / 2,
      this.cameras.main.height / 2
    );

    this.load.setPath("assets");

    // memuat font
    const font1 = new FontFaceObserver("conduit");
    const font2 = new FontFaceObserver("arialrb");

    // font.load();
    Promise.all([font1.load(), font2.load()]);

    this.load.image("bg", "textures/bg.png");
    this.load.image("shade", "textures/shade.png");

    this.load.atlas("pack", "textures/pack.png", "textures/pack.json");
    this.load.multiatlas("content", "textures/content.json", "assets/textures");
    this.load.multiatlas("ui", "textures/ui.json", "assets/textures");
    this.load.multiatlas("grayUI", "textures/grayUI.json", "assets/textures");
    this.load.multiatlas(
      "anim_wrong",
      "textures/anim_wrong.json",
      "assets/textures"
    );
    this.load.multiatlas(
      "anim_true",
      "textures/anim_true.json",
      "assets/textures"
    );

    // Load semua audio dan simpan dalam array
    this.load.audio("pop", ["sfx/pop.mp3"]);
    this.load.audio("click", ["sfx/click.wav"]);
    this.load.audio("true", ["sfx/true.wav"]);
    this.load.audio("false", ["sfx/false.wav"]);
  }

  create() {
    // Pindah ke scene berikutnya
    this.scene.start("Game");
    // this.scene.start("MainMenu");
  }
}
