type IndexOf<TArr extends readonly any[], TTarget> = {
  [K in keyof TArr]: TArr[K] extends TTarget
    ? K extends `${infer I extends number}`
      ? I
      : never
    : never;
}[number];

type SantaIndexTable<F extends ("🎄" | "🎅🏼")[][]> = {
  [K in keyof F]: IndexOf<F[K], "🎅🏼">;
};

type FindSantaImpl<TIndexTable extends (number | never)[]> = {
  [K in keyof TIndexTable]: [TIndexTable[K]] extends [never]
    ? never
    : K extends `${infer N extends number}`
    ? [N, TIndexTable[K]]
    : never;
}[number];

type FindSanta<F extends ("🎄" | "🎅🏼")[][]> = FindSantaImpl<SantaIndexTable<F>>;
