(function(root) {
  var MemoryGame = root.MemoryGame = (root.MemoryGame || {});
  
  var Tile = MemoryGame.Tile = function(id, board) {
    this.id = id;
    this.color = "white";
    this.hidden = true;
    
    this.board = board;
  };
  
  Tile.prototype.flip = function(clickNum) {
    // console.log("flip");
    if (this.hidden) {
      this.unhide(clickNum);
    } else {
      this.hide();
    }
    this.hidden = !this.hidden; // switch tile visibility
  };
  
  Tile.prototype.hide = function() {
    // console.log("flip back", this);
  };
  
  Tile.prototype.unhide = function(clickNum) {
    // set this tile as the first or second tile selected
    var game = this.board;
    // console.log("tile board", game);
    if (clickNum === 0) {
      game.firstTile = this;
    } else {
      game.secondTile = this;
      // check if tiles matching
      game.secondTile.checkMatch(game.firstTile);
    }
  };
  
  Tile.prototype.checkMatch = function(tile) {
    if ((this.color === tile.color) && (this !== tile)) {
      // console.log("Tiles match");
      this.board.score += 1;
    }
  };
  
  var Board = MemoryGame.Board = function(row, col) {
    this.row = row;
    this.col = col; 
    
    var numTiles = row * col;
    
    this.tiles = this.makeTiles(numTiles, this);
    this.pairs = this.makePairs(numTiles);
    
    this.colorTiles();
    
    this.score = 0;

    this.firstTile = null;
    this.secondTile = null;
  };
  
  Board.prototype.makeTiles = function(numTiles, board) {
    var tileNum = -1;
    return _.times(numTiles, function(){
      tileNum += 1;
      return new MemoryGame.Tile(tileNum, board);
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
    for (var p = 0; p < Math.floor(numTiles/2); p++) {
      var p1 = indices.pop();
      var p2 = indices.pop();
      var pair = [p1, p2];
      pairs.push(pair);
    }
    return pairs;
  };
  
  Board.prototype.randomColor = function() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    var colorString = "rgb(" + [r, g, b].join(", ") + ")";
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