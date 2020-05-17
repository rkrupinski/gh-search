import styled from "styled-components";
import { darken } from "polished";

export const Button = styled.button`
  box-sizing: border-box;
  height: 2rem;
  padding: 0 0.75rem;
  border: 0;
  border-radius: ${({ theme }) => theme.layout.borderRadius};
  font-size: 0.875rem;
  line-height: 2;
  color: ${({ theme }) => theme.colors.textAlt};
  background: ${({ theme }) => theme.colors.primary};
  appearance: none;
  transition: opacity ${({ theme }) => theme.animation.duration};

  &:disabled {
    opacity: 0.7;
  }

  &:not(:disabled) {
    cursor: pointer;

    :hover {
      background: ${({ theme }) => darken(0.1, theme.colors.primary)};
    }
  }
`;
