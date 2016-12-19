// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = Math.floor(Math.random()*50)*(-100);
    this.y = Math.floor(Math.random()*3)*90+50;
    this.speed = 150;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
   this.x += dt*this.speed;
   if (this.x > 500) {
       this.x = Math.floor(Math.random()*50)*(-100);
   }
   newEnemy(Resources.get(this.sprite),this.x,this.y);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//push a new enemy in the Arrey
function newEnemy () {
    var enemy = new Enemy
    if (allEnemies.length < 29) {
       allEnemies.push(enemy);
    }
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.sprite = "images/char-boy.png";
    this.x = 200;
    this.y = 400;
}

Player.prototype.update = function(dt) {
    
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    console.log(key);
    switch (key) {
        case "right":
            if (this.x < 350) {
                this.x += 100;
            }
            break;
        case "left":
            if (this.x > 50){
                this.x -= 100;
            }
            break;
        case "up":
            if (this.y > 0){
                this.y -= 90;
            }
            break;
        case "down":
            if (this.y < 400){
                this.y += 90;
            }
            break;
        default:
            console.log("no movement");
    }
};

function checkCollisions () {
    var playerLeft = player.x + 20;
    var playerRight = player.x + 80;
    var playerTop = player.y + 20;
    var playerBtm = player.y + 80;
    var len = allEnemies.length;
    for (var i = 0; i < len; i++) {
        var enemyLeft = allEnemies[i].x;
        var enemyRight = allEnemies[i].x + 101;
        var enemyTop = allEnemies[i].y;
        var enemyBtm = allEnemies[i].y + 100;
        if (
                ((playerLeft < enemyRight) && (playerLeft > enemyLeft) && (playerTop < enemyBtm) && (playerTop > enemyTop)) ||
                ((playerLeft < enemyRight) && (playerLeft > enemyLeft) && (playerBtm > enemyBtm) && (playerBtm < enemyTop)) ||
                ((playerRight > enemyRight) && (playerRight < enemyLeft) && (playerTop < enemyBtm) && (playerTop > enemyTop)) ||
                ((playerRight > enemyRight) && (playerRight < enemyLeft) && (playerBtm > enemyBtm) && (playerBtm < enemyTop))
            ) {
            gameOver();
            player = new Player();
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player;
var allEnemies = [new Enemy];

//Show msg
function gameOver () {
        var canvas2 = document.querySelector('#canvas2');
        var  ctx2 = canvas2.getContext('2d');

        ctx2.font = "30px impact";
        ctx2.stokeStyle = "black";
        ctx2.textAlign = "center";
        ctx2.lineWidth = 5;
        ctx2.fillStyle = "white";
        ctx2.strokeText("Game Over",canvas2.width/2,30);
        ctx2.fillText("Game Over",canvas2.width/2,30);
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});