import { createGlobalStyle } from "styled-components";
import { normalize } from "polished";

export const GlobalStyles = createGlobalStyle`
  ${normalize()}

  html {
    min-height: 100%;
    font: 100%/1.5 Roboto, sans-serif;
    background: ${({ theme }) => theme.colors.bgSecondary};
  }

  body {
    min-height: 100%;
  }

  h1,
  h2,
  h3 {
    line-height: 1.375;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.link};

    &:hover {
      text-decoration: underline;
    }
  }
`;
