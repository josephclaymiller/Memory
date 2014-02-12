(function(root) {
  var MemoryGame = root.MemoryGame = (root.MemoryGame || {});
  
  var View = MemoryGame.View = function(el) {
    this.$el = el;
    
    this.board = null;
  };
  
  View.prototype.buildGrid = function(rowSize, colSize) {
    var board = this;
    var i = 0; // cell id number
    return _.times(rowSize, function(){
      return _.times(colSize, function(){
        $div = $('<div class="cell"></div>');
        $div.attr('id', i);
        i += 1;
        return $div;
      }); 
    });
  };
  
  View.prototype.render = function() {
    var view = this;
    var board = view.board;
    var tiles = board.tiles;
    // console.log("board tiles", tiles);
    // remove last board
    this.$el.empty(); 
    // build board
    var id = 0;  
    var cellGrid = this.buildGrid(board.row, board.col);
    _(cellGrid).each(function(row) {
      var $rowEl = $('<div class="row"></div>');
      _(row).each(function($cell) { 
        var tile = tiles[id];
        var color = tile.color;
        if (tile.hidden) {
          $cell.addClass("hidden");
        } else {
          // $cell.addClass(color);
          $cell.css("background-color", color);
        }
        $rowEl.append($cell);
        id += 1;
      });
      view.$el.append($rowEl);
    });
    this.handleClickEvents(); // add click event handlers to new cells
  };
  
  View.prototype.start = function() {
    // console.log("Started game of Memory");
    this.board = new MemoryGame.Board(2, 4);
    this.render();
  };
  
  View.prototype.flip = function(div) {
    // console.log("flip tile", div.id);
    // console.log(this.board.tiles[div.id]);
    this.board.tiles[div.id].flip();
    this.render();
  }
  
  View.prototype.handleClickEvents = function() {
    var game = this;
    // add click event handler to each cell
    $('.cell').on('click', function(event){
      // console.log("clicked cell", event.currentTarget);
      game.flip(event.currentTarget);
    });
  };
  
})(this);
