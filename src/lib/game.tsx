import { Cell, Coordinate, GameConfig, Player, Status } from "@/lib/types";

export const DEFAULT_GRID_COLS = 7;
export const DEFAULT_GRID_ROWS = 6;

export class Game {
  private _board: Cell[][] = [];
  private _currentPlayer: Player = Player.ONE;
  private _cols: number = DEFAULT_GRID_COLS;
  private _rows: number = DEFAULT_GRID_ROWS;
  private _winner: Player | null = null;
  private _status: Status = Status.INITIAL;
  private _winset: Coordinate[] = [];

  constructor(config: GameConfig) {
    this.initializeGame(config);
  }

  private initializeGame(config: GameConfig) {
    if (config.firstToPlay) {
      this._currentPlayer = config.firstToPlay;
    }
    if (config.board) {
      this._board = config.board; // This is used to inject board for tests
      this._cols = config.board.length;
      this._rows = config.board[0].length;
      return;
    }

    let b: Cell[][] = [];
    for (let x = 0; x < this._cols; x++) {
      b[x] = [];
      for (let y = 0; y < this._rows; y++) {
        b[x][y] = 0;
      }
      this._board = b;
    }

    this._status = Status.RUNNING;
  }

  get board() {
    return this._board;
  }

  get currentPlayer() {
    return this._currentPlayer;
  }

  get winner() {
    return this._winner;
  }

  get status() {
    return this._status;
  }

  get winset() {
    return this._winset;
  }

  pushToken(column: number): Error | null {
    if (column < 0 || column >= this._cols) {
      return new Error("Invalid column");
    }

    if (this._board[column][this._rows - 1] !== 0) {
      return new Error("Column is full");
    }

    let coordinate: Coordinate | null = null;
    for (let y = 0; y < this._rows; y++) {
      // If the cell is empty
      if (this._board[column][y] === 0) {
        // Add the token
        this._board[column][y] = this._currentPlayer as Cell;
        coordinate = { x: column, y: y };
        break;
      }
    }

    if (coordinate == null) {
      return new Error("Fail to push token");
    }

    // Check if the player wins
    if (
      this.isVerticalWin(coordinate) ||
      this.isHorizontalWin(coordinate) ||
      this.isDiagonalWin(coordinate)
    ) {
      this._winner = this._currentPlayer;
      this._status = Status.FINISHED;
      return null;
    }

    // Check if board is full
    if (this._board.every((col) => col.every((cell) => cell !== 0))) {
      this._status = Status.FINISHED;
      return null;
    }

    // Switch player
    this._currentPlayer =
      this._currentPlayer === Player.ONE ? Player.TWO : Player.ONE;

    return null;
  }

  private isVerticalWin({ x, y }: Coordinate): boolean {
    // Check vertical
    if (y < 3) {
      return false;
    }

    if (
      this._board[x][y] !== 0 &&
      this._board[x][y] === this._board[x][y - 1] &&
      this._board[x][y] === this._board[x][y - 2] &&
      this._board[x][y] === this._board[x][y - 3]
    ) {
      this._winset = [
        { x: x, y: y },
        { x: x, y: y - 1 },
        { x: x, y: y - 2 },
        { x: x, y: y - 3 },
      ];
      return true;
    }

    return false;
  }

  private isHorizontalWin({ x, y }: Coordinate): boolean {
    let minx = Math.max(x - 3, 0);
    let maxx = Math.min(x + 3, this._cols - 3);
    for (let tx = minx; tx < maxx; tx++) {
      if (
        this._board[x][y] !== 0 &&
        this._board[x][y] === this._board[tx][y] &&
        this._board[x][y] === this._board[tx + 1][y] &&
        this._board[x][y] === this._board[tx + 2][y] &&
        this._board[x][y] === this._board[tx + 3][y]
      ) {
        this._winset = [
          { x: tx, y: y },
          { x: tx + 1, y: y },
          { x: tx + 2, y: y },
          { x: tx + 3, y: y },
        ];
        return true;
      }
    }
    return false;
  }

  private isDiagonalWin({ x, y }: Coordinate): boolean {
    let minx = Math.max(x - 3, 0);
    let maxx = Math.min(x + 3, this._cols - 3);
    let miny = Math.max(y - 3, 0);
    let maxy = Math.min(y + 3, this._rows - 3);

    // Check diagonal from bottom left to top right
    for (let ty = miny; ty < maxy; ty++) {
      for (let tx = minx; tx < maxx; tx++) {
        if (
          this._board[x][y] !== 0 &&
          this._board[x][y] === this._board[tx][ty] &&
          this._board[x][y] === this._board[tx + 1][ty + 1] &&
          this._board[x][y] === this._board[tx + 2][ty + 2] &&
          this._board[x][y] === this._board[tx + 3][ty + 3]
        ) {
          this._winset = [
            { x: tx, y: ty },
            { x: tx + 1, y: ty + 1 },
            { x: tx + 2, y: ty + 2 },
            { x: tx + 3, y: ty + 3 },
          ];
          return true;
        }
      }
    }

    // Check diagonal from top left to bottom right
    for (let ty = maxy; ty >= miny; ty--) {
      for (let tx = minx; tx <= maxx; tx++) {
        if (
          this._board[x][y] !== 0 &&
          this._board[x][y] === this._board[tx][ty] &&
          this._board[x][y] === this._board[tx + 1][ty - 1] &&
          this._board[x][y] === this._board[tx + 2][ty - 2] &&
          this._board[x][y] === this._board[tx + 3][ty - 3]
        ) {
          this._winset = [
            { x: tx, y: ty },
            { x: tx + 1, y: ty - 1 },
            { x: tx + 2, y: ty - 2 },
            { x: tx + 3, y: ty - 3 },
          ];
          return true;
        }
      }
    }
    return false;
  }
}
