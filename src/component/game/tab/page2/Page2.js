import CustomButton from "../../../ui/CustomButton";
import CheckPosition from "../../../util/CheckPosition";
import Item from "../../Item";

class Page2 extends Phaser.GameObjects.Container {
  constructor(scene, x, y, list, onClick) {
    super(scene, x, y);
    scene.add.existing(this);

    this.add(
      scene.add.text(220, 40, "Jaring-Jaring \nMakanan", {
        fontFamily: "conduit",
        fontSize: 22,
        color: "#ffffff",
      })
    );

    this.add(
      (this.textBox = scene.add.image(1050, 660, "textBox")).setScale(0.85)
    ); //992

    this.add((this.item = new Item(scene, 0, 0)));

    this.add(
      scene.add.text(600, 670, "Rumput", {
        fontFamily: "conduit",
        fontSize: 20,
        color: "#000000",
      })
    );
    this.add(
      scene.add.text(950, 580, "Belalang", {
        fontFamily: "conduit",
        fontSize: 20,
        color: "#000000",
      })
    );
    this.add(
      scene.add.text(1086, 370, "Laba-laba", {
        fontFamily: "conduit",
        fontSize: 20,
        color: "#000000",
      })
    );
    this.add(
      scene.add.text(1100, 221, "Ular", {
        fontFamily: "conduit",
        fontSize: 20,
        color: "#000000",
      })
    );
    this.add(
      scene.add.text(210, 532, "Kelinci", {
        fontFamily: "conduit",
        fontSize: 20,
        color: "#000000",
      })
    );
    this.add(
      scene.add.text(495, 150, "Elang", {
        fontFamily: "conduit",
        fontSize: 20,
        color: "#000000",
      })
    );
    this.add(
      scene.add.text(185, 174, "Rubah", {
        fontFamily: "conduit",
        fontSize: 20,
        color: "#000000",
      })
    );
    this.add(
      scene.add.text(743, 578, "Biji-bijian", {
        fontFamily: "conduit",
        fontSize: 20,
        color: "#000000",
      })
    );
    this.add(
      scene.add.text(580, 510, "      Burung \nPemakan biji", {
        fontFamily: "conduit",
        fontSize: 20,
        color: "#000000",
      })
    );
    this.add(
      scene.add.text(490, 360, "            Burung \nPemakan Serangga", {
        fontFamily: "conduit",
        fontSize: 20,
        color: "#000000",
      })
    );
    this.add(
      scene.add.text(390, 534, "Tikus", {
        fontFamily: "conduit",
        fontSize: 20,
        color: "#000000",
      })
    );

    // Fungsi untuk tombol Vlab
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

          this.tabContent.list[1].resetUi();
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

    // new CheckPosition(scene, this.textBox);
  }

  init() {
    this.item.g.clear();
    this.item.removeTriangle();
  }

  resetUi() {
    this.item.g.clear();
    this.item.removeTriangle();
  }
}

export default Page2;
