import React from "react";
import { success, loading, failure, idle } from "utils/resource";
import { renderWithProviders } from "testUtils";
import { Repos } from "./Repos";

describe("Repos", () => {
  it("should render success state with no data", () => {
    const data = success([]);
    const { container } = renderWithProviders(<Repos data={data} />);

    expect(container.firstChild).toBe(null);
  });

  it("should render success state with data", () => {
    const data = success([
      {
        id: 1,
        name: "test 1",
        html_url: "https://github.com/test1",
        stargazers_count: 1,
      },
      {
        id: 2,
        name: "test 2",
        html_url: "https://github.com/test2",
        stargazers_count: 2,
      },
    ]);
    const { getAllByTestId } = renderWithProviders(<Repos data={data} />);

    expect(getAllByTestId("repo").map(el => el.textContent)).toMatchInlineSnapshot(`
      Array [
        "test 1",
        "test 2",
      ]
    `);

    expect(getAllByTestId("repo").map(el => el.getAttribute("href"))).toMatchInlineSnapshot(`
      Array [
        "https://github.com/test1",
        "https://github.com/test2",
      ]
    `);
  });

  it("should render loading state", () => {
    const data = loading;
    const { container, getByTestId } = renderWithProviders(<Repos data={data} />);
    const el = getByTestId("loading-message");

    expect(el).toBe(container.firstChild);
    expect(el).toHaveTextContent("Loading repos…");
  });

  it("should render failure state", () => {
    const data = failure("nope");
    const { container, getByTestId } = renderWithProviders(<Repos data={data} />);
    const msg = getByTestId("error-message");

    expect(msg).toBe(container.firstChild);
    expect(msg).toHaveTextContent("Error loading repos (nope)");
  });

  it("should render idle state", () => {
    const data = idle;
    const { container } = renderWithProviders(<Repos data={data} />);

    expect(container.firstChild).toBe(null);
  });
});
