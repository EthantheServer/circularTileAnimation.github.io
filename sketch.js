let blocks = [];
let size = 100;
let cols = 3;
let rows = 3;

class Block {
  constructor(x, y, num) {
    // Block variables
    this.x = x;
    this.y = y;
    this.blockCols = num;
    this.blockRows = num;
    this.blockSize = size;
    this.c = random(255);

    // Circle variables
    this.circleSize = this.blockSize / this.blockCols;
    this.movingSize = [];
    this.speed = [];
    for (let i = 0; i < this.blockCols; i++) {
      this.movingSize[i] = [];
      this.speed[i] = [];
      for (let j = 0; j < this.blockRows; j++) {
        this.movingSize[i][j] = (i + j) * 0.5;
        this.speed[i][j] = 0.1;
      }
    }
  }

  display() {
    push();
    noStroke();
    translate(this.x, this.y);
    for (let i = 0; i < this.blockCols; i++) {
      for (let j = 0; j < this.blockRows; j++) {
        let x = this.circleSize / 2 + i * this.circleSize;
        let y = this.circleSize / 2 + j * this.circleSize;
        fill(255, 100);
        ellipse(x, y, this.circleSize, this.circleSize);

        this.move(i, j);
        fill(255, 40, 0);
        ellipse(x, y, this.movingSize[i][j], this.movingSize[i][j]);
      }
    }
    pop();
  }

  move(x, y) {
    this.movingSize[x][y] += this.speed[x][y];
    if (this.movingSize[x][y] > this.circleSize || this.movingSize[x][y] < 0) {
      this.speed[x][y] *= -1;
    }
  }
}

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < cols; i++) {
    blocks[i] = [];
    for (let j = 0; j < rows; j++) {
      if ((i + j) % 2 == 0) {
        blocks[i][j] = new Block(i * size, j * size, 5);
      } else {
        blocks[i][j] = new Block(i * size, j * size, 10);
      }
    }
  }
}

function draw() {
  background(0, 0, 100);
  translate((width - size * cols) / 2, (height - size * rows) / 2);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      blocks[i][j].display();
    }
  }
}
