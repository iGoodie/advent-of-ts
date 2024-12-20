type TicTacToeChip = "❌" | "⭕";
type TicTacToeEndState = "❌ Won" | "⭕ Won" | "Draw";
type TicTacToeState = TicTacToeChip | TicTacToeEndState;
type TicTacToeEmptyCell = "  ";
type TicTacToeCell = TicTacToeChip | TicTacToeEmptyCell;
type TicTacToeYPositions = "top" | "middle" | "bottom";
type TicTacToeXPositions = "left" | "center" | "right";
type TicTacToePositions = `${TicTacToeYPositions}-${TicTacToeXPositions}`;
type TicTactToeBoard = TicTacToeCell[][];
type TicTacToeGame = {
  board: TicTactToeBoard;
  state: TicTacToeState;
};

type EmptyBoard = [["  ", "  ", "  "], ["  ", "  ", "  "], ["  ", "  ", "  "]];

type NewGame = {
  board: EmptyBoard;
  state: "❌";
};

/* ----------- */

type XPosToIndex = {
  left: 0;
  center: 1;
  right: 2;
};

type YPosToIndex = {
  top: 0;
  middle: 1;
  bottom: 2;
};

type PutChipToRow<
  R extends TicTacToeCell[],
  XI extends number,
  C extends TicTacToeChip
> = XI extends keyof R
  ? {
      [K in keyof R]: K extends `${infer KI extends number}`
        ? KI extends XI
          ? C
          : R[K]
        : R[K];
    }
  : R;

type PutChip<
  B extends TicTactToeBoard,
  YI extends number,
  XI extends number,
  C extends TicTacToeChip
> = {
  [K1 in keyof B]: K1 extends `${YI}` ? PutChipToRow<B[YI], XI, C> : B[K1];
};

type Wins<B extends TicTactToeBoard, C extends TicTacToeChip> = B extends [
  [infer X0Y0, infer X1Y0, infer X2Y0],
  [infer X0Y1, infer X1Y1, infer X2Y1],
  [infer X0Y2, infer X1Y2, infer X2Y2]
]
  ? [C, C, C] extends
      | [X0Y0, X1Y0, X2Y0] // Horizontal Win
      | [X0Y1, X1Y1, X2Y1]
      | [X0Y2, X1Y2, X2Y2]
      // -----
      | [X0Y0, X0Y1, X0Y2] // Vertical Win
      | [X1Y0, X1Y1, X1Y2]
      | [X2Y0, X2Y1, X2Y2]
      // -----
      | [X0Y0, X1Y1, X2Y2] // Diagonal Win
      | [X2Y0, X1Y1, X0Y2]
    ? true
    : false
  : never;

type TicTacToeImpl<B, S extends TicTacToeState> = B extends TicTactToeBoard
  ? {
      board: B;
      state: Wins<B, "⭕"> extends true
        ? "⭕ Won"
        : Wins<B, "❌"> extends true
        ? "❌ Won"
        : TicTacToeEmptyCell extends B[number][number]
        ? S extends "⭕"
          ? "❌"
          : "⭕"
        : "Draw";
    }
  : never;

type TicTacToe<
  G extends TicTacToeGame,
  P extends TicTacToePositions
> = P extends `${infer YP extends TicTacToeYPositions}-${infer XP extends TicTacToeXPositions}`
  ? G["state"] extends `${infer S extends TicTacToeChip}`
    ? TicTacToeEmptyCell extends G["board"][YPosToIndex[YP]][XPosToIndex[XP]]
      ? TicTacToeImpl<
          PutChip<G["board"], YPosToIndex[YP], XPosToIndex[XP], S>,
          S
        >
      : G
    : never
  : never;
