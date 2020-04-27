const gameState = {
    score: 0,
    highscore: 0,
  };
  
  const config = {
    type: Phaser.AUTO,
    backgroundColor: 0xbada55,
    parent: 'platform-game',
    scale: {
      mode: Phaser.Scale.ENVELOP,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 500,
      height: 500,
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 1500 },
        enableBody: true,
      }
    },
    scene: [StartScenePlatform, GameScenePlatform],
  };
  
  const game = new Phaser.Game(config);