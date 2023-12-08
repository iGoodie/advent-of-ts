type FilteredKey<
  TKey extends string,
  TPrefix extends string
> = TKey extends `${TPrefix}${string}` ? never : TKey;

type KeysMatching<TObj extends object, TPred> = {
  [K in keyof TObj]: TObj[K] extends TPred ? K : never;
}[keyof TObj];

type RemoveValues<TObj extends object, TPred> = Omit<
  TObj,
  KeysMatching<TObj, TPred>
>;

type RemoveNaughtyChildren<TObj extends object> = RemoveValues<
  {
    [K in keyof TObj]: K extends string
      ? TObj[FilteredKey<K, "naughty_">]
      : never;
  },
  never
>;
