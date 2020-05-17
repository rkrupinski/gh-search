import { idle, loading, failure, success } from "utils/resource";
import { selectIsLoading, selectTopRepos } from "./selectors";
import { Repo } from "codecs/Repo";
import { User } from "codecs/User";

describe("selectIsLoading", () => {
  const user = success<User>({ id: 1, name: null, bio: null, avatar_url: "avatar.jpg" });
  const repos = success<Repo[]>([]);

  it("should return true when loading user", () => {
    expect(selectIsLoading({ user: loading, repos: idle })).toBe(true);
  });

  it("should return true when loading repos", () => {
    expect(selectIsLoading({ user, repos: loading })).toBe(true);
  });

  it("should return false otherwise", () => {
    [
      { user: idle, repos: idle },
      { user, repos },
      { user, repos: failure("nope") },
      { user: failure("nope"), repos: idle },
    ].forEach(state => expect(selectIsLoading(state)).toBe(false));
  });
});

describe("selectTopRepos", () => {
  const A: Repo = { id: 1, name: "A", html_url: "/A", stargazers_count: 40 };
  const B: Repo = { id: 2, name: "B", html_url: "/B", stargazers_count: 60 };
  const C: Repo = { id: 3, name: "C", html_url: "/C", stargazers_count: 1 };
  const D: Repo = { id: 4, name: "D", html_url: "/D", stargazers_count: 10 };
  const E: Repo = { id: 5, name: "E", html_url: "/E", stargazers_count: 1 };

  it("should select top repos ordered by stars", () => {
    expect(
      selectTopRepos({
        user: idle,
        repos: success([A, B, C, D]),
      }),
    ).toStrictEqual(success([B, A, D]));
  });

  it("should be stable", () => {
    expect(
      selectTopRepos({
        user: idle,
        repos: success([C, E]),
      }),
    ).toStrictEqual(success([C, E]));
  });
});
