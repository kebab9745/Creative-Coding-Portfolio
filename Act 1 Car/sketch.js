function setup() {
  createCanvas(800, 400);
  noLoop();
}

function draw() {
  background(220);
  drawCar(300, 300);
}

function drawCar(x, y) {
  // Main body
  fill(220, 0, 0);
  rect(x, y - 20, 140, 30, 10);

  // Top cabin
  fill(180, 0, 0);
  beginShape();
  vertex(x + 30, y - 20);
  vertex(x + 50, y - 50);
  vertex(x + 90, y - 50);
  vertex(x + 110, y - 20);
  endShape(CLOSE);

  // Windows
  fill(135, 206, 235);
  rect(x + 55, y - 45, 15, 20, 3); // Front window
  rect(x + 75, y - 45, 15, 20, 3); // Back window

  // Wheels
  fill(0);
  ellipse(x + 30, y + 10, 30, 30);
  ellipse(x + 110, y + 10, 30, 30);

  // Wheel rims
  fill(100);
  ellipse(x + 30, y + 10, 10, 10);
  ellipse(x + 110, y + 10, 10, 10);
}
