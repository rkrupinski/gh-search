import { AppState } from "reducer";
import { mapSuccess } from "utils/resource";

export const selectTopRepos = ({ repos }: AppState) =>
  mapSuccess(
    allRepos =>
      allRepos
        .sort((a, b) => {
          if (a.stargazers_count < b.stargazers_count) return 1;
          if (a.stargazers_count > b.stargazers_count) return -1;
          return 0;
        })
        .slice(0, 3),
    repos,
  );

export const selectIsLoading = ({ user, repos }: AppState) =>
  user.tag === "loading" || repos.tag === "loading";
