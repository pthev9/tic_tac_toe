export default class EndGame {
  getWinner(field, size) {
    let cellsArray = field;
    let fieldSize = size;
    let winner = this.checkOnWinner(cellsArray) ||
                 this.checkOnWinner(this.getColumns(cellsArray, fieldSize)) ||
                 this.checkOnWinner(this.getDiagonals(cellsArray, fieldSize));
    return winner;
  }

  getColumns (cellsArray, fieldSize) {
    let columns = new Array(fieldSize);

    for (let i = 0; i < columns.length; i++) {
        columns[i] = [];
    }
    for (let i = 0; i < columns.length; i++) {
      for (let j = 0; j < columns.length; j++) {
        columns[j].push(cellsArray[i][j]);
      }
    }

    return columns;
  }

  getDiagonals (cellsArray, fieldSize) {
    let diagonals = [[],[]];

    let i = 0;
    let j = (fieldSize - 1);
    while (i < fieldSize, j >= 0) {
      diagonals[0].push(cellsArray[i][i]);
      diagonals[1].push(cellsArray[i][j]);
      i++;
      j--;
    }

    return diagonals;
  }

  checkOnWinner(cellsArray) {
    let firstCell;
    let winner;

    let i = 0;
    while (i < cellsArray.length) {
      firstCell = cellsArray[i][0];
      if (firstCell === 0) {
        break;
      }
      if (cellsArray[i].every(value => value === firstCell) === true) {
        winner = firstCell;
      }
      i++;
    }

    return winner;
  }

  checkNoWays(field) {
    let fieldToString = field.join(',');
    return !fieldToString.includes(0);
  }
}
