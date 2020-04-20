
gravity = 0.09
spring = 0.6
friction = 0.4
balls = []

class Ball {
    constructor(xin, yin, din, mass, idin, oin) {
      this.x = xin;
      this.y = yin;
      this.vx = 0;
      this.vy = 0;
      this.accx = 0;
      this.accy = gravity;
      this.diameter = din;
      this.mass = mass;    
      this.id = idin;
      this.others = oin;
      this.color = [random(255), random(255), random(255)]
    }

    move() {
        //  console.log(this.vy)
    
        let angle = 0 //calculateAngle(this.x)
        let lowerBound = calculateHeight(this.x);
        
        this.x += this.vx;
        this.y += this.vy;
              
        if (this.x + this.diameter / 2 > width) {
          this.x = width - this.diameter / 2;
          this.vx = -this.vx * spring * friction
          this.accx =-this.accx
        } else if (this.x - this.diameter / 2 < 0) {
          this.x = this.diameter / 2;
          this.vx = -this.vx * spring * friction
          this.accx =-this.accx
        } else {
          this.vx += this.accx
        }
    
        if (this.y + this.diameter / 2 >= lowerBound) {
          this.vx *= friction
          this.accx = this.accx * friction
          this.y = lowerBound - this.diameter / 2;
          this.vy = -this.vy * spring * cos(angle) //* friction
        } else if (this.y - this.diameter / 2 < 0) {
          this.y = this.diameter / 2;
          this.vy = gravity// this.mass * gravity
        } else {
        //   this.accy += this.accy + this.mass * gravity
          this.vy += this.accy
        }
        
 
        // if (abs(this.vy) < 0.1) { 
        //     this.vy = 0
        // }
        //  if (abs(this.vx) < 0.1) { 
        //     this.vx = 0
        // }
        // this.vx = rnd(this.vx, 2)
        // this.vy = rnd(this.vy, 2)
     }
    
      display() {
        fill(255)
        text('Vert acc = '+rnd(this.accy, 3), 10 + 100*this.id, 10)
        text('Vert vel = '+rnd(this.vy, 3), 10+ 100*this.id, 30)
        text('Horz acc = '+rnd(this.accx, 3), 10+ 100*this.id, 50)
        text('Horz vel = '+rnd(this.vx, 3), 10+ 100*this.id, 70)

        fill(this.color)
        ellipse(this.x, this.y, this.diameter, this.diameter);
      }
}

function calculateHeight(xCoord) {
    // if (xCoord <=200){
    //   return xCoord * ( 50 / 200 ) + 147
    // } else if (xCoord <= 400) {
    //   return xCoord * ( 100 / 200 ) + 97
    // } else {
    //   return xCoord * ( 100 / 320 ) + 172
    // }  
   return height 
  }

function rnd(num, dec){
    return Number(num.toFixed(dec))
}


function setup() {
    createCanvas(400, 800);
    noStroke();
    fill(255, 204);
    // frameRate(2)

    balls[0] = new Ball(100, 0, 20, 2, 0)
    balls[1] = new Ball(300, 0, 50, 5, 1)

   }
  
function draw() {
    background(100);
    balls.forEach(ball => {
      ball.move()
      ball.display()
    });

}