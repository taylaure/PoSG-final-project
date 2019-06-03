let gameScene = new Phaser.Scene("Game");

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [loadingScene, homeScene, gameScene],
    backgroundColor: '#154A1E'
};

let game = new Phaser.Game(config);

gameScene.create = function() {

  // Map background set up
  this.background = this.add.sprite(0,0,'main_background');
  this.background.setOrigin(0,0);
  this.background.width = config.width;
  this.background.height = config.height;
  this.background = this.add.sprite(600,0,'main_background');
  this.background.setOrigin(0,0);
  this.background.width = config.width;
  this.background.height = config.height;

  //  Input Events
  let cursors = this.input.keyboard.createCursorKeys();
  this.player = new Player(this, 100, config.height - 100, cursors);

  // Making bush
  this.small_bush = this.add.sprite(100, 60, 'bush');
  this.small_bush.setScale(0.3);

};

gameScene.update = function(time, delta) {
  this.player.update(time, delta);

};
