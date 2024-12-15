type StrLen<T extends string, $length extends "🥥"[] = []> = T extends `${string}${infer TRest}`
  ? StrLen<TRest, [...$length, "🥥"]>
  : $length["length"];

type GetRoute<
  T extends string,
  $name extends string = "",
  $distance extends "-"[] = [],
  $routes extends [string, number][] = []
> = T extends `${infer TCurr}${infer TRest}`
  ? TCurr extends "-"
    ? StrLen<$name> extends 0
      ? GetRoute<TRest, $name, [...$distance, "-"], $routes>
      : $routes["length"] extends 0
      ? GetRoute<TRest, "", ["-"], [...$routes, [$name, 0]]> // <- Commit token
      : GetRoute<TRest, "", ["-"], [...$routes, [$name, $distance["length"]]]> // <- Commit token
    : GetRoute<TRest, `${$name}${TCurr}`, $distance, $routes>
  : StrLen<$name> extends 0
  ? $routes
  : [...$routes, [$name, $distance["length"]]];
