import Phaser from 'phaser'

export default class extends Phaser.Scene {

    private ready: boolean = false;

    constructor() {
        super({ key: 'BootScene' })
    }

    preload() {

        if (this.game.device.os.desktop) {
            // this.game.scale.scaleMode = Phaser.Scale.ScaleModes.NONE
        } else {
            this.game.scale.scaleMode = Phaser.Scale.ScaleModes.WIDTH_CONTROLS_HEIGHT
        }
        // 加载进度条所需必备的资源
        this.ready = true;
    }

    update() {
        if (this.ready) {
            this.scene.start('PreloadScene')
        }
    }

}