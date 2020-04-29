class StartScenePlatform extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScenePlatform' })
    }
    // background
    preload() {
        this.load.image('background', '/milestone-project-2/assets/pics/skyBackground.png');
    }
    //create the layout for the game/adding fixed positions/objects to the game
    create() {
        const bg = this.add.image(250, 250, 'background').setScale(.3).setDepth(-1);

        this.add.text(100, 150, 'Click to start!', { fill: '#000000', fontSize: '35px' });
        this.add.text(100, 200, 'Get to the top!', { fill: '#000000', fontSize: '35px' });
        this.add.text(75, 250, "Don't hit any platforms!", { fill: '#000000', fontSize: '25px' });
        this.add.text(85, 280, 'Use arrow keys to move!', { fill: '#000000', fontSize: '25px' });
        this.input.on('pointerdown', () => {
            this.scene.stop('StarScenePlatform')
            this.scene.start('GameScenePlatform')
        });
    }
}