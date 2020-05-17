import React from "react";
import { AppState, AppAction, reducer, initialState } from "reducer";

export type Thunk<A> = (dispatch: React.Dispatch<A>) => Promise<void>;

export type ThunkDispatch<A> = ((action: A) => void) & ((action: Thunk<A>) => Promise<void>);

type Store = {
  dispatch: ThunkDispatch<AppAction>;
  state: AppState;
};

const StoreContext = React.createContext<Store | null>(null);

function useThunkReducer<S, A>([state, dispatch]: [S, React.Dispatch<A>]) {
  const thunkDispatch = React.useCallback(
    (action: A | Thunk<A>) => (action instanceof Function ? action(dispatch) : dispatch(action)),
    [dispatch],
  );

  return [state, thunkDispatch as ThunkDispatch<A>] as const;
}

export const StoreProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useThunkReducer(React.useReducer(reducer, initialState));

  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  const ctx = React.useContext(StoreContext);

  if (!ctx) {
    throw new Error("StoreProvider not found");
  }

  return ctx;
};
