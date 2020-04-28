class GameSceneWhack extends Phaser.Scene {
  constructor() {
    super({ key: 'GameSceneWhack' });
  };
  preload() {
    this.load.image('mole', '/milestone-project-2/assets/pics/mole.gif');
    this.load.image('moleStanding', '/milestone-project-2/assets/pics/moleStanding.png')
  };

  create() {
    this.add.moles = [
      this.add.image(100, 100, 'mole').setScale(.3),
      this.add.image(200, 100, 'mole').setScale(.3),
      this.add.image(300, 100, 'mole').setScale(.3),
      this.add.image(400, 100, 'mole').setScale(.3),

      this.add.image(100, 200, 'mole').setScale(.3),
      this.add.image(200, 200, 'mole').setScale(.3),
      this.add.image(300, 200, 'mole').setScale(.3),
      this.add.image(400, 200, 'mole').setScale(.3),

      this.add.image(100, 300, 'mole').setScale(.3),
      this.add.image(200, 300, 'mole').setScale(.3),
      this.add.image(300, 300, 'mole').setScale(.3),
      this.add.image(400, 300, 'mole').setScale(.3),

      this.add.image(100, 400, 'mole').setScale(.3),
      this.add.image(200, 400, 'mole').setScale(.3),
      this.add.image(300, 400, 'mole').setScale(.3),
      this.add.image(400, 400, 'mole').setScale(.3),
    ];

    // Sprite
    let randomPosX = gameState.fixedPos[Math.floor(Math.random() * 4)];
    let randomPosY = gameState.fixedPos[Math.floor(Math.random() * 4)];
    gameState.moleStanding = this.add.sprite(randomPosX, randomPosY, 'moleStanding').setScale(.3);
    gameState.moleStanding.setInteractive();

    // Score Text
    gameState.scoreText = this.add.text(50, 0, 'Score: 0', { fontSize: '25px', fill: '#fff' });

    // Countdown Text
    gameState.countdownText = this.add.text(250, 0, 'Time Left: ', { fontSize: '25px', fill: '#fff' });
    // Highscore Text
    gameState.highscoreText = this.add.text(120, 475, 'HighScore: ', { fontSize: '25px', fill: '#fff' });
   
    // Timed Event
    gameState.gameOver = this.time.addEvent({ delay: 10000, callback: gameOver, callbackScope: this });
    gameState.moleMoving = this.time.addEvent({ delay: 600, callback: moving, callbackScope: this, loop: true });

    function moving() {
      let x = gameState.fixedPos[Math.floor(Math.random() * 4)];
      let y = gameState.fixedPos[Math.floor(Math.random() * 4)];
      gameState.moleStanding.setPosition(x, y);
    };
    // ending function
    function gameOver() {
      gameState.moleMoving.destroy();

      this.add.text(190, 225, 'Game Over', { fontSize: '25px', fill: '#000000' }).setDepth(1);
      let restart = this.add.text(100, 255, 'Click here to Restart', { fontSize: '25px', fill: '#000000' }).setDepth(1);
      restart.setInteractive();
      // restart scene
      restart.on('pointerup', () => {
        gameState.score = 0;
        this.scene.restart();
      });
    };



  };
  update() {
    gameState.highscoreText.setText(`Highscore: ${gameState.highscore}`);

    if (localStorage.getItem("Whackamole") !== null) {
      gameState.highscore = parseInt(localStorage.getItem("Whackamole"));
    }

    gameState.countdownText.setText(`Time Left: ${Math.floor(10000 - gameState.gameOver.getElapsed())}`);

    if (Math.floor(10000 - gameState.gameOver.getElapsed()) <= '0') {
      gameState.countdownText.setText(`    Game Over!`);
      if (gameState.score > gameState.highscore) {
        gameState.highscore = gameState.score;
        localStorage.setItem("Whackamole", gameState.highscore);

      }
    }

    gameState.moleStanding.on('pointerdown', function () {
      if (Math.floor(10000 - gameState.gameOver.getElapsed()) > '0') {
        gameState.score++;
        gameState.scoreText.setText(`Score: ${gameState.score}`);
      }
    })
  }
}