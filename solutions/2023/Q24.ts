type Alley = "  ";
type MazeItem = "🎄" | "🎅" | Alley;
type DELICIOUS_COOKIES = "🍪";
type MazeMatrix = MazeItem[][];
type Directions = "up" | "down" | "left" | "right";

/* --------------------- */

type VarNumCounter = "☕";
type VarNum = VarNumCounter[];

type GenVarNum<N extends number, V extends VarNum = []> = V["length"] extends N
  ? V
  : GenVarNum<N, [...V, VarNumCounter]>;

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
  A extends number,
  N extends number,
  $sum = `${N}` extends `-${infer NP extends number}`
    ? Decrease<GenVarNum<A>, NP>
    : Increase<GenVarNum<A>, N>
> = $sum extends VarNum ? $sum["length"] : never;

type Vec2 = [number, number];

type DirectionToVec2 = {
  up: [-1, 0];
  down: [1, 0];
  left: [0, -1];
  right: [0, 1];
};

type IndexOf<A extends any[], T> = {
  [K in keyof A]: A[K] extends T
    ? K extends `${infer I extends number}`
      ? I
      : never
    : never;
}[number];

type CoordOf<M extends MazeMatrix, T extends MazeItem> = {
  [KR in keyof M]: KR extends `${infer KRI extends number}`
    ? [IndexOf<M[KR], T>] extends [never]
      ? never
      : [KRI, IndexOf<M[KR], T>]
    : never;
}[number];

type GenArray<
  T,
  N extends number,
  $acc extends T[] = []
> = $acc["length"] extends N ? $acc : GenArray<T, N, [...$acc, T]>;

type GenMatrix<
  T,
  R extends number,
  C extends number,
  $acc extends T[][] = []
> = $acc["length"] extends R
  ? $acc
  : GenMatrix<T, R, C, [...$acc, GenArray<T, C>]>;

type SetIndex<A extends any[], I extends number, T> = {
  [K in keyof A]: K extends `${I}` ? T : A[K];
};

type SetCell<M extends any[][], R extends number, C extends number, T> = {
  [KR in keyof M]: KR extends `${R}` ? SetIndex<M[KR], C, T> : M[KR];
};

type AccessCell<M extends MazeMatrix, R, C> = R extends number
  ? C extends number
    ? M[R][C]
    : never
  : never;

type Move<
  M extends MazeMatrix,
  D extends Directions,
  $santaCoord extends Vec2 = CoordOf<M, "🎅">,
  $santaRow extends number = $santaCoord[0],
  $santaCol extends number = $santaCoord[1],
  $direction extends Vec2 = DirectionToVec2[D],
  $directionRow extends number = $direction[0],
  $directionCol extends number = $direction[1],
  $nextRow = Sum<$santaRow, $directionRow>,
  $nextCol = Sum<$santaCol, $directionCol>,
  $nextVal extends MazeItem = AccessCell<M, $nextRow, $nextCol>
> = [$santaRow, $santaCol] extends [$nextRow, $nextCol]
  ? GenMatrix<DELICIOUS_COOKIES, M["length"], M[0]["length"]>
  : $nextVal extends "🎄"
  ? M
  : $nextRow extends number
  ? $nextCol extends number
    ? SetCell<SetCell<M, $santaRow, $santaCol, Alley>, $nextRow, $nextCol, "🎅">
    : never
  : never;
