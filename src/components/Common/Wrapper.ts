import styled from "styled-components";

export const Wrapper = styled.div`
  box-sizing: border-box;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  padding: 0 ${({ theme }) => theme.layout.gutter};
  margin: 0 auto;
`;
