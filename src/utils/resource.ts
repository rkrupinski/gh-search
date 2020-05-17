export type Resource<T, E = string> =
  | {
      tag: "idle";
    }
  | {
      tag: "loading";
    }
  | {
      tag: "success";
      data: T;
    }
  | {
      tag: "failure";
      reason: E;
    };

export const idle: Resource<never, never> = { tag: "idle" };

export const loading: Resource<never, never> = { tag: "loading" };

export const success = <T>(data: T): Resource<T, never> => ({
  tag: "success",
  data,
});

export const failure = <E>(reason: E): Resource<never, E> => ({
  tag: "failure",
  reason,
});

export const mapSuccess = <T, E, R>(f: (data: T) => R, r: Resource<T, E>): Resource<R, E> =>
  r.tag === "success" ? success(f(r.data)) : r;
