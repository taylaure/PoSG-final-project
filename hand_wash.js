let washScene = new Phaser.Scene('Wash');

washScene.preload = function(){

  this.load.image('soap', 'assets/soap2.png');
  this.load.image('towel', 'assets/towel.png');
  this.load.image('sink', 'assets/sink2.png');
  this.load.image('bath_background', 'assets/bath_background.png');
  this.load.image('hands', 'assets/hands.png');
  this.load.image('hit-box', 'assets/hit-box.png');
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

  this.hands = this.add.sprite(0,600, 'hands').setInteractive();

  this.hands.setScale(.2);

  this.hit_box = this.add.sprite(525,375, 'hit-box');

  this.hit_box.setScale(.2);

  this.hit_box.setAlpha(0);


  this.input.setDraggable(soap);

  this.input.setDraggable(this.hands);

  this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

        gameObject.x = dragX;
        gameObject.y = dragY;

    });

  gameIntro();



  //intro.destroy();



};

washScene.update = function(time, delta){

  let handsRect = this.hands.getBounds();

  let contRect = this.hit_box.getBounds();

  if (Phaser.Geom.Intersects.RectangleToRectangle(handsRect, contRect)) {

    washScene.time.addEvent({
    delay: 7000,
    callback: ()=>{
        // spawn a new apple

        let text = washScene.add.text(500, 100, "Good Job! Now we must get some soap! \n Pick up the soap next to the sink and rub it on your hands!", {
            font: '18px Arial',
            fill: '#000000'
        });

        washScene.time.addEvent({
        delay: 7000,
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





};

function gameIntro(){

  let intro = washScene.add.text(500, 100, "Oh No! You've touched a bacteria! \nUse the following instructions to \nwash your hands.", {
      font: '18px Arial',
      fill: '#000000'
  });

  washScene.time.addEvent({
  delay: 7000,
  callback: ()=>{
      // spawn a new apple
    intro.destroy();

    let line2 = washScene.add.text(500, 100, "First, use the sink to wet your hands!", {
        font: '18px Arial',
        fill: '#000000'
    });
      washScene.time.addEvent({
      delay: 7000,
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
