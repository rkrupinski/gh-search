import * as t from "io-ts";

export const Repo = t.type({
  id: t.number,
  name: t.string,
  html_url: t.string,
  stargazers_count: t.number,
});

export type Repo = t.TypeOf<typeof Repo>;
