import { Game } from "./game";
import { GameConfig, Player, Status } from "@/lib/types";
import { mergeColInBoard, stubEmptyBoard } from "./stubs";

describe("Play", () => {
  describe("when the game is starting", () => {
    it("should set the game board empty", () => {
      const game = new Game({});
      // Assert
      expect(game.board).toEqual([
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ]);
    });
    it("should be the player 1 turn", () => {
      const game = new Game({});

      expect(game.currentPlayer).toBe(Player.ONE);
    });
  });

  describe("when a player select a column", () => {
    it("should not be possible to push token into invalid column", () => {
      const config: GameConfig = {
        board: mergeColInBoard(stubEmptyBoard, 0, [0, 0, 0, 0, 0, 0]),
      };
      const game = new Game(config);

      const err = game.pushToken(-1);
      expect(err).toEqual(new Error("Invalid column"));
    });
    it("should not be possible to push token into full column", () => {
      const config: GameConfig = {
        board: mergeColInBoard(stubEmptyBoard, 0, [1, 1, 1, 1, 1, 1]),
      };
      const game = new Game(config);

      const err = game.pushToken(0);
      expect(err).toEqual(new Error("Column is full"));
    });
    it("should be possible to push token into non full column", () => {
      const config: GameConfig = {
        board: mergeColInBoard(stubEmptyBoard, 0, [1, 1, 1, 1, 1, 0]),
      };
      const game = new Game(config);

      const err = game.pushToken(0);
      expect(err).toBeNull();
      expect(game.board).toEqual(
        mergeColInBoard(stubEmptyBoard, 0, [1, 1, 1, 1, 1, 1])
      );
    });

    it("should be possible to push token into an empty column", () => {
      const config: GameConfig = {
        board: mergeColInBoard(stubEmptyBoard, 0, [0, 0, 0, 0, 0, 0]),
      };
      const game = new Game(config);

      const err = game.pushToken(0);
      expect(err).toBeNull();
      expect(game.board).toEqual(
        mergeColInBoard(stubEmptyBoard, 0, [1, 0, 0, 0, 0, 0])
      );
    });
  });
  describe("when a token is added", () => {
    describe("when a player connects 4 tokens verticaly", () => {
      const tableTest = [
        {
          board: mergeColInBoard(stubEmptyBoard, 0, [1, 1, 1, 0, 0, 0]),
          firstToPlay: Player.ONE,
          winner: Player.ONE,
        },
        {
          board: mergeColInBoard(stubEmptyBoard, 0, [2, 1, 1, 1, 0, 0]),
          firstToPlay: Player.ONE,
          winner: Player.ONE,
        },
        {
          board: mergeColInBoard(stubEmptyBoard, 0, [2, 2, 1, 1, 1, 0]),
          firstToPlay: Player.ONE,
          winner: Player.ONE,
        },
        {
          board: mergeColInBoard(stubEmptyBoard, 0, [1, 1, 2, 2, 2, 0]),
          firstToPlay: Player.TWO,
          winner: Player.TWO,
        },
      ];
      let i = 0;
      for (const { board, firstToPlay, winner } of tableTest) {
        it(`should set winner (${i})`, () => {
          const config: GameConfig = { board, firstToPlay } as GameConfig;
          const game = new Game(config);

          const err = game.pushToken(0);
          expect(err).toBeNull();
          expect(game.winner).toBe(winner);
        });
        i++;
      }
    });

    describe("when a player connects 4 tokens horizontaly", () => {
      const tableTest = [
        {
          board: [
            [1, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
          ],
          firstToPlay: Player.ONE,
          col: 3,
          winner: Player.ONE,
        },
        {
          board: [
            [1, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
          ],
          firstToPlay: Player.ONE,
          col: 2,
          winner: Player.ONE,
        },
        {
          board: [
            [1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
          ],
          firstToPlay: Player.ONE,
          col: 1,
          winner: Player.ONE,
        },
        {
          board: [
            [0, 0, 0, 0, 0, 0], // <= 1
            [1, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
          ],
          firstToPlay: Player.ONE,
          col: 0,
          winner: Player.ONE,
        },
        {
          board: [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0], // <= 1
          ],
          firstToPlay: Player.ONE,
          col: 6,
          winner: Player.ONE,
        },
      ];
      let i = 0;
      for (const { board, firstToPlay, col, winner } of tableTest) {
        it(`should set winner (${i})`, () => {
          const config: GameConfig = { board, firstToPlay } as GameConfig;
          const game = new Game(config);

          const err = game.pushToken(col);
          expect(err).toBeNull();
          expect(game.winner).toBe(winner);
        });
        i++;
      }
    });

    describe("when a player connects 4 tokens with rising diagonal", () => {
      const tableTest = [
        {
          board: [
            [0, 0, 0, 0, 0, 0], // <= 1
            [2, 1, 0, 0, 0, 0],
            [1, 1, 1, 0, 0, 0],
            [2, 2, 2, 1, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
          ],
          firstToPlay: Player.ONE,
          col: 0,
          position: { x: 0, y: 0 },
          winner: Player.ONE,
        },
        {
          board: [
            [1, 0, 0, 0, 0, 0],
            [2, 0, 0, 0, 0, 0], // <= 1
            [1, 1, 1, 0, 0, 0],
            [2, 2, 2, 1, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
          ],
          firstToPlay: Player.ONE,
          col: 1,
          position: { x: 1, y: 1 },
          winner: Player.ONE,
        },
        {
          board: [
            [1, 0, 0, 0, 0, 0],
            [2, 1, 0, 0, 0, 0],
            [1, 1, 0, 0, 0, 0], // <= 1
            [2, 2, 2, 1, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
          ],
          firstToPlay: Player.ONE,
          col: 2,
          position: { x: 2, y: 2 },
          winner: Player.ONE,
        },
        {
          board: [
            [1, 0, 0, 0, 0, 0],
            [2, 1, 0, 0, 0, 0],
            [1, 1, 1, 0, 0, 0],
            [2, 2, 2, 0, 0, 0], // <= 1
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
          ],
          firstToPlay: Player.ONE,
          col: 3,
          position: { x: 3, y: 3 },
          winner: Player.ONE,
        },
        {
          board: [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0],
            [2, 1, 0, 0, 0, 0],
            [1, 1, 1, 0, 0, 0],
            [2, 2, 2, 0, 0, 0], // <= 1
          ],
          firstToPlay: Player.ONE,
          col: 6,
          position: { x: 6, y: 3 },
          winner: Player.ONE,
        },
        {
          board: [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [1, 2, 1, 0, 0, 0],
            [2, 1, 1, 1, 0, 0],
            [1, 1, 1, 2, 1, 0],
            [2, 2, 2, 1, 2, 0], // <= 1
          ],
          firstToPlay: Player.ONE,
          col: 6,
          position: { x: 6, y: 5 },
          winner: Player.ONE,
        },
      ];
      let i = 0;
      for (const { board, firstToPlay, col, position, winner } of tableTest) {
        it(`should set winner (${i})`, () => {
          const config: GameConfig = { board, firstToPlay } as GameConfig;
          const game = new Game(config);

          const err = game.pushToken(col);
          expect(err).toBeNull();
          expect(game.winner).toBe(winner);
        });
        i++;
      }
    });

    describe("when a player connects 4 tokens with decending diagonal", () => {
      const tableTest = [
        {
          board: [
            [1, 2, 2, 0, 0, 0], // <= 1
            [2, 1, 1, 0, 0, 0],
            [1, 1, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
          ],
          firstToPlay: Player.ONE,
          col: 0,
          position: { x: 0, y: 3 },
          winner: Player.ONE,
        },
        {
          board: [
            [1, 2, 2, 1, 0, 0],
            [2, 1, 0, 0, 0, 0], // <= 1
            [1, 1, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
          ],
          firstToPlay: Player.ONE,
          col: 1,
          position: { x: 1, y: 2 },
          winner: Player.ONE,
        },
        {
          board: [
            [1, 2, 2, 1, 0, 0],
            [2, 1, 1, 0, 0, 0],
            [1, 0, 0, 0, 0, 0], // <= 1
            [1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
          ],
          firstToPlay: Player.ONE,
          col: 2,
          position: { x: 2, y: 1 },
          winner: Player.ONE,
        },
        {
          board: [
            [1, 2, 2, 1, 0, 0],
            [2, 1, 1, 0, 0, 0],
            [1, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0], // <= 1
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
          ],
          firstToPlay: Player.ONE,
          col: 3,
          position: { x: 3, y: 0 },
          winner: Player.ONE,
        },
        {
          board: [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [1, 2, 2, 1, 0, 0],
            [2, 1, 1, 0, 0, 0],
            [1, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0], // <= 1
          ],
          firstToPlay: Player.ONE,
          col: 6,
          position: { x: 6, y: 0 },
          winner: Player.ONE,
        },
      ];
      let i = 0;
      for (const { board, firstToPlay, col, position, winner } of tableTest) {
        it(`should set winner (${i})`, () => {
          const config: GameConfig = { board, firstToPlay } as GameConfig;
          const game = new Game(config);

          const err = game.pushToken(col);
          expect(err).toBeNull();
          expect(game.winner).toBe(winner);
        });
        i++;
      }
    });

    it("should set winner and the status to finished", () => {
      const config: GameConfig = {
        board: [
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [1, 2, 2, 1, 0, 0],
          [2, 1, 1, 0, 0, 0],
          [1, 1, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0], // <= 1
        ],
        firstToPlay: Player.ONE,
      };
      const game = new Game(config);

      const err = game.pushToken(6);
      expect(err).toBeNull();
      expect(game.board).toEqual([
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [1, 2, 2, 1, 0, 0],
        [2, 1, 1, 0, 0, 0],
        [1, 1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0],
      ]);
      expect(game.winner).toEqual(Player.ONE);
      expect(game.status).toEqual(Status.FINISHED);
    });

    it("should set the winning set of token", () => {
      const config: GameConfig = {
        board: [
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [1, 2, 2, 1, 0, 0],
          [2, 1, 1, 0, 0, 0],
          [1, 1, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0], // <= 1
        ],
        firstToPlay: Player.ONE,
      };
      const game = new Game(config);

      const err = game.pushToken(6);
      expect(err).toBeNull();
      expect(game.winset).toEqual([
        { x: 3, y: 3 },
        { x: 4, y: 2 },
        { x: 5, y: 1 },
        { x: 6, y: 0 },
      ]);
    });

    it("should set the game over if all the cells are filled with no wins", () => {
      const config: GameConfig = {
        board: [
          [1, 2, 1, 2, 1, 2],
          [2, 1, 2, 1, 2, 1],
          [1, 2, 1, 2, 1, 2],
          [1, 2, 1, 2, 1, 2],
          [2, 1, 2, 1, 2, 0], // <= 1
          [1, 2, 1, 2, 1, 2],
          [1, 2, 1, 2, 1, 2],
        ],
      };
      const game = new Game(config);

      const err = game.pushToken(4);
      expect(err).toBeNull();
      expect(game.winner).toBeNull();
      expect(game.status).toBe(Status.FINISHED);
    });

    it("should switch the turn if not game over", () => {
      const config: GameConfig = {
        board: stubEmptyBoard,
      };
      const game = new Game(config);

      const err = game.pushToken(0);
      expect(err).toBeNull();
      expect(game.currentPlayer).toBe(Player.TWO);
    });
  });
});
