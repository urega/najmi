import Checkbox from "../../component/ui/Checkbox";
import ImageButton from "../../component/ui/ImageButton";
import ImageButtonSet from "../../component/ui/ImageButtonSet";
import PanelText from "../../component/ui/PanelText";
import PlayPauseButton from "../../component/ui/PlayPauseButton";
import RdbGroup from "../../component/ui/RdbGroup";
import ScienceText from "../../component/ui/ScienceText";
import SelectBox from "../../component/ui/SelectBox";
import Slider from "../../component/ui/Slider";
import Steper from "../../component/ui/Steper";
import SteperText from "../../component/ui/SteperText";
import Util from "../../component/util/Util";

class UiScene extends Phaser.Scene {
  constructor() {
    super("UiScene");
  }
  create() {
    let initX = 20;
    // Checkbox
    this.add.text(initX, 0, "Check Box", {
      fontFamily: "roboto_bold",
      fontSize: 22,
      color: "#ff0000",
    });
    this.cb = new Checkbox(this, initX, 40, "Pengurangan", this.cbClick);

    // Radio Button
    this.add.text(initX, 100, "Radio Button", {
      fontFamily: "roboto_bold",
      fontSize: 22,
      color: "#ff0000",
    });
    this.rdbData = [
      { value: 100, label: "Juventus" },
      { value: 120, label: "MU" },
      { value: 220, label: "Chelsea" },
    ];
    this.rdbGroup = new RdbGroup(
      this,
      initX,
      130,
      this.rdbData,
      { dir: "horizontal", space: 15 },
      this.rdbSelect
    );

    // Panel Text
    this.add.text(initX, 190, "Panel Text", {
      fontFamily: "roboto_bold",
      fontSize: 22,
      color: "#ff0000",
    });
    this.panelText = new PanelText(this, initX, 230, "150", {
      w: 72,
      h: 62,
      fontSize: 30,
      bgColor: 0xffffff,
    });

    // Stepper
    this.add.text(initX, 300, "Stepper", {
      fontFamily: "roboto_bold",
      fontSize: 22,
      color: "#ff0000",
    });
    this.stepper = new Steper(
      this,
      initX,
      340,
      {
        dir: "horizontal",
        value: 4,
        minValue: 0,
        maxValue: 9,
        step: 1,
        decimalPlace: 0,
      },
      this.steperClick
    );
    this.stepper1 = new SteperText(
      this,
      initX,
      400,
      {
        bgColor: 0xffffff,
        dir: "vertical",
        value: 4,
        minValue: 0,
        maxValue: 9,
        step: 1,
        decimalPlace: 0,
      },
      this.steperClick
    );
    this.stepper2 = new SteperText(
      this,
      initX,
      600,
      {
        dir: "horizontal",
        value: 4,
        minValue: 0,
        maxValue: 9,
        step: 1,
        decimalPlace: 0,
      },
      this.steperClick
    );
    // this.stepper2.setValue(5);
    this.stepper2.setData({
      value: 3,
      minValue: -4,
      maxValue: 9,
      step: 1,
      decimalPlace: 0,
    });

    initX = 520;
    // Checkbox
    this.add.text(initX, 0, "Slider", {
      fontFamily: "roboto_bold",
      fontSize: 22,
      color: "#ff0000",
    });

    this.slider = new Slider(
      this,
      initX,
      50,
      {
        min: 0,
        max: 10,
        step: 1, //0 = continuous , > 0 = step
      },
      this.dragging,
      this.dragEnd
    );
    this.slider.setValue(5);

    // Science Text
    this.add.text(initX, 120, "Science Text", {
      fontFamily: "roboto_bold",
      fontSize: 22,
      color: "#ff0000",
    });

    new ScienceText(this, initX, 150, "C|#6|H|#12|O|#6");
    new ScienceText(this, initX, 180, "5|^(x+y)");
    this.add.text(initX + 80, 180, "100 " + Util.symbol("degree") + "R", {
      fontFamily: "roboto_light",
      fontSize: 24,
      color: "#000000",
    });
    this.add.text(
      initX + 180,
      180,
      Util.symbol("angle") + "BAC = 180" + Util.symbol("degree"),
      {
        fontFamily: "roboto_light",
        fontSize: 24,
        color: "#000000",
      }
    );

    // Select Box
    this.add.text(initX, 220, "Select Box", {
      fontFamily: "roboto_bold",
      fontSize: 22,
      color: "#ff0000",
    });

    this.selectData = [
      { value: 100, label: "Juventus" },
      { value: 120, label: "MU" },
      { value: 220, label: "Chelsea" },
    ];

    this.selectBox = new SelectBox(
      this,
      initX,
      250,
      this.selectData,
      this.selectClick
    );

    // Image Button
    this.add.text(initX, 320, "Image Button", {
      fontFamily: "roboto_bold",
      fontSize: 22,
      color: "#ff0000",
    });

    this.btn = new ImageButton(
      this,
      520,
      350,
      "ui",
      ["image_button_0001.png", "image_button_0007.png"],
      this.btnClick
    );
    this.btn.setEnable(false);

    // Image Button Set
    this.add.text(initX, 430, "Image Button Set", {
      fontFamily: "roboto_bold",
      fontSize: 22,
      color: "#ff0000",
    });

    this.btnSet = new ImageButtonSet(this, 520, 470, "stop", this.btnClick);
    // this.btnSet.setEnable(false);

    // Play Pause Toggle
    this.add.text(initX, 550, "Play Pause Toggle", {
      fontFamily: "roboto_bold",
      fontSize: 22,
      color: "#ff0000",
    });
    this.btnPlayPause = new PlayPauseButton(this, 520, 600, this.playClick);
  }

  cbClick(value) {
    console.log(value);
    // this.scene.isShow = value;
    // this.scene.updateUI();
  }

  rdbSelect(data) {
    console.log(data);
    // this.scene.index = data.index;
    // this.scene.updateUI();
  }

  steperClick(value) {
    console.log(value);
    // this.scene.steperValue = value;
    // this.scene.updateUI();
  }

  dragging(value) {
    console.log(value);
    // this.scene.steperValue = value;
    // this.scene.updateUI();
  }

  dragEnd(value) {
    console.log(value);
    // this.scene.steperValue = value;
    // this.scene.updateUI();
  }

  selectClick(item) {
    console.log(item);
    // this.scene.steperValue = value;
    // this.scene.updateUI();
  }

  btnClick() {
    console.log("btnClick");
  }

  playClick(state) {
    console.log(state);
  }
}

export default UiScene;
