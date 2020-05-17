import * as t from "io-ts";

export const User = t.type({
  id: t.number,
  bio: t.union([t.null, t.string]),
  name: t.union([t.null, t.string]),
  avatar_url: t.string,
});

export type User = t.TypeOf<typeof User>;
