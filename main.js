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

  // Making bush
  this.maze = this.physics.add.staticGroup();
  this.maze.create(500, 585, 'mountains').setScale(1.5).refreshBody();
  //this.maze.create(200, 600, 'bush').setScale(0.3).refreshBody();
  //this.maze.create(50, 600, 'bush').setScale(0.6).refreshBody();
  this.maze.create(600, 400, 'bush').setScale(0.3).refreshBody();
  this.maze.create(100, 300, 'bush').setScale(0.3).refreshBody();

  /*
  this.small_bush = this.physics.add.sprite(60, 60, 'bush');
  this.small_bush.setScale(0.3);
  this.small_bush.setCollideWorldBounds(true);
  this.small_bush.body.allowGravity = false;
  this.small_bush.setImmovable();
  */

  this.player = new Player(this, 100, config.height - 100, cursors);


  //this.physics.add.collider(this.player, this.small_bush);
  //this.physics.add.collider(this.small_bush, this.maze);

  this.physics.add.collider(this.player, this.maze);
  //this.physics.world.collideSpriteVsGroup(this.player, this.maze);
};

gameScene.update = function(time, delta) {
  this.player.update(time, delta);
};
