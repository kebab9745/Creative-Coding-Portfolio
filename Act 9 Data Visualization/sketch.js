let genres = [
  "First-Person Shooter (FPS)", "Role-Playing Games (RPG)", "Action-Adventure",
  "Battle Royale", "Sports", "Racing", "Simulation", "Puzzle", "Strategy", "Fighting"
];
let values = [14.1, 12.9, 12.5, 11.4, 11.1, 10.2, 9.6, 8.7, 7.3, 6.2];
let barColors = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
  generateNeonColors();
  textFont('Segoe UI Black, Arial Black, sans-serif');
  background('#121212');
}

function draw() {
  background('#121212');
  fill(0, 255, 255);
  textSize(36);
  textAlign(LEFT, TOP);
  text("Top Video Game Genres in 2025", 40, 40); // top-left title
  drawHorizontalBarChart();
}

function generateNeonColors() {
  barColors = [];
  for (let i = 0; i < genres.length; i++) {
    let c = color(random(100, 255), random(150, 255), random(150, 255));
    barColors.push(c);
  }
}

function drawHorizontalBarChart() {
  let barHeight = 35;
  let barGap = 20;
  let chartHeight = genres.length * (barHeight + barGap);
  let chartTop = (height - chartHeight) / 2;
  let maxLabelWidth = 250; 
  let maxValueWidth = 60; 
  let maxBarWidth = width - maxLabelWidth - maxValueWidth - 100;
  let chartLeft = (width - (maxLabelWidth + maxBarWidth + maxValueWidth)) / 2 + maxLabelWidth;

  for (let i = 0; i < genres.length; i++) {
    let barWidth = map(values[i], 0, 100, 0, maxBarWidth);

    drawingContext.shadowBlur = 15;
    drawingContext.shadowColor = barColors[i];

    let gradient = drawingContext.createLinearGradient(
      chartLeft, chartTop + i * (barHeight + barGap),
      chartLeft + barWidth, chartTop + i * (barHeight + barGap)
    );
    gradient.addColorStop(0, color(red(barColors[i]), green(barColors[i]), blue(barColors[i]), 180));
    gradient.addColorStop(1, color(red(barColors[i]), green(barColors[i]), blue(barColors[i]), 255));
    drawingContext.fillStyle = gradient;

    noStroke();
    rect(chartLeft, chartTop + i * (barHeight + barGap), barWidth, barHeight, 8);

    drawingContext.shadowBlur = 0;

    fill(0, 255, 255);
    textSize(18);
    textAlign(RIGHT, CENTER);
    text(genres[i], chartLeft - 25, chartTop + i * (barHeight + barGap) + barHeight / 2);

    fill(255);
    textSize(16);
    textAlign(LEFT, CENTER);
    text(values[i] + "%", chartLeft + barWidth + 10, chartTop + i * (barHeight + barGap) + barHeight / 2);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
