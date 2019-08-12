export default class EndGame {
  getWinner(field){
    let cellsArray = field;
    let winner = this.checkOnWinner(cellsArray) ||
                 this.checkOnWinner(this.getColumns(cellsArray)) ||
                 this.checkOnWinner(this.getDiagonals(cellsArray));
    return winner;
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
      if (firstCell === 0) {
        break;
      }
      if (cellsArray[i].every(value => value === firstCell) === true) {
        winner = firstCell;
      }
    }
    return winner;
  }

  checkNoWays(field) {
    let fieldToString = field.join(',');
    return !fieldToString.includes(0);
  }
}
