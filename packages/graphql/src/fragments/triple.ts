import { gql } from 'graphql-request';
import { ATOM_METADATA_FRAGMENT } from './atom';
import { ACCOUNT_METADATA_FRAGMENT } from './account';
import { VAULT_DETAILS_FRAGMENT } from './vault';

export const TRIPLE_METADATA_FRAGMENT = gql`
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
  ${ATOM_METADATA_FRAGMENT}
  ${ACCOUNT_METADATA_FRAGMENT}
`;

export const TRIPLE_TXN_FRAGMENT = gql`
  fragment TripleTxn on triples {
    blockNumber
    blockTimestamp
    transactionHash
    creatorId
  }
`;

export const TRIPLE_VAULT_DETAILS_FRAGMENT = gql`
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
  ${VAULT_DETAILS_FRAGMENT}
`;
