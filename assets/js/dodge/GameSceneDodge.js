class GameSceneDodge extends Phaser.Scene {
  constructor() {
    super({ key: 'GameSceneDodge' });
  };
  preload() {
    
  this.load.image('bug', '/milestone-project-2/assets/pics/eriopis-canrash-bug.png');
  this.load.image('platform', '/milestone-project-2/assets/pics/platform.png');
  this.load.image('player', '/milestone-project-2/assets/pics/bluecreature.png');
  };

  create() {
    gameState.player = this.physics.add.sprite(225, 450, 'player').setScale(.1);
    
    const platforms = this.physics.add.staticGroup();
  
    platforms.create(250, 490, 'platform').setScale(3, .5).refreshBody();
  
    gameState.scoreText = this.add.text(0, 0, 'Score: 0', { fontSize: '25px', fill: '#fff' }).setDepth(1);
  
    gameState.player.setCollideWorldBounds(true);
  
    this.physics.add.collider(gameState.player, platforms);
    
    gameState.cursors = this.input.keyboard.createCursorKeys();
  
    const bugs = this.physics.add.group();
  
    function bugGen () {
      const xCoord = Math.random() * 500;
      bugs.create(xCoord, 10, 'bug').setScale(.2);
    }
  
    const bugGenLoop = this.time.addEvent({
      delay: 150,
      callback: bugGen,
      callbackScope: this,
      loop: true,
    });
  
    this.physics.add.overlap(bugs, platforms, function (bug) {
      bug.destroy();
      gameState.score += 10;
      gameState.scoreText.setText(`Score: ${gameState.score}`);
    })
    
    this.physics.add.overlap(gameState.player, bugs, () => {
      bugGenLoop.destroy();
      this.physics.pause();
      this.add.text(180, 250, 'Game Over', { fontSize: '15px', fill: '#000000' });
      this.add.text(152, 270, 'Click to Restart', { fontSize: '15px', fill: '#000000' });
      
      this.input.on('pointerup', () =>{
        gameState.score = 0;
        this.scene.restart();
      });
    });

  };
  update() {
    if (gameState.cursors.left.isDown) {
      gameState.player.setVelocityX(-160);
    } else if (gameState.cursors.right.isDown) {
      gameState.player.setVelocityX(160);
    } else {
      gameState.player.setVelocityX(0);
    }
  }
}