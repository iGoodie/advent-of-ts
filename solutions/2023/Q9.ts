type Reverse<T extends string> = T extends `${infer TFirst}${infer TRest}`
  ? `${Reverse<TRest>}${TFirst}`
  : T;
