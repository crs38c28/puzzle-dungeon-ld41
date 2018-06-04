var skillmeter = {
  'physical':0,'physical_text':'','physical_addtext':'',
  'shield':0,'shield_text':'','shield_addtext':'',
  'magic':0,'magic_text':'','magic_addtext':'',
  'heal':0,'heal_text':'','heal_addtext':''
};
var healpic,defendpic;
var addtext_arr;
var FLAG_LOCK=false;
var Tweens,character;
var sfx = [];

function add_value(value){
  for(let i=0;i<4;i++){
    if(value[i]<0){
      addtext_arr[i].setText(''+value[i]);
    }else if(value[i]>0){
      addtext_arr[i].setText('+'+value[i]);
    }else if(value[i] === 0){
      addtext_arr[i].setText('');
    }
    Tweens.add({
      targets: addtext_arr[i],
      alpha: { value: 1, duration: 1200, yoyo: false },
      y: { value: "-=50", duration: 1200, yoyo: false },
      ease: 'Sine.easeInOut',
      repeat: 0,
      onComplete: () => {
          addtext_arr[i].setText('');
          addtext_arr[i].setAlpha(0);
          addtext_arr[i].setY(382);
      }
    });
  }
}
function yell(){
  Tweens.add({
    targets: character.skilltext,
    alpha: { value: 1, duration: 1200, yoyo: false },
    y: { value: "-=50", duration: 1200, yoyo: false },
    ease: 'Sine.easeInOut',
    repeat: 0,
    onComplete: () => {
        character.skilltext.setAlpha(0);
        character.skilltext.setY(80);
    }
  });
}
function boss_attack(){
  FLAG_LOCK=true;
  let PD = character.boss_status['AD'] - character.status['AR'];
  if(PD < 0){ PD=0; }
  let MD = character.boss_status['AP'] - character.status['MR'];
  if(MD < 0){ MD=0; }
  character.status['AM'] -= (PD + MD);
  if(character.status['AM'] < 0){
    character.status['HP'] += character.status['AM'];
    vueapp.log.push("[Boss Attack] You Lose "+(character.status['AM']*-1)+" HP");
    character.status['AM'] = 0;
  }else{
    vueapp.log.push("[Boss Attack] You use your armor to defend it.");
  }
  if(character.status['HP']>=10){
    character.HPtext.setText(''+character.status['HP']);
  }else if(character.status['HP']>=0){
    character.HPtext.setText('0'+character.status['HP']);
  }else{
    character.HPtext.setText('00');
  }
  if(character.status['AM']>=10){
    character.AMtext.setText(character.status['AM']);
  }else{
    character.AMtext.setText('0'+character.status['AM']);
  }
  
  sfx[0].play();
  Tweens.add({
    targets: character.bosspic,
    flipX: { value: false, duration: 600, yoyo: true },
    x: { value: "-=100", duration: 600, yoyo: true },
    ease: 'Sine.easeInOut',
    repeat: 0,
    onComplete: () => {
        character.bosspic.setFlipX(true);
        FLAG_LOCK=false;
    }
  });
  Tweens.add({
    targets: character.pic,
    alpha: { value: 0, duration: 400, yoyo: false },
    ease: 'Sine.easeInOut',
    repeat: 2,
    onComplete: () => {
        character.pic.setAlpha(1);
    }
  });
}
function attack(){
  FLAG_LOCK=true;
  sfx[0].play();
  yell();
  Tweens.add({
    targets: character.pic,
    flipX: { value: false, duration: 600, yoyo: true },
    x: { value: "+=100", duration: 600, yoyo: true },
    ease: 'Sine.easeInOut',
    repeat: 0,
    onComplete: () => {
        character.pic.setFlipX(true);
        FLAG_LOCK=false;
    }
  });
  Tweens.add({
    targets: character.bosspic,
    alpha: { value: 0, duration: 400, yoyo: false },
    ease: 'Sine.easeInOut',
    repeat: 2,
    onComplete: () => {
        character.bosspic.setAlpha(1);
    }
  });
  if((character.boss_status['HP']<=15)&&(!character.BOSSultBOOL)){
    character.BOSSultBOOL = true;
    vueapp.log.push("[!ULTIMATE!] "+character.boss+" is so angry! He used his ultimate skill! Watch out!");
    Tweens.add({
      targets: character.BOSSult,
      alpha: { value: 1, duration: 2000, yoyo: false },
      ease: 'Sine.easeInOut',
      repeat: 0,
      onComplete: () => {
          character.BOSSult.setAlpha(1);
          character.bosspic.setTint(0xf01d1d)
      }
    });
  }
  if(character.boss_status['HP']>=10){
    character.BOSStext.setText(character.boss_status['HP']);
  }else if(character.boss_status['HP']>=0){
    character.BOSStext.setText('0'+character.boss_status['HP']);
  }else{
    character.BOSStext.setText('00');
  }
}

function defend(){
  FLAG_LOCK=true;
  sfx[2].play();
  yell();
  Tweens.add({
    targets: defendpic,
    alpha: { value: 1, duration: 400, yoyo: false },
    y: { value: "-=20", duration: 400, yoyo: true },
    ease: 'Sine.easeInOut',
    repeat: 1,
    onComplete: () => {
        defendpic.setY(100);
        defendpic.setAlpha(0);
        FLAG_LOCK=false;
    }
  });
  if(character.status['AM']>=10){
    character.AMtext.setText(character.status['AM']);
  }else{
    character.AMtext.setText('0'+character.status['AM']);
  }
}
function healing(){
  FLAG_LOCK=true;
  sfx[2].play();
  yell();
  Tweens.add({
    targets: healpic,
    alpha: { value: 1, duration: 1200, yoyo: false },
    y: { value: "-=60", duration: 1200, yoyo: false },
    ease: 'Sine.easeInOut',
    repeat: 0,
    onComplete: () => {
        healpic.setY(130);
        healpic.setAlpha(0);
        FLAG_LOCK=false;
    }
  });
  if(character.status['HP']>=10){
    character.HPtext.setText(character.status['HP']);
  }else if(character.boss_status['HP']>=0){
    character.HPtext.setText('0'+character.status['HP']);
  }else{
    character.HPtext.setText('00');
  }
}

function skill_update(){
  FLAG_LOCK=true;
  switch(character.job) {
    case 'SwordMaster':
      if(skillmeter['physical']>=4){
        character.skilltext.setText('Starbust Sword ! ! !');
        skillmeter['physical']-=4;
        add_value([-4,0,0,0]);
        character.boss_status['HP'] = character.boss_status['HP']-(7-character.boss_status['AR']);
        attack();
        vueapp.log.push("[ATTACK] You use Starbust Sword! Deal "+(7-character.boss_status['AR'])+" physical damage");
      }
      else if(skillmeter['shield']>=5){
        character.skilltext.setText('Armor Guard');
        skillmeter['shield']-=5;
        add_value([0,-5,0,0]);
        character.status['AM'] += 3;
        defend();
        vueapp.log.push("[DEFEND] You use Armor Guard! Get 3 armor.");
      }
      else if(skillmeter['magic']>=5){
        character.skilltext.setText('Howl ! !');
        skillmeter['magic']-=5;
        add_value([0,0,-5,0]);
        character.boss_status['HP'] = character.boss_status['HP']-(4-character.boss_status['MR']);
        attack();
        vueapp.log.push("[ATTACK] You use Howl! Deal "+(4-character.boss_status['MR'])+" magic damage.");
      }
      else if(skillmeter['heal']>=5){
        character.skilltext.setText('Healing Potion');
        skillmeter['heal']-=5;
        add_value([0,0,0,-5]);
        character.status['HP'] +=3;
        if(character.status['HP']>character.status['HP_MAX']){
          character.status['HP']=character.status['HP_MAX'];
        }
        healing();
        vueapp.log.push("[HEAL] You use potion! Heal 3 HP.");
      }
      else if((skillmeter['physical']>=3)&&(skillmeter['heal']>=3)){
        character.skilltext.setText('Life Steal Slash ! !');
        skillmeter['physical']-=3;
        skillmeter['heal']-=3;
        add_value([-3,0,0,-3]);
        character.boss_status['HP'] = character.boss_status['HP']-(4-character.boss_status['AR']);
        character.status['HP'] +=2;
        if(character.status['HP']>character.status['HP_MAX']){
          character.status['HP']=character.status['HP_MAX'];
        }
        attack();
        healing();
        vueapp.log.push("[ATTACK/HEAL] You use Life Steal Slash ! Deal "+(4-character.boss_status['AR'])+" physical damage. Heal 2 HP.");
      }
      else if((skillmeter['physical']>=3)&&(skillmeter['shield']>=3)){
        character.skilltext.setText('Shield Smash ! !');
        skillmeter['physical']-=3;
        skillmeter['shield']-=3;
        add_value([-3,-3,0,0]);
        character.boss_status['HP'] = character.boss_status['HP']-(4-character.boss_status['AR']);
        character.status['AM'] += 2;
        attack();
        defend();
        vueapp.log.push("[ATTACK/DEFEND] You use Shield Smash ! Deal"+(4-character.boss_status['AR'])+" physical damage. Get 2 Armor.");
      }
      else if((skillmeter['physical']>=3)&&(skillmeter['magic']>=3)){
        character.skilltext.setText('Ice Slash ! !');
        skillmeter['physical']-=3;
        skillmeter['magic']-=3;
        add_value([-3,0,-3,0]);
        character.boss_status['HP'] = character.boss_status['HP']-(5-character.boss_status['AR']);
        character.boss_status['HP'] = character.boss_status['HP']-(3-character.boss_status['MR']);
        attack();
        vueapp.log.push("[ATTACK] You use Ice Slash ! Deal "+(5-character.boss_status['AR'])+" physical damage and "+(3-character.boss_status['MR'])+" magic damage.");
      }
      else{
        FLAG_LOCK=false;
      }
      break;
    case 'Paladin':
      if(skillmeter['shield']>=4){
        character.skilltext.setText('Shield UP!');
        skillmeter['shield']-=4;
        add_value([0,-4,0,0]);
        character.status['AM'] += 5;
        defend();
        vueapp.log.push("[DEFEND] You use Shield UP! Get 5 armor.");
      }
      else if(skillmeter['physical']>=5){
        character.skilltext.setText('Holy Sword!');
        skillmeter['physical']-=5;
        add_value([-5,0,0,0]);
        character.boss_status['HP'] = character.boss_status['HP']-(4-character.boss_status['AR']);
        attack();
        vueapp.log.push("[ATTACK] You use Holy Sword! Deal "+(4-character.boss_status['AR'])+" physical damage");
      }
      else if(skillmeter['heal']>=5){
        character.skilltext.setText('Potion Heal');
        skillmeter['heal']-=5;
        add_value([0,0,0,-5]);
        character.status['HP'] +=3;
        if(character.status['HP']>character.status['HP_MAX']){
          character.status['HP']=character.status['HP_MAX'];
        }
        healing();
        vueapp.log.push("[HEAL] You use potion! Heal 3 HP.");
      }
      else if(skillmeter['magic']>=5){
        character.skilltext.setText('Holy Light!');
        skillmeter['magic']-=5;
        add_value([0,0,-5,0]);
        character.boss_status['HP'] = character.boss_status['HP']-(4-character.boss_status['MR']);
        attack();
        vueapp.log.push("[ATTACK] You use Holy Light! Deal "+(4-character.boss_status['MR'])+" magic damage.");
      }
      else if((skillmeter['shield']>=3)&&(skillmeter['heal']>=3)){
        character.skilltext.setText('Protection Shield');
        skillmeter['shield']-=3;
        skillmeter['heal']-=3;
        add_value([0,-3,0,-3]);
        character.status['AM'] += 3;
        character.status['HP'] +=2;
        if(character.status['HP']>character.status['HP_MAX']){
          character.status['HP']=character.status['HP_MAX'];
        }
        defend();
        healing();
        vueapp.log.push("[DEFEND/HEAL] You use Protection Shield! Get 3 armor. Heal 2 HP");
      }
      else if((skillmeter['shield']>=3)&&(skillmeter['physical']>=3)){
        character.skilltext.setText('Shield Attack');
        skillmeter['shield']-=3;
        skillmeter['physical']-=3;
        add_value([-3,-3,0,0]);
        character.status['AM'] += 2;
        character.boss_status['HP'] = character.boss_status['HP']-(3-character.boss_status['AR']);
        defend();
        attack();
        vueapp.log.push("[DEFEND/ATTACK] You use Shield Attack! Get 2 armor. Deal "+(3-character.boss_status['AR'])+" physical damage.");
      }
      else if((skillmeter['shield']>=3)&&(skillmeter['magic']>=3)){
        character.skilltext.setText('Shield Magic');
        skillmeter['shield']-=3;
        skillmeter['magic']-=3;
        add_value([0,-3,-3,0]);
        character.status['AM'] += 2;
        character.boss_status['HP'] = character.boss_status['HP']-(3-character.boss_status['MR']);
        defend();
        attack();
        vueapp.log.push("[DEFEND/ATTACK] You use Shield Magic! Get 2 armor. Deal "+(3-character.boss_status['MR'])+" magic damage.");
      }
      else{
        FLAG_LOCK=false;
      }
      break;
    case 'Mage':
      if(skillmeter['magic']>=4){
        character.skilltext.setText('Explosion! ! !');
        skillmeter['magic']-=4;
        add_value([0,0,-4,0]);
        character.boss_status['HP'] = character.boss_status['HP']-(7-character.boss_status['MR']);
        attack();
        vueapp.log.push("[ATTACK] You use Explosion! ! ! Deal "+(7-character.boss_status['MR'])+" magic damage.");
      }
      else if(skillmeter['physical']>=5){
        character.skilltext.setText('Staff Attack!');
        skillmeter['physical']-=5;
        add_value([-5,0,0,0]);
        character.boss_status['HP'] = character.boss_status['HP']-(4-character.boss_status['AR']);
        attack();
        vueapp.log.push("[ATTACK] You use Staff Attack! Deal "+(4-character.boss_status['AR'])+" physical damage");
      }
      else if(skillmeter['shield']>=5){
        character.skilltext.setText('Armor Guard');
        skillmeter['shield']-=5;
        add_value([0,-5,0,0]);
        character.status['AM'] += 3;
        defend();
        vueapp.log.push("[DEFEND] You use Armor Guard! Get 3 armor.");
      }
      else if(skillmeter['heal']>=5){
        character.skilltext.setText('Potion Heal');
        skillmeter['heal']-=5;
        add_value([0,0,0,-5]);
        character.status['HP'] +=3;
        if(character.status['HP']>character.status['HP_MAX']){
          character.status['HP']=character.status['HP_MAX'];
        }
        healing();
        vueapp.log.push("[HEAL] You use potion! Heal 3 HP.");
      }
      else if((skillmeter['magic']>=3)&&(skillmeter['heal']>=3)){
        character.skilltext.setText('Dark Magic!');
        skillmeter['magic']-=3;
        skillmeter['heal']-=3;
        add_value([0,0,-3,-3]);
        character.boss_status['HP'] = character.boss_status['HP']-(4-character.boss_status['MR']);
        character.status['HP'] +=2;
        if(character.status['HP']>character.status['HP_MAX']){
          character.status['HP']=character.status['HP_MAX'];
        }
        attack();
        healing();
        vueapp.log.push("[ATTACK/HEAL] You use Dark Magic! Deal "+(4-character.boss_status['MR'])+" magic damage. Heal 3 HP.");
      }
      else if((skillmeter['magic']>=3)&&(skillmeter['shield']>=3)){
        character.skilltext.setText('Magic shield!');
        skillmeter['magic']-=3;
        skillmeter['shield']-=3;
        add_value([0,-3,-3,0]);
        character.boss_status['HP'] = character.boss_status['HP']-(4-character.boss_status['MR']);
        character.status['AM'] += 2;
        attack();
        defend();
        vueapp.log.push("[ATTACK/DEFEND] You use Magic shield! Deal "+(4-character.boss_status['MR'])+" magic damage. Get 2 armor.");
      }
      else if((skillmeter['magic']>=3)&&(skillmeter['physical']>=3)){
        character.skilltext.setText('Magic sword!');
        skillmeter['magic']-=3;
        skillmeter['physical']-=3;
        add_value([-3,0,-3,0]);
        character.boss_status['HP'] = character.boss_status['HP']-(3-character.boss_status['AR']);
        character.boss_status['HP'] = character.boss_status['HP']-(5-character.boss_status['MR']);
        attack();
        vueapp.log.push("[ATTACK] You use Magic sword! Deal "+(3-character.boss_status['AR'])+" physical damage and "+(5-character.boss_status['MR'])+" magic damage.");
      }
      else{
        FLAG_LOCK=false;
      }
      break;
    case 'Priest':
      if(skillmeter['heal']>=4){
        character.skilltext.setText('Healing!');
        skillmeter['heal']-=4;
        add_value([0,0,0,-4]);
        character.status['HP'] +=6;
        if(character.status['HP']>character.status['HP_MAX']){
          character.status['HP']=character.status['HP_MAX'];
        }
        healing();
        vueapp.log.push("[HEAL] You use Healing! Heal 6 HP.");
      }
      else if(skillmeter['shield']>=5){
        character.skilltext.setText('Armor Guard!');
        skillmeter['shield']-=5;
        add_value([0,-5,0,0]);
        character.status['AM'] += 3;
        defend();
        vueapp.log.push("[DEFEND] You use Armor Guard! Get 3 armor.");
      }
      else if(skillmeter['magic']>=5){
        character.skilltext.setText('Light Magic!');
        skillmeter['magic']-=5;
        add_value([0,0,-5,0]);
        character.boss_status['HP'] = character.boss_status['HP']-(4-character.boss_status['MR']);
        attack();
        vueapp.log.push("[ATTACK] You use Light Magic! Deal "+(4-character.boss_status['MR'])+" magic damage.");
      }
      else if(skillmeter['physical']>=5){
        character.skilltext.setText('Light Sword!');
        skillmeter['physical']-=5;
        add_value([-5,0,0,0]);
        character.boss_status['HP'] = character.boss_status['HP']-(4-character.boss_status['AR']);
        vueapp.log.push("[ATTACK] You use Light Sword! Deal "+(4-character.boss_status['AR'])+" physical damage.");
        attack();
      }
      else if((skillmeter['heal']>=3)&&(skillmeter['shield']>=3)){
        character.skilltext.setText('Healing Shield!');
        skillmeter['shield']-=3;
        skillmeter['heal']-=3;
        add_value([0,-3,0,-3]);
        character.status['AM'] += 2;
        character.status['HP'] +=4;
        if(character.status['HP']>character.status['HP_MAX']){
          character.status['HP']=character.status['HP_MAX'];
        }
        healing();
        defend();
        vueapp.log.push("[HEAL/DEFEND] You use Healing Shield! Heal 3 HP. Get 3 armor.");
      }
      else if((skillmeter['heal']>=3)&&(skillmeter['physical']>=3)){
        character.skilltext.setText('Holy Water!');
        skillmeter['physical']-=3;
        skillmeter['heal']-=3;
        add_value([-3,0,0,-3]);
        character.boss_status['HP'] = character.boss_status['HP']-(3-character.boss_status['AR']);
        character.status['HP'] +=3;
        if(character.status['HP']>character.status['HP_MAX']){
          character.status['HP']=character.status['HP_MAX'];
        }
        attack();
        healing();
        vueapp.log.push("[HEAL/ATTACK] You use Holy Water! Heal 3 HP. Deal "+(3-character.boss_status['AR'])+" physical damage.");
      }
      else if((skillmeter['heal']>=3)&&(skillmeter['magic']>=3)){
        character.skilltext.setText('Holy Magic!');
        skillmeter['magic']-=3;
        skillmeter['heal']-=3;
        add_value([0,0,-3,-3]);
        character.boss_status['HP'] = character.boss_status['HP']-(3-character.boss_status['MR']);
        character.status['HP'] +=3;
        if(character.status['HP']>character.status['HP_MAX']){
          character.status['HP']=character.status['HP_MAX'];
        }
        attack();
        healing();
        vueapp.log.push("[HEAL/ATTACK] You use Holy Magic! Heal 3 HP. Deal "+(3-character.boss_status['MR'])+" magic damage.");
      }
      else{
        FLAG_LOCK=false;
      }
      break;
  }
}
function meter_text_init(scene,Chara){
  FLAG_LOCK=false;
  skillmeter = {
    'physical':0,'physical_text':'','physical_addtext':'',
    'shield':0,'shield_text':'','shield_addtext':'',
    'magic':0,'magic_text':'','magic_addtext':'',
    'heal':0,'heal_text':'','heal_addtext':''
  };
  Tweens = scene.tweens;
  character = Chara;
  sfx[0] = scene.sound.add('hit');
  sfx[1] = scene.sound.add('powerup');
  sfx[2] = scene.sound.add('powerup');
  skillmeter.physical_text = scene.add.text(541, 387, '0', { fontFamily: 'Pixel', fontSize: 25, color: '#ffffff' });
  skillmeter.shield_text = scene.add.text(661, 387, '0', { fontFamily: 'Pixel', fontSize: 25, color: '#ffffff' });
  skillmeter.magic_text = scene.add.text(781, 387, '0', { fontFamily: 'Pixel', fontSize: 25, color: '#ffffff' });
  skillmeter.heal_text = scene.add.text(901, 387, '0', { fontFamily: 'Pixel', fontSize: 25, color: '#ffffff' });
  skillmeter.physical_addtext = scene.add.text(525, 382, '+0', { fontFamily: 'Pixel', fontSize: 20, color: '#ffff00' }).setStroke('#000000', 10).setAlpha(0);
  skillmeter.shield_addtext = scene.add.text(645, 382, '+0', { fontFamily: 'Pixel', fontSize: 20, color: '#ffff00' }).setStroke('#000000', 10).setAlpha(0);
  skillmeter.magic_addtext = scene.add.text(765, 382, '+0', { fontFamily: 'Pixel', fontSize: 20, color: '#ffff00' }).setStroke('#000000', 10).setAlpha(0);
  skillmeter.heal_addtext = scene.add.text(885, 382, '+0', { fontFamily: 'Pixel', fontSize: 20, color: '#ffff00' }).setStroke('#000000', 10).setAlpha(0);
  addtext_arr = [skillmeter.physical_addtext,skillmeter.shield_addtext,skillmeter.magic_addtext,skillmeter.heal_addtext];
  healpic = scene.add.image(550, 130, 'skill', 'Heal').setOrigin(0, 0).setAlpha(0); 
  defendpic = scene.add.image(580, 100, 'skill', 'Shield').setOrigin(0, 0).setAlpha(0); 
}
function meter_text_update(){
  skillmeter.physical_text.setText(skillmeter['physical']);
  skillmeter.shield_text.setText(skillmeter['shield']);
  skillmeter.magic_text.setText(skillmeter['magic']);
  skillmeter.heal_text.setText(skillmeter['heal']);
}
export{
  skillmeter,
  skill_update,boss_attack,
  meter_text_init,
  meter_text_update,
  FLAG_LOCK
};
