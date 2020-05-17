import React from "react";
import styled from "styled-components";
import { Wrapper } from "components/Common/Wrapper";
import { Message } from "components/Common/Message";
import { Resource } from "utils/resource";
import { Repo } from "codecs/Repo";

const ReposHeading = styled.h2`
  margin: 0 0 ${({ theme }) => theme.layout.gutter};
  font-size: 1.125rem;
`;

const List = styled.ol`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0 0 ${({ theme }) => theme.layout.gutter};
  list-style: none;
  counter-reset: repos;

  @media (min-width: ${({ theme }) => theme.layout.maxWidth}) {
    flex-direction: row;
  }
`;

const ListItem = styled.li`
  counter-increment: repos;
  flex: 1;
  min-width: 0;
  margin-bottom: ${({ theme }) => theme.layout.gutter};
  position: relative;

  &:not(:first-child) {
    @media (min-width: ${({ theme }) => theme.layout.maxWidth}) {
      margin-left: ${({ theme }) => theme.layout.gutter};
    }
  }

  &::before {
    content: counter(repos);
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    font-size: 0.625rem;
    line-height: 1rem;
    text-align: center;
    position: absolute;
    left: 1rem;
    top: 50%;
    color: ${({ theme }) => theme.colors.textAlt};
    background: ${({ theme }) => theme.colors.textPrimary};
    transform: translateY(-50%);
    pointer-events: none;
  }
`;

const Link = styled.a`
  display: block;
  height: 2.5rem;
  padding: 0 1rem 0 3rem;
  font-size: 0.875rem;
  line-height: 2.5rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  border-radius: ${({ theme }) => theme.layout.borderRadius};
  background: ${({ theme }) => theme.colors.bgPrimary};
  box-shadow: ${({ theme }) => theme.layout.boxShadow};
  -webkit-touch-callout: none;
`;

export type ReposProps = {
  data: Resource<Repo[]>;
};

export const Repos: React.FC<ReposProps> = ({ data }) => {
  switch (data.tag) {
    case "success":
      return data.data.length ? (
        <Wrapper>
          <ReposHeading>Top repositories</ReposHeading>
          <List>
            {data.data.map(({ id, name, html_url }) => (
              <ListItem key={id}>
                <Link
                  data-testid="repo"
                  href={html_url}
                  title={`View: ${name}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {name}
                </Link>
              </ListItem>
            ))}
          </List>
        </Wrapper>
      ) : null;

    case "loading":
      return (
        <Message data-testid="loading-message" type="loading" waitMs={500}>
          Loading repos&hellip;
        </Message>
      );

    case "failure":
      return (
        <Message data-testid="error-message" type="error">
          Error loading repos ({data.reason})
        </Message>
      );

    default:
      return null;
  }
};
