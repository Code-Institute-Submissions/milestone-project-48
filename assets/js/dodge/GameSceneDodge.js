class GameSceneDodge extends Phaser.Scene {
  constructor() {
    super({ key: 'GameSceneDodge' });
  };
  preload() {

    this.load.image('enemy', '/milestone-project-2/assets/pics/alienEnemy.png');
    this.load.image('platform', '/milestone-project-2/assets/pics/platform.png');
    this.load.image('alien', '/milestone-project-2/assets/pics/bluecreature.png');
    this.load.image('bullet', '/milestone-project-2/assets/pics/Pokeball.png');
  };

  create() {

    gameState.alien = this.physics.add.sprite(225, 440, 'alien').setScale(.13);

    gameState.scoreText = this.add.text(0, 0, 'Score: 0', { fontSize: '25px', fill: '#fff' }).setDepth(1);
    gameState.highscoreText = this.add.text(290, 0, 'Highscore: ', { fontSize: '25px', fill: '#fff' }).setDepth(1);

    gameState.alien.setCollideWorldBounds(true);

    gameState.cursors = this.input.keyboard.createCursorKeys();

    gameState.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    //////////////////////////////////////////// groups and loops
    const platforms = this.physics.add.staticGroup();

    platforms.create(250, 490, 'platform').setScale(3, .5).refreshBody();
    platforms.create(250, -30, 'platform').setScale(3, .5).refreshBody();

    gameState.bullets = this.physics.add.group();

    const enemies = this.physics.add.group();

    function enemyGen() {
      const xCoord = Math.random() * 480;
      enemies.create(xCoord, 40, 'enemy').setScale(.1);
    }

    gameState.enemyGenLoop = this.time.addEvent({
      delay: 150,
      callback: enemyGen,
      callbackScope: this,
      loop: true,
    });

    /////////////////////////////////////////// physics
    this.physics.add.collider(gameState.alien, platforms);

    this.physics.add.overlap(gameState.bullets, platforms, function (bullet) {
      bullet.destroy();
    })

    this.physics.add.overlap(enemies, gameState.bullets, function (enemy, bullet) {
      enemy.destroy();
      bullet.destroy();
      gameState.score += 10;
      gameState.scoreText.setText(`Score: ${gameState.score}`);
    })

    this.physics.add.overlap(enemies, platforms, function (enemy) {
      enemy.destroy();
    })

    this.physics.add.overlap(gameState.alien, enemies, () => {
      gameState.enemyGenLoop.destroy();
      this.physics.pause();

      this.add.text(190, 200, 'Game Over!', { fontSize: '25px', fill: '#fff' });
      let restart = this.add.text(100, 240, 'Click here to Restart!', { fontSize: '25px', fill: '#fff' });
      restart.setInteractive();
      restart.on('pointerup', () => {
        gameState.score = 0;
        this.scene.restart();
      });
    });

  }

  update() {

    gameState.highscoreText.setText(`Highscore: ${gameState.highscore}`);

    if (localStorage.getItem("DodgeGame") !== null) {
      gameState.highscore = parseInt(localStorage.getItem("DodgeGame"));
    }

    if (gameState.score > gameState.highscore) {
      gameState.highscore = gameState.score;
      localStorage.setItem("DodgeGame", gameState.highscore);
      
    }

    function bulletGen() {
      const xAlien = gameState.alien.x;
      const yAlien = gameState.alien.y - 20;
      gameState.bullets.create(xAlien, yAlien, 'bullet').setScale(.1).setDepth(1).setGravityY(-500);
    }

    if (gameState.cursors.left.isDown) {
      gameState.alien.setVelocityX(-200);
    } else if (gameState.cursors.right.isDown) {
      gameState.alien.setVelocityX(200);
    } else {
      gameState.alien.setVelocityX(0);
    };

    if (Phaser.Input.Keyboard.JustDown(gameState.spacebar)) {
      bulletGen();
    }

    if (gameState.score > 1000) {
      gameState.enemyGenLoop.delay = 100;
    }

    if (gameState.score > 2000) {
      gameState.enemyGenLoop.delay = 50;
    }
  }
}