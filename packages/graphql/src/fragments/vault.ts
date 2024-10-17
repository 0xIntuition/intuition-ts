import { gql } from 'graphql-request';

export const VAULT_DETAILS_FRAGMENT = gql`
  fragment VaultDetails on vaults {
    atomId
    currentSharePrice
    id
    positionCount
    totalShares
    tripleId
  }
`;
