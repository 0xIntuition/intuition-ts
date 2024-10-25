import { graphql } from "../generated/gql";

export const AtomMetadataFragment = graphql(`
  fragment AtomMetadata on atoms {
    data
    id
    image
    label
    emoji
    type
  }
`)

export const AtomTxnFragment = graphql(`
  fragment AtomTxn on atoms {
    blockNumber
    blockTimestamp
    transactionHash
    creatorId
  }
`)

export const AtomVaultDetailsFragment = graphql(`
  fragment AtomVaultDetails on atoms {
    vaultId
    walletId
    vault {
      positionCount
      totalShares
      currentSharePrice
    }
  }
`)
