let minigameScene = new Phaser.Scene('Minigame');

minigameScene.init = function() {
};

minigameScene.preload = function() {
  console.log('Minigame: Preload');
  this.load.image('bacteriaBlue', 'assets/minigame/bacteriaBlue.png');
  this.load.image('bacteriaPink', 'assets/minigame/bacteriaPink.png');
  this.load.image('bacteriaYellow', 'assets/minigame/bacteriaYellow.png');
  this.load.image('paddle', 'assets/minigame/paddle.png');
  this.load.image('ball', 'assets/minigame/ball.png');
  this.load.audio('hit', 'assets/minigame/shot.wav');
};
let score = 0;
let gameOver = false;

minigameScene.create = function ()
{
    this.palm = this.add.sprite(400, 300, 'palm');
    this.palm.setScale(10);
    this.palm.depth = -10;

    //  Input Events
    let cursors = this.input.keyboard.createCursorKeys();

    // The paddle
    this.paddle = new Paddle(this, 100, 500, cursors);

    this.ball = this.add.existing(new Ball(this, 400, 300));

    this.blocks = [];
    makeBlocks(3, this.blocks);

    //  The score
    this.scoreText = this.add.text(16, config.height - 48, 'score: 0', { fontSize: '32px', fill: '#FFF' });

    this.physics.add.collider(this.ball, this.blocks, onHitBlock, null, this);
    this.physics.add.collider(this.ball, this.paddle);
};

minigameScene.update = function (time, delta)
{
    if (gameOver)
    {
      if(this.msgBox) {
        return;
      }
      else {
        console.log('Win Game');

        this.ball.setVelocity(0, 0)
        this.ball = undefined;

        var cheer = this.sound.add('cheer');
        cheer.play();
        // Creating a message box
        this.msgBox = this.add.container(400, 300);
        var back = this.add.sprite(0, 0, 'msgBox');
        var ok_button = this.add.sprite(280, 80, 'okButton').setScale(0.1);
        var place = this.add.sprite(270, -30, 'handSani').setScale(0.2);
        //var go_home_text = this.add.text(0, 0, 'Uh oh! You have not clean up your hands yet! Go back home to get them cleaned up!');
        let congrats = this.add.text(-320, -50, 'Congratulations! You have won some hand sanitizer! Use hand sanitizer to clear low-level bacteria without returning home.', {
            font: '24px Lucida Sans Unicode',
            fill: '#ffffff',
            wordWrap: {width: 500, useAdvanceWrap: true}
        });

        this.msgBox.add(back);
        this.msgBox.add(place);
        this.msgBox.add(ok_button);
        this.msgBox.add(congrats);

        ok_button.setInteractive();
        ok_button.on('pointerdown', function(){
            var click = this.sound.add('click');
            click.play();
            this.msgBox.destroy();
            gameScene.handSaniCount += 1;
            gameScene.handSaniText.setText('Hand Sanitizers: ' + (gameScene.handSaniCount));
            //this.msgBox = undefined;
            this.scene.resume('Game');
            this.scene.stop();
        }, this);
        return;
      }
    }
    this.paddle.update(time, delta);
    this.ball.update(time, delta);
};

function onHitBlock (ball, block)
{
    block.disableBody(true, true);
    var sound = this.sound.add('hit');
    sound.play();
    //  Add and update the score
    score += 10;
    this.scoreText.setText('Score: ' + score);

    // check if all stars are collected
    let hasActiveStars = false;
    this.blocks.forEach(function(b){
       if(b.active){
           hasActiveStars = true;
       }
    });

    if (!hasActiveStars)
    {
        gameOver = true;
    }
};

function makeBlocks(lines, blocksArray){

    blocksArray.forEach( function (block) {
        block.destroy();
    });
    blocksArray.length = 0;

    let blockHeight = 60;
    let blockWidth = 80;
    let blocksPerLine = config.width / blockWidth;
    let images = ["bacteriaBlue", "bacteriaPink", "bacteriaYellow"];
    for(let i = 0; i < lines; i++){
        for(let j = 0; j < blocksPerLine; j++) {
            let image = images[Math.floor(Math.random()*images.length)];
            let block = minigameScene.physics.add.image(blockWidth/2 + j * blockWidth, blockHeight/2 + i * blockHeight, image);
            block.body.allowGravity = false;
            block.setScale(0.2);
            block.body.setCircle(block.width*0.2);
            block.setImmovable();
            blocksArray.push(block);
        }
    }
}
