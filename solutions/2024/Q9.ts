declare module "santas-special-list" {
  export type Status = "naughty" | "nice";

  export interface Child {
    name: string;
    status: Status;
  }

  export type List = Child[];
}
