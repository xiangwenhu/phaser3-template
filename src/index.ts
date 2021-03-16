import config from './config';
import BootScene from './scenes/Boot';
import PreloadScene from './scenes/Preload';
import MainScene from './scenes/Main';

const gameConfig = Object.assign(config, {
  scene: [BootScene, PreloadScene, MainScene]
})

export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

window.addEventListener('load', () => {
  const game = new Game(gameConfig);
});