import Phaser from 'phaser'

export default class extends Phaser.Scene {

    private ready: boolean = false;

    constructor() {
        super({ key: 'BootScene' })
    }

    preload() {
        // 加载进度条所需必备的资源
        this.ready = true;
    }

    update() {
        if (this.ready) {
            this.scene.start('PreloadScene')
        }
    }
    
}