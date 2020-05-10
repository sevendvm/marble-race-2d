const scl = 20;

let maze;

class Cell{

    constructor(x, y, w, h){
        this.pos = {x:x, y:y};

        this.h = h;
        this.w = w;

        this.walls = {
            top:    true,
            left:   true,
            bottom: true,
            right:  true
        }
        this.neighbors = [];
        this.visited = false;
        
        this.isCurrent = false;
        this.isInStack = false;

    }

    show(){
        if (this.isCurrent){
            fill(255, 50, 0);
        } else if (this.isInStack){
            fill(0, 10, 250);
        } else if (this.visited){
            fill(0, 10, 50);
        } else {
            noFill();
        }

        let i = this.pos.x;
        let j = this.pos.y;
        
        noStroke();
        rect(i*scl, j*scl, scl, scl);
        
        stroke(255);

        if (this.walls.top){
            line(i*scl, j*scl, (i + 1)*scl, j*scl);
        }
        if (this.walls.left){
            line(i*scl, j*scl, i*scl, (j+1)*scl);
        }
        if (this.walls.bottom){
            line(i*scl, (j+1)*scl, (i+1)*scl, (j+1)*scl);
        }
        if (this.walls.right){
            line((i+1)*scl, j*scl, (i+1)*scl, (j+1)*scl);
        }
    }

}


class Maze{
    constructor(w, h){
        this.cells = [];
        this.h = h;
        this.w = w;

        for (let i = 0; i < w; i++) {
            this.cells[i] = [];
            for (let j = 0; j < h; j++) {
                this.cells[i][j] = new Cell(i, j, w, h);
            }
        }  
    }

    show(){
        this.cells.forEach(row => {
            row.forEach(cell => {
                cell.show();
            });
        });
    }

    removeWall(cellA, cellB){
        if (cellA.pos.x == cellB.pos.x){
            //same row
            if (cellA.pos.y > cellB.pos.y){
                cellA.walls.top = false;
                cellB.walls.bottom = false;
            } else {
                cellA.walls.bottom = false;
                cellB.walls.top = false;
            }
        } else if (cellA.pos.y == cellB.pos.y){
            if (cellA.pos.x > cellB.pos.x){
                cellA.walls.left = false;
                cellB.walls.right = false;
            } else {
                cellA.walls.right = false;
                cellB.walls.left = false;
            }
        }
    }
    
    getNeighbors(cell){
        let neighbors = [];
        let i = cell.pos.x;
        let j = cell.pos.y;
        // if (i > 0 && i < w){
        if (i > 0 && !(this.cells[i-1][j].visited)){
            neighbors.push(this.cells[i-1][j]);
        }
        if (i < this.w - 1 && !(this.cells[i+1][j].visited)){
            neighbors.push(this.cells[i+1][j]);
        }
        if (j > 0 && !(this.cells[i][j-1].visited)){
            neighbors.push(this.cells[i][j-1]);
        }
        if (j < this.h - 1 && !(this.cells[i][j+1].visited)){
            neighbors.push(this.cells[i][j+1]);
        }

        return neighbors;
    }

}

let current;
let stack = [];

function setup() {
    createCanvas(400, 400);
    background(40);
    
    let w = width / scl;
    let h = height / scl;

    maze = new Maze(w, h);

    current = maze.cells[0][0];
    current.visited = true;

    // frameRate(20);
}

function draw() {
    
    
 
    let neighbors = maze.getNeighbors(current);

    if (neighbors.length > 0){
        
        stack.push(current);
        current.isInStack = true;
     
        next = neighbors[floor(random(0, neighbors.length))];

        
        maze.removeWall(current, next);
    
        current.isCurrent = false;
        current = next;
        
        current.isCurrent = true;
        current.visited = true;

    } else if (stack.length > 0) {
        current.isCurrent = false;
        current = stack.pop();
        current.isInStack = false;
        current.isCurrent = true;
    } else {
        noLoop();
        // maze.show();
    }

    maze.show();
}