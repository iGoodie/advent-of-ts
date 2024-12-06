const createRoute = <Route extends string | number>(
  author: string,
  route: Route
) => {
  console.log(`[createRoute] route created by ${author} at ${Date.now()}`);
  return route;
};
