import { Scene } from "phaser";

export class Boot extends Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    // this.load.setPath("assets");
    //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
    //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.
    // this.load.image("background", "assets/textures/bg.png");
    // this.load.atlas("content", "textures/content.png", "textures/content.json");
  }

  create() {
    this.scene.start("Preloader");
  }
}
