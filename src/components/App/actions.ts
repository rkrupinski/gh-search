import { Thunk } from "store";
import { AppAction, setUser, setRepos } from "reducer";
import { loading, success, failure, idle } from "utils/resource";
import { fetchUser, fetchRepos } from "services/githubService";

export const resetData = (): Thunk<AppAction> => async dispatch => {
  dispatch(setUser(idle));
  dispatch(setRepos(idle));
};

export const loadUser = (username: string): Thunk<AppAction> => async dispatch => {
  dispatch(setUser(loading));

  try {
    const user = await fetchUser(username);

    dispatch(setUser(success(user)));
  } catch (err) {
    dispatch(setUser(failure(err.message)));

    throw err;
  }
};

export const loadRepos = (username: string): Thunk<AppAction> => async dispatch => {
  dispatch(setRepos(loading));

  try {
    const repos = await fetchRepos(username);

    dispatch(setRepos(success(repos)));
  } catch (err) {
    dispatch(setRepos(failure(err.message)));

    throw err;
  }
};
