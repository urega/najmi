import Drag from "phaser3-rex-plugins/plugins/drag";
import CustomButton from "../../../ui/CustomButton";
import CheckPosition from "../../../util/CheckPosition";
import DragImage from "./DragImage";
import { forEach } from "lodash";

class Page1 extends Phaser.GameObjects.Container {
  constructor(scene, x, y, list, onClick) {
    super(scene, x, y);
    scene.add.existing(this);

    this.add(
      scene.add.text(220, 40, "Rantai \nMakanan", {
        fontFamily: "conduit",
        fontSize: 22,
        color: "#ffffff",
      })
    );

    this.add((this.bgImg = scene.add.image(0, 10, "panel").setOrigin(0)));

    let offsetX = 195;

    // Menyimpan item dalam array untuk memudahkan akses
    this.add((this.items = scene.add.container()));
    for (let i = 1; i < 7; i++) {
      this.add(
        (this.img = new DragImage(
          scene,
          -50 + offsetX * i,
          620,
          "item",
          "item_000" + i + ".png",
          i,
          this.items
        ))
      );

      // Menambahkan item ke array dan membuatnya dapat di-drag
      this.items.add(this.img);
    }

    // // Fungsi untuk tombol Vlab
    function onVlabButtonClick(buttonImage) {
      this.tw = this.tweens.add({
        targets: buttonImage,
        scale: { from: 0.58, to: 0.56 },
        ease: "linear",
        duration: 100,
        repeat: 0,
        yoyo: false,
      });
      this.tw.on(
        "complete",
        function (tween, targets) {
          this.sound.add("pop").play();

          // console.log(this.tabContent.list);

          this.tabContent.list[0].resetUi();
        },
        this
      );
    }

    // Membuat tombol Vlab
    this.add(
      new CustomButton(
        scene,
        110,
        685,
        "ui",
        "image_button_0006.png",
        onVlabButtonClick
      )
    );
  }

  resetUi() {
    this.items.list.forEach((item) => {
      item.resetPosition();
    });
  }

  init() {
    this.items.list.forEach((item) => {
      item.resetPosition();
    });
  }
}

export default Page1;
