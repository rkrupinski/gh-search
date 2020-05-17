import styled from "styled-components";

export const Input = styled.input`
  box-sizing: border-box;
  height: 2rem;
  padding: 0 0.75rem;
  font-size: 0.875rem;
  line-height: 2;
  border: 0;
  border-radius: ${({ theme }) => theme.layout.borderRadius};
  color: ${({ theme }) => theme.colors.textPrimary};
  background: ${({ theme }) => theme.colors.bgSecondary};
  appearance: none;

  ::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;
