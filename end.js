let endScene = new Phaser.Scene('End');

endScene.preload = function() {
  this.load.image('birthday', 'assets/birthday.png');
  this.load.image('living_room', 'assets/living_room.png');
  this.load.audio('endCheer', 'assets/endCheer.wav');
};

endScene.create = function() {
  this.cheer = this.sound.add('endCheer');
  this.cheer.play();

  this.end_background = this.add.sprite(400, 300, 'home_background');
  this.end_background.setScale(0.8);

  this.banner = this.add.sprite(400, 300, 'msgBox');
  this.banner.setScale(3);

  this.birthday = this.add.sprite(400, 400, 'birthday');
  this.birthday.setScale(0.9);

  this.endText = this.add.text(220, 30, 'Congratulations!', {
      font: '50px Impact',
      fill: '#ffffff'
  });
  this.endText2 = this.add.text(110, 90, 'You made it to the party and avoided getting sick!', {
    font: '30px Impact',
    fill: '#ffffff'
  });
  this.endText3 = this.add.text(330, 130, 'YOU WIN!', {
    font: '30px Impact',
    fill: '#ffffff'
  });
};
