class PCharacter{
  constructor(job,boss) {
    this.skilltext ='';
    this.pic ='';
    this.bosspic ='';
    this.HPtext= "";
    this.AMtext= "";
    this.BOSStext= "";
    this.BOSSult= "";
    this.BOSSultBOOL= false;
    switch(job){
      case 1: //Sword Master
        this.jobnum =1;
        this.job = 'SwordMaster';
        this.status ={
          'AM':0,
          'HP':25,
          'HP_MAX':20,
          'AR':3,
          'MR':1,
        };
        break;
      case 2: //Paladin
        this.jobnum =2;
        this.job = 'Paladin';
        this.status ={
          'AM':0,
          'HP':20,
          'HP_MAX':20,
          'AR':2,
          'MR':2,
        };
        break;
      case 3: // Magician
        this.jobnum =3;
        this.job = 'Mage';
        this.status ={
          'AM':0,
          'HP':25,
          'HP_MAX':20,
          'AR':1,
          'MR':3,
        };
        break;
      case 4: //Priest
        this.jobnum =4;
        this.job = 'Priest';
        this.status ={
          'AM':0,
          'HP':30,
          'HP_MAX':30,
          'AR':0,
          'MR':0,
        };
        break;
    }
    switch(boss){
      case 1:
        this.bossnum = 1;
        this.boss = 'Slime';
        this.boss_status ={
          'CD':5,
          'ULT':0,
          'AD':5,
          'AP':0,
          'HP':30,
          'AR':0,
          'MR':0,
        };
        break;
      case 2:
        this.bossnum = 2;
        this.boss = 'Octopus';
        this.boss_status ={
          'CD':5,
          'ULT':0,
          'AD':0,
          'AP':6,
          'HP':40,
          'AR':1,
          'MR':1,
        };
        break;
    }
  }
  create(scene){
    this.pic = scene.add.image(550, 100, 'chara', this.job).setOrigin(0, 0).setFlipX(true);
    this.bosspic = scene.add.image(780, 120, 'chara', this.boss).setOrigin(0, 0).setFlipX(true);
    this.skilltext = scene.add.text(530, 80, '', { fontFamily: 'Pixel', fontSize: 25, color: '#f01d1d' }).setStroke('#000000', 10).setAlpha(0);
    this.HPtext = scene.add.text(590, 255, this.status['HP'], { fontFamily: 'Pixel', fontSize: 16, color: '#AE1212' });
    this.AMtext = scene.add.text(655, 255, '00', { fontFamily: 'Pixel', fontSize: 16, color: '#1E3A6C' });
    this.BOSStext = scene.add.text(837, 255, this.boss_status['HP'], { fontFamily: 'Pixel', fontSize: 16, color: '#AE1212' });
    this.BOSSult = scene.add.image(0, 0, this.boss+'_ult').setOrigin(0, 0).setAlpha(0);
  }
}

export{
  PCharacter
}
