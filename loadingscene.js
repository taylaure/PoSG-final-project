let loadingScene = new Phaser.Scene('Loading');

loadingScene.preload = function() {
  console.log("Started Scene: Loading...");

  // Load all images here!
  this.load.image('main_background', 'assets/grass.png');
  this.load.image('mountains', 'assets/mountains.png');
  this.load.image('bush', 'assets/bush.png');
  this.load.image('cat', 'assets/cat.png');
}

loadingScene.create = function() {
    this.scene.start('Home');
};
