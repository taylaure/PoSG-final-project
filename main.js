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
// Bacteria event
let bacteria_touched = true;

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
  this.maze.create(600, 585, 'mountains').setScale(1.5).refreshBody();
  // Plants near start
  this.maze.create(300, 450, 'white_tree').setScale(0.3).refreshBody();
  // Bushes near balloon
  this.maze.create(20, 250, 'bush').setScale(0.4).refreshBody();
  this.maze.create(20, 300, 'bush').setScale(0.2).refreshBody();
  this.maze.create(90, 300, 'mushroom').setScale(0.1).refreshBody();
  this.maze.create(300, 50, 'flower_tree').setScale(0.5).refreshBody();
  this.maze.create(260, 80, 'flower_tree').setScale(0.4).refreshBody();
  this.maze.create(300, 150, 'flower_bush').setScale(0.2).refreshBody();

  this.maze.create(600, 400, 'bush').setScale(0.3).refreshBody();
  // Trees near goal
  this.maze.create(550, 50, 'white_tree').setScale(0.2).refreshBody();
  this.maze.create(580, 70, 'white_tree').setScale(0.2).refreshBody();
  // Start and goal
  this.house = this.add.sprite(80, 480, 'start');
  this.house.setScale(0.25);
  this.house = this.add.sprite(700, 80, 'goal');
  this.house.setScale(0.2);

  // Mini games
  this.balloon = this.physics.add.sprite(100, 100, 'balloon');
  this.balloon.body.allowGravity = false;
  this.balloon.setImmovable();
  this.balloon.setScale(0.2);

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
  this.physics.add.collider(this.player, this.balloon, onHitBalloon, null, this);
  //this.physics.world.collideSpriteVsGroup(this.player, this.maze);
};

gameScene.update = function(time, delta) {
  this.player.update(time, delta);
};

function onHitBalloon () {
  if(bacteria_touched) {
    // Creating a message box
    var msgBox = this.add.container(400, 300);
    var back = this.add.sprite(0, 0, 'msgBox');
    var back_button = this.add.sprite(280, 80, 'back_button').setScale(0.2);
    //var go_home_text = this.add.text(0, 0, 'Uh oh! You have not clean up your hands yet! Go back home to get them cleaned up!');
    let go_home_text1 = this.add.text(-320, -60, 'Uh oh! You have not clean up your hands yet!', {
        font: '30px Lucida Sans Unicode',
        fill: '#ffffff'
    });

    let go_home_text2 = this.add.text(-320, -10, 'GO BACK HOME before it is too late.', {
      font: '30px Lucida Sans Unicode',
      fill: '#ffffff'
    });
    msgBox.add(back);
    msgBox.add(back_button);
    msgBox.add(go_home_text1);
    msgBox.add(go_home_text2);

    back_button.setInteractive();
    back_button.on('pointerdown', function(){
        msgBox.destroy();
    }, this);
  }
  else {
    // Change to minigame scene later
    console.log('Minigame will start now');
    //this.scene.start('Home');
  }
};

function create_message() {

}
