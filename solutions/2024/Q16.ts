type RemovePrefix<
  TOriginal extends readonly any[],
  TTarget extends Partial<TOriginal>
> = TOriginal extends [infer TOriginal0, ...infer TOriginalRest]
  ? TTarget extends [infer TTarget0, ...infer TTargetRest extends Partial<TOriginalRest>]
    ? TTarget0 extends TOriginal0
      ? RemovePrefix<TOriginalRest, TTargetRest>
      : never
    : TOriginal
  : [];

type Curry<FnArgs extends readonly any[], FnReturn> = FnArgs["length"] extends 0
  ? () => FnReturn
  : <A extends Partial<FnArgs>>(
      ...args: A
    ) => RemovePrefix<FnArgs, A>["length"] extends 0
      ? FnReturn
      : Curry<RemovePrefix<FnArgs, A>, FnReturn>;

declare function DynamicParamsCurrying<A extends readonly any[], R>(
  fn: (...args: A) => R
): Curry<Parameters<typeof fn>, ReturnType<typeof fn>>;
