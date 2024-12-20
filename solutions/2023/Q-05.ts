type SantasList<TBads extends readonly any[], TGoods extends readonly any[]> = [
  ...TBads,
  ...TGoods
];
