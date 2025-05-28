var img;

function preload() {
  img = loadImage("tree.jpg");
}

function setup() {
  createCanvas(400, 400);
  noLoop();
}

function draw() {
  background(0);
  image(img, 0, 0, width, height);

  let levels = int(map(mouseX, 0, width, 2, 10));
  filter(POSTERIZE, levels);
}

function mouseMoved() {
  redraw();
}
