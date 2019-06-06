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
    scene: [loadingScene, homeScene, gameScene, washScene, washAnimationScene, minigameScene, welcomeScene, endScene],
    backgroundColor: '#154A1E'
};

let game = new Phaser.Game(config);
// Bacteria event
let bacteria_touched = false;
let home_count = 0;
let balloon_touched = false;
let isWin = false;

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

  // Inventory
  this.maze.create(650, 500, 'inventory').setScale(0.4).refreshBody();
  this.handSaniCount = 0;
  this.itemCount = 0;
  this.inventoryText = this.add.text(570, 460, 'INVENTORY', {font: '24px Impact', fill: '#FFF'});
  this.handSaniText = this.add.text(570, 500, 'Hand Sanitizer: 0', { font: '20px Lucida Sans Unicode', fill: '#FFF' });
  this.handSaniText.setText('Hand Sanitizers: ' + this.handSaniCount);
  this.itemText = this.add.text(570, 530, 'Presents found: 0', { font: '20px Lucida Sans Unicode', fill: '#FFF' });
  this.itemText.setText('Presents found: ' + this.itemCount);

  // Bacteria
  this.bac1 = this.physics.add.sprite(525,375, 'bac1');
  this.bac1.body.allowGravity = false;
  this.bac1.setImmovable();
  this.bac1.setScale(0.2);
  this.bac1.setAlpha(0);

  this.bac2 = this.physics.add.sprite(700,200, 'bac1');
  this.bac2.body.allowGravity = false;
  this.bac2.setImmovable();
  this.bac2.setScale(0.1);
  this.bac2.setAlpha(0);

  // Hand Sanitizer
  this.sani = this.physics.add.sprite(400, 100, 'handSani');
  this.sani.body.allowGravity = false;
  this.sani.setImmovable();
  this.sani.setScale(0.07);

  // Start and goal
  this.house = this.physics.add.sprite(80, 480, 'start');
  this.house.body.allowGravity = false;
  this.house.body.setSize(100, 100);
  this.house.setImmovable();
  this.house.setScale(0.25);
  this.goal = this.physics.add.sprite(700, 80, 'goal');
  this.goal.setScale(0.2);
  this.goal.body.allowGravity = false;
  this.goal.setImmovable();

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
  this.physics.add.collider(this.player, this.goal, onHitGoal, null, this);
  this.physics.add.overlap(this.player, this.bac1, onHitBacteria1, null, this);
  this.physics.add.overlap(this.player, this.bac2, onHitBacteria2, null, this);
  this.physics.add.collider(this.player, this.sani, onHitSani, null, this);
};

gameScene.update = function(time, delta) {
  if(!isWin) {
    this.player.update(time, delta);
  }
};

function onHitBalloon () {
  //this.scene.pause('Game');
  if(bacteria_touched) {
    if(this.msgBox) {
      return;
    }
    console.log('messageBox created');
    goHomeMsg();
  }
  else {
    balloon_touched = true;
    let sound = this.sound.add('magic');
    sound.play();
    this.balloon.destroy();
    this.balloon = undefined;

    if(this.msgBox) {
      return;
    }
    console.log('messageBox created');
    // Creating a message box
    this.msgBox = this.add.container(400, 300);
    var back = this.add.sprite(0, 0, 'msgBox');
    var back_button = this.add.sprite(280, 80, 'back_button').setScale(0.2);
    //var go_home_text = this.add.text(0, 0, 'Uh oh! You have not clean up your hands yet! Go back home to get them cleaned up!');
    let go_home_text1 = this.add.text(-320, -30, 'Hooray! You found the balloons!', {
        font: '30px Impact',
        fill: '#ffffff'
    });
    this.msgBox.add(back);
    this.msgBox.add(back_button);
    this.msgBox.add(go_home_text1);
    this.itemCount += 1;
    this.itemText.setText('Presents found: ' + (this.itemCount));

    back_button.setInteractive();
    back_button.on('pointerdown', function(){
        var click = this.sound.add('click');
        click.play();
        this.msgBox.destroy();
        this.msgBox = undefined;
        //this.scene.resume('Game');
    }, this);

    //console.log('Minigame will start now');
    //this.scene.launch('Wash');
    //this.scene.pause();
  }
};

function onHitHouse () {
  if(bacteria_touched) {
    this.scene.launch('WashAnimation');
    bacteria_touched = false;
    this.scene.pause('Game');
  }
};

function onHitBacteria1() {
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
        var click = this.sound.add('click');
        click.play();
        this.msgBox.destroy();
        this.msgBox = undefined;
        this.bac1.destroy();
        this.bac1 = undefined;
        bacteria_touched = true;
        console.log('touched');
        console.log('hand sani count: ' + this.handSaniCount);
        if(this.handSaniCount > 0) {
          // Prompt player to use the hand sanitizer
          console.log('Prompt Hand Sanitizer Use');
          let sound = this.sound.add('magic');
          sound.play();
          // Creating a message box
          this.msgBox = this.add.container(400, 300);
          var back = this.add.sprite(0, 0, 'msgBox');
          var yes_button = this.add.sprite(100, 80, 'yes_button').setScale(0.2);
          var no_button = this.add.sprite(230, 80, 'no_button').setScale(0.2);
          //var go_home_text = this.add.text(0, 0, 'Uh oh! You have not clean up your hands yet! Go back home to get them cleaned up!');
          let text1 = this.add.text(-320, -100, 'Looks like some hand sanitizers! Do you want to use them now?', {
              font: '24px Lucida Sans Unicode',
              fill: '#ffffff',
              wordWrap: {width: 580, useAdvanceWrap: true}
          });

          this.msgBox.add(back);
          this.msgBox.add(yes_button);
          this.msgBox.add(no_button);
          this.msgBox.add(text1);

          yes_button.setInteractive();
          yes_button.on('pointerdown', function(){
              var click = this.sound.add('click');
              click.play();
              this.msgBox.destroy();
              this.msgBox = undefined;
              this.handSaniCount -= 1;
              this.handSaniText.setText('Hand Sanitizers: ' + (this.handSaniCount));
              bacteria_touched = false;
          }, gameScene);

          no_button.setInteractive();
          no_button.on('pointerdown', function(){
              var click = this.sound.add('click');
              click.play();
              gameScene.msgBox.destroy();
              gameScene.msgBox = undefined;
          }, gameScene);
        }
    }, this);
  }
};

function onHitBacteria2() {
  //this.scene.pause('Game');
  if(!bacteria_touched) {
    if(this.msgBox) {
      return;
    }
    console.log('Bacteria Event created');

    var flushSound = this.sound.add('flush');
    flushSound.play();
    // Creating a message box
    this.msgBox = this.add.container(400, 300);
    var back = this.add.sprite(0, 0, 'msgBox');
    var back_button = this.add.sprite(280, 80, 'back_button').setScale(0.2);
    var place = this.add.sprite(270, -30, 'toilet').setScale(0.2);
    //var go_home_text = this.add.text(0, 0, 'Uh oh! You have not clean up your hands yet! Go back home to get them cleaned up!');
    let bac_type = this.add.text(-320, -100, 'Oh no! You’ve picked up a clostridioides from a public toilet!', {
        font: '20px Lucida Sans Unicode',
        fill: '#ffffff',
        wordWrap: {width: 550, useAdvanceWrap: true}
    });
    let instruction = this.add.text(-320, -50, 'You’d better go wash your hands so you don’t get sick!', {
      font: '20px Lucida Sans Unicode',
      fill: '#ffffff',
      wordWrap: {width: 550, useAdvanceWrap: true}
    });
    let info = this.add.text(-320, -10, 'An infection from this bacterium can cause fever and dehydration.', {
      font: '20px Lucida Sans Unicode',
      fill: '#ffffff',
      wordWrap: {width: 550, useAdvanceWrap: true}
    });

    let danger = this.add.text(-320, 50, 'Danger level: HIGH', {
      font: '30px Impact',
      fill: '#FF5554',
      wordWrap: {width: 550, useAdvanceWrap: true}
    });


    this.msgBox.add(back);
    this.msgBox.add(place);
    this.msgBox.add(back_button);
    this.msgBox.add(bac_type);
    this.msgBox.add(instruction);
    this.msgBox.add(info);
    this.msgBox.add(danger);

    back_button.setInteractive();
    back_button.on('pointerdown', function(){
        var click = this.sound.add('click');
        click.play();
        this.msgBox.destroy();
        this.msgBox = undefined;
        this.bac2.destroy();
        this.bac2 = undefined;
        bacteria_touched = true;
        if(this.handSaniCount > 0) {
          // Prompt player to use the hand sanitizer
          console.log('Prompt Hand Sanitizer Use');
          let sound = this.sound.add('magic');
          sound.play();
          // Creating a message box
          this.msgBox = this.add.container(400, 300);
          var back = this.add.sprite(0, 0, 'msgBox');
          var yes_button = this.add.sprite(100, 80, 'yes_button').setScale(0.2);
          var no_button = this.add.sprite(230, 80, 'no_button').setScale(0.2);
          //var go_home_text = this.add.text(0, 0, 'Uh oh! You have not clean up your hands yet! Go back home to get them cleaned up!');
          let text1 = this.add.text(-320, -100, 'Looks like some hand sanitizers! Do you want to use them now?', {
              font: '24px Lucida Sans Unicode',
              fill: '#ffffff',
              wordWrap: {width: 580, useAdvanceWrap: true}
          });

          this.msgBox.add(back);
          this.msgBox.add(yes_button);
          this.msgBox.add(no_button);
          this.msgBox.add(text1);

          yes_button.setInteractive();
          yes_button.on('pointerdown', function(){
              var click = this.sound.add('click');
              click.play();
              this.msgBox.destroy();
              this.msgBox = undefined;
              this.handSaniCount -= 1;
              this.handSaniText.setText('Hand Sanitizers: ' + (this.handSaniCount));
              bacteria_touched = false;
          }, gameScene);

          no_button.setInteractive();
          no_button.on('pointerdown', function(){
              var click = this.sound.add('click');
              click.play();
              gameScene.msgBox.destroy();
              gameScene.msgBox = undefined;
          }, gameScene);
        }
    }, this);
  }
};

function onHitGoal() {
  if(bacteria_touched) {
    if(bacteria_touched) {
      if(this.msgBox) {
        return;
      }
      console.log('messageBox created');
      goHomeMsg();
    }
  }
  else if(balloon_touched) {
    console.log('Transit to End Scene');
    isWin = true;
    gameScene.scene.start('End');
  }
};

function goHomeMsg() {
  // Creating a message box
  gameScene.msgBox = gameScene.add.container(400, 300);
  var back = gameScene.add.sprite(0, 0, 'msgBox');
  var back_button = gameScene.add.sprite(280, 80, 'back_button').setScale(0.2);
  //var go_home_text = this.add.text(0, 0, 'Uh oh! You have not clean up your hands yet! Go back home to get them cleaned up!');
  let go_home_text1 = gameScene.add.text(-320, -60, 'Uh oh! You have not clean up your hands yet!', {
      font: '30px Lucida Sans Unicode',
      fill: '#ffffff'
  });

  let go_home_text2 = gameScene.add.text(-320, -10, 'GO BACK HOME before it is too late.', {
    font: '30px Lucida Sans Unicode',
    fill: '#ffffff'
  });
  gameScene.msgBox.add(back);
  gameScene.msgBox.add(back_button);
  gameScene.msgBox.add(go_home_text1);
  gameScene.msgBox.add(go_home_text2);

  back_button.setInteractive();
  back_button.on('pointerdown', function(){
      var click = this.sound.add('click');
      click.play();
      gameScene.msgBox.destroy();
      gameScene.msgBox = undefined;
      //this.scene.resume('Game');
  }, gameScene);
};

function onHitSani() {
  if(gameScene.msgBox) {
    return;
  }
  if(bacteria_touched) {
    goHomeMsg();
  }
  else {
    console.log('Start minigame');
    let sound = this.sound.add('magic');
    sound.play();
    // Creating a message box
    gameScene.msgBox = gameScene.add.container(400, 300);
    var back = gameScene.add.sprite(0, 0, 'msgBox');
    var go_button = gameScene.add.sprite(280, 80, 'go_button').setScale(0.2);
    //var go_home_text = this.add.text(0, 0, 'Uh oh! You have not clean up your hands yet! Go back home to get them cleaned up!');
    let text1 = gameScene.add.text(-320, -100, 'Woah! You have found some hand sanitizer! Clear all the bacteria for a chance to add the hand sanitizer to your inventory. If you win, you can use it to ward off low-level bacteria without returning home! Use the left/right arrow button to control the paddle.', {
        font: '24px Lucida Sans Unicode',
        fill: '#ffffff',
        wordWrap: {width: 580, useAdvanceWrap: true}
    });

    gameScene.msgBox.add(back);
    gameScene.msgBox.add(go_button);
    gameScene.msgBox.add(text1);

    go_button.setInteractive();
    go_button.on('pointerdown', function(){
        var click = this.sound.add('click');
        click.play();
        gameScene.msgBox.destroy();
        gameScene.msgBox = undefined;
        this.sani.destroy();
        this.sani = undefined;
        this.scene.launch('Minigame');
        this.scene.pause();
    }, gameScene);
  }
};
