const DIAMETER = 800;
const RADIUS = DIAMETER / 2;

const SECTORS = 500;

let slider;

function setup() {

    label = createElement('label', 'Multiplier');

    slider = createSlider(1, SECTORS, 2);
    slider.input(updatePicture);

    createCanvas(DIAMETER + 100, DIAMETER + 100);
    background(50);

    updatePicture();
    
}

function updatePicture() {
    let MULTIPLIER = slider.value();
    let points = [];

    createCanvas(DIAMETER + 100, DIAMETER + 100);
    background(50);

    stroke(255);
    fill(255);
    text('Multiplier: '+MULTIPLIER, 10, 10);

    translate((DIAMETER + 100) / 2, (DIAMETER + 100) / 2);
    
    strokeWeight(2);
    noFill();
    circle(0, 0, DIAMETER);

    stroke(150, 50, 255);

    for (let dotIndex = SECTORS-1; dotIndex >= 0; dotIndex--) {

        const dot = dotIndex * 2 * PI / SECTORS;

        points.push({ x: RADIUS * cos(dot), y: RADIUS * sin(dot) });

        circle(RADIUS * cos(dot), RADIUS * sin(dot), 5);
        if (dotIndex%5 == 0){
            text(dotIndex, points[SECTORS - dotIndex - 1].x+30*cos(dot), points[SECTORS - dotIndex - 1].y+30*sin(dot));
        }
        

    }

    stroke(250, 100, 0);

    for (let pointIndex = 0; pointIndex < SECTORS; pointIndex++) {


        const pairIndex = pointIndex * MULTIPLIER % SECTORS;

        line(points[pointIndex].x, points[pointIndex].y, points[pairIndex].x, points[pairIndex].y);


    }
   
}