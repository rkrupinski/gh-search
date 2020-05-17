import styled, { keyframes } from "styled-components";

const appear = keyframes`
  to { opacity: 1; }
`;

const icons: Record<MessageType, string> = {
  loading: "⏳",
  error: "💩",
};

export type MessageType = "loading" | "error";

export type MessageProps = {
  type: MessageType;
  waitMs?: number;
};

export const Message = styled.p<MessageProps>`
  margin: calc(${({ theme }) => theme.layout.gutter} * 3) 0;
  text-align: center;
  word-wrap: break-word;
  color: ${({ theme }) => theme.colors.textSecondary};
  opacity: 0;
  animation-name: ${appear};
  animation-fill-mode: forwards;
  animation-duration: ${({ theme }) => theme.animation.duration};
  animation-delay: ${({ waitMs }) => `${waitMs ?? 0}ms`};

  &:before {
    content: ${({ type }) => `"${icons[type]}"`};
    margin-right: 0.25rem;
  }
`;
