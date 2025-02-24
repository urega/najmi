class Grid extends Phaser.GameObjects.Container {
  constructor(scene, x, y, style) {
    super(scene, x, y);
    scene.add.existing(this);
    this.style = {
      dir: style.dir ? style.dir : "vertical",
      space: style.space,
      align: style.align,
    };
    this.width = 0;
    this.height = 0;
  }
  update() {
    let position = { x: 0, y: 0 };
    let maxWidth = 0;
    let maxHeight = 0;
    this.each((item) => {
      if (
        item.constructor.name === "Checkbox" ||
        item.constructor.name === "PanelText"
      ) {
        position.x += item.width / 2;
        position.y += item.height / 2;
      }
      if (item.constructor.name === "ScienceText") {
        position.y += item.height / 2;
      }
      item.setPosition(position.x, position.y);

      if (this.style.dir === "horizontal") {
        position.x += item.width + this.style.space;
      }
      if (this.style.dir === "vertical") {
        position.y += item.height + this.style.space;
      }
      if (
        item.constructor.name === "Checkbox" ||
        item.constructor.name === "PanelText"
      ) {
        position.x -= item.width / 2;
        position.y -= item.height / 2;
      }

      if (item.constructor.name === "ScienceText") {
        position.y -= item.height / 2;
      }
      if (item.width > maxWidth) {
        maxWidth = item.width;
      }
      if (item.height > maxHeight) {
        maxHeight = item.height;
      }
    });
    this.width = position.x;
    this.height = position.y;
    if (this.style.dir === "horizontal") {
      this.height += maxHeight;
    }
    if (this.style.dir === "vertical") {
      this.width += maxWidth;
    }
    this.each((item) => {
      if (this.style.dir === "horizontal") {
        if (item.height < this.height) {
          switch (this.style.align) {
            case "top":
              break;
            case "center":
              item.y += (this.height - item.height) / 2;
              break;
            case "bottom":
              item.y += this.height - item.height;
              break;
            default:
              break;
          }
        }
      } else if (this.style.dir === "vertical") {
        if (item.height < this.height) {
          switch (this.style.align) {
            case "center":
              item.x += (this.width - item.width) / 2;
              break;
            default:
              break;
          }
        }
      }
      if (item.constructor.name === "Slider") {
        item.addSlider(this.x, this.y);
      }
    });
  }
}

export default Grid;
