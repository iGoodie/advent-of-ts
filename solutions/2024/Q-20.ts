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
