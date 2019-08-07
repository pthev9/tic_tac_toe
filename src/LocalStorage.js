export default class LocalStorage {
  getData() {
    let gamesData = JSON.parse(localStorage.getItem("games"));
    return gamesData;
  }

  pushData(newGameData) {
    let gamesData = JSON.parse(localStorage.getItem("games"));
    if (gamesData) {
      gamesData = gamesData.concat(newGameData);
      gamesData = JSON.stringify(gamesData);
      localStorage.setItem("games", gamesData);
    }
    else {
      gamesData = JSON.stringify(newGameData);
      localStorage.setItem("games", gamesData);
    }
  }

  getGameData (initialGameToken ) {
    let gamesData = JSON.parse(localStorage.getItem("games"));
    gamesData = gamesData.find(game => game.gameToken === initialGameToken);
    return gamesData;
  }

  updateGameData(updatedGameData){
    let updatedData = JSON.stringify(updatedGameData);
    localStorage.setItem("games", updatedData);
  }
}
