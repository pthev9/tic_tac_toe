export default class CheckEndGame {
  checkEndGame(gameField){
    let cellsArray = gameField;
    let winner = this.checkOnWinner(cellsArray) ||
                 this.checkOnWinner(this.getColumns(cellsArray)) ||
                 this.checkOnWinner(this.getDiagonals(cellsArray));
    console.log(winner + " is Winner!");
  }

  getColumns (cellsArray) {
    let columns = new Array(3);
      for (let i = 0; i < columns.length; i++)
        columns[i] = new Array();
      for (let i=0; i< columns.length; i++) {
        for (let j=0; j< columns.length; j++){
          columns[j].push( cellsArray[i][j] );
        }
      }
    return columns;
  }

  getDiagonals (cellsArray) {
    let diagonals = [[],[]];
      for (let i = 0, j = 2; i <= 2, j >= 0; i++, j--) {
        diagonals[0].push(cellsArray[i][i])
        diagonals[1].push(cellsArray[i][j])
      }
    return diagonals;
  }

  checkOnWinner(cellsArray) {
    let winner;
    for (let i = 0; i < cellsArray.length; i++) {
      let firstCell = cellsArray[i][0];
      if (cellsArray[i].every(value => value === firstCell) === true) {
        winner = firstCell;
      }
    }
    return winner;
  }

  checkNoWays(cellsArray) {
    let gameFieldToString = cellsArray.join(',');
    return !gameFieldToString.includes(0);
  }
}
