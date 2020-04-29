class StartSceneDodge extends Phaser.Scene {
    constructor() {
        super({ key: 'StartSceneDodge' });
    }
    //create the layout for the game/adding fixed positions/objects to the game
    create() {
        this.add.text(100, 150, 'Click to start!', { fill: '#fff', fontSize: '35px' });
        this.add.text(80, 200, 'Press <- and -> to move!', { fill: '#fff', fontSize: '25px' });
        this.add.text(135, 250, 'Press W to shoot!', { fill: '#fff', fontSize: '25px' });

        this.input.on('pointerdown', () => {
            this.scene.stop('StarSceneDodge');
            this.scene.start('GameSceneDodge');
        });
    }
}