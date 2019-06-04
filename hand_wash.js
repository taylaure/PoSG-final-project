let washScene = new Phaser.Scene('Wash');

washScene.preload = function(){

  this.load.image('soap', 'assets/soap2.png');
  this.load.image('towel', 'assets/towel.png');
  this.load.image('sink', 'assets/sink2.png');
  this.load.image('bath_background', 'assets/bath_background.png');
  this.load.image('hands', 'assets/hands.png');
  this.load.image('speech', 'assets/speech-bubble.png');


};

washScene.create = function(){

  let background = this.add.sprite(0,0, 'bath_background');

  background.setScale(3.3);

  background.setOrigin(0,0);
  background.depth = -10;
  background.width = config.width;
  background.height = config.height;

  let sink = this.add.sprite(400, 450, 'sink');

  sink.setScale(.8);

  let towel = this.add.sprite(125, 350, 'towel');

  towel.setScale(.7)

  let soap = this.add.sprite(575, 375, 'soap').setInteractive();
  soap.setScale(.2);

  let hands = this.add.sprite(0,600, 'hands').setInteractive();

  hands.setScale(.2);


  this.input.setDraggable(soap);

  this.input.setDraggable(hands);

  this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

        gameObject.x = dragX;
        gameObject.y = dragY;

    });



  let intro = this.add.text(500, 100, "Oh No! You've touched a bacteria! \nUse the following instructions to \nwash your hands.", {
      font: '18px Arial',
      fill: '#000000'
  });

  let line2 = "First, put your hands under the water \nfor 5 seconds"
  let line3 = "Good Job! Now we need to clean using soap! \nDrag the soap on to your hand scrub them clean"
  let text = textForward(7000,
    intro, line2);

  textForward(6000, text, line3);





  //intro.destroy();



};

washScene.update = function(time, delta){



};

function textForward(time, text1, text2){


  washScene.time.addEvent({
  delay: time,
  callback: ()=>{
      // spawn a new apple

      text1.destroy();

      let nextText = washScene.add.text(500, 100, text2, {
          font: '18px Arial',
          fill: '#000000'
      });

      return nextText;
  },
  loop: false
  })


}
