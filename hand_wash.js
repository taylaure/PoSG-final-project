let washScene = new Phaser.Scene('Wash');

washScene.init = function(){
  let count = 0;
};

washScene.preload = function(){

  this.load.image('soap', 'assets/soap2.png');
  this.load.image('towel', 'assets/towel.png');
  this.load.image('sink', 'assets/sink2.png');
  this.load.image('bath_background', 'assets/bath_background.png');
  this.load.image('hands', 'assets/hands.png');
  this.load.image('hit-box', 'assets/hit-box.png');
  this.load.image('speech', 'assets/speech-bubble.png');
  this.load.image('back_button', 'assets/back_button.png');
  this.load.image('msgBox', 'assets/msgBox.png');



};

washScene.create = function(){



  let background = this.add.sprite(0,0, 'bath_background');

  background.setScale(3.3);

  background.setOrigin(0,0);
  background.depth = -10;
  background.width = config.width;
  background.height = config.height;

  this.sink = this.add.sprite(400, 450, 'sink');

  this.sink.setScale(.8);

  this.towel = this.add.sprite(125, 350, 'towel');

  this.towel.setScale(.7)


  this.hands = this.add.sprite(0,600, 'hands').setInteractive();

  this.hands.setScale(.2);

  this.soap = this.add.sprite(575, 375, 'soap').setInteractive();

  this.soap.setScale(.2);

  this.hit_box = this.add.sprite(525,375, 'hit-box');

  this.hit_box.setScale(.2);

  this.hit_box.setAlpha(0);

  this.msg_box = this.add.sprite(610, 75, 'msgBox').setScale(.5);


  this.input.setDraggable(this.soap);

  this.input.setDraggable(this.hands);

  this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

        gameObject.x = dragX;
        gameObject.y = dragY;

    });

  gameIntro();

  soapPrompt();

  rinsePrompt();

  dryPrompt();

  finalPrompt();



  //intro.destroy();



};

washScene.update = function(time, delta){

  let handsRect = this.hands.getBounds();

  let contRect = this.hit_box.getBounds();

  let soapRect = this.soap.getBounds();

  if (Phaser.Geom.Intersects.RectangleToRectangle(handsRect, contRect)) {



  }

  if (Phaser.Geom.Intersects.RectangleToRectangle(handsRect, soapRect)) {



  }





};

function gameIntro(){

  let intro = washScene.add.text(450, 36, "Oh No! You've touched a bacteria! \nUse the following instructions to \nwash your hands.", {
    font: '20px Lucida Sans Unicode',
    fill: '#00000'
  });

  washScene.time.addEvent({
  delay: 9000,
  callback: ()=>{
      // spawn a new apple
    intro.destroy();

    let line2 = washScene.add.text(450, 36, "First, use the sink to wet your hands!", {
      font: '20px Lucida Sans Unicode',
      fill: '#00000'
    });
      washScene.time.addEvent({
      delay: 9000,
      callback: ()=>{
          // spawn a new apple

        line2.destroy();
      },
      loop: false
      })
  },
  loop: false
  })

}

function soapPrompt(){
  washScene.time.addEvent({
  delay: 18000,
  callback: ()=>{
      // spawn a new apple

      let text = washScene.add.text(450, 36, "Good Job! Now we must get some soap! \nPick up the soap next to the sink and \nrub it on your hands!", {
        font: '20px Lucida Sans Unicode',
        fill: '#00000'
      });

      washScene.time.addEvent({
      delay: 15000,
      callback: ()=>{
          // spawn a new apple

        text.destroy();
      },
      loop: false
      })

  },
  loop: false
  })
}

function rinsePrompt(){
  washScene.time.addEvent({
  delay: 33000,
  callback: ()=>{
      // spawn a new apple

      let text = washScene.add.text(450, 36, "Excellent! Now need to rinse our hands! \nPlace your hands back \nunder the sink.", {
        font: '20px Lucida Sans Unicode',
        fill: '#00000'
      });

      washScene.time.addEvent({
      delay: 9000,
      callback: ()=>{
          // spawn a new apple

        text.destroy();
      },
      loop: false
      })

  },
  loop: false
  })
}

function dryPrompt(){
  washScene.time.addEvent({
  delay: 42000,
  callback: ()=>{

      let text = washScene.add.text(450, 36, "Amazing! You're almost done! Now use \nthe towel to dry your hands.", {
        font: '20px Lucida Sans Unicode',
        fill: '#00000'
      });

      washScene.time.addEvent({
      delay: 9000,
      callback: ()=>{

        text.destroy();
      },
      loop: false
      })

  },
  loop: false
  })
}

function finalPrompt(){
  washScene.time.addEvent({
  delay: 51000,
  callback: ()=>{
      // spawn a new apple

      let text = washScene.add.text(450, 36, "Yay! I knew you could do it! \nClick the button to start your journey.", {
        font: '20px Lucida Sans Unicode',
        fill: '#00000'
      });

      var back_button = washScene.add.sprite(700, 110, 'back_button').setScale(0.1);

      back_button.setInteractive();

      back_button.on('pointerdown', function(){
          washScene.scene.start('Game');
      }, washScene);
  },
  loop: false
  })
}
