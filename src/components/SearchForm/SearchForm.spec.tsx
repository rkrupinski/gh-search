import React from "react";
import { fireEvent } from "@testing-library/react";
import { renderWithProviders } from "testUtils";
import { SearchForm } from "./SearchForm";

describe("SearchForm", () => {
  it("should ignore empty query", () => {
    const callback = jest.fn();
    const { getByTestId } = renderWithProviders(<SearchForm onSearchRequest={callback} />);

    fireEvent.click(getByTestId("button"));

    expect(callback).not.toHaveBeenCalled();
  });

  it("should ignore valid query if busy", () => {
    const callback = jest.fn();
    const { getByTestId } = renderWithProviders(<SearchForm onSearchRequest={callback} busy />);

    fireEvent.change(getByTestId("input"), {
      target: {
        value: "test",
      },
    });

    fireEvent.click(getByTestId("button"));

    expect(callback).not.toHaveBeenCalled();
  });

  it("should notify upon valid search", () => {
    const query = "test";
    const callback = jest.fn();
    const { getByTestId } = renderWithProviders(<SearchForm onSearchRequest={callback} />);

    fireEvent.change(getByTestId("input"), {
      target: {
        value: query,
      },
    });

    fireEvent.click(getByTestId("button"));

    expect(callback).toHaveBeenCalledWith(query);
  });
});
