import React from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { StoreProvider } from "store";
import { theme } from "theme";

const Providers: React.FC = ({ children }) => (
  <StoreProvider>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </StoreProvider>
);

export const renderWithProviders = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "queries" | "wrapper">,
) => render(ui, { wrapper: Providers, ...options });

export const noop = () => {
  /**/
};
