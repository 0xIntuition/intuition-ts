/* eslint-disable */
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
  '\n  fragment AccountMetadata on accounts {\n    label\n    image\n    id\n    atomId\n    type\n  }\n':
    types.AccountMetadataFragmentDoc,
  '\n  fragment AtomMetadata on atoms {\n    data\n    id\n    image\n    label\n    emoji\n    type\n  }\n':
    types.AtomMetadataFragmentDoc,
  '\n  fragment AtomTxn on atoms {\n    blockNumber\n    blockTimestamp\n    transactionHash\n    creatorId\n  }\n':
    types.AtomTxnFragmentDoc,
  '\n  fragment AtomVaultDetails on atoms {\n    vaultId\n    walletId\n    vault {\n      positionCount\n      totalShares\n      currentSharePrice\n    }\n  }\n':
    types.AtomVaultDetailsFragmentDoc,
  '\n  fragment Event on events {\n    type\n    atomId\n    blockNumber\n    blockTimestamp\n    depositId\n    feeTransferId\n    id\n    redemptionId\n    transactionHash\n    tripleId\n  }\n':
    types.EventFragmentDoc,
  '\n  fragment PositionDetails on positions {\n    id\n    accountId\n    shares\n    vaultId\n  }\n':
    types.PositionDetailsFragmentDoc,
  '\n  fragment TripleMetadata on triples {\n    id\n    label\n    subject {\n      ...AtomMetadata\n      creator {\n        ...AccountMetadata\n      }\n    }\n    predicate {\n      ...AtomMetadata\n      creator {\n        ...AccountMetadata\n      }\n    }\n    object {\n      ...AtomMetadata\n      creator {\n        ...AccountMetadata\n      }\n    }\n  }\n':
    types.TripleMetadataFragmentDoc,
  '\n  fragment TripleTxn on triples {\n    blockNumber\n    blockTimestamp\n    transactionHash\n    creatorId\n  }\n':
    types.TripleTxnFragmentDoc,
  '\n  fragment TripleVaultDetails on triples {\n    vaultId\n    counterVaultId\n    vault {\n      ...VaultDetails\n    }\n    counterVault {\n      ...VaultDetails\n    }\n  }\n':
    types.TripleVaultDetailsFragmentDoc,
  '\n  fragment VaultDetails on vaults {\n    atomId\n    currentSharePrice\n    id\n    positionCount\n    totalShares\n    tripleId\n  }\n':
    types.VaultDetailsFragmentDoc,
  '\n  query GetAtoms($limit: Int, $offset: Int, $orderBy: [atoms_order_by!], $where: atoms_bool_exp) {\n    atoms(limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {\n      ...AtomMetadata\n      ...AtomTxn\n      ...AtomVaultDetails\n      creator {\n        ...AccountMetadata\n      }\n    }\n  }\n':
    types.GetAtomsDocument,
  '\n  query GetTriple($tripleId: numeric!) {\n    triple(id: $tripleId) {\n      ...TripleMetadata\n      ...TripleTxn\n      ...TripleVaultDetails\n      creator {\n        ...AccountMetadata\n      }\n    }\n  }\n':
    types.GetTripleDocument,
  '\n  query GetTriples($limit: Int, $offset: Int, $orderBy: [triples_order_by!], $where: triples_bool_exp) {\n    triples(limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {\n      ...TripleMetadata\n      ...TripleTxn\n      ...TripleVaultDetails\n      creator {\n        ...AccountMetadata\n      }\n    }\n  }\n':
    types.GetTriplesDocument,
}

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment AccountMetadata on accounts {\n    label\n    image\n    id\n    atomId\n    type\n  }\n',
): typeof import('./graphql').AccountMetadataFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment AtomMetadata on atoms {\n    data\n    id\n    image\n    label\n    emoji\n    type\n  }\n',
): typeof import('./graphql').AtomMetadataFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment AtomTxn on atoms {\n    blockNumber\n    blockTimestamp\n    transactionHash\n    creatorId\n  }\n',
): typeof import('./graphql').AtomTxnFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment AtomVaultDetails on atoms {\n    vaultId\n    walletId\n    vault {\n      positionCount\n      totalShares\n      currentSharePrice\n    }\n  }\n',
): typeof import('./graphql').AtomVaultDetailsFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment Event on events {\n    type\n    atomId\n    blockNumber\n    blockTimestamp\n    depositId\n    feeTransferId\n    id\n    redemptionId\n    transactionHash\n    tripleId\n  }\n',
): typeof import('./graphql').EventFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment PositionDetails on positions {\n    id\n    accountId\n    shares\n    vaultId\n  }\n',
): typeof import('./graphql').PositionDetailsFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment TripleMetadata on triples {\n    id\n    label\n    subject {\n      ...AtomMetadata\n      creator {\n        ...AccountMetadata\n      }\n    }\n    predicate {\n      ...AtomMetadata\n      creator {\n        ...AccountMetadata\n      }\n    }\n    object {\n      ...AtomMetadata\n      creator {\n        ...AccountMetadata\n      }\n    }\n  }\n',
): typeof import('./graphql').TripleMetadataFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment TripleTxn on triples {\n    blockNumber\n    blockTimestamp\n    transactionHash\n    creatorId\n  }\n',
): typeof import('./graphql').TripleTxnFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment TripleVaultDetails on triples {\n    vaultId\n    counterVaultId\n    vault {\n      ...VaultDetails\n    }\n    counterVault {\n      ...VaultDetails\n    }\n  }\n',
): typeof import('./graphql').TripleVaultDetailsFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment VaultDetails on vaults {\n    atomId\n    currentSharePrice\n    id\n    positionCount\n    totalShares\n    tripleId\n  }\n',
): typeof import('./graphql').VaultDetailsFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetAtoms($limit: Int, $offset: Int, $orderBy: [atoms_order_by!], $where: atoms_bool_exp) {\n    atoms(limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {\n      ...AtomMetadata\n      ...AtomTxn\n      ...AtomVaultDetails\n      creator {\n        ...AccountMetadata\n      }\n    }\n  }\n',
): typeof import('./graphql').GetAtomsDocument
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetTriple($tripleId: numeric!) {\n    triple(id: $tripleId) {\n      ...TripleMetadata\n      ...TripleTxn\n      ...TripleVaultDetails\n      creator {\n        ...AccountMetadata\n      }\n    }\n  }\n',
): typeof import('./graphql').GetTripleDocument
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetTriples($limit: Int, $offset: Int, $orderBy: [triples_order_by!], $where: triples_bool_exp) {\n    triples(limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {\n      ...TripleMetadata\n      ...TripleTxn\n      ...TripleVaultDetails\n      creator {\n        ...AccountMetadata\n      }\n    }\n  }\n',
): typeof import('./graphql').GetTriplesDocument

export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}
