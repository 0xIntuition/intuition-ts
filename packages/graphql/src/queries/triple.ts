import { graphql } from "../generated/gql";

export const GetTripleDocument = graphql(`
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
`)
