class StartSceneDodge extends Phaser.Scene {
    constructor() {
        super({ key: 'StartSceneDodge' })
    }

    create() {
        this.add.text(100, 250, 'Click to start!', { fill: '#fff', fontSize: '35px' });
        this.input.on('pointerdown', () => {
            this.scene.stop('StarSceneDodge')
            this.scene.start('GameSceneDodge')
        });
    }
}