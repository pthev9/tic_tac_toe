export default class LocalStorage {
  getData() {
    let gamesData = JSON.parse(localStorage.getItem("games"));
    return gamesData;
  }

  pushData(newGameData) {
    let gamesData = JSON.parse(localStorage.getItem("games"));
    gamesData = gamesData.concat(newGameData);
    gamesData = JSON.stringify(gamesData);
    localStorage.setItem("games", gamesData);
  }

  getGameData (initialGameToken ) {
    let gamesData = JSON.parse(localStorage.getItem("games"));
    return gamesData.find(
      game => game.gameToken === initialGameToken
    );
  }
  updateGameData(updatedGameData){
    let updatedData = JSON.stringify(updatedGameData);
    localStorage.setItem("games", updatedData);
  }
}
