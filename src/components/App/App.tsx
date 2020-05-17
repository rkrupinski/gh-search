import React from "react";
import { hot } from "react-hot-loader/root";
import { SearchForm } from "components/SearchForm/SearchForm";
import { UserDetails } from "components/UserDetails/UserDetails";
import { Repos } from "components/Repos/Repos";
import { useStore } from "store";
import { selectIsLoading, selectTopRepos } from "./selectors";
import { resetData, loadUser, loadRepos } from "./actions";

export const App: React.FC = () => {
  const { state, dispatch } = useStore();

  const handleSearchRequest = React.useCallback(
    async (username: string) => {
      try {
        await dispatch(resetData());
        await dispatch(loadUser(username));
        await dispatch(loadRepos(username));
      } catch (err) {
        // ¯\_(ツ)_/¯
      }
    },
    [dispatch],
  );

  const busy = React.useMemo(() => selectIsLoading(state), [state]);
  const topRepos = React.useMemo(() => selectTopRepos(state), [state]);

  return (
    <>
      <SearchForm onSearchRequest={handleSearchRequest} busy={busy} />
      <UserDetails data={state.user} />
      <Repos data={topRepos} />
    </>
  );
};

export default hot(App);
