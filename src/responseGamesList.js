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
      gameField: [0,1,2,0,0,0,0,1,1]
    },
    {gameToken: "1abc",
      owner: "Vasy",
      opponent: "Pety",
      size: 3,
      gameDuration: 9323,
      gameResult: "" ,
      state: "playing",
      gameField: [0,0,0,0,0,0,1,1,2]
    },
    {gameToken: "2abc",
      owner: "Sasha",
      opponent: "Masha",
      size: 3,
      gameDuration: 12323,
      gameResult: "owner" ,
      state: "done",
      gameField: [0,0,0,0,0,0,0,1,2]
    },
    {gameToken: "3abc",
      owner: "Chuck Norris",
      opponent: "",
      size: 3,
      gameDuration: 0,
      gameResult: "" ,
      state: "ready",
      gameField: [0,0,0,0,0,0,0,1,2]
    },
    {gameToken: "4abc",
      owner: "Vasy",
      opponent: "Pety",
      size: 3,
      gameDuration: 9323,
      gameResult: "" ,
      state: "playing",
      gameField: [0,0,0,0,0,0,0,1,2]
    },
    {gameToken: "5abc",
      owner: "Sasha",
      opponent: "Masha",
      size: 3,
      gameDuration: 12323,
      gameResult: "owner" ,
      state: "done",
      gameField: [0,0,0,0,0,0,0,1,2]
    }
  ];

export default responseGamesList;
