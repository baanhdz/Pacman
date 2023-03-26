class Pacman{
    constructor(x,y,width,height,speed){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.direction = DIRECTION_RIGHT;
        this.nextDirection = this.direction;
        this.currentFrame = 1;
        this.frameCount = 7;

        setInterval(() => {
            this.changeAnimation();
        },100)
    }

    //quy trình di chuyển
    moveProcess(){
        this.changeDirectionIfPossible();
        this.moveForwards();
        if(this.checkCollision()){
            this.moveBackwards();
        }
    }

    eat(){
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[0].length; j++) {
                if (
                    map[i][j] == 2 &&
                    this.getMapX() == j &&
                    this.getMapY() == i
                ) {
                    map[i][j] = 3;
                    score++;
                }
            }
        }
    }

    //di chuyển về phía sau
    moveBackwards(){
        switch (this.direction) {
            case DIRECTION_RIGHT:
                this.x -= this.speed;
                break;
            case DIRECTION_UP:
                this.y += this.speed;
                break;
            case DIRECTION_LEFT:
                this.x += this.speed;
                break;
            case DIRECTION_BOTTOM:
                this.y -= this.speed;
                break;
        }
    }

    //di chuyển về phía trước
    moveForwards(){
        switch (this.direction) {
            case DIRECTION_RIGHT:
                this.x += this.speed;
                break;
            case DIRECTION_UP:
                this.y -= this.speed;
                break;
            case DIRECTION_LEFT:
                this.x -= this.speed;
                break;
            case DIRECTION_BOTTOM:
                this.y += this.speed;
                break;
        }
    }

    //kiểm tra Va chạm
    checkCollision(){
        let isCollided = false;
        if(
            map[this.getMapY()][this.getMapX()] == 1 || 
            map[this.getMapYRightSide()][this.getMapX()] == 1 || 
            map[this.getMapY()][this.getMapXRightSide()] == 1 ||
            map[this.getMapYRightSide()][this.getMapXRightSide()] == 1 
        ) {
           return true ;
        }
        return false;
    }

    //kiểm tra va chạm Ghost
    checkGhostCollision(){

    }

    //thay đổi hướng 
    changeDirectionIfPossible(){
        if(this.direction == this.nextDirection) return

        let tempDirection = this.direction
        this.direction = this.nextDirection;
        this.moveForwards();
        if(this.checkCollision()){
            this.moveBackwards();
            this.direction = tempDirection;
        } else {
            this.moveBackwards();
        }
    }

    //thay đổi Animation
    changeAnimation(){
        this.currentFrame =
            this.currentFrame == this.frameCount ? 1 : this.currentFrame + 1;
    }

    //hoat anh Pacman
    draw(){
        canvasContext.save();
        canvasContext.translate(
            this.x + oneBlockSize / 2,
            this.y + oneBlockSize / 2
        );
        canvasContext.rotate( (this.direction * 90 * Math.PI) / 180);

        canvasContext.translate(
            -this.x - oneBlockSize / 2,
            -this.y - oneBlockSize / 2
        );

        //Pacman
        canvasContext.drawImage(
            pacmanFrames,
            (this.currentFrame - 1) * oneBlockSize,
            0,
            oneBlockSize,
            oneBlockSize,
            this.x,
            this.y,
            this.width,
            this.height
        );

        canvasContext.restore();
    }

    getMapX(){
        return parseInt(this.x / oneBlockSize);
    }
    getMapY(){
        return parseInt(this.y / oneBlockSize);
    }
    getMapXRightSide(){
        return parseInt((this.x + 0.9999 * oneBlockSize ) / oneBlockSize);
    }
    getMapYRightSide(){
        return parseInt((this.y + 0.9999 * oneBlockSize ) / oneBlockSize);
    }



}
