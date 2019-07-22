export default class LocalStorage {
  getData() {
    let gamesData = JSON.parse(localStorage.getItem("games"));
    return gamesData;
  }

  pushData(newData) {
    let gamesData = JSON.parse(localStorage.getItem("games"));
    let updatedData = gamesData.concat(newData);
    updatedData = JSON.stringify(updatedData);
    localStorage.setItem("games", updatedData);
  }

  getGameData (initialGameToken ) {
    let gamesData = JSON.parse(localStorage.getItem("games"));
    return gamesData.find(
      game => game.gameToken === initialGameToken
    );
  }
}
