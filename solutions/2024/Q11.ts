type Excuse<TNew extends object> = {
  new <const TExisting>(args: TExisting & TNew): TNew extends Record<
    infer K extends string,
    infer V extends string
  >
    ? `${K}: ${V}`
    : never;
};
