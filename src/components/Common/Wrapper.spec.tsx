import React from "react";
import { Wrapper } from "components/Common/Wrapper";
import { renderWithProviders } from "testUtils";

describe("Wrapper", () => {
  it("should render correctly", () => {
    const { container } = renderWithProviders(<Wrapper>Test</Wrapper>);

    expect(container.firstChild).toMatchSnapshot();
  });
});
