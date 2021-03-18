import Phaser from "phaser";
import ProgressBar from "../objects/ProgressBar";

export default class extends Phaser.Scene {

  private progressBar: ProgressBar;

  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {


    this.progressBar = new ProgressBar(this);

    this.load.on('progress', value => {
      this.progressBar.setProgress(value);
    });

    this.load.on('fileprogress', file => {
      this.progressBar.setFileProgress(file.key);
    });

    this.load.on('complete', () => {
      this.progressBar.destroy();
    })


    this.load.image(`phaser-logo`, 'assets/images/phaser-logo.png');
    for (let i = 0; i < 100; i++) {
      this.load.image(`phaser-logo-${i + 1}`, 'assets/images/phaser-logo.png');
    }

  }

  create() {
    this.scene.start('MainScene')

    /**
     * This is how you would dynamically import the mainScene class (with code splitting),
     * add the mainScene to the Scene Manager
     * and start the scene.
     * The name of the chunk would be 'mainScene.chunk.js
     * Find more about code splitting here: https://webpack.js.org/guides/code-splitting/
     */
    // let someCondition = true
    // if (someCondition)
    //   import(/* webpackChunkName: "mainScene" */ './mainScene').then(mainScene => {
    //     this.scene.add('MainScene', mainScene.default, true)
    //   })
    // else console.log('The mainScene class will not even be loaded by the browser')
  }
}
