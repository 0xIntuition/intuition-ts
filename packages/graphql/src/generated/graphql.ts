/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core'

export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  bytea: { input: any; output: any }
  float8: { input: any; output: any }
  numeric: { input: any; output: any }
}

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']['input']>
  _gt?: InputMaybe<Scalars['Int']['input']>
  _gte?: InputMaybe<Scalars['Int']['input']>
  _in?: InputMaybe<Array<Scalars['Int']['input']>>
  _is_null?: InputMaybe<Scalars['Boolean']['input']>
  _lt?: InputMaybe<Scalars['Int']['input']>
  _lte?: InputMaybe<Scalars['Int']['input']>
  _neq?: InputMaybe<Scalars['Int']['input']>
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>
}

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>
  _gt?: InputMaybe<Scalars['String']['input']>
  _gte?: InputMaybe<Scalars['String']['input']>
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>
  _in?: InputMaybe<Array<Scalars['String']['input']>>
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>
  _is_null?: InputMaybe<Scalars['Boolean']['input']>
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>
  _lt?: InputMaybe<Scalars['String']['input']>
  _lte?: InputMaybe<Scalars['String']['input']>
  _neq?: InputMaybe<Scalars['String']['input']>
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>
  _nin?: InputMaybe<Array<Scalars['String']['input']>>
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>
}

/** Boolean expression to filter rows from the table "Account". All fields are combined with a logical 'AND'. */
export type Accounts_Bool_Exp = {
  _and?: InputMaybe<Array<Accounts_Bool_Exp>>
  _not?: InputMaybe<Accounts_Bool_Exp>
  _or?: InputMaybe<Array<Accounts_Bool_Exp>>
  atom?: InputMaybe<Atoms_Bool_Exp>
  atomId?: InputMaybe<Numeric_Comparison_Exp>
  claims?: InputMaybe<Claims_Bool_Exp>
  createdAtoms?: InputMaybe<Atoms_Bool_Exp>
  createdTriples?: InputMaybe<Triples_Bool_Exp>
  deposits?: InputMaybe<Deposits_Bool_Exp>
  feeTransfers?: InputMaybe<FeeTranfers_Bool_Exp>
  id?: InputMaybe<String_Comparison_Exp>
  image?: InputMaybe<String_Comparison_Exp>
  label?: InputMaybe<String_Comparison_Exp>
  positions?: InputMaybe<Positions_Bool_Exp>
  redemptions?: InputMaybe<Redemptions_Bool_Exp>
  signals?: InputMaybe<Signals_Bool_Exp>
  type?: InputMaybe<String_Comparison_Exp>
}

/** Ordering options when selecting data from "Account". */
export type Accounts_Order_By = {
  atom?: InputMaybe<Atoms_Order_By>
  atomId?: InputMaybe<Order_By>
  claims_aggregate?: InputMaybe<Claims_Aggregate_Order_By>
  createdAtoms_aggregate?: InputMaybe<Atoms_Aggregate_Order_By>
  createdTriples_aggregate?: InputMaybe<Triples_Aggregate_Order_By>
  deposits_aggregate?: InputMaybe<Deposits_Aggregate_Order_By>
  feeTransfers_aggregate?: InputMaybe<FeeTranfers_Aggregate_Order_By>
  id?: InputMaybe<Order_By>
  image?: InputMaybe<Order_By>
  label?: InputMaybe<Order_By>
  positions_aggregate?: InputMaybe<Positions_Aggregate_Order_By>
  redemptions_aggregate?: InputMaybe<Redemptions_Aggregate_Order_By>
  signals_aggregate?: InputMaybe<Signals_Aggregate_Order_By>
  type?: InputMaybe<Order_By>
}

/** select columns of table "Account" */
export enum Accounts_Select_Column {
  /** column name */
  AtomId = 'atomId',
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  Label = 'label',
  /** column name */
  Type = 'type',
}

export type Accounts_That_Claim_About_Account_Args = {
  address?: InputMaybe<Scalars['String']['input']>
  predicate?: InputMaybe<Scalars['numeric']['input']>
  subject?: InputMaybe<Scalars['numeric']['input']>
}

/** Boolean expression to filter rows from the table "AtomValue". All fields are combined with a logical 'AND'. */
export type AtomValues_Bool_Exp = {
  _and?: InputMaybe<Array<AtomValues_Bool_Exp>>
  _not?: InputMaybe<AtomValues_Bool_Exp>
  _or?: InputMaybe<Array<AtomValues_Bool_Exp>>
  account?: InputMaybe<Accounts_Bool_Exp>
  accountId?: InputMaybe<String_Comparison_Exp>
  atom?: InputMaybe<Atoms_Bool_Exp>
  atomId?: InputMaybe<Numeric_Comparison_Exp>
  book?: InputMaybe<Books_Bool_Exp>
  bookId?: InputMaybe<Numeric_Comparison_Exp>
  id?: InputMaybe<Numeric_Comparison_Exp>
  organization?: InputMaybe<Organizations_Bool_Exp>
  organizationId?: InputMaybe<Numeric_Comparison_Exp>
  person?: InputMaybe<Persons_Bool_Exp>
  personId?: InputMaybe<Numeric_Comparison_Exp>
  thing?: InputMaybe<Things_Bool_Exp>
  thingId?: InputMaybe<Numeric_Comparison_Exp>
}

/** Ordering options when selecting data from "AtomValue". */
export type AtomValues_Order_By = {
  account?: InputMaybe<Accounts_Order_By>
  accountId?: InputMaybe<Order_By>
  atom?: InputMaybe<Atoms_Order_By>
  atomId?: InputMaybe<Order_By>
  book?: InputMaybe<Books_Order_By>
  bookId?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  organization?: InputMaybe<Organizations_Order_By>
  organizationId?: InputMaybe<Order_By>
  person?: InputMaybe<Persons_Order_By>
  personId?: InputMaybe<Order_By>
  thing?: InputMaybe<Things_Order_By>
  thingId?: InputMaybe<Order_By>
}

/** select columns of table "AtomValue" */
export enum AtomValues_Select_Column {
  /** column name */
  AccountId = 'accountId',
  /** column name */
  AtomId = 'atomId',
  /** column name */
  BookId = 'bookId',
  /** column name */
  Id = 'id',
  /** column name */
  OrganizationId = 'organizationId',
  /** column name */
  PersonId = 'personId',
  /** column name */
  ThingId = 'thingId',
}

/** order by aggregate values of table "Atom" */
export type Atoms_Aggregate_Order_By = {
  avg?: InputMaybe<Atoms_Avg_Order_By>
  count?: InputMaybe<Order_By>
  max?: InputMaybe<Atoms_Max_Order_By>
  min?: InputMaybe<Atoms_Min_Order_By>
  stddev?: InputMaybe<Atoms_Stddev_Order_By>
  stddev_pop?: InputMaybe<Atoms_Stddev_Pop_Order_By>
  stddev_samp?: InputMaybe<Atoms_Stddev_Samp_Order_By>
  sum?: InputMaybe<Atoms_Sum_Order_By>
  var_pop?: InputMaybe<Atoms_Var_Pop_Order_By>
  var_samp?: InputMaybe<Atoms_Var_Samp_Order_By>
  variance?: InputMaybe<Atoms_Variance_Order_By>
}

/** order by avg() on columns of table "Atom" */
export type Atoms_Avg_Order_By = {
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  valueId?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** Boolean expression to filter rows from the table "Atom". All fields are combined with a logical 'AND'. */
export type Atoms_Bool_Exp = {
  _and?: InputMaybe<Array<Atoms_Bool_Exp>>
  _not?: InputMaybe<Atoms_Bool_Exp>
  _or?: InputMaybe<Array<Atoms_Bool_Exp>>
  asObject?: InputMaybe<Triples_Bool_Exp>
  asPredicate?: InputMaybe<Triples_Bool_Exp>
  asSubject?: InputMaybe<Triples_Bool_Exp>
  blockNumber?: InputMaybe<Numeric_Comparison_Exp>
  blockTimestamp?: InputMaybe<Numeric_Comparison_Exp>
  creator?: InputMaybe<Accounts_Bool_Exp>
  creatorId?: InputMaybe<String_Comparison_Exp>
  data?: InputMaybe<String_Comparison_Exp>
  emoji?: InputMaybe<String_Comparison_Exp>
  id?: InputMaybe<Numeric_Comparison_Exp>
  image?: InputMaybe<String_Comparison_Exp>
  label?: InputMaybe<String_Comparison_Exp>
  transactionHash?: InputMaybe<Bytea_Comparison_Exp>
  type?: InputMaybe<String_Comparison_Exp>
  value?: InputMaybe<AtomValues_Bool_Exp>
  valueId?: InputMaybe<Numeric_Comparison_Exp>
  vault?: InputMaybe<Vaults_Bool_Exp>
  vaultId?: InputMaybe<Numeric_Comparison_Exp>
  walletId?: InputMaybe<String_Comparison_Exp>
}

/** order by max() on columns of table "Atom" */
export type Atoms_Max_Order_By = {
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  creatorId?: InputMaybe<Order_By>
  data?: InputMaybe<Order_By>
  emoji?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  image?: InputMaybe<Order_By>
  label?: InputMaybe<Order_By>
  type?: InputMaybe<Order_By>
  valueId?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
  walletId?: InputMaybe<Order_By>
}

/** order by min() on columns of table "Atom" */
export type Atoms_Min_Order_By = {
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  creatorId?: InputMaybe<Order_By>
  data?: InputMaybe<Order_By>
  emoji?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  image?: InputMaybe<Order_By>
  label?: InputMaybe<Order_By>
  type?: InputMaybe<Order_By>
  valueId?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
  walletId?: InputMaybe<Order_By>
}

/** Ordering options when selecting data from "Atom". */
export type Atoms_Order_By = {
  asObject_aggregate?: InputMaybe<Triples_Aggregate_Order_By>
  asPredicate_aggregate?: InputMaybe<Triples_Aggregate_Order_By>
  asSubject_aggregate?: InputMaybe<Triples_Aggregate_Order_By>
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  creator?: InputMaybe<Accounts_Order_By>
  creatorId?: InputMaybe<Order_By>
  data?: InputMaybe<Order_By>
  emoji?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  image?: InputMaybe<Order_By>
  label?: InputMaybe<Order_By>
  transactionHash?: InputMaybe<Order_By>
  type?: InputMaybe<Order_By>
  value?: InputMaybe<AtomValues_Order_By>
  valueId?: InputMaybe<Order_By>
  vault?: InputMaybe<Vaults_Order_By>
  vaultId?: InputMaybe<Order_By>
  walletId?: InputMaybe<Order_By>
}

/** select columns of table "Atom" */
export enum Atoms_Select_Column {
  /** column name */
  BlockNumber = 'blockNumber',
  /** column name */
  BlockTimestamp = 'blockTimestamp',
  /** column name */
  CreatorId = 'creatorId',
  /** column name */
  Data = 'data',
  /** column name */
  Emoji = 'emoji',
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  Label = 'label',
  /** column name */
  TransactionHash = 'transactionHash',
  /** column name */
  Type = 'type',
  /** column name */
  ValueId = 'valueId',
  /** column name */
  VaultId = 'vaultId',
  /** column name */
  WalletId = 'walletId',
}

/** order by stddev() on columns of table "Atom" */
export type Atoms_Stddev_Order_By = {
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  valueId?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** order by stddev_pop() on columns of table "Atom" */
export type Atoms_Stddev_Pop_Order_By = {
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  valueId?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** order by stddev_samp() on columns of table "Atom" */
export type Atoms_Stddev_Samp_Order_By = {
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  valueId?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** order by sum() on columns of table "Atom" */
export type Atoms_Sum_Order_By = {
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  valueId?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** order by var_pop() on columns of table "Atom" */
export type Atoms_Var_Pop_Order_By = {
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  valueId?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** order by var_samp() on columns of table "Atom" */
export type Atoms_Var_Samp_Order_By = {
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  valueId?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** order by variance() on columns of table "Atom" */
export type Atoms_Variance_Order_By = {
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  valueId?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** Boolean expression to filter rows from the table "Book". All fields are combined with a logical 'AND'. */
export type Books_Bool_Exp = {
  _and?: InputMaybe<Array<Books_Bool_Exp>>
  _not?: InputMaybe<Books_Bool_Exp>
  _or?: InputMaybe<Array<Books_Bool_Exp>>
  atom?: InputMaybe<Atoms_Bool_Exp>
  atomId?: InputMaybe<Numeric_Comparison_Exp>
  description?: InputMaybe<String_Comparison_Exp>
  genre?: InputMaybe<String_Comparison_Exp>
  id?: InputMaybe<Numeric_Comparison_Exp>
  name?: InputMaybe<String_Comparison_Exp>
  url?: InputMaybe<String_Comparison_Exp>
}

/** Ordering options when selecting data from "Book". */
export type Books_Order_By = {
  atom?: InputMaybe<Atoms_Order_By>
  atomId?: InputMaybe<Order_By>
  description?: InputMaybe<Order_By>
  genre?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  name?: InputMaybe<Order_By>
  url?: InputMaybe<Order_By>
}

/** select columns of table "Book" */
export enum Books_Select_Column {
  /** column name */
  AtomId = 'atomId',
  /** column name */
  Description = 'description',
  /** column name */
  Genre = 'genre',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Url = 'url',
}

/** Boolean expression to compare columns of type "bytea". All fields are combined with logical 'AND'. */
export type Bytea_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['bytea']['input']>
  _gt?: InputMaybe<Scalars['bytea']['input']>
  _gte?: InputMaybe<Scalars['bytea']['input']>
  _in?: InputMaybe<Array<Scalars['bytea']['input']>>
  _is_null?: InputMaybe<Scalars['Boolean']['input']>
  _lt?: InputMaybe<Scalars['bytea']['input']>
  _lte?: InputMaybe<Scalars['bytea']['input']>
  _neq?: InputMaybe<Scalars['bytea']['input']>
  _nin?: InputMaybe<Array<Scalars['bytea']['input']>>
}

/** Boolean expression to filter rows from the table "ChainlinkPrice". All fields are combined with a logical 'AND'. */
export type ChainLinkPrices_Bool_Exp = {
  _and?: InputMaybe<Array<ChainLinkPrices_Bool_Exp>>
  _not?: InputMaybe<ChainLinkPrices_Bool_Exp>
  _or?: InputMaybe<Array<ChainLinkPrices_Bool_Exp>>
  id?: InputMaybe<Numeric_Comparison_Exp>
  usd?: InputMaybe<Float8_Comparison_Exp>
}

/** Ordering options when selecting data from "ChainlinkPrice". */
export type ChainLinkPrices_Order_By = {
  id?: InputMaybe<Order_By>
  usd?: InputMaybe<Order_By>
}

/** select columns of table "ChainlinkPrice" */
export enum ChainLinkPrices_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Usd = 'usd',
}

/** order by aggregate values of table "Claim" */
export type Claims_Aggregate_Order_By = {
  avg?: InputMaybe<Claims_Avg_Order_By>
  count?: InputMaybe<Order_By>
  max?: InputMaybe<Claims_Max_Order_By>
  min?: InputMaybe<Claims_Min_Order_By>
  stddev?: InputMaybe<Claims_Stddev_Order_By>
  stddev_pop?: InputMaybe<Claims_Stddev_Pop_Order_By>
  stddev_samp?: InputMaybe<Claims_Stddev_Samp_Order_By>
  sum?: InputMaybe<Claims_Sum_Order_By>
  var_pop?: InputMaybe<Claims_Var_Pop_Order_By>
  var_samp?: InputMaybe<Claims_Var_Samp_Order_By>
  variance?: InputMaybe<Claims_Variance_Order_By>
}

/** order by avg() on columns of table "Claim" */
export type Claims_Avg_Order_By = {
  counterShares?: InputMaybe<Order_By>
  counterVaultId?: InputMaybe<Order_By>
  objectId?: InputMaybe<Order_By>
  predicateId?: InputMaybe<Order_By>
  shares?: InputMaybe<Order_By>
  subjectId?: InputMaybe<Order_By>
  tripleId?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** Boolean expression to filter rows from the table "Claim". All fields are combined with a logical 'AND'. */
export type Claims_Bool_Exp = {
  _and?: InputMaybe<Array<Claims_Bool_Exp>>
  _not?: InputMaybe<Claims_Bool_Exp>
  _or?: InputMaybe<Array<Claims_Bool_Exp>>
  account?: InputMaybe<Accounts_Bool_Exp>
  accountId?: InputMaybe<String_Comparison_Exp>
  counterShares?: InputMaybe<Numeric_Comparison_Exp>
  counterVault?: InputMaybe<Vaults_Bool_Exp>
  counterVaultId?: InputMaybe<Numeric_Comparison_Exp>
  id?: InputMaybe<String_Comparison_Exp>
  object?: InputMaybe<Atoms_Bool_Exp>
  objectId?: InputMaybe<Numeric_Comparison_Exp>
  predicate?: InputMaybe<Atoms_Bool_Exp>
  predicateId?: InputMaybe<Numeric_Comparison_Exp>
  shares?: InputMaybe<Numeric_Comparison_Exp>
  subject?: InputMaybe<Atoms_Bool_Exp>
  subjectId?: InputMaybe<Numeric_Comparison_Exp>
  triple?: InputMaybe<Triples_Bool_Exp>
  tripleId?: InputMaybe<Numeric_Comparison_Exp>
  vault?: InputMaybe<Vaults_Bool_Exp>
  vaultId?: InputMaybe<Numeric_Comparison_Exp>
}

export type Claims_From_Following_Args = {
  address?: InputMaybe<Scalars['String']['input']>
}

/** order by max() on columns of table "Claim" */
export type Claims_Max_Order_By = {
  accountId?: InputMaybe<Order_By>
  counterShares?: InputMaybe<Order_By>
  counterVaultId?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  objectId?: InputMaybe<Order_By>
  predicateId?: InputMaybe<Order_By>
  shares?: InputMaybe<Order_By>
  subjectId?: InputMaybe<Order_By>
  tripleId?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** order by min() on columns of table "Claim" */
export type Claims_Min_Order_By = {
  accountId?: InputMaybe<Order_By>
  counterShares?: InputMaybe<Order_By>
  counterVaultId?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  objectId?: InputMaybe<Order_By>
  predicateId?: InputMaybe<Order_By>
  shares?: InputMaybe<Order_By>
  subjectId?: InputMaybe<Order_By>
  tripleId?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** Ordering options when selecting data from "Claim". */
export type Claims_Order_By = {
  account?: InputMaybe<Accounts_Order_By>
  accountId?: InputMaybe<Order_By>
  counterShares?: InputMaybe<Order_By>
  counterVault?: InputMaybe<Vaults_Order_By>
  counterVaultId?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  object?: InputMaybe<Atoms_Order_By>
  objectId?: InputMaybe<Order_By>
  predicate?: InputMaybe<Atoms_Order_By>
  predicateId?: InputMaybe<Order_By>
  shares?: InputMaybe<Order_By>
  subject?: InputMaybe<Atoms_Order_By>
  subjectId?: InputMaybe<Order_By>
  triple?: InputMaybe<Triples_Order_By>
  tripleId?: InputMaybe<Order_By>
  vault?: InputMaybe<Vaults_Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** select columns of table "Claim" */
export enum Claims_Select_Column {
  /** column name */
  AccountId = 'accountId',
  /** column name */
  CounterShares = 'counterShares',
  /** column name */
  CounterVaultId = 'counterVaultId',
  /** column name */
  Id = 'id',
  /** column name */
  ObjectId = 'objectId',
  /** column name */
  PredicateId = 'predicateId',
  /** column name */
  Shares = 'shares',
  /** column name */
  SubjectId = 'subjectId',
  /** column name */
  TripleId = 'tripleId',
  /** column name */
  VaultId = 'vaultId',
}

/** order by stddev() on columns of table "Claim" */
export type Claims_Stddev_Order_By = {
  counterShares?: InputMaybe<Order_By>
  counterVaultId?: InputMaybe<Order_By>
  objectId?: InputMaybe<Order_By>
  predicateId?: InputMaybe<Order_By>
  shares?: InputMaybe<Order_By>
  subjectId?: InputMaybe<Order_By>
  tripleId?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** order by stddev_pop() on columns of table "Claim" */
export type Claims_Stddev_Pop_Order_By = {
  counterShares?: InputMaybe<Order_By>
  counterVaultId?: InputMaybe<Order_By>
  objectId?: InputMaybe<Order_By>
  predicateId?: InputMaybe<Order_By>
  shares?: InputMaybe<Order_By>
  subjectId?: InputMaybe<Order_By>
  tripleId?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** order by stddev_samp() on columns of table "Claim" */
export type Claims_Stddev_Samp_Order_By = {
  counterShares?: InputMaybe<Order_By>
  counterVaultId?: InputMaybe<Order_By>
  objectId?: InputMaybe<Order_By>
  predicateId?: InputMaybe<Order_By>
  shares?: InputMaybe<Order_By>
  subjectId?: InputMaybe<Order_By>
  tripleId?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** order by sum() on columns of table "Claim" */
export type Claims_Sum_Order_By = {
  counterShares?: InputMaybe<Order_By>
  counterVaultId?: InputMaybe<Order_By>
  objectId?: InputMaybe<Order_By>
  predicateId?: InputMaybe<Order_By>
  shares?: InputMaybe<Order_By>
  subjectId?: InputMaybe<Order_By>
  tripleId?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** order by var_pop() on columns of table "Claim" */
export type Claims_Var_Pop_Order_By = {
  counterShares?: InputMaybe<Order_By>
  counterVaultId?: InputMaybe<Order_By>
  objectId?: InputMaybe<Order_By>
  predicateId?: InputMaybe<Order_By>
  shares?: InputMaybe<Order_By>
  subjectId?: InputMaybe<Order_By>
  tripleId?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** order by var_samp() on columns of table "Claim" */
export type Claims_Var_Samp_Order_By = {
  counterShares?: InputMaybe<Order_By>
  counterVaultId?: InputMaybe<Order_By>
  objectId?: InputMaybe<Order_By>
  predicateId?: InputMaybe<Order_By>
  shares?: InputMaybe<Order_By>
  subjectId?: InputMaybe<Order_By>
  tripleId?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** order by variance() on columns of table "Claim" */
export type Claims_Variance_Order_By = {
  counterShares?: InputMaybe<Order_By>
  counterVaultId?: InputMaybe<Order_By>
  objectId?: InputMaybe<Order_By>
  predicateId?: InputMaybe<Order_By>
  shares?: InputMaybe<Order_By>
  subjectId?: InputMaybe<Order_By>
  tripleId?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** order by aggregate values of table "Deposit" */
export type Deposits_Aggregate_Order_By = {
  avg?: InputMaybe<Deposits_Avg_Order_By>
  count?: InputMaybe<Order_By>
  max?: InputMaybe<Deposits_Max_Order_By>
  min?: InputMaybe<Deposits_Min_Order_By>
  stddev?: InputMaybe<Deposits_Stddev_Order_By>
  stddev_pop?: InputMaybe<Deposits_Stddev_Pop_Order_By>
  stddev_samp?: InputMaybe<Deposits_Stddev_Samp_Order_By>
  sum?: InputMaybe<Deposits_Sum_Order_By>
  var_pop?: InputMaybe<Deposits_Var_Pop_Order_By>
  var_samp?: InputMaybe<Deposits_Var_Samp_Order_By>
  variance?: InputMaybe<Deposits_Variance_Order_By>
}

/** order by avg() on columns of table "Deposit" */
export type Deposits_Avg_Order_By = {
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  entryFee?: InputMaybe<Order_By>
  isAtomWallet?: InputMaybe<Order_By>
  isTriple?: InputMaybe<Order_By>
  receiverTotalSharesInVault?: InputMaybe<Order_By>
  senderAssetsAfterTotalFees?: InputMaybe<Order_By>
  sharesForReceiver?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** Boolean expression to filter rows from the table "Deposit". All fields are combined with a logical 'AND'. */
export type Deposits_Bool_Exp = {
  _and?: InputMaybe<Array<Deposits_Bool_Exp>>
  _not?: InputMaybe<Deposits_Bool_Exp>
  _or?: InputMaybe<Array<Deposits_Bool_Exp>>
  blockNumber?: InputMaybe<Numeric_Comparison_Exp>
  blockTimestamp?: InputMaybe<Numeric_Comparison_Exp>
  entryFee?: InputMaybe<Numeric_Comparison_Exp>
  id?: InputMaybe<String_Comparison_Exp>
  isAtomWallet?: InputMaybe<Int_Comparison_Exp>
  isTriple?: InputMaybe<Int_Comparison_Exp>
  receiver?: InputMaybe<Accounts_Bool_Exp>
  receiverId?: InputMaybe<String_Comparison_Exp>
  receiverTotalSharesInVault?: InputMaybe<Numeric_Comparison_Exp>
  sender?: InputMaybe<Accounts_Bool_Exp>
  senderAssetsAfterTotalFees?: InputMaybe<Numeric_Comparison_Exp>
  senderId?: InputMaybe<String_Comparison_Exp>
  sharesForReceiver?: InputMaybe<Numeric_Comparison_Exp>
  transactionHash?: InputMaybe<Bytea_Comparison_Exp>
  vault?: InputMaybe<Vaults_Bool_Exp>
  vaultId?: InputMaybe<Numeric_Comparison_Exp>
}

/** order by max() on columns of table "Deposit" */
export type Deposits_Max_Order_By = {
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  entryFee?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  isAtomWallet?: InputMaybe<Order_By>
  isTriple?: InputMaybe<Order_By>
  receiverId?: InputMaybe<Order_By>
  receiverTotalSharesInVault?: InputMaybe<Order_By>
  senderAssetsAfterTotalFees?: InputMaybe<Order_By>
  senderId?: InputMaybe<Order_By>
  sharesForReceiver?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** order by min() on columns of table "Deposit" */
export type Deposits_Min_Order_By = {
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  entryFee?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  isAtomWallet?: InputMaybe<Order_By>
  isTriple?: InputMaybe<Order_By>
  receiverId?: InputMaybe<Order_By>
  receiverTotalSharesInVault?: InputMaybe<Order_By>
  senderAssetsAfterTotalFees?: InputMaybe<Order_By>
  senderId?: InputMaybe<Order_By>
  sharesForReceiver?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** Ordering options when selecting data from "Deposit". */
export type Deposits_Order_By = {
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  entryFee?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  isAtomWallet?: InputMaybe<Order_By>
  isTriple?: InputMaybe<Order_By>
  receiver?: InputMaybe<Accounts_Order_By>
  receiverId?: InputMaybe<Order_By>
  receiverTotalSharesInVault?: InputMaybe<Order_By>
  sender?: InputMaybe<Accounts_Order_By>
  senderAssetsAfterTotalFees?: InputMaybe<Order_By>
  senderId?: InputMaybe<Order_By>
  sharesForReceiver?: InputMaybe<Order_By>
  transactionHash?: InputMaybe<Order_By>
  vault?: InputMaybe<Vaults_Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** select columns of table "Deposit" */
export enum Deposits_Select_Column {
  /** column name */
  BlockNumber = 'blockNumber',
  /** column name */
  BlockTimestamp = 'blockTimestamp',
  /** column name */
  EntryFee = 'entryFee',
  /** column name */
  Id = 'id',
  /** column name */
  IsAtomWallet = 'isAtomWallet',
  /** column name */
  IsTriple = 'isTriple',
  /** column name */
  ReceiverId = 'receiverId',
  /** column name */
  ReceiverTotalSharesInVault = 'receiverTotalSharesInVault',
  /** column name */
  SenderAssetsAfterTotalFees = 'senderAssetsAfterTotalFees',
  /** column name */
  SenderId = 'senderId',
  /** column name */
  SharesForReceiver = 'sharesForReceiver',
  /** column name */
  TransactionHash = 'transactionHash',
  /** column name */
  VaultId = 'vaultId',
}

/** order by stddev() on columns of table "Deposit" */
export type Deposits_Stddev_Order_By = {
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  entryFee?: InputMaybe<Order_By>
  isAtomWallet?: InputMaybe<Order_By>
  isTriple?: InputMaybe<Order_By>
  receiverTotalSharesInVault?: InputMaybe<Order_By>
  senderAssetsAfterTotalFees?: InputMaybe<Order_By>
  sharesForReceiver?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** order by stddev_pop() on columns of table "Deposit" */
export type Deposits_Stddev_Pop_Order_By = {
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  entryFee?: InputMaybe<Order_By>
  isAtomWallet?: InputMaybe<Order_By>
  isTriple?: InputMaybe<Order_By>
  receiverTotalSharesInVault?: InputMaybe<Order_By>
  senderAssetsAfterTotalFees?: InputMaybe<Order_By>
  sharesForReceiver?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** order by stddev_samp() on columns of table "Deposit" */
export type Deposits_Stddev_Samp_Order_By = {
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  entryFee?: InputMaybe<Order_By>
  isAtomWallet?: InputMaybe<Order_By>
  isTriple?: InputMaybe<Order_By>
  receiverTotalSharesInVault?: InputMaybe<Order_By>
  senderAssetsAfterTotalFees?: InputMaybe<Order_By>
  sharesForReceiver?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** order by sum() on columns of table "Deposit" */
export type Deposits_Sum_Order_By = {
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  entryFee?: InputMaybe<Order_By>
  isAtomWallet?: InputMaybe<Order_By>
  isTriple?: InputMaybe<Order_By>
  receiverTotalSharesInVault?: InputMaybe<Order_By>
  senderAssetsAfterTotalFees?: InputMaybe<Order_By>
  sharesForReceiver?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** order by var_pop() on columns of table "Deposit" */
export type Deposits_Var_Pop_Order_By = {
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  entryFee?: InputMaybe<Order_By>
  isAtomWallet?: InputMaybe<Order_By>
  isTriple?: InputMaybe<Order_By>
  receiverTotalSharesInVault?: InputMaybe<Order_By>
  senderAssetsAfterTotalFees?: InputMaybe<Order_By>
  sharesForReceiver?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** order by var_samp() on columns of table "Deposit" */
export type Deposits_Var_Samp_Order_By = {
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  entryFee?: InputMaybe<Order_By>
  isAtomWallet?: InputMaybe<Order_By>
  isTriple?: InputMaybe<Order_By>
  receiverTotalSharesInVault?: InputMaybe<Order_By>
  senderAssetsAfterTotalFees?: InputMaybe<Order_By>
  sharesForReceiver?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** order by variance() on columns of table "Deposit" */
export type Deposits_Variance_Order_By = {
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  entryFee?: InputMaybe<Order_By>
  isAtomWallet?: InputMaybe<Order_By>
  isTriple?: InputMaybe<Order_By>
  receiverTotalSharesInVault?: InputMaybe<Order_By>
  senderAssetsAfterTotalFees?: InputMaybe<Order_By>
  sharesForReceiver?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** Boolean expression to filter rows from the table "Event". All fields are combined with a logical 'AND'. */
export type Events_Bool_Exp = {
  _and?: InputMaybe<Array<Events_Bool_Exp>>
  _not?: InputMaybe<Events_Bool_Exp>
  _or?: InputMaybe<Array<Events_Bool_Exp>>
  atom?: InputMaybe<Atoms_Bool_Exp>
  atomId?: InputMaybe<Numeric_Comparison_Exp>
  blockNumber?: InputMaybe<Numeric_Comparison_Exp>
  blockTimestamp?: InputMaybe<Numeric_Comparison_Exp>
  deposit?: InputMaybe<Deposits_Bool_Exp>
  depositId?: InputMaybe<String_Comparison_Exp>
  feeTransfer?: InputMaybe<FeeTranfers_Bool_Exp>
  feeTransferId?: InputMaybe<String_Comparison_Exp>
  id?: InputMaybe<String_Comparison_Exp>
  redemption?: InputMaybe<Redemptions_Bool_Exp>
  redemptionId?: InputMaybe<String_Comparison_Exp>
  transactionHash?: InputMaybe<Bytea_Comparison_Exp>
  triple?: InputMaybe<Triples_Bool_Exp>
  tripleId?: InputMaybe<Numeric_Comparison_Exp>
  type?: InputMaybe<String_Comparison_Exp>
}

/** Ordering options when selecting data from "Event". */
export type Events_Order_By = {
  atom?: InputMaybe<Atoms_Order_By>
  atomId?: InputMaybe<Order_By>
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  deposit?: InputMaybe<Deposits_Order_By>
  depositId?: InputMaybe<Order_By>
  feeTransfer?: InputMaybe<FeeTranfers_Order_By>
  feeTransferId?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  redemption?: InputMaybe<Redemptions_Order_By>
  redemptionId?: InputMaybe<Order_By>
  transactionHash?: InputMaybe<Order_By>
  triple?: InputMaybe<Triples_Order_By>
  tripleId?: InputMaybe<Order_By>
  type?: InputMaybe<Order_By>
}

/** select columns of table "Event" */
export enum Events_Select_Column {
  /** column name */
  AtomId = 'atomId',
  /** column name */
  BlockNumber = 'blockNumber',
  /** column name */
  BlockTimestamp = 'blockTimestamp',
  /** column name */
  DepositId = 'depositId',
  /** column name */
  FeeTransferId = 'feeTransferId',
  /** column name */
  Id = 'id',
  /** column name */
  RedemptionId = 'redemptionId',
  /** column name */
  TransactionHash = 'transactionHash',
  /** column name */
  TripleId = 'tripleId',
  /** column name */
  Type = 'type',
}

/** order by aggregate values of table "FeeTransfer" */
export type FeeTranfers_Aggregate_Order_By = {
  avg?: InputMaybe<FeeTranfers_Avg_Order_By>
  count?: InputMaybe<Order_By>
  max?: InputMaybe<FeeTranfers_Max_Order_By>
  min?: InputMaybe<FeeTranfers_Min_Order_By>
  stddev?: InputMaybe<FeeTranfers_Stddev_Order_By>
  stddev_pop?: InputMaybe<FeeTranfers_Stddev_Pop_Order_By>
  stddev_samp?: InputMaybe<FeeTranfers_Stddev_Samp_Order_By>
  sum?: InputMaybe<FeeTranfers_Sum_Order_By>
  var_pop?: InputMaybe<FeeTranfers_Var_Pop_Order_By>
  var_samp?: InputMaybe<FeeTranfers_Var_Samp_Order_By>
  variance?: InputMaybe<FeeTranfers_Variance_Order_By>
}

/** order by avg() on columns of table "FeeTransfer" */
export type FeeTranfers_Avg_Order_By = {
  amount?: InputMaybe<Order_By>
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
}

/** Boolean expression to filter rows from the table "FeeTransfer". All fields are combined with a logical 'AND'. */
export type FeeTranfers_Bool_Exp = {
  _and?: InputMaybe<Array<FeeTranfers_Bool_Exp>>
  _not?: InputMaybe<FeeTranfers_Bool_Exp>
  _or?: InputMaybe<Array<FeeTranfers_Bool_Exp>>
  amount?: InputMaybe<Numeric_Comparison_Exp>
  blockNumber?: InputMaybe<Numeric_Comparison_Exp>
  blockTimestamp?: InputMaybe<Numeric_Comparison_Exp>
  id?: InputMaybe<String_Comparison_Exp>
  receiver?: InputMaybe<Accounts_Bool_Exp>
  receiverId?: InputMaybe<String_Comparison_Exp>
  sender?: InputMaybe<Accounts_Bool_Exp>
  senderId?: InputMaybe<String_Comparison_Exp>
  transactionHash?: InputMaybe<Bytea_Comparison_Exp>
}

/** order by max() on columns of table "FeeTransfer" */
export type FeeTranfers_Max_Order_By = {
  amount?: InputMaybe<Order_By>
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  receiverId?: InputMaybe<Order_By>
  senderId?: InputMaybe<Order_By>
}

/** order by min() on columns of table "FeeTransfer" */
export type FeeTranfers_Min_Order_By = {
  amount?: InputMaybe<Order_By>
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  receiverId?: InputMaybe<Order_By>
  senderId?: InputMaybe<Order_By>
}

/** Ordering options when selecting data from "FeeTransfer". */
export type FeeTranfers_Order_By = {
  amount?: InputMaybe<Order_By>
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  receiver?: InputMaybe<Accounts_Order_By>
  receiverId?: InputMaybe<Order_By>
  sender?: InputMaybe<Accounts_Order_By>
  senderId?: InputMaybe<Order_By>
  transactionHash?: InputMaybe<Order_By>
}

/** select columns of table "FeeTransfer" */
export enum FeeTranfers_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  BlockNumber = 'blockNumber',
  /** column name */
  BlockTimestamp = 'blockTimestamp',
  /** column name */
  Id = 'id',
  /** column name */
  ReceiverId = 'receiverId',
  /** column name */
  SenderId = 'senderId',
  /** column name */
  TransactionHash = 'transactionHash',
}

/** order by stddev() on columns of table "FeeTransfer" */
export type FeeTranfers_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
}

/** order by stddev_pop() on columns of table "FeeTransfer" */
export type FeeTranfers_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
}

/** order by stddev_samp() on columns of table "FeeTransfer" */
export type FeeTranfers_Stddev_Samp_Order_By = {
  amount?: InputMaybe<Order_By>
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
}

/** order by sum() on columns of table "FeeTransfer" */
export type FeeTranfers_Sum_Order_By = {
  amount?: InputMaybe<Order_By>
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
}

/** order by var_pop() on columns of table "FeeTransfer" */
export type FeeTranfers_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
}

/** order by var_samp() on columns of table "FeeTransfer" */
export type FeeTranfers_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
}

/** order by variance() on columns of table "FeeTransfer" */
export type FeeTranfers_Variance_Order_By = {
  amount?: InputMaybe<Order_By>
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
}

/** Boolean expression to compare columns of type "float8". All fields are combined with logical 'AND'. */
export type Float8_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['float8']['input']>
  _gt?: InputMaybe<Scalars['float8']['input']>
  _gte?: InputMaybe<Scalars['float8']['input']>
  _in?: InputMaybe<Array<Scalars['float8']['input']>>
  _is_null?: InputMaybe<Scalars['Boolean']['input']>
  _lt?: InputMaybe<Scalars['float8']['input']>
  _lte?: InputMaybe<Scalars['float8']['input']>
  _neq?: InputMaybe<Scalars['float8']['input']>
  _nin?: InputMaybe<Array<Scalars['float8']['input']>>
}

export type Following_Args = {
  address?: InputMaybe<Scalars['String']['input']>
}

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['numeric']['input']>
  _gt?: InputMaybe<Scalars['numeric']['input']>
  _gte?: InputMaybe<Scalars['numeric']['input']>
  _in?: InputMaybe<Array<Scalars['numeric']['input']>>
  _is_null?: InputMaybe<Scalars['Boolean']['input']>
  _lt?: InputMaybe<Scalars['numeric']['input']>
  _lte?: InputMaybe<Scalars['numeric']['input']>
  _neq?: InputMaybe<Scalars['numeric']['input']>
  _nin?: InputMaybe<Array<Scalars['numeric']['input']>>
}

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last',
}

/** Boolean expression to filter rows from the table "Organization". All fields are combined with a logical 'AND'. */
export type Organizations_Bool_Exp = {
  _and?: InputMaybe<Array<Organizations_Bool_Exp>>
  _not?: InputMaybe<Organizations_Bool_Exp>
  _or?: InputMaybe<Array<Organizations_Bool_Exp>>
  atom?: InputMaybe<Atoms_Bool_Exp>
  atomId?: InputMaybe<Numeric_Comparison_Exp>
  description?: InputMaybe<String_Comparison_Exp>
  email?: InputMaybe<String_Comparison_Exp>
  id?: InputMaybe<Numeric_Comparison_Exp>
  image?: InputMaybe<String_Comparison_Exp>
  name?: InputMaybe<String_Comparison_Exp>
  url?: InputMaybe<String_Comparison_Exp>
}

/** Ordering options when selecting data from "Organization". */
export type Organizations_Order_By = {
  atom?: InputMaybe<Atoms_Order_By>
  atomId?: InputMaybe<Order_By>
  description?: InputMaybe<Order_By>
  email?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  image?: InputMaybe<Order_By>
  name?: InputMaybe<Order_By>
  url?: InputMaybe<Order_By>
}

/** select columns of table "Organization" */
export enum Organizations_Select_Column {
  /** column name */
  AtomId = 'atomId',
  /** column name */
  Description = 'description',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  Name = 'name',
  /** column name */
  Url = 'url',
}

/** Boolean expression to filter rows from the table "Person". All fields are combined with a logical 'AND'. */
export type Persons_Bool_Exp = {
  _and?: InputMaybe<Array<Persons_Bool_Exp>>
  _not?: InputMaybe<Persons_Bool_Exp>
  _or?: InputMaybe<Array<Persons_Bool_Exp>>
  atom?: InputMaybe<Atoms_Bool_Exp>
  atomId?: InputMaybe<Numeric_Comparison_Exp>
  description?: InputMaybe<String_Comparison_Exp>
  email?: InputMaybe<String_Comparison_Exp>
  id?: InputMaybe<Numeric_Comparison_Exp>
  identifier?: InputMaybe<String_Comparison_Exp>
  image?: InputMaybe<String_Comparison_Exp>
  name?: InputMaybe<String_Comparison_Exp>
  url?: InputMaybe<String_Comparison_Exp>
}

/** Ordering options when selecting data from "Person". */
export type Persons_Order_By = {
  atom?: InputMaybe<Atoms_Order_By>
  atomId?: InputMaybe<Order_By>
  description?: InputMaybe<Order_By>
  email?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  identifier?: InputMaybe<Order_By>
  image?: InputMaybe<Order_By>
  name?: InputMaybe<Order_By>
  url?: InputMaybe<Order_By>
}

/** select columns of table "Person" */
export enum Persons_Select_Column {
  /** column name */
  AtomId = 'atomId',
  /** column name */
  Description = 'description',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Identifier = 'identifier',
  /** column name */
  Image = 'image',
  /** column name */
  Name = 'name',
  /** column name */
  Url = 'url',
}

/** order by aggregate values of table "Position" */
export type Positions_Aggregate_Order_By = {
  avg?: InputMaybe<Positions_Avg_Order_By>
  count?: InputMaybe<Order_By>
  max?: InputMaybe<Positions_Max_Order_By>
  min?: InputMaybe<Positions_Min_Order_By>
  stddev?: InputMaybe<Positions_Stddev_Order_By>
  stddev_pop?: InputMaybe<Positions_Stddev_Pop_Order_By>
  stddev_samp?: InputMaybe<Positions_Stddev_Samp_Order_By>
  sum?: InputMaybe<Positions_Sum_Order_By>
  var_pop?: InputMaybe<Positions_Var_Pop_Order_By>
  var_samp?: InputMaybe<Positions_Var_Samp_Order_By>
  variance?: InputMaybe<Positions_Variance_Order_By>
}

/** order by avg() on columns of table "Position" */
export type Positions_Avg_Order_By = {
  shares?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** Boolean expression to filter rows from the table "Position". All fields are combined with a logical 'AND'. */
export type Positions_Bool_Exp = {
  _and?: InputMaybe<Array<Positions_Bool_Exp>>
  _not?: InputMaybe<Positions_Bool_Exp>
  _or?: InputMaybe<Array<Positions_Bool_Exp>>
  account?: InputMaybe<Accounts_Bool_Exp>
  accountId?: InputMaybe<String_Comparison_Exp>
  id?: InputMaybe<String_Comparison_Exp>
  shares?: InputMaybe<Numeric_Comparison_Exp>
  vault?: InputMaybe<Vaults_Bool_Exp>
  vaultId?: InputMaybe<Numeric_Comparison_Exp>
}

/** order by max() on columns of table "Position" */
export type Positions_Max_Order_By = {
  accountId?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  shares?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** order by min() on columns of table "Position" */
export type Positions_Min_Order_By = {
  accountId?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  shares?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** Ordering options when selecting data from "Position". */
export type Positions_Order_By = {
  account?: InputMaybe<Accounts_Order_By>
  accountId?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  shares?: InputMaybe<Order_By>
  vault?: InputMaybe<Vaults_Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** select columns of table "Position" */
export enum Positions_Select_Column {
  /** column name */
  AccountId = 'accountId',
  /** column name */
  Id = 'id',
  /** column name */
  Shares = 'shares',
  /** column name */
  VaultId = 'vaultId',
}

/** order by stddev() on columns of table "Position" */
export type Positions_Stddev_Order_By = {
  shares?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** order by stddev_pop() on columns of table "Position" */
export type Positions_Stddev_Pop_Order_By = {
  shares?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** order by stddev_samp() on columns of table "Position" */
export type Positions_Stddev_Samp_Order_By = {
  shares?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** order by sum() on columns of table "Position" */
export type Positions_Sum_Order_By = {
  shares?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** order by var_pop() on columns of table "Position" */
export type Positions_Var_Pop_Order_By = {
  shares?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** order by var_samp() on columns of table "Position" */
export type Positions_Var_Samp_Order_By = {
  shares?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** order by variance() on columns of table "Position" */
export type Positions_Variance_Order_By = {
  shares?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** Boolean expression to filter rows from the table "PredicateObject". All fields are combined with a logical 'AND'. */
export type PredicateObjects_Bool_Exp = {
  _and?: InputMaybe<Array<PredicateObjects_Bool_Exp>>
  _not?: InputMaybe<PredicateObjects_Bool_Exp>
  _or?: InputMaybe<Array<PredicateObjects_Bool_Exp>>
  claimCount?: InputMaybe<Int_Comparison_Exp>
  id?: InputMaybe<String_Comparison_Exp>
  object?: InputMaybe<Atoms_Bool_Exp>
  objectId?: InputMaybe<Numeric_Comparison_Exp>
  predicate?: InputMaybe<Atoms_Bool_Exp>
  predicateId?: InputMaybe<Numeric_Comparison_Exp>
  tripleCount?: InputMaybe<Int_Comparison_Exp>
}

/** Ordering options when selecting data from "PredicateObject". */
export type PredicateObjects_Order_By = {
  claimCount?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  object?: InputMaybe<Atoms_Order_By>
  objectId?: InputMaybe<Order_By>
  predicate?: InputMaybe<Atoms_Order_By>
  predicateId?: InputMaybe<Order_By>
  tripleCount?: InputMaybe<Order_By>
}

/** select columns of table "PredicateObject" */
export enum PredicateObjects_Select_Column {
  /** column name */
  ClaimCount = 'claimCount',
  /** column name */
  Id = 'id',
  /** column name */
  ObjectId = 'objectId',
  /** column name */
  PredicateId = 'predicateId',
  /** column name */
  TripleCount = 'tripleCount',
}

/** order by aggregate values of table "Redemption" */
export type Redemptions_Aggregate_Order_By = {
  avg?: InputMaybe<Redemptions_Avg_Order_By>
  count?: InputMaybe<Order_By>
  max?: InputMaybe<Redemptions_Max_Order_By>
  min?: InputMaybe<Redemptions_Min_Order_By>
  stddev?: InputMaybe<Redemptions_Stddev_Order_By>
  stddev_pop?: InputMaybe<Redemptions_Stddev_Pop_Order_By>
  stddev_samp?: InputMaybe<Redemptions_Stddev_Samp_Order_By>
  sum?: InputMaybe<Redemptions_Sum_Order_By>
  var_pop?: InputMaybe<Redemptions_Var_Pop_Order_By>
  var_samp?: InputMaybe<Redemptions_Var_Samp_Order_By>
  variance?: InputMaybe<Redemptions_Variance_Order_By>
}

/** order by avg() on columns of table "Redemption" */
export type Redemptions_Avg_Order_By = {
  assetsForReceiver?: InputMaybe<Order_By>
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  exitFee?: InputMaybe<Order_By>
  senderTotalSharesInVault?: InputMaybe<Order_By>
  sharesRedeemedBySender?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** Boolean expression to filter rows from the table "Redemption". All fields are combined with a logical 'AND'. */
export type Redemptions_Bool_Exp = {
  _and?: InputMaybe<Array<Redemptions_Bool_Exp>>
  _not?: InputMaybe<Redemptions_Bool_Exp>
  _or?: InputMaybe<Array<Redemptions_Bool_Exp>>
  assetsForReceiver?: InputMaybe<Numeric_Comparison_Exp>
  blockNumber?: InputMaybe<Numeric_Comparison_Exp>
  blockTimestamp?: InputMaybe<Numeric_Comparison_Exp>
  exitFee?: InputMaybe<Numeric_Comparison_Exp>
  id?: InputMaybe<String_Comparison_Exp>
  receiver?: InputMaybe<Accounts_Bool_Exp>
  receiverId?: InputMaybe<String_Comparison_Exp>
  sender?: InputMaybe<Accounts_Bool_Exp>
  senderId?: InputMaybe<String_Comparison_Exp>
  senderTotalSharesInVault?: InputMaybe<Numeric_Comparison_Exp>
  sharesRedeemedBySender?: InputMaybe<Numeric_Comparison_Exp>
  transactionHash?: InputMaybe<Bytea_Comparison_Exp>
  vault?: InputMaybe<Vaults_Bool_Exp>
  vaultId?: InputMaybe<Numeric_Comparison_Exp>
}

/** order by max() on columns of table "Redemption" */
export type Redemptions_Max_Order_By = {
  assetsForReceiver?: InputMaybe<Order_By>
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  exitFee?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  receiverId?: InputMaybe<Order_By>
  senderId?: InputMaybe<Order_By>
  senderTotalSharesInVault?: InputMaybe<Order_By>
  sharesRedeemedBySender?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** order by min() on columns of table "Redemption" */
export type Redemptions_Min_Order_By = {
  assetsForReceiver?: InputMaybe<Order_By>
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  exitFee?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  receiverId?: InputMaybe<Order_By>
  senderId?: InputMaybe<Order_By>
  senderTotalSharesInVault?: InputMaybe<Order_By>
  sharesRedeemedBySender?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** Ordering options when selecting data from "Redemption". */
export type Redemptions_Order_By = {
  assetsForReceiver?: InputMaybe<Order_By>
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  exitFee?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  receiver?: InputMaybe<Accounts_Order_By>
  receiverId?: InputMaybe<Order_By>
  sender?: InputMaybe<Accounts_Order_By>
  senderId?: InputMaybe<Order_By>
  senderTotalSharesInVault?: InputMaybe<Order_By>
  sharesRedeemedBySender?: InputMaybe<Order_By>
  transactionHash?: InputMaybe<Order_By>
  vault?: InputMaybe<Vaults_Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** select columns of table "Redemption" */
export enum Redemptions_Select_Column {
  /** column name */
  AssetsForReceiver = 'assetsForReceiver',
  /** column name */
  BlockNumber = 'blockNumber',
  /** column name */
  BlockTimestamp = 'blockTimestamp',
  /** column name */
  ExitFee = 'exitFee',
  /** column name */
  Id = 'id',
  /** column name */
  ReceiverId = 'receiverId',
  /** column name */
  SenderId = 'senderId',
  /** column name */
  SenderTotalSharesInVault = 'senderTotalSharesInVault',
  /** column name */
  SharesRedeemedBySender = 'sharesRedeemedBySender',
  /** column name */
  TransactionHash = 'transactionHash',
  /** column name */
  VaultId = 'vaultId',
}

/** order by stddev() on columns of table "Redemption" */
export type Redemptions_Stddev_Order_By = {
  assetsForReceiver?: InputMaybe<Order_By>
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  exitFee?: InputMaybe<Order_By>
  senderTotalSharesInVault?: InputMaybe<Order_By>
  sharesRedeemedBySender?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** order by stddev_pop() on columns of table "Redemption" */
export type Redemptions_Stddev_Pop_Order_By = {
  assetsForReceiver?: InputMaybe<Order_By>
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  exitFee?: InputMaybe<Order_By>
  senderTotalSharesInVault?: InputMaybe<Order_By>
  sharesRedeemedBySender?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** order by stddev_samp() on columns of table "Redemption" */
export type Redemptions_Stddev_Samp_Order_By = {
  assetsForReceiver?: InputMaybe<Order_By>
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  exitFee?: InputMaybe<Order_By>
  senderTotalSharesInVault?: InputMaybe<Order_By>
  sharesRedeemedBySender?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** order by sum() on columns of table "Redemption" */
export type Redemptions_Sum_Order_By = {
  assetsForReceiver?: InputMaybe<Order_By>
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  exitFee?: InputMaybe<Order_By>
  senderTotalSharesInVault?: InputMaybe<Order_By>
  sharesRedeemedBySender?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** order by var_pop() on columns of table "Redemption" */
export type Redemptions_Var_Pop_Order_By = {
  assetsForReceiver?: InputMaybe<Order_By>
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  exitFee?: InputMaybe<Order_By>
  senderTotalSharesInVault?: InputMaybe<Order_By>
  sharesRedeemedBySender?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** order by var_samp() on columns of table "Redemption" */
export type Redemptions_Var_Samp_Order_By = {
  assetsForReceiver?: InputMaybe<Order_By>
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  exitFee?: InputMaybe<Order_By>
  senderTotalSharesInVault?: InputMaybe<Order_By>
  sharesRedeemedBySender?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** order by variance() on columns of table "Redemption" */
export type Redemptions_Variance_Order_By = {
  assetsForReceiver?: InputMaybe<Order_By>
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  exitFee?: InputMaybe<Order_By>
  senderTotalSharesInVault?: InputMaybe<Order_By>
  sharesRedeemedBySender?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** order by aggregate values of table "Signal" */
export type Signals_Aggregate_Order_By = {
  avg?: InputMaybe<Signals_Avg_Order_By>
  count?: InputMaybe<Order_By>
  max?: InputMaybe<Signals_Max_Order_By>
  min?: InputMaybe<Signals_Min_Order_By>
  stddev?: InputMaybe<Signals_Stddev_Order_By>
  stddev_pop?: InputMaybe<Signals_Stddev_Pop_Order_By>
  stddev_samp?: InputMaybe<Signals_Stddev_Samp_Order_By>
  sum?: InputMaybe<Signals_Sum_Order_By>
  var_pop?: InputMaybe<Signals_Var_Pop_Order_By>
  var_samp?: InputMaybe<Signals_Var_Samp_Order_By>
  variance?: InputMaybe<Signals_Variance_Order_By>
}

/** order by avg() on columns of table "Signal" */
export type Signals_Avg_Order_By = {
  atomId?: InputMaybe<Order_By>
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  delta?: InputMaybe<Order_By>
  relativeStrength?: InputMaybe<Order_By>
  tripleId?: InputMaybe<Order_By>
}

/** Boolean expression to filter rows from the table "Signal". All fields are combined with a logical 'AND'. */
export type Signals_Bool_Exp = {
  _and?: InputMaybe<Array<Signals_Bool_Exp>>
  _not?: InputMaybe<Signals_Bool_Exp>
  _or?: InputMaybe<Array<Signals_Bool_Exp>>
  account?: InputMaybe<Accounts_Bool_Exp>
  accountId?: InputMaybe<String_Comparison_Exp>
  atom?: InputMaybe<Atoms_Bool_Exp>
  atomId?: InputMaybe<Numeric_Comparison_Exp>
  blockNumber?: InputMaybe<Numeric_Comparison_Exp>
  blockTimestamp?: InputMaybe<Numeric_Comparison_Exp>
  delta?: InputMaybe<Numeric_Comparison_Exp>
  deposit?: InputMaybe<Deposits_Bool_Exp>
  depositId?: InputMaybe<String_Comparison_Exp>
  id?: InputMaybe<String_Comparison_Exp>
  redemption?: InputMaybe<Redemptions_Bool_Exp>
  redemptionId?: InputMaybe<String_Comparison_Exp>
  relativeStrength?: InputMaybe<Numeric_Comparison_Exp>
  transactionHash?: InputMaybe<Bytea_Comparison_Exp>
  triple?: InputMaybe<Triples_Bool_Exp>
  tripleId?: InputMaybe<Numeric_Comparison_Exp>
}

export type Signals_From_Following_Args = {
  address?: InputMaybe<Scalars['String']['input']>
}

/** order by max() on columns of table "Signal" */
export type Signals_Max_Order_By = {
  accountId?: InputMaybe<Order_By>
  atomId?: InputMaybe<Order_By>
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  delta?: InputMaybe<Order_By>
  depositId?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  redemptionId?: InputMaybe<Order_By>
  relativeStrength?: InputMaybe<Order_By>
  tripleId?: InputMaybe<Order_By>
}

/** order by min() on columns of table "Signal" */
export type Signals_Min_Order_By = {
  accountId?: InputMaybe<Order_By>
  atomId?: InputMaybe<Order_By>
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  delta?: InputMaybe<Order_By>
  depositId?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  redemptionId?: InputMaybe<Order_By>
  relativeStrength?: InputMaybe<Order_By>
  tripleId?: InputMaybe<Order_By>
}

/** Ordering options when selecting data from "Signal". */
export type Signals_Order_By = {
  account?: InputMaybe<Accounts_Order_By>
  accountId?: InputMaybe<Order_By>
  atom?: InputMaybe<Atoms_Order_By>
  atomId?: InputMaybe<Order_By>
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  delta?: InputMaybe<Order_By>
  deposit?: InputMaybe<Deposits_Order_By>
  depositId?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  redemption?: InputMaybe<Redemptions_Order_By>
  redemptionId?: InputMaybe<Order_By>
  relativeStrength?: InputMaybe<Order_By>
  transactionHash?: InputMaybe<Order_By>
  triple?: InputMaybe<Triples_Order_By>
  tripleId?: InputMaybe<Order_By>
}

/** select columns of table "Signal" */
export enum Signals_Select_Column {
  /** column name */
  AccountId = 'accountId',
  /** column name */
  AtomId = 'atomId',
  /** column name */
  BlockNumber = 'blockNumber',
  /** column name */
  BlockTimestamp = 'blockTimestamp',
  /** column name */
  Delta = 'delta',
  /** column name */
  DepositId = 'depositId',
  /** column name */
  Id = 'id',
  /** column name */
  RedemptionId = 'redemptionId',
  /** column name */
  RelativeStrength = 'relativeStrength',
  /** column name */
  TransactionHash = 'transactionHash',
  /** column name */
  TripleId = 'tripleId',
}

/** order by stddev() on columns of table "Signal" */
export type Signals_Stddev_Order_By = {
  atomId?: InputMaybe<Order_By>
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  delta?: InputMaybe<Order_By>
  relativeStrength?: InputMaybe<Order_By>
  tripleId?: InputMaybe<Order_By>
}

/** order by stddev_pop() on columns of table "Signal" */
export type Signals_Stddev_Pop_Order_By = {
  atomId?: InputMaybe<Order_By>
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  delta?: InputMaybe<Order_By>
  relativeStrength?: InputMaybe<Order_By>
  tripleId?: InputMaybe<Order_By>
}

/** order by stddev_samp() on columns of table "Signal" */
export type Signals_Stddev_Samp_Order_By = {
  atomId?: InputMaybe<Order_By>
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  delta?: InputMaybe<Order_By>
  relativeStrength?: InputMaybe<Order_By>
  tripleId?: InputMaybe<Order_By>
}

/** order by sum() on columns of table "Signal" */
export type Signals_Sum_Order_By = {
  atomId?: InputMaybe<Order_By>
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  delta?: InputMaybe<Order_By>
  relativeStrength?: InputMaybe<Order_By>
  tripleId?: InputMaybe<Order_By>
}

/** order by var_pop() on columns of table "Signal" */
export type Signals_Var_Pop_Order_By = {
  atomId?: InputMaybe<Order_By>
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  delta?: InputMaybe<Order_By>
  relativeStrength?: InputMaybe<Order_By>
  tripleId?: InputMaybe<Order_By>
}

/** order by var_samp() on columns of table "Signal" */
export type Signals_Var_Samp_Order_By = {
  atomId?: InputMaybe<Order_By>
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  delta?: InputMaybe<Order_By>
  relativeStrength?: InputMaybe<Order_By>
  tripleId?: InputMaybe<Order_By>
}

/** order by variance() on columns of table "Signal" */
export type Signals_Variance_Order_By = {
  atomId?: InputMaybe<Order_By>
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  delta?: InputMaybe<Order_By>
  relativeStrength?: InputMaybe<Order_By>
  tripleId?: InputMaybe<Order_By>
}

/** Boolean expression to filter rows from the table "StatsHour". All fields are combined with a logical 'AND'. */
export type StatHours_Bool_Exp = {
  _and?: InputMaybe<Array<StatHours_Bool_Exp>>
  _not?: InputMaybe<StatHours_Bool_Exp>
  _or?: InputMaybe<Array<StatHours_Bool_Exp>>
  contractBalance?: InputMaybe<Numeric_Comparison_Exp>
  id?: InputMaybe<Int_Comparison_Exp>
  totalAccounts?: InputMaybe<Int_Comparison_Exp>
  totalAtoms?: InputMaybe<Int_Comparison_Exp>
  totalFees?: InputMaybe<Numeric_Comparison_Exp>
  totalPositions?: InputMaybe<Int_Comparison_Exp>
  totalSignals?: InputMaybe<Int_Comparison_Exp>
  totalTriples?: InputMaybe<Int_Comparison_Exp>
}

/** Ordering options when selecting data from "StatsHour". */
export type StatHours_Order_By = {
  contractBalance?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  totalAccounts?: InputMaybe<Order_By>
  totalAtoms?: InputMaybe<Order_By>
  totalFees?: InputMaybe<Order_By>
  totalPositions?: InputMaybe<Order_By>
  totalSignals?: InputMaybe<Order_By>
  totalTriples?: InputMaybe<Order_By>
}

/** select columns of table "StatsHour" */
export enum StatHours_Select_Column {
  /** column name */
  ContractBalance = 'contractBalance',
  /** column name */
  Id = 'id',
  /** column name */
  TotalAccounts = 'totalAccounts',
  /** column name */
  TotalAtoms = 'totalAtoms',
  /** column name */
  TotalFees = 'totalFees',
  /** column name */
  TotalPositions = 'totalPositions',
  /** column name */
  TotalSignals = 'totalSignals',
  /** column name */
  TotalTriples = 'totalTriples',
}

/** Boolean expression to filter rows from the table "Stats". All fields are combined with a logical 'AND'. */
export type Stats_Bool_Exp = {
  _and?: InputMaybe<Array<Stats_Bool_Exp>>
  _not?: InputMaybe<Stats_Bool_Exp>
  _or?: InputMaybe<Array<Stats_Bool_Exp>>
  contractBalance?: InputMaybe<Numeric_Comparison_Exp>
  id?: InputMaybe<Int_Comparison_Exp>
  totalAccounts?: InputMaybe<Int_Comparison_Exp>
  totalAtoms?: InputMaybe<Int_Comparison_Exp>
  totalFees?: InputMaybe<Numeric_Comparison_Exp>
  totalPositions?: InputMaybe<Int_Comparison_Exp>
  totalSignals?: InputMaybe<Int_Comparison_Exp>
  totalTriples?: InputMaybe<Int_Comparison_Exp>
}

/** Ordering options when selecting data from "Stats". */
export type Stats_Order_By = {
  contractBalance?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  totalAccounts?: InputMaybe<Order_By>
  totalAtoms?: InputMaybe<Order_By>
  totalFees?: InputMaybe<Order_By>
  totalPositions?: InputMaybe<Order_By>
  totalSignals?: InputMaybe<Order_By>
  totalTriples?: InputMaybe<Order_By>
}

/** select columns of table "Stats" */
export enum Stats_Select_Column {
  /** column name */
  ContractBalance = 'contractBalance',
  /** column name */
  Id = 'id',
  /** column name */
  TotalAccounts = 'totalAccounts',
  /** column name */
  TotalAtoms = 'totalAtoms',
  /** column name */
  TotalFees = 'totalFees',
  /** column name */
  TotalPositions = 'totalPositions',
  /** column name */
  TotalSignals = 'totalSignals',
  /** column name */
  TotalTriples = 'totalTriples',
}

/** Boolean expression to filter rows from the table "Thing". All fields are combined with a logical 'AND'. */
export type Things_Bool_Exp = {
  _and?: InputMaybe<Array<Things_Bool_Exp>>
  _not?: InputMaybe<Things_Bool_Exp>
  _or?: InputMaybe<Array<Things_Bool_Exp>>
  atom?: InputMaybe<Atoms_Bool_Exp>
  atomId?: InputMaybe<Numeric_Comparison_Exp>
  description?: InputMaybe<String_Comparison_Exp>
  id?: InputMaybe<Numeric_Comparison_Exp>
  image?: InputMaybe<String_Comparison_Exp>
  name?: InputMaybe<String_Comparison_Exp>
  url?: InputMaybe<String_Comparison_Exp>
}

/** Ordering options when selecting data from "Thing". */
export type Things_Order_By = {
  atom?: InputMaybe<Atoms_Order_By>
  atomId?: InputMaybe<Order_By>
  description?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  image?: InputMaybe<Order_By>
  name?: InputMaybe<Order_By>
  url?: InputMaybe<Order_By>
}

/** select columns of table "Thing" */
export enum Things_Select_Column {
  /** column name */
  AtomId = 'atomId',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  Name = 'name',
  /** column name */
  Url = 'url',
}

/** order by aggregate values of table "Triple" */
export type Triples_Aggregate_Order_By = {
  avg?: InputMaybe<Triples_Avg_Order_By>
  count?: InputMaybe<Order_By>
  max?: InputMaybe<Triples_Max_Order_By>
  min?: InputMaybe<Triples_Min_Order_By>
  stddev?: InputMaybe<Triples_Stddev_Order_By>
  stddev_pop?: InputMaybe<Triples_Stddev_Pop_Order_By>
  stddev_samp?: InputMaybe<Triples_Stddev_Samp_Order_By>
  sum?: InputMaybe<Triples_Sum_Order_By>
  var_pop?: InputMaybe<Triples_Var_Pop_Order_By>
  var_samp?: InputMaybe<Triples_Var_Samp_Order_By>
  variance?: InputMaybe<Triples_Variance_Order_By>
}

/** order by avg() on columns of table "Triple" */
export type Triples_Avg_Order_By = {
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  counterVaultId?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  objectId?: InputMaybe<Order_By>
  predicateId?: InputMaybe<Order_By>
  subjectId?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** Boolean expression to filter rows from the table "Triple". All fields are combined with a logical 'AND'. */
export type Triples_Bool_Exp = {
  _and?: InputMaybe<Array<Triples_Bool_Exp>>
  _not?: InputMaybe<Triples_Bool_Exp>
  _or?: InputMaybe<Array<Triples_Bool_Exp>>
  blockNumber?: InputMaybe<Numeric_Comparison_Exp>
  blockTimestamp?: InputMaybe<Numeric_Comparison_Exp>
  counterVault?: InputMaybe<Vaults_Bool_Exp>
  counterVaultId?: InputMaybe<Numeric_Comparison_Exp>
  creator?: InputMaybe<Accounts_Bool_Exp>
  creatorId?: InputMaybe<String_Comparison_Exp>
  id?: InputMaybe<Numeric_Comparison_Exp>
  label?: InputMaybe<String_Comparison_Exp>
  object?: InputMaybe<Atoms_Bool_Exp>
  objectId?: InputMaybe<Numeric_Comparison_Exp>
  predicate?: InputMaybe<Atoms_Bool_Exp>
  predicateId?: InputMaybe<Numeric_Comparison_Exp>
  subject?: InputMaybe<Atoms_Bool_Exp>
  subjectId?: InputMaybe<Numeric_Comparison_Exp>
  transactionHash?: InputMaybe<Bytea_Comparison_Exp>
  vault?: InputMaybe<Vaults_Bool_Exp>
  vaultId?: InputMaybe<Numeric_Comparison_Exp>
}

/** order by max() on columns of table "Triple" */
export type Triples_Max_Order_By = {
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  counterVaultId?: InputMaybe<Order_By>
  creatorId?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  label?: InputMaybe<Order_By>
  objectId?: InputMaybe<Order_By>
  predicateId?: InputMaybe<Order_By>
  subjectId?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** order by min() on columns of table "Triple" */
export type Triples_Min_Order_By = {
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  counterVaultId?: InputMaybe<Order_By>
  creatorId?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  label?: InputMaybe<Order_By>
  objectId?: InputMaybe<Order_By>
  predicateId?: InputMaybe<Order_By>
  subjectId?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** Ordering options when selecting data from "Triple". */
export type Triples_Order_By = {
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  counterVault?: InputMaybe<Vaults_Order_By>
  counterVaultId?: InputMaybe<Order_By>
  creator?: InputMaybe<Accounts_Order_By>
  creatorId?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  label?: InputMaybe<Order_By>
  object?: InputMaybe<Atoms_Order_By>
  objectId?: InputMaybe<Order_By>
  predicate?: InputMaybe<Atoms_Order_By>
  predicateId?: InputMaybe<Order_By>
  subject?: InputMaybe<Atoms_Order_By>
  subjectId?: InputMaybe<Order_By>
  transactionHash?: InputMaybe<Order_By>
  vault?: InputMaybe<Vaults_Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** select columns of table "Triple" */
export enum Triples_Select_Column {
  /** column name */
  BlockNumber = 'blockNumber',
  /** column name */
  BlockTimestamp = 'blockTimestamp',
  /** column name */
  CounterVaultId = 'counterVaultId',
  /** column name */
  CreatorId = 'creatorId',
  /** column name */
  Id = 'id',
  /** column name */
  Label = 'label',
  /** column name */
  ObjectId = 'objectId',
  /** column name */
  PredicateId = 'predicateId',
  /** column name */
  SubjectId = 'subjectId',
  /** column name */
  TransactionHash = 'transactionHash',
  /** column name */
  VaultId = 'vaultId',
}

/** order by stddev() on columns of table "Triple" */
export type Triples_Stddev_Order_By = {
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  counterVaultId?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  objectId?: InputMaybe<Order_By>
  predicateId?: InputMaybe<Order_By>
  subjectId?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** order by stddev_pop() on columns of table "Triple" */
export type Triples_Stddev_Pop_Order_By = {
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  counterVaultId?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  objectId?: InputMaybe<Order_By>
  predicateId?: InputMaybe<Order_By>
  subjectId?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** order by stddev_samp() on columns of table "Triple" */
export type Triples_Stddev_Samp_Order_By = {
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  counterVaultId?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  objectId?: InputMaybe<Order_By>
  predicateId?: InputMaybe<Order_By>
  subjectId?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** order by sum() on columns of table "Triple" */
export type Triples_Sum_Order_By = {
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  counterVaultId?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  objectId?: InputMaybe<Order_By>
  predicateId?: InputMaybe<Order_By>
  subjectId?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** order by var_pop() on columns of table "Triple" */
export type Triples_Var_Pop_Order_By = {
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  counterVaultId?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  objectId?: InputMaybe<Order_By>
  predicateId?: InputMaybe<Order_By>
  subjectId?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** order by var_samp() on columns of table "Triple" */
export type Triples_Var_Samp_Order_By = {
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  counterVaultId?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  objectId?: InputMaybe<Order_By>
  predicateId?: InputMaybe<Order_By>
  subjectId?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** order by variance() on columns of table "Triple" */
export type Triples_Variance_Order_By = {
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  counterVaultId?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  objectId?: InputMaybe<Order_By>
  predicateId?: InputMaybe<Order_By>
  subjectId?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** Boolean expression to filter rows from the table "Vault". All fields are combined with a logical 'AND'. */
export type Vaults_Bool_Exp = {
  _and?: InputMaybe<Array<Vaults_Bool_Exp>>
  _not?: InputMaybe<Vaults_Bool_Exp>
  _or?: InputMaybe<Array<Vaults_Bool_Exp>>
  atom?: InputMaybe<Atoms_Bool_Exp>
  atomId?: InputMaybe<Numeric_Comparison_Exp>
  currentSharePrice?: InputMaybe<Numeric_Comparison_Exp>
  deposits?: InputMaybe<Deposits_Bool_Exp>
  id?: InputMaybe<Numeric_Comparison_Exp>
  positionCount?: InputMaybe<Int_Comparison_Exp>
  positions?: InputMaybe<Positions_Bool_Exp>
  redemptions?: InputMaybe<Redemptions_Bool_Exp>
  totalShares?: InputMaybe<Numeric_Comparison_Exp>
  triple?: InputMaybe<Triples_Bool_Exp>
  tripleId?: InputMaybe<Numeric_Comparison_Exp>
}

/** Ordering options when selecting data from "Vault". */
export type Vaults_Order_By = {
  atom?: InputMaybe<Atoms_Order_By>
  atomId?: InputMaybe<Order_By>
  currentSharePrice?: InputMaybe<Order_By>
  deposits_aggregate?: InputMaybe<Deposits_Aggregate_Order_By>
  id?: InputMaybe<Order_By>
  positionCount?: InputMaybe<Order_By>
  positions_aggregate?: InputMaybe<Positions_Aggregate_Order_By>
  redemptions?: InputMaybe<Redemptions_Order_By>
  totalShares?: InputMaybe<Order_By>
  triple?: InputMaybe<Triples_Order_By>
  tripleId?: InputMaybe<Order_By>
}

/** select columns of table "Vault" */
export enum Vaults_Select_Column {
  /** column name */
  AtomId = 'atomId',
  /** column name */
  CurrentSharePrice = 'currentSharePrice',
  /** column name */
  Id = 'id',
  /** column name */
  PositionCount = 'positionCount',
  /** column name */
  TotalShares = 'totalShares',
  /** column name */
  TripleId = 'tripleId',
}

export type AccountMetadataFragment = {
  __typename?: 'accounts'
  label: string
  image?: string | null
  id: string
  atomId?: any | null
  type: string
} & { ' $fragmentName'?: 'AccountMetadataFragment' }

export type AtomMetadataFragment = {
  __typename?: 'atoms'
  data: string
  id: any
  image?: string | null
  label?: string | null
  emoji?: string | null
  type: string
} & { ' $fragmentName'?: 'AtomMetadataFragment' }

export type AtomTxnFragment = {
  __typename?: 'atoms'
  blockNumber: any
  blockTimestamp: any
  transactionHash: any
  creatorId: string
} & { ' $fragmentName'?: 'AtomTxnFragment' }

export type AtomVaultDetailsFragment = {
  __typename?: 'atoms'
  vaultId: any
  walletId: string
  vault?: {
    __typename?: 'vaults'
    positionCount: number
    totalShares: any
    currentSharePrice: any
  } | null
} & { ' $fragmentName'?: 'AtomVaultDetailsFragment' }

export type EventFragment = {
  __typename?: 'events'
  type: string
  atomId?: any | null
  blockNumber: any
  blockTimestamp: any
  depositId?: string | null
  feeTransferId?: string | null
  id: string
  redemptionId?: string | null
  transactionHash: any
  tripleId?: any | null
} & { ' $fragmentName'?: 'EventFragment' }

export type PositionDetailsFragment = {
  __typename?: 'positions'
  id: string
  accountId: string
  shares: any
  vaultId: any
} & { ' $fragmentName'?: 'PositionDetailsFragment' }

export type TripleMetadataFragment = {
  __typename?: 'triples'
  id: any
  label?: string | null
  subject?:
    | ({
        __typename?: 'atoms'
        creator?:
          | ({ __typename?: 'accounts' } & {
              ' $fragmentRefs'?: {
                AccountMetadataFragment: AccountMetadataFragment
              }
            })
          | null
      } & { ' $fragmentRefs'?: { AtomMetadataFragment: AtomMetadataFragment } })
    | null
  predicate?:
    | ({
        __typename?: 'atoms'
        creator?:
          | ({ __typename?: 'accounts' } & {
              ' $fragmentRefs'?: {
                AccountMetadataFragment: AccountMetadataFragment
              }
            })
          | null
      } & { ' $fragmentRefs'?: { AtomMetadataFragment: AtomMetadataFragment } })
    | null
  object?:
    | ({
        __typename?: 'atoms'
        creator?:
          | ({ __typename?: 'accounts' } & {
              ' $fragmentRefs'?: {
                AccountMetadataFragment: AccountMetadataFragment
              }
            })
          | null
      } & { ' $fragmentRefs'?: { AtomMetadataFragment: AtomMetadataFragment } })
    | null
} & { ' $fragmentName'?: 'TripleMetadataFragment' }

export type TripleTxnFragment = {
  __typename?: 'triples'
  blockNumber: any
  blockTimestamp: any
  transactionHash: any
  creatorId: string
} & { ' $fragmentName'?: 'TripleTxnFragment' }

export type TripleVaultDetailsFragment = {
  __typename?: 'triples'
  vaultId: any
  counterVaultId: any
  vault?:
    | ({ __typename?: 'vaults' } & {
        ' $fragmentRefs'?: { VaultDetailsFragment: VaultDetailsFragment }
      })
    | null
  counterVault?:
    | ({ __typename?: 'vaults' } & {
        ' $fragmentRefs'?: { VaultDetailsFragment: VaultDetailsFragment }
      })
    | null
} & { ' $fragmentName'?: 'TripleVaultDetailsFragment' }

export type VaultDetailsFragment = {
  __typename?: 'vaults'
  atomId?: any | null
  currentSharePrice: any
  id: any
  positionCount: number
  totalShares: any
  tripleId?: any | null
} & { ' $fragmentName'?: 'VaultDetailsFragment' }

export type GetAtomsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<Atoms_Order_By> | Atoms_Order_By>
  where?: InputMaybe<Atoms_Bool_Exp>
}>

export type GetAtomsQuery = {
  __typename?: 'query_root'
  atoms: Array<
    {
      __typename?: 'atoms'
      creator?:
        | ({ __typename?: 'accounts' } & {
            ' $fragmentRefs'?: {
              AccountMetadataFragment: AccountMetadataFragment
            }
          })
        | null
    } & {
      ' $fragmentRefs'?: {
        AtomMetadataFragment: AtomMetadataFragment
        AtomTxnFragment: AtomTxnFragment
        AtomVaultDetailsFragment: AtomVaultDetailsFragment
      }
    }
  >
}

export type GetTripleQueryVariables = Exact<{
  tripleId: Scalars['numeric']['input']
}>

export type GetTripleQuery = {
  __typename?: 'query_root'
  triple?:
    | ({
        __typename?: 'triples'
        creator?:
          | ({ __typename?: 'accounts' } & {
              ' $fragmentRefs'?: {
                AccountMetadataFragment: AccountMetadataFragment
              }
            })
          | null
      } & {
        ' $fragmentRefs'?: {
          TripleMetadataFragment: TripleMetadataFragment
          TripleTxnFragment: TripleTxnFragment
          TripleVaultDetailsFragment: TripleVaultDetailsFragment
        }
      })
    | null
}

export type GetTriplesQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<Triples_Order_By> | Triples_Order_By>
  where?: InputMaybe<Triples_Bool_Exp>
}>

export type GetTriplesQuery = {
  __typename?: 'query_root'
  triples: Array<
    {
      __typename?: 'triples'
      creator?:
        | ({ __typename?: 'accounts' } & {
            ' $fragmentRefs'?: {
              AccountMetadataFragment: AccountMetadataFragment
            }
          })
        | null
    } & {
      ' $fragmentRefs'?: {
        TripleMetadataFragment: TripleMetadataFragment
        TripleTxnFragment: TripleTxnFragment
        TripleVaultDetailsFragment: TripleVaultDetailsFragment
      }
    }
  >
}

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType']

  constructor(
    private value: string,
    public __meta__?: Record<string, any>,
  ) {
    super(value)
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value
  }
}
export const AtomTxnFragmentDoc = new TypedDocumentString(
  `
    fragment AtomTxn on atoms {
  blockNumber
  blockTimestamp
  transactionHash
  creatorId
}
    `,
  { fragmentName: 'AtomTxn' },
) as unknown as TypedDocumentString<AtomTxnFragment, unknown>
export const AtomVaultDetailsFragmentDoc = new TypedDocumentString(
  `
    fragment AtomVaultDetails on atoms {
  vaultId
  walletId
  vault {
    positionCount
    totalShares
    currentSharePrice
  }
}
    `,
  { fragmentName: 'AtomVaultDetails' },
) as unknown as TypedDocumentString<AtomVaultDetailsFragment, unknown>
export const EventFragmentDoc = new TypedDocumentString(
  `
    fragment Event on events {
  type
  atomId
  blockNumber
  blockTimestamp
  depositId
  feeTransferId
  id
  redemptionId
  transactionHash
  tripleId
}
    `,
  { fragmentName: 'Event' },
) as unknown as TypedDocumentString<EventFragment, unknown>
export const PositionDetailsFragmentDoc = new TypedDocumentString(
  `
    fragment PositionDetails on positions {
  id
  accountId
  shares
  vaultId
}
    `,
  { fragmentName: 'PositionDetails' },
) as unknown as TypedDocumentString<PositionDetailsFragment, unknown>
export const AtomMetadataFragmentDoc = new TypedDocumentString(
  `
    fragment AtomMetadata on atoms {
  data
  id
  image
  label
  emoji
  type
}
    `,
  { fragmentName: 'AtomMetadata' },
) as unknown as TypedDocumentString<AtomMetadataFragment, unknown>
export const AccountMetadataFragmentDoc = new TypedDocumentString(
  `
    fragment AccountMetadata on accounts {
  label
  image
  id
  atomId
  type
}
    `,
  { fragmentName: 'AccountMetadata' },
) as unknown as TypedDocumentString<AccountMetadataFragment, unknown>
export const TripleMetadataFragmentDoc = new TypedDocumentString(
  `
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
    fragment AccountMetadata on accounts {
  label
  image
  id
  atomId
  type
}
fragment AtomMetadata on atoms {
  data
  id
  image
  label
  emoji
  type
}`,
  { fragmentName: 'TripleMetadata' },
) as unknown as TypedDocumentString<TripleMetadataFragment, unknown>
export const TripleTxnFragmentDoc = new TypedDocumentString(
  `
    fragment TripleTxn on triples {
  blockNumber
  blockTimestamp
  transactionHash
  creatorId
}
    `,
  { fragmentName: 'TripleTxn' },
) as unknown as TypedDocumentString<TripleTxnFragment, unknown>
export const VaultDetailsFragmentDoc = new TypedDocumentString(
  `
    fragment VaultDetails on vaults {
  atomId
  currentSharePrice
  id
  positionCount
  totalShares
  tripleId
}
    `,
  { fragmentName: 'VaultDetails' },
) as unknown as TypedDocumentString<VaultDetailsFragment, unknown>
export const TripleVaultDetailsFragmentDoc = new TypedDocumentString(
  `
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
    fragment VaultDetails on vaults {
  atomId
  currentSharePrice
  id
  positionCount
  totalShares
  tripleId
}`,
  { fragmentName: 'TripleVaultDetails' },
) as unknown as TypedDocumentString<TripleVaultDetailsFragment, unknown>
export const GetAtomsDocument = new TypedDocumentString(`
    query GetAtoms($limit: Int, $offset: Int, $orderBy: [atoms_order_by!], $where: atoms_bool_exp) {
  atoms(limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
    ...AtomMetadata
    ...AtomTxn
    ...AtomVaultDetails
    creator {
      ...AccountMetadata
    }
  }
}
    fragment AccountMetadata on accounts {
  label
  image
  id
  atomId
  type
}
fragment AtomMetadata on atoms {
  data
  id
  image
  label
  emoji
  type
}
fragment AtomTxn on atoms {
  blockNumber
  blockTimestamp
  transactionHash
  creatorId
}
fragment AtomVaultDetails on atoms {
  vaultId
  walletId
  vault {
    positionCount
    totalShares
    currentSharePrice
  }
}`) as unknown as TypedDocumentString<GetAtomsQuery, GetAtomsQueryVariables>
export const GetTripleDocument = new TypedDocumentString(`
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
    fragment AccountMetadata on accounts {
  label
  image
  id
  atomId
  type
}
fragment AtomMetadata on atoms {
  data
  id
  image
  label
  emoji
  type
}
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
fragment TripleTxn on triples {
  blockNumber
  blockTimestamp
  transactionHash
  creatorId
}
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
fragment VaultDetails on vaults {
  atomId
  currentSharePrice
  id
  positionCount
  totalShares
  tripleId
}`) as unknown as TypedDocumentString<GetTripleQuery, GetTripleQueryVariables>
export const GetTriplesDocument = new TypedDocumentString(`
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
    fragment AccountMetadata on accounts {
  label
  image
  id
  atomId
  type
}
fragment AtomMetadata on atoms {
  data
  id
  image
  label
  emoji
  type
}
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
fragment TripleTxn on triples {
  blockNumber
  blockTimestamp
  transactionHash
  creatorId
}
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
fragment VaultDetails on vaults {
  atomId
  currentSharePrice
  id
  positionCount
  totalShares
  tripleId
}`) as unknown as TypedDocumentString<GetTriplesQuery, GetTriplesQueryVariables>
