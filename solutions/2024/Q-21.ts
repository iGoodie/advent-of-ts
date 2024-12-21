type DeclarationKeyword = "let" | "const" | "var";

type Whitespace = "\t" | "\n" | "\r" | " ";

interface AnalyzeResult {
  declared: string[];
  used: string[];
}

type AnalyzeScope<
  S extends string,
  $result extends AnalyzeResult = { declared: []; used: [] }
> = S extends `${Whitespace}${infer Rest}`
  ? AnalyzeScope<Rest, $result>
  : S extends `${DeclarationKeyword} ${infer TId} = "${string}";${infer Rest}`
  ? AnalyzeScope<Rest, { declared: [...$result["declared"], TId]; used: $result["used"] }>
  : S extends `${string}(${infer TParam});${infer Rest}`
  ? AnalyzeScope<Rest, { declared: $result["declared"]; used: [...$result["used"], TParam] }>
  : $result;

type ArrayDiff<A1 extends any[], A2 extends any[]> = A1 extends [infer Head, ...infer Tail]
  ? Head extends A2[number]
    ? ArrayDiff<Tail, A2>
    : [Head, ...ArrayDiff<Tail, A2>]
  : [];

type Lint<S extends string, $analyze extends AnalyzeResult = AnalyzeScope<S>> = {
  scope: $analyze;
  unused: ArrayDiff<$analyze["declared"], $analyze["used"]>;
};
