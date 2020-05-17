import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      bgPrimary: string;
      bgSecondary: string;
      textPrimary: string;
      textSecondary: string;
      textAlt: string;
      link: string;
    };
    layout: {
      maxWidth: string;
      gutter: string;
      boxShadow: string;
      borderRadius: string;
    };
    animation: {
      duration: string;
    };
  }
}
