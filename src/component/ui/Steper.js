import Grid from "./Grid";

class Steper extends Phaser.GameObjects.Container {
  constructor(scene, x, y, data, onSteperClick) {
    super(scene, x, y);
    scene.add.existing(this);
    this.onSteperClick = onSteperClick;
    this.data = {
      value: data.value ? data.value : data.minValue,
      minValue: data.minValue ? data.minValue : 0,
      maxValue: data.maxValue ? data.maxValue : 10,
      step: data.step ? data.step : 1,
      decimalPlace: data.decimalPlace ? data.decimalPlace : 0,
    };
    this.add(
      (this.grid = new Grid(scene, 0, 0, {
        dir: data.dir,
        space: 7,
        align: "center",
      }))
    );
    if (data.dir === "vertical") {
      this.grid.add(
        (this.up = new SteperButton(
          scene,
          0,
          0,
          "up",
          {
            enable: "stepper_0001",
            disable: "stepper_0001.png",
          },
          this.onClick
        ))
      );
      this.grid.add(
        (this.down = new SteperButton(
          scene,
          0,
          30,
          "down",
          {
            enable: "stepper_0002.png",
            disable: "stepper_0002.png",
          },
          this.onClick
        ))
      );
    } else if (data.dir === "horizontal") {
      this.grid.add(
        (this.down = new SteperButton(
          scene,
          0,
          30,
          "down",
          {
            enable: "stepper_0001.png",
            disable: "stepper_0001.png",
          },
          this.onClick
        ))
      );
      this.grid.add(
        (this.up = new SteperButton(
          scene,
          0,
          0,
          "up",
          {
            enable: "stepper_0002.png",
            disable: "stepper_0002.png",
          },
          this.onClick
        ))
      );
    }
    this.grid.update();
    this.updateUI();
    this.width = this.up.width;
    this.height = 2 * this.up.height;
  }

  setValue(value) {
    this.data.value = value;
    this.updateUI();
  }

  setEnable(value) {
    // added
    if (value) {
      this.updateUI();
    } else {
      this.up.setEnable(false);
      this.down.setEnable(false);
    }
  }

  onClick(name) {
    const parent = this.parentContainer.parentContainer;
    switch (name) {
      case "up":
        parent.data.value += parent.data.step;
        break;
      case "down":
        parent.data.value -= parent.data.step;
        break;
      default:
        break;
    }
    if (parent.data.decimalPlace > 0) {
      const x = 10 * parent.data.decimalPlace;
      const r = Math.round(parent.data.value * x) / x;
      parent.data.value = r;
    }
    parent.updateUI();
    if (parent.onSteperClick) {
      parent.onSteperClick(parent.data.value);
    }
  }

  getCenterY() {
    return this.y + this.height / 2;
  }

  updateUI() {
    this.up.setEnable(true);
    this.down.setEnable(true);
    if (this.data.value === this.data.minValue) {
      this.down.setEnable(false);
    }
    if (this.data.value === this.data.maxValue) {
      this.up.setEnable(false);
    }
  }
}

export default Steper;

class SteperButton extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, name, key, onClick) {
    super(scene, x, y);
    scene.add.existing(this);
    this.setOrigin(0.5);
    this.setTexture("grayUI", key.enable);
    this.setInteractive({ cursor: "pointer" });

    // Event saat pointer hover
    this.on("pointerover", () => {
      this.setTint(0xdddddd); // Memberi tint gelap saat hover
    });

    // Event saat pointer keluar
    this.on("pointerout", () => {
      this.clearTint(); // Menghapus tint saat kursor keluar
    });

    this.onClick = onClick;
    this.name = name;
    this.button = scene.plugins.get("rexButton").add(this, {});
    this.button.on(
      "click",
      function (button, gameObject, pointer, event) {
        this.tw = scene.tweens.add({
          targets: gameObject,
          scale: { from: 1.03, to: 1 },
          ease: "Elastic",
          duration: 200,
          repeat: 0,
          yoyo: false,
        });
        this.tw.on(
          "complete",
          function (tween, targets) {
            scene.sound.add("pop").play();
          },
          this.scene
        );

        if (this.onClick) {
          this.onClick(this.name);
        }
      },
      this
    );
    this.button.on(
      "enable",
      function (button, gameObject) {
        this.setTexture("grayUI", key.enable);
        this.setInteractive({ cursor: "pointer" });
      },
      this
    );
    this.button.on(
      "disable",
      function (button, gameObject) {
        this.setTexture("grayUI", key.disable);
        this.disableInteractive();
      },
      this
    );
  }

  setEnable(value) {
    this.button.setEnable(value);
    if (value) {
      this.setInteractive({ cursor: "pointer" });
      this.clearTint();
    } else {
      this.disableInteractive({ cursor: "default" });
      this.setTint(0xdddddd);
    }
  }
}

// this.stepper = new Steper(
//   this,
//   0,
//   0,
//   {
//     value: 0.1,
//     minValue: 0,
//     maxValue: 2,
//     step: 0.1,
//     decimalPlace: 1,
//   },
//   this.steperClick
// );

// steperClick(value) {
//   this.scene.steperValue = value;
//   this.scene.updateUI();
// }
