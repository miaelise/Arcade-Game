//START OF ENEMY CLASS
class Enemy {
  constructor(y, speed) {
    this.x = 0;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
  }

//Moves enemies across screen
  update(dt) {
    if(this.x < 500) {
      this.x += this.speed * dt;
      this.y = this.y;
    }
    else {
      this.x = -100;
    }
  }
//Draws enemies on screen
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
};
//END OF ENEMY CLASS


//START OF PLAYER CLASS
class Player {
  constructor() {
    this.xInitial = 202;
    this.yInitial = 385;
    this.x = this.xInitial;
    this.y = this.yInitial;
    this.moveFB = 83;
    this.moveLR = 101;
    this.sprite = 'images/char-boy.png';
    this.gameWon = false;
  }

//Draw player character on screen
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  //Updates player and checks for collisions and win state
    update() {
      this.checkIfWon();
    }

  //Accepts key inputs and establishes boundaries
  handleInput(key) {
    switch(key) {
      case 'right':
        if(this.x < 400) {
          this.x += this.moveLR;
        }
        break;
      case 'left':
        if(this.x > 0) {
          this.x -= this.moveLR;
        }
        break;
      case 'up':
        if(this.y > 0) {
          this.y -= this.moveFB;
        }
        break;
      case 'down':
        if(this.y < 385) {
          this.y += this.moveFB;
        }
        break;
    }
  }

//Checks x and y coords for enemies and player
  checkCollisions() {
    let y = this.y;
    let x = this.x;
    let func = () => {
      this.reset();
    }

    allEnemies.forEach(function(enemy) {
      if (y === enemy.y && ((enemy.x + 50) > x && (x + 50) > enemy.x)) {
        func();
      }
    })
  }

//Checks for win state and opens modal if won
  checkIfWon() {
    let func = () => {
      this.reset();
    }
    if (this.y < 0) {
      this.gameWon = true;
      document.querySelector('.modal').style.display = 'block';
      document.querySelector('.modal-wnd').style.display = 'block';
      document.getElementById('replay-btn').addEventListener('click', function() {
      document.querySelector('.modal').style.display = 'none';
      document.querySelector('.modal-wnd').style.display = 'none';
      func();
      });
    }
  }

//Resets player
  reset() {
    this.x = this.xInitial;
    this.y = this.yInitial;
    this.gameWon = false;
  }
}
//END PLAYER CLASS

// This listens for key presses and sends the keys to the
// Player.handleInput() method
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    }
    player.handleInput(allowedKeys[e.keyCode]);
});

//Initializes enemy and player objects, and adds enemies to allEnemies array
const player = new Player();
const bug = new Enemy(53, 150);
const bug2 = new Enemy(136, 300);
const bug3 = new Enemy(219, 200);
const allEnemies = [];
allEnemies.push(bug, bug2, bug3);
