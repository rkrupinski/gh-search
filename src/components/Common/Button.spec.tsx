import React from "react";
import { fireEvent } from "@testing-library/react";
import { Button } from "./Button";
import { renderWithProviders } from "testUtils";

describe("Button", () => {
  it("should render correctly", () => {
    const { container } = renderWithProviders(<Button type="submit">Button text</Button>);

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should let one handle click", () => {
    const handleClick = jest.fn();

    const { container } = renderWithProviders(<Button onClick={handleClick}>Button text</Button>);

    fireEvent.click(container.firstChild!);

    expect(handleClick).toHaveBeenCalled();
  });

  it("should not handle clicks when disabled", () => {
    const handleClick = jest.fn();

    const { container } = renderWithProviders(
      <Button onClick={handleClick} disabled>
        Button text
      </Button>,
    );

    fireEvent.click(container.firstChild!);

    expect(handleClick).not.toHaveBeenCalled();
  });
});
