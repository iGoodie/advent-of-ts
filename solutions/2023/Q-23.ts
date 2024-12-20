type Connect4Chips = "🔴" | "🟡";
type Connect4Cell = Connect4Chips | "  ";
type Connect4State = "🔴" | "🟡" | "🔴 Won" | "🟡 Won" | "Draw";

type EmptyBoard = [
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "]
];

type NewGame = {
  board: EmptyBoard;
  state: "🟡";
};

/* -------------- */

type VarNumCounter = "☕";
type VarNum = VarNumCounter[];

type Decrease<
  A extends VarNum,
  N extends number,
  $acc extends VarNum = []
> = $acc["length"] extends N
  ? A
  : A extends [VarNumCounter, ...infer Rest extends VarNum]
  ? Decrease<Rest, N, [...$acc, VarNumCounter]>
  : [];

type Increase<
  A extends VarNum,
  N extends number,
  $acc extends VarNum = []
> = $acc["length"] extends N
  ? A
  : Increase<[...A, VarNumCounter], N, [...$acc, VarNumCounter]>;

type Sum<
  A extends VarNum,
  N extends number
> = (`${N}` extends `-${infer NP extends number}`
  ? Decrease<A, NP>
  : Increase<A, N>) & {};

type Board = Connect4Cell[][];
type Game = { board: Board; state: Connect4State };
type InputCol = 0 | 1 | 2 | 3 | 4 | 5 | 6;

type Direction = [number, number];

type QuartetAtDirection<
  B extends Board,
  R extends VarNum,
  C extends VarNum,
  D extends Direction,
  $acc extends Connect4Cell[] = [],
  $rowIndex extends number = R["length"],
  $colIndex extends number = C["length"]
> = $acc["length"] extends 4
  ? $acc
  : [undefined | unknown] extends [B[$rowIndex][$colIndex]]
  ? `🙊 Non existing index: (r:${$rowIndex}, c:${$colIndex})`
  : Sum<R, D[1]> extends { length: $rowIndex }
  ? D[1] extends 0
    ? Sum<C, D[0]> extends { length: $colIndex }
      ? D[0] extends 0
        ? QuartetAtDirection<
            B,
            Sum<R, D[1]>,
            Sum<C, D[0]>,
            D,
            [...$acc, B[$rowIndex][$colIndex]]
          >
        : "🙊 Tried to go below col 0, failed obviously"
      : QuartetAtDirection<
          B,
          Sum<R, D[1]>,
          Sum<C, D[0]>,
          D,
          [...$acc, B[$rowIndex][$colIndex]]
        >
    : "🙊 Tried to go below row 0, failed obviously"
  : Sum<C, D[0]> extends { length: $colIndex }
  ? D[0] extends 0
    ? QuartetAtDirection<
        B,
        Sum<R, D[1]>,
        Sum<C, D[0]>,
        D,
        [...$acc, B[$rowIndex][$colIndex]]
      >
    : "🙊 Tried to go below col 0, failed obviously"
  : QuartetAtDirection<
      B,
      Sum<R, D[1]>,
      Sum<C, D[0]>,
      D,
      [...$acc, B[$rowIndex][$colIndex]]
    >;

type Wins<
  B extends Board,
  T extends Connect4Chips,
  R extends VarNum = [],
  C extends VarNum = [],
  $rowIndex extends number = R["length"],
  $colIndex extends number = C["length"]
> = [T, T, T, T] extends
  | QuartetAtDirection<B, R, C, [1, 0]> // Row quartet
  | QuartetAtDirection<B, R, C, [0, 1]> // Col quartet
  | QuartetAtDirection<B, R, C, [1, 1]> // Forward diagonal quartet
  | QuartetAtDirection<B, R, C, [1, -1]> // Backwards diagonal quartet
  ? true
  : $colIndex extends B[$rowIndex]["length"]
  ? $rowIndex extends B["length"]
    ? false
    : Wins<B, T, Increase<R, 1>, []>
  : Wins<B, T, R, Increase<C, 1>>;

type SetIndex<A extends any[], I extends number, T> = {
  [K in keyof A]: K extends `${I}` ? T : A[K];
};

type SetCell<
  B extends Board,
  R extends number,
  C extends number,
  T extends Connect4Cell
> = {
  [KR in keyof B]: KR extends `${R}` ? SetIndex<B[KR], C, T> : B[KR];
};

type Connect4Impl<
  B extends Board,
  S extends Connect4State,
  C extends InputCol,
  R extends VarNum = [],
  $rowIndex extends number = R["length"],
  $nextRowIndex extends number = Sum<R, 1>["length"]
> = S extends Connect4Chips
  ? B[$rowIndex][C] extends "  "
    ? B[$nextRowIndex][C] extends "  "
      ? Connect4Impl<B, S, C, Sum<R, 1>>
      : SetCell<B, $rowIndex, C, S>
    : never
  : never;

type Connect4<
  G extends Game,
  C extends InputCol,
  $state extends Connect4State = G["state"],
  $board extends Board = G["board"],
  $boardNext extends Board = Connect4Impl<$board, $state, C>
> = {
  board: $boardNext;
  state: Wins<$boardNext, "🔴"> extends true
    ? "🔴 Won"
    : Wins<$boardNext, "🟡"> extends true
    ? "🟡 Won"
    : "  " extends $boardNext[number][number]
    ? $state extends "🟡"
      ? "🔴"
      : "🟡"
    : "Draw";
};
