let loadingScene = new Phaser.Scene('Loading');

loadingScene.preload = function() {
  console.log("Started Scene: Loading...");

  // Load all images here!
  this.load.image('main_background', 'assets/grass.png');
}

loadingScene.create = function() {
    this.scene.start('Home');
};
