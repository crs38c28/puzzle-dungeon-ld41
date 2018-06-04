
class BootScene extends Phaser.Scene {
    constructor(test) {
      super({
        key: 'BootScene'
      });
    }
    preload()
    {
      this.load.audio('hit', ['assets/sound/hit.ogg']);
      this.load.audio('powerup', ['assets/sound/powerup.ogg']);  
      this.load.audio('c1', ['assets/sound/c1.ogg']);
      this.load.audio('c2', ['assets/sound/c2.ogg']);
      this.load.audio('c3', ['assets/sound/c3.ogg']);
      this.load.audio('c4', ['assets/sound/c4.ogg']);
      this.load.audio('c5', ['assets/sound/c5.ogg']);
      this.load.audio('c6', ['assets/sound/c6.ogg']);
      this.load.audio('c7', ['assets/sound/c7.ogg']);
      this.load.atlas('puzzle', 'assets/puzzle-tile.png', 'assets/puzzle-tile.json');
      this.load.atlas('chara', 'assets/character.png', 'assets/character.json');
      this.load.atlas('skill', 'assets/skill.png', 'assets/skill.json');
      this.load.atlas('job', 'assets/job.png', 'assets/job.json');
      this.load.image('battlebg', 'assets/battlebg.png');
      this.load.image('stonebg', 'assets/stonebg.png');
      this.load.image('bg', 'assets/overlay.png');
      this.load.image('classlayout', 'assets/classlayout.png');
      this.load.image('Slime_ult', 'assets/slime_ult.png');
      this.load.image('Octopus_ult', 'assets/octopus_ult.png');
    }
    create()
    {
      this.scene.start('SelectScene');
    }
}

export default BootScene;
