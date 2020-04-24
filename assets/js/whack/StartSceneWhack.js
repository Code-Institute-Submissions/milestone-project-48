class StartSceneWhack extends Phaser.Scene {
    constructor() {
        super({ key: 'StartSceneWhack' })
    }

    create() {
        this.add.text(150, 250, 'Click to start!', { fill: '#000000', fontSize: '20px' });
        this.input.on('pointerdown', () => {
            this.scene.stop('StarSceneWhack')
            this.scene.start('GameSceneWhack')
        });
    }
}