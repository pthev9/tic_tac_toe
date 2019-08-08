export default class Games {
  getAll() {
    let games = localStorage.getItem("games");
    games = JSON.parse(games);
    return games;
  }

  pushNew(games, newGame) {
    if (games) {
      games = games.concat(newGame);
      games = JSON.stringify(games);
      localStorage.setItem("games", games);
    }
    else {
      games = JSON.stringify(newGame);
      localStorage.setItem("games", games);
    }
  }

  getActive(games, gameToken) {
    let gameData = games.find(game => game.gameToken === gameToken);
    return gameData;
  }

  update(updatedGameData) {
    let updatedData = JSON.stringify(updatedGameData);
    localStorage.setItem("games", updatedData);
  }

  getActiveIndex(games, gameToken) {
    let gameIndex = games.findIndex(game => game.gameToken === gameToken);
    return gameIndex;
  }

}
