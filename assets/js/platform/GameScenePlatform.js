class GameScenePlatform extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScenePlatform' });
  }
  // adding images/spritesheets pictures
  preload() {
    this.load.spritesheet('bird', '/milestone-project-2/assets/pics/birdFlying3.png', { frameWidth: 73.5, frameHeight: 45 });
    this.load.image('plat1', '/milestone-project-2/assets/pics/plat1.png');
    this.load.image('plat2', '/milestone-project-2/assets/pics/plat2.png');
    this.load.image('plat3', '/milestone-project-2/assets/pics/plat3.png');
    this.load.image('plat4', '/milestone-project-2/assets/pics/plat4.png');
    this.load.image('door', '/milestone-project-2/assets/pics/door.png');
    this.load.image('background', '/milestone-project-2/assets/pics/skyBackground.png');
  }
  //create the layout for the game/adding fixed positions/objects to the game
  create() {
    // text, sprites & fixed variables
    const bg = this.add.image(500, 500, 'background').setScale(.8).setDepth(-1);

    gameState.active = true;
    gameState.bird = this.physics.add.sprite(0, 980, 'bird').setScale(.5);
    gameState.bird.setCollideWorldBounds(true);
    gameState.cursors = this.input.keyboard.createCursorKeys();
    // WASD control
    gameState.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    gameState.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    gameState.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    gameState.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    // animation
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('bird', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    gameState.goal = this.physics.add.staticImage(440, 10, 'door').setOrigin(0, 0);


    gameState.scoreText = this.add.text(200, 10, 'Score: ', { fontSize: '25px', fill: '#000000'}).setScrollFactor(0).setDepth(1);
    gameState.highscoreText = this.add.text(140, 470, 'HighScore: ', { fontSize: '25px', fill: '#000000' }).setScrollFactor(0).setDepth(1);
    // platforms
    gameState.xCoord = [20, 120, 200, 300, 420];
    gameState.yCoord = [900, 750, 600, 450, 300, 150];

    gameState.platforms = this.physics.add.staticGroup();
    for (let i = 0; i < 20; i++) {
      gameState.platforms.create(gameState.xCoord[Math.floor(Math.random() * 5)], gameState.yCoord[Math.floor(Math.random() * 6)], 'plat1');
      gameState.platforms.create(gameState.xCoord[Math.floor(Math.random() * 5)], gameState.yCoord[Math.floor(Math.random() * 6)], 'plat2');
      gameState.platforms.create(gameState.xCoord[Math.floor(Math.random() * 5)], gameState.yCoord[Math.floor(Math.random() * 6)], 'plat3');
      gameState.platforms.create(gameState.xCoord[Math.floor(Math.random() * 5)], gameState.yCoord[Math.floor(Math.random() * 6)], 'plat4');
    }
    // colliders
    this.physics.add.overlap(gameState.platforms, gameState.platforms, (platform) => {
      platform.destroy();
    });

    this.physics.add.overlap(gameState.bird, gameState.platforms, () => {
      this.physics.pause();

      this.add.text(180, 220, 'Game Over!', { fontSize: '25px', fill: '#000000' }).setScrollFactor(0);
      this.add.text(80, 270, 'Press SPACE to Restart!', { fontSize: '25px', fill: '#000000' }).setScrollFactor(0);
      this.input.keyboard.on('keydown-SPACE', () => {
        gameState.score = 0;
        this.scene.restart();
      });
    });

    this.physics.add.overlap(gameState.bird, gameState.goal, () => {
      gameState.score += 10;
      this.scene.restart();
    });

    // camera
    gameState.width = 500;
    gameState.height = 1000;
    this.cameras.main.setBounds(0, 0, gameState.width, gameState.height);
    this.physics.world.setBounds(0, 0, gameState.width, gameState.height);
    this.cameras.main.startFollow(gameState.bird, true, 0.5, 0.5);
  }
  // changing fixed positions/objects in the game, starting animations, updating the code throughout the game
  update() {
    // highscore get
    gameState.highscoreText.setText(`Highscore: ${gameState.highscore}`);
    gameState.scoreText.setText(`Score: ${gameState.score}`);

    if (localStorage.getItem("PlatformGame") !== null) {
      gameState.highscore = parseInt(localStorage.getItem("PlatformGame"));
    }

    if (gameState.score > gameState.highscore) {
      gameState.highscore = gameState.score;
      localStorage.setItem("PlatformGame", gameState.highscore);
    }
    // keyboard & mouse input
    // Up & Down
    if (gameState.cursors.up.isDown || gameState.wKey.isDown) {
      gameState.bird.setVelocityY(-200);
    } else {
      gameState.bird.setVelocityY(100);
    }
    // right & left
    if (gameState.cursors.right.isDown || gameState.dKey.isDown) {
      gameState.bird.setVelocityX(200);
    } else if (gameState.cursors.left.isDown || gameState.aKey.isDown) {
      gameState.bird.setVelocityX(-200);
    } else {
      gameState.bird.setVelocityX(0);
    }
    // animation
    if (gameState.active === true) {
      gameState.bird.anims.play('idle', true);
    }
  }
}