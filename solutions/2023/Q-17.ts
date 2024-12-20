type RockPaperScissors = "👊🏻" | "🖐🏾" | "✌🏽";

type WinTable = {
  "👊🏻": "✌🏽";
  "🖐🏾": "👊🏻";
  "✌🏽": "🖐🏾";
};

type WhoWins<
  P1 extends RockPaperScissors,
  P2 extends RockPaperScissors
> = P1 extends P2 ? "draw" : WinTable[P1] extends P2 ? "lose" : "win";
