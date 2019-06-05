let washScene = new Phaser.Scene('Wash');

washScene.init = function(){
  let count = 0;
};

washScene.preload = function(){
  console.log('preload: entered washing game');
  this.load.image('soap', 'assets/soap2.png');
  this.load.image('towel', 'assets/towel.png');
  this.load.image('sink', 'assets/sink2.png');
  this.load.image('bath_background', 'assets/bath_background.png');
  this.load.image('hands', 'assets/hands.png');
  this.load.image('hit-box', 'assets/hit-box.png');
  this.load.image('speech', 'assets/speech-bubble.png');
  this.load.image('back_button', 'assets/back_button.png');
  this.load.image('msgBox', 'assets/msgBox.png');
  this.load.audio('water', 'assets/water.wav');
  this.load.audio('bubble', 'assets/bubble.wav');



};

washScene.create = function(){


  console.log('create: entered washing game');
  let background = this.add.sprite(0,0, 'bath_background');

  background.setScale(3.3);

  background.setOrigin(0,0);
  background.depth = -10;
  background.width = config.width;
  background.height = config.height;

  this.waterSound = this.sound.add('water');

  this.bubbleSound = this.sound.add('bubble');

  this.sink = this.add.sprite(400, 450, 'sink');

  this.sink.setScale(.8);

  this.towel = this.add.sprite(125, 350, 'towel');

  this.towel.setScale(.7)


  this.hands = this.physics.add.sprite(0,600, 'hands').setInteractive();

  this.hands.body.allowGravity = false;

  this.hands.setScale(.2);

  this.soap = this.physics.add.sprite(575, 375, 'soap').setInteractive();

  this.soap.body.allowGravity = false;

  this.soap.setScale(.2);

  this.hit_box = this.physics.add.sprite(525,375, 'hit-box');

  this.hit_box.body.allowGravity = false;

  this.hit_box.setScale(.2);

  this.hit_box.setAlpha(0);

  this.msg_box = this.add.sprite(610, 75, 'msgBox').setScale(.5);


  this.input.setDraggable(this.soap);

  this.input.setDraggable(this.hands);

  this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

        gameObject.x = dragX;
        gameObject.y = dragY;

    });


    this.physics.add.collider(this.hit_box, this.hands, function(){

      let handsRect = this.hands.getBounds();

      let contRect = this.hit_box.getBounds();

      if (Phaser.Geom.Intersects.RectangleToRectangle(handsRect, contRect)) {

        console.log('water sound playing')
          this.waterSound.play();

      }


    }, null, this);

    this.physics.add.collider(this.soap, this.hands, function(){

      let handsRect = this.hands.getBounds();

      let soapRect = this.soap.getBounds();

      if (Phaser.Geom.Intersects.RectangleToRectangle(handsRect, soapRect)) {

        this.bubbleSound.play();

      }


    }, null, this);
  gameIntro();

  soapPrompt();

  rinsePrompt();

  dryPrompt();

  finalPrompt();



  //intro.destroy();



};

washScene.update = function(time, delta){



  // let soapRect = this.soap.getBounds();
  //
  //
  //
  // if (Phaser.Geom.Intersects.RectangleToRectangle(handsRect, soapRect)) {
  //
  //     this.bubbleSound.play();
  //
  // }


};

function gameIntro(){

  let intro = washScene.add.text(450, 36, "Welcome! Before going to your friends \nbirthday party. It's important that you \nknow how to wash your hands.", {
    font: '20px Lucida Sans Unicode',
    fill: '#00000'
  });

  washScene.time.addEvent({
  delay: 9000,
  callback: ()=>{

    intro.destroy();

    let line2 = washScene.add.text(450, 36, "First, use the sink to wet your hands!", {
      font: '20px Lucida Sans Unicode',
      fill: '#00000'
    });
      washScene.time.addEvent({
      delay: 9000,
      callback: ()=>{

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

      let text = washScene.add.text(450, 36, "Good Job! Now we must get some soap! \nPick up the soap next to the sink and \nrub it on your hands!", {
        font: '20px Lucida Sans Unicode',
        fill: '#00000'
      });

      washScene.time.addEvent({
      delay: 15000,
      callback: ()=>{


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

      let text = washScene.add.text(450, 36, "Excellent! Now need to rinse our hands! \nPlace your hands back \nunder the sink.", {
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

      let text = washScene.add.text(450, 36, "Yay! I knew you could do it! Now it's time to \ncollect supplies for your friends birthday \nbut beware, you never know what creatures \ncould be lurking on the way.", {
        font: '18px Lucida Sans Unicode',
        fill: '#00000'
      });

      var back_button = washScene.add.sprite(700, 110, 'back_button').setScale(0.1);

      back_button.setInteractive();

      back_button.on('pointerdown', function(){
          washScene.scene.resume('Game');
          washScene.scene.stop();
      });
  },
  loop: false
  })
}
