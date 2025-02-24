import Drag from "phaser3-rex-plugins/plugins/drag";
import Line from "../ui/Line";
import Button from "phaser3-rex-plugins/plugins/button";

class Item extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);
    scene.add.existing(this);

    this.createdTriangles = [];
    this.triangle2 = null;

    this.answer = {
      rumput: ["belalang", "tikus", "kelinci"],
      biji: ["bpb"],
      belalang: ["laba", "bps"],
      laba: ["ular", "bps"],
      bpb: ["ular", "elang", "rubah"],
      kelinci: ["elang", "rubah"],
      ular: ["elang"],
      bps: ["rubah", "elang"],
      tikus: ["ular", "elang", "rubah"],
      rubah: [""],
      elang: [""],
    };

    this.arrowData = {
      rumput_belalang: {
        x1: 715,
        y1: 637,
        x2: 854,
        y2: 603,
      },
      rumput_tikus: {
        x1: 529.73,
        y1: 577.8,
        x2: 447.6,
        y2: 531,
      },
      rumput_kelinci: {
        x1: 518,
        y1: 623,
        x2: 279,
        y2: 528,
      },
      biji_bpb: {
        x1: 749,
        y1: 534,
        x2: 675,
        y2: 496,
      },
      belalang_laba: {
        x1: 942,
        y1: 556.6,
        x2: 997,
        y2: 423.5,
      },
      belalang_bps: {
        x1: 910,
        y1: 565,
        x2: 642,
        y2: 365,
      },
      laba_ular: {
        x1: 1023,
        y1: 334,
        x2: 1032,
        y2: 273,
      },
      laba_bps: {
        x1: 964,
        y1: 359,
        x2: 633,
        y2: 318,
      },
      bpb_elang: {
        x1: 673,
        y1: 408,
        x2: 671,
        y2: 248,
      },
      bpb_rubah: {
        x1: 577,
        y1: 453,
        x2: 301,
        y2: 317,
      },
      bpb_ular: {
        x1: 710,
        y1: 407,
        x2: 947,
        y2: 272,
      },
      kelinci_elang: {
        x1: 277.7,
        y1: 433,
        x2: 546,
        y2: 201,
      },
      kelinci_rubah: {
        x1: 245,
        y1: 409,
        x2: 236,
        y2: 328,
      },
      bps_rubah: {
        x1: 525,
        y1: 289,
        x2: 323,
        y2: 273,
      },
      bps_elang: {
        x1: 585,
        y1: 276,
        x2: 596,
        y2: 234,
      },
      ular_elang: {
        x1: 950,
        y1: 203,
        x2: 723.7,
        y2: 178,
      },
      tikus_ular: {
        x1: 457,
        y1: 496,
        x2: 947,
        y2: 249,
      },
      tikus_elang: {
        x1: 409,
        y1: 467,
        x2: 548,
        y2: 231,
      },
      tikus_rubah: {
        x1: 382,
        y1: 470,
        x2: 274,
        y2: 328.6,
      },
    };

    this.add(
      (this.rumput = scene.add.image(623, 616, "content", "rumput.png"))
    );
    this.rumput.name = "rumput";

    this.add((this.biji = scene.add.image(770, 560, "content", "biji.png")));
    this.biji.name = "biji";

    this.add(
      (this.belalang = scene.add.image(907, 596, "content", "belalang.png"))
    );
    this.belalang.name = "belalang";

    this.add((this.bpb = scene.add.image(639, 474, "content", "bpb.png")));
    this.bpb.name = "bpb";

    this.add((this.bps = scene.add.image(580.6, 317, "content", "bps.png")));
    this.bps.name = "bps";

    this.add(
      (this.kelinci = scene.add.image(240, 480, "content", "kelinci.png"))
    );
    this.kelinci.name = "kelinci";

    this.add((this.laba = scene.add.image(1018, 381, "content", "laba.png")));
    this.laba.name = "laba";

    this.add((this.ular = scene.add.image(1020, 206, "content", "ular.png")));
    this.ular.name = "ular";

    this.add(
      (this.tikus = scene.add.image(409, 505.6, "content", "tikus.png"))
    );
    this.tikus.name = "tikus";

    this.add(
      (this.rubah = scene.add
        .image(230, 259, "content", "rubah.png")
        .setScale(1.5))
    );
    this.rubah.name = "rubah";

    this.add(
      (this.elang = scene.add
        .image(630, 160, "content", "elang.png")
        .setScale(0.8))
    );
    this.elang.name = "elang";

    this.g = scene.add.graphics(0, 0);
    this.g.setDefaultStyles({
      lineStyle: {
        width: 3,
        color: 0x000000,
        alpha: 1,
      },
      fillStyle: {
        color: 0x00cccc,
        alpha: 1,
      },
    });
    this.g2 = scene.add.graphics(0, 0);
    this.g2.setDefaultStyles({
      lineStyle: {
        width: 3,
        color: 0x000000,
        alpha: 0.5,
      },
      fillStyle: {
        color: 0x00cccc,
        alpha: 0.5,
      },
    });

    this.isDrag = false;
    this.target = null;

    // console.log(this);
    for (let i = 0; i < this.list.length; i++) {
      this.list[i]
        .setInteractive({
          draggable: true,
          dropZone: true,
        })
        .on(
          "pointerover",
          function () {
            // console.log(this.tabContent.list[1].item);
            this.pipelineInstance = scene.plugins
              .get("rexGlowFilterPipeline")
              .add(this.tabContent.list[1].item.list[i], {
                outerStrength: 5,
                innerStrength: 0,
                glowColor: 0xffff00,
                knockout: false,
              });
          },
          scene
        )

        .on(
          "pointerout",
          function () {
            // console.log("pointerout")
            if (!scene.tabContent.list[1].item.target) {
              scene.plugins
                .get("rexGlowFilterPipeline")
                .remove(this.tabContent.list[1].item.list[i]);

              this.tabContent.list[1].item.g2.clear();
              this.tabContent.list[1].item.removeShadowArrow();
            }
          },
          scene
        )

        .on(
          "pointerdown",
          function (pointer) {
            this.startX = this.list[i].x;
            this.startY = this.list[i].y;
            this.dragItem = this.list[i];
            this.isDrag = true;
            this.dragStartX = pointer.x;
            this.dragStartY = pointer.y;
            this.addShadowArrow(this.startX, this.startY);
            // console.log("pointerdown")
          },
          this
        )
        .on(
          "drag",
          function (pointer, dragX, dragY) {
            if (this.isDrag) {
              this.addShadowArrow(
                this.startX,
                this.startY,
                pointer.x,
                pointer.y
              );
              // console.log("drag")
            }
          },
          this
        );

      this.list[i].on(
        "drop",
        function (pointer, target) {
          this.removeShadowArrow();
          this.g2.clear();
          this.target = target;
          scene.tabContent.list[1].item.target = null;

          let name = this.list[i].name;
          let inputItem = this.answer[name];

          if (inputItem.includes(target.name) == true) {
            this.dataAr = this.arrowData[this.list[i].name + "_" + target.name];
            // console.log(this.dataAr)
            this.g.lineBetween(
              this.dataAr.x1,
              this.dataAr.y1,
              this.dataAr.x2,
              this.dataAr.y2
            );
            var angle =
              (-Math.atan(
                (this.dataAr.x2 - this.dataAr.x1) /
                  (this.dataAr.y2 - this.dataAr.y1)
              ) *
                180) /
              Math.PI;
            // console.log(angle)
            this.triangle = this.scene.add
              .triangle(
                this.dataAr.x2,
                this.dataAr.y2,
                12,
                -2,
                -1,
                20,
                24,
                20,
                "0x000000"
              )
              .setOrigin(0.5, 0)
              .setAngle(angle);

            if (this.triangle) {
              this.addTriangle(this.triangle); // Tambahkan segitiga ke dalam array
            }
          }
        },
        this
      );
    }
  }
  addShadowArrow(startX, startY, dragX, dragY) {
    if (this.isDrag && this.dragItem) {
      this.g2.clear();
      this.removeShadowArrow();
      this.g2.lineBetween(startX, startY, dragX, dragY);

      // Hitung sudut antara garis bayangan dan sumbu Y
      let angle = Phaser.Math.Angle.Between(startX, startY, dragX, dragY);
      // Hitung posisi ujung segitiga agar menghadap ke atas
      let endX = dragX + Math.cos(angle) * 10;
      let endY = dragY + Math.sin(angle) * 10;
      // Tambahkan segitiga ke ujung garis bayangan
      this.triangle2 = this.scene.add
        .triangle(endX, endY, 12, -2, -1, 20, 24, 20, "0x000000")
        .setOrigin(0.5, 0)
        .setRotation(angle + Math.PI / 2)
        .setFillStyle("0x000000", 0.5);
    }
  }
  removeShadowArrow() {
    if (this.triangle2) {
      this.triangle2.destroy();
      this.triangle2 = null;
    }
  }
  addTriangle(triangle) {
    this.createdTriangles.push(triangle);
  }

  removeTriangle() {
    for (let i = 0; i < this.createdTriangles.length; i++) {
      this.createdTriangles[i].destroy();
    }
    this.createdTriangles = []; // Menghapus semua referensi setelah menghancurkan segitiga
  }
}

export default Item;
