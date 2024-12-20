type StringToNumber<T> = T extends `${infer N extends number}` ? N : never;

type FindSanta<TArr extends ("🎅🏼" | "🎄")[]> = StringToNumber<
  { [I in keyof TArr]: TArr[I] extends "🎅🏼" ? I : never }[number]
>;
