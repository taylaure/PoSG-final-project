class Paddle extends Phaser.Physics.Arcade.Image {
    constructor (scene, x, y, cursorInput) {
        super(scene, x, y, 'paddle');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.setScale(0.2);
        this.body.allowGravity = false;
        this.setImmovable();
        this.movementSpeed = 500;
        this.cursorInput = cursorInput;
    }

    update(time, delta){
        if (this.cursorInput.left.isDown)
        {
            this.setVelocityX(-this.movementSpeed);
        }
        else if (this.cursorInput.right.isDown)
        {
            this.setVelocityX(this.movementSpeed);
        }
        else
        {
            this.setVelocityX(0);
        }
    }
}
