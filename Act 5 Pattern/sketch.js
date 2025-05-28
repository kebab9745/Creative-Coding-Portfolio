var circleSize = 80;

function setup() {
  createCanvas(400, 400);
  noStroke();
  translate(circleSize / 2, circleSize / 2);

  for (var x = 0; x < width; x += circleSize) {
    for (var y = 0; y < height; y += circleSize) {
      push();
      translate(x, y);

      if ((x + y) % (circleSize * 2) === 0) {
        fill(200, 100, 150);
        ellipse(0, 0, circleSize, circleSize);
        fill(50, 0, 100);
        triangle(
          -circleSize / 2, circleSize / 2,
          0, -circleSize / 2,
          circleSize / 2, circleSize / 2
        );
      } else {
        fill(100, 200, 250);
        rectMode(CENTER);
        rect(0, 0, circleSize, circleSize);
        fill(0, 100, 200);
        ellipse(0, 0, circleSize * 0.5);
      }

      pop();
    }
  }
}

function draw() {

}
