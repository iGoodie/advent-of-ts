type NameEntry = [`${string}`, "M" | "F", `${number}`];
type FormatName<N extends readonly [`${string}`, "M" | "F", `${number}`]> = {
  name: N[0];
  count: N[2] extends `${infer T extends number}` ? T : never;
  rating: NaughtyOrNice<N[0]>;
};

type IsEven<T extends number> =
  `${T}` extends `${string}${infer TLast extends number}`
    ? IsEven<TLast>
    : T extends 0 | 2 | 4 | 6 | 8
    ? true
    : false;

type StrLen<
  T extends string,
  $length extends "🥥"[] = []
> = T extends `${string}${infer TRest}`
  ? StrLen<TRest, [...$length, "🥥"]>
  : $length["length"];

type NaughtyOrNice<TName extends string> = [IsEven<StrLen<TName>>] extends [
  true
]
  ? "naughty"
  : "nice";

type FormatNames<TNames extends readonly NameEntry[]> = {
  [K in keyof TNames]: FormatName<TNames[K]>;
};
