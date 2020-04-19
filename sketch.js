/*
 * @name Bouncy Bubbles
 * @frame 720,400
 * @description  based on code from Keith Peters. Multiple-object collision..
 */

let numBalls = 2;
let spring = 0.6;
let gravity = 0.09;
let friction = -0.0;
let balls = [];

function setup() {
  createCanvas(720, 400);
  for (let i = 0; i < numBalls; i++) {

    mass = 30//random(10, 30)

    balls[i] = new Ball(
      15+30*i,//random(width),
      15,//random(height),
      mass,
      mass,
      i,
      balls
    );
  }
  // noStroke();
  fill(255, 204);
  frameRate(30) 
}

function draw() {
  background(100);
  //    x1,  y1,  x2,  y2
  line(  0, 150, 200, 200);
  line(200, 200, 400, 300);
  line(400, 300, 720, 400);
  
  strokeWeight(3);
  stroke(255);
  balls.forEach(ball => {
    ball.collide();
    ball.move();
    ball.display();
    
    // strokeWeight(0)
    // text(ball.vy, 365, 10);
    // strokeWeight(3)

  });
}

function calculateAngle(xCoord) {
  if (xCoord <=200){
    return atan( 50 / 200 )
  } else if (xCoord <= 400) {
    return atan( 100 / 200 )
  } else {
    return atan( 100 / 320 )
  }  
  
}

function calculateHeight(xCoord) {
  if (xCoord <=200){
    return xCoord * ( 50 / 200 ) + 147
  } else if (xCoord <= 400) {
    return xCoord * ( 100 / 200 ) + 97
  } else {
    return xCoord * ( 100 / 320 ) + 172
  }  
 //return height 
}

class Ball {
  constructor(xin, yin, din, mass, idin, oin) {
    this.x = xin;
    this.y = yin;
    this.vx = 0;
    this.accx = 0;
    this.accy = mass * gravity
    this.vy = 0;
    this.diameter = din;
    this.mass = mass;    
    this.id = idin;
    this.others = oin;
  }

  collide() {
    for (let i = this.id + 1; i < numBalls; i++) {
      // console.log(others[i]);
      let dx = this.others[i].x - this.x;
      let dy = this.others[i].y - this.y;
      let distance = sqrt(dx * dx + dy * dy);
      let minDist = this.others[i].diameter / 2 + this.diameter / 2;
      //   console.log(distance);
      //console.log(minDist);
      if (distance < minDist) {
        //console.log("2");
        let angle = atan2(dy, dx);
        let targetX = this.x + cos(angle) * minDist;
        let targetY = this.y + sin(angle) * minDist;
        let ax = (targetX - this.others[i].x) * spring;
        let ay = (targetY - this.others[i].y) * spring;
        this.vx -= ax;
        this.vy -= ay * this.mass * gravity;
        this.others[i].vx += ax;
        this.others[i].vy += ay * this.others[i].mass;
      }
    }
  }

  move() {
    //  console.log(this.vy)

    let angle = calculateAngle(this.x)
    
    this.x += this.vx;
    this.y += this.vy;
          
    if (this.x + this.diameter / 2 > width) {
      this.x = width - this.diameter / 2;
      this.vx = -this.vx
    } else if (this.x - this.diameter / 2 < 0) {
      this.x = this.diameter / 2;
      this.vx = -this.vx
    }
    let lowerBound = calculateHeight(this.x);
    
    if (this.y + this.diameter / 2 >= lowerBound) {
      this.vx += this.mass * gravity * sin(angle);
      this.y = lowerBound - this.diameter / 2;
      this.vy = -this.vy * spring * cos(angle)
    } else if (this.y - this.diameter / 2 < 0) {
      this.y = this.diameter / 2;
      this.vy = this.mass * gravity
    } else {
      this.vy += this.mass * gravity
    }
  }

  display() {
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}
