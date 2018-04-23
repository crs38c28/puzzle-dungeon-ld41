import * as PuzzleLib from './PuzzleLib.js';
import * as Skill from './Skill.js';
import * as Character from './Character.js';
var Chara;
var time_CD,CD_text;
var select_job,select_boss;

class GameScene extends Phaser.Scene {
  constructor(test) {
    super({
      key: 'GameScene',
      audio: {
          disableWebAudio: true
      }
    });
  }
  init(data)
  {
    select_job = data.job;
    select_boss = data.boss;
    Chara = new Character.PCharacter(select_job,select_boss);
    app.log.push("You Select " + Chara.job + " VS. " + Chara.boss);
    time_CD = Chara.boss_status['CD'];
  }
  preload() {

  }
  create() {
    this.input.keyboard.removeAllListeners();
    this.add.image(480, 84, 'battlebg').setOrigin(0, 0);
    //create stage field
    PuzzleLib.puzzleinit(this,select_job);
    this.add.image(0, 0, 'bg').setOrigin(0, 0);
    CD_text = this.add.text(687, 45, 'CD:'+time_CD, { fontFamily: 'Pixel', fontSize: 20, color: '#ffffff' }).setStroke('#000000', 10);
    Chara.create(this);
    Skill.meter_text_init(this,Chara);
    this.input.keyboard.on('keydown_UP', (event) => {
      PuzzleLib.SetMatrixRotate();
    });
    this.input.keyboard.on('keydown_DOWN', (event) => {
      if((!PuzzleLib.FLAG_LOCK)&&(time_CD!==0)){
        PuzzleLib.SetMatrixMerge();
        PuzzleLib.ClearLineDetection(this.tweens,1,Skill.skillmeter);
        PuzzleLib.NextMatrixTiles(select_job);
        time_CD-=1;
        CD_text.setText('CD:'+time_CD);
      }
    });
    this.input.keyboard.on('keydown_LEFT', (event) => {
      if(PuzzleLib.matrixtiles[0][0].x!=PuzzleLib.base.x){
        PuzzleLib.Add_playerx((-1)*PuzzleLib.puzzlesize);
        PuzzleLib.SetMatrixPosition();
      }
    });
    this.input.keyboard.on('keydown_RIGHT', (event) => {
      if(PuzzleLib.matrixtiles[0][0].x!=PuzzleLib.base.x+4*PuzzleLib.puzzlesize){
        PuzzleLib.Add_playerx(PuzzleLib.puzzlesize);
        PuzzleLib.SetMatrixPosition();
      }
    });
  }

  update(time, delta) {
    if((!PuzzleLib.FLAG_LOCK)&&
      (PuzzleLib.stage[0][0]||PuzzleLib.stage[1][0]||
       PuzzleLib.stage[2][0]||PuzzleLib.stage[3][0]||
       PuzzleLib.stage[4][0]||PuzzleLib.stage[5][0])){
      this.scene.start('EndScene', { end: 0 });
    }
    if(Chara.status['HP'] <= 0){
      this.scene.start('EndScene', { end: 1 });
    }
    if(Chara.boss_status['HP'] <= 0){
      this.scene.start('EndScene', { end: 2 });
    }

    Skill.meter_text_update();
    if((Skill.skillmeter['physical']>=3)||(Skill.skillmeter['shield']>=3)||
      (Skill.skillmeter['magic']>=3)||(Skill.skillmeter['heal']>=3)){
      if(!Skill.FLAG_LOCK){
        Skill.skill_update();
      }
    }
    if((!PuzzleLib.FLAG_LOCK)&&(time_CD==0)){
      //boss attack!
      if(!Skill.FLAG_LOCK){
        Skill.boss_attack();
        this.cameras.main.shake(300);
        time_CD = Chara.boss_status['CD'];
        CD_text.setText('CD:'+time_CD);
      }
    }
  }
}
export default GameScene;
