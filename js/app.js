// Enemies our player must avoid
/**
* @description Enemy picture, location, speed
* @constructor
*/
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = Math.floor(Math.random()*50)*(-100);
    this.y = Math.floor(Math.random()*3)*90+50;
    this.speed = 150; //TODO: need a better algorithm
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
/**
* @description Enemy update to a new position
* @constructor
* @param {number} dt - time between now and lasttime
*/
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
/**
* @description Enemy render
* @constructor
*/
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//push a new enemy in the Arrey
/**
* @description create a new enemy
* @constructor
*/
function newEnemy () {
    var enemy = new Enemy
    if (allEnemies.length < 29) {
       allEnemies.push(enemy);
    }
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
/**
* @description Player picture, location
* @constructor
*/
var Player = function () {
    this.sprite = "images/char-boy.png";
    this.x = 200;
    this.y = 400;
}

Player.prototype.update = function(dt) {
    
};

/**
* @description Player render
* @constructor
*/
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
* @description move the Player
* @constructor
* @param {string}key - the key pressed on the key board
*/
Player.prototype.handleInput = function(key) {
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
        case "enter": //TODO: This is a temporary solution, which let the game reset anytime
            newGame();
        default:
            console.log("no movement");
    }
};

/**
* @description count the collision number
* @constructor
*/
var collisionCount = 0;
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
            collisionCount++;
            console.log(collisionCount);
            if (collisionCount < 3) {
                player = new Player();
            };
            if (collisionCount === 3) {
                player = new Player();
                gameOver();
                collisionCount = 0;
            }
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
/**
* @description Enemy
* @constructor
*/
var player = new Player;
var allEnemies = [new Enemy];

/**
* @description Show Game Over msg
* @constructor
*/
function gameOver () {
        var canvas2 = document.querySelector('#canvas2'); //canvas2 created in engine.js but canvas need to be redefined
        var  ctx2 = canvas2.getContext('2d');

        ctx2.font = "50px impact";
        ctx2.stokeStyle = "black";
        ctx2.textAlign = "center";
        ctx2.lineWidth = 5;
        ctx2.fillStyle = "white";
        ctx2.strokeText("Game Over",canvas2.width/2,canvas2.height/2);
        ctx2.fillText("Game Over",canvas2.width/2,canvas2.height/2);
        ctx2.font = "20px impact";
        ctx2.fillStyle = "black";
        ctx2.fillText("Press Enter To Continue.",canvas2.width/2,canvas2.height/2 + 60);

        //newGame();
        
}

/**
* @description new game start, clean the canvas
* @constructor
*/
function newGame () {
    var canvas2 = document.querySelector('#canvas2');
    var  ctx2 = canvas2.getContext('2d');

    ctx2.clearRect(0,0,canvas2.width,canvas2.height);
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
/**
* @description key board event
* @constructor
* @param {event}keyup - key up
* @param {function}function(e) - key board event anonymous function
*/
var keyUp
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter'
    };

    keyUp = allowedKeys[e.keyCode];

    player.handleInput(allowedKeys[e.keyCode]);

    // if (allowedKeys[e.keyCode] == 'left'; || 
    //     allowedKeys[e.keyCode] == 'up';|| 
    //     allowedKeys[e.keyCode] == 'right';|| 
    //     allowedKeys[e.keyCode] == 'down';) {
    //     player.handleInput(allowedKeys[e.keyCode]);
    // } else if (allowedKeys[e.keyCode] === 'enter' ){
    //     var keyUp = allowedKeys[e.keyCode];
    // }
});