import * as t from "io-ts";
import { pipe } from "fp-ts/lib/pipeable";
import { fold } from "fp-ts/lib/Either";
import { User } from "codecs/User";
import { Repo } from "codecs/Repo";

const HOST = "https://api.github.com";
const DEFAULT_HEADERS = { Accept: "application/vnd.github.v3+json" };

const makeFetcher = <T, A extends any[]>( // eslint-disable-line @typescript-eslint/no-explicit-any
  makeRequest: (...args: A) => Promise<Response>,
  codec: t.Type<T, any>, // eslint-disable-line @typescript-eslint/no-explicit-any
) => (...args: A) =>
  makeRequest(...args)
    .then(res => (res.ok ? res.json() : Promise.reject(new Error(res.statusText))))
    .then(json =>
      pipe(
        codec.decode(json),
        fold(
          () => Promise.reject(new Error("Invalid data")),
          right => Promise.resolve(right),
        ),
      ),
    );

export const fetchUser = makeFetcher(
  (username: string) => fetch(`${HOST}/users/${username}`, { headers: DEFAULT_HEADERS }),
  User,
);

export const fetchRepos = makeFetcher(
  (username: string) => fetch(`${HOST}/users/${username}/repos`, { headers: DEFAULT_HEADERS }),
  t.array(Repo),
);
