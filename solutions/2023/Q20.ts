type Letters = {
  A: ["█▀█ ", "█▀█ ", "▀ ▀ "];
  B: ["█▀▄ ", "█▀▄ ", "▀▀  "];
  C: ["█▀▀ ", "█ ░░", "▀▀▀ "];
  E: ["█▀▀ ", "█▀▀ ", "▀▀▀ "];
  H: ["█ █ ", "█▀█ ", "▀ ▀ "];
  I: ["█ ", "█ ", "▀ "];
  M: ["█▄░▄█ ", "█ ▀ █ ", "▀ ░░▀ "];
  N: ["█▄░█ ", "█ ▀█ ", "▀ ░▀ "];
  P: ["█▀█ ", "█▀▀ ", "▀ ░░"];
  R: ["█▀█ ", "██▀ ", "▀ ▀ "];
  S: ["█▀▀ ", "▀▀█ ", "▀▀▀ "];
  T: ["▀█▀ ", "░█ ░", "░▀ ░"];
  Y: ["█ █ ", "▀█▀ ", "░▀ ░"];
  W: ["█ ░░█ ", "█▄▀▄█ ", "▀ ░ ▀ "];
  " ": ["░", "░", "░"];
  ":": ["#", "░", "#"];
  "*": ["░", "#", "░"];
};

type Line = [string, string, string];

type AppendToLine<
  TLine extends Line,
  TLetter extends Letters[keyof Letters]
> = [
  `${TLine[0]}${TLetter[0]}`,
  `${TLine[1]}${TLetter[1]}`,
  `${TLine[2]}${TLetter[2]}`
];

type ToAsciiLine<
  S extends string,
  A extends Line = ["", "", ""]
> = S extends `${infer L}${infer Rest}`
  ? Uppercase<L> extends `${infer LL extends keyof Letters}`
    ? ToAsciiLine<Rest, AppendToLine<A, Letters[LL]>>
    : ToAsciiLine<Rest, A>
  : A;

type ToAsciiArt<
  S extends string,
  L extends string[] = []
> = S extends `${infer SBefore}\n${infer SAfter}`
  ? ToAsciiArt<SAfter, [...L, ...ToAsciiLine<SBefore>]>
  : S extends ""
  ? L
  : ToAsciiArt<"", [...L, ...ToAsciiLine<S>]>;
