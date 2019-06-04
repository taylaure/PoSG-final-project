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

  //let rect = this.add.container(525, 375, 100, 100);




  this.input.setDraggable(soap);

  this.input.setDraggable(hands);

  this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

        gameObject.x = dragX;
        gameObject.y = dragY;

    });

  gameIntro();



  //intro.destroy();



};

washScene.update = function(time, delta){

  let handsRect = this.hands.getBounds();

  let contRect = this.soap.getBounds();

  if (Phaser.Geom.Intersects.RectangleToRectangle(handsRect, contRect)) {
              gameIntro();
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
