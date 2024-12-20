type Enumerate<
  TCount extends number,
  Counter extends readonly number[] = []
> = Counter["length"] extends TCount
  ? Counter[number]
  : Enumerate<TCount, [...Counter, Counter["length"]]>;

type DayCounter<TStart extends number, TEnd extends number> =
  | Exclude<Enumerate<TEnd>, Enumerate<TStart>>
  | TEnd;
