export enum Status {
  INITIAL,
  RUNNING,
  PAUSED,
  FINISHED,
}

export enum Player {
  ONE = 1,
  TWO = 2,
}

export type Cell = 0 | 1 | 2;

export type Coordinate = {
  x: number;
  y: number;
};

export type GameConfig = {
  board?: Cell[][];
  firstToPlay?: Player;
};
