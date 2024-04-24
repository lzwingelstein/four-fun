import { Cell } from "./types";

export const stubEmptyBoard: Cell[][] = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
];

export const mergeColInBoard = (
  board: Cell[][],
  index: number,
  col: Cell[]
): Cell[][] => {
  const b = [...board];
  b[index] = col;
  return b;
};
