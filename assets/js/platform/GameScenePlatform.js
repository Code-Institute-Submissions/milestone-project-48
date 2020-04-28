class GameScenePlatform extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScenePlatform' });
  }
  preload() {
    this.load.spritesheet('bird', '/milestone-project-2/assets/pics/birdFlying3.png', { frameWidth: 73.5, frameHeight: 54 })
    this.load.image('plat1', '/milestone-project-2/assets/pics/plat1.png');
    this.load.image('plat2', '/milestone-project-2/assets/pics/plat2.png');
    this.load.image('plat3', '/milestone-project-2/assets/pics/plat3.png');
    this.load.image('plat4', '/milestone-project-2/assets/pics/plat4.png');

  }

  create() {
    // player
    gameState.active = true;
    gameState.bird = this.physics.add.sprite(0, 980, 'bird').setScale(.5);
    gameState.bird.setCollideWorldBounds(true);

    gameState.cursors = this.input.keyboard.createCursorKeys();

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('bird', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    // platforms
    let xCoord = [0, 100, 200, 300, 400];
    let yCoord = [850, 770, 690, 610, 530, 450, 370, 290, 210, 130];

    const platforms = this.physics.add.staticGroup();
    platforms.create(xCoord[Math.floor(Math.random() * 4)] + 75, yCoord[Math.floor(Math.random() * 10)], 'plat1').setOrigin(0, 0).setScale(.5);
    platforms.create(xCoord[Math.floor(Math.random() * 4)] + 75, yCoord[Math.floor(Math.random() * 10)], 'plat2').setOrigin(0, 0).setScale(.5);
    platforms.create(xCoord[Math.floor(Math.random() * 4)] + 75, yCoord[Math.floor(Math.random() * 10)], 'plat3').setOrigin(0, 0).setScale(.5);
    platforms.create(xCoord[Math.floor(Math.random() * 4)] + 75, yCoord[Math.floor(Math.random() * 10)], 'plat4').setOrigin(0, 0).setScale(.5);
    platforms.create(xCoord[Math.floor(Math.random() * 4)] + 75, yCoord[Math.floor(Math.random() * 10)], 'plat1').setOrigin(0, 0).setScale(.5);
    platforms.create(xCoord[Math.floor(Math.random() * 4)] + 75, yCoord[Math.floor(Math.random() * 10)], 'plat2').setOrigin(0, 0).setScale(.5);
    platforms.create(xCoord[Math.floor(Math.random() * 4)] + 75, yCoord[Math.floor(Math.random() * 10)], 'plat3').setOrigin(0, 0).setScale(.5);
    platforms.create(xCoord[Math.floor(Math.random() * 4)] + 75, yCoord[Math.floor(Math.random() * 10)], 'plat4').setOrigin(0, 0).setScale(.5);
    platforms.create(xCoord[Math.floor(Math.random() * 4)] + 75, yCoord[Math.floor(Math.random() * 10)], 'plat1').setOrigin(0, 0).setScale(.5);
    platforms.create(xCoord[Math.floor(Math.random() * 4)] + 75, yCoord[Math.floor(Math.random() * 10)], 'plat2').setOrigin(0, 0).setScale(.5);
    platforms.create(xCoord[Math.floor(Math.random() * 4)] + 75, yCoord[Math.floor(Math.random() * 10)], 'plat3').setOrigin(0, 0).setScale(.5);
    platforms.create(xCoord[Math.floor(Math.random() * 4)] + 75, yCoord[Math.floor(Math.random() * 10)], 'plat4').setOrigin(0, 0).setScale(.5);
    // colliders
    this.physics.add.overlap(gameState.bird, platforms, () => {
      this.physics.pause();
    });


    // camera

    gameState.width = 500;
    gameState.height = 1000;
    this.cameras.main.setBounds(0, 0, gameState.width, gameState.height);
    this.physics.world.setBounds(0, 0, gameState.width, gameState.height);
    this.cameras.main.startFollow(gameState.bird, true, 0.5, 0.5);


  }

  update() {
    // Up & Down
    if (gameState.cursors.up.isDown) {
      gameState.bird.setVelocityY(-200);
    } else {
      gameState.bird.setVelocityY(100);
    };
    // right & left
    if (gameState.cursors.right.isDown) {
      gameState.bird.setVelocityX(200);
    } else if (gameState.cursors.left.isDown) {
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