var matrix = [
[0,0],
[0,0]
];
var highlightbg,blackbg;
var FLAG_LOCK;
var base ={x:100 ,y:120 };
var playerx;
var puzzlesize = 40;
var puzzleCat=['nothing','physical','shield','magic','heal','lphysical','lshield','lmagic','lheal']
var matrix_arr;
var stage;
var stagetiles;
var matrixtiles;
var matrix_arrtiles;
var combo_text;
var csfx=[];


function SetMatrixMerge(){
  let pos = (matrixtiles[0][0].x - base.x)/puzzlesize;
  for(let x=0;x<2;x++){
    for(let y=11;y>=0;y--){
      if(stage[pos+x][y] === 0){
        if(y!=0){
          stage[pos+x][y-1] = matrix[x][0];
          stagetiles[pos+x][y-1].setFrame(puzzleCat[matrix[x][0]]);
        }
        stage[pos+x][y] = matrix[x][1];
        stagetiles[pos+x][y].setFrame(puzzleCat[matrix[x][1]]);
        break;
      }
    }
  }
}

function SetStageTiles(Tweens,combo,skillmeter){
  let FLAG_CLEAR = false;
  let tweens_arr = [];
  for(let x=0;x<6;x++){
    for(let y=0;y<12;y++){
      stagetiles[x][y].setFrame(puzzleCat[stage[x][y]]);
      if(stage[x][y]>=5){
        FLAG_CLEAR = true;
        stagetiles[x][y].setAlpha(0);
        tweens_arr.push(stagetiles[x][y]);
      }
    }
  }
  if(FLAG_CLEAR){
    combo_text.setText('Combo x '+combo);
    Tweens.add({
        targets: combo_text,
        alpha:{ value: 1, duration: 600, yoyo: false },
        y:{ value: "-=20", duration: 600, yoyo: false },
        scaleX: { value: 1+combo*0.2, duration: 600, yoyo: false },
        scaleY: { value: 1+combo*0.2, duration: 600, yoyo: false },
        ease: 'Power1',
        repeat: 0,
        onComplete: () => {
          combo_text.setAlpha(0);
          combo_text.setScale(1);
          combo_text.setY(200);
        }
    });
    Tweens.add({
        targets: tweens_arr,
        alpha:{ value: "1", duration: 200, yoyo: false },
        ease: 'Power1',
        repeat: 2,
        onComplete: () => {
          for(let x=0;x<6;x++){
             stage[x] = stage[x].filter(puzzle => puzzle < 5);
              while(stage[x].length<12){
                stage[x].unshift(0);
              }
          }
          SetStageTiles(Tweens);
          ClearLineDetection(Tweens,combo+1,skillmeter);
        }
    });
    if(combo>7){
      csfx[7].play();
    }else{
      csfx[combo].play();
    }
    
  }
}

function ClearLineDetection(Tweens,combo,skillmeter){
  FLAG_LOCK = true;
  let clear = false;
  //init result
  // [attack,shield,magic,heal]
  let result = [0,0,0,0];
  let newstage = stage.map(function(arr) {
      return arr.slice();
  });
  
  // row
  for(let x=0;x<4;x++){
    for(let y=0;y<12;y++){
      if(stage[x][y] === 0){
        continue;
      }
      if((stage[x][y] === stage[x+1][y])&&(stage[x+1][y] === stage[x+2][y])){
        clear = true;
        newstage[x][y] = stage[x][y]+4;
        newstage[x+1][y] = stage[x][y]+4;
        newstage[x+2][y] = stage[x][y]+4;
        result[stage[x][y]-1]+=combo;
      }
    }
  }
  // column
  for(let x=0;x<6;x++){
    for(let y=0;y<10;y++){
      if(stage[x][y] === 0){
        continue;
      }
      if((stage[x][y]==stage[x][y+1])&&(stage[x][y+1]==stage[x][y+2])){
        clear = true;
        newstage[x][y] = stage[x][y]+4;
        newstage[x][y+1] = stage[x][y]+4;
        newstage[x][y+2] = stage[x][y]+4;
        result[stage[x][y]-1]+=combo;
      }
    }
  }
  // slash
  for(let x=2;x<6;x++){
    for(let y=0;y<10;y++){
      if(stage[x][y] === 0){
        continue;
      }
      if((stage[x][y]==stage[x-1][y+1])&&(stage[x-1][y+1]==stage[x-2][y+2])){
        clear = true;
        newstage[x][y] = stage[x][y]+4;
        newstage[x-1][y+1] = stage[x][y]+4;
        newstage[x-2][y+2] = stage[x][y]+4;
        result[stage[x][y]-1]+=combo;
      }
    }
  }
  // back-slash
  for(let x=0;x<4;x++){
    for(let y=0;y<10;y++){
      if(stage[x][y] === 0){
        continue;
      }
      if((stage[x][y]==stage[x+1][y+1])&&(stage[x+1][y+1]==stage[x+2][y+2])){
        clear = true;
        newstage[x][y] = stage[x][y]+4;
        newstage[x+1][y+1] = stage[x][y]+4;
        newstage[x+2][y+2] = stage[x][y]+4;
        result[stage[x][y]-1]+=combo;
      }
    }
  }
  if(clear){
    stage.length = 0;
    stage = newstage;
    skillmeter['physical']+=result[0];
    skillmeter['shield']+=result[1];
    skillmeter['magic']+=result[2];
    skillmeter['heal']+=result[3];
    SetStageTiles(Tweens,combo,skillmeter);
  }else{
    FLAG_LOCK = false;
  }
}

function SetMatrixTiles(){
  for(let x=0;x<2;x++){
    for(let y=0;y<2;y++){
      matrixtiles[x][y].setFrame(puzzleCat[matrix[x][y]]);
    }
  }
  for(let set=0;set<4;set++){
    let setp ={x:base.x+7*puzzlesize,y:base.y+(set)*(3*puzzlesize)}
    for(let x=0;x<2;x++){
      for(let y=0;y<2;y++){
        matrix_arrtiles[set][x][y].setFrame(puzzleCat[matrix_arr[set][x][y]]); 
      }
    }
  }
}

function NextMatrixTiles(job){
  matrix.length = 0;
  matrix = matrix_arr.shift();
  let tmp = [[0,0],[0,0]]
  for(let x=0;x<2;x++){
    for(let y=0;y<2;y++){
      let num = Math.floor(Math.random()*5)+1;
      if(num ===5){num=job;}
      tmp[x][y]=num;
    }
  }
  matrix_arr.push(tmp);
  SetMatrixTiles();
}

function SetMatrixRotate(){
  let temp = matrix[0][0];
  matrix[0][0] = matrix[0][1];
  matrix[0][1] = matrix[1][1];
  matrix[1][1] = matrix[1][0];
  matrix[1][0] = temp;
  SetMatrixTiles();
}

function SetMatrixPosition(){
  for(let x=0;x<2;x++){
    for(let y=0;y<2;y++){
      matrixtiles[x][y].setPosition(playerx+x*puzzlesize, base.y+(y-2)*puzzlesize);
    }
  }
  highlightbg.setPosition(playerx,base.y);
}

function stagecreate(scene){
    blackbg = scene.add.image(base.x, base.y, 'puzzle', 'black').setOrigin(0, 0).setScale(6*puzzlesize/60,13*puzzlesize/60);
    highlightbg = scene.add.image(playerx, base.y, 'puzzle', 'highlight').setOrigin(0, 0).setScale(2*puzzlesize/60,13*puzzlesize/60).setAlpha(0.3);
}

function Add_playerx(num){
  playerx+=num;
}

function puzzleinit(scene,job){
  playerx = 100;
  FLAG_LOCK=false;
  matrix_arr = [[[0,0],[0,0]],[[0,0],[0,0]],[[0,0],[0,0]],[[0,0],[0,0]]];
  stage = [
  [0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0]
  ];
  stagetiles=[[],[],[],[],[],[],[],[],[],[],[],[]];
  matrixtiles=[[],[]];
  matrix_arrtiles=[[[0,0],[0,0]],[[0,0],[0,0]],[[0,0],[0,0]],[[0,0],[0,0]]];
  csfx[0] = scene.sound.add('c1');
  csfx[1] = scene.sound.add('c1');
  csfx[2] = scene.sound.add('c2');
  csfx[3] = scene.sound.add('c3');
  csfx[4] = scene.sound.add('c4');
  csfx[5] = scene.sound.add('c5');
  csfx[6] = scene.sound.add('c6');
  csfx[7] = scene.sound.add('c7');
  stagecreate(scene);
  // Set Player Matrix Value
  for(let x=0;x<2;x++){
    for(let y=0;y<2;y++){
      let num = Math.floor(Math.random()*5)+1;
      if(num ===5){num=job;}
      matrix[x][y]=num;
    }
  }
  // Set NEXT Matrix Value
  for(let set=0;set<4;set++){
    for(let x=0;x<2;x++){
      for(let y=0;y<2;y++){
        let num = Math.floor(Math.random()*5)+1;
        if(num ===5){num=job;}
        matrix_arr[set][x][y]=num;
      }
    }
  }
  //init puzzle tiles
  for(let x=0;x<6;x++){
    for(let y=0;y<12;y++){
      stagetiles[x][y] = scene.add.image(base.x+x*puzzlesize, base.y+y*puzzlesize, 'puzzle', puzzleCat[stage[x][y]]).setOrigin(0, 0).setScale(puzzlesize/60);
    }
  }
  for(let x=0;x<2;x++){
    for(let y=0;y<2;y++){
      matrixtiles[x][y] = scene.add.image(playerx+x*puzzlesize, base.y+(y-2)*puzzlesize, 'puzzle', puzzleCat[matrix[x][y]]).setOrigin(0, 0).setScale(puzzlesize/60);
    }
  }
  for(let set=0;set<4;set++){
    let setp ={x:base.x+7*puzzlesize,y:base.y+(set)*(3*puzzlesize)}
    for(let x=0;x<2;x++){
      for(let y=0;y<2;y++){
        matrix_arrtiles[set][x][y]=scene.add.image(setp.x+x*puzzlesize, setp.y+y*puzzlesize, 'puzzle', puzzleCat[matrix_arr[set][x][y]]).setOrigin(0, 0).setScale(puzzlesize/60); 
      }
    }
  }
  // cross
  for(let x=0;x<6;x++){
      scene.add.image(base.x+x*puzzlesize, base.y, 'puzzle', 'cross').setOrigin(0, 0).setScale(puzzlesize/60);
  }
  //init
  combo_text = scene.add.text(120, 200, 'Combo x1', { fontFamily: 'Pixel', fontSize: 15, color: '#ffff00' }).setStroke('#000000', 10).setAlpha(0);
}

export {
  FLAG_LOCK,
  matrix,matrix_arr,
  puzzleCat,puzzlesize,
  stage,stagetiles,
  matrixtiles,matrix_arrtiles,
  highlightbg,blackbg,
  base,playerx,
  Add_playerx,
  SetMatrixMerge,
  SetStageTiles,
  ClearLineDetection,
  SetMatrixTiles,
  NextMatrixTiles,
  SetMatrixRotate,
  SetMatrixPosition,
  stagecreate,
  puzzleinit
};