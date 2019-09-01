export default class LocalStorage {
  getAll() {
    let games = localStorage.getItem("games");
    games = JSON.parse(games);
    return games;
  }

  pushNew(games, newGame) {
    if (!games) {
      games = [];
    }
    games.push(newGame);
    games = JSON.stringify(games);
    localStorage.setItem("games", games);
  }

  // getActive(games, gameToken) {
  //   if (!games) {return};
  //   let gameData = games.find(game => game.gameToken === gameToken);
  //   return gameData;
  // }

  update(updatedGameData) {
    let updatedData = JSON.stringify(updatedGameData);
    localStorage.setItem("games", updatedData);
  }

  getActiveIndex(games, gameToken) {
    if (!games) {return};
    let gameIndex = games.findIndex(game => game.gameToken === gameToken);
    return gameIndex;
  }
}
