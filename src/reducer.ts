import { Resource, idle } from "utils/resource";
import { User } from "codecs/User";
import { Repo } from "codecs/Repo";

export const setUser = (user: Resource<User>) =>
  ({
    type: "SET_USER",
    user,
  } as const);

export const setRepos = (repos: Resource<Repo[]>) =>
  ({
    type: "SET_REPOS",
    repos,
  } as const);

const actions = {
  setUser,
  setRepos,
};

export type AppState = {
  readonly user: Resource<User>;
  readonly repos: Resource<Repo[]>;
};

export type AppAction = ReturnType<typeof actions[keyof typeof actions]>;

export const initialState: AppState = {
  user: idle,
  repos: idle,
};

export const reducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    case "SET_REPOS":
      return {
        ...state,
        repos: action.repos,
      };

    default:
      return state;
  }
};
