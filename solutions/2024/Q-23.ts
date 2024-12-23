// HOTScript was a huge inspiration.
// See https://github.com/gvergnaud/hotscript/blob/fccfc2fbc581f5ba93e05688697f1421dca66906/src/internals/core/Core.ts#L79

declare const FN_ARGS: unique symbol;
declare const FN_ARG0: unique symbol;
declare const RETURN: unique symbol;
type ARGS = typeof FN_ARGS;
type ARG0 = typeof FN_ARG0;
type FN_RETURN = typeof RETURN;

interface Functor {
  [FN_ARGS]: unknown;
  [FN_ARG0]: this[ARGS] extends [infer Arg, ...any] ? Arg : never;
  [RETURN]: unknown;
}

/** Apply */
type Apply<Fn extends Functor, T> = (Fn & { [FN_ARGS]: [T] })[FN_RETURN];

/** Push an element to a tuple */
interface Push extends Functor {
  // Returns a functor, that takes in an array and pushes ARG0
  // Pseudo impl: push = (arg0: any) => (arr: any[]) => [...arr, typeof arg0]
  [RETURN]: PushFn<this[ARG0]>;
}

interface PushFn<V> extends Functor {
  // Pseudo impl: pushFn = (arr: any[]) => [...arr, typeof arg0];
  [RETURN]: this[ARG0] extends any[] ? [...this[ARG0], V] : never;
}

/** Filter a tuple */
interface Filter extends Functor {
  // Returns a functor, that takes in a predicate functor and filters ARG0 array with it
  // Pseudo impl: filter = (arg0: any[]) => <Fn extends Functor>(fn: Fn) => Partial<typeof arg0>
  [RETURN]: FilterFn<this[ARG0]>;
}

interface FilterFn<Fn extends Functor> extends Functor {
  // Pseudo impl: filterFn = <Fn extends Functor>(fn: Fn) => Partial<typeof arg0>
  [RETURN]: FilterImpl<Fn, this[ARG0]>;
}

type FilterImpl<FilterFn extends Functor, T extends any[], $result extends any[] = []> = T extends [
  infer First,
  ...infer Rest
]
  ? [Apply<FilterFn, First>] extends [true]
    ? FilterImpl<FilterFn, Rest, [...$result, First]>
    : FilterImpl<FilterFn, Rest, $result>
  : $result;

/** Determine if the given type extends another */
interface Extends extends Functor {
  // Returns a functor, that takes in a value and determines if ARG0 extends given value
  // Pseudo impl: extends = (arg0: any) => <T>(compareValue: T) => T extends typeof arg0 ? true : false
  [RETURN]: ExtendsFn<this[ARG0]>;
}

interface ExtendsFn<T> extends Functor {
  // Pseudo impl: extendsFn = <T>(compareValue: T) => T extends typeof arg0 ? true : false
  [RETURN]: [this[ARG0]] extends [T] ? true : false;
}

/** Apply an operation to all inputs */
interface ApplyAll extends Functor {
  // Returns a functor, that takes in another functor, and applies it to ARG0, which is expected to be an array
  // Pseudo impl: applyAll = (arg0: any[]) => <Fn extends Functor>(fn: Fn) => any[]
  [RETURN]: ApplyAllFn<this[ARG0]>;
}

interface ApplyAllFn<Fn extends Functor> extends Functor {
  // Pseudo impl: applyAllFn = <Fn extends Functor>(fn: Fn) => any[]
  [RETURN]: ApplyAllImpl<Fn, this[ARG0]>;
}

type ApplyAllImpl<Fn extends Functor, T extends any[], $result extends any[] = []> = T extends [
  infer First,
  ...infer Rest
]
  ? ApplyAllImpl<Fn, Rest, [...$result, Apply<Fn, First>]>
  : $result;

/** Capitalize a string */
interface Cap extends Functor {
  // Returns the capitalized version of given arg
  // Pseudo impl: cap = (arg0: string) => Capitalize<typeof arg0>
  [RETURN]: Capitalize<this[ARG0]>;
}
