let washAnimationScene = new Phaser.Scene('WashAnimation');

washAnimationScene.init = function() {
}

washAnimationScene.preload = function() {
  console.log('washAnimationScene: Preload');
  this.load.image('background', 'assets/blue_banner.png');
  this.load.image('wash1', 'assets/hand_wash_animation/1.png');
  this.load.image('wash2', 'assets/hand_wash_animation/2.png');
  this.load.image('wash3', 'assets/hand_wash_animation/3.png');
  this.load.image('wash4', 'assets/hand_wash_animation/4.png');
  this.load.image('wash5', 'assets/hand_wash_animation/5.png');
  this.load.image('wash6', 'assets/hand_wash_animation/6.png');
  this.load.image('wash7', 'assets/hand_wash_animation/7.png');
  this.load.image('wash8', 'assets/hand_wash_animation/8.png');
  this.load.image('wash9', 'assets/hand_wash_animation/9.png');
}

washAnimationScene.create = function() {
  let background = this.add.sprite(400, 300, 'background');
  background.setScale(3);

  this.images = ['wash1', 'wash2', 'wash3', 'wash4', 'wash5', 'wash6', 'wash7', 'wash8', 'wash9'];
  this.timeDelay = 0;

  console.log('Start animation');
  for(let i = 0; i < 3; ++i) {
    for(let j = 0; j < 3; ++j) {
      console.log('Here is the time');
        timedEvent = this.time.addEvent({
          delay: this.timeDelay,
          callback: ()=>{
            if(i * 3 + j == 4) {
              var washImg = this.add.sprite(150 + 250 * j, 120 + 180 * i, this.images[i * 3 + j]).setScale(0.8);
            }
            else {
              var washImg = this.add.sprite(150 + 250 * j, 120 + 180 * i, this.images[i * 3 + j]).setScale(0.25);
            }
          },
          callbackScope: this
        });
        console.log(this.timeDelay);
        this.timeDelay += 2000;
    }
  }

  //timedEvent = this.time.addEvent({ delay: 2000, callback: fadeInPicture, callbackScope: this });

  /*
  var sprite = this.add.sprite(150, 120, this.images[0]);
  sprite.alpha = 0;
  this.add.tween(sprite).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
  */

  /*
  for(var i = 0; i < 3; ++i) {
    for(var j = 0; j < 3; ++j) {
      this.time.addEvent({
        delay: delayTime,
        callback: ()=>{
          let image = images[i * 3 + j];
          this.add.sprite(150 + 250 * i, 120 + 180 * j, image).setScale(0.25);
        }
      })
      delayTime += 3000;
    }
  }
  */
/*
  this.wash1 = this.add.sprite(150, 120, 'wash1').setScale(0.25);
  this.wash2 = this.add.sprite(400, 120, 'wash2').setScale(0.25);
  this.wash3 = this.add.sprite(650, 120, 'wash3').setScale(0.25);
  this.wash4 = this.add.sprite(150, 300, 'wash4').setScale(0.25);
  this.wash5 = this.add.sprite(400, 300, 'wash5').setScale(0.8);
  this.wash6 = this.add.sprite(650, 300, 'wash6').setScale(0.25);
  this.wash7 = this.add.sprite(150, 480, 'wash7').setScale(0.25);
  this.wash8 = this.add.sprite(400, 480, 'wash8').setScale(0.25);
  this.wash9 = this.add.sprite(650, 480, 'wash9').setScale(0.25);
  */

}

washAnimationScene.update = function() {

}

function fadeInPicture() {
    this.wash1 = this.add.sprite(150, 120, this.images[this.count]).setScale(0.25);
}
