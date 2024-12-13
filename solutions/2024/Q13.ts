// See https://www.typescriptlang.org/docs/handbook/2/generics.html#variance-annotations
type Demand<in out T> = {
  demand: T;
};
