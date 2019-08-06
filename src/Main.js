import React from 'react';
// import responseGamesList from "./responseGamesList"
//
// let games = JSON.stringify(responseGamesList);
// localStorage.setItem("games", games);

// function fact(n) {
//   if (n==1) {return 1}
//   else return n * fact(n-1);
// }
// console.log("факториал:" + fact(4));
let arr = [
  [1,1,0],
  [2,2,2],
  [1,2,1]
];

let columns = new Array(3);
  for (let i = 0; i < columns.length; i++)
    columns[i] = new Array();
for (let i=0; i<=2; i++) {
  for (let j=0; j<=2; j++){
    columns[j].push( arr[i][j] );
  }
}
console.log(columns);

function checkWinner(array){
  let winner;
  for (let i = 0; i < array.length; i++) {
    let firstCell = array[i][0];
    if (array[i].every(value => value === firstCell) === true) {
      winner = firstCell;
      console.log(winner + " is Winner!");
    }
  }
  return winner;
}

let diagonals = [[],[]];
  for (let i = 0, j = 2; i <= 2, j >= 0; i++, j--) {
    diagonals[0].push(arr[i][i])
    diagonals[1].push(arr[i][j])
  }
console.log(diagonals);

checkWinner(arr);
checkWinner(columns);
checkWinner(diagonals);

function checkNoWays(array) {
  let gameFieldToString = array.join(',');
  return !gameFieldToString.includes(0);
}

if (checkNoWays(arr)) {
  console.log("Draw!");
}

function Main () {
  return (
    <div>
      <header className="header">Крестики Нолики</header>
    </div>
  )
}
export default Main;
