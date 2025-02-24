import Page1 from "../component/game/tab/page1/Page1";
import Page2 from "../component/game/tab/page2/Page2";
import Steper from "../component/ui/Steper";
import Tab from "../component/ui/Tab";
import Drag from "phaser3-rex-plugins/plugins/drag";
import Button from "phaser3-rex-plugins/plugins/button";
import FullscreenButton from "../component/ui/FullscreenButton";

class TabScene extends Phaser.Scene {
  constructor() {
    super("TabScene");
  }

  preload() {}

  create() {
    this.add.image(0, 0, "bg").setOrigin(0);

    new FullscreenButton(this, 55, 680);

    this.tabContent = this.add.container(0, 0, [
      new Page1(this, -620, 0),
      new Page2(this, -620, 0),
    ]);
    this.tab = new Tab(
      this,
      620,
      -4,
      160,
      ["Rantai \nMakanan", "Jaring-jaring \nMakanan"],
      this.tabContent,
      this.tabSelect
    );
  }
  tabSelect(index) {
    this.content.list[1].resetUi();
  }
}

export default TabScene;
