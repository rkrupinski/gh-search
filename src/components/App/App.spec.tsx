import React from "react";
import { fireEvent } from "@testing-library/react";
import * as store from "store";
import * as SearchForm from "components/SearchForm/SearchForm";
import * as UserDetails from "components/UserDetails/UserDetails";
import * as Repos from "components/Repos/Repos";
import { User } from "codecs/User";
import { Repo } from "codecs/Repo";
import { idle, success, Resource } from "utils/resource";
import { renderWithProviders, timeout } from "testUtils";
import * as actions from "./actions";
import * as selectors from "./selectors";
import { App } from "./App";

describe("App", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should not disable search when not loading", () => {
    jest.spyOn(selectors, "selectIsLoading").mockReturnValueOnce(false);
    jest.spyOn(SearchForm, "SearchForm").mockReturnValueOnce(null);

    renderWithProviders(<App />);

    expect(SearchForm.SearchForm).toHaveBeenCalledWith(
      {
        busy: false,
        onSearchRequest: expect.anything(),
      },
      expect.anything(),
    );
  });

  it("should disable search when loading", () => {
    jest.spyOn(selectors, "selectIsLoading").mockReturnValueOnce(true);
    jest.spyOn(SearchForm, "SearchForm").mockReturnValueOnce(null);

    renderWithProviders(<App />);

    expect(SearchForm.SearchForm).toHaveBeenCalledWith(
      {
        busy: true,
        onSearchRequest: expect.anything(),
      },
      expect.anything(),
    );
  });

  it("should fetch data in the correct order", async () => {
    const username = "test";
    const dispatch = jest.fn();

    jest
      .spyOn(actions, "resetData")
      .mockImplementationOnce(() => jest.fn(() => Promise.resolve()).mockName("mockResetData"));
    jest
      .spyOn(actions, "loadUser")
      .mockImplementationOnce(() => jest.fn(() => Promise.resolve()).mockName("mockLoadUser"));
    jest
      .spyOn(actions, "loadRepos")
      .mockImplementationOnce(() => jest.fn(() => Promise.resolve()).mockName("mockLoadRepos"));

    jest.spyOn(store, "useStore").mockImplementation(() => ({
      state: { user: idle, repos: idle },
      dispatch,
    }));

    const { getByTestId } = renderWithProviders(<App />);

    fireEvent.change(getByTestId("input"), {
      target: {
        value: username,
      },
    });

    fireEvent.click(getByTestId("button"));

    await timeout();

    expect(actions.loadUser).toHaveBeenCalledWith(username);

    expect(actions.loadRepos).toHaveBeenCalledWith(username);

    expect(dispatch.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          [MockFunction mockResetData],
        ],
        Array [
          [MockFunction mockLoadUser],
        ],
        Array [
          [MockFunction mockLoadRepos],
        ],
      ]
    `);
  });

  it("should not load repos if loading user fails", async () => {
    const username = "test";

    jest.spyOn(actions, "resetData").mockImplementationOnce(() => () => Promise.resolve());
    jest.spyOn(actions, "loadUser").mockImplementationOnce(() => () => Promise.reject());
    jest.spyOn(actions, "loadRepos").mockImplementationOnce(() => () => Promise.resolve());

    const { getByTestId } = renderWithProviders(<App />);

    fireEvent.change(getByTestId("input"), {
      target: {
        value: username,
      },
    });

    fireEvent.click(getByTestId("button"));

    await timeout();

    expect(actions.loadUser).toHaveBeenCalledWith(username);

    expect(actions.loadRepos).not.toHaveBeenCalled();
  });

  it("should render user details", () => {
    const user: Resource<User> = success({
      id: 1,
      name: null,
      bio: null,
      avatar_url: "avatar.jpg",
    });

    jest.spyOn(UserDetails, "UserDetails").mockReturnValueOnce(null);
    jest.spyOn(store, "useStore").mockImplementation(() => ({
      state: { user, repos: idle },
      dispatch: jest.fn(),
    }));

    renderWithProviders(<App />);

    expect(UserDetails.UserDetails).toHaveBeenCalledWith({ data: user }, expect.anything());
  });

  it("should render repos", () => {
    const repos: Resource<Repo[]> = success([
      {
        id: 1,
        name: "test",
        html_url: "/test",
        stargazers_count: 1,
      },
    ]);

    jest.spyOn(Repos, "Repos").mockReturnValueOnce(null);
    jest.spyOn(store, "useStore").mockImplementation(() => ({
      state: { user: idle, repos },
      dispatch: jest.fn(),
    }));

    renderWithProviders(<App />);

    expect(Repos.Repos).toHaveBeenCalledWith({ data: repos }, expect.anything());
  });
});
