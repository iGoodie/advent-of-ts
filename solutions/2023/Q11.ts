type IsNest<T> = T extends object ? (T extends Function ? false : true) : false;

type SantaListProtector<TObj extends object> = {
  readonly [K in keyof TObj]: TObj[K] extends object
    ? TObj[K] extends Function
      ? TObj[K]
      : SantaListProtector<TObj[K]>
    : TObj[K];
};
