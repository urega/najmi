class RadioButton extends Phaser.GameObjects.Container {
  constructor(scene, x, y, data, onClick) {
    super(scene, x, y);
    scene.add.existing(this);

    this.data = data;
    this.index = data.index;
    this.isOn = false;

    // Membuat background dan label
    this.bg = scene.add.image(0, 0, "content", "rdb_0001.png").setScale(0.8);
    this.bg.setInteractive({ cursor: "pointer" });

    this.label = scene.add
      .text(0, 0, data.label, {
        fontFamily: "conduit",
        fontSize: 24,
        color: "#000000",
      })
      .setOrigin(0, 0.5);

    // Menambahkan elemen ke container
    this.add(this.bg);
    this.add(this.label);

    const boxSize = { w: 42, h: 42 };
    this.width = boxSize.w + 15 + this.label.width;
    this.height = boxSize.h;
    this.setSize(this.width, this.height);

    this.bg.setPosition(-this.width / 2 + boxSize.w / 2, 0);
    this.label.setPosition(-this.width / 2 + boxSize.w / 2 + 30, 0);

    this.x = x + this.width / 2;
    this.y = y + this.height / 2;

    // Menambahkan efek hover
    this.bg.on("pointerover", () => this.bg.setTint(0xdddddd));
    this.bg.on("pointerout", () => this.bg.clearTint());

    // Menambahkan event click
    this.bg.on("pointerdown", () => {
      this.scene.sound.add("pop").play();
      this.toggle();
      if (onClick) {
        onClick(this.data); // Panggil callback dengan data radio button
      }
    });
  }

  setEnable(value) {
    this.bg.setInteractive(value ? { cursor: "pointer" } : false);
  }

  setIsOn(value) {
    this.isOn = value;
    this.update();
  }

  toggle() {
    if (!this.isOn) {
      this.setIsOn(true);
    }
  }

  update() {
    this.bg.setTexture("content", this.isOn ? "rdb_0002.png" : "rdb_0001.png");
    this.bg.setInteractive(!this.isOn ? { cursor: "pointer" } : false);
  }
}

export default RadioButton;

// this.rdbData = [
//       { value: 1, label: "Batang" },
//       { value: 2, label: "Polihedral" },
//       { value: 3, label: "Hurup T" },
//       { value: 4, label: "Bulat" },
//     ];

//     this.rdbGroup = new RdbGroup(
//       this,
//       360,
//       560,
//       this.rdbData,
//       { dir: "horizontal", space: 30 },
//       this.rdbSelect.bind(this)
//     );
//   }

// rdbSelect(data) {

//   }
