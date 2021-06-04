class Connect4{
  constructor(selector){
    this.rows = 6;
    this.cols = 7;
    this.selector=selector;
    this.createGrid();
    this.player ="red";
  }


  createGrid(){
    const $board = $(this.selector);

    for(let row=0;row<this.rows;row++){
      const $row = $('<div>').addClass('row');

    for(let col=0;col<this.cols;col++){
      const $col = $('<div>')
         .addClass('col empty')
         .attr('data-col',col)
         .attr('data-row',row);
      $row.append($col);
    }
      $board.append($row);

    }
  }

  setupEventListener(){
    const $board = $(this.selector);
    const $cell = $('.col');
    const thisRows = this.rows;
    const thisCols = this.cols;
    var that = this;

    function findLastColEle(row,col){
      var cell = row*thisCols+col;

      while(cell<thisCols*thisRows && $cell[cell].classList.contains('empty')){
        cell+=thisCols;
      }
      cell-=thisCols;

      return cell;

    }


    function winnerCheck(row,col){
      var cell=findLastColEle(row,col)+thisCols;
      row = row+(cell-(row*thisCols+col))/thisCols;
        function horizontalWin(){

          if((col+3<thisCols && $cell[cell].classList.value==$cell[cell+1].classList.value && $cell[cell].classList.value==$cell[cell+2].classList.value
          && $cell[cell].classList.value==$cell[cell+3].classList.value)||(col-3>=0 && $cell[cell].classList.value==$cell[cell-1].classList.value
          && $cell[cell].classList.value==$cell[cell-2].classList.value && $cell[cell].classList.value==$cell[cell-3].classList.value)||
          (col-1>=0 && col+2<thisCols && $cell[cell].classList.value==$cell[cell-1].classList.value && $cell[cell].classList.value==
          $cell[cell+1].classList.value && $cell[cell].classList.value==$cell[cell+2].classList.value) || (col-2>=0 && col+1<thisCols && $cell[cell].classList.value==
          $cell[cell-1].classList.value && $cell[cell].classList.value==$cell[cell+1].classList.value && $cell[cell].classList.value==$cell[cell-2].classList.value)) return true;

        }
        function verticalWin(){

          if(row+3<thisRows && $cell[cell].classList.value==$cell[cell+thisCols].classList.value
          && $cell[cell].classList.value==$cell[cell+2*thisCols].classList.value && $cell[cell].classList.value==
          $cell[cell+3*thisCols].classList.value) return true;

        }
        function diagonalWin(){
          if((row-3>=0 && col+3<thisCols && $cell[cell].classList.value==$cell[cell-thisCols+1].classList.value && $cell[cell].classList.value==
            $cell[cell-2*thisCols+2].classList.value && $cell[cell].classList.value==$cell[cell-3*thisCols+3].classList.value ) ||
            (row-2>=0 && col+2<thisCols && row+1<thisRows && col-1>=0 && $cell[cell].classList.value==$cell[cell-thisCols+1].classList.value &&
            $cell[cell].classList.value==$cell[cell-2*thisCols+2].classList.value && $cell[cell].classList.value==$cell[cell+thisCols-1].classList.value ) ||
            (row-1>=0 && col+1<thisCols && row+2<thisRows && col-2>=0 && $cell[cell].classList.value==$cell[cell-thisCols+1].classList.value &&
            $cell[cell].classList.value==$cell[cell+2*thisCols-2].classList.value && $cell[cell].classList.value==$cell[cell+thisCols-1].classList.value ) ||
            (row+3<thisRows && col-3>=0 && $cell[cell].classList.value==$cell[cell+thisCols-1].classList.value &&
            $cell[cell].classList.value==$cell[cell+2*thisCols-2].classList.value && $cell[cell].classList.value==$cell[cell+3*thisCols-3].classList.value )||

            (row-3>=0 && col-3>=0 && $cell[cell].classList.value==$cell[cell-thisCols-1].classList.value && $cell[cell].classList.value==
              $cell[cell-2*thisCols-2].classList.value && $cell[cell].classList.value==$cell[cell-3*thisCols-3].classList.value ) ||
              (row-2>=0 && col-2>=0 && row+1<thisRows && col+1<thisCols && $cell[cell].classList.value==$cell[cell-thisCols-1].classList.value &&
              $cell[cell].classList.value==$cell[cell-2*thisCols-2].classList.value && $cell[cell].classList.value==$cell[cell+thisCols+1].classList.value ) ||
              (row-1>=0 && col-1>=0 && row+2<thisRows && col+2<thisCols && $cell[cell].classList.value==$cell[cell-thisCols-1].classList.value &&
              $cell[cell].classList.value==$cell[cell+2*thisCols+2].classList.value && $cell[cell].classList.value==$cell[cell+thisCols+1].classList.value ) ||
              (row+3<thisRows && col+3<thisCols && $cell[cell].classList.value==$cell[cell+thisCols+1].classList.value &&
              $cell[cell].classList.value==$cell[cell+2*thisCols+2].classList.value && $cell[cell].classList.value==$cell[cell+3*thisCols+3].classList.value )


          ) return true;

        }

        if(horizontalWin() || verticalWin() || diagonalWin()) return true;
        return false;
    }



    $board.on('mouseenter','.col.empty',function(){
      const col = $(this).data('col');
      const row = $(this).data('row');
      const lastEmptyCell = findLastColEle(row,col);
      $cell[lastEmptyCell].classList.add('next-'+that.player);

    })

    $board.on('mouseout','.col.empty',function(){
      const col = $(this).data('col');
      const row = $(this).data('row');
      const lastEmptyCell = findLastColEle(row,col);
      $cell[lastEmptyCell].classList.remove('next-'+that.player);

    })

    $board.on('click','.col.empty',function(){
      const col = $(this).data('col');
      const row = $(this).data('row');
      const lastEmptyCell = findLastColEle(row,col);
      $cell[lastEmptyCell].classList.add(that.player);
      $cell[lastEmptyCell].classList.remove('empty','next-'+that.player);
      const winner = winnerCheck(row,col);
      if(winner){
        alert("GAME OVER! "+that.player+" won");
      }
      that.player = that.player=="red"?"blue":"red";
      $(this).trigger('mouseenter');

    })

  }






}
