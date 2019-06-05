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
    scene: [loadingScene, homeScene, gameScene, washScene, washAnimationScene],
    backgroundColor: '#154A1E'
};

let game = new Phaser.Game(config);
// Bacteria event
let bacteria_touched = false;
let home_count = 0;
let balloon_touched = false;

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

  // Bacteria
  this.bac1 = this.physics.add.sprite(525,375, 'bac1');
  this.bac1.body.allowGravity = false;
  this.bac1.setImmovable();
  this.bac1.setScale(0.2);
  this.bac1.setAlpha(0);

  // Start and goal
  this.house = this.physics.add.sprite(80, 480, 'start');
  this.house.body.allowGravity = false;
  this.house.body.setSize(100, 100);
  this.house.setImmovable();
  this.house.setScale(0.25);
  this.goal = this.add.sprite(700, 80, 'goal');
  this.goal.setScale(0.2);

  // Mini games
  this.balloon = this.physics.add.sprite(100, 100, 'balloon');
  this.balloon.body.allowGravity = false;
  this.balloon.setImmovable();
  this.balloon.setScale(0.2);

  this.player = new Player(this, 100, config.height - 100, cursors);


  //this.physics.add.collider(this.player, this.small_bush);
  //this.physics.add.collider(this.small_bush, this.maze);

  this.physics.add.collider(this.player, this.maze);
  this.physics.add.collider(this.player, this.balloon, onHitBalloon, null, this);
  this.physics.add.overlap(this.player, this.house, onHitHouse, null, this);
  this.physics.add.collider(this.player, this.bac1, onHitBacteria, null, this);
  //this.physics.add.collider(this.player, this.house, onHitHouse, null, this);
  //this.physics.world.collideSpriteVsGroup(this.player, this.maze);
};

gameScene.update = function(time, delta) {
  this.player.update(time, delta);
};

function onHitBalloon () {
  //this.scene.pause('Game');
  if(bacteria_touched) {
    if(this.msgBox) {
      return;
    }
    console.log('messageBox created');
    // Creating a message box
    this.msgBox = this.add.container(400, 300);
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
    this.msgBox.add(back);
    this.msgBox.add(back_button);
    this.msgBox.add(go_home_text1);
    this.msgBox.add(go_home_text2);

    back_button.setInteractive();
    back_button.on('pointerdown', function(){
        this.msgBox.destroy();
        this.msgBox = undefined;
        //this.scene.resume('Game');
    }, this);
  }
  else {
    // Change to minigame scene later
    balloon_touched = true;
    this.balloon.destroy();
    this.balloon = undefined;
    console.log('Minigame will start now');
    this.scene.launch('Wash');
    this.scene.pause();
  }
};

function onHitHouse () {
  if(bacteria_touched) {
    this.scene.launch('WashAnimation');
    bacteria_touched = false;
    this.scene.pause('Game');
  }
};

function onHitBacteria() {
  //this.scene.pause('Game');
  if(!bacteria_touched) {
    if(this.msgBox) {
      return;
    }
    console.log('Bacteria Event created');

    this.meowSound = this.sound.add('meow');
    this.meowSound.play(); 
    // Creating a message box
    this.msgBox = this.add.container(400, 300);
    var back = this.add.sprite(0, 0, 'msgBox');
    var back_button = this.add.sprite(280, 80, 'back_button').setScale(0.2);
    var cat = this.add.sprite(270, -30, 'surprised_cat').setScale(0.2);
    //var go_home_text = this.add.text(0, 0, 'Uh oh! You have not clean up your hands yet! Go back home to get them cleaned up!');
    let bac_type = this.add.text(-320, -100, 'Oh no! You’ve picked up a pasteurella bacterium from a stray cat!', {
        font: '20px Lucida Sans Unicode',
        fill: '#ffffff',
        wordWrap: {width: 550, useAdvanceWrap: true}
    });
    let instruction = this.add.text(-320, -50, 'You’d better go wash your hands so you don’t get sick!', {
      font: '20px Lucida Sans Unicode',
      fill: '#ffffff',
      wordWrap: {width: 550, useAdvanceWrap: true}
    });
    let info = this.add.text(-320, -10, 'An infection from this bacterium can cause meningitis and bone, joint, or respiratory infections.', {
      font: '20px Lucida Sans Unicode',
      fill: '#ffffff',
      wordWrap: {width: 550, useAdvanceWrap: true}
    });

    let danger = this.add.text(-320, 50, 'Danger level: LOW', {
      font: '30px Impact',
      fill: '#FF5554',
      wordWrap: {width: 550, useAdvanceWrap: true}
    });


    this.msgBox.add(back);
    this.msgBox.add(cat);
    this.msgBox.add(back_button);
    this.msgBox.add(bac_type);
    this.msgBox.add(instruction);
    this.msgBox.add(info);
    this.msgBox.add(danger);

    back_button.setInteractive();
    back_button.on('pointerdown', function(){
        this.msgBox.destroy();
        this.msgBox = undefined;
        this.bac1.destroy();
        this.bac1 = undefined;
        bacteria_touched = true;
    }, this);
  }
  else {
    // Change to minigame scene later
    console.log('Minigame will start now');
  }
}
