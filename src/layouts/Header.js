import React from 'react';
import "./header.css";
import initialGamesList from "../developmentData/initialGamesList";


function pushLocalStorage() {
  let games = JSON.stringify(initialGamesList);
  localStorage.setItem("games", games);
  console.log("localStorage updated!")
}

function resetLocalStorage() {
  localStorage.clear();
  console.log("localStorage cleared!")
}

function Header() {
  return (
    <div>
      <header className="header">Крестики Нолики</header>
      <button onClick={() => resetLocalStorage()}> Clear Local Storage </button>
      <button onClick={() => pushLocalStorage()}> Update Local Storage </button>
    </div>

  )
}

export default Header;
