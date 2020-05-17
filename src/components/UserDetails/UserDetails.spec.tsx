import React from "react";
import { success, loading, failure, idle } from "utils/resource";
import { renderWithProviders } from "testUtils";
import { UserDetails } from "./UserDetails";

describe("UserDetails", () => {
  it("should render success state with complete data", () => {
    const data = success({
      id: 1,
      name: "John Smith",
      bio: "Lorem ipsum",
      avatar_url: "avatar.jpg",
    });

    const { getByTestId } = renderWithProviders(<UserDetails data={data} />);

    expect(getByTestId("user-avatar").getAttribute("src")).toBe("avatar.jpg");
    expect(getByTestId("user-avatar").getAttribute("alt")).toBe("John Smith");
    expect(getByTestId("user-name")).toHaveTextContent("John Smith");
    expect(getByTestId("user-bio")).toHaveTextContent("Lorem ipsum");
  });

  it("should render success state with incomplete data", () => {
    const data = success({
      id: 1,
      name: null,
      bio: null,
      avatar_url: "avatar.jpg",
    });

    const { getByTestId, queryByTestId } = renderWithProviders(<UserDetails data={data} />);

    expect(getByTestId("user-avatar").getAttribute("src")).toBe("avatar.jpg");
    expect(getByTestId("user-avatar").getAttribute("alt")).toBe("");
    expect(queryByTestId("user-name")).not.toBeInTheDocument();
    expect(queryByTestId("user-bio")).not.toBeInTheDocument();
  });

  it("should render loading state", () => {
    const data = loading;
    const { container, getByTestId } = renderWithProviders(<UserDetails data={data} />);
    const el = getByTestId("loading-message");

    expect(el).toBe(container.firstChild);
    expect(el).toHaveTextContent("Loading user…");
  });

  it("should render failure state", () => {
    const data = failure("nope");
    const { container, getByTestId } = renderWithProviders(<UserDetails data={data} />);
    const msg = getByTestId("error-message");

    expect(msg).toBe(container.firstChild);
    expect(msg).toHaveTextContent("Error loading user (nope)");
  });

  it("should render idle state", () => {
    const data = idle;
    const { container } = renderWithProviders(<UserDetails data={data} />);

    expect(container.firstChild).toBe(null);
  });
});
