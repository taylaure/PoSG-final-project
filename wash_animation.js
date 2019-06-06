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
  this.load.audio('water', 'assets/water.wav');
}

washAnimationScene.create = function() {
  let background = this.add.sprite(400, 300, 'background');
  background.setScale(3);

  this.images = ['wash1', 'wash2', 'wash3', 'wash4', 'wash5', 'wash6', 'wash7', 'wash8', 'wash9'];
  this.timeDelay = 0;
  this.waterSound = this.sound.add('water');
  this.waterSound.loop = true;
  this.waterSound.play();

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
              /*
              washImg.setAlpha(0);
              washAnimationScene.tween.add({
                target: washImg,
                duration: 200,
                alpha: '+=0.1'
              });
              */
            }
          },
          callbackScope: this
        });
        console.log(this.timeDelay);
        this.timeDelay += 1000;
    }
  }
  exit = this.time.addEvent({
    delay: this.timeDelay + 1000,
    callback: ()=>{
      this.waterSound.stop();
        this.scene.resume('Game');
        this.scene.stop();
    }
  });
};

washAnimationScene.update = function() {

}
