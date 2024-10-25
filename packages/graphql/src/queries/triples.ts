import { graphql } from "../generated/gql";

export const GetTriplesDocument = graphql(`
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
`)
