const createRoute = <R>(author: string, route: R) => {
  console.log(`[createRoute] route created by ${author} at ${Date.now()}`);
  return route;
};
