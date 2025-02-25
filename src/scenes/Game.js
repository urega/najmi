import { Scene } from "phaser";
import FullscreenButton from "../component/ui/FullscreenButton";
import MultipleChoices from "../component/ui/MultipleChoices";
import CustomButton from "../component/ui/CustomButton";

export class Game extends Scene {
  constructor() {
    super("Game");
    this.currentQuestionIndex = 0;
    this.stars = []; // Array untuk menyimpan bintang
  }

  create() {
    this.add.image(640, 360, "bg");
    this.fullscreenButton = new FullscreenButton(this, 70, 652.9);

    this.createQuestion();
    this.createStars(); // Buat tampilan awal bintang

    this.anims.create({
      key: "trueAnim",
      frames: this.anims.generateFrameNames("anim_true", {
        prefix: "anim_true_",
        start: 1,
        end: 85,
        suffix: ".png",
        zeroPad: 4,
      }),
      frameRate: 30,
      repeat: 0,
    });

    this.anims.create({
      key: "wrongAnim",
      frames: this.anims.generateFrameNames("anim_wrong", {
        prefix: "anim_wrong_",
        start: 1,
        end: 85,
        suffix: ".png",
        zeroPad: 4,
      }),
      frameRate: 30,
      repeat: 0,
    });

    this.anims.create({
      key: "breatheAnim",
      frames: this.anims.generateFrameNames("anim_breathe", {
        prefix: "anim_breathe_",
        start: 1,
        end: 28,
        suffix: ".png",
        zeroPad: 4,
      }),
      frameRate: 30,
      repeat: -1,
    });
    this.anims.create({
      key: "moveAnim",
      frames: this.anims.generateFrameNames("anim_move", {
        prefix: "anim_move_",
        start: 1,
        end: 25,
        suffix: ".png",
        zeroPad: 4,
      }),
      frameRate: 30,
      repeat: -1,
    });
  }

  createQuestion() {
    if (this.content) this.content.destroy();
    if (this.btnAnswer) this.btnAnswer.destroy();

    if (this.currentQuestionIndex === 1) {
      this.content = this.add
        .sprite(491.95, 320, "anim_breathe_0001.png")
        .setScale(0.75)
        .setOrigin(0.5);
      this.content.play("breatheAnim");
    } else if (this.currentQuestionIndex === 3) {
      this.content = this.add
        .sprite(491.95, 320, "anim_move_0001.png")
        .setScale(0.75)
        .setOrigin(0.5);
      this.content.play("moveAnim");
    } else {
      this.content = this.add.image(
        491.95,
        320,
        "content",
        `content_000${this.currentQuestionIndex + 1}.png`
      );
    }

    this.btnAnswer = new MultipleChoices(this, 901.9, 181.9);

    if (this.resetButton) this.resetButton.buttonImage.destroy();

    this.resetButton = new CustomButton(
      this,
      1213,
      652.9,
      "content",
      "btn_reset.png",
      this.resetGame.bind(this)
    );
  }

  createStars() {
    for (let i = 0; i < 5; i++) {
      let star = this.add
        .image(413 + i * 48, 100, "content", "star_0001.png")
        .setScale(0.7)
        .setVisible(false);
      this.stars.push(star);
    }
  }

  updateStars() {
    if (this.currentQuestionIndex < this.stars.length) {
      this.stars[this.currentQuestionIndex].setVisible(true);
    }
  }

  resetGame() {
    this.tweens.add({
      targets: this.resetButton.buttonImage,
      scale: { from: 1.05, to: 1 },
      ease: "linear",
      duration: 100,
      repeat: 0,
      yoyo: false,
      onComplete: () => {
        this.sound.add("pop").play();
        this.currentQuestionIndex = 0;
        this.createQuestion();
        this.stars.forEach((star) => star.setVisible(false)); // Reset bintang
      },
    });
  }

  nextQuestion() {
    this.updateStars(); // Tambahkan bintang saat jawaban benar
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < 5) {
      this.createQuestion();
    } else {
      this.sound.add("end").play();

      this.enableResetBtn();
    }
  }

  disableResetBtn() {
    if (this.resetButton?.buttonImage) {
      this.resetButton.buttonImage.disableInteractive();
      this.resetButton.buttonImage.setAlpha(0.5);
    }
  }

  enableResetBtn() {
    if (this.resetButton?.buttonImage) {
      this.resetButton.buttonImage.setInteractive();
      this.resetButton.buttonImage.setAlpha(1);
    }
  }
}
