var ending;
var FLAG_RESTART;
class EndScene extends Phaser.Scene {
  constructor(test) {
    super({
      key: 'EndScene'
    });
  }
  init(data)
  {
      ending = 1;
      ending = data.end;
  }
  preload()
  {
      
  }
  create()
  {
    FLAG_RESTART = false;
    this.add.image(0, 0, 'stonebg').setOrigin(0, 0);

    if(ending==2){
      this.add.text(390, 255, 'YOU  WIN!', { fontFamily: 'Pixel', fontSize: 40, color: '#f0f0f0' }).setStroke('#070A0F', 5);
    }else if(ending==0){
      this.add.text(390, 255, 'YOU LOSE.', { fontFamily: 'Pixel', fontSize: 40, color: '#AE1212' }).setStroke('#070A0F', 5);
    }else if(ending==1){
      this.add.text(390, 255, 'YOU DIED.', { fontFamily: 'Pixel', fontSize: 40, color: '#AE1212' }).setStroke('#070A0F', 5);
    }
    var start_text = this.add.text(430, 650, '[RESTART]', { fontFamily: 'Pixel', fontSize: 30, color: '#f0f0f0' }).setStroke('#070A0F', 5).setInteractive();
    start_text.on('pointerup', (pointer) => {
      FLAG_RESTART = true;
    });
  }
  update(time, delta)
  {
    if(FLAG_RESTART){
      this.scene.start('SelectScene',{restart: true}); 
    }
  }
}

export default EndScene;
