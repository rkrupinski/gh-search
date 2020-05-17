import React from "react";
import { fireEvent } from "@testing-library/react";
import { Input } from "./Input";
import { renderWithProviders, noop } from "testUtils";

describe("Input", () => {
  it("should render correctly", () => {
    const { container, rerender } = renderWithProviders(
      <Input
        type="text"
        autoComplete="off"
        placeholder="Placeholder test"
        value="Value test"
        onChange={noop}
      />,
    );

    expect(container.firstChild).toMatchSnapshot();

    rerender(<Input value="Value test 2" onChange={noop} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should let one handle change", () => {
    const handleChange = jest.fn((e: React.ChangeEvent<HTMLInputElement>) => {
      e.persist();
    });

    const { container } = renderWithProviders(<Input onChange={handleChange} />);

    fireEvent.change(container.firstChild!, {
      target: {
        value: "Test",
      },
    });

    expect(handleChange.mock.calls[0][0].target.value).toBe("Test");
  });
});
