let loadingScene = new Phaser.Scene('Loading');

loadingScene.preload = function() {
  console.log("Started Scene: Loading...");

  // Load all images here!
  this.load.image('main_background', 'assets/grass_bg.jpg');
}

loadingScene.create = function() {
    this.scene.start('Home');
};
