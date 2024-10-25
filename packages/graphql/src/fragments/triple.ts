import { graphql } from "../generated/gql";

export const TripleMetadataFragment = graphql(`
  fragment TripleMetadata on triples {
    id
    label
    subject {
      ...AtomMetadata
      creator {
        ...AccountMetadata
      }
    }
    predicate {
      ...AtomMetadata
      creator {
        ...AccountMetadata
      }
    }
    object {
      ...AtomMetadata
      creator {
        ...AccountMetadata
      }
    }
  }
`);

export const TripleTxnFragment = graphql(`
  fragment TripleTxn on triples {
    blockNumber
    blockTimestamp
    transactionHash
    creatorId
  }
`);

export const TripleVaultDetailsFragment = graphql(`
  fragment TripleVaultDetails on triples {
    vaultId
    counterVaultId
    vault {
      ...VaultDetails
    }
    counterVault {
      ...VaultDetails
    }
  }
`);
