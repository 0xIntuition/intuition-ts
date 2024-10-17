import { gql } from 'graphql-request';

export const ATOM_METADATA_FRAGMENT = gql`
  fragment AtomMetadata on atoms {
    data
    id
    image
    label
    emoji
    type
  }
`;

export const ATOM_TXN_FRAGMENT = gql`
  fragment AtomTxn on atoms {
    blockNumber
    blockTimestamp
    transactionHash
    creatorId
  }
`;

export const ATOM_VAULT_DETAILS_FRAGMENT = gql`
  fragment AtomVaultDetails on atoms {
    vaultId
    walletId
    vault {
      positionCount
      totalShares
      currentSharePrice
    }
  }
`;
