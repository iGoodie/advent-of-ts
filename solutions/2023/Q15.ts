type Repeat<T, N extends number, R extends T[] = []> = R["length"] extends N
  ? R
  : Repeat<T, N, [...R, T]>;

type BoxToys<T, C extends number> = C extends C ? Repeat<T, C> : never;
