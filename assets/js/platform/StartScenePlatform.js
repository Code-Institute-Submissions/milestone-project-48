class StartScenePlatform extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScenePlatform' })
    }

    create() {
        this.add.text(100, 250, 'Click to start!', { fill: '#fff', fontSize: '35px' });
        this.input.on('pointerdown', () => {
            this.scene.stop('StarScenePlatform')
            this.scene.start('GameScenePlatform')
        });
    }
}