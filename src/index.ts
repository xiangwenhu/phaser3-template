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

// window.addEventListener('load', () => {
const game = new Game(gameConfig);
// });

function resizeCanvas() {

  const canvas = document.querySelector('canvas');
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const windowRatio = windowWidth / windowHeight;
  const gameRatio = +game.config.width / +game.config.height;

  // if (windowRatio < gameRatio) {
  //   canvas.style.width = windowWidth + 'px';
  //   canvas.style.height = (windowWidth / gameRatio) + 'px';
  // } else {
  //   canvas.style.width = (windowHeight * gameRatio) + 'px';
  //   canvas.style.height = windowHeight + 'px';
  // }


  canvas.style.width = windowWidth + "px";
  canvas.style.height = (windowWidth / gameRatio) + 'px';

  console.log("width", windowWidth, "height", windowHeight);

}

window.addEventListener('resize', resizeCanvas, false);
(window as any).resizeP = resizeCanvas;