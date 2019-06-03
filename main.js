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
    scene: [bootScene, loadingScene, homeScene, gameScene],
    backgroundColor: '#000000'
};

let game = new Phaser.Game(config);

gameScene.create = function() {
  this.background = this.add.sprite(0,0,'main_background');
  this.background.setOrigin(0,0);
  //this.background.depth = -10;
  this.background.width = config.width;
  this.background.height = config.height;
};

gameScene.update = function() {

};
