import { reducer, initialState, setUser, setRepos } from "reducer";
import { success } from "utils/resource";

describe("reducer", () => {
  it("should expose initial state", () => {
    expect(initialState).toMatchInlineSnapshot(`
      Object {
        "repos": Object {
          "tag": "idle",
        },
        "user": Object {
          "tag": "idle",
        },
      }
    `);
  });

  it("should handle setUser action", () => {
    const actual = reducer(
      initialState,
      setUser(
        success({
          id: 1,
          name: "test user",
          bio: "test bio",
          avatar_url: "avatar.jpg",
        }),
      ),
    );

    expect(actual).toMatchInlineSnapshot(`
      Object {
        "repos": Object {
          "tag": "idle",
        },
        "user": Object {
          "data": Object {
            "avatar_url": "avatar.jpg",
            "bio": "test bio",
            "id": 1,
            "name": "test user",
          },
          "tag": "success",
        },
      }
    `);
  });

  it("should handle setRepos action", () => {
    const actual = reducer(
      initialState,
      setRepos(
        success([
          {
            id: 1,
            name: "test",
            html_url: "https://github.com",
            stargazers_count: 1,
          },
        ]),
      ),
    );

    expect(actual).toMatchInlineSnapshot(`
Object {
  "repos": Object {
    "data": Array [
      Object {
        "html_url": "https://github.com",
        "id": 1,
        "name": "test",
        "stargazers_count": 1,
      },
    ],
    "tag": "success",
  },
  "user": Object {
    "tag": "idle",
  },
}
`);
  });
});
