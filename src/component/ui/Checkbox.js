class Checkbox extends Phaser.GameObjects.Container {
  constructor(scene, x, y, label, onClick) {
    super(scene, x, y);
    scene.add.existing(this);
    this.onClick = onClick;
    this.isOn = false;

    // Menambahkan background checkbox
    this.bg = scene.add.image(0, 0, "pack", "checkbox_0001.png");
    this.add(this.bg);

    // Menambahkan teks label
    this.label = scene.add
      .text(0, 0, label, {
        fontFamily: "conduit",
        fontSize: 20,
        color: "#000000",
      })
      .setOrigin(0, 0.5);
    this.add(this.label);

    // Set ukuran checkbox dan label
    const boxSize = { w: 42, h: 42 };
    this.width = boxSize.w + 15 + this.label.width;
    this.height = boxSize.h;
    this.setSize(this.width, this.height);
    this.bg.x = -this.width / 2 + boxSize.w / 2;
    this.label.x = -this.width / 2 + boxSize.w / 2 + 30;
    this.x = x + this.width / 2;
    this.y = y + this.height / 2;

    // Menambahkan interaktivitas
    this.bg.setInteractive({ cursor: "pointer" });

    // Menambahkan efek pointer hover
    this.bg.on("pointerover", () => {
      this.bg.setTint(0xdddddd); // Memberikan tint saat hover
    });

    // Menghapus efek saat pointer keluar
    this.bg.on("pointerout", () => {
      this.bg.clearTint(); // Menghapus tint saat pointer keluar
    });

    // Menambahkan tombol dengan plugin rexButton
    this.button = scene.plugins.get("rexButton").add(this.bg, {});

    // Event click
    this.button.on(
      "click",
      (button, gameObject, pointer, event) => {
        this.scene.sound.add("pop").play();
        this.isOn = !this.isOn;
        this.update(); // Memperbarui tampilan berdasarkan status
        if (this.onClick) {
          this.onClick(this.isOn);
        }
      },
      this
    );

    // Event saat tombol di-enable
    this.button.on(
      "enable",
      () => {
        this.bg.setTexture(
          "pack",
          this.isOn ? "checkbox_0002.png" : "checkbox_0001.png"
        );
      },
      this
    );

    // Event saat tombol di-disable
    this.button.on(
      "disable",
      () => {
        this.bg.setTexture(
          "pack",
          this.isOn ? "checkbox_0004.png" : "checkbox_0003.png"
        );
      },
      this
    );

    this.update(); // Inisialisasi update pertama kali
  }

  setEnable(value) {
    this.button.setEnable(value);
  }

  setIsOn(value) {
    this.isOn = value;
    this.update();

    if (this.onClick) {
      this.onClick(this.isOn);
    }
  }

  update() {
    this.bg.setTexture(
      "pack",
      this.isOn ? "checkbox_0002.png" : "checkbox_0001.png"
    );
  }
}

export default Checkbox;

// this.cb = new Checkbox(this, 0, 350, "Show Text", this.cbClick);
