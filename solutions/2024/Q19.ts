type DeclarationKeyword = "let" | "const" | "var";

type Whitespace = "\t" | "\n" | "\r" | " ";

type Parse<S extends string, $result extends any[] = []> = S extends `${Whitespace}${infer Rest}`
  ? Parse<Rest, $result>
  : S extends `${DeclarationKeyword} ${infer TId} = "${string}";${infer Rest}`
  ? Parse<Rest, [...$result, { id: TId; type: "VariableDeclaration" }]>
  : S extends `${string}(${infer TParam});${infer Rest}`
  ? Parse<Rest, [...$result, { argument: TParam; type: "CallExpression" }]>
  : $result;
