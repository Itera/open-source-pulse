// @flow
import React from 'react';
import styled from 'styled-components';

const Error = styled.div`
  margin: 5rem;
  padding: 2.5rem;
  background:;
  border: 1px solid ${({ theme }) => theme.red};
`;

export type GraphqlErrorProps = {
  data?: {
    error?: {message: string}
  }
}

export default function displayGraphqlError(Component: ReactClass<*>) {
  return function GraphqlError(props: GraphqlErrorProps) {
    if (props.data && props.data.error) {
      return <Error>{props.data.error.message}</Error>;
    }
    return <Component {...props} />;
  };
}
