enum Gift {
  Coal = 0,
  Train = 2 ** 0,
  Bicycle = 2 ** 1,
  SuccessorToTheNintendoSwitch = 2 ** 2,
  TikTokPremium = 2 ** 3,
  Vape = 2 ** 4,

  // Either Train or Bicycle
  Traditional = Gift.Train | Gift.Bicycle,

  // Any of Coal, Bicycle, TikTokPremium or Vape
  OnTheMove = Coal | Bicycle | TikTokPremium | Vape,

  // OnTheMove minus Bicycle plus SuccessorToTheNintendoSwitch
  OnTheCouch = (OnTheMove ^ Bicycle) | SuccessorToTheNintendoSwitch,
}
