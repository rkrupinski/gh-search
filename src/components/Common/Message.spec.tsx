import React from "react";
import { Message } from "./Message";
import { renderWithProviders } from "testUtils";

describe("Message", () => {
  it("should render loading message", () => {
    const { container } = renderWithProviders(<Message type="loading">Loading</Message>);

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should render error message", () => {
    const { container } = renderWithProviders(<Message type="error">Error</Message>);

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should let one delay the appearance", () => {
    const { container } = renderWithProviders(
      <Message type="loading" waitMs={1000}>
        Loading delayed
      </Message>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
