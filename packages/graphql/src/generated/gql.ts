/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

import * as types from './graphql'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
  'fragment AccountMetadata on accounts {\n  label\n  image\n  id\n  atomId\n  type\n}':
    types.AccountMetadataFragmentDoc,
  'fragment AtomMetadata on atoms {\n  data\n  id\n  image\n  label\n  emoji\n  type\n}\n\nfragment AtomTxn on atoms {\n  blockNumber\n  blockTimestamp\n  transactionHash\n  creatorId\n}\n\nfragment AtomVaultDetails on atoms {\n  vaultId\n  walletId\n  vault {\n    positionCount\n    totalShares\n    currentSharePrice\n  }\n}':
    types.AtomMetadataFragmentDoc,
  'fragment Event on events {\n  type\n  atomId\n  blockNumber\n  blockTimestamp\n  depositId\n  feeTransferId\n  id\n  redemptionId\n  transactionHash\n  tripleId\n}':
    types.EventFragmentDoc,
  'fragment PositionDetails on positions {\n  id\n  accountId\n  shares\n  vaultId\n}':
    types.PositionDetailsFragmentDoc,
  'fragment TripleMetadata on triples {\n  id\n  label\n  subject {\n    ...AtomMetadata\n    creator {\n      ...AccountMetadata\n    }\n  }\n  predicate {\n    ...AtomMetadata\n    creator {\n      ...AccountMetadata\n    }\n  }\n  object {\n    ...AtomMetadata\n    creator {\n      ...AccountMetadata\n    }\n  }\n}\n\nfragment TripleTxn on triples {\n  blockNumber\n  blockTimestamp\n  transactionHash\n  creatorId\n}\n\nfragment TripleVaultDetails on triples {\n  vaultId\n  counterVaultId\n  vault {\n    ...VaultDetails\n  }\n  counterVault {\n    ...VaultDetails\n  }\n}':
    types.TripleMetadataFragmentDoc,
  'fragment VaultDetails on vaults {\n  atomId\n  currentSharePrice\n  id\n  positionCount\n  totalShares\n  tripleId\n}':
    types.VaultDetailsFragmentDoc,
  'query GetAtoms {\n  atoms {\n    ...AtomMetadata\n    ...AtomTxn\n    ...AtomVaultDetails\n    creator {\n      ...AccountMetadata\n    }\n  }\n}':
    types.GetAtomsDocument,
}

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment AccountMetadata on accounts {\n  label\n  image\n  id\n  atomId\n  type\n}',
): (typeof documents)['fragment AccountMetadata on accounts {\n  label\n  image\n  id\n  atomId\n  type\n}']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment AtomMetadata on atoms {\n  data\n  id\n  image\n  label\n  emoji\n  type\n}\n\nfragment AtomTxn on atoms {\n  blockNumber\n  blockTimestamp\n  transactionHash\n  creatorId\n}\n\nfragment AtomVaultDetails on atoms {\n  vaultId\n  walletId\n  vault {\n    positionCount\n    totalShares\n    currentSharePrice\n  }\n}',
): (typeof documents)['fragment AtomMetadata on atoms {\n  data\n  id\n  image\n  label\n  emoji\n  type\n}\n\nfragment AtomTxn on atoms {\n  blockNumber\n  blockTimestamp\n  transactionHash\n  creatorId\n}\n\nfragment AtomVaultDetails on atoms {\n  vaultId\n  walletId\n  vault {\n    positionCount\n    totalShares\n    currentSharePrice\n  }\n}']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment Event on events {\n  type\n  atomId\n  blockNumber\n  blockTimestamp\n  depositId\n  feeTransferId\n  id\n  redemptionId\n  transactionHash\n  tripleId\n}',
): (typeof documents)['fragment Event on events {\n  type\n  atomId\n  blockNumber\n  blockTimestamp\n  depositId\n  feeTransferId\n  id\n  redemptionId\n  transactionHash\n  tripleId\n}']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment PositionDetails on positions {\n  id\n  accountId\n  shares\n  vaultId\n}',
): (typeof documents)['fragment PositionDetails on positions {\n  id\n  accountId\n  shares\n  vaultId\n}']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment TripleMetadata on triples {\n  id\n  label\n  subject {\n    ...AtomMetadata\n    creator {\n      ...AccountMetadata\n    }\n  }\n  predicate {\n    ...AtomMetadata\n    creator {\n      ...AccountMetadata\n    }\n  }\n  object {\n    ...AtomMetadata\n    creator {\n      ...AccountMetadata\n    }\n  }\n}\n\nfragment TripleTxn on triples {\n  blockNumber\n  blockTimestamp\n  transactionHash\n  creatorId\n}\n\nfragment TripleVaultDetails on triples {\n  vaultId\n  counterVaultId\n  vault {\n    ...VaultDetails\n  }\n  counterVault {\n    ...VaultDetails\n  }\n}',
): (typeof documents)['fragment TripleMetadata on triples {\n  id\n  label\n  subject {\n    ...AtomMetadata\n    creator {\n      ...AccountMetadata\n    }\n  }\n  predicate {\n    ...AtomMetadata\n    creator {\n      ...AccountMetadata\n    }\n  }\n  object {\n    ...AtomMetadata\n    creator {\n      ...AccountMetadata\n    }\n  }\n}\n\nfragment TripleTxn on triples {\n  blockNumber\n  blockTimestamp\n  transactionHash\n  creatorId\n}\n\nfragment TripleVaultDetails on triples {\n  vaultId\n  counterVaultId\n  vault {\n    ...VaultDetails\n  }\n  counterVault {\n    ...VaultDetails\n  }\n}']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment VaultDetails on vaults {\n  atomId\n  currentSharePrice\n  id\n  positionCount\n  totalShares\n  tripleId\n}',
): (typeof documents)['fragment VaultDetails on vaults {\n  atomId\n  currentSharePrice\n  id\n  positionCount\n  totalShares\n  tripleId\n}']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query GetAtoms {\n  atoms {\n    ...AtomMetadata\n    ...AtomTxn\n    ...AtomVaultDetails\n    creator {\n      ...AccountMetadata\n    }\n  }\n}',
): (typeof documents)['query GetAtoms {\n  atoms {\n    ...AtomMetadata\n    ...AtomTxn\n    ...AtomVaultDetails\n    creator {\n      ...AccountMetadata\n    }\n  }\n}']

export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
