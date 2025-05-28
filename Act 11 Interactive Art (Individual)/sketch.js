let player;
let orbs = [];
let score = 0;
let health = 100;
let isPaused = false;
let bgCircles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  player = new Player();
  for (let i = 0; i < 100; i++) {
    bgCircles.push(new BgCircle());
  }
}

function draw() {
  if (!isPaused) {
    background(20, 20, 40);

    for (let circle of bgCircles) {
      circle.update();
      circle.show();
    }

    player.update();
    player.show();

    if (frameCount % 15 === 0) {
      orbs.push(new Orb());
    }

    for (let i = orbs.length - 1; i >= 0; i--) {
      orbs[i].update();
      orbs[i].show();

      if (orbs[i].offscreen()) {
        orbs.splice(i, 1);
        continue;
      }

      if (player.hits(orbs[i])) {
        if (orbs[i].good) {
          score += 10;
        } else {
          health -= 20;
        }
        orbs.splice(i, 1);
      }
    }

    showHUD();

    if (health <= 0) {
      gameOver();
      noLoop();
    }
  } else {
    pauseScreen();
  }
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    resetGame();
  } else if (key === 'p' || key === 'P') {
    isPaused = !isPaused;
  }
}

function showHUD() {
  fill(255);
  textSize(20);
  textAlign(LEFT);
  text(`Score: ${score}`, 20, 30);
  text(`Health: ${health}`, 20, 60);

  // Controls Display
  textAlign(RIGHT);
  text("CONTROLS:", width - 20, 30);
  text("Move: Arrow Keys or WASD", width - 20, 60);
  text("Pause: P | Restart: R", width - 20, 90);
}

function pauseScreen() {
  background(10, 10, 30, 200);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(36);
  text("Game Paused\nPress 'P' to Resume", width / 2, height / 2);
}

function gameOver() {
  fill(255, 50, 50);
  textAlign(CENTER, CENTER);
  textSize(36);
  text("Game Over\nPress 'R' to Restart", width / 2, height / 2);
}

function resetGame() {
  score = 0;
  health = 100;
  orbs = [];
  loop();
}

class Player {
  constructor() {
    this.x = width / 2;
    this.y = height - 100;
    this.r = 25;
    this.speed = 5;
  }

  update() {
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) this.x -= this.speed;
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) this.x += this.speed;
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) this.y -= this.speed;
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) this.y += this.speed;

    this.x = constrain(this.x, this.r, width - this.r);
    this.y = constrain(this.y, this.r, height - this.r);
  }

  show() {
    noStroke();
    fill(0, 255, 255, 180);
    ellipse(this.x, this.y, this.r * 2);
    stroke(255);
    strokeWeight(1);
    noFill();
    ellipse(this.x, this.y, this.r * 2 + sin(frameCount * 0.1) * 10);
  }

  hits(orb) {
    let d = dist(this.x, this.y, orb.x, orb.y);
    return d < this.r + orb.r;
  }
}

class Orb {
  constructor() {
    this.x = random(width);
    this.y = -20;
    this.r = random(10, 20);
    this.good = random(1) > 0.3;
    this.color = this.good ? color(0, 255, 100) : color(255, 0, 0);
    this.speed = random(3, 6);
  }

  update() {
    this.y += this.speed;
  }

  show() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.r * 2);
  }

  offscreen() {
    return this.y - this.r > height;
  }
}

class BgCircle {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.r = random(30, 100);
    this.speed = random(0.5, 1.5);
    this.alpha = random(30, 80);
  }

  update() {
    this.y += this.speed;
    if (this.y - this.r > height) {
      this.y = -this.r;
      this.x = random(width);
    }
  }

  show() {
    noStroke();
    fill(255, this.alpha);
    ellipse(this.x, this.y, this.r);
  }
}
