/** because "dashing" implies speed */
type Dasher = "💨";

/** representing dancing or grace */
type Dancer = "💃";

/** a deer, prancing */
type Prancer = "🦌";

/** a star for the dazzling, slightly mischievous Vixen */
type Vixen = "🌟";

/** for the celestial body that shares its name */
type Comet = "☄️";

/** symbolizing love, as Cupid is the god of love */
type Cupid = "❤️";

/** representing thunder, as "Donner" means thunder in German */
type Donner = "🌩️";

/** meaning lightning in German, hence the lightning bolt */
type Blitzen = "⚡";

/** for his famous red nose */
type Rudolph = "🔴";

type Reindeer =
  | Dasher
  | Dancer
  | Prancer
  | Vixen
  | Comet
  | Cupid
  | Donner
  | Blitzen
  | Rudolph;

/* --------------- */

type ArrayFromLength<
  T,
  N extends number,
  A extends T[] = []
> = A["length"] extends N ? A : ArrayFromLength<T, N, [...A, T]>;

type Triplet = [Reindeer, Reindeer, Reindeer];
type Row = [Triplet, Triplet, Triplet];
type Grid = [Row, Row, Row, Row, Row, Row, Row, Row, Row];
type RegionBounds = { col: number; rowStart: number; rowEnd: number };

type ValidateRows<
  G extends Grid,
  I extends never[] = []
> = Reindeer extends G[I["length"]][number][number]
  ? I["length"] extends G["length"]
    ? true
    : ValidateRows<G, [...I, never]>
  : false;

type ValidateCols<
  G extends Grid,
  I extends never[] = []
> = Reindeer extends G[number][I["length"]][number]
  ? I["length"] extends G["length"]
    ? true
    : ValidateRows<G, [...I, never]>
  : false;

type GridToRegions<G extends Grid> = [
  [...G[0][0], ...G[1][0], ...G[2][0]],
  [...G[0][1], ...G[1][1], ...G[2][1]],
  [...G[0][2], ...G[1][2], ...G[2][2]],
  [...G[3][0], ...G[4][0], ...G[5][0]],
  [...G[3][1], ...G[4][1], ...G[5][1]],
  [...G[3][2], ...G[4][2], ...G[5][2]],
  [...G[6][0], ...G[7][0], ...G[8][0]],
  [...G[6][1], ...G[7][1], ...G[8][1]],
  [...G[6][2], ...G[7][2], ...G[8][2]]
];

type ValidateRegions<
  G extends Grid,
  GR extends Reindeer[][] = GridToRegions<G>
> = [
  {
    [K in keyof GR]: Reindeer extends GR[K][number] ? never : false;
  }[number]
] extends [never]
  ? true
  : false;

type Validate<G extends Grid> = ValidateCols<G> extends true
  ? ValidateRows<G> extends true
    ? ValidateRegions<G> extends true
      ? true
      : false
    : false
  : false;
