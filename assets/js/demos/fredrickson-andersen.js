var w;
var columns;
var rows;
var board;
var next;

function setup() {
  var canvas = createCanvas(300, 300);
  canvas.parent('sketch-holder');
  w = 2;
  // Calculate columns and rows
  columns = floor(width/w);
  rows = floor(height/w);
  // Wacky way to make a 2D array is JS
  board = new Array(columns);
  for (var i = 0; i < columns; i++) {
    board[i] = new Array(rows);
  }
  // Going to use multiple 2D arrays and swap them
  next = new Array(columns);
  for (i = 0; i < columns; i++) {
    next[i] = new Array(rows);
  }
  init();
}

function draw() {
  background(255);
  generate();
  for ( var i = 0; i < columns;i++) {
    for ( var j = 0; j < rows;j++) {
      if ((board[i][j] == 1)) fill(0);
      else fill(255);
      stroke(0);
      rect(i*w, j*w, w, w);
    }
  }

}

// reset board when mouse is pressed
function mousePressed() {
  init();
}



// Fill board randomly
function init() {
  for (var i = 0; i < columns; i++) {
    for (var j = 0; j < rows; j++) {
      board[i][j] = 0
      next[i][j] = 0;
      board[floor(width/(2*w))][floor(height/(2*w))] = 1
    }
  }
}

// The process of creating the new generation
function generate() {

  // Loop through every spot in our 2D array and check spots neighbors
  for (var x = 1; x < columns - 1; x++) {
    for (var y = 1; y < rows - 1; y++) {
      // Add up all the states in a 3x3 surrounding grid
      var neighbors = 0;
      for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
          neighbors += board[x+i][y+j];
        }
      }

      // A little trick to subtract the current cell's state since
      // we added it in the above loop
      neighbors -= board[x][y];

      if (neighbors >  0) next[x][y] = (Math.random() >= 0.5);           // FA update
    }
  }

  // Swap!
  var temp = board;
  board = next;
  next = temp;

  if (board[1][1] == 1) {
    init();
  }
}
