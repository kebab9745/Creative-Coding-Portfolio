let font;
let points;
let shadowPoints;
let fontSize = 65;
let amplitude = 10;
let frequency = 0.05;
let shadowOffsetX = 5;
let shadowOffsetY = 5;

function preload() {
    font = loadFont('SourceSansPro-Regular.otf');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    textFont(font);
    textSize(fontSize);
    textAlign(CENTER, CENTER);

    points = font.textToPoints('Omar Abdul Hanan', width / 2 - 300, height / 2, fontSize, {
        sampleFactor: 0.2,
        simplifyThreshold: 0
    });

    shadowPoints = font.textToPoints('Omar Abdul Hanan', width / 2 - 300 + shadowOffsetX, height / 2 + shadowOffsetY, fontSize, {
        sampleFactor: 0.2,
        simplifyThreshold: 0
    });
}

function draw() {
    background("#FDF6EC");

    let time = millis() / 1000;

    fill("#D59BF6");
    noStroke();
    for (let pt of shadowPoints) {
        let wave = sin(pt.x * frequency + time) * amplitude;
        ellipse(pt.x, pt.y + wave, 5, 5);
    }

    fill("#4A306D");
    noStroke();
    for (let pt of points) {
        let wave = sin(pt.x * frequency + time) * amplitude;
        ellipse(pt.x, pt.y + wave, 5, 5);
    }
}
