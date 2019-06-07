let washScene = new Phaser.Scene('Wash');

let step1 = true;
let step2 = false;
let step3 = false;
let step4 = false;

washScene.init = function(){

};

washScene.preload = function(){
  //preload all images in game Scene
  
  console.log('preload: entered washing game');
  this.load.image('soap', 'assets/soap2.png');
  this.load.image('towel', 'assets/towel.png');
  this.load.image('sink', 'assets/sink2.png');
  this.load.image('bath_background', 'assets/bath_background.png');
  this.load.image('hands', 'assets/hands.png');
  this.load.image('hit-box', 'assets/hit-box.png');
  this.load.image('back_button', 'assets/back_button.png');
  this.load.image('msgBox', 'assets/msgBox.png');
  this.load.audio('water', 'assets/water.wav');
  this.load.audio('bubble', 'assets/bubbles.wav');



};

washScene.create = function(){

  //game object delclaration
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


  this.hands = this.add.sprite(0,600, 'hands').setInteractive();
  this.hands.setScale(.2);

  this.soap = this.add.sprite(575, 375, 'soap').setInteractive();
  this.soap.setScale(.2);

  this.hit_box = this.add.sprite(525,375, 'hit-box');
  this.hit_box.setScale(.2);
  this.hit_box.setAlpha(0);

  this.msg_box = this.add.sprite(610, 75, 'msgBox').setScale(.5);

  //setting soap and hand objects draggable
  this.input.setDraggable(this.soap);

  this.input.setDraggable(this.hands);

  this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

        gameObject.x = dragX;
        gameObject.y = dragY;

    });

    //beginning instructions for the game
    gameIntro();



};

washScene.update = function(time, delta){

    //subsequet actions for the game
    gameUpdate();


};

function gameIntro(){

  let intro = washScene.add.text(450, 36, "Welcome! Let's start by learning how to \nwash our hands.", {
    font: '20px Lucida Sans Unicode',
    fill: '#00000'
  });

  washScene.time.addEvent({
  delay: 9000,
  callback: ()=>{

    intro.destroy();

    let line2 = washScene.add.text(450, 36, "First, use the sink to wet your hands by \nclicking and dragging them to the faucet", {
      font: '20px Lucida Sans Unicode',
      fill: '#00000'
    });
      washScene.time.addEvent({
      delay: 7000,
      callback: ()=>{

        line2.destroy();
      },
      loop: false
      })
  },
  loop: false
  })

}

//instructions based on interactivity of objects
function gameUpdate(){
  let handsRect = washScene.hands.getBounds();
  let contRect = washScene.hit_box.getBounds();
  let soapRect = washScene.soap.getBounds();
  let towelRect = washScene.towel.getBounds();

  //check if hands and hit box are touching
  if (Phaser.Geom.Intersects.RectangleToRectangle(handsRect, contRect) && step1 === true) {


      //play water sound
      console.log('water sound playing');
      washScene.waterSound.play();

      step1 = false;

      washScene.time.addEvent({
      delay: 7000,
      callback: ()=>{

        step2 = true;

        let text2 = washScene.add.text(450, 36, "Good Job! Now we must get some soap! \nPick up the soap next to the sink and \nrub it on your hands!", {
          font: '20px Lucida Sans Unicode',
          fill: '#00000'


        });

          washScene.time.addEvent({
          delay: 15000,
          callback: ()=>{


            text2.destroy();
          },
        loop: false
        })
      },
      loop: false
      })

  }

  //check if hands and soap are touching
  if(Phaser.Geom.Intersects.RectangleToRectangle(handsRect, soapRect) && step2){
        console.log('bubble sound playing');

        //play bubble sound
        washScene.bubbleSound.play();

        step2 = false;

        washScene.bubbleSound.play();


        washScene.time.addEvent({
        delay: 15000,
        callback: ()=>{

          step3 = true;

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

  //check if hands and hit box are touching
  if (Phaser.Geom.Intersects.RectangleToRectangle(handsRect, contRect) && step3 === true) {

      //play water sound
      console.log('water sound playing');
      washScene.waterSound.play();

      step3 = false;



      washScene.time.addEvent({
      delay: 9000,
      callback: ()=>{

        step4 = true;

        let text = washScene.add.text(450, 36, "Amazing! You're almost done! Now use \nthe towel to dry your hands.", {
          font: '20px Lucida Sans Unicode',
          fill: '#00000'
        });

        washScene.time.addEvent({
        delay: 7000,
        callback: ()=>{

          text.destroy();
        },
        loop: false
        })
      },
      loop: false
      })

  }


  //check if towel and hands are touching
  if (Phaser.Geom.Intersects.RectangleToRectangle(handsRect, towelRect) && step4 === true) {

    step4 = false;

      washScene.time.addEvent({
      delay: 7000,
      callback: ()=>{

        let text = washScene.add.text(450, 36, "Yay! I knew you could do it! Now it's time to \ncollect supplies for your friends birthday \nbut beware, you never know what creatures \ncould be lurking on the way.", {
          font: '18px Lucida Sans Unicode',
          fill: '#00000'
        });

        var back_button = washScene.add.sprite(700, 110, 'go_button').setScale(0.1);

        back_button.setInteractive();

        back_button.on('pointerdown', function(){
          var click = washScene.sound.add('click');
          click.play();
            washScene.scene.start('Game');

        });
      },
      loop: false
      })

  }
}
