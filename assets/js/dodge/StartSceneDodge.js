class StartSceneDodge extends Phaser.Scene {
    constructor() {
        super({ key: 'StartSceneDodge' })
    }

    create() {
        this.add.text(100, 150, 'Click to start!', { fill: '#fff', fontSize: '35px' });
        this.add.text(80, 200, 'Press <- and -> to move!', { fill: '#fff', fontSize: '25px' });
        this.add.text(100, 250, 'Press SPACE to shoot!', { fill: '#ff0000', fontSize: '25px' });

        this.input.on('pointerdown', () => {
            this.scene.stop('StarSceneDodge')
            this.scene.start('GameSceneDodge')
        });
    }
}