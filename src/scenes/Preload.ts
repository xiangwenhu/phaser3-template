import Phaser from "phaser";
import ProgressBar from "../objects/ProgressBar";

// 也可以使用这样方式，就不用提示用this.addImage
import phaserLogo from "../assets/images/phaser-logo.png";

export default class extends Phaser.Scene {

  private progressBar: ProgressBar;

  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    this.addProgressBar();

    // 加载图片方法一 import  缺点，头部一大堆的import
    this.load.image("phaser-logo-i", phaserLogo);
    // 加载图片方法二 require, 缺点, 文件夹下不被使用的图片，也会被打包
    this.addImage(`phaser-logo`, 'phaser-logo.png');

    for (let i = 0; i < 10; i++) {
      this.addImage(`phaser-logo-${i + 1}`, 'phaser-logo.png');
    }
  }


  addImage(key: string | Phaser.Types.Loader.FileTypes.ImageFileConfig | Phaser.Types.Loader.FileTypes.ImageFileConfig[], url?: string | string[], xhrSettings?: Phaser.Types.Loader.XHRSettingsObject) {

    if (!Array.isArray(url)) {
      return this.load.image(key, require(`../assets/images/${url}`), xhrSettings);
    }

    url.forEach(u => {
      this.load.image(key, require(`../assets/images/${u}`), xhrSettings);
    })

  }



  addProgressBar() {

    console.time("preload-time");
    this.progressBar = new ProgressBar(this);

    this.load.on('progress', value => {
      this.progressBar.setProgress(value);
    });

    this.load.on('fileprogress', file => {
      this.progressBar.setFileProgress(file.key);
    });

    this.load.on('complete', () => {
      this.progressBar.destroy();
      console.timeEnd("preload-time");
      this.scene.start('MainScene')
    })

  }

  create() {

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
