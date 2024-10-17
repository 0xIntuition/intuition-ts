import { gql } from 'graphql-request';

export const POSITION_DETAILS_FRAGMENT = gql`
  fragment PositionDetails on positions {
    id
    accountId
    shares
    vaultId
  }
`;
