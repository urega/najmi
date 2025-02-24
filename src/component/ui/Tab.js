import Grid from "./Grid";

class Tab extends Phaser.GameObjects.Container {
  constructor(scene, x, y, w, list, content, onClick) {
    super(scene, x, y);
    scene.add.existing(this);
    this.index = 0;
    this.onClick = onClick;
    this.content = content;
    this.add(
      (this.grid = new Grid(scene, 200, 35, {
        dir: "horizontal",
        space: 10,
        align: "center",
      }))
    );
    list.map((item, index) => {
      this.grid.add(new TabItem(scene, 0, 0, w, index, item, this.tabClick));
    });
    this.grid.update();
    this.add(this.content);
    this.content.setPosition(0, 0);
    this.updateUI();
  }

  setIndex(val) {
    this.index = val;
    this.updateUI();
    if (this.onClick) {
      this.onClick(this.index);
    }
  }

  tabClick(index) {
    const parent = this.parentContainer.parentContainer;
    parent.setIndex(index);
  }

  updateUI() {
    this.grid.each((item) => {
      if (this.index === item.index) {
        item.button.setEnable(false);
      } else {
        item.button.setEnable(true);
      }
    });
    for (let i = 0; i < this.content.list.length; i++) {
      if (this.index === i) {
        this.content.list[i].setVisible(true);
        this.content.list[i].init();
      } else {
        this.content.list[i].setVisible(false);
      }
    }
  }
}

export default Tab;

class TabItem extends Phaser.GameObjects.Container {
  constructor(scene, x, y, w, index, text, onClick) {
    super(scene, x, y);
    scene.add.existing(this);
    this.index = index;
    this.onClick = onClick;

    // Membuat background berbentuk persegi panjang bulat
    this.add(
      (this.bg = scene.add.rexRoundRectangleCanvas(
        0,
        0,
        w,
        60,
        {
          tl: 0,
          tr: 0,
          bl: 20,
          br: 20,
        },
        0x00cccc
      ))
    );

    // Set warna dan garis default
    this.bg.setFillStyle(0xc2c2c2);
    this.bg.setStrokeStyle(0xffffff, 2);

    // Menambahkan text ke dalam TabItem
    this.add(
      (this.text = scene.add.text(0, 0, text, {
        fontFamily: "conduit",
        fontSize: 20,
        color: "#000000",
        align: "center",
      }))
    );
    this.text.setFixedSize(w, 76).setPadding(0, 15, 0, 0);
    this.setSize(w, 76);
    this.text.x = -this.width / 2;
    this.text.y = -this.height / 2;
    this.x = x + this.width / 2;
    this.y = y + this.height / 2;

    // Mengatur interaktivitas secara manual untuk this.bg
    this.bg.setInteractive({ useHandCursor: true }); // Gunakan hand cursor

    // Event saat pointer hover
    this.bg.on("pointerover", () => {
      this.bg.setTint(0xdddddd); // Memberi tint gelap saat hover
    });

    // Event saat pointer keluar
    this.bg.on("pointerout", () => {
      this.bg.clearTint(); // Menghapus tint saat pointer keluar
    });

    // Tambahkan event click ke this.bg
    this.bg.on("pointerdown", () => {
      this.scene.sound.add("pop").play();
      if (this.onClick) {
        this.onClick(index);
      }
    });

    // Menggunakan rexButton hanya untuk mengelola enable/disable
    this.button = scene.plugins.get("rexButton").add(this, {});

    this.button.on(
      "enable",
      (button, gameObject) => {
        this.bg.setFillStyle(0xc2c2c2); // Warna aktif
        this.bg.setStrokeStyle(0xffffff, 2); // Garis aktif
        // this.bg.setInteractive({ useHandCursor: true }); // Pastikan interaktivitas aktif
      },
      this
    );

    this.button.on(
      "disable",
      (button, gameObject) => {
        this.bg.setFillStyle(0xeeeeee); // Warna nonaktif
        this.bg.setStrokeStyle(0xffffff, 2); // Garis nonaktif
        // this.bg.disableInteractive(); // Nonaktifkan interaktivitas
      },
      this
    );
  }
}
