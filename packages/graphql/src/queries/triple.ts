import { gql } from 'graphql-request';
import { TRIPLE_METADATA_FRAGMENT, TRIPLE_TXN_FRAGMENT, TRIPLE_VAULT_DETAILS_FRAGMENT } from '../fragments';

export const GET_TRIPLE_QUERY = gql`
  query GetTriple($tripleId: numeric!) {
    triple(id: $tripleId) {
      ...TripleMetadata
      ...TripleTxn
      ...TripleVaultDetails
      creator {
        ...AccountMetadata
      }
    }
  }
  ${TRIPLE_METADATA_FRAGMENT}
  ${TRIPLE_TXN_FRAGMENT}
  ${TRIPLE_VAULT_DETAILS_FRAGMENT}
`;
