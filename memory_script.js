(function(root) {
  var MemoryGame = root.MemoryGame = (root.MemoryGame || {});
  
  // MemoryGame.COLORS = [
  //   "Crimson",
  //   "Gold",
  //   "YellowGreen",
  //   "Turquoise",
  //   "Teal",
  //   "Purple", 
  //   "Violet"
  // ];
  
  var Tile = MemoryGame.Tile = function(id) {
    this.id = id;
    this.color = "white";
    this.hidden = true;
  };
  
  Tile.prototype.flip = function() {
    this.hidden = !this.hidden;
    // console.log("flipped", this);
  };
  
  var Board = MemoryGame.Board = function(row, col) {
    this.row = row;
    this.col = col; 
    
    var numTiles = row * col;
    
    this.tiles = this.makeTiles(numTiles);
    this.pairs = this.makePairs(numTiles);
    
    this.colorTiles();
    // console.log("tiles:", this.tiles);
  };
  
  Board.prototype.makeTiles = function(numTiles) {
    var tileNum = -1;
    return _.times(numTiles, function(){
      tileNum += 1;
      return new MemoryGame.Tile(tileNum);
    }); 
  };
  
  Board.prototype.makePairs = function(numTiles) {
    var indices = []; // create array with indices of tiles
    var pairs = [];
    var i;
    for (i = 0; i < numTiles; i++) {
      indices.push(i);
    }
    // shuffle index array
    i = 0;
    while (i < indices.length) {
      var rand = Math.floor(Math.random() * indices.length);
      var temp = indices[i];
      indices[i] = indices[rand];
      indices[rand] = temp;
      i += 1;
    }
    console.log("indices:",indices);
    for (var p = 0; p < Math.floor(numTiles/2); p++) {
      var p1 = indices.pop();
      var p2 = indices.pop();
      var pair = [p1, p2];
      pairs.push(pair);
    }
    console.log("pairs", pairs);
    return pairs;
  };
  
  Board.prototype.randomColor = function() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    var colorString = "rgb(" + r + ", " + g + ", " + b + ")";
    console.log(colorString);
    return colorString;
  };
  
  Board.prototype.colorTiles = function() {
    var board = this;
    var tiles = board.tiles;
    _(this.pairs).each(function(pair) {
      var tile1 = tiles[pair[0]];
      var tile2 = tiles[pair[1]];
      var color = board.randomColor();
      tile1.color = color;
      tile2.color = color;
    });
  };
})(this);