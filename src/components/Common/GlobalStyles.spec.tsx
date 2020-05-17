import React from "react";
import { GlobalStyles } from "components/Common/GlobalStyles";
import { renderWithProviders } from "testUtils";

describe("GlobalStyles", () => {
  it("should not render anything", () => {
    const { container } = renderWithProviders(<GlobalStyles />);

    expect(container.firstChild).toBe(null);
  });
});
