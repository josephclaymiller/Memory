(function(root) {
  var MemoryGame = root.MemoryGame = (root.MemoryGame || {});
  
  var View = MemoryGame.View = function(el) {
    this.$el = el;
    
    this.board = null;
    this.clickNum = 0;
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
          $cell.css("background-color", color);
        }
        $rowEl.append($cell);
        id += 1;
      });
      view.$el.append($rowEl);
    });
    view.handleClickEvents(); // add click event handlers to new cells
    view.setScore(board.score);
  };
  
  View.prototype.start = function() {
    this.board = new MemoryGame.Board(3, 4);
    this.render();
  };
  
  View.prototype.flip = function(div) {
    this.board.tiles[div.id].flip(this.clickNum);
    this.render();
  }
  
  View.prototype.removeClickEvents = function() {
    $('.cell').off('click');
  };
  
  View.prototype.handleClickEvents = function() {
    var view = this;
    var board = view.board;
    // add click event handler to each cell
    $('.cell').on('click', function(event){
      view.flip(event.currentTarget);
      if (view.clickNum === 1) {
        // stop click events every second click
        view.removeClickEvents(); 
        // set timer to flip two tiles back over
        view.flipTimer = window.setTimeout(function(){
          view.flip(board.firstTile);
          view.flip(board.secondTile);
        }, 1000);
      }
      view.clickNum = ((view.clickNum + 1) % 2);
    });
  };
  
  View.prototype.setScore = function(score) {
    $('#score').text("score:" + score);
  };
  
})(this);
