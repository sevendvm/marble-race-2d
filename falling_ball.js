
gravity = 0.09
spring = 0.7
friction = 1.2


class Ball {
    constructor(xin, yin, din, mass, idin, oin) {
      this.x = xin;
      this.y = yin;
      this.vx = 0;
      this.vy = 0;
      this.accx = 0;
      this.accy = mass * gravity;
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
          this.vx = -this.vx * sin(angle) * spring * friction
        } else if (this.x - this.diameter / 2 < 0) {
          this.x = this.diameter / 2;
          this.vx = -this.vx * spring * friction
        } else {
          this.vx += this.accx
        }
    
        if (this.y + this.diameter / 2 >= lowerBound) {
        //   this.vx += this.mass * gravity * sin(angle);
          this.y = lowerBound - this.diameter / 2;
          this.vy = -this.vy * spring * cos(angle) //* friction
        } else if (this.y - this.diameter / 2 < 0) {
          this.y = this.diameter / 2;
          this.vy = this.mass * gravity
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
        text('Vert acc = '+this.accy, 10, 10)
        text('Vert vel = '+this.vy, 10, 30)
        text('Horz acc = '+this.accx, 10, 50)
        text('Horz vel = '+this.vx, 10, 70)

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

    ball = new Ball(200, 0, 50, 2)

   }
  
function draw() {
    background(100);

    ball.move()
    ball.display()

}