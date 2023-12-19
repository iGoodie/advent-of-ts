type ToyOrder = ["🛹", "🚲", "🛴", "🏄"];

type Repeat<T, N extends number, A extends T[] = []> = A["length"] extends N
  ? A
  : Repeat<T, N, [...A, T]>;

type AlternatingNext<
  O extends readonly any[],
  T extends O[number]
> = O extends [...any, T]
  ? O[0]
  : O extends [T, infer F, ...any]
  ? F
  : O extends [any, ...infer N]
  ? AlternatingNext<N, T>
  : never;

type Rebuild<
  T extends number[],
  A extends any[] = [],
  C extends ToyOrder[number] = "🛹"
> = T extends [infer N extends number, ...infer Rest extends number[]]
  ? Rebuild<Rest, [...A, ...Repeat<C, N>], AlternatingNext<ToyOrder, C>>
  : A;
