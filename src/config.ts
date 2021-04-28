const DEFAULT_WIDTH = 750;
const DEFAULT_HEIGHT = 1334;

export default {
  type: Phaser.AUTO,
  backgroundColor: '#000',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.WIDTH_CONTROLS_HEIGHT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 400 }
    }
  }
};
