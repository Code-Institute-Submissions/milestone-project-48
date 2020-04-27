class GameSceneDodge extends Phaser.Scene {
  constructor() {
    super({ key: 'GameSceneDodge' });
  };
  preload() {

    this.load.image('bug', '/milestone-project-2/assets/pics/alienEnemy.png');
    this.load.image('platform', '/milestone-project-2/assets/pics/platform.png');
    this.load.image('alien', '/milestone-project-2/assets/pics/bluecreature.png');
    this.load.image('bullet', '/milestone-project-2/assets/pics/Pokeball.png');
  };

  create() {

    gameState.alien = this.physics.add.sprite(225, 455, 'alien').setScale(.1);

    gameState.scoreText = this.add.text(0, 0, 'Score: 0', { fontSize: '25px', fill: '#fff' }).setDepth(1);

    gameState.alien.setCollideWorldBounds(true);

    gameState.cursors = this.input.keyboard.createCursorKeys();

    //////////////////////////////////////////// groups and loops
    const platforms = this.physics.add.staticGroup();

    platforms.create(250, 490, 'platform').setScale(3, .5).refreshBody();
    platforms.create(250, -30, 'platform').setScale(3, .5).refreshBody();

    gameState.bullets = this.physics.add.group();

    const bugs = this.physics.add.group();

    function bugGen() {
      const xCoord = Math.random() * 500;
      bugs.create(xCoord, 30, 'bug').setScale(.2);
    }

    gameState.bugGenLoop = this.time.addEvent({
      delay: 150,
      callback: bugGen,
      callbackScope: this,
      loop: true,
    });

    /////////////////////////////////////////// physics
    this.physics.add.collider(gameState.alien, platforms);

    this.physics.add.collider(gameState.bullets, platforms, function(bullet){
      bullet.destroy();
    })

    this.physics.add.collider(bugs, gameState.bullets, function (bug, bullet) {
      bug.destroy();
      bullet.destroy();
      
      this.physics.pause();
      gameState.score += 10;
      gameState.scoreText.setText(`Score: ${gameState.score}`);
    })

    this.physics.add.overlap(bugs, platforms, function (bug) {
      bug.destroy();
    })

    this.physics.add.overlap(gameState.alien, bugs, () => {
      bugGenLoop.destroy();
      this.physics.pause();
      this.add.text(180, 250, 'Game Over', { fontSize: '15px', fill: '#000000' });
      this.add.text(152, 270, 'Click to Restart', { fontSize: '15px', fill: '#000000' });

      this.input.on('pointerup', () => {
        gameState.score = 0;
        this.scene.restart();
      });
    });

    gameState.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)


  };

  update() {

    function bulletGen() {
      const xAlien = gameState.alien.x;
      const yAlien = gameState.alien.y - 30;
      gameState.bullets.create(xAlien, yAlien, 'bullet').setScale(.2).setDepth(1).setGravityY(-500);
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
      gameState.bugGenLoop.delay = 100;
    }
  }
}