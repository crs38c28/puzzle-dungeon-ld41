var FLAG_START;
var job_value,boss_value;
class SelectScene extends Phaser.Scene {
  constructor(test) {
    super({
      key: 'SelectScene'
    });
  }
  init(data){
    job_value = 1;
    boss_value = 1;
    FLAG_START = false;
  }
  preload()
  {
      
  }
  create()
  {
    this.add.image(0, 0, 'stonebg').setOrigin(0, 0);
    this.add.image(0, 0, 'classlayout').setOrigin(0, 0);
    var job_select=[];
    var boss_select=[];
    this.add.text(230, 75, 'Class', { fontFamily: 'Pixel', fontSize: 30, color: '#f0f0f0' }).setStroke('#070A0F', 20);
    this.add.text(750, 75, 'Boss', { fontFamily: 'Pixel', fontSize: 30, color: '#f0f0f0' }).setStroke('#070A0F', 20);
    job_select[0] = this.add.image(95, 155, 'job', 'SwordMaster').setOrigin(0, 0).setInteractive();
    job_select[1] = this.add.image(95, 260, 'job', 'Paladin').setOrigin(0, 0).setInteractive();
    job_select[2] = this.add.image(198, 155, 'job', 'Mage').setOrigin(0, 0).setInteractive();
    job_select[3] = this.add.image(198, 260, 'job', 'Priest').setOrigin(0, 0).setInteractive();
    boss_select[0] = this.add.image(720, 155, 'job', 'Slime').setOrigin(0, 0).setInteractive();
    boss_select[1] = this.add.image(823, 155, 'job', 'Octopus').setOrigin(0, 0).setInteractive();
    var select_pic = this.add.image(100, 400, 'chara', 'SwordMaster').setOrigin(0, 0).setScale(1.5).setFlipX(true);
    var boss_select_pic = this.add.image(720, 400, 'chara', 'Slime').setOrigin(0, 0).setScale(1.5);
    var classname = this.add.text(344, 165, '[Info]', { fontFamily: 'Pixel', fontSize: 16, color: '#f0f0f0' }).setStroke('#070A0F', 5);
    var class_text = this.add.text(344, 205, 'HP: Health\n\nAD: Physical\n    Damage\n\nAP: Magic\n    Damage\n\nAR: Physical\n  Resistance\n\nMR: Magic\n  Resistance\n\nHL: Heal\n    Amount', { fontFamily: 'Pixel', fontSize: 16, color: '#f0f0f0' }).setStroke('#070A0F', 5);
    var q_text = this.add.text(385, 585, '[info]', { fontFamily: 'Pixel', fontSize: 16, color: '#f0f0f0' }).setStroke('#070A0F', 5).setInteractive();
    var start_text = this.add.text(450, 650, '[START]', { fontFamily: 'Pixel', fontSize: 30, color: '#f0f0f0' }).setStroke('#070A0F', 5).setInteractive();
    q_text.on('pointerup', function (pointer) {
      classname.setText('[Info]');
      class_text.setText('HP: Health\n\nAD: Physical\n    Damage\n\nAP: Magic\n    Damage\n\nAR: Physical\n  Resistance\n\nMR: Magic\n  Resistance\n\nHL: Heal\n    Amount');
    });
    boss_select[0].on('pointerup', function (pointer) {
      boss_value = 1;
      boss_select_pic.setFrame('Slime');
    });
    boss_select[1].on('pointerup', function (pointer) {
      boss_value = 2;
      boss_select_pic.setFrame('Octopus');
    });   
    job_select[0].on('pointerup', function (pointer) {
      job_value = 1;
      select_pic.setFrame('SwordMaster');
      classname.setText('Sword Master');
      class_text.setText('HP:@@@@OO\n\nAD:@@@@@@\n\nAP:@@@OOO\n\nAR:@@@@OO\n\nMR:@@OOOO\n\nHL:@@@OOO');
    });
    job_select[1].on('pointerup', function (pointer) {
        job_value = 2;
      select_pic.setFrame('Paladin');
      classname.setText('   Paladin');
      class_text.setText('HP:@@@OOO\n\nAD:@@@OOO\n\nAP:@@@OOO\n\nAR:@@@@OO\n\nMR:@@@@OO\n\nHL:@@@OOO');
    });
    job_select[2].on('pointerup', function (pointer) {
      job_value = 3;
      select_pic.setFrame('Mage');
      classname.setText('    Mage');
      class_text.setText('HP:@@@@OO\n\nAD:@@@OOO\n\nAP:@@@@@@\n\nAR:@@OOOO\n\nMR:@@@@OO\n\nHL:@@@OOO');
    });
    job_select[3].on('pointerup', function (pointer) {
      job_value = 4;
      select_pic.setFrame('Priest');
      classname.setText('   Priest');
      class_text.setText('HP:@@@@@@\n\nAD:@@@OOO\n\nAP:@@@OOO\n\nAR:OOOOOO\n\nMR:OOOOOO\n\nHL:@@@@@@');
    });
    start_text.on('pointerup', (pointer) => {
      FLAG_START = true;
    });
  }
  update(time, delta)
  {
    if(FLAG_START){
      this.scene.start('GameScene', { job: job_value,boss:boss_value});
    }
  }
}

export default SelectScene;
