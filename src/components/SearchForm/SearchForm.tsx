import React from "react";
import styled from "styled-components";
import { Wrapper } from "components/Common/Wrapper";
import { Input } from "components/Common/Input";
import { Button } from "components/Common/Button";
import searchIcon from "assets/search.svg";

const Container = styled.div`
  padding: ${({ theme }) => theme.layout.gutter} 0;
  margin-bottom: ${({ theme }) => theme.layout.gutter};
  background: ${({ theme }) => theme.colors.bgPrimary};
  box-shadow: ${({ theme }) => theme.layout.boxShadow};
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
`;

const InputWrapper = styled.div`
  flex: 1;
  margin-right: ${({ theme }) => theme.layout.gutter};
  position: relative;
`;

const InputIcon = styled.img`
  width: 1rem;
  position: absolute;
  left: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
`;

const SearchInput = styled(Input)`
  display: block;
  width: 100%;
  padding-left: 2rem;
`;

export type SearchFormProps = {
  onSearchRequest: (username: string) => Promise<void>;
  busy?: boolean;
};

export const SearchForm: React.FC<SearchFormProps> = ({ onSearchRequest, busy }) => {
  const [query, setQuery] = React.useState("");

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    [setQuery],
  );

  const handleSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      onSearchRequest(query);
    },
    [onSearchRequest, query],
  );

  return (
    <Container>
      <Wrapper>
        <Form data-testid="form" onSubmit={handleSubmit} noValidate>
          <InputWrapper>
            <InputIcon src={searchIcon} alt="" />
            <SearchInput
              data-testid="input"
              value={query}
              onChange={handleChange}
              placeholder="Search for users"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              autoFocus
            />
          </InputWrapper>
          <Button data-testid="button" type="submit" disabled={busy || !query.length}>
            Search
          </Button>
        </Form>
      </Wrapper>
    </Container>
  );
};
