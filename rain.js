let s = [];

const X_AXIS = 1,
      Y_AXIS = 2;


let RAIN_SPEED = 20;
let RAIN_DENSITY = 500;
let WIND = 0;

var speedAdjuster, densityAdjuster, windAdjuster;

function setup() {
  
  createCanvas(1600, 800);

  // let div = createDiv('Elevation:');
  // sliderY = createSlider(-100, 200, 0);
  // sliderY.parent(div);
  speedAdjuster = createSlider(10, 30);
  speedAdjuster.input(() => {
    RAIN_SPEED = speedAdjuster.value();
    console.log(RAIN_SPEED);
  });
  
  densityAdjuster = createSlider(10, 800, 500, 10);
  densityAdjuster.input(() => {
    RAIN_DENSITY = densityAdjuster.value();

    if (RAIN_DENSITY >= s.length){
      for (i = 0; i < RAIN_DENSITY - s.length; i++){
        let ray = {x: random(-width, width),
                   y: random(-500, 0), 
                   z: random(0, 20), 
                   angle: WIND, 
                   vspeed: 0,
                  }
        ray.vspeed = map(ray.z, 0, 20, RAIN_SPEED, 4);
        s.push(ray);
      }      
    } else {
      for (k = 0; k < s.length - RAIN_DENSITY; k++){
        s.pop();
      }
    }
  });

  windAdjuster = createSlider(-6, 6, 0, 0.1);
  windAdjuster.input(() => WIND = windAdjuster.value());
  
  // let a = createButton('label', undefined);
  
  for (i = 0; i < RAIN_DENSITY; i++){
    let ray = {x: random(-width, width),
               y: random(-500, 0), 
               z: random(0, 20), 
               angle: WIND, 
               vspeed: 0,
              }
    ray.vspeed = map(ray.z, 0, 20, RAIN_SPEED, 4);
    s.push(ray);
  }

  // noLoop();
  background(50, 80, 140, 30);
  const SKY_COLOR = color(50, 80, 140, 30);
  const BLACK = color (10, 10, 50);
  setGradient(0, height - 80, width, height, BLACK, SKY_COLOR, Y_AXIS);
} 

/*
function draw() {
  // Background
  setGradient(0, 0, width / 2, height, b1, b2, X_AXIS);
  setGradient(width / 2, 0, width / 2, height, b2, b1, X_AXIS);
  // Foreground
  setGradient(50, 90, 540, 80, c1, c2, Y_AXIS);
  setGradient(50, 190, 540, 80, c2, c1, X_AXIS);
}
*/

function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}

function draw() { 
  background(50, 80, 140, 30);
  // const SKY_COLOR = color(50, 80, 140, 30);
  // const BLACK = color (10, 10, 50);
  // setGradient(0, height - 80, width, height, BLACK, SKY_COLOR, Y_AXIS);
  // noStroke();
  strokeWeight(2);
  // noFill();
  
  let noiseOffset = 0;
  
  s.forEach(ray => {
    // fill(240, 200 - map(ray.z, 0, 20, 0, 250));
    stroke(200, 200 - map(ray.z, 0, 20, 0, 200));
    // ellipse(ray.x, ray.y, map(ray.z, 0, 10, 5, 2), 8);
    
    xOffset = map(noise(noiseOffset), 0, 1, -1, 1);
    zModifier = map(ray.z, 0, 20, 1, 1.5);
    
    line(ray.x, ray.y, ray.x + (WIND + xOffset)*zModifier, ray.y + ray.vspeed);
    ray.y += ray.vspeed;
    ray.x += (WIND + xOffset)*zModifier;
    if (ray.y > height){
      ray.y = random(-250, 0);
      ray.z = random(0, 20);
      ray.vspeed = map(ray.z, 0, 20, RAIN_SPEED, 4);
      // ray.angle = WIND;
    }

    if (ray.x < -200 || ray.x > width+200) {
      ray.x = random(-200, width+200);
      ray.y = random(-250, 0);
    }
    
    noiseOffset += 0.01;
  });
  
}