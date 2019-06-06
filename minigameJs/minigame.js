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
      this.scene.resume('Game');
      this.scene.stop();
      return;
    }
    this.paddle.update(time, delta);
    this.ball.update(time, delta);
};

function onHitBlock (ball, block)
{
    block.disableBody(true, true);
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
        //makeBlocks(3,this.blocks);
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
