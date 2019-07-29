const responseGamesList = [
    {gameToken: "0abc",
      owner: "Chuck Norris",
      opponent: "",
      size: 3,
      gameDuration: 0,
      gameResult: "" ,
      // "owner” || "opponent” || "draw”
      state: "ready",
      // "ready” || "playing” || "done”
      turn: "owner",
      gameField: [
        [0, 1, 1],
        [2, 0, 1],
        [2, 2, 0]
      ]
    },
    {gameToken: "1abc",
      owner: "Vasy",
      opponent: "Pety",
      size: 3,
      gameDuration: 9323,
      gameResult: "" ,
      state: "playing",
      turn: "owner",
      gameField: [
        [0, 1, 1],
        [2, 0, 1],
        [2, 2, 0]
      ]
    },
    {gameToken: "2abc",
      owner: "Sasha",
      opponent: "Masha",
      size: 3,
      gameDuration: 12323,
      gameResult: "owner" ,
      state: "done",
      turn: "owner",
      gameField: [
        [0, 1, 1],
        [2, 0, 1],
        [2, 2, 0]
      ]
    },
    {gameToken: "3abc",
      owner: "Chuck Norris",
      opponent: "",
      size: 3,
      gameDuration: 0,
      gameResult: "" ,
      state: "ready",
      turn: "owner",
      gameField: [
        [0, 1, 1],
        [2, 0, 1],
        [2, 2, 0]
      ]
    },
    {gameToken: "4abc",
      owner: "Vasy",
      opponent: "Pety",
      size: 3,
      gameDuration: 9323,
      gameResult: "" ,
      state: "playing",
      turn: "owner",
      gameField: [
        [0, 1, 1],
        [2, 0, 1],
        [2, 2, 0]
      ]
    },
    {gameToken: "5abc",
      owner: "Sasha",
      opponent: "Masha",
      size: 3,
      gameDuration: 12323,
      gameResult: "owner" ,
      state: "done",
      turn: "owner",
      gameField: [
        [0, 1, 1],
        [2, 0, 1],
        [2, 2, 0]
      ]
    }
  ];

export default responseGamesList;
