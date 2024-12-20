const compose = <I, FR, GR, HR>(
  f: (input: I) => FR,
  g: (input: FR) => GR,
  h: (input: GR) => HR
) => {
  return (a: I) => h(g(f(a)));
};

const upperCase = <T extends string>(x: T) => x.toUpperCase() as Uppercase<T>;
const lowerCase = <T extends string>(x: T) => x.toLowerCase() as Lowercase<T>;
const firstChar = <T extends string>(x: T) => x[0] as T extends `${infer F}${any}` ? F : never;
const firstItem = <T extends any[]>(x: T) => x[0] as T[0];
const makeTuple = <T>(x: T) => [x];
const makeBox = <T>(value: T) => ({ value });
