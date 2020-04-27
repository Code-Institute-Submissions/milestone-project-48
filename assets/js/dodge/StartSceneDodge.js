class StartSceneDodge extends Phaser.Scene {
    constructor() {
        super({ key: 'StartSceneDodge' })
    }

    create() {
        this.add.text(150, 250, 'Click to start!', { fill: '#000000', fontSize: '20px' });
        this.input.on('pointerdown', () => {
            this.scene.stop('StarSceneDodge')
            this.scene.start('GameSceneDodge')
        });
    }
}