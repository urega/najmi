class MultipleChoices extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.scene = scene;
    this.questionIndex = scene.currentQuestionIndex; // Ambil index dari scene
    scene.add.existing(this);

    this.questions = [
      { key: "content_0001", answer: "Berkembang biak" },
      { key: "content_0002", answer: "Bernapas" },
      { key: "content_0003", answer: "Makan" },
      { key: "content_0004", answer: "Bergerak" },
      { key: "content_0005", answer: "Tumbuh" },
    ];

    this.originalAnswers = [
      "Berkembang biak",
      "Bernapas",
      "Makan",
      "Bergerak",
      "Tumbuh",
    ];

    this.createButtons();
  }

  shuffleAnswers() {
    let shuffled = [...this.originalAnswers];
    for (let i = shuffled.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  createButtons() {
    if (this.buttons) {
      this.buttons.forEach((button) => button.destroy());
    }
    this.buttons = [];

    this.answers = this.shuffleAnswers(); // Acak jawaban sebelum ditampilkan

    this.answers.forEach((answer, index) => {
      let btn = this.scene.add
        .image(0, index * 90, "content", "btn_answer_0001.png")
        .setInteractive({ cursor: "pointer" })
        .setOrigin(0.5);
      let text = this.scene.add
        .text(0, index * 90, answer, {
          fontSize: "22px",
          fontFamily: "arialrb",
          color: "#000",
        })
        .setOrigin(0.5);

      btn.on("pointerover", () => btn.setTint(0xdddddd));
      btn.on("pointerout", () => {
        btn.clearTint();
      });

      btn.on("pointerdown", () => {
        this.scene.disableResetBtn();
        this.disableButtons(); // Nonaktifkan semua tombol

        this.scene.tweens.add({
          targets: btn,
          scale: { from: 1.05, to: 1 },
          ease: "linear",
          duration: 100,
          repeat: 0,
          yoyo: false,
        });

        let clickSound = this.scene.sound.add("click");
        clickSound.play();

        btn.setTexture("content", "btn_answer_0002.png");
        text.setColor("#fff");

        clickSound.once("complete", () => {
          this.scene.time.delayedCall(300, () => {
            this.checkAnswer(answer, btn, text);
          });
        });
      });

      this.add(btn);
      this.add(text);
      this.buttons.push(btn);
    });
  }

  disableButtons() {
    this.buttons.forEach((button) => {
      button.disableInteractive();
    });
  }

  enableButtons() {
    this.buttons.forEach((button) => {
      button.setInteractive({ cursor: "pointer" });
    });
  }

  playAnimation(animKey, callback) {
    // Tambahkan shade di belakang animasi
    // let shade = this.scene.add.rectangle(640, 360, 1280, 720, 0xffffff, 0.5);
    let shade = this.scene.add.image(640, 360, "shade").setVisible(true);

    let animSprite = this.scene.add.sprite(640, 360, animKey).setOrigin(0.5);
    animSprite.play(animKey);

    animSprite.once("animationcomplete", () => {
      animSprite.destroy();
      //   shade.destroy(); // Hapus shade setelah animasi selesai
      shade.setVisible(false);

      if (callback) callback();
    });
  }

  checkAnswer(selectedAnswer, btn, text) {
    let correctAnswer = this.questions[this.scene.currentQuestionIndex].answer;
    let soundEffect = selectedAnswer === correctAnswer ? "true" : "false";
    let animKey = selectedAnswer === correctAnswer ? "trueAnim" : "wrongAnim";

    let answerSound = this.scene.sound.add(soundEffect);

    // Mainkan suara dan animasi BERSAMAAN
    answerSound.play();
    this.playAnimation(animKey, () => {
      if (selectedAnswer === correctAnswer) {
        this.scene.nextQuestion(); // Pindah ke soal berikutnya setelah animasi selesai
      } else {
        this.scene.time.delayedCall(1000, () => {
          btn.setTexture("content", "btn_answer_0001.png");
          btn.clearTint();
          text.setColor("#000");
          this.enableButtons(); // Aktifkan kembali tombol reset setelah 1 detik
          this.scene.time.delayedCall(500, () => {
            this.scene.enableResetBtn();
          });
        });
      }
    });
  }
}

export default MultipleChoices;
