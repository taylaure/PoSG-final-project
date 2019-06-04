class Player extends Phaser.Physics.Arcade.Image {
    constructor (scene, x, y, cursorInput) {
        super(scene, x, y, 'main_character');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.setScale(0.1);
        this.body.allowGravity = false;
        //this.setImmovable();
        //this.movementSpeed = 500;
        this.cursorInput = cursorInput;
    }

    update(time, delta){
        if (this.cursorInput.left.isDown)
        {
            this.setVelocityX(-160);
        }
        else if (this.cursorInput.right.isDown)
        {
            this.setVelocityX(160);
        }
        else if (this.cursorInput.up.isDown)
        {
            this.setVelocityY(-160);
        }
        else if (this.cursorInput.down.isDown)
        {
            this.setVelocityY(160);
        }
        else
        {
          this.setVelocityY(0);
          this.setVelocityX(0);
        }
    }
}
