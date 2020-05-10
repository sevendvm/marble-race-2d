var scl = 60;
var rows;
var cols;

var w;
var h;

var sliderY;

var sliderLigthX, sliderLigthY, sliderLigthZ;

var sliderAngle;

var terrain = [];

function setup() {
    createCanvas(600, 600, WEBGL);

    w = width * 3;
    h = height * 3;

    rows = w / scl;
    cols = h / scl;

    div = createDiv('Elevation:');
    sliderY = createSlider(-100, 200, 0);
    sliderY.parent(div);
    
    div = createDiv('Light X:');
    sliderLigthX = createSlider(-1000, 1000, 500);
    sliderLigthX.parent(div);

    div = createDiv('Light Y:');
    sliderLigthY = createSlider(-1000, 1000, 500);
    sliderLigthY.parent(div);
    
    div = createDiv('Light Z:');
    sliderLigthZ = createSlider(-1000, 1000, -100);
    sliderLigthZ.parent(div);
    
    div = createDiv('Angle:');
    sliderAngle = createSlider(1, 4, 2, 0.1);
    sliderAngle.parent(div);
    // ambientLight(10, 10, 10, 50);
    // frameRate(3);
}

let offset = 0;

function draw() {

    offset -= 1;

    for (i = -rows; i < rows; i++) {
        terrain[rows + i] = [];
        for (j = -cols; j < cols; j++) {
            terrain[rows + i][cols + j] = map(noise(i+offset, j), 0, 1, 0, 200);
        }
    }
    // lights();
    
    ambientLight(50);
    // spotLight(0, 250, 0, w, h, 100, 0, 0, -1, Math.PI / 16);
    // noStroke();
    // sphere(40);
    directionalLight(0, 255, 255, sliderLigthX.value(), sliderLigthY.value(), sliderLigthZ.value());

    translate(width/2, height/2 - sliderY.value());
    rotateX(PI / sliderAngle.value());
    rotateZ(PI / 2);

    background(0);
    fill(50);
    stroke(50);
    // noStroke();

    for (i = -rows ; i < rows - 1; i++) {
        beginShape(TRIANGLE_STRIP);
        for (j = -cols; j < cols; j++) {
            vertex(( i) * scl, (j) * scl, terrain[rows + i][cols + j]);
            vertex((i + 1) * scl, (j) * scl, terrain[rows + i + 1][cols + j]);
        }
        endShape();
    }
    
 
}