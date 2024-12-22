// --- Utilities --- //

type Whitespace = " " | "\t" | "\r" | "\n";

type Trim<T extends string> = T extends `${Whitespace}${infer Tail}`
  ? Trim<Tail>
  : T extends `${infer Tail}${Whitespace}`
  ? Trim<Tail>
  : T;

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

type EscapeLookup = {
  r: "\r";
  n: "\n";
  b: "\b";
  f: "\f";
  t: "\t";
};

type ReplaceEscapes<S extends string> = S extends ""
  ? S
  : S extends `${infer Prefix}\\${infer Escape extends keyof EscapeLookup}${infer Tail}`
  ? `${Prefix}${EscapeLookup[Escape]}${ReplaceEscapes<Tail>}`
  : S;

// --- JSON Parser --- //
// See the specs: https://www.json.org/json-en.html

type ParseResult = [success: boolean, value: any, remaining: string];

type ParseNumber<
  T extends string,
  $value extends string = ""
> = Trim<T> extends `${infer N extends number}${infer Rest}`
  ? ParseNumber<Rest, `${$value}${N}`>
  : $value extends `${infer N extends number}`
  ? [true, N, T]
  : [false, never, T];

type ParsePrimitive<T extends string> = T extends `true${infer Rest}`
  ? [true, true, Trim<Rest>]
  : Trim<T> extends `false${infer Rest}`
  ? [true, false, Trim<Rest>]
  : Trim<T> extends `null${infer Rest}`
  ? [true, null, Trim<Rest>]
  : Trim<T> extends `"${infer S extends string}"${infer Rest}`
  ? [true, ReplaceEscapes<S>, Trim<Rest>]
  : ParseNumber<T>;

type ParseArray<T extends string> = Trim<T> extends `[${infer Rest}`
  ? ParseArrayValues<Rest>
  : [false, never, T];

type ParseArrayValues<
  T extends string,
  $values extends any[] = []
> = Trim<T> extends `]${infer Rest}` // Hit the end of the array, terminate
  ? [true, $values, Rest]
  : Trim<T> extends `,${infer Rest}` // Hit the delimiter, can ignore
  ? ParseArrayValues<Rest, $values>
  : // Try to consume a value, and append to $values
  ParseValue<Trim<T>> extends [true, infer V, infer Rest extends string]
  ? ParseArrayValues<Rest, [...$values, V]>
  : [false, never, T];

type ParseObject<T extends string> = Trim<T> extends `{${infer Rest}`
  ? ParseObjectEntries<Rest>
  : [false, never, T];

type ParseObjectEntries<
  T extends string,
  $entries extends object = {}
> = Trim<T> extends `}${infer Rest}` // Hit the end of the object, terminate
  ? [true, $entries, Rest]
  : Trim<T> extends `,${infer Rest}` // Hit the delimiter, can ignore
  ? ParseObjectEntries<Rest, $entries>
  : // Try to consume two values, one for key and one for the value
  ParseValue<Trim<T>> extends [true, infer K extends PropertyKey, infer Rest extends string]
  ? Rest extends `:${infer AfterColon}`
    ? ParseValue<Trim<AfterColon>> extends [true, infer V, infer Rest extends string]
      ? ParseObjectEntries<Rest, Prettify<$entries & { [key in K]: V }>>
      : [false, never, T]
    : [false, never, T]
  : [false, never, T];

type ParseValue<
  T extends string,
  $resultPrimitive = ParsePrimitive<Trim<T>>,
  $resultArray = ParseArray<Trim<T>>,
  $resultObject = ParseObject<Trim<T>>
> = $resultPrimitive extends [true, ...any]
  ? $resultPrimitive
  : $resultArray extends [true, ...any]
  ? $resultArray
  : $resultObject extends [true, ...any]
  ? $resultObject
  : [false, never, T];

type Parse<T extends string> = ParseValue<Trim<T>> extends [true, infer V, ""] ? V : never;
