import Phaser from "phaser";
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";

class VolumeControl extends Phaser.GameObjects.Container {
  constructor(scene, x, y, audioList) {
    super(scene, x, y);
    this.scene = scene;
    this.audioList = audioList;

    // Membuat background slider
    this.track = scene.add.graphics();
    this.track.fillStyle(0x260e04);
    this.track.fillRect(0, 0, 200, 20);

    // Membuat thumb slider
    this.thumb = scene.add.graphics();
    this.thumb.fillStyle(0xffffff);
    this.thumb.fillCircle(0, 10, 10);

    // Menambahkan teks untuk menampilkan volume
    this.volumeText = scene.add
      .text(
        50,
        35,
        "Volume: " + (this.audioList[0]?.volume * 100 || 100).toFixed(0) + "%",
        {
          fontSize: "15px",
          color: "#000000",
        }
      )
      .setOrigin(0.5);

    console.log(this.track);
    console.log(this.thumb);
    console.log(this.volumeText);

    // Menambahkan track dan thumb ke container
    this.add(this.track);
    this.add(this.thumb);
    this.add(this.volumeText);

    // Membuat slider fungsional menggunakan rexUI plugin
    // this.slider = scene.rexUI.add
    //   .slider({
    //     x: x,
    //     y: y,
    //     width: 200,
    //     height: 20,
    //     orientation: "x",
    //     track: this.track,
    //     thumb: this.thumb,
    //     value: this.audioList[0]?.volume || 1,
    //     min: 0,
    //     max: 1,
    //     step: 0.01,
    //     valuechangeCallback: (value) => {
    //       this.setVolumeForAllAudio(value);
    //       this.volumeText.setText("Volume: " + (value * 100).toFixed(0) + "%");
    //     },
    //     space: { top: 4, bottom: 4 },
    //   })
    //   .layout();

    // Menambahkan container ke scene
    this.scene.add.existing(this);
  }

  // Fungsi untuk mengatur volume dari semua audio
  setVolumeForAllAudio(volume) {
    this.audioList.forEach((audio) => {
      audio.setVolume(volume);
    });
  }
}

export default VolumeControl;
