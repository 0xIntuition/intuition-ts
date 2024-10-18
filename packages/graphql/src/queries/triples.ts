import { gql } from 'graphql-request';
import { TRIPLE_METADATA_FRAGMENT, TRIPLE_TXN_FRAGMENT, TRIPLE_VAULT_DETAILS_FRAGMENT } from '../fragments';

export const GET_TRIPLES_QUERY = gql`
  query GetTriples($limit: Int, $offset: Int, $orderBy: [triples_order_by!], $where: triples_bool_exp) {
    triples(limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
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
