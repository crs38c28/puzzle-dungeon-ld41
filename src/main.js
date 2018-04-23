import 'phaser';
import BootScene from './BootScene';
import GameScene from './GameScene';
import SelectScene from './SelectScene';
import EndScene from './EndScene';
let config = {
    type: Phaser.WEBGL,
    parent: 'content',
    width: 1080,
    height: 700,
    scaleMode: 0, //Phaser.ScaleManager.EXACT_FIT,
    //transparent: true,
    backgroundColor: 0x202020,
    audio: {
      disableWebAudio: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [
        BootScene,
        SelectScene,
        GameScene,
        EndScene,
    ]
};

let game = new Phaser.Game(config);
