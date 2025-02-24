class LoadingPanel extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);
    scene.add.existing(this);

    // Set style untuk progress box dan teks
    this.style = {
      width: 310,
      height: 45,
      fontSize: 18,
      bgColor: 0x222222,
      textColor: "#ffffff",
    };

    // Progress box (latar belakang progress bar)
    this.progressBox = scene.add.graphics();
    this.progressBox.fillStyle(this.style.bgColor, 0.8);
    this.progressBox.fillRoundedRect(
      -this.style.width / 2,
      -this.style.height / 2,
      this.style.width,
      this.style.height,
      10
    );
    this.add(this.progressBox);

    // Progress bar (bagian dinamis)
    this.progressBar = scene.add.graphics();
    this.add(this.progressBar);

    // Teks "Loading..."
    this.loadingText = scene.add.text(0, -50, "Loading...", {
      fontFamily: "conduit",
      fontSize: "20px",
      color: this.style.textColor,
    });
    this.loadingText.setOrigin(0.5);
    this.add(this.loadingText);

    // Teks persentase loading
    this.percentText = scene.add.text(0, 0, "0%", {
      fontFamily: "conduit",
      fontSize: this.style.fontSize + "px",
      color: " 0x000000",
    });
    this.percentText.setOrigin(0.5);
    this.add(this.percentText);

    // Teks untuk asset yang sedang dimuat
    this.assetText = scene.add.text(0, 50, "", {
      fontFamily: "conduit",
      fontSize: this.style.fontSize - 2 + "px",
      color: this.style.textColor,
    });
    this.assetText.setOrigin(0.5);
    this.add(this.assetText);

    // Mengatur posisi awal container
    this.setPosition(x, y);

    // Memasukkan event listener langsung di dalam kelas
    scene.load.on("progress", (value) => {
      this.updateProgress(value);
    });

    scene.load.on("fileprogress", (file) => {
      this.setAssetText(file.key);
    });

    scene.load.on("complete", () => {
      this.destroyPanel();
    });
  }

  updateProgress(value) {
    // Mengupdate progress bar dan teks persentase
    this.percentText.setText(parseInt(value * 100) + "%");
    this.progressBar.clear();
    this.progressBar.fillStyle(0xffffff, 1);
    this.progressBar.fillRoundedRect(-150, -15, 300 * value, 30, 10); // Sesuaikan ukuran bar
  }

  setAssetText(fileKey) {
    // Mengupdate teks asset yang sedang dimuat
    this.assetText.setText("Loading asset: " + fileKey);
  }

  destroyPanel() {
    // Menghancurkan panel setelah loading selesai
    this.destroy();
  }
}

export default LoadingPanel;
