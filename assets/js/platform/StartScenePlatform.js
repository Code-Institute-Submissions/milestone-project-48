class StartScenePlatform extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScenePlatform' })
    }

    preload() {
        this.load.image('background', '/milestone-project-2/assets/pics/skyBackground.png');
    }

    create() {
        const bg = this.add.image(250, 250, 'background').setScale(.3).setDepth(-1);

        this.add.text(100, 250, 'Click to start!', { fill: '#000000', fontSize: '35px' });
        this.input.on('pointerdown', () => {
            this.scene.stop('StarScenePlatform')
            this.scene.start('GameScenePlatform')
        });
    }
}