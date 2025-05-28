function setup() {
  createCanvas(800, 400);
}

function draw() {
  background(0);
  translate(width / 2, height / 2);

  fill(50, 200, 50);
  rect(-25, 0, 50, 60, 10);
  ellipse(0, -50, 70, 90);
  rect(-15, 60, 10, 30, 5);
  rect(5, 60, 10, 30, 5);
  rect(-40, 10, 10, 40, 5);
  rect(30, 10, 10, 40, 5);
  ellipse(-30, -80, 20, 30);
  ellipse(30, -80, 20, 30);

  fill(0);
  ellipse(-15, -55, 10, 10);
  ellipse(15, -55, 10, 10);

  noFill();
  stroke(0);
  strokeWeight(2);
  arc(0, -40, 30, 15, 0, PI);
}
