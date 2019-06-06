let winningScene = new Phaser.Scene('Winning');


winningScene.init = function() {
};

winningScene.preload = function() {
  console.log('Welcome: Preload');

  this.load.image("Background", "assets/forest.jpg");
  this.load.image('msgBox', 'assets/blue_banner.png');
  this.load.image('back_button', 'assets/back_button.png');
  this.load.image('bear', 'assets/animal_wash/bear.png');
  this.load.image('boy', 'assets/animal_wash/boy.png');
  this.load.image('cat', 'assets/animal_wash/cat.png');
  this.load.image('dog', 'assets/animal_wash/dog.png');
  this.load.image('girl', 'assets/animal_wash/girl.png');
  this.load.image('rabbit', 'assets/animal_wash/rabbit.png');
  

};

winningScene.create = function ()
{
  let background = this.add.sprite(config.width/2,config.height/2, 'Background');

  background.setScale(.8);


  background.depth = -10;
  background.width = config.width;
  background.height = config.height;


  let banner = this.add.sprite(config.width/2,config.height/2, 'msgBox').setScale(1.1);

  let text = this.add.text(50,175, " Congratulations! \n\nYou made it to the party and avoided getting sick! \n\nYOU WIN!",{
    font: '25px Lucida Sans Unicode',
    fill: '#ffffff'
  });


};

winningScene.update = function (time, delta)
{

};
