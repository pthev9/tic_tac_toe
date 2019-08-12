const responseGamesList = [
    {gameToken: "0abc",
      owner: "Chuck Norris",
      opponent: "",
      size: 3,
      duration: 0,
      result: "" ,
      // "owner” || "opponent” || "draw”
      state: "ready",
      // "ready” || "playing” || "done”
      turn: "owner",
      field: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ]
    },
    {gameToken: "1abc",
      owner: "Vasy",
      opponent: "Pety",
      size: 3,
      duration: 9000,
      result: "" ,
      state: "playing",
      turn: "owner",
      field: [
        [0, 1, 1],
        [2, 0, 1],
        [2, 2, 0]
      ]
    },
    {gameToken: "2abc",
      owner: "Sasha",
      opponent: "Masha",
      size: 3,
      duration: 12000,
      result: "owner" ,
      state: "done",
      turn: "owner",
      field: [
        [0, 1, 1],
        [2, 0, 1],
        [2, 2, 0]
      ]
    },
    {gameToken: "3abc",
      owner: "Chuck Norris",
      opponent: "",
      size: 3,
      duration: 0,
      result: "" ,
      state: "ready",
      turn: "owner",
      field: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ]
    },
    {gameToken: "4abc",
      owner: "Vasy",
      opponent: "Pety",
      size: 3,
      duration: 9000,
      result: "" ,
      state: "playing",
      turn: "owner",
      field: [
        [0, 1, 1],
        [2, 0, 1],
        [2, 2, 0]
      ]
    },
    {gameToken: "5abc",
      owner: "Sasha",
      opponent: "Masha",
      size: 3,
      duration: 12000,
      result: "owner" ,
      state: "done",
      turn: "owner",
      field: [
        [0, 1, 1],
        [2, 0, 1],
        [2, 2, 0]
      ]
    }
  ];

export default responseGamesList;
