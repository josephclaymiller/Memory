(function(root) {
  var MemoryGame = root.MemoryGame = (root.MemoryGame || {});
  
  MemoryGame.COLORS = ["red", "green", "blue"];
  
  var Tile = MemoryGame.Tile = function(id) {
    this.id = id;
    this.color = "white";
    this.hidden = true;
  };
  
  Tile.prototype.flip = function() {
    this.hidden = !this.hidden;
    // console.log("flipped", this);
  };
  
  Tile.prototype.setColor = function(colorNum) {
    this.color = MemoryGame.COLORS[colorNum];
  };
  
  var Board = MemoryGame.Board = function(row, col) {
    this.row = row;
    this.col = col; 
    
    this.tiles = this.makeTiles(row * col);
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
  
  Board.prototype.colorTiles = function() {
    _(this.tiles).each(function(tile) {
      var randomNum = Math.floor(Math.random() * MemoryGame.COLORS.length);
      tile.setColor(randomNum);
    });
  };
})(this);