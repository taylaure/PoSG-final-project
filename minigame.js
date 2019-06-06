let minigameScene = new Phaser.Scene('Minigame');

minigameScene.init = function() {

};

minigameScene.preload = function() {
  console.log('washAnimationScene: Preload');
  this.load.image('bacteriaBlue', 'assets/minigame/bacteriaBlue.png');
  this.load.image('bacteriaPink', 'assets/minigame/bacteriaPink.png');
  this.load.image('bacteriaYellow', 'assets/minigame/bacteriaYellow.png');
};

minigameScene.create = function() {

};

minigameScene.update = function() {

};
