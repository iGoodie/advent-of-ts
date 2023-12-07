type AppendGood<TObj extends object> = {
  [K in keyof TObj as K extends string ? `good_${K}` : never]: TObj[K];
};
