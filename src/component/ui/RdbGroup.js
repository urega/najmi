import RadioButton from "./RadioButton";
import _ from "lodash";

class RdbGroup extends Phaser.GameObjects.Container {
  constructor(scene, x, y, data, style, onSelect) {
    super(scene, x, y);
    this.style = {
      dir: style.dir ? style.dir : "vertical",
      space: style.space ? style.space : 10,
    };
    scene.add.existing(this);

    this.onSelect = onSelect;
    this.index = 0; // Nilai default index
    this.data = data;
    let position = { x: 0, y: 0 };
    let width_arr = [];

    data.map((item, index) => {
      const rdb = new RadioButton(
        scene,
        position.x,
        position.y,
        { index: index, value: item.value, label: item.label },
        this.cbClick.bind(this) // Bind callback ke RdbGroup
      );
      width_arr.push(rdb.width);
      this.add(rdb);

      if (this.style.dir === "horizontal") {
        position.x += rdb.width + this.style.space;
      } else if (this.style.dir === "vertical") {
        position.y += rdb.height + this.style.space;
      }
    });

    const boxSize = { w: 42, h: 42 };
    this.width =
      this.style.dir === "horizontal" ? position.x : _.max(width_arr);
    this.height = boxSize.h;

    this.update();
  }

  cbClick(data) {
    this.index = data.index; // Set index yang dipilih
    this.update();

    if (this.onSelect) {
      this.onSelect(data); // Panggil onSelect dengan data yang dipilih
    }
  }

  setIndex(value) {
    this.index = value;
    this.update();
  }

  update() {
    this.each((item) => {
      item.index === this.index ? item.setIsOn(true) : item.setIsOn(false);
    });
  }
}

export default RdbGroup;
