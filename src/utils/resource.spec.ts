import { idle, loading, success, failure, mapSuccess } from "utils/resource";

describe("resource", () => {
  it("should produce idle resource", () => {
    expect(idle).toMatchInlineSnapshot(`
      Object {
        "tag": "idle",
      }
    `);
  });

  it("should produce loading resource", () => {
    expect(loading).toMatchInlineSnapshot(`
      Object {
        "tag": "loading",
      }
    `);
  });

  it("should produce success resource", () => {
    expect(success({ foo: "bar" })).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "foo": "bar",
        },
        "tag": "success",
      }
    `);
  });

  it("should produce failure resource", () => {
    expect(failure("nope")).toMatchInlineSnapshot(`
      Object {
        "reason": "nope",
        "tag": "failure",
      }
    `);
  });

  it("should let one map success", () => {
    const mapResource = mapSuccess.bind(null, String);

    expect(mapResource(idle)).toMatchInlineSnapshot(`
      Object {
        "tag": "idle",
      }
    `);

    expect(mapResource(loading)).toMatchInlineSnapshot(`
      Object {
        "tag": "loading",
      }
    `);

    expect(mapResource(failure("nope"))).toMatchInlineSnapshot(`
      Object {
        "reason": "nope",
        "tag": "failure",
      }
    `);

    expect(mapResource(success(42))).toMatchInlineSnapshot(`
      Object {
        "data": "42",
        "tag": "success",
      }
    `);
  });
});
