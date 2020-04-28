class StartSceneWhack extends Phaser.Scene {
    constructor() {
        super({ key: 'StartSceneWhack' })
    }

    create() {
        this.add.text(100, 220, 'Click to start!', { fill: '#000000', fontSize: '35px' });
        this.add.text(120, 270, 'Click on the mole!', { fill: '#000000', fontSize: '25px' });
        this.input.on('pointerdown', () => {
            this.scene.stop('StarSceneWhack')
            this.scene.start('GameSceneWhack')
        });
    }
}