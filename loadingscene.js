let loadingScene = new Phaser.Scene('Loading');

loadingScene.preload = function() {
  console.log("Started Scene: Loading...");

  // Load all images here!
  this.load.image('main_background', 'assets/grass.png');
  this.load.image('mountains', 'assets/mountains.png');
  this.load.image('start', 'assets/main_house.png');
  this.load.image('goal', 'assets/candy_house.png');
  this.load.image('bush', 'assets/bush.png');
  this.load.image('white_tree', 'assets/white_tree.png');
  this.load.image('flower_bush', 'assets/flower_bush.png');
  this.load.image('main_character', 'assets/girl.png');
  this.load.image('balloon', 'assets/balloon.png');
  this.load.image('flower_tree', 'assets/flower_tree.png');
  this.load.image('mushroom', 'assets/mushroom.png');
  this.load.image('msgBox', 'assets/msgBox.png');
  this.load.image('back_button', 'assets/back_button.png');
  this.load.image('bac1', 'assets/bacteria1.png');
  this.load.image('surprised_cat', 'assets/surprised_cat.png');
}

loadingScene.create = function() {
    this.scene.start('Home');
};
