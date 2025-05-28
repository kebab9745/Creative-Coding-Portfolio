let song;
let fft;
let kickDetector;
let snareDetector;
let voiceDetector;

let panels;
let kickBall;
let circle_arr = [];
let sq_arr = [];

function preload() {
  song = loadSound('levitating.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);

  fft = new p5.FFT();
  fft.setInput(song);

  kickDetector = new BeatDetect('kick');
  snareDetector = new BeatDetect('snare');
  voiceDetector = new BeatDetect('male');

  panels = new Panels(6);
  kickBall = new BounceBall();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background('#0E0B16'); // darker background for better contrast
  push();
  translate(width * 0.5, height * 0.5);

  const kick = kickDetector.update(fft);
  const snare = snareDetector.update(fft);
  const voice = voiceDetector.update(fft);

  if (snare.isBeat) {
    panels.setColors();
  }
  panels.run();

  kickBall.run(kick.isBeat);

  if (kick.isBeat) {
    if (random(1) <= 0.3) {
      circle_arr.push(new BeatCircle(0, 0));
    } else {
      sq_arr.push(new BeatSquare(0, 0));
    }
  }

  for (let i = circle_arr.length - 1; i >= 0; i--) {
    circle_arr[i].run();
    if (circle_arr[i].isDead()) {
      circle_arr.splice(i, 1);
    }
  }

  for (let i = sq_arr.length - 1; i >= 0; i--) {
    sq_arr[i].run();
    if (sq_arr[i].isDead()) {
      sq_arr.splice(i, 1);
    }
  }

  pop();
  showSpectrum(fft);
}

function mouseClicked() {
  togglePlay();
}

function togglePlay() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.loop();
  }
}

function showSpectrum(fft) {
  let spectrum = fft.analyze();

  noFill();
  strokeWeight(2);
  beginShape();
  for (let i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length, 0, width);
    let y = map(spectrum[i], 0, 255, height, height * 0.4);
    stroke(map(i, 0, spectrum.length, 100, 255), 100, 255);
    vertex(x, y);
  }
  endShape();
}

class BounceBall {
  constructor() {
    this.maxR = 100;
    this.minR = 10;
    this.r = this.minR;
  }
  run(isBeat = false) {
    this.update(isBeat);
    this.display();
  }
  update(isBeat) {
    if (isBeat) {
      this.r = this.maxR;
    }
    this.r = max(this.r - 4, this.minR);
  }
  display() {
    stroke(255, 200, 0);
    fill(255, 100, 100);
    ellipse(0, 0, this.r, this.r);
  }
}

class Panels {
  constructor(n) {
    this.n = n;
    this.lifemax = 300;
    this.life = 0;
    this.colors = [];
    this.setColors(n);
  }
  setColors() {
    this.n = Math.floor(random(5, 9));
    this.colors = [];
    for (let i = 0; i < this.n; i++) {
      this.colors.push(color(random(100, 255), random(100, 255), random(255)));
    }
    this.life = this.lifemax;
  }
  run() {
    this.update();
    this.display();
  }
  update() {
    this.alph = map(this.life, 0, this.lifemax, 0, 255);
    this.life = max(this.life - 4, 0);
  }
  display() {
    let spacing = height * 0.5 / this.n;
    for (let i = 0; i < this.n; i++) {
      fill(red(this.colors[i]), green(this.colors[i]), blue(this.colors[i]), this.alph);
      noStroke();
      rect(0, i * spacing - height * 0.25, width, spacing * 0.8);
    }
  }
}

class BeatSquare {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.l = 30;
    this.m = 6;
    this.lifespan = 255;
    this.angle = random(PI);
  }
  run() {
    this.update();
    this.display();
  }
  update() {
    this.l += this.m;
    this.lifespan -= 3.0;
  }
  display() {
    push();
    rotate(this.angle);
    stroke(255, this.lifespan);
    strokeWeight(3);
    noFill();
    square(this.x, this.y, this.l);
    pop();
  }
  isDead() {
    return this.lifespan < 0;
  }
}

class BeatCircle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 20;
    this.m = 6;
    this.lifespan = 255;
  }
  run() {
    this.update();
    this.display();
  }
  update() {
    this.r += this.m;
    this.lifespan -= 3.0;
  }
  display() {
    stroke(255, this.lifespan);
    strokeWeight(2);
    noFill();
    ellipse(this.x, this.y, this.r);
  }
  isDead() {
    return this.lifespan < 0;
  }
}

class BeatDetect {
  constructor(mode = 'kick', freq2) {
    if (!isNaN(freq2) && !isNaN(mode)) {
      this.freq1 = mode;
      this.freq2 = freq2;
    } else {
      if (mode == 'snare') {
        this.freq1 = 2000;
        this.freq2 = 6000;
      } else if (mode == 'male') {
        this.freq1 = 200;
        this.freq2 = 2000;
      } else {
        this.freq1 = 20;
        this.freq2 = 80;
      }
    }

    this.time = 0;
    this.threshold = 0;
    this.minThreshold = 0;
    this.decayRate = 0.01;
    this.minThresholdRate = 0.8;
    this.holdTime = 45;
    this.marginThresholdTime = 10;
    this.marginThreshold = 0.06;
  }

  update(fft) {
    const e = fft.getEnergy(this.freq1, this.freq2);
    const level = e / 255.0 || 0.0;
    let isBeat = false;

    if (level > this.threshold && level > this.minThreshold) {
      this.threshold = level * 1.05;
      this.minThreshold = max(this.minThreshold, level * this.minThresholdRate);
      if (this.time > this.marginThresholdTime) {
        isBeat = true;
      }
      this.time = 0;
    } else {
      if (this.time == this.marginThresholdTime) {
        this.threshold -= this.marginThreshold;
      }
      this.time++;
      if (this.time > this.holdTime) {
        this.threshold -= this.decayRate;
      }
    }

    return { threshold: this.threshold, level: level, isBeat: isBeat };
  }
}
