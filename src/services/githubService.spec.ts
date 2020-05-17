import fetch from "jest-fetch-mock";
import { User } from "codecs/User";
import { Repo } from "codecs/Repo";
import { fetchUser, fetchRepos } from "services/githubService";

describe("githubService", () => {
  const username = "test";

  describe("fetchUser", () => {
    it("should fetch user data", async () => {
      const expected: User = {
        id: 1,
        name: "test",
        bio: "lorem ipsum",
        avatar_url: "test.jpg",
      };

      fetch.mockResponseOnce(req =>
        req.method === "GET" && req.url === `https://api.github.com/users/${username}`
          ? Promise.resolve(JSON.stringify(expected))
          : Promise.reject("Invalid request"),
      );

      await expect(fetchUser(username)).resolves.toStrictEqual(expected);
    });

    it("should handle invalid data", async () => {
      fetch.mockResponseOnce(JSON.stringify({ id: 2, name: 333 }));

      await expect(fetchUser(username)).rejects.toThrow("Invalid data");
    });

    it("should handle http errors", async () => {
      const expected = "Not Found";

      fetch.mockResolvedValueOnce({
        ok: false,
        statusText: expected,
      } as Response);

      await expect(fetchUser(username)).rejects.toThrow(expected);
    });
  });

  describe("fetchRepos", () => {
    it("should fetch repos", async () => {
      const expected: Repo[] = [
        {
          id: 1,
          name: "test",
          html_url: "https://github.com",
          stargazers_count: 100,
        },
      ];

      fetch.mockResponseOnce(req =>
        req.method === "GET" && req.url === `https://api.github.com/users/${username}/repos`
          ? Promise.resolve(JSON.stringify(expected))
          : Promise.reject("Invalid request"),
      );

      await expect(fetchRepos(username)).resolves.toStrictEqual(expected);
    });

    it("should handle invalid data", async () => {
      fetch.mockResponseOnce(JSON.stringify([{ id: 1, name: "test" }]));

      await expect(fetchRepos(username)).rejects.toThrow("Invalid data");
    });

    it("should handle http errors", async () => {
      const expected = "Not Found";

      fetch.mockResolvedValueOnce({
        ok: false,
        statusText: expected,
      } as Response);

      await expect(fetchRepos(username)).rejects.toThrow(expected);
    });
  });
});
