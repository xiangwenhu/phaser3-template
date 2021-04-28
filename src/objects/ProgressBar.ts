import Phaser from "phaser";

export default class ProgressBar extends Phaser.GameObjects.GameObject {
    private progressBar: Phaser.GameObjects.Graphics;

    private progressBox: Phaser.GameObjects.Graphics;

    private percentText: Phaser.GameObjects.Text;

    private loadingText: Phaser.GameObjects.Text;

    private assetText: Phaser.GameObjects.Text;

    private cameraWidth: number;

    private cameraHeight: number;

    constructor(scene: Phaser.Scene) {
        super(scene, "progress-bar");
        this.init();
    }

    private init() {
        // eslint-disable-next-line no-multi-assign
        const width = this.cameraWidth = this.scene.cameras.main.width;
        // eslint-disable-next-line no-multi-assign
        const height = this.cameraHeight = this.scene.cameras.main.height;

        this.progressBar = this.scene.add.graphics().setDepth(1);
        this.progressBox = this.scene.add.graphics();

        this.progressBox.fillStyle(0x222222, 0.6);
        this.progressBox.fillRect(25, height / 2 - 40, width - 50, 80);

        this.loadingText = this.scene.add.text(width / 2, height / 2 - 80, 'Loading...', {
            fontSize: "30px",
            color: '#FFF',
            fontFamily: "monospace",
        }).setOrigin(0.5, 0.5);

        this.percentText = this.scene.add.text(width / 2, height / 2, '0%', {
            fontSize: "30px",
            color: '#FFF',
            fontFamily: "monospace",
        })
            .setOrigin(0.5, 0.5)
            .setDepth(2);

        this.assetText = this.scene.add.text(width / 2, height / 2 + 80, '', {
            fontSize: "30px",
            color: '#FFF',
            fontFamily: "monospace",
        }).setOrigin(0.5, 0.5);
    }

    setProgress(value: number) {
        const { cameraHeight: height, cameraWidth: width } = this;
        const { percentText, progressBar } = this;

        const pWidth = (width - 80);

        percentText.setText(`${~~(value * 100)}%`);
        progressBar.clear();
        progressBar.fillStyle(0xffffff, 0.6);
        progressBar.fillRect(40, height / 2 - 30, pWidth * value, 60);
    }

    setFileProgress(key: string) {
        const { assetText } = this;
        assetText.setText(`Loading asset: ${key}`);
    }

    destroy() {
        super.destroy();
        const { progressBar, progressBox, loadingText, percentText, assetText } = this;
        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
        percentText.destroy();
        assetText.destroy();
    }
}
