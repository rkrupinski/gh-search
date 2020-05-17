import React from "react";
import styled from "styled-components";
import { Wrapper } from "components/Common/Wrapper";
import { Message } from "components/Common/Message";
import { Resource } from "utils/resource";
import { User } from "codecs/User";

const Row = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: ${({ theme }) => theme.layout.gutter};
`;

const Avatar = styled.img`
  flex: none;
  width: 4rem;
  height: 4rem;
  margin-right: ${({ theme }) => theme.layout.gutter};
  object-fit: cover;
  border-radius: ${({ theme }) => theme.layout.borderRadius};
`;

const UserName = styled.h1`
  flex: 1;
  min-width: 0;
  margin: 0;
  font-size: 1.125rem;
  word-wrap: break-word;
`;

const Bio = styled.p`
  flex: 1;
  min-width: 0;
  margin: 0;
  font-size: 0.875rem;
  word-wrap: break-word;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export type UserDetailsProps = {
  data: Resource<User>;
};

export const UserDetails: React.FC<UserDetailsProps> = ({ data }) => {
  switch (data.tag) {
    case "success":
      return (
        <Wrapper>
          <Row>
            <Avatar
              data-testid="user-avatar"
              src={data.data.avatar_url}
              alt={data.data.name ?? ""}
            />
            {data.data.name && <UserName data-testid="user-name">{data.data.name}</UserName>}
          </Row>
          {data.data.bio && (
            <Row>
              <Bio data-testid="user-bio">{data.data.bio}</Bio>
            </Row>
          )}
        </Wrapper>
      );

    case "loading":
      return (
        <Message data-testid="loading-message" type="loading" waitMs={500}>
          Loading user&hellip;
        </Message>
      );

    case "failure":
      return (
        <Message data-testid="error-message" type="error">
          Error loading user ({data.reason})
        </Message>
      );

    default:
      return null;
  }
};
