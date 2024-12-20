type Filter<T extends any[], U> = {
  [K in keyof T]: [T[K]] extends [U] ? T[K] : never;
};

type TrimNevers<T extends any[], A extends any[] = []> = T extends [
  infer T0,
  ...infer TRest
]
  ? [T0] extends [never]
    ? TrimNevers<TRest, A>
    : TrimNevers<TRest, [T0, ...A]>
  : A;

type Count<T extends any[], U> = TrimNevers<Filter<T, U>>["length"];
