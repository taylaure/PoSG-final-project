let welcomeScene = new Phaser.Scene('Welcome');


welcomeScene.init = function() {
};

welcomeScene.preload = function() {
  console.log('Welcome: Preload');

  this.load.image("Background", "assets/forest.jpg");
  this.load.image('msgBox', 'assets/blue_banner.png');
  this.load.image('back_button', 'assets/back_button.png');
  this.load.audio('click', 'assets/click.wav');

};

welcomeScene.create = function ()
{
  let background = this.add.sprite(config.width/2,config.height/2, 'Background');

  background.setScale(.8);


  background.depth = -10;
  background.width = config.width;
  background.height = config.height;


  let banner = this.add.sprite(config.width/2,config.height/2, 'msgBox').setScale(1.1);

  let text = this.add.text(50,175, "Welcome to A Bacterial Birthday! \nGoal: Collect all the party supplies and join your friends at the party. \n\nBut watch out! Along the way you may run into some nasty \nbacteria that are so small they can’t be seen. If you pick up a \nbacterium, you will have to return home to wash your hands \nbefore you can continue. \n\nGood luck!",{
    font: '25px Lucida Sans Unicode',
    fill: '#ffffff'
  });

  let back_button = this.add.sprite(650, 400, 'go_button').setScale(0.25);

  back_button.setInteractive();

  back_button.on('pointerdown', function(){
      var click = welcomeScene.sound.add('click');
      click.play();
      welcomeScene.scene.start('Wash');

  });
};

welcomeScene.update = function (time, delta)
{

};
