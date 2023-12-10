type StreetSuffixTester<
  TStr extends string,
  TSuff extends string
> = TStr extends `${infer _}${TSuff}` ? true : false;
