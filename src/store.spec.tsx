import React from "react";
import { render } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react-hooks";
import { StoreProvider, useStore, Thunk, ThunkDispatch } from "store";

type DummyAction = { type: "INC" };
type DummyState = number;

jest.mock("reducer", () => ({
  initialState: 0,
  reducer(state: DummyState, action: DummyAction) {
    switch (action.type) {
      case "INC":
        return state + 1;

      default:
        return state;
    }
  },
}));

describe("store", () => {
  describe("StoreProvider", () => {
    it("should just render children", () => {
      const { getByTestId } = render(
        <StoreProvider>
          <div data-testid="test" />
        </StoreProvider>,
      );

      expect(getByTestId("test")).toBeInTheDocument();
    });
  });

  describe("useStore", () => {
    it("should throw when no provider is found", () => {
      const { result } = renderHook(() => useStore());

      expect(result.error).toMatchInlineSnapshot(`[Error: StoreProvider not found]`);
    });

    it("should expose initial state", () => {
      const { result } = renderHook(() => useStore(), {
        wrapper: StoreProvider,
      });

      const { state } = result.current;

      expect(state).toMatchInlineSnapshot(`0`);
    });

    it("should let one dispatch standard actions", () => {
      const { result } = renderHook(() => useStore(), {
        wrapper: StoreProvider,
      });

      const { dispatch } = result.current;

      const action: DummyAction = { type: "INC" };

      act(() => {
        ((dispatch as unknown) as ThunkDispatch<DummyAction>)(action);
      });

      expect(result.current.state).toMatchInlineSnapshot(`1`);
    });

    it("should let one dispatch thunk actions", async () => {
      const { result } = renderHook(() => useStore(), {
        wrapper: StoreProvider,
      });

      const { dispatch: origDispatch } = result.current;

      const action: Thunk<DummyAction> = async dispatch => {
        dispatch({ type: "INC" });
        await Promise.resolve();
        dispatch({ type: "INC" });
      };

      await act(async () => {
        ((origDispatch as unknown) as ThunkDispatch<DummyAction>)(action);
      });

      expect(result.current.state).toMatchInlineSnapshot(`2`);
    });
  });
});
