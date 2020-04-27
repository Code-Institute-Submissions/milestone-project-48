const gameState = {
  score: 0,
  highscore: 0,
};

const config = {
  type: Phaser.AUTO,
  transparent: true,
  parent: 'dodge-game',
  scale: {
    mode: Phaser.Scale.ENVELOP,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 500,
    height: 500,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
      enableBody: true,
    }
  },
  scene: [StartSceneDodge, GameSceneDodge],
};


const game = new Phaser.Game(config);