import React from 'react';
import responseGamesList from "./responseGamesList";

function pushLocalStorage() {
  let games = JSON.stringify(responseGamesList);
  localStorage.setItem("games", games);
  console.log("localStorage updated!")
}

function resetLocalStorage() {
  localStorage.clear();
  console.log("localStorage cleared!")
}

function Main () {
  return (
    <div>
      <header className="header">Крестики Нолики</header>
      <button onClick={() => resetLocalStorage()}> Clear Local Storage </button>
      <button onClick={() => pushLocalStorage()}> Update Local Storage </button>
    </div>

  )
}

export default Main;
