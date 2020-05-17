import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "components/Common/GlobalStyles";
import App from "components/App/App";
import { StoreProvider } from "store";
import { theme } from "theme";

ReactDOM.render(
  <StoreProvider>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </StoreProvider>,
  document.getElementById("root"),
);
