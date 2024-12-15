type PerfReview<GG extends AsyncGenerator> = GG extends AsyncGenerator<infer R> ? R : never;
