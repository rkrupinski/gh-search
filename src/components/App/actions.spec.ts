import { resetData, loadUser, loadRepos } from "./actions";
import * as ghService from "services/githubService";
import { User } from "codecs/User";
import { Repo } from "codecs/Repo";

describe("actions", () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockReset();
  });

  describe("resetData", () => {
    it("should disparch correct actions", async () => {
      await resetData()(dispatch);

      expect(dispatch.mock.calls).toMatchInlineSnapshot(`
        Array [
          Array [
            Object {
              "type": "SET_USER",
              "user": Object {
                "tag": "idle",
              },
            },
          ],
          Array [
            Object {
              "repos": Object {
                "tag": "idle",
              },
              "type": "SET_REPOS",
            },
          ],
        ]
      `);
    });
  });

  describe("loadUser", () => {
    let validUser: User;

    beforeEach(() => {
      validUser = {
        id: 1,
        name: "Test",
        bio: null,
        avatar_url: "avatar.jpg",
      };
    });

    it("should request data for a given username", async () => {
      const expected = "test";

      jest.spyOn(ghService, "fetchUser").mockResolvedValueOnce(validUser);

      await loadUser(expected)(dispatch);

      expect(ghService.fetchUser).toHaveBeenCalledWith(expected);
    });

    it("should dispatch correct actions upon success", async () => {
      jest.spyOn(ghService, "fetchUser").mockResolvedValueOnce(validUser);

      await loadUser("test")(dispatch);

      expect(dispatch.mock.calls).toMatchInlineSnapshot(`
        Array [
          Array [
            Object {
              "type": "SET_USER",
              "user": Object {
                "tag": "loading",
              },
            },
          ],
          Array [
            Object {
              "type": "SET_USER",
              "user": Object {
                "data": Object {
                  "avatar_url": "avatar.jpg",
                  "bio": null,
                  "id": 1,
                  "name": "Test",
                },
                "tag": "success",
              },
            },
          ],
        ]
      `);
    });

    it("should dispatch correct actions upon error", async () => {
      jest.spyOn(ghService, "fetchUser").mockRejectedValueOnce(new Error("nope"));

      await expect(loadUser("test")(dispatch)).rejects.toThrow("nope");

      expect(dispatch.mock.calls).toMatchInlineSnapshot(`
        Array [
          Array [
            Object {
              "type": "SET_USER",
              "user": Object {
                "tag": "loading",
              },
            },
          ],
          Array [
            Object {
              "type": "SET_USER",
              "user": Object {
                "reason": "nope",
                "tag": "failure",
              },
            },
          ],
        ]
      `);
    });
  });

  describe("loadRepos", () => {
    let validRepos: Repo[];

    beforeEach(() => {
      validRepos = [
        {
          id: 1,
          name: "Test",
          html_url: "https://github.com",
          stargazers_count: 10,
        },
      ];
    });

    it("should request data for a given username", async () => {
      const expected = "test";

      jest.spyOn(ghService, "fetchRepos").mockResolvedValueOnce(validRepos);

      await loadRepos(expected)(dispatch);

      expect(ghService.fetchRepos).toHaveBeenCalledWith(expected);
    });

    it("should dispatch correct actions upon success", async () => {
      jest.spyOn(ghService, "fetchRepos").mockResolvedValueOnce(validRepos);

      await loadRepos("test")(dispatch);

      expect(dispatch.mock.calls).toMatchInlineSnapshot(`
        Array [
          Array [
            Object {
              "repos": Object {
                "tag": "loading",
              },
              "type": "SET_REPOS",
            },
          ],
          Array [
            Object {
              "repos": Object {
                "data": Array [
                  Object {
                    "html_url": "https://github.com",
                    "id": 1,
                    "name": "Test",
                    "stargazers_count": 10,
                  },
                ],
                "tag": "success",
              },
              "type": "SET_REPOS",
            },
          ],
        ]
      `);
    });

    it("should dispatch correct actions upon error", async () => {
      jest.spyOn(ghService, "fetchRepos").mockRejectedValueOnce(new Error("nope"));

      await expect(loadRepos("test")(dispatch)).rejects.toThrow("nope");

      expect(dispatch.mock.calls).toMatchInlineSnapshot(`
        Array [
          Array [
            Object {
              "repos": Object {
                "tag": "loading",
              },
              "type": "SET_REPOS",
            },
          ],
          Array [
            Object {
              "repos": Object {
                "reason": "nope",
                "tag": "failure",
              },
              "type": "SET_REPOS",
            },
          ],
        ]
      `);
    });
  });
});
