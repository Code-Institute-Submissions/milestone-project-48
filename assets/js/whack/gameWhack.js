const gameState = {
  score: 0,
  highscore: 0,
  fixedPos: [100, 200, 300, 400],
};

const config = {
  type: Phaser.AUTO,
  backgroundColor: 0xbada55,
  parent: 'whack-game',
  scale: {
    mode: Phaser.Scale.ENVELOP,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 500,
    height: 500,
  },
  scene: [StartSceneWhack, GameSceneWhack],
};

const game = new Phaser.Game(config);