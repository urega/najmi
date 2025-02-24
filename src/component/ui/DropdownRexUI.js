class Dropdown extends Phaser.GameObjects.Container {
  constructor(scene, x, y, options, callback) {
    super(scene, x, y);
    this.scene = scene;
    this.selectedOption = null;

    // Buat background round rectangle untuk dropdown
    this.buttonBackground = this.scene.rexUI.add
      .roundRectangle(0, 0, 260, 50, 10, 0xffffff)
      .setStrokeStyle(1, 0x000000)
      .setInteractive();

    // Tambahkan hover dan pointer ke buttonBackground
    this.buttonBackground.on("pointerover", () => {
      this.buttonBackground.setFillStyle(0xeeeeee);
      this.scene.input.setDefaultCursor("pointer");
    });

    this.buttonBackground.on("pointerout", () => {
      this.buttonBackground.setFillStyle(0xffffff);
      this.scene.input.setDefaultCursor("default");
    });

    // Buat teks di button (buttonText)
    this.buttonText = this.scene.add
      .text(-95, -10, "Garis Wallace", {
        fontSize: "20px",
        fontFamily: "conduit",
        color: "#000",
      })
      .setInteractive();

    // Tambahkan hover dan pointer ke buttonText
    this.buttonText.on("pointerover", () => {
      this.buttonBackground.setFillStyle(0xeeeeee); // hover abu-abu
      this.scene.input.setDefaultCursor("pointer"); // ubah kursor
    });

    this.buttonText.on("pointerout", () => {
      this.buttonBackground.setFillStyle(0xffffff);
      this.scene.input.setDefaultCursor("default");
    });

    this.buttonArrow = this.scene.add.text(90, -10, "▼", {
      fontSize: "20px",
      fontFamily: "conduit",
      color: "#000",
    });

    // Tambahkan elemen ke container
    this.add(this.buttonBackground);
    this.add(this.buttonText);
    this.add(this.buttonArrow);

    // Buat container untuk opsi dropdown
    this.optionsContainer = this.scene.add.container(0, 45);
    this.add(this.optionsContainer);
    this.optionsContainer.setVisible(false); // Awalnya tersembunyi

    // Buat setiap pilihan opsi dropdown
    this.options = [];
    options.forEach((option, index) => {
      const optionBackground = this.scene.rexUI.add
        .roundRectangle(0, index * 40 + 3, 260, 40, 1, 0xffffff)
        .setStrokeStyle(1, 0x000000)
        .setInteractive();

      const textOption = this.scene.add
        .text(-60, index * 40 - 10, option.label, {
          fontSize: "20px",
          fontFamily: "conduit",
          color: "#000",
        })
        .setInteractive();

      // Tambahkan hover dan pointer ke optionBackground
      optionBackground.on("pointerover", () => {
        optionBackground.setFillStyle(0x0066cc); // hover abu-abu
        textOption.setColor("#ffffff");
        this.scene.input.setDefaultCursor("pointer"); // ubah kursor
      });

      optionBackground.on("pointerout", () => {
        optionBackground.setFillStyle(0xffffff);
        textOption.setColor("#000000");
        this.scene.input.setDefaultCursor("default");
      });

      // Tambahkan event klik pada setiap opsi
      optionBackground.on("pointerdown", () => {
        this.handleSelection(option.label, option.value, callback);
      });

      textOption.on("pointerdown", () => {
        this.handleSelection(option.label, option.value, callback);
      });

      // Tambahkan hover dan pointer pada textOption secara langsung
      textOption.on("pointerover", () => {
        optionBackground.setFillStyle(0x0066cc);
        textOption.setColor("#ffffff"); // Ubah warna teks menjadi putih
        this.scene.input.setDefaultCursor("pointer");
      });

      textOption.on("pointerout", () => {
        optionBackground.setFillStyle(0xffffff);
        textOption.setColor("#000000"); // Kembalikan warna teks menjadi hitam
        this.scene.input.setDefaultCursor("default");
      });

      this.options.push(textOption);
      this.optionsContainer.add(optionBackground);
      this.optionsContainer.add(textOption);
    });

    // Event klik pada tombol dropdown
    this.buttonBackground.on("pointerdown", () => {
      this.toggleOptions();
    });

    this.buttonText.on("pointerdown", () => {
      this.toggleOptions();
    });

    this.buttonArrow.on("pointerdown", () => {
      this.toggleOptions();
    });

    scene.add.existing(this);
  }

  toggleOptions() {
    this.scene.sound.add("pop").play();
    this.optionsContainer.setVisible(!this.optionsContainer.visible);
    this.buttonArrow.setText(this.optionsContainer.visible ? "▲" : "▼"); // Ubah arah panah
  }

  handleSelection(label, value, callback) {
    // Update teks pada tombol dropdown dengan pilihan yang dipilih
    this.buttonText.setText(label);
    this.selectedOption = value;

    // Jalankan callback yang di-passing dari game.js
    callback(value);

    // Sembunyikan opsi setelah memilih dan kembalikan arah panah
    this.toggleOptions();
  }
}

export default Dropdown;
