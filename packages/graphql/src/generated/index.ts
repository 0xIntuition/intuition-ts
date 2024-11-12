import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query'
import { DocumentNode } from 'graphql'

import { fetcher } from '../client'

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

export type ThingInput = {
  description?: InputMaybe<Scalars['String']['input']>
  image?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  url?: InputMaybe<Scalars['String']['input']>
}

export type ThingOutput = {
  __typename?: 'ThingOutput'
  cid?: Maybe<Scalars['String']['output']>
}

/** columns and relationships of "Account" */
export type Accounts = {
  __typename?: 'accounts'
  /** An object relationship */
  atom?: Maybe<Atoms>
  atomId?: Maybe<Scalars['numeric']['output']>
  /** An array relationship */
  claims: Array<Claims>
  /** An aggregate relationship */
  claims_aggregate: Claims_Aggregate
  /** An array relationship */
  createdAtoms: Array<Atoms>
  /** An aggregate relationship */
  createdAtoms_aggregate: Atoms_Aggregate
  /** An array relationship */
  createdTriples: Array<Triples>
  /** An aggregate relationship */
  createdTriples_aggregate: Triples_Aggregate
  /** An array relationship */
  deposits: Array<Deposits>
  /** An aggregate relationship */
  deposits_aggregate: Deposits_Aggregate
  /** An array relationship */
  feeTransfers: Array<FeeTranfers>
  /** An aggregate relationship */
  feeTransfers_aggregate: FeeTranfers_Aggregate
  id: Scalars['String']['output']
  image?: Maybe<Scalars['String']['output']>
  label: Scalars['String']['output']
  /** An array relationship */
  positions: Array<Positions>
  /** An aggregate relationship */
  positions_aggregate: Positions_Aggregate
  /** An array relationship */
  redemptions: Array<Redemptions>
  /** An aggregate relationship */
  redemptions_aggregate: Redemptions_Aggregate
  /** An array relationship */
  signals: Array<Signals>
  /** An aggregate relationship */
  signals_aggregate: Signals_Aggregate
  type: Scalars['String']['output']
}

/** columns and relationships of "Account" */
export type AccountsClaimsArgs = {
  distinct_on?: InputMaybe<Array<Claims_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Claims_Order_By>>
  where?: InputMaybe<Claims_Bool_Exp>
}

/** columns and relationships of "Account" */
export type AccountsClaims_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Claims_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Claims_Order_By>>
  where?: InputMaybe<Claims_Bool_Exp>
}

/** columns and relationships of "Account" */
export type AccountsCreatedAtomsArgs = {
  distinct_on?: InputMaybe<Array<Atoms_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Atoms_Order_By>>
  where?: InputMaybe<Atoms_Bool_Exp>
}

/** columns and relationships of "Account" */
export type AccountsCreatedAtoms_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Atoms_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Atoms_Order_By>>
  where?: InputMaybe<Atoms_Bool_Exp>
}

/** columns and relationships of "Account" */
export type AccountsCreatedTriplesArgs = {
  distinct_on?: InputMaybe<Array<Triples_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Triples_Order_By>>
  where?: InputMaybe<Triples_Bool_Exp>
}

/** columns and relationships of "Account" */
export type AccountsCreatedTriples_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Triples_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Triples_Order_By>>
  where?: InputMaybe<Triples_Bool_Exp>
}

/** columns and relationships of "Account" */
export type AccountsDepositsArgs = {
  distinct_on?: InputMaybe<Array<Deposits_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Deposits_Order_By>>
  where?: InputMaybe<Deposits_Bool_Exp>
}

/** columns and relationships of "Account" */
export type AccountsDeposits_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Deposits_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Deposits_Order_By>>
  where?: InputMaybe<Deposits_Bool_Exp>
}

/** columns and relationships of "Account" */
export type AccountsFeeTransfersArgs = {
  distinct_on?: InputMaybe<Array<FeeTranfers_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<FeeTranfers_Order_By>>
  where?: InputMaybe<FeeTranfers_Bool_Exp>
}

/** columns and relationships of "Account" */
export type AccountsFeeTransfers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<FeeTranfers_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<FeeTranfers_Order_By>>
  where?: InputMaybe<FeeTranfers_Bool_Exp>
}

/** columns and relationships of "Account" */
export type AccountsPositionsArgs = {
  distinct_on?: InputMaybe<Array<Positions_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Positions_Order_By>>
  where?: InputMaybe<Positions_Bool_Exp>
}

/** columns and relationships of "Account" */
export type AccountsPositions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Positions_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Positions_Order_By>>
  where?: InputMaybe<Positions_Bool_Exp>
}

/** columns and relationships of "Account" */
export type AccountsRedemptionsArgs = {
  distinct_on?: InputMaybe<Array<Redemptions_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Redemptions_Order_By>>
  where?: InputMaybe<Redemptions_Bool_Exp>
}

/** columns and relationships of "Account" */
export type AccountsRedemptions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Redemptions_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Redemptions_Order_By>>
  where?: InputMaybe<Redemptions_Bool_Exp>
}

/** columns and relationships of "Account" */
export type AccountsSignalsArgs = {
  distinct_on?: InputMaybe<Array<Signals_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Signals_Order_By>>
  where?: InputMaybe<Signals_Bool_Exp>
}

/** columns and relationships of "Account" */
export type AccountsSignals_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Signals_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Signals_Order_By>>
  where?: InputMaybe<Signals_Bool_Exp>
}

/** aggregated selection of "Account" */
export type Accounts_Aggregate = {
  __typename?: 'accounts_aggregate'
  aggregate?: Maybe<Accounts_Aggregate_Fields>
  nodes: Array<Accounts>
}

/** aggregate fields of "Account" */
export type Accounts_Aggregate_Fields = {
  __typename?: 'accounts_aggregate_fields'
  avg?: Maybe<Accounts_Avg_Fields>
  count: Scalars['Int']['output']
  max?: Maybe<Accounts_Max_Fields>
  min?: Maybe<Accounts_Min_Fields>
  stddev?: Maybe<Accounts_Stddev_Fields>
  stddev_pop?: Maybe<Accounts_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Accounts_Stddev_Samp_Fields>
  sum?: Maybe<Accounts_Sum_Fields>
  var_pop?: Maybe<Accounts_Var_Pop_Fields>
  var_samp?: Maybe<Accounts_Var_Samp_Fields>
  variance?: Maybe<Accounts_Variance_Fields>
}

/** aggregate fields of "Account" */
export type Accounts_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Accounts_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
}

/** aggregate avg on columns */
export type Accounts_Avg_Fields = {
  __typename?: 'accounts_avg_fields'
  atomId?: Maybe<Scalars['Float']['output']>
}

/** Boolean expression to filter rows from the table "Account". All fields are combined with a logical 'AND'. */
export type Accounts_Bool_Exp = {
  _and?: InputMaybe<Array<Accounts_Bool_Exp>>
  _not?: InputMaybe<Accounts_Bool_Exp>
  _or?: InputMaybe<Array<Accounts_Bool_Exp>>
  atom?: InputMaybe<Atoms_Bool_Exp>
  atomId?: InputMaybe<Numeric_Comparison_Exp>
  claims?: InputMaybe<Claims_Bool_Exp>
  claims_aggregate?: InputMaybe<Claims_Aggregate_Bool_Exp>
  createdAtoms?: InputMaybe<Atoms_Bool_Exp>
  createdAtoms_aggregate?: InputMaybe<Atoms_Aggregate_Bool_Exp>
  createdTriples?: InputMaybe<Triples_Bool_Exp>
  createdTriples_aggregate?: InputMaybe<Triples_Aggregate_Bool_Exp>
  deposits?: InputMaybe<Deposits_Bool_Exp>
  deposits_aggregate?: InputMaybe<Deposits_Aggregate_Bool_Exp>
  feeTransfers?: InputMaybe<FeeTranfers_Bool_Exp>
  feeTransfers_aggregate?: InputMaybe<FeeTranfers_Aggregate_Bool_Exp>
  id?: InputMaybe<String_Comparison_Exp>
  image?: InputMaybe<String_Comparison_Exp>
  label?: InputMaybe<String_Comparison_Exp>
  positions?: InputMaybe<Positions_Bool_Exp>
  positions_aggregate?: InputMaybe<Positions_Aggregate_Bool_Exp>
  redemptions?: InputMaybe<Redemptions_Bool_Exp>
  redemptions_aggregate?: InputMaybe<Redemptions_Aggregate_Bool_Exp>
  signals?: InputMaybe<Signals_Bool_Exp>
  signals_aggregate?: InputMaybe<Signals_Aggregate_Bool_Exp>
  type?: InputMaybe<String_Comparison_Exp>
}

/** aggregate max on columns */
export type Accounts_Max_Fields = {
  __typename?: 'accounts_max_fields'
  atomId?: Maybe<Scalars['numeric']['output']>
  id?: Maybe<Scalars['String']['output']>
  image?: Maybe<Scalars['String']['output']>
  label?: Maybe<Scalars['String']['output']>
  type?: Maybe<Scalars['String']['output']>
}

/** aggregate min on columns */
export type Accounts_Min_Fields = {
  __typename?: 'accounts_min_fields'
  atomId?: Maybe<Scalars['numeric']['output']>
  id?: Maybe<Scalars['String']['output']>
  image?: Maybe<Scalars['String']['output']>
  label?: Maybe<Scalars['String']['output']>
  type?: Maybe<Scalars['String']['output']>
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
export type Accounts_Select_Column =
  /** column name */
  | 'atomId'
  /** column name */
  | 'id'
  /** column name */
  | 'image'
  /** column name */
  | 'label'
  /** column name */
  | 'type'

/** aggregate stddev on columns */
export type Accounts_Stddev_Fields = {
  __typename?: 'accounts_stddev_fields'
  atomId?: Maybe<Scalars['Float']['output']>
}

/** aggregate stddev_pop on columns */
export type Accounts_Stddev_Pop_Fields = {
  __typename?: 'accounts_stddev_pop_fields'
  atomId?: Maybe<Scalars['Float']['output']>
}

/** aggregate stddev_samp on columns */
export type Accounts_Stddev_Samp_Fields = {
  __typename?: 'accounts_stddev_samp_fields'
  atomId?: Maybe<Scalars['Float']['output']>
}

/** Streaming cursor of the table "accounts" */
export type Accounts_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Accounts_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Accounts_Stream_Cursor_Value_Input = {
  atomId?: InputMaybe<Scalars['numeric']['input']>
  id?: InputMaybe<Scalars['String']['input']>
  image?: InputMaybe<Scalars['String']['input']>
  label?: InputMaybe<Scalars['String']['input']>
  type?: InputMaybe<Scalars['String']['input']>
}

/** aggregate sum on columns */
export type Accounts_Sum_Fields = {
  __typename?: 'accounts_sum_fields'
  atomId?: Maybe<Scalars['numeric']['output']>
}

export type Accounts_That_Claim_About_Account_Args = {
  address?: InputMaybe<Scalars['String']['input']>
  predicate?: InputMaybe<Scalars['numeric']['input']>
  subject?: InputMaybe<Scalars['numeric']['input']>
}

/** aggregate var_pop on columns */
export type Accounts_Var_Pop_Fields = {
  __typename?: 'accounts_var_pop_fields'
  atomId?: Maybe<Scalars['Float']['output']>
}

/** aggregate var_samp on columns */
export type Accounts_Var_Samp_Fields = {
  __typename?: 'accounts_var_samp_fields'
  atomId?: Maybe<Scalars['Float']['output']>
}

/** aggregate variance on columns */
export type Accounts_Variance_Fields = {
  __typename?: 'accounts_variance_fields'
  atomId?: Maybe<Scalars['Float']['output']>
}

/** columns and relationships of "AtomValue" */
export type AtomValues = {
  __typename?: 'atomValues'
  /** An object relationship */
  account?: Maybe<Accounts>
  accountId?: Maybe<Scalars['String']['output']>
  /** An object relationship */
  atom?: Maybe<Atoms>
  atomId: Scalars['numeric']['output']
  /** An object relationship */
  book?: Maybe<Books>
  bookId?: Maybe<Scalars['numeric']['output']>
  id: Scalars['numeric']['output']
  /** An object relationship */
  organization?: Maybe<Organizations>
  organizationId?: Maybe<Scalars['numeric']['output']>
  /** An object relationship */
  person?: Maybe<Persons>
  personId?: Maybe<Scalars['numeric']['output']>
  /** An object relationship */
  thing?: Maybe<Things>
  thingId?: Maybe<Scalars['numeric']['output']>
}

/** aggregated selection of "AtomValue" */
export type AtomValues_Aggregate = {
  __typename?: 'atomValues_aggregate'
  aggregate?: Maybe<AtomValues_Aggregate_Fields>
  nodes: Array<AtomValues>
}

/** aggregate fields of "AtomValue" */
export type AtomValues_Aggregate_Fields = {
  __typename?: 'atomValues_aggregate_fields'
  avg?: Maybe<AtomValues_Avg_Fields>
  count: Scalars['Int']['output']
  max?: Maybe<AtomValues_Max_Fields>
  min?: Maybe<AtomValues_Min_Fields>
  stddev?: Maybe<AtomValues_Stddev_Fields>
  stddev_pop?: Maybe<AtomValues_Stddev_Pop_Fields>
  stddev_samp?: Maybe<AtomValues_Stddev_Samp_Fields>
  sum?: Maybe<AtomValues_Sum_Fields>
  var_pop?: Maybe<AtomValues_Var_Pop_Fields>
  var_samp?: Maybe<AtomValues_Var_Samp_Fields>
  variance?: Maybe<AtomValues_Variance_Fields>
}

/** aggregate fields of "AtomValue" */
export type AtomValues_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<AtomValues_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
}

/** aggregate avg on columns */
export type AtomValues_Avg_Fields = {
  __typename?: 'atomValues_avg_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  bookId?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
  organizationId?: Maybe<Scalars['Float']['output']>
  personId?: Maybe<Scalars['Float']['output']>
  thingId?: Maybe<Scalars['Float']['output']>
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

/** aggregate max on columns */
export type AtomValues_Max_Fields = {
  __typename?: 'atomValues_max_fields'
  accountId?: Maybe<Scalars['String']['output']>
  atomId?: Maybe<Scalars['numeric']['output']>
  bookId?: Maybe<Scalars['numeric']['output']>
  id?: Maybe<Scalars['numeric']['output']>
  organizationId?: Maybe<Scalars['numeric']['output']>
  personId?: Maybe<Scalars['numeric']['output']>
  thingId?: Maybe<Scalars['numeric']['output']>
}

/** aggregate min on columns */
export type AtomValues_Min_Fields = {
  __typename?: 'atomValues_min_fields'
  accountId?: Maybe<Scalars['String']['output']>
  atomId?: Maybe<Scalars['numeric']['output']>
  bookId?: Maybe<Scalars['numeric']['output']>
  id?: Maybe<Scalars['numeric']['output']>
  organizationId?: Maybe<Scalars['numeric']['output']>
  personId?: Maybe<Scalars['numeric']['output']>
  thingId?: Maybe<Scalars['numeric']['output']>
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
export type AtomValues_Select_Column =
  /** column name */
  | 'accountId'
  /** column name */
  | 'atomId'
  /** column name */
  | 'bookId'
  /** column name */
  | 'id'
  /** column name */
  | 'organizationId'
  /** column name */
  | 'personId'
  /** column name */
  | 'thingId'

/** aggregate stddev on columns */
export type AtomValues_Stddev_Fields = {
  __typename?: 'atomValues_stddev_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  bookId?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
  organizationId?: Maybe<Scalars['Float']['output']>
  personId?: Maybe<Scalars['Float']['output']>
  thingId?: Maybe<Scalars['Float']['output']>
}

/** aggregate stddev_pop on columns */
export type AtomValues_Stddev_Pop_Fields = {
  __typename?: 'atomValues_stddev_pop_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  bookId?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
  organizationId?: Maybe<Scalars['Float']['output']>
  personId?: Maybe<Scalars['Float']['output']>
  thingId?: Maybe<Scalars['Float']['output']>
}

/** aggregate stddev_samp on columns */
export type AtomValues_Stddev_Samp_Fields = {
  __typename?: 'atomValues_stddev_samp_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  bookId?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
  organizationId?: Maybe<Scalars['Float']['output']>
  personId?: Maybe<Scalars['Float']['output']>
  thingId?: Maybe<Scalars['Float']['output']>
}

/** Streaming cursor of the table "atomValues" */
export type AtomValues_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: AtomValues_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type AtomValues_Stream_Cursor_Value_Input = {
  accountId?: InputMaybe<Scalars['String']['input']>
  atomId?: InputMaybe<Scalars['numeric']['input']>
  bookId?: InputMaybe<Scalars['numeric']['input']>
  id?: InputMaybe<Scalars['numeric']['input']>
  organizationId?: InputMaybe<Scalars['numeric']['input']>
  personId?: InputMaybe<Scalars['numeric']['input']>
  thingId?: InputMaybe<Scalars['numeric']['input']>
}

/** aggregate sum on columns */
export type AtomValues_Sum_Fields = {
  __typename?: 'atomValues_sum_fields'
  atomId?: Maybe<Scalars['numeric']['output']>
  bookId?: Maybe<Scalars['numeric']['output']>
  id?: Maybe<Scalars['numeric']['output']>
  organizationId?: Maybe<Scalars['numeric']['output']>
  personId?: Maybe<Scalars['numeric']['output']>
  thingId?: Maybe<Scalars['numeric']['output']>
}

/** aggregate var_pop on columns */
export type AtomValues_Var_Pop_Fields = {
  __typename?: 'atomValues_var_pop_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  bookId?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
  organizationId?: Maybe<Scalars['Float']['output']>
  personId?: Maybe<Scalars['Float']['output']>
  thingId?: Maybe<Scalars['Float']['output']>
}

/** aggregate var_samp on columns */
export type AtomValues_Var_Samp_Fields = {
  __typename?: 'atomValues_var_samp_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  bookId?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
  organizationId?: Maybe<Scalars['Float']['output']>
  personId?: Maybe<Scalars['Float']['output']>
  thingId?: Maybe<Scalars['Float']['output']>
}

/** aggregate variance on columns */
export type AtomValues_Variance_Fields = {
  __typename?: 'atomValues_variance_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  bookId?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
  organizationId?: Maybe<Scalars['Float']['output']>
  personId?: Maybe<Scalars['Float']['output']>
  thingId?: Maybe<Scalars['Float']['output']>
}

/** columns and relationships of "Atom" */
export type Atoms = {
  __typename?: 'atoms'
  /** An array relationship */
  asObject: Array<Triples>
  /** An aggregate relationship */
  asObject_aggregate: Triples_Aggregate
  /** An array relationship */
  asPredicate: Array<Triples>
  /** An aggregate relationship */
  asPredicate_aggregate: Triples_Aggregate
  /** An array relationship */
  asSubject: Array<Triples>
  /** An aggregate relationship */
  asSubject_aggregate: Triples_Aggregate
  blockNumber: Scalars['numeric']['output']
  blockTimestamp: Scalars['numeric']['output']
  /** An object relationship */
  creator?: Maybe<Accounts>
  creatorId: Scalars['String']['output']
  data: Scalars['String']['output']
  emoji?: Maybe<Scalars['String']['output']>
  id: Scalars['numeric']['output']
  image?: Maybe<Scalars['String']['output']>
  label?: Maybe<Scalars['String']['output']>
  transactionHash: Scalars['bytea']['output']
  type: Scalars['String']['output']
  /** An object relationship */
  value?: Maybe<AtomValues>
  valueId?: Maybe<Scalars['numeric']['output']>
  /** An object relationship */
  vault?: Maybe<Vaults>
  vaultId: Scalars['numeric']['output']
  walletId: Scalars['String']['output']
}

/** columns and relationships of "Atom" */
export type AtomsAsObjectArgs = {
  distinct_on?: InputMaybe<Array<Triples_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Triples_Order_By>>
  where?: InputMaybe<Triples_Bool_Exp>
}

/** columns and relationships of "Atom" */
export type AtomsAsObject_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Triples_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Triples_Order_By>>
  where?: InputMaybe<Triples_Bool_Exp>
}

/** columns and relationships of "Atom" */
export type AtomsAsPredicateArgs = {
  distinct_on?: InputMaybe<Array<Triples_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Triples_Order_By>>
  where?: InputMaybe<Triples_Bool_Exp>
}

/** columns and relationships of "Atom" */
export type AtomsAsPredicate_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Triples_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Triples_Order_By>>
  where?: InputMaybe<Triples_Bool_Exp>
}

/** columns and relationships of "Atom" */
export type AtomsAsSubjectArgs = {
  distinct_on?: InputMaybe<Array<Triples_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Triples_Order_By>>
  where?: InputMaybe<Triples_Bool_Exp>
}

/** columns and relationships of "Atom" */
export type AtomsAsSubject_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Triples_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Triples_Order_By>>
  where?: InputMaybe<Triples_Bool_Exp>
}

/** aggregated selection of "Atom" */
export type Atoms_Aggregate = {
  __typename?: 'atoms_aggregate'
  aggregate?: Maybe<Atoms_Aggregate_Fields>
  nodes: Array<Atoms>
}

export type Atoms_Aggregate_Bool_Exp = {
  count?: InputMaybe<Atoms_Aggregate_Bool_Exp_Count>
}

export type Atoms_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Atoms_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
  filter?: InputMaybe<Atoms_Bool_Exp>
  predicate: Int_Comparison_Exp
}

/** aggregate fields of "Atom" */
export type Atoms_Aggregate_Fields = {
  __typename?: 'atoms_aggregate_fields'
  avg?: Maybe<Atoms_Avg_Fields>
  count: Scalars['Int']['output']
  max?: Maybe<Atoms_Max_Fields>
  min?: Maybe<Atoms_Min_Fields>
  stddev?: Maybe<Atoms_Stddev_Fields>
  stddev_pop?: Maybe<Atoms_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Atoms_Stddev_Samp_Fields>
  sum?: Maybe<Atoms_Sum_Fields>
  var_pop?: Maybe<Atoms_Var_Pop_Fields>
  var_samp?: Maybe<Atoms_Var_Samp_Fields>
  variance?: Maybe<Atoms_Variance_Fields>
}

/** aggregate fields of "Atom" */
export type Atoms_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Atoms_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
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

/** aggregate avg on columns */
export type Atoms_Avg_Fields = {
  __typename?: 'atoms_avg_fields'
  blockNumber?: Maybe<Scalars['Float']['output']>
  blockTimestamp?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
  valueId?: Maybe<Scalars['Float']['output']>
  vaultId?: Maybe<Scalars['Float']['output']>
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
  asObject_aggregate?: InputMaybe<Triples_Aggregate_Bool_Exp>
  asPredicate?: InputMaybe<Triples_Bool_Exp>
  asPredicate_aggregate?: InputMaybe<Triples_Aggregate_Bool_Exp>
  asSubject?: InputMaybe<Triples_Bool_Exp>
  asSubject_aggregate?: InputMaybe<Triples_Aggregate_Bool_Exp>
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

/** aggregate max on columns */
export type Atoms_Max_Fields = {
  __typename?: 'atoms_max_fields'
  blockNumber?: Maybe<Scalars['numeric']['output']>
  blockTimestamp?: Maybe<Scalars['numeric']['output']>
  creatorId?: Maybe<Scalars['String']['output']>
  data?: Maybe<Scalars['String']['output']>
  emoji?: Maybe<Scalars['String']['output']>
  id?: Maybe<Scalars['numeric']['output']>
  image?: Maybe<Scalars['String']['output']>
  label?: Maybe<Scalars['String']['output']>
  type?: Maybe<Scalars['String']['output']>
  valueId?: Maybe<Scalars['numeric']['output']>
  vaultId?: Maybe<Scalars['numeric']['output']>
  walletId?: Maybe<Scalars['String']['output']>
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

/** aggregate min on columns */
export type Atoms_Min_Fields = {
  __typename?: 'atoms_min_fields'
  blockNumber?: Maybe<Scalars['numeric']['output']>
  blockTimestamp?: Maybe<Scalars['numeric']['output']>
  creatorId?: Maybe<Scalars['String']['output']>
  data?: Maybe<Scalars['String']['output']>
  emoji?: Maybe<Scalars['String']['output']>
  id?: Maybe<Scalars['numeric']['output']>
  image?: Maybe<Scalars['String']['output']>
  label?: Maybe<Scalars['String']['output']>
  type?: Maybe<Scalars['String']['output']>
  valueId?: Maybe<Scalars['numeric']['output']>
  vaultId?: Maybe<Scalars['numeric']['output']>
  walletId?: Maybe<Scalars['String']['output']>
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
export type Atoms_Select_Column =
  /** column name */
  | 'blockNumber'
  /** column name */
  | 'blockTimestamp'
  /** column name */
  | 'creatorId'
  /** column name */
  | 'data'
  /** column name */
  | 'emoji'
  /** column name */
  | 'id'
  /** column name */
  | 'image'
  /** column name */
  | 'label'
  /** column name */
  | 'transactionHash'
  /** column name */
  | 'type'
  /** column name */
  | 'valueId'
  /** column name */
  | 'vaultId'
  /** column name */
  | 'walletId'

/** aggregate stddev on columns */
export type Atoms_Stddev_Fields = {
  __typename?: 'atoms_stddev_fields'
  blockNumber?: Maybe<Scalars['Float']['output']>
  blockTimestamp?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
  valueId?: Maybe<Scalars['Float']['output']>
  vaultId?: Maybe<Scalars['Float']['output']>
}

/** order by stddev() on columns of table "Atom" */
export type Atoms_Stddev_Order_By = {
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  valueId?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Atoms_Stddev_Pop_Fields = {
  __typename?: 'atoms_stddev_pop_fields'
  blockNumber?: Maybe<Scalars['Float']['output']>
  blockTimestamp?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
  valueId?: Maybe<Scalars['Float']['output']>
  vaultId?: Maybe<Scalars['Float']['output']>
}

/** order by stddev_pop() on columns of table "Atom" */
export type Atoms_Stddev_Pop_Order_By = {
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  valueId?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Atoms_Stddev_Samp_Fields = {
  __typename?: 'atoms_stddev_samp_fields'
  blockNumber?: Maybe<Scalars['Float']['output']>
  blockTimestamp?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
  valueId?: Maybe<Scalars['Float']['output']>
  vaultId?: Maybe<Scalars['Float']['output']>
}

/** order by stddev_samp() on columns of table "Atom" */
export type Atoms_Stddev_Samp_Order_By = {
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  valueId?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** Streaming cursor of the table "atoms" */
export type Atoms_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Atoms_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Atoms_Stream_Cursor_Value_Input = {
  blockNumber?: InputMaybe<Scalars['numeric']['input']>
  blockTimestamp?: InputMaybe<Scalars['numeric']['input']>
  creatorId?: InputMaybe<Scalars['String']['input']>
  data?: InputMaybe<Scalars['String']['input']>
  emoji?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['numeric']['input']>
  image?: InputMaybe<Scalars['String']['input']>
  label?: InputMaybe<Scalars['String']['input']>
  transactionHash?: InputMaybe<Scalars['bytea']['input']>
  type?: InputMaybe<Scalars['String']['input']>
  valueId?: InputMaybe<Scalars['numeric']['input']>
  vaultId?: InputMaybe<Scalars['numeric']['input']>
  walletId?: InputMaybe<Scalars['String']['input']>
}

/** aggregate sum on columns */
export type Atoms_Sum_Fields = {
  __typename?: 'atoms_sum_fields'
  blockNumber?: Maybe<Scalars['numeric']['output']>
  blockTimestamp?: Maybe<Scalars['numeric']['output']>
  id?: Maybe<Scalars['numeric']['output']>
  valueId?: Maybe<Scalars['numeric']['output']>
  vaultId?: Maybe<Scalars['numeric']['output']>
}

/** order by sum() on columns of table "Atom" */
export type Atoms_Sum_Order_By = {
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  valueId?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** aggregate var_pop on columns */
export type Atoms_Var_Pop_Fields = {
  __typename?: 'atoms_var_pop_fields'
  blockNumber?: Maybe<Scalars['Float']['output']>
  blockTimestamp?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
  valueId?: Maybe<Scalars['Float']['output']>
  vaultId?: Maybe<Scalars['Float']['output']>
}

/** order by var_pop() on columns of table "Atom" */
export type Atoms_Var_Pop_Order_By = {
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  valueId?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** aggregate var_samp on columns */
export type Atoms_Var_Samp_Fields = {
  __typename?: 'atoms_var_samp_fields'
  blockNumber?: Maybe<Scalars['Float']['output']>
  blockTimestamp?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
  valueId?: Maybe<Scalars['Float']['output']>
  vaultId?: Maybe<Scalars['Float']['output']>
}

/** order by var_samp() on columns of table "Atom" */
export type Atoms_Var_Samp_Order_By = {
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  valueId?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** aggregate variance on columns */
export type Atoms_Variance_Fields = {
  __typename?: 'atoms_variance_fields'
  blockNumber?: Maybe<Scalars['Float']['output']>
  blockTimestamp?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
  valueId?: Maybe<Scalars['Float']['output']>
  vaultId?: Maybe<Scalars['Float']['output']>
}

/** order by variance() on columns of table "Atom" */
export type Atoms_Variance_Order_By = {
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  valueId?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** columns and relationships of "Book" */
export type Books = {
  __typename?: 'books'
  /** An object relationship */
  atom?: Maybe<Atoms>
  atomId: Scalars['numeric']['output']
  description?: Maybe<Scalars['String']['output']>
  genre?: Maybe<Scalars['String']['output']>
  id: Scalars['numeric']['output']
  name?: Maybe<Scalars['String']['output']>
  url?: Maybe<Scalars['String']['output']>
}

/** aggregated selection of "Book" */
export type Books_Aggregate = {
  __typename?: 'books_aggregate'
  aggregate?: Maybe<Books_Aggregate_Fields>
  nodes: Array<Books>
}

/** aggregate fields of "Book" */
export type Books_Aggregate_Fields = {
  __typename?: 'books_aggregate_fields'
  avg?: Maybe<Books_Avg_Fields>
  count: Scalars['Int']['output']
  max?: Maybe<Books_Max_Fields>
  min?: Maybe<Books_Min_Fields>
  stddev?: Maybe<Books_Stddev_Fields>
  stddev_pop?: Maybe<Books_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Books_Stddev_Samp_Fields>
  sum?: Maybe<Books_Sum_Fields>
  var_pop?: Maybe<Books_Var_Pop_Fields>
  var_samp?: Maybe<Books_Var_Samp_Fields>
  variance?: Maybe<Books_Variance_Fields>
}

/** aggregate fields of "Book" */
export type Books_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Books_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
}

/** aggregate avg on columns */
export type Books_Avg_Fields = {
  __typename?: 'books_avg_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
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

/** aggregate max on columns */
export type Books_Max_Fields = {
  __typename?: 'books_max_fields'
  atomId?: Maybe<Scalars['numeric']['output']>
  description?: Maybe<Scalars['String']['output']>
  genre?: Maybe<Scalars['String']['output']>
  id?: Maybe<Scalars['numeric']['output']>
  name?: Maybe<Scalars['String']['output']>
  url?: Maybe<Scalars['String']['output']>
}

/** aggregate min on columns */
export type Books_Min_Fields = {
  __typename?: 'books_min_fields'
  atomId?: Maybe<Scalars['numeric']['output']>
  description?: Maybe<Scalars['String']['output']>
  genre?: Maybe<Scalars['String']['output']>
  id?: Maybe<Scalars['numeric']['output']>
  name?: Maybe<Scalars['String']['output']>
  url?: Maybe<Scalars['String']['output']>
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
export type Books_Select_Column =
  /** column name */
  | 'atomId'
  /** column name */
  | 'description'
  /** column name */
  | 'genre'
  /** column name */
  | 'id'
  /** column name */
  | 'name'
  /** column name */
  | 'url'

/** aggregate stddev on columns */
export type Books_Stddev_Fields = {
  __typename?: 'books_stddev_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
}

/** aggregate stddev_pop on columns */
export type Books_Stddev_Pop_Fields = {
  __typename?: 'books_stddev_pop_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
}

/** aggregate stddev_samp on columns */
export type Books_Stddev_Samp_Fields = {
  __typename?: 'books_stddev_samp_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
}

/** Streaming cursor of the table "books" */
export type Books_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Books_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Books_Stream_Cursor_Value_Input = {
  atomId?: InputMaybe<Scalars['numeric']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  genre?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['numeric']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  url?: InputMaybe<Scalars['String']['input']>
}

/** aggregate sum on columns */
export type Books_Sum_Fields = {
  __typename?: 'books_sum_fields'
  atomId?: Maybe<Scalars['numeric']['output']>
  id?: Maybe<Scalars['numeric']['output']>
}

/** aggregate var_pop on columns */
export type Books_Var_Pop_Fields = {
  __typename?: 'books_var_pop_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
}

/** aggregate var_samp on columns */
export type Books_Var_Samp_Fields = {
  __typename?: 'books_var_samp_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
}

/** aggregate variance on columns */
export type Books_Variance_Fields = {
  __typename?: 'books_variance_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
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

/** columns and relationships of "ChainlinkPrice" */
export type ChainLinkPrices = {
  __typename?: 'chainLinkPrices'
  id: Scalars['numeric']['output']
  usd: Scalars['float8']['output']
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
export type ChainLinkPrices_Select_Column =
  /** column name */
  | 'id'
  /** column name */
  | 'usd'

/** Streaming cursor of the table "chainLinkPrices" */
export type ChainLinkPrices_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: ChainLinkPrices_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type ChainLinkPrices_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['numeric']['input']>
  usd?: InputMaybe<Scalars['float8']['input']>
}

/** columns and relationships of "Claim" */
export type Claims = {
  __typename?: 'claims'
  /** An object relationship */
  account?: Maybe<Accounts>
  accountId: Scalars['String']['output']
  counterShares: Scalars['numeric']['output']
  /** An object relationship */
  counterVault?: Maybe<Vaults>
  counterVaultId: Scalars['numeric']['output']
  id: Scalars['String']['output']
  /** An object relationship */
  object?: Maybe<Atoms>
  objectId: Scalars['numeric']['output']
  /** An object relationship */
  predicate?: Maybe<Atoms>
  predicateId: Scalars['numeric']['output']
  shares: Scalars['numeric']['output']
  /** An object relationship */
  subject?: Maybe<Atoms>
  subjectId: Scalars['numeric']['output']
  /** An object relationship */
  triple?: Maybe<Triples>
  tripleId: Scalars['numeric']['output']
  /** An object relationship */
  vault?: Maybe<Vaults>
  vaultId: Scalars['numeric']['output']
}

/** aggregated selection of "Claim" */
export type Claims_Aggregate = {
  __typename?: 'claims_aggregate'
  aggregate?: Maybe<Claims_Aggregate_Fields>
  nodes: Array<Claims>
}

export type Claims_Aggregate_Bool_Exp = {
  count?: InputMaybe<Claims_Aggregate_Bool_Exp_Count>
}

export type Claims_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Claims_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
  filter?: InputMaybe<Claims_Bool_Exp>
  predicate: Int_Comparison_Exp
}

/** aggregate fields of "Claim" */
export type Claims_Aggregate_Fields = {
  __typename?: 'claims_aggregate_fields'
  avg?: Maybe<Claims_Avg_Fields>
  count: Scalars['Int']['output']
  max?: Maybe<Claims_Max_Fields>
  min?: Maybe<Claims_Min_Fields>
  stddev?: Maybe<Claims_Stddev_Fields>
  stddev_pop?: Maybe<Claims_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Claims_Stddev_Samp_Fields>
  sum?: Maybe<Claims_Sum_Fields>
  var_pop?: Maybe<Claims_Var_Pop_Fields>
  var_samp?: Maybe<Claims_Var_Samp_Fields>
  variance?: Maybe<Claims_Variance_Fields>
}

/** aggregate fields of "Claim" */
export type Claims_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Claims_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
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

/** aggregate avg on columns */
export type Claims_Avg_Fields = {
  __typename?: 'claims_avg_fields'
  counterShares?: Maybe<Scalars['Float']['output']>
  counterVaultId?: Maybe<Scalars['Float']['output']>
  objectId?: Maybe<Scalars['Float']['output']>
  predicateId?: Maybe<Scalars['Float']['output']>
  shares?: Maybe<Scalars['Float']['output']>
  subjectId?: Maybe<Scalars['Float']['output']>
  tripleId?: Maybe<Scalars['Float']['output']>
  vaultId?: Maybe<Scalars['Float']['output']>
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

/** aggregate max on columns */
export type Claims_Max_Fields = {
  __typename?: 'claims_max_fields'
  accountId?: Maybe<Scalars['String']['output']>
  counterShares?: Maybe<Scalars['numeric']['output']>
  counterVaultId?: Maybe<Scalars['numeric']['output']>
  id?: Maybe<Scalars['String']['output']>
  objectId?: Maybe<Scalars['numeric']['output']>
  predicateId?: Maybe<Scalars['numeric']['output']>
  shares?: Maybe<Scalars['numeric']['output']>
  subjectId?: Maybe<Scalars['numeric']['output']>
  tripleId?: Maybe<Scalars['numeric']['output']>
  vaultId?: Maybe<Scalars['numeric']['output']>
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

/** aggregate min on columns */
export type Claims_Min_Fields = {
  __typename?: 'claims_min_fields'
  accountId?: Maybe<Scalars['String']['output']>
  counterShares?: Maybe<Scalars['numeric']['output']>
  counterVaultId?: Maybe<Scalars['numeric']['output']>
  id?: Maybe<Scalars['String']['output']>
  objectId?: Maybe<Scalars['numeric']['output']>
  predicateId?: Maybe<Scalars['numeric']['output']>
  shares?: Maybe<Scalars['numeric']['output']>
  subjectId?: Maybe<Scalars['numeric']['output']>
  tripleId?: Maybe<Scalars['numeric']['output']>
  vaultId?: Maybe<Scalars['numeric']['output']>
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
export type Claims_Select_Column =
  /** column name */
  | 'accountId'
  /** column name */
  | 'counterShares'
  /** column name */
  | 'counterVaultId'
  /** column name */
  | 'id'
  /** column name */
  | 'objectId'
  /** column name */
  | 'predicateId'
  /** column name */
  | 'shares'
  /** column name */
  | 'subjectId'
  /** column name */
  | 'tripleId'
  /** column name */
  | 'vaultId'

/** aggregate stddev on columns */
export type Claims_Stddev_Fields = {
  __typename?: 'claims_stddev_fields'
  counterShares?: Maybe<Scalars['Float']['output']>
  counterVaultId?: Maybe<Scalars['Float']['output']>
  objectId?: Maybe<Scalars['Float']['output']>
  predicateId?: Maybe<Scalars['Float']['output']>
  shares?: Maybe<Scalars['Float']['output']>
  subjectId?: Maybe<Scalars['Float']['output']>
  tripleId?: Maybe<Scalars['Float']['output']>
  vaultId?: Maybe<Scalars['Float']['output']>
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

/** aggregate stddev_pop on columns */
export type Claims_Stddev_Pop_Fields = {
  __typename?: 'claims_stddev_pop_fields'
  counterShares?: Maybe<Scalars['Float']['output']>
  counterVaultId?: Maybe<Scalars['Float']['output']>
  objectId?: Maybe<Scalars['Float']['output']>
  predicateId?: Maybe<Scalars['Float']['output']>
  shares?: Maybe<Scalars['Float']['output']>
  subjectId?: Maybe<Scalars['Float']['output']>
  tripleId?: Maybe<Scalars['Float']['output']>
  vaultId?: Maybe<Scalars['Float']['output']>
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

/** aggregate stddev_samp on columns */
export type Claims_Stddev_Samp_Fields = {
  __typename?: 'claims_stddev_samp_fields'
  counterShares?: Maybe<Scalars['Float']['output']>
  counterVaultId?: Maybe<Scalars['Float']['output']>
  objectId?: Maybe<Scalars['Float']['output']>
  predicateId?: Maybe<Scalars['Float']['output']>
  shares?: Maybe<Scalars['Float']['output']>
  subjectId?: Maybe<Scalars['Float']['output']>
  tripleId?: Maybe<Scalars['Float']['output']>
  vaultId?: Maybe<Scalars['Float']['output']>
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

/** Streaming cursor of the table "claims" */
export type Claims_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Claims_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Claims_Stream_Cursor_Value_Input = {
  accountId?: InputMaybe<Scalars['String']['input']>
  counterShares?: InputMaybe<Scalars['numeric']['input']>
  counterVaultId?: InputMaybe<Scalars['numeric']['input']>
  id?: InputMaybe<Scalars['String']['input']>
  objectId?: InputMaybe<Scalars['numeric']['input']>
  predicateId?: InputMaybe<Scalars['numeric']['input']>
  shares?: InputMaybe<Scalars['numeric']['input']>
  subjectId?: InputMaybe<Scalars['numeric']['input']>
  tripleId?: InputMaybe<Scalars['numeric']['input']>
  vaultId?: InputMaybe<Scalars['numeric']['input']>
}

/** aggregate sum on columns */
export type Claims_Sum_Fields = {
  __typename?: 'claims_sum_fields'
  counterShares?: Maybe<Scalars['numeric']['output']>
  counterVaultId?: Maybe<Scalars['numeric']['output']>
  objectId?: Maybe<Scalars['numeric']['output']>
  predicateId?: Maybe<Scalars['numeric']['output']>
  shares?: Maybe<Scalars['numeric']['output']>
  subjectId?: Maybe<Scalars['numeric']['output']>
  tripleId?: Maybe<Scalars['numeric']['output']>
  vaultId?: Maybe<Scalars['numeric']['output']>
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

/** aggregate var_pop on columns */
export type Claims_Var_Pop_Fields = {
  __typename?: 'claims_var_pop_fields'
  counterShares?: Maybe<Scalars['Float']['output']>
  counterVaultId?: Maybe<Scalars['Float']['output']>
  objectId?: Maybe<Scalars['Float']['output']>
  predicateId?: Maybe<Scalars['Float']['output']>
  shares?: Maybe<Scalars['Float']['output']>
  subjectId?: Maybe<Scalars['Float']['output']>
  tripleId?: Maybe<Scalars['Float']['output']>
  vaultId?: Maybe<Scalars['Float']['output']>
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

/** aggregate var_samp on columns */
export type Claims_Var_Samp_Fields = {
  __typename?: 'claims_var_samp_fields'
  counterShares?: Maybe<Scalars['Float']['output']>
  counterVaultId?: Maybe<Scalars['Float']['output']>
  objectId?: Maybe<Scalars['Float']['output']>
  predicateId?: Maybe<Scalars['Float']['output']>
  shares?: Maybe<Scalars['Float']['output']>
  subjectId?: Maybe<Scalars['Float']['output']>
  tripleId?: Maybe<Scalars['Float']['output']>
  vaultId?: Maybe<Scalars['Float']['output']>
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

/** aggregate variance on columns */
export type Claims_Variance_Fields = {
  __typename?: 'claims_variance_fields'
  counterShares?: Maybe<Scalars['Float']['output']>
  counterVaultId?: Maybe<Scalars['Float']['output']>
  objectId?: Maybe<Scalars['Float']['output']>
  predicateId?: Maybe<Scalars['Float']['output']>
  shares?: Maybe<Scalars['Float']['output']>
  subjectId?: Maybe<Scalars['Float']['output']>
  tripleId?: Maybe<Scalars['Float']['output']>
  vaultId?: Maybe<Scalars['Float']['output']>
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

/** ordering argument of a cursor */
export type Cursor_Ordering =
  /** ascending ordering of the cursor */
  | 'ASC'
  /** descending ordering of the cursor */
  | 'DESC'

/** columns and relationships of "Deposit" */
export type Deposits = {
  __typename?: 'deposits'
  blockNumber: Scalars['numeric']['output']
  blockTimestamp: Scalars['numeric']['output']
  entryFee: Scalars['numeric']['output']
  id: Scalars['String']['output']
  isAtomWallet: Scalars['Int']['output']
  isTriple: Scalars['Int']['output']
  /** An object relationship */
  receiver?: Maybe<Accounts>
  receiverId: Scalars['String']['output']
  receiverTotalSharesInVault: Scalars['numeric']['output']
  /** An object relationship */
  sender?: Maybe<Accounts>
  senderAssetsAfterTotalFees: Scalars['numeric']['output']
  senderId: Scalars['String']['output']
  sharesForReceiver: Scalars['numeric']['output']
  transactionHash: Scalars['bytea']['output']
  /** An object relationship */
  vault?: Maybe<Vaults>
  vaultId: Scalars['numeric']['output']
}

/** aggregated selection of "Deposit" */
export type Deposits_Aggregate = {
  __typename?: 'deposits_aggregate'
  aggregate?: Maybe<Deposits_Aggregate_Fields>
  nodes: Array<Deposits>
}

export type Deposits_Aggregate_Bool_Exp = {
  count?: InputMaybe<Deposits_Aggregate_Bool_Exp_Count>
}

export type Deposits_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Deposits_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
  filter?: InputMaybe<Deposits_Bool_Exp>
  predicate: Int_Comparison_Exp
}

/** aggregate fields of "Deposit" */
export type Deposits_Aggregate_Fields = {
  __typename?: 'deposits_aggregate_fields'
  avg?: Maybe<Deposits_Avg_Fields>
  count: Scalars['Int']['output']
  max?: Maybe<Deposits_Max_Fields>
  min?: Maybe<Deposits_Min_Fields>
  stddev?: Maybe<Deposits_Stddev_Fields>
  stddev_pop?: Maybe<Deposits_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Deposits_Stddev_Samp_Fields>
  sum?: Maybe<Deposits_Sum_Fields>
  var_pop?: Maybe<Deposits_Var_Pop_Fields>
  var_samp?: Maybe<Deposits_Var_Samp_Fields>
  variance?: Maybe<Deposits_Variance_Fields>
}

/** aggregate fields of "Deposit" */
export type Deposits_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Deposits_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
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

/** aggregate avg on columns */
export type Deposits_Avg_Fields = {
  __typename?: 'deposits_avg_fields'
  blockNumber?: Maybe<Scalars['Float']['output']>
  blockTimestamp?: Maybe<Scalars['Float']['output']>
  entryFee?: Maybe<Scalars['Float']['output']>
  isAtomWallet?: Maybe<Scalars['Float']['output']>
  isTriple?: Maybe<Scalars['Float']['output']>
  receiverTotalSharesInVault?: Maybe<Scalars['Float']['output']>
  senderAssetsAfterTotalFees?: Maybe<Scalars['Float']['output']>
  sharesForReceiver?: Maybe<Scalars['Float']['output']>
  vaultId?: Maybe<Scalars['Float']['output']>
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

/** aggregate max on columns */
export type Deposits_Max_Fields = {
  __typename?: 'deposits_max_fields'
  blockNumber?: Maybe<Scalars['numeric']['output']>
  blockTimestamp?: Maybe<Scalars['numeric']['output']>
  entryFee?: Maybe<Scalars['numeric']['output']>
  id?: Maybe<Scalars['String']['output']>
  isAtomWallet?: Maybe<Scalars['Int']['output']>
  isTriple?: Maybe<Scalars['Int']['output']>
  receiverId?: Maybe<Scalars['String']['output']>
  receiverTotalSharesInVault?: Maybe<Scalars['numeric']['output']>
  senderAssetsAfterTotalFees?: Maybe<Scalars['numeric']['output']>
  senderId?: Maybe<Scalars['String']['output']>
  sharesForReceiver?: Maybe<Scalars['numeric']['output']>
  vaultId?: Maybe<Scalars['numeric']['output']>
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

/** aggregate min on columns */
export type Deposits_Min_Fields = {
  __typename?: 'deposits_min_fields'
  blockNumber?: Maybe<Scalars['numeric']['output']>
  blockTimestamp?: Maybe<Scalars['numeric']['output']>
  entryFee?: Maybe<Scalars['numeric']['output']>
  id?: Maybe<Scalars['String']['output']>
  isAtomWallet?: Maybe<Scalars['Int']['output']>
  isTriple?: Maybe<Scalars['Int']['output']>
  receiverId?: Maybe<Scalars['String']['output']>
  receiverTotalSharesInVault?: Maybe<Scalars['numeric']['output']>
  senderAssetsAfterTotalFees?: Maybe<Scalars['numeric']['output']>
  senderId?: Maybe<Scalars['String']['output']>
  sharesForReceiver?: Maybe<Scalars['numeric']['output']>
  vaultId?: Maybe<Scalars['numeric']['output']>
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
export type Deposits_Select_Column =
  /** column name */
  | 'blockNumber'
  /** column name */
  | 'blockTimestamp'
  /** column name */
  | 'entryFee'
  /** column name */
  | 'id'
  /** column name */
  | 'isAtomWallet'
  /** column name */
  | 'isTriple'
  /** column name */
  | 'receiverId'
  /** column name */
  | 'receiverTotalSharesInVault'
  /** column name */
  | 'senderAssetsAfterTotalFees'
  /** column name */
  | 'senderId'
  /** column name */
  | 'sharesForReceiver'
  /** column name */
  | 'transactionHash'
  /** column name */
  | 'vaultId'

/** aggregate stddev on columns */
export type Deposits_Stddev_Fields = {
  __typename?: 'deposits_stddev_fields'
  blockNumber?: Maybe<Scalars['Float']['output']>
  blockTimestamp?: Maybe<Scalars['Float']['output']>
  entryFee?: Maybe<Scalars['Float']['output']>
  isAtomWallet?: Maybe<Scalars['Float']['output']>
  isTriple?: Maybe<Scalars['Float']['output']>
  receiverTotalSharesInVault?: Maybe<Scalars['Float']['output']>
  senderAssetsAfterTotalFees?: Maybe<Scalars['Float']['output']>
  sharesForReceiver?: Maybe<Scalars['Float']['output']>
  vaultId?: Maybe<Scalars['Float']['output']>
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

/** aggregate stddev_pop on columns */
export type Deposits_Stddev_Pop_Fields = {
  __typename?: 'deposits_stddev_pop_fields'
  blockNumber?: Maybe<Scalars['Float']['output']>
  blockTimestamp?: Maybe<Scalars['Float']['output']>
  entryFee?: Maybe<Scalars['Float']['output']>
  isAtomWallet?: Maybe<Scalars['Float']['output']>
  isTriple?: Maybe<Scalars['Float']['output']>
  receiverTotalSharesInVault?: Maybe<Scalars['Float']['output']>
  senderAssetsAfterTotalFees?: Maybe<Scalars['Float']['output']>
  sharesForReceiver?: Maybe<Scalars['Float']['output']>
  vaultId?: Maybe<Scalars['Float']['output']>
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

/** aggregate stddev_samp on columns */
export type Deposits_Stddev_Samp_Fields = {
  __typename?: 'deposits_stddev_samp_fields'
  blockNumber?: Maybe<Scalars['Float']['output']>
  blockTimestamp?: Maybe<Scalars['Float']['output']>
  entryFee?: Maybe<Scalars['Float']['output']>
  isAtomWallet?: Maybe<Scalars['Float']['output']>
  isTriple?: Maybe<Scalars['Float']['output']>
  receiverTotalSharesInVault?: Maybe<Scalars['Float']['output']>
  senderAssetsAfterTotalFees?: Maybe<Scalars['Float']['output']>
  sharesForReceiver?: Maybe<Scalars['Float']['output']>
  vaultId?: Maybe<Scalars['Float']['output']>
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

/** Streaming cursor of the table "deposits" */
export type Deposits_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Deposits_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Deposits_Stream_Cursor_Value_Input = {
  blockNumber?: InputMaybe<Scalars['numeric']['input']>
  blockTimestamp?: InputMaybe<Scalars['numeric']['input']>
  entryFee?: InputMaybe<Scalars['numeric']['input']>
  id?: InputMaybe<Scalars['String']['input']>
  isAtomWallet?: InputMaybe<Scalars['Int']['input']>
  isTriple?: InputMaybe<Scalars['Int']['input']>
  receiverId?: InputMaybe<Scalars['String']['input']>
  receiverTotalSharesInVault?: InputMaybe<Scalars['numeric']['input']>
  senderAssetsAfterTotalFees?: InputMaybe<Scalars['numeric']['input']>
  senderId?: InputMaybe<Scalars['String']['input']>
  sharesForReceiver?: InputMaybe<Scalars['numeric']['input']>
  transactionHash?: InputMaybe<Scalars['bytea']['input']>
  vaultId?: InputMaybe<Scalars['numeric']['input']>
}

/** aggregate sum on columns */
export type Deposits_Sum_Fields = {
  __typename?: 'deposits_sum_fields'
  blockNumber?: Maybe<Scalars['numeric']['output']>
  blockTimestamp?: Maybe<Scalars['numeric']['output']>
  entryFee?: Maybe<Scalars['numeric']['output']>
  isAtomWallet?: Maybe<Scalars['Int']['output']>
  isTriple?: Maybe<Scalars['Int']['output']>
  receiverTotalSharesInVault?: Maybe<Scalars['numeric']['output']>
  senderAssetsAfterTotalFees?: Maybe<Scalars['numeric']['output']>
  sharesForReceiver?: Maybe<Scalars['numeric']['output']>
  vaultId?: Maybe<Scalars['numeric']['output']>
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

/** aggregate var_pop on columns */
export type Deposits_Var_Pop_Fields = {
  __typename?: 'deposits_var_pop_fields'
  blockNumber?: Maybe<Scalars['Float']['output']>
  blockTimestamp?: Maybe<Scalars['Float']['output']>
  entryFee?: Maybe<Scalars['Float']['output']>
  isAtomWallet?: Maybe<Scalars['Float']['output']>
  isTriple?: Maybe<Scalars['Float']['output']>
  receiverTotalSharesInVault?: Maybe<Scalars['Float']['output']>
  senderAssetsAfterTotalFees?: Maybe<Scalars['Float']['output']>
  sharesForReceiver?: Maybe<Scalars['Float']['output']>
  vaultId?: Maybe<Scalars['Float']['output']>
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

/** aggregate var_samp on columns */
export type Deposits_Var_Samp_Fields = {
  __typename?: 'deposits_var_samp_fields'
  blockNumber?: Maybe<Scalars['Float']['output']>
  blockTimestamp?: Maybe<Scalars['Float']['output']>
  entryFee?: Maybe<Scalars['Float']['output']>
  isAtomWallet?: Maybe<Scalars['Float']['output']>
  isTriple?: Maybe<Scalars['Float']['output']>
  receiverTotalSharesInVault?: Maybe<Scalars['Float']['output']>
  senderAssetsAfterTotalFees?: Maybe<Scalars['Float']['output']>
  sharesForReceiver?: Maybe<Scalars['Float']['output']>
  vaultId?: Maybe<Scalars['Float']['output']>
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

/** aggregate variance on columns */
export type Deposits_Variance_Fields = {
  __typename?: 'deposits_variance_fields'
  blockNumber?: Maybe<Scalars['Float']['output']>
  blockTimestamp?: Maybe<Scalars['Float']['output']>
  entryFee?: Maybe<Scalars['Float']['output']>
  isAtomWallet?: Maybe<Scalars['Float']['output']>
  isTriple?: Maybe<Scalars['Float']['output']>
  receiverTotalSharesInVault?: Maybe<Scalars['Float']['output']>
  senderAssetsAfterTotalFees?: Maybe<Scalars['Float']['output']>
  sharesForReceiver?: Maybe<Scalars['Float']['output']>
  vaultId?: Maybe<Scalars['Float']['output']>
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

/** columns and relationships of "Event" */
export type Events = {
  __typename?: 'events'
  /** An object relationship */
  atom?: Maybe<Atoms>
  atomId?: Maybe<Scalars['numeric']['output']>
  blockNumber: Scalars['numeric']['output']
  blockTimestamp: Scalars['numeric']['output']
  /** An object relationship */
  deposit?: Maybe<Deposits>
  depositId?: Maybe<Scalars['String']['output']>
  /** An object relationship */
  feeTransfer?: Maybe<FeeTranfers>
  feeTransferId?: Maybe<Scalars['String']['output']>
  id: Scalars['String']['output']
  /** An object relationship */
  redemption?: Maybe<Redemptions>
  redemptionId?: Maybe<Scalars['String']['output']>
  transactionHash: Scalars['bytea']['output']
  /** An object relationship */
  triple?: Maybe<Triples>
  tripleId?: Maybe<Scalars['numeric']['output']>
  type: Scalars['String']['output']
}

/** aggregated selection of "Event" */
export type Events_Aggregate = {
  __typename?: 'events_aggregate'
  aggregate?: Maybe<Events_Aggregate_Fields>
  nodes: Array<Events>
}

/** aggregate fields of "Event" */
export type Events_Aggregate_Fields = {
  __typename?: 'events_aggregate_fields'
  avg?: Maybe<Events_Avg_Fields>
  count: Scalars['Int']['output']
  max?: Maybe<Events_Max_Fields>
  min?: Maybe<Events_Min_Fields>
  stddev?: Maybe<Events_Stddev_Fields>
  stddev_pop?: Maybe<Events_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Events_Stddev_Samp_Fields>
  sum?: Maybe<Events_Sum_Fields>
  var_pop?: Maybe<Events_Var_Pop_Fields>
  var_samp?: Maybe<Events_Var_Samp_Fields>
  variance?: Maybe<Events_Variance_Fields>
}

/** aggregate fields of "Event" */
export type Events_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Events_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
}

/** aggregate avg on columns */
export type Events_Avg_Fields = {
  __typename?: 'events_avg_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  blockNumber?: Maybe<Scalars['Float']['output']>
  blockTimestamp?: Maybe<Scalars['Float']['output']>
  tripleId?: Maybe<Scalars['Float']['output']>
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

/** aggregate max on columns */
export type Events_Max_Fields = {
  __typename?: 'events_max_fields'
  atomId?: Maybe<Scalars['numeric']['output']>
  blockNumber?: Maybe<Scalars['numeric']['output']>
  blockTimestamp?: Maybe<Scalars['numeric']['output']>
  depositId?: Maybe<Scalars['String']['output']>
  feeTransferId?: Maybe<Scalars['String']['output']>
  id?: Maybe<Scalars['String']['output']>
  redemptionId?: Maybe<Scalars['String']['output']>
  tripleId?: Maybe<Scalars['numeric']['output']>
  type?: Maybe<Scalars['String']['output']>
}

/** aggregate min on columns */
export type Events_Min_Fields = {
  __typename?: 'events_min_fields'
  atomId?: Maybe<Scalars['numeric']['output']>
  blockNumber?: Maybe<Scalars['numeric']['output']>
  blockTimestamp?: Maybe<Scalars['numeric']['output']>
  depositId?: Maybe<Scalars['String']['output']>
  feeTransferId?: Maybe<Scalars['String']['output']>
  id?: Maybe<Scalars['String']['output']>
  redemptionId?: Maybe<Scalars['String']['output']>
  tripleId?: Maybe<Scalars['numeric']['output']>
  type?: Maybe<Scalars['String']['output']>
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
export type Events_Select_Column =
  /** column name */
  | 'atomId'
  /** column name */
  | 'blockNumber'
  /** column name */
  | 'blockTimestamp'
  /** column name */
  | 'depositId'
  /** column name */
  | 'feeTransferId'
  /** column name */
  | 'id'
  /** column name */
  | 'redemptionId'
  /** column name */
  | 'transactionHash'
  /** column name */
  | 'tripleId'
  /** column name */
  | 'type'

/** aggregate stddev on columns */
export type Events_Stddev_Fields = {
  __typename?: 'events_stddev_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  blockNumber?: Maybe<Scalars['Float']['output']>
  blockTimestamp?: Maybe<Scalars['Float']['output']>
  tripleId?: Maybe<Scalars['Float']['output']>
}

/** aggregate stddev_pop on columns */
export type Events_Stddev_Pop_Fields = {
  __typename?: 'events_stddev_pop_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  blockNumber?: Maybe<Scalars['Float']['output']>
  blockTimestamp?: Maybe<Scalars['Float']['output']>
  tripleId?: Maybe<Scalars['Float']['output']>
}

/** aggregate stddev_samp on columns */
export type Events_Stddev_Samp_Fields = {
  __typename?: 'events_stddev_samp_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  blockNumber?: Maybe<Scalars['Float']['output']>
  blockTimestamp?: Maybe<Scalars['Float']['output']>
  tripleId?: Maybe<Scalars['Float']['output']>
}

/** Streaming cursor of the table "events" */
export type Events_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Events_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Events_Stream_Cursor_Value_Input = {
  atomId?: InputMaybe<Scalars['numeric']['input']>
  blockNumber?: InputMaybe<Scalars['numeric']['input']>
  blockTimestamp?: InputMaybe<Scalars['numeric']['input']>
  depositId?: InputMaybe<Scalars['String']['input']>
  feeTransferId?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['String']['input']>
  redemptionId?: InputMaybe<Scalars['String']['input']>
  transactionHash?: InputMaybe<Scalars['bytea']['input']>
  tripleId?: InputMaybe<Scalars['numeric']['input']>
  type?: InputMaybe<Scalars['String']['input']>
}

/** aggregate sum on columns */
export type Events_Sum_Fields = {
  __typename?: 'events_sum_fields'
  atomId?: Maybe<Scalars['numeric']['output']>
  blockNumber?: Maybe<Scalars['numeric']['output']>
  blockTimestamp?: Maybe<Scalars['numeric']['output']>
  tripleId?: Maybe<Scalars['numeric']['output']>
}

/** aggregate var_pop on columns */
export type Events_Var_Pop_Fields = {
  __typename?: 'events_var_pop_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  blockNumber?: Maybe<Scalars['Float']['output']>
  blockTimestamp?: Maybe<Scalars['Float']['output']>
  tripleId?: Maybe<Scalars['Float']['output']>
}

/** aggregate var_samp on columns */
export type Events_Var_Samp_Fields = {
  __typename?: 'events_var_samp_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  blockNumber?: Maybe<Scalars['Float']['output']>
  blockTimestamp?: Maybe<Scalars['Float']['output']>
  tripleId?: Maybe<Scalars['Float']['output']>
}

/** aggregate variance on columns */
export type Events_Variance_Fields = {
  __typename?: 'events_variance_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  blockNumber?: Maybe<Scalars['Float']['output']>
  blockTimestamp?: Maybe<Scalars['Float']['output']>
  tripleId?: Maybe<Scalars['Float']['output']>
}

/** columns and relationships of "FeeTransfer" */
export type FeeTranfers = {
  __typename?: 'feeTranfers'
  amount: Scalars['numeric']['output']
  blockNumber: Scalars['numeric']['output']
  blockTimestamp: Scalars['numeric']['output']
  id: Scalars['String']['output']
  /** An object relationship */
  receiver?: Maybe<Accounts>
  receiverId: Scalars['String']['output']
  /** An object relationship */
  sender?: Maybe<Accounts>
  senderId: Scalars['String']['output']
  transactionHash: Scalars['bytea']['output']
}

/** aggregated selection of "FeeTransfer" */
export type FeeTranfers_Aggregate = {
  __typename?: 'feeTranfers_aggregate'
  aggregate?: Maybe<FeeTranfers_Aggregate_Fields>
  nodes: Array<FeeTranfers>
}

export type FeeTranfers_Aggregate_Bool_Exp = {
  count?: InputMaybe<FeeTranfers_Aggregate_Bool_Exp_Count>
}

export type FeeTranfers_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<FeeTranfers_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
  filter?: InputMaybe<FeeTranfers_Bool_Exp>
  predicate: Int_Comparison_Exp
}

/** aggregate fields of "FeeTransfer" */
export type FeeTranfers_Aggregate_Fields = {
  __typename?: 'feeTranfers_aggregate_fields'
  avg?: Maybe<FeeTranfers_Avg_Fields>
  count: Scalars['Int']['output']
  max?: Maybe<FeeTranfers_Max_Fields>
  min?: Maybe<FeeTranfers_Min_Fields>
  stddev?: Maybe<FeeTranfers_Stddev_Fields>
  stddev_pop?: Maybe<FeeTranfers_Stddev_Pop_Fields>
  stddev_samp?: Maybe<FeeTranfers_Stddev_Samp_Fields>
  sum?: Maybe<FeeTranfers_Sum_Fields>
  var_pop?: Maybe<FeeTranfers_Var_Pop_Fields>
  var_samp?: Maybe<FeeTranfers_Var_Samp_Fields>
  variance?: Maybe<FeeTranfers_Variance_Fields>
}

/** aggregate fields of "FeeTransfer" */
export type FeeTranfers_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<FeeTranfers_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
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

/** aggregate avg on columns */
export type FeeTranfers_Avg_Fields = {
  __typename?: 'feeTranfers_avg_fields'
  amount?: Maybe<Scalars['Float']['output']>
  blockNumber?: Maybe<Scalars['Float']['output']>
  blockTimestamp?: Maybe<Scalars['Float']['output']>
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

/** aggregate max on columns */
export type FeeTranfers_Max_Fields = {
  __typename?: 'feeTranfers_max_fields'
  amount?: Maybe<Scalars['numeric']['output']>
  blockNumber?: Maybe<Scalars['numeric']['output']>
  blockTimestamp?: Maybe<Scalars['numeric']['output']>
  id?: Maybe<Scalars['String']['output']>
  receiverId?: Maybe<Scalars['String']['output']>
  senderId?: Maybe<Scalars['String']['output']>
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

/** aggregate min on columns */
export type FeeTranfers_Min_Fields = {
  __typename?: 'feeTranfers_min_fields'
  amount?: Maybe<Scalars['numeric']['output']>
  blockNumber?: Maybe<Scalars['numeric']['output']>
  blockTimestamp?: Maybe<Scalars['numeric']['output']>
  id?: Maybe<Scalars['String']['output']>
  receiverId?: Maybe<Scalars['String']['output']>
  senderId?: Maybe<Scalars['String']['output']>
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
export type FeeTranfers_Select_Column =
  /** column name */
  | 'amount'
  /** column name */
  | 'blockNumber'
  /** column name */
  | 'blockTimestamp'
  /** column name */
  | 'id'
  /** column name */
  | 'receiverId'
  /** column name */
  | 'senderId'
  /** column name */
  | 'transactionHash'

/** aggregate stddev on columns */
export type FeeTranfers_Stddev_Fields = {
  __typename?: 'feeTranfers_stddev_fields'
  amount?: Maybe<Scalars['Float']['output']>
  blockNumber?: Maybe<Scalars['Float']['output']>
  blockTimestamp?: Maybe<Scalars['Float']['output']>
}

/** order by stddev() on columns of table "FeeTransfer" */
export type FeeTranfers_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type FeeTranfers_Stddev_Pop_Fields = {
  __typename?: 'feeTranfers_stddev_pop_fields'
  amount?: Maybe<Scalars['Float']['output']>
  blockNumber?: Maybe<Scalars['Float']['output']>
  blockTimestamp?: Maybe<Scalars['Float']['output']>
}

/** order by stddev_pop() on columns of table "FeeTransfer" */
export type FeeTranfers_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type FeeTranfers_Stddev_Samp_Fields = {
  __typename?: 'feeTranfers_stddev_samp_fields'
  amount?: Maybe<Scalars['Float']['output']>
  blockNumber?: Maybe<Scalars['Float']['output']>
  blockTimestamp?: Maybe<Scalars['Float']['output']>
}

/** order by stddev_samp() on columns of table "FeeTransfer" */
export type FeeTranfers_Stddev_Samp_Order_By = {
  amount?: InputMaybe<Order_By>
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
}

/** Streaming cursor of the table "feeTranfers" */
export type FeeTranfers_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: FeeTranfers_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type FeeTranfers_Stream_Cursor_Value_Input = {
  amount?: InputMaybe<Scalars['numeric']['input']>
  blockNumber?: InputMaybe<Scalars['numeric']['input']>
  blockTimestamp?: InputMaybe<Scalars['numeric']['input']>
  id?: InputMaybe<Scalars['String']['input']>
  receiverId?: InputMaybe<Scalars['String']['input']>
  senderId?: InputMaybe<Scalars['String']['input']>
  transactionHash?: InputMaybe<Scalars['bytea']['input']>
}

/** aggregate sum on columns */
export type FeeTranfers_Sum_Fields = {
  __typename?: 'feeTranfers_sum_fields'
  amount?: Maybe<Scalars['numeric']['output']>
  blockNumber?: Maybe<Scalars['numeric']['output']>
  blockTimestamp?: Maybe<Scalars['numeric']['output']>
}

/** order by sum() on columns of table "FeeTransfer" */
export type FeeTranfers_Sum_Order_By = {
  amount?: InputMaybe<Order_By>
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
}

/** aggregate var_pop on columns */
export type FeeTranfers_Var_Pop_Fields = {
  __typename?: 'feeTranfers_var_pop_fields'
  amount?: Maybe<Scalars['Float']['output']>
  blockNumber?: Maybe<Scalars['Float']['output']>
  blockTimestamp?: Maybe<Scalars['Float']['output']>
}

/** order by var_pop() on columns of table "FeeTransfer" */
export type FeeTranfers_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
}

/** aggregate var_samp on columns */
export type FeeTranfers_Var_Samp_Fields = {
  __typename?: 'feeTranfers_var_samp_fields'
  amount?: Maybe<Scalars['Float']['output']>
  blockNumber?: Maybe<Scalars['Float']['output']>
  blockTimestamp?: Maybe<Scalars['Float']['output']>
}

/** order by var_samp() on columns of table "FeeTransfer" */
export type FeeTranfers_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>
  blockNumber?: InputMaybe<Order_By>
  blockTimestamp?: InputMaybe<Order_By>
}

/** aggregate variance on columns */
export type FeeTranfers_Variance_Fields = {
  __typename?: 'feeTranfers_variance_fields'
  amount?: Maybe<Scalars['Float']['output']>
  blockNumber?: Maybe<Scalars['Float']['output']>
  blockTimestamp?: Maybe<Scalars['Float']['output']>
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

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root'
  /** Uploads Thing to IPFS */
  uploadThing?: Maybe<ThingOutput>
}

/** mutation root */
export type Mutation_RootUploadThingArgs = {
  arg1: ThingInput
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
export type Order_By =
  /** in ascending order, nulls last */
  | 'asc'
  /** in ascending order, nulls first */
  | 'asc_nulls_first'
  /** in ascending order, nulls last */
  | 'asc_nulls_last'
  /** in descending order, nulls first */
  | 'desc'
  /** in descending order, nulls first */
  | 'desc_nulls_first'
  /** in descending order, nulls last */
  | 'desc_nulls_last'

/** columns and relationships of "Organization" */
export type Organizations = {
  __typename?: 'organizations'
  /** An object relationship */
  atom?: Maybe<Atoms>
  atomId: Scalars['numeric']['output']
  description?: Maybe<Scalars['String']['output']>
  email?: Maybe<Scalars['String']['output']>
  id: Scalars['numeric']['output']
  image?: Maybe<Scalars['String']['output']>
  name?: Maybe<Scalars['String']['output']>
  url?: Maybe<Scalars['String']['output']>
}

/** aggregated selection of "Organization" */
export type Organizations_Aggregate = {
  __typename?: 'organizations_aggregate'
  aggregate?: Maybe<Organizations_Aggregate_Fields>
  nodes: Array<Organizations>
}

/** aggregate fields of "Organization" */
export type Organizations_Aggregate_Fields = {
  __typename?: 'organizations_aggregate_fields'
  avg?: Maybe<Organizations_Avg_Fields>
  count: Scalars['Int']['output']
  max?: Maybe<Organizations_Max_Fields>
  min?: Maybe<Organizations_Min_Fields>
  stddev?: Maybe<Organizations_Stddev_Fields>
  stddev_pop?: Maybe<Organizations_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Organizations_Stddev_Samp_Fields>
  sum?: Maybe<Organizations_Sum_Fields>
  var_pop?: Maybe<Organizations_Var_Pop_Fields>
  var_samp?: Maybe<Organizations_Var_Samp_Fields>
  variance?: Maybe<Organizations_Variance_Fields>
}

/** aggregate fields of "Organization" */
export type Organizations_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Organizations_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
}

/** aggregate avg on columns */
export type Organizations_Avg_Fields = {
  __typename?: 'organizations_avg_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
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

/** aggregate max on columns */
export type Organizations_Max_Fields = {
  __typename?: 'organizations_max_fields'
  atomId?: Maybe<Scalars['numeric']['output']>
  description?: Maybe<Scalars['String']['output']>
  email?: Maybe<Scalars['String']['output']>
  id?: Maybe<Scalars['numeric']['output']>
  image?: Maybe<Scalars['String']['output']>
  name?: Maybe<Scalars['String']['output']>
  url?: Maybe<Scalars['String']['output']>
}

/** aggregate min on columns */
export type Organizations_Min_Fields = {
  __typename?: 'organizations_min_fields'
  atomId?: Maybe<Scalars['numeric']['output']>
  description?: Maybe<Scalars['String']['output']>
  email?: Maybe<Scalars['String']['output']>
  id?: Maybe<Scalars['numeric']['output']>
  image?: Maybe<Scalars['String']['output']>
  name?: Maybe<Scalars['String']['output']>
  url?: Maybe<Scalars['String']['output']>
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
export type Organizations_Select_Column =
  /** column name */
  | 'atomId'
  /** column name */
  | 'description'
  /** column name */
  | 'email'
  /** column name */
  | 'id'
  /** column name */
  | 'image'
  /** column name */
  | 'name'
  /** column name */
  | 'url'

/** aggregate stddev on columns */
export type Organizations_Stddev_Fields = {
  __typename?: 'organizations_stddev_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
}

/** aggregate stddev_pop on columns */
export type Organizations_Stddev_Pop_Fields = {
  __typename?: 'organizations_stddev_pop_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
}

/** aggregate stddev_samp on columns */
export type Organizations_Stddev_Samp_Fields = {
  __typename?: 'organizations_stddev_samp_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
}

/** Streaming cursor of the table "organizations" */
export type Organizations_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Organizations_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Organizations_Stream_Cursor_Value_Input = {
  atomId?: InputMaybe<Scalars['numeric']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  email?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['numeric']['input']>
  image?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  url?: InputMaybe<Scalars['String']['input']>
}

/** aggregate sum on columns */
export type Organizations_Sum_Fields = {
  __typename?: 'organizations_sum_fields'
  atomId?: Maybe<Scalars['numeric']['output']>
  id?: Maybe<Scalars['numeric']['output']>
}

/** aggregate var_pop on columns */
export type Organizations_Var_Pop_Fields = {
  __typename?: 'organizations_var_pop_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
}

/** aggregate var_samp on columns */
export type Organizations_Var_Samp_Fields = {
  __typename?: 'organizations_var_samp_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
}

/** aggregate variance on columns */
export type Organizations_Variance_Fields = {
  __typename?: 'organizations_variance_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
}

/** columns and relationships of "Person" */
export type Persons = {
  __typename?: 'persons'
  /** An object relationship */
  atom?: Maybe<Atoms>
  atomId: Scalars['numeric']['output']
  description?: Maybe<Scalars['String']['output']>
  email?: Maybe<Scalars['String']['output']>
  id: Scalars['numeric']['output']
  identifier?: Maybe<Scalars['String']['output']>
  image?: Maybe<Scalars['String']['output']>
  name?: Maybe<Scalars['String']['output']>
  url?: Maybe<Scalars['String']['output']>
}

/** aggregated selection of "Person" */
export type Persons_Aggregate = {
  __typename?: 'persons_aggregate'
  aggregate?: Maybe<Persons_Aggregate_Fields>
  nodes: Array<Persons>
}

/** aggregate fields of "Person" */
export type Persons_Aggregate_Fields = {
  __typename?: 'persons_aggregate_fields'
  avg?: Maybe<Persons_Avg_Fields>
  count: Scalars['Int']['output']
  max?: Maybe<Persons_Max_Fields>
  min?: Maybe<Persons_Min_Fields>
  stddev?: Maybe<Persons_Stddev_Fields>
  stddev_pop?: Maybe<Persons_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Persons_Stddev_Samp_Fields>
  sum?: Maybe<Persons_Sum_Fields>
  var_pop?: Maybe<Persons_Var_Pop_Fields>
  var_samp?: Maybe<Persons_Var_Samp_Fields>
  variance?: Maybe<Persons_Variance_Fields>
}

/** aggregate fields of "Person" */
export type Persons_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Persons_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
}

/** aggregate avg on columns */
export type Persons_Avg_Fields = {
  __typename?: 'persons_avg_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
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

/** aggregate max on columns */
export type Persons_Max_Fields = {
  __typename?: 'persons_max_fields'
  atomId?: Maybe<Scalars['numeric']['output']>
  description?: Maybe<Scalars['String']['output']>
  email?: Maybe<Scalars['String']['output']>
  id?: Maybe<Scalars['numeric']['output']>
  identifier?: Maybe<Scalars['String']['output']>
  image?: Maybe<Scalars['String']['output']>
  name?: Maybe<Scalars['String']['output']>
  url?: Maybe<Scalars['String']['output']>
}

/** aggregate min on columns */
export type Persons_Min_Fields = {
  __typename?: 'persons_min_fields'
  atomId?: Maybe<Scalars['numeric']['output']>
  description?: Maybe<Scalars['String']['output']>
  email?: Maybe<Scalars['String']['output']>
  id?: Maybe<Scalars['numeric']['output']>
  identifier?: Maybe<Scalars['String']['output']>
  image?: Maybe<Scalars['String']['output']>
  name?: Maybe<Scalars['String']['output']>
  url?: Maybe<Scalars['String']['output']>
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
export type Persons_Select_Column =
  /** column name */
  | 'atomId'
  /** column name */
  | 'description'
  /** column name */
  | 'email'
  /** column name */
  | 'id'
  /** column name */
  | 'identifier'
  /** column name */
  | 'image'
  /** column name */
  | 'name'
  /** column name */
  | 'url'

/** aggregate stddev on columns */
export type Persons_Stddev_Fields = {
  __typename?: 'persons_stddev_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
}

/** aggregate stddev_pop on columns */
export type Persons_Stddev_Pop_Fields = {
  __typename?: 'persons_stddev_pop_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
}

/** aggregate stddev_samp on columns */
export type Persons_Stddev_Samp_Fields = {
  __typename?: 'persons_stddev_samp_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
}

/** Streaming cursor of the table "persons" */
export type Persons_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Persons_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Persons_Stream_Cursor_Value_Input = {
  atomId?: InputMaybe<Scalars['numeric']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  email?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['numeric']['input']>
  identifier?: InputMaybe<Scalars['String']['input']>
  image?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  url?: InputMaybe<Scalars['String']['input']>
}

/** aggregate sum on columns */
export type Persons_Sum_Fields = {
  __typename?: 'persons_sum_fields'
  atomId?: Maybe<Scalars['numeric']['output']>
  id?: Maybe<Scalars['numeric']['output']>
}

/** aggregate var_pop on columns */
export type Persons_Var_Pop_Fields = {
  __typename?: 'persons_var_pop_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
}

/** aggregate var_samp on columns */
export type Persons_Var_Samp_Fields = {
  __typename?: 'persons_var_samp_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
}

/** aggregate variance on columns */
export type Persons_Variance_Fields = {
  __typename?: 'persons_variance_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
}

/** columns and relationships of "Position" */
export type Positions = {
  __typename?: 'positions'
  /** An object relationship */
  account?: Maybe<Accounts>
  accountId: Scalars['String']['output']
  id: Scalars['String']['output']
  shares: Scalars['numeric']['output']
  /** An object relationship */
  vault?: Maybe<Vaults>
  vaultId: Scalars['numeric']['output']
}

/** aggregated selection of "Position" */
export type Positions_Aggregate = {
  __typename?: 'positions_aggregate'
  aggregate?: Maybe<Positions_Aggregate_Fields>
  nodes: Array<Positions>
}

export type Positions_Aggregate_Bool_Exp = {
  count?: InputMaybe<Positions_Aggregate_Bool_Exp_Count>
}

export type Positions_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Positions_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
  filter?: InputMaybe<Positions_Bool_Exp>
  predicate: Int_Comparison_Exp
}

/** aggregate fields of "Position" */
export type Positions_Aggregate_Fields = {
  __typename?: 'positions_aggregate_fields'
  avg?: Maybe<Positions_Avg_Fields>
  count: Scalars['Int']['output']
  max?: Maybe<Positions_Max_Fields>
  min?: Maybe<Positions_Min_Fields>
  stddev?: Maybe<Positions_Stddev_Fields>
  stddev_pop?: Maybe<Positions_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Positions_Stddev_Samp_Fields>
  sum?: Maybe<Positions_Sum_Fields>
  var_pop?: Maybe<Positions_Var_Pop_Fields>
  var_samp?: Maybe<Positions_Var_Samp_Fields>
  variance?: Maybe<Positions_Variance_Fields>
}

/** aggregate fields of "Position" */
export type Positions_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Positions_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
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

/** aggregate avg on columns */
export type Positions_Avg_Fields = {
  __typename?: 'positions_avg_fields'
  shares?: Maybe<Scalars['Float']['output']>
  vaultId?: Maybe<Scalars['Float']['output']>
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

/** aggregate max on columns */
export type Positions_Max_Fields = {
  __typename?: 'positions_max_fields'
  accountId?: Maybe<Scalars['String']['output']>
  id?: Maybe<Scalars['String']['output']>
  shares?: Maybe<Scalars['numeric']['output']>
  vaultId?: Maybe<Scalars['numeric']['output']>
}

/** order by max() on columns of table "Position" */
export type Positions_Max_Order_By = {
  accountId?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  shares?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** aggregate min on columns */
export type Positions_Min_Fields = {
  __typename?: 'positions_min_fields'
  accountId?: Maybe<Scalars['String']['output']>
  id?: Maybe<Scalars['String']['output']>
  shares?: Maybe<Scalars['numeric']['output']>
  vaultId?: Maybe<Scalars['numeric']['output']>
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
export type Positions_Select_Column =
  /** column name */
  | 'accountId'
  /** column name */
  | 'id'
  /** column name */
  | 'shares'
  /** column name */
  | 'vaultId'

/** aggregate stddev on columns */
export type Positions_Stddev_Fields = {
  __typename?: 'positions_stddev_fields'
  shares?: Maybe<Scalars['Float']['output']>
  vaultId?: Maybe<Scalars['Float']['output']>
}

/** order by stddev() on columns of table "Position" */
export type Positions_Stddev_Order_By = {
  shares?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Positions_Stddev_Pop_Fields = {
  __typename?: 'positions_stddev_pop_fields'
  shares?: Maybe<Scalars['Float']['output']>
  vaultId?: Maybe<Scalars['Float']['output']>
}

/** order by stddev_pop() on columns of table "Position" */
export type Positions_Stddev_Pop_Order_By = {
  shares?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Positions_Stddev_Samp_Fields = {
  __typename?: 'positions_stddev_samp_fields'
  shares?: Maybe<Scalars['Float']['output']>
  vaultId?: Maybe<Scalars['Float']['output']>
}

/** order by stddev_samp() on columns of table "Position" */
export type Positions_Stddev_Samp_Order_By = {
  shares?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** Streaming cursor of the table "positions" */
export type Positions_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Positions_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Positions_Stream_Cursor_Value_Input = {
  accountId?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['String']['input']>
  shares?: InputMaybe<Scalars['numeric']['input']>
  vaultId?: InputMaybe<Scalars['numeric']['input']>
}

/** aggregate sum on columns */
export type Positions_Sum_Fields = {
  __typename?: 'positions_sum_fields'
  shares?: Maybe<Scalars['numeric']['output']>
  vaultId?: Maybe<Scalars['numeric']['output']>
}

/** order by sum() on columns of table "Position" */
export type Positions_Sum_Order_By = {
  shares?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** aggregate var_pop on columns */
export type Positions_Var_Pop_Fields = {
  __typename?: 'positions_var_pop_fields'
  shares?: Maybe<Scalars['Float']['output']>
  vaultId?: Maybe<Scalars['Float']['output']>
}

/** order by var_pop() on columns of table "Position" */
export type Positions_Var_Pop_Order_By = {
  shares?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** aggregate var_samp on columns */
export type Positions_Var_Samp_Fields = {
  __typename?: 'positions_var_samp_fields'
  shares?: Maybe<Scalars['Float']['output']>
  vaultId?: Maybe<Scalars['Float']['output']>
}

/** order by var_samp() on columns of table "Position" */
export type Positions_Var_Samp_Order_By = {
  shares?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** aggregate variance on columns */
export type Positions_Variance_Fields = {
  __typename?: 'positions_variance_fields'
  shares?: Maybe<Scalars['Float']['output']>
  vaultId?: Maybe<Scalars['Float']['output']>
}

/** order by variance() on columns of table "Position" */
export type Positions_Variance_Order_By = {
  shares?: InputMaybe<Order_By>
  vaultId?: InputMaybe<Order_By>
}

/** columns and relationships of "PredicateObject" */
export type PredicateObjects = {
  __typename?: 'predicateObjects'
  claimCount: Scalars['Int']['output']
  id: Scalars['String']['output']
  /** An object relationship */
  object?: Maybe<Atoms>
  objectId: Scalars['numeric']['output']
  /** An object relationship */
  predicate?: Maybe<Atoms>
  predicateId: Scalars['numeric']['output']
  tripleCount: Scalars['Int']['output']
}

/** aggregated selection of "PredicateObject" */
export type PredicateObjects_Aggregate = {
  __typename?: 'predicateObjects_aggregate'
  aggregate?: Maybe<PredicateObjects_Aggregate_Fields>
  nodes: Array<PredicateObjects>
}

/** aggregate fields of "PredicateObject" */
export type PredicateObjects_Aggregate_Fields = {
  __typename?: 'predicateObjects_aggregate_fields'
  avg?: Maybe<PredicateObjects_Avg_Fields>
  count: Scalars['Int']['output']
  max?: Maybe<PredicateObjects_Max_Fields>
  min?: Maybe<PredicateObjects_Min_Fields>
  stddev?: Maybe<PredicateObjects_Stddev_Fields>
  stddev_pop?: Maybe<PredicateObjects_Stddev_Pop_Fields>
  stddev_samp?: Maybe<PredicateObjects_Stddev_Samp_Fields>
  sum?: Maybe<PredicateObjects_Sum_Fields>
  var_pop?: Maybe<PredicateObjects_Var_Pop_Fields>
  var_samp?: Maybe<PredicateObjects_Var_Samp_Fields>
  variance?: Maybe<PredicateObjects_Variance_Fields>
}

/** aggregate fields of "PredicateObject" */
export type PredicateObjects_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<PredicateObjects_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
}

/** aggregate avg on columns */
export type PredicateObjects_Avg_Fields = {
  __typename?: 'predicateObjects_avg_fields'
  claimCount?: Maybe<Scalars['Float']['output']>
  objectId?: Maybe<Scalars['Float']['output']>
  predicateId?: Maybe<Scalars['Float']['output']>
  tripleCount?: Maybe<Scalars['Float']['output']>
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

/** aggregate max on columns */
export type PredicateObjects_Max_Fields = {
  __typename?: 'predicateObjects_max_fields'
  claimCount?: Maybe<Scalars['Int']['output']>
  id?: Maybe<Scalars['String']['output']>
  objectId?: Maybe<Scalars['numeric']['output']>
  predicateId?: Maybe<Scalars['numeric']['output']>
  tripleCount?: Maybe<Scalars['Int']['output']>
}

/** aggregate min on columns */
export type PredicateObjects_Min_Fields = {
  __typename?: 'predicateObjects_min_fields'
  claimCount?: Maybe<Scalars['Int']['output']>
  id?: Maybe<Scalars['String']['output']>
  objectId?: Maybe<Scalars['numeric']['output']>
  predicateId?: Maybe<Scalars['numeric']['output']>
  tripleCount?: Maybe<Scalars['Int']['output']>
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
export type PredicateObjects_Select_Column =
  /** column name */
  | 'claimCount'
  /** column name */
  | 'id'
  /** column name */
  | 'objectId'
  /** column name */
  | 'predicateId'
  /** column name */
  | 'tripleCount'

/** aggregate stddev on columns */
export type PredicateObjects_Stddev_Fields = {
  __typename?: 'predicateObjects_stddev_fields'
  claimCount?: Maybe<Scalars['Float']['output']>
  objectId?: Maybe<Scalars['Float']['output']>
  predicateId?: Maybe<Scalars['Float']['output']>
  tripleCount?: Maybe<Scalars['Float']['output']>
}

/** aggregate stddev_pop on columns */
export type PredicateObjects_Stddev_Pop_Fields = {
  __typename?: 'predicateObjects_stddev_pop_fields'
  claimCount?: Maybe<Scalars['Float']['output']>
  objectId?: Maybe<Scalars['Float']['output']>
  predicateId?: Maybe<Scalars['Float']['output']>
  tripleCount?: Maybe<Scalars['Float']['output']>
}

/** aggregate stddev_samp on columns */
export type PredicateObjects_Stddev_Samp_Fields = {
  __typename?: 'predicateObjects_stddev_samp_fields'
  claimCount?: Maybe<Scalars['Float']['output']>
  objectId?: Maybe<Scalars['Float']['output']>
  predicateId?: Maybe<Scalars['Float']['output']>
  tripleCount?: Maybe<Scalars['Float']['output']>
}

/** Streaming cursor of the table "predicateObjects" */
export type PredicateObjects_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: PredicateObjects_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type PredicateObjects_Stream_Cursor_Value_Input = {
  claimCount?: InputMaybe<Scalars['Int']['input']>
  id?: InputMaybe<Scalars['String']['input']>
  objectId?: InputMaybe<Scalars['numeric']['input']>
  predicateId?: InputMaybe<Scalars['numeric']['input']>
  tripleCount?: InputMaybe<Scalars['Int']['input']>
}

/** aggregate sum on columns */
export type PredicateObjects_Sum_Fields = {
  __typename?: 'predicateObjects_sum_fields'
  claimCount?: Maybe<Scalars['Int']['output']>
  objectId?: Maybe<Scalars['numeric']['output']>
  predicateId?: Maybe<Scalars['numeric']['output']>
  tripleCount?: Maybe<Scalars['Int']['output']>
}

/** aggregate var_pop on columns */
export type PredicateObjects_Var_Pop_Fields = {
  __typename?: 'predicateObjects_var_pop_fields'
  claimCount?: Maybe<Scalars['Float']['output']>
  objectId?: Maybe<Scalars['Float']['output']>
  predicateId?: Maybe<Scalars['Float']['output']>
  tripleCount?: Maybe<Scalars['Float']['output']>
}

/** aggregate var_samp on columns */
export type PredicateObjects_Var_Samp_Fields = {
  __typename?: 'predicateObjects_var_samp_fields'
  claimCount?: Maybe<Scalars['Float']['output']>
  objectId?: Maybe<Scalars['Float']['output']>
  predicateId?: Maybe<Scalars['Float']['output']>
  tripleCount?: Maybe<Scalars['Float']['output']>
}

/** aggregate variance on columns */
export type PredicateObjects_Variance_Fields = {
  __typename?: 'predicateObjects_variance_fields'
  claimCount?: Maybe<Scalars['Float']['output']>
  objectId?: Maybe<Scalars['Float']['output']>
  predicateId?: Maybe<Scalars['Float']['output']>
  tripleCount?: Maybe<Scalars['Float']['output']>
}

export type Query_Root = {
  __typename?: 'query_root'
  /** fetch data from the table: "Account" using primary key columns */
  account?: Maybe<Accounts>
  /** fetch data from the table: "Account" */
  accounts: Array<Accounts>
  /** fetch aggregated fields from the table: "Account" */
  accounts_aggregate: Accounts_Aggregate
  /** execute function "accounts_that_claim_about_account" which returns "Account" */
  accounts_that_claim_about_account: Array<Accounts>
  /** execute function "accounts_that_claim_about_account" and query aggregates on result of table type "Account" */
  accounts_that_claim_about_account_aggregate: Accounts_Aggregate
  /** fetch data from the table: "Atom" using primary key columns */
  atom?: Maybe<Atoms>
  /** fetch data from the table: "AtomValue" using primary key columns */
  atomValue?: Maybe<AtomValues>
  /** fetch data from the table: "AtomValue" */
  atomValues: Array<AtomValues>
  /** fetch aggregated fields from the table: "AtomValue" */
  atomValues_aggregate: AtomValues_Aggregate
  /** fetch data from the table: "Atom" */
  atoms: Array<Atoms>
  /** fetch aggregated fields from the table: "Atom" */
  atoms_aggregate: Atoms_Aggregate
  /** fetch data from the table: "Book" using primary key columns */
  book?: Maybe<Books>
  /** fetch data from the table: "Book" */
  books: Array<Books>
  /** fetch aggregated fields from the table: "Book" */
  books_aggregate: Books_Aggregate
  /** fetch data from the table: "ChainlinkPrice" using primary key columns */
  chainLinkPrice?: Maybe<ChainLinkPrices>
  /** fetch data from the table: "ChainlinkPrice" */
  chainLinkPrices: Array<ChainLinkPrices>
  /** fetch data from the table: "Claim" using primary key columns */
  claim?: Maybe<Claims>
  /** An array relationship */
  claims: Array<Claims>
  /** An aggregate relationship */
  claims_aggregate: Claims_Aggregate
  /** execute function "claims_from_following" which returns "Claim" */
  claims_from_following: Array<Claims>
  /** execute function "claims_from_following" and query aggregates on result of table type "Claim" */
  claims_from_following_aggregate: Claims_Aggregate
  /** fetch data from the table: "Deposit" using primary key columns */
  deposit?: Maybe<Deposits>
  /** An array relationship */
  deposits: Array<Deposits>
  /** An aggregate relationship */
  deposits_aggregate: Deposits_Aggregate
  /** fetch data from the table: "Event" using primary key columns */
  event?: Maybe<Events>
  /** fetch data from the table: "Event" */
  events: Array<Events>
  /** fetch aggregated fields from the table: "Event" */
  events_aggregate: Events_Aggregate
  /** fetch data from the table: "FeeTransfer" */
  feeTranfers: Array<FeeTranfers>
  /** fetch aggregated fields from the table: "FeeTransfer" */
  feeTranfers_aggregate: FeeTranfers_Aggregate
  /** fetch data from the table: "FeeTransfer" using primary key columns */
  feeTransfers?: Maybe<FeeTranfers>
  /** execute function "following" which returns "Account" */
  following: Array<Accounts>
  /** execute function "following" and query aggregates on result of table type "Account" */
  following_aggregate: Accounts_Aggregate
  /** fetch data from the table: "Organization" using primary key columns */
  organization?: Maybe<Organizations>
  /** fetch data from the table: "Organization" */
  organizations: Array<Organizations>
  /** fetch aggregated fields from the table: "Organization" */
  organizations_aggregate: Organizations_Aggregate
  /** fetch data from the table: "Person" using primary key columns */
  person?: Maybe<Persons>
  /** fetch data from the table: "Person" */
  persons: Array<Persons>
  /** fetch aggregated fields from the table: "Person" */
  persons_aggregate: Persons_Aggregate
  /** fetch data from the table: "Position" using primary key columns */
  position?: Maybe<Positions>
  /** An array relationship */
  positions: Array<Positions>
  /** An aggregate relationship */
  positions_aggregate: Positions_Aggregate
  /** fetch data from the table: "PredicateObject" using primary key columns */
  predicateObject?: Maybe<PredicateObjects>
  /** fetch data from the table: "PredicateObject" */
  predicateObjects: Array<PredicateObjects>
  /** fetch aggregated fields from the table: "PredicateObject" */
  predicateObjects_aggregate: PredicateObjects_Aggregate
  /** fetch data from the table: "Redemption" using primary key columns */
  redemption?: Maybe<Redemptions>
  /** An array relationship */
  redemptions: Array<Redemptions>
  /** An aggregate relationship */
  redemptions_aggregate: Redemptions_Aggregate
  /** fetch data from the table: "Signal" using primary key columns */
  signal?: Maybe<Signals>
  /** An array relationship */
  signals: Array<Signals>
  /** An aggregate relationship */
  signals_aggregate: Signals_Aggregate
  /** execute function "signals_from_following" which returns "Signal" */
  signals_from_following: Array<Signals>
  /** execute function "signals_from_following" and query aggregates on result of table type "Signal" */
  signals_from_following_aggregate: Signals_Aggregate
  /** fetch data from the table: "Stats" using primary key columns */
  stat?: Maybe<Stats>
  /** fetch data from the table: "StatsHour" using primary key columns */
  statHour?: Maybe<StatHours>
  /** fetch data from the table: "StatsHour" */
  statHours: Array<StatHours>
  /** fetch aggregated fields from the table: "StatsHour" */
  statHours_aggregate: StatHours_Aggregate
  /** fetch data from the table: "Stats" */
  stats: Array<Stats>
  /** fetch aggregated fields from the table: "Stats" */
  stats_aggregate: Stats_Aggregate
  /** fetch data from the table: "Thing" using primary key columns */
  thing?: Maybe<Things>
  /** fetch data from the table: "Thing" */
  things: Array<Things>
  /** fetch aggregated fields from the table: "Thing" */
  things_aggregate: Things_Aggregate
  /** fetch data from the table: "Triple" using primary key columns */
  triple?: Maybe<Triples>
  /** fetch data from the table: "Triple" */
  triples: Array<Triples>
  /** fetch aggregated fields from the table: "Triple" */
  triples_aggregate: Triples_Aggregate
  /** fetch data from the table: "Vault" using primary key columns */
  vault?: Maybe<Vaults>
  /** fetch data from the table: "Vault" */
  vaults: Array<Vaults>
  /** fetch aggregated fields from the table: "Vault" */
  vaults_aggregate: Vaults_Aggregate
}

export type Query_RootAccountArgs = {
  id: Scalars['String']['input']
}

export type Query_RootAccountsArgs = {
  distinct_on?: InputMaybe<Array<Accounts_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Accounts_Order_By>>
  where?: InputMaybe<Accounts_Bool_Exp>
}

export type Query_RootAccounts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Accounts_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Accounts_Order_By>>
  where?: InputMaybe<Accounts_Bool_Exp>
}

export type Query_RootAccounts_That_Claim_About_AccountArgs = {
  args: Accounts_That_Claim_About_Account_Args
  distinct_on?: InputMaybe<Array<Accounts_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Accounts_Order_By>>
  where?: InputMaybe<Accounts_Bool_Exp>
}

export type Query_RootAccounts_That_Claim_About_Account_AggregateArgs = {
  args: Accounts_That_Claim_About_Account_Args
  distinct_on?: InputMaybe<Array<Accounts_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Accounts_Order_By>>
  where?: InputMaybe<Accounts_Bool_Exp>
}

export type Query_RootAtomArgs = {
  id: Scalars['numeric']['input']
}

export type Query_RootAtomValueArgs = {
  id: Scalars['numeric']['input']
}

export type Query_RootAtomValuesArgs = {
  distinct_on?: InputMaybe<Array<AtomValues_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<AtomValues_Order_By>>
  where?: InputMaybe<AtomValues_Bool_Exp>
}

export type Query_RootAtomValues_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AtomValues_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<AtomValues_Order_By>>
  where?: InputMaybe<AtomValues_Bool_Exp>
}

export type Query_RootAtomsArgs = {
  distinct_on?: InputMaybe<Array<Atoms_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Atoms_Order_By>>
  where?: InputMaybe<Atoms_Bool_Exp>
}

export type Query_RootAtoms_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Atoms_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Atoms_Order_By>>
  where?: InputMaybe<Atoms_Bool_Exp>
}

export type Query_RootBookArgs = {
  id: Scalars['numeric']['input']
}

export type Query_RootBooksArgs = {
  distinct_on?: InputMaybe<Array<Books_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Books_Order_By>>
  where?: InputMaybe<Books_Bool_Exp>
}

export type Query_RootBooks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Books_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Books_Order_By>>
  where?: InputMaybe<Books_Bool_Exp>
}

export type Query_RootChainLinkPriceArgs = {
  id: Scalars['numeric']['input']
}

export type Query_RootChainLinkPricesArgs = {
  distinct_on?: InputMaybe<Array<ChainLinkPrices_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<ChainLinkPrices_Order_By>>
  where?: InputMaybe<ChainLinkPrices_Bool_Exp>
}

export type Query_RootClaimArgs = {
  id: Scalars['String']['input']
}

export type Query_RootClaimsArgs = {
  distinct_on?: InputMaybe<Array<Claims_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Claims_Order_By>>
  where?: InputMaybe<Claims_Bool_Exp>
}

export type Query_RootClaims_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Claims_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Claims_Order_By>>
  where?: InputMaybe<Claims_Bool_Exp>
}

export type Query_RootClaims_From_FollowingArgs = {
  args: Claims_From_Following_Args
  distinct_on?: InputMaybe<Array<Claims_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Claims_Order_By>>
  where?: InputMaybe<Claims_Bool_Exp>
}

export type Query_RootClaims_From_Following_AggregateArgs = {
  args: Claims_From_Following_Args
  distinct_on?: InputMaybe<Array<Claims_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Claims_Order_By>>
  where?: InputMaybe<Claims_Bool_Exp>
}

export type Query_RootDepositArgs = {
  id: Scalars['String']['input']
}

export type Query_RootDepositsArgs = {
  distinct_on?: InputMaybe<Array<Deposits_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Deposits_Order_By>>
  where?: InputMaybe<Deposits_Bool_Exp>
}

export type Query_RootDeposits_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Deposits_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Deposits_Order_By>>
  where?: InputMaybe<Deposits_Bool_Exp>
}

export type Query_RootEventArgs = {
  id: Scalars['String']['input']
}

export type Query_RootEventsArgs = {
  distinct_on?: InputMaybe<Array<Events_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Events_Order_By>>
  where?: InputMaybe<Events_Bool_Exp>
}

export type Query_RootEvents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Events_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Events_Order_By>>
  where?: InputMaybe<Events_Bool_Exp>
}

export type Query_RootFeeTranfersArgs = {
  distinct_on?: InputMaybe<Array<FeeTranfers_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<FeeTranfers_Order_By>>
  where?: InputMaybe<FeeTranfers_Bool_Exp>
}

export type Query_RootFeeTranfers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<FeeTranfers_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<FeeTranfers_Order_By>>
  where?: InputMaybe<FeeTranfers_Bool_Exp>
}

export type Query_RootFeeTransfersArgs = {
  id: Scalars['String']['input']
}

export type Query_RootFollowingArgs = {
  args: Following_Args
  distinct_on?: InputMaybe<Array<Accounts_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Accounts_Order_By>>
  where?: InputMaybe<Accounts_Bool_Exp>
}

export type Query_RootFollowing_AggregateArgs = {
  args: Following_Args
  distinct_on?: InputMaybe<Array<Accounts_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Accounts_Order_By>>
  where?: InputMaybe<Accounts_Bool_Exp>
}

export type Query_RootOrganizationArgs = {
  id: Scalars['numeric']['input']
}

export type Query_RootOrganizationsArgs = {
  distinct_on?: InputMaybe<Array<Organizations_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Organizations_Order_By>>
  where?: InputMaybe<Organizations_Bool_Exp>
}

export type Query_RootOrganizations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Organizations_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Organizations_Order_By>>
  where?: InputMaybe<Organizations_Bool_Exp>
}

export type Query_RootPersonArgs = {
  id: Scalars['numeric']['input']
}

export type Query_RootPersonsArgs = {
  distinct_on?: InputMaybe<Array<Persons_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Persons_Order_By>>
  where?: InputMaybe<Persons_Bool_Exp>
}

export type Query_RootPersons_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Persons_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Persons_Order_By>>
  where?: InputMaybe<Persons_Bool_Exp>
}

export type Query_RootPositionArgs = {
  id: Scalars['String']['input']
}

export type Query_RootPositionsArgs = {
  distinct_on?: InputMaybe<Array<Positions_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Positions_Order_By>>
  where?: InputMaybe<Positions_Bool_Exp>
}

export type Query_RootPositions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Positions_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Positions_Order_By>>
  where?: InputMaybe<Positions_Bool_Exp>
}

export type Query_RootPredicateObjectArgs = {
  id: Scalars['String']['input']
}

export type Query_RootPredicateObjectsArgs = {
  distinct_on?: InputMaybe<Array<PredicateObjects_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<PredicateObjects_Order_By>>
  where?: InputMaybe<PredicateObjects_Bool_Exp>
}

export type Query_RootPredicateObjects_AggregateArgs = {
  distinct_on?: InputMaybe<Array<PredicateObjects_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<PredicateObjects_Order_By>>
  where?: InputMaybe<PredicateObjects_Bool_Exp>
}

export type Query_RootRedemptionArgs = {
  id: Scalars['String']['input']
}

export type Query_RootRedemptionsArgs = {
  distinct_on?: InputMaybe<Array<Redemptions_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Redemptions_Order_By>>
  where?: InputMaybe<Redemptions_Bool_Exp>
}

export type Query_RootRedemptions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Redemptions_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Redemptions_Order_By>>
  where?: InputMaybe<Redemptions_Bool_Exp>
}

export type Query_RootSignalArgs = {
  id: Scalars['String']['input']
}

export type Query_RootSignalsArgs = {
  distinct_on?: InputMaybe<Array<Signals_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Signals_Order_By>>
  where?: InputMaybe<Signals_Bool_Exp>
}

export type Query_RootSignals_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Signals_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Signals_Order_By>>
  where?: InputMaybe<Signals_Bool_Exp>
}

export type Query_RootSignals_From_FollowingArgs = {
  args: Signals_From_Following_Args
  distinct_on?: InputMaybe<Array<Signals_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Signals_Order_By>>
  where?: InputMaybe<Signals_Bool_Exp>
}

export type Query_RootSignals_From_Following_AggregateArgs = {
  args: Signals_From_Following_Args
  distinct_on?: InputMaybe<Array<Signals_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Signals_Order_By>>
  where?: InputMaybe<Signals_Bool_Exp>
}

export type Query_RootStatArgs = {
  id: Scalars['Int']['input']
}

export type Query_RootStatHourArgs = {
  id: Scalars['Int']['input']
}

export type Query_RootStatHoursArgs = {
  distinct_on?: InputMaybe<Array<StatHours_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<StatHours_Order_By>>
  where?: InputMaybe<StatHours_Bool_Exp>
}

export type Query_RootStatHours_AggregateArgs = {
  distinct_on?: InputMaybe<Array<StatHours_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<StatHours_Order_By>>
  where?: InputMaybe<StatHours_Bool_Exp>
}

export type Query_RootStatsArgs = {
  distinct_on?: InputMaybe<Array<Stats_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Stats_Order_By>>
  where?: InputMaybe<Stats_Bool_Exp>
}

export type Query_RootStats_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Stats_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Stats_Order_By>>
  where?: InputMaybe<Stats_Bool_Exp>
}

export type Query_RootThingArgs = {
  id: Scalars['numeric']['input']
}

export type Query_RootThingsArgs = {
  distinct_on?: InputMaybe<Array<Things_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Things_Order_By>>
  where?: InputMaybe<Things_Bool_Exp>
}

export type Query_RootThings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Things_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Things_Order_By>>
  where?: InputMaybe<Things_Bool_Exp>
}

export type Query_RootTripleArgs = {
  id: Scalars['numeric']['input']
}

export type Query_RootTriplesArgs = {
  distinct_on?: InputMaybe<Array<Triples_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Triples_Order_By>>
  where?: InputMaybe<Triples_Bool_Exp>
}

export type Query_RootTriples_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Triples_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Triples_Order_By>>
  where?: InputMaybe<Triples_Bool_Exp>
}

export type Query_RootVaultArgs = {
  id: Scalars['numeric']['input']
}

export type Query_RootVaultsArgs = {
  distinct_on?: InputMaybe<Array<Vaults_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Vaults_Order_By>>
  where?: InputMaybe<Vaults_Bool_Exp>
}

export type Query_RootVaults_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Vaults_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Vaults_Order_By>>
  where?: InputMaybe<Vaults_Bool_Exp>
}

/** columns and relationships of "Redemption" */
export type Redemptions = {
  __typename?: 'redemptions'
  assetsForReceiver: Scalars['numeric']['output']
  blockNumber: Scalars['numeric']['output']
  blockTimestamp: Scalars['numeric']['output']
  exitFee: Scalars['numeric']['output']
  id: Scalars['String']['output']
  /** An object relationship */
  receiver?: Maybe<Accounts>
  receiverId: Scalars['String']['output']
  /** An object relationship */
  sender?: Maybe<Accounts>
  senderId: Scalars['String']['output']
  senderTotalSharesInVault: Scalars['numeric']['output']
  sharesRedeemedBySender: Scalars['numeric']['output']
  transactionHash: Scalars['bytea']['output']
  /** An object relationship */
  vault?: Maybe<Vaults>
  vaultId: Scalars['numeric']['output']
}

/** aggregated selection of "Redemption" */
export type Redemptions_Aggregate = {
  __typename?: 'redemptions_aggregate'
  aggregate?: Maybe<Redemptions_Aggregate_Fields>
  nodes: Array<Redemptions>
}

export type Redemptions_Aggregate_Bool_Exp = {
  count?: InputMaybe<Redemptions_Aggregate_Bool_Exp_Count>
}

export type Redemptions_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Redemptions_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
  filter?: InputMaybe<Redemptions_Bool_Exp>
  predicate: Int_Comparison_Exp
}

/** aggregate fields of "Redemption" */
export type Redemptions_Aggregate_Fields = {
  __typename?: 'redemptions_aggregate_fields'
  avg?: Maybe<Redemptions_Avg_Fields>
  count: Scalars['Int']['output']
  max?: Maybe<Redemptions_Max_Fields>
  min?: Maybe<Redemptions_Min_Fields>
  stddev?: Maybe<Redemptions_Stddev_Fields>
  stddev_pop?: Maybe<Redemptions_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Redemptions_Stddev_Samp_Fields>
  sum?: Maybe<Redemptions_Sum_Fields>
  var_pop?: Maybe<Redemptions_Var_Pop_Fields>
  var_samp?: Maybe<Redemptions_Var_Samp_Fields>
  variance?: Maybe<Redemptions_Variance_Fields>
}

/** aggregate fields of "Redemption" */
export type Redemptions_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Redemptions_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
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

/** aggregate avg on columns */
export type Redemptions_Avg_Fields = {
  __typename?: 'redemptions_avg_fields'
  assetsForReceiver?: Maybe<Scalars['Float']['output']>
  blockNumber?: Maybe<Scalars['Float']['output']>
  blockTimestamp?: Maybe<Scalars['Float']['output']>
  exitFee?: Maybe<Scalars['Float']['output']>
  senderTotalSharesInVault?: Maybe<Scalars['Float']['output']>
  sharesRedeemedBySender?: Maybe<Scalars['Float']['output']>
  vaultId?: Maybe<Scalars['Float']['output']>
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

/** aggregate max on columns */
export type Redemptions_Max_Fields = {
  __typename?: 'redemptions_max_fields'
  assetsForReceiver?: Maybe<Scalars['numeric']['output']>
  blockNumber?: Maybe<Scalars['numeric']['output']>
  blockTimestamp?: Maybe<Scalars['numeric']['output']>
  exitFee?: Maybe<Scalars['numeric']['output']>
  id?: Maybe<Scalars['String']['output']>
  receiverId?: Maybe<Scalars['String']['output']>
  senderId?: Maybe<Scalars['String']['output']>
  senderTotalSharesInVault?: Maybe<Scalars['numeric']['output']>
  sharesRedeemedBySender?: Maybe<Scalars['numeric']['output']>
  vaultId?: Maybe<Scalars['numeric']['output']>
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

/** aggregate min on columns */
export type Redemptions_Min_Fields = {
  __typename?: 'redemptions_min_fields'
  assetsForReceiver?: Maybe<Scalars['numeric']['output']>
  blockNumber?: Maybe<Scalars['numeric']['output']>
  blockTimestamp?: Maybe<Scalars['numeric']['output']>
  exitFee?: Maybe<Scalars['numeric']['output']>
  id?: Maybe<Scalars['String']['output']>
  receiverId?: Maybe<Scalars['String']['output']>
  senderId?: Maybe<Scalars['String']['output']>
  senderTotalSharesInVault?: Maybe<Scalars['numeric']['output']>
  sharesRedeemedBySender?: Maybe<Scalars['numeric']['output']>
  vaultId?: Maybe<Scalars['numeric']['output']>
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
export type Redemptions_Select_Column =
  /** column name */
  | 'assetsForReceiver'
  /** column name */
  | 'blockNumber'
  /** column name */
  | 'blockTimestamp'
  /** column name */
  | 'exitFee'
  /** column name */
  | 'id'
  /** column name */
  | 'receiverId'
  /** column name */
  | 'senderId'
  /** column name */
  | 'senderTotalSharesInVault'
  /** column name */
  | 'sharesRedeemedBySender'
  /** column name */
  | 'transactionHash'
  /** column name */
  | 'vaultId'

/** aggregate stddev on columns */
export type Redemptions_Stddev_Fields = {
  __typename?: 'redemptions_stddev_fields'
  assetsForReceiver?: Maybe<Scalars['Float']['output']>
  blockNumber?: Maybe<Scalars['Float']['output']>
  blockTimestamp?: Maybe<Scalars['Float']['output']>
  exitFee?: Maybe<Scalars['Float']['output']>
  senderTotalSharesInVault?: Maybe<Scalars['Float']['output']>
  sharesRedeemedBySender?: Maybe<Scalars['Float']['output']>
  vaultId?: Maybe<Scalars['Float']['output']>
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

/** aggregate stddev_pop on columns */
export type Redemptions_Stddev_Pop_Fields = {
  __typename?: 'redemptions_stddev_pop_fields'
  assetsForReceiver?: Maybe<Scalars['Float']['output']>
  blockNumber?: Maybe<Scalars['Float']['output']>
  blockTimestamp?: Maybe<Scalars['Float']['output']>
  exitFee?: Maybe<Scalars['Float']['output']>
  senderTotalSharesInVault?: Maybe<Scalars['Float']['output']>
  sharesRedeemedBySender?: Maybe<Scalars['Float']['output']>
  vaultId?: Maybe<Scalars['Float']['output']>
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

/** aggregate stddev_samp on columns */
export type Redemptions_Stddev_Samp_Fields = {
  __typename?: 'redemptions_stddev_samp_fields'
  assetsForReceiver?: Maybe<Scalars['Float']['output']>
  blockNumber?: Maybe<Scalars['Float']['output']>
  blockTimestamp?: Maybe<Scalars['Float']['output']>
  exitFee?: Maybe<Scalars['Float']['output']>
  senderTotalSharesInVault?: Maybe<Scalars['Float']['output']>
  sharesRedeemedBySender?: Maybe<Scalars['Float']['output']>
  vaultId?: Maybe<Scalars['Float']['output']>
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

/** Streaming cursor of the table "redemptions" */
export type Redemptions_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Redemptions_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Redemptions_Stream_Cursor_Value_Input = {
  assetsForReceiver?: InputMaybe<Scalars['numeric']['input']>
  blockNumber?: InputMaybe<Scalars['numeric']['input']>
  blockTimestamp?: InputMaybe<Scalars['numeric']['input']>
  exitFee?: InputMaybe<Scalars['numeric']['input']>
  id?: InputMaybe<Scalars['String']['input']>
  receiverId?: InputMaybe<Scalars['String']['input']>
  senderId?: InputMaybe<Scalars['String']['input']>
  senderTotalSharesInVault?: InputMaybe<Scalars['numeric']['input']>
  sharesRedeemedBySender?: InputMaybe<Scalars['numeric']['input']>
  transactionHash?: InputMaybe<Scalars['bytea']['input']>
  vaultId?: InputMaybe<Scalars['numeric']['input']>
}

/** aggregate sum on columns */
export type Redemptions_Sum_Fields = {
  __typename?: 'redemptions_sum_fields'
  assetsForReceiver?: Maybe<Scalars['numeric']['output']>
  blockNumber?: Maybe<Scalars['numeric']['output']>
  blockTimestamp?: Maybe<Scalars['numeric']['output']>
  exitFee?: Maybe<Scalars['numeric']['output']>
  senderTotalSharesInVault?: Maybe<Scalars['numeric']['output']>
  sharesRedeemedBySender?: Maybe<Scalars['numeric']['output']>
  vaultId?: Maybe<Scalars['numeric']['output']>
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

/** aggregate var_pop on columns */
export type Redemptions_Var_Pop_Fields = {
  __typename?: 'redemptions_var_pop_fields'
  assetsForReceiver?: Maybe<Scalars['Float']['output']>
  blockNumber?: Maybe<Scalars['Float']['output']>
  blockTimestamp?: Maybe<Scalars['Float']['output']>
  exitFee?: Maybe<Scalars['Float']['output']>
  senderTotalSharesInVault?: Maybe<Scalars['Float']['output']>
  sharesRedeemedBySender?: Maybe<Scalars['Float']['output']>
  vaultId?: Maybe<Scalars['Float']['output']>
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

/** aggregate var_samp on columns */
export type Redemptions_Var_Samp_Fields = {
  __typename?: 'redemptions_var_samp_fields'
  assetsForReceiver?: Maybe<Scalars['Float']['output']>
  blockNumber?: Maybe<Scalars['Float']['output']>
  blockTimestamp?: Maybe<Scalars['Float']['output']>
  exitFee?: Maybe<Scalars['Float']['output']>
  senderTotalSharesInVault?: Maybe<Scalars['Float']['output']>
  sharesRedeemedBySender?: Maybe<Scalars['Float']['output']>
  vaultId?: Maybe<Scalars['Float']['output']>
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

/** aggregate variance on columns */
export type Redemptions_Variance_Fields = {
  __typename?: 'redemptions_variance_fields'
  assetsForReceiver?: Maybe<Scalars['Float']['output']>
  blockNumber?: Maybe<Scalars['Float']['output']>
  blockTimestamp?: Maybe<Scalars['Float']['output']>
  exitFee?: Maybe<Scalars['Float']['output']>
  senderTotalSharesInVault?: Maybe<Scalars['Float']['output']>
  sharesRedeemedBySender?: Maybe<Scalars['Float']['output']>
  vaultId?: Maybe<Scalars['Float']['output']>
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

/** columns and relationships of "Signal" */
export type Signals = {
  __typename?: 'signals'
  /** An object relationship */
  account?: Maybe<Accounts>
  accountId: Scalars['String']['output']
  /** An object relationship */
  atom?: Maybe<Atoms>
  atomId?: Maybe<Scalars['numeric']['output']>
  blockNumber: Scalars['numeric']['output']
  blockTimestamp: Scalars['numeric']['output']
  delta: Scalars['numeric']['output']
  /** An object relationship */
  deposit?: Maybe<Deposits>
  depositId?: Maybe<Scalars['String']['output']>
  id: Scalars['String']['output']
  /** An object relationship */
  redemption?: Maybe<Redemptions>
  redemptionId?: Maybe<Scalars['String']['output']>
  relativeStrength: Scalars['numeric']['output']
  transactionHash: Scalars['bytea']['output']
  /** An object relationship */
  triple?: Maybe<Triples>
  tripleId?: Maybe<Scalars['numeric']['output']>
}

/** aggregated selection of "Signal" */
export type Signals_Aggregate = {
  __typename?: 'signals_aggregate'
  aggregate?: Maybe<Signals_Aggregate_Fields>
  nodes: Array<Signals>
}

export type Signals_Aggregate_Bool_Exp = {
  count?: InputMaybe<Signals_Aggregate_Bool_Exp_Count>
}

export type Signals_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Signals_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
  filter?: InputMaybe<Signals_Bool_Exp>
  predicate: Int_Comparison_Exp
}

/** aggregate fields of "Signal" */
export type Signals_Aggregate_Fields = {
  __typename?: 'signals_aggregate_fields'
  avg?: Maybe<Signals_Avg_Fields>
  count: Scalars['Int']['output']
  max?: Maybe<Signals_Max_Fields>
  min?: Maybe<Signals_Min_Fields>
  stddev?: Maybe<Signals_Stddev_Fields>
  stddev_pop?: Maybe<Signals_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Signals_Stddev_Samp_Fields>
  sum?: Maybe<Signals_Sum_Fields>
  var_pop?: Maybe<Signals_Var_Pop_Fields>
  var_samp?: Maybe<Signals_Var_Samp_Fields>
  variance?: Maybe<Signals_Variance_Fields>
}

/** aggregate fields of "Signal" */
export type Signals_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Signals_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
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

/** aggregate avg on columns */
export type Signals_Avg_Fields = {
  __typename?: 'signals_avg_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  blockNumber?: Maybe<Scalars['Float']['output']>
  blockTimestamp?: Maybe<Scalars['Float']['output']>
  delta?: Maybe<Scalars['Float']['output']>
  relativeStrength?: Maybe<Scalars['Float']['output']>
  tripleId?: Maybe<Scalars['Float']['output']>
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

/** aggregate max on columns */
export type Signals_Max_Fields = {
  __typename?: 'signals_max_fields'
  accountId?: Maybe<Scalars['String']['output']>
  atomId?: Maybe<Scalars['numeric']['output']>
  blockNumber?: Maybe<Scalars['numeric']['output']>
  blockTimestamp?: Maybe<Scalars['numeric']['output']>
  delta?: Maybe<Scalars['numeric']['output']>
  depositId?: Maybe<Scalars['String']['output']>
  id?: Maybe<Scalars['String']['output']>
  redemptionId?: Maybe<Scalars['String']['output']>
  relativeStrength?: Maybe<Scalars['numeric']['output']>
  tripleId?: Maybe<Scalars['numeric']['output']>
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

/** aggregate min on columns */
export type Signals_Min_Fields = {
  __typename?: 'signals_min_fields'
  accountId?: Maybe<Scalars['String']['output']>
  atomId?: Maybe<Scalars['numeric']['output']>
  blockNumber?: Maybe<Scalars['numeric']['output']>
  blockTimestamp?: Maybe<Scalars['numeric']['output']>
  delta?: Maybe<Scalars['numeric']['output']>
  depositId?: Maybe<Scalars['String']['output']>
  id?: Maybe<Scalars['String']['output']>
  redemptionId?: Maybe<Scalars['String']['output']>
  relativeStrength?: Maybe<Scalars['numeric']['output']>
  tripleId?: Maybe<Scalars['numeric']['output']>
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
export type Signals_Select_Column =
  /** column name */
  | 'accountId'
  /** column name */
  | 'atomId'
  /** column name */
  | 'blockNumber'
  /** column name */
  | 'blockTimestamp'
  /** column name */
  | 'delta'
  /** column name */
  | 'depositId'
  /** column name */
  | 'id'
  /** column name */
  | 'redemptionId'
  /** column name */
  | 'relativeStrength'
  /** column name */
  | 'transactionHash'
  /** column name */
  | 'tripleId'

/** aggregate stddev on columns */
export type Signals_Stddev_Fields = {
  __typename?: 'signals_stddev_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  blockNumber?: Maybe<Scalars['Float']['output']>
  blockTimestamp?: Maybe<Scalars['Float']['output']>
  delta?: Maybe<Scalars['Float']['output']>
  relativeStrength?: Maybe<Scalars['Float']['output']>
  tripleId?: Maybe<Scalars['Float']['output']>
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

/** aggregate stddev_pop on columns */
export type Signals_Stddev_Pop_Fields = {
  __typename?: 'signals_stddev_pop_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  blockNumber?: Maybe<Scalars['Float']['output']>
  blockTimestamp?: Maybe<Scalars['Float']['output']>
  delta?: Maybe<Scalars['Float']['output']>
  relativeStrength?: Maybe<Scalars['Float']['output']>
  tripleId?: Maybe<Scalars['Float']['output']>
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

/** aggregate stddev_samp on columns */
export type Signals_Stddev_Samp_Fields = {
  __typename?: 'signals_stddev_samp_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  blockNumber?: Maybe<Scalars['Float']['output']>
  blockTimestamp?: Maybe<Scalars['Float']['output']>
  delta?: Maybe<Scalars['Float']['output']>
  relativeStrength?: Maybe<Scalars['Float']['output']>
  tripleId?: Maybe<Scalars['Float']['output']>
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

/** Streaming cursor of the table "signals" */
export type Signals_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Signals_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Signals_Stream_Cursor_Value_Input = {
  accountId?: InputMaybe<Scalars['String']['input']>
  atomId?: InputMaybe<Scalars['numeric']['input']>
  blockNumber?: InputMaybe<Scalars['numeric']['input']>
  blockTimestamp?: InputMaybe<Scalars['numeric']['input']>
  delta?: InputMaybe<Scalars['numeric']['input']>
  depositId?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['String']['input']>
  redemptionId?: InputMaybe<Scalars['String']['input']>
  relativeStrength?: InputMaybe<Scalars['numeric']['input']>
  transactionHash?: InputMaybe<Scalars['bytea']['input']>
  tripleId?: InputMaybe<Scalars['numeric']['input']>
}

/** aggregate sum on columns */
export type Signals_Sum_Fields = {
  __typename?: 'signals_sum_fields'
  atomId?: Maybe<Scalars['numeric']['output']>
  blockNumber?: Maybe<Scalars['numeric']['output']>
  blockTimestamp?: Maybe<Scalars['numeric']['output']>
  delta?: Maybe<Scalars['numeric']['output']>
  relativeStrength?: Maybe<Scalars['numeric']['output']>
  tripleId?: Maybe<Scalars['numeric']['output']>
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

/** aggregate var_pop on columns */
export type Signals_Var_Pop_Fields = {
  __typename?: 'signals_var_pop_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  blockNumber?: Maybe<Scalars['Float']['output']>
  blockTimestamp?: Maybe<Scalars['Float']['output']>
  delta?: Maybe<Scalars['Float']['output']>
  relativeStrength?: Maybe<Scalars['Float']['output']>
  tripleId?: Maybe<Scalars['Float']['output']>
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

/** aggregate var_samp on columns */
export type Signals_Var_Samp_Fields = {
  __typename?: 'signals_var_samp_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  blockNumber?: Maybe<Scalars['Float']['output']>
  blockTimestamp?: Maybe<Scalars['Float']['output']>
  delta?: Maybe<Scalars['Float']['output']>
  relativeStrength?: Maybe<Scalars['Float']['output']>
  tripleId?: Maybe<Scalars['Float']['output']>
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

/** aggregate variance on columns */
export type Signals_Variance_Fields = {
  __typename?: 'signals_variance_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  blockNumber?: Maybe<Scalars['Float']['output']>
  blockTimestamp?: Maybe<Scalars['Float']['output']>
  delta?: Maybe<Scalars['Float']['output']>
  relativeStrength?: Maybe<Scalars['Float']['output']>
  tripleId?: Maybe<Scalars['Float']['output']>
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

/** columns and relationships of "StatsHour" */
export type StatHours = {
  __typename?: 'statHours'
  contractBalance: Scalars['numeric']['output']
  id: Scalars['Int']['output']
  totalAccounts: Scalars['Int']['output']
  totalAtoms: Scalars['Int']['output']
  totalFees: Scalars['numeric']['output']
  totalPositions: Scalars['Int']['output']
  totalSignals: Scalars['Int']['output']
  totalTriples: Scalars['Int']['output']
}

/** aggregated selection of "StatsHour" */
export type StatHours_Aggregate = {
  __typename?: 'statHours_aggregate'
  aggregate?: Maybe<StatHours_Aggregate_Fields>
  nodes: Array<StatHours>
}

/** aggregate fields of "StatsHour" */
export type StatHours_Aggregate_Fields = {
  __typename?: 'statHours_aggregate_fields'
  avg?: Maybe<StatHours_Avg_Fields>
  count: Scalars['Int']['output']
  max?: Maybe<StatHours_Max_Fields>
  min?: Maybe<StatHours_Min_Fields>
  stddev?: Maybe<StatHours_Stddev_Fields>
  stddev_pop?: Maybe<StatHours_Stddev_Pop_Fields>
  stddev_samp?: Maybe<StatHours_Stddev_Samp_Fields>
  sum?: Maybe<StatHours_Sum_Fields>
  var_pop?: Maybe<StatHours_Var_Pop_Fields>
  var_samp?: Maybe<StatHours_Var_Samp_Fields>
  variance?: Maybe<StatHours_Variance_Fields>
}

/** aggregate fields of "StatsHour" */
export type StatHours_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<StatHours_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
}

/** aggregate avg on columns */
export type StatHours_Avg_Fields = {
  __typename?: 'statHours_avg_fields'
  contractBalance?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
  totalAccounts?: Maybe<Scalars['Float']['output']>
  totalAtoms?: Maybe<Scalars['Float']['output']>
  totalFees?: Maybe<Scalars['Float']['output']>
  totalPositions?: Maybe<Scalars['Float']['output']>
  totalSignals?: Maybe<Scalars['Float']['output']>
  totalTriples?: Maybe<Scalars['Float']['output']>
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

/** aggregate max on columns */
export type StatHours_Max_Fields = {
  __typename?: 'statHours_max_fields'
  contractBalance?: Maybe<Scalars['numeric']['output']>
  id?: Maybe<Scalars['Int']['output']>
  totalAccounts?: Maybe<Scalars['Int']['output']>
  totalAtoms?: Maybe<Scalars['Int']['output']>
  totalFees?: Maybe<Scalars['numeric']['output']>
  totalPositions?: Maybe<Scalars['Int']['output']>
  totalSignals?: Maybe<Scalars['Int']['output']>
  totalTriples?: Maybe<Scalars['Int']['output']>
}

/** aggregate min on columns */
export type StatHours_Min_Fields = {
  __typename?: 'statHours_min_fields'
  contractBalance?: Maybe<Scalars['numeric']['output']>
  id?: Maybe<Scalars['Int']['output']>
  totalAccounts?: Maybe<Scalars['Int']['output']>
  totalAtoms?: Maybe<Scalars['Int']['output']>
  totalFees?: Maybe<Scalars['numeric']['output']>
  totalPositions?: Maybe<Scalars['Int']['output']>
  totalSignals?: Maybe<Scalars['Int']['output']>
  totalTriples?: Maybe<Scalars['Int']['output']>
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
export type StatHours_Select_Column =
  /** column name */
  | 'contractBalance'
  /** column name */
  | 'id'
  /** column name */
  | 'totalAccounts'
  /** column name */
  | 'totalAtoms'
  /** column name */
  | 'totalFees'
  /** column name */
  | 'totalPositions'
  /** column name */
  | 'totalSignals'
  /** column name */
  | 'totalTriples'

/** aggregate stddev on columns */
export type StatHours_Stddev_Fields = {
  __typename?: 'statHours_stddev_fields'
  contractBalance?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
  totalAccounts?: Maybe<Scalars['Float']['output']>
  totalAtoms?: Maybe<Scalars['Float']['output']>
  totalFees?: Maybe<Scalars['Float']['output']>
  totalPositions?: Maybe<Scalars['Float']['output']>
  totalSignals?: Maybe<Scalars['Float']['output']>
  totalTriples?: Maybe<Scalars['Float']['output']>
}

/** aggregate stddev_pop on columns */
export type StatHours_Stddev_Pop_Fields = {
  __typename?: 'statHours_stddev_pop_fields'
  contractBalance?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
  totalAccounts?: Maybe<Scalars['Float']['output']>
  totalAtoms?: Maybe<Scalars['Float']['output']>
  totalFees?: Maybe<Scalars['Float']['output']>
  totalPositions?: Maybe<Scalars['Float']['output']>
  totalSignals?: Maybe<Scalars['Float']['output']>
  totalTriples?: Maybe<Scalars['Float']['output']>
}

/** aggregate stddev_samp on columns */
export type StatHours_Stddev_Samp_Fields = {
  __typename?: 'statHours_stddev_samp_fields'
  contractBalance?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
  totalAccounts?: Maybe<Scalars['Float']['output']>
  totalAtoms?: Maybe<Scalars['Float']['output']>
  totalFees?: Maybe<Scalars['Float']['output']>
  totalPositions?: Maybe<Scalars['Float']['output']>
  totalSignals?: Maybe<Scalars['Float']['output']>
  totalTriples?: Maybe<Scalars['Float']['output']>
}

/** Streaming cursor of the table "statHours" */
export type StatHours_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: StatHours_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type StatHours_Stream_Cursor_Value_Input = {
  contractBalance?: InputMaybe<Scalars['numeric']['input']>
  id?: InputMaybe<Scalars['Int']['input']>
  totalAccounts?: InputMaybe<Scalars['Int']['input']>
  totalAtoms?: InputMaybe<Scalars['Int']['input']>
  totalFees?: InputMaybe<Scalars['numeric']['input']>
  totalPositions?: InputMaybe<Scalars['Int']['input']>
  totalSignals?: InputMaybe<Scalars['Int']['input']>
  totalTriples?: InputMaybe<Scalars['Int']['input']>
}

/** aggregate sum on columns */
export type StatHours_Sum_Fields = {
  __typename?: 'statHours_sum_fields'
  contractBalance?: Maybe<Scalars['numeric']['output']>
  id?: Maybe<Scalars['Int']['output']>
  totalAccounts?: Maybe<Scalars['Int']['output']>
  totalAtoms?: Maybe<Scalars['Int']['output']>
  totalFees?: Maybe<Scalars['numeric']['output']>
  totalPositions?: Maybe<Scalars['Int']['output']>
  totalSignals?: Maybe<Scalars['Int']['output']>
  totalTriples?: Maybe<Scalars['Int']['output']>
}

/** aggregate var_pop on columns */
export type StatHours_Var_Pop_Fields = {
  __typename?: 'statHours_var_pop_fields'
  contractBalance?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
  totalAccounts?: Maybe<Scalars['Float']['output']>
  totalAtoms?: Maybe<Scalars['Float']['output']>
  totalFees?: Maybe<Scalars['Float']['output']>
  totalPositions?: Maybe<Scalars['Float']['output']>
  totalSignals?: Maybe<Scalars['Float']['output']>
  totalTriples?: Maybe<Scalars['Float']['output']>
}

/** aggregate var_samp on columns */
export type StatHours_Var_Samp_Fields = {
  __typename?: 'statHours_var_samp_fields'
  contractBalance?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
  totalAccounts?: Maybe<Scalars['Float']['output']>
  totalAtoms?: Maybe<Scalars['Float']['output']>
  totalFees?: Maybe<Scalars['Float']['output']>
  totalPositions?: Maybe<Scalars['Float']['output']>
  totalSignals?: Maybe<Scalars['Float']['output']>
  totalTriples?: Maybe<Scalars['Float']['output']>
}

/** aggregate variance on columns */
export type StatHours_Variance_Fields = {
  __typename?: 'statHours_variance_fields'
  contractBalance?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
  totalAccounts?: Maybe<Scalars['Float']['output']>
  totalAtoms?: Maybe<Scalars['Float']['output']>
  totalFees?: Maybe<Scalars['Float']['output']>
  totalPositions?: Maybe<Scalars['Float']['output']>
  totalSignals?: Maybe<Scalars['Float']['output']>
  totalTriples?: Maybe<Scalars['Float']['output']>
}

/** columns and relationships of "Stats" */
export type Stats = {
  __typename?: 'stats'
  contractBalance: Scalars['numeric']['output']
  id: Scalars['Int']['output']
  totalAccounts: Scalars['Int']['output']
  totalAtoms: Scalars['Int']['output']
  totalFees: Scalars['numeric']['output']
  totalPositions: Scalars['Int']['output']
  totalSignals: Scalars['Int']['output']
  totalTriples: Scalars['Int']['output']
}

/** aggregated selection of "Stats" */
export type Stats_Aggregate = {
  __typename?: 'stats_aggregate'
  aggregate?: Maybe<Stats_Aggregate_Fields>
  nodes: Array<Stats>
}

/** aggregate fields of "Stats" */
export type Stats_Aggregate_Fields = {
  __typename?: 'stats_aggregate_fields'
  avg?: Maybe<Stats_Avg_Fields>
  count: Scalars['Int']['output']
  max?: Maybe<Stats_Max_Fields>
  min?: Maybe<Stats_Min_Fields>
  stddev?: Maybe<Stats_Stddev_Fields>
  stddev_pop?: Maybe<Stats_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Stats_Stddev_Samp_Fields>
  sum?: Maybe<Stats_Sum_Fields>
  var_pop?: Maybe<Stats_Var_Pop_Fields>
  var_samp?: Maybe<Stats_Var_Samp_Fields>
  variance?: Maybe<Stats_Variance_Fields>
}

/** aggregate fields of "Stats" */
export type Stats_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Stats_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
}

/** aggregate avg on columns */
export type Stats_Avg_Fields = {
  __typename?: 'stats_avg_fields'
  contractBalance?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
  totalAccounts?: Maybe<Scalars['Float']['output']>
  totalAtoms?: Maybe<Scalars['Float']['output']>
  totalFees?: Maybe<Scalars['Float']['output']>
  totalPositions?: Maybe<Scalars['Float']['output']>
  totalSignals?: Maybe<Scalars['Float']['output']>
  totalTriples?: Maybe<Scalars['Float']['output']>
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

/** aggregate max on columns */
export type Stats_Max_Fields = {
  __typename?: 'stats_max_fields'
  contractBalance?: Maybe<Scalars['numeric']['output']>
  id?: Maybe<Scalars['Int']['output']>
  totalAccounts?: Maybe<Scalars['Int']['output']>
  totalAtoms?: Maybe<Scalars['Int']['output']>
  totalFees?: Maybe<Scalars['numeric']['output']>
  totalPositions?: Maybe<Scalars['Int']['output']>
  totalSignals?: Maybe<Scalars['Int']['output']>
  totalTriples?: Maybe<Scalars['Int']['output']>
}

/** aggregate min on columns */
export type Stats_Min_Fields = {
  __typename?: 'stats_min_fields'
  contractBalance?: Maybe<Scalars['numeric']['output']>
  id?: Maybe<Scalars['Int']['output']>
  totalAccounts?: Maybe<Scalars['Int']['output']>
  totalAtoms?: Maybe<Scalars['Int']['output']>
  totalFees?: Maybe<Scalars['numeric']['output']>
  totalPositions?: Maybe<Scalars['Int']['output']>
  totalSignals?: Maybe<Scalars['Int']['output']>
  totalTriples?: Maybe<Scalars['Int']['output']>
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
export type Stats_Select_Column =
  /** column name */
  | 'contractBalance'
  /** column name */
  | 'id'
  /** column name */
  | 'totalAccounts'
  /** column name */
  | 'totalAtoms'
  /** column name */
  | 'totalFees'
  /** column name */
  | 'totalPositions'
  /** column name */
  | 'totalSignals'
  /** column name */
  | 'totalTriples'

/** aggregate stddev on columns */
export type Stats_Stddev_Fields = {
  __typename?: 'stats_stddev_fields'
  contractBalance?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
  totalAccounts?: Maybe<Scalars['Float']['output']>
  totalAtoms?: Maybe<Scalars['Float']['output']>
  totalFees?: Maybe<Scalars['Float']['output']>
  totalPositions?: Maybe<Scalars['Float']['output']>
  totalSignals?: Maybe<Scalars['Float']['output']>
  totalTriples?: Maybe<Scalars['Float']['output']>
}

/** aggregate stddev_pop on columns */
export type Stats_Stddev_Pop_Fields = {
  __typename?: 'stats_stddev_pop_fields'
  contractBalance?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
  totalAccounts?: Maybe<Scalars['Float']['output']>
  totalAtoms?: Maybe<Scalars['Float']['output']>
  totalFees?: Maybe<Scalars['Float']['output']>
  totalPositions?: Maybe<Scalars['Float']['output']>
  totalSignals?: Maybe<Scalars['Float']['output']>
  totalTriples?: Maybe<Scalars['Float']['output']>
}

/** aggregate stddev_samp on columns */
export type Stats_Stddev_Samp_Fields = {
  __typename?: 'stats_stddev_samp_fields'
  contractBalance?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
  totalAccounts?: Maybe<Scalars['Float']['output']>
  totalAtoms?: Maybe<Scalars['Float']['output']>
  totalFees?: Maybe<Scalars['Float']['output']>
  totalPositions?: Maybe<Scalars['Float']['output']>
  totalSignals?: Maybe<Scalars['Float']['output']>
  totalTriples?: Maybe<Scalars['Float']['output']>
}

/** Streaming cursor of the table "stats" */
export type Stats_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Stats_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Stats_Stream_Cursor_Value_Input = {
  contractBalance?: InputMaybe<Scalars['numeric']['input']>
  id?: InputMaybe<Scalars['Int']['input']>
  totalAccounts?: InputMaybe<Scalars['Int']['input']>
  totalAtoms?: InputMaybe<Scalars['Int']['input']>
  totalFees?: InputMaybe<Scalars['numeric']['input']>
  totalPositions?: InputMaybe<Scalars['Int']['input']>
  totalSignals?: InputMaybe<Scalars['Int']['input']>
  totalTriples?: InputMaybe<Scalars['Int']['input']>
}

/** aggregate sum on columns */
export type Stats_Sum_Fields = {
  __typename?: 'stats_sum_fields'
  contractBalance?: Maybe<Scalars['numeric']['output']>
  id?: Maybe<Scalars['Int']['output']>
  totalAccounts?: Maybe<Scalars['Int']['output']>
  totalAtoms?: Maybe<Scalars['Int']['output']>
  totalFees?: Maybe<Scalars['numeric']['output']>
  totalPositions?: Maybe<Scalars['Int']['output']>
  totalSignals?: Maybe<Scalars['Int']['output']>
  totalTriples?: Maybe<Scalars['Int']['output']>
}

/** aggregate var_pop on columns */
export type Stats_Var_Pop_Fields = {
  __typename?: 'stats_var_pop_fields'
  contractBalance?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
  totalAccounts?: Maybe<Scalars['Float']['output']>
  totalAtoms?: Maybe<Scalars['Float']['output']>
  totalFees?: Maybe<Scalars['Float']['output']>
  totalPositions?: Maybe<Scalars['Float']['output']>
  totalSignals?: Maybe<Scalars['Float']['output']>
  totalTriples?: Maybe<Scalars['Float']['output']>
}

/** aggregate var_samp on columns */
export type Stats_Var_Samp_Fields = {
  __typename?: 'stats_var_samp_fields'
  contractBalance?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
  totalAccounts?: Maybe<Scalars['Float']['output']>
  totalAtoms?: Maybe<Scalars['Float']['output']>
  totalFees?: Maybe<Scalars['Float']['output']>
  totalPositions?: Maybe<Scalars['Float']['output']>
  totalSignals?: Maybe<Scalars['Float']['output']>
  totalTriples?: Maybe<Scalars['Float']['output']>
}

/** aggregate variance on columns */
export type Stats_Variance_Fields = {
  __typename?: 'stats_variance_fields'
  contractBalance?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
  totalAccounts?: Maybe<Scalars['Float']['output']>
  totalAtoms?: Maybe<Scalars['Float']['output']>
  totalFees?: Maybe<Scalars['Float']['output']>
  totalPositions?: Maybe<Scalars['Float']['output']>
  totalSignals?: Maybe<Scalars['Float']['output']>
  totalTriples?: Maybe<Scalars['Float']['output']>
}

export type Subscription_Root = {
  __typename?: 'subscription_root'
  /** fetch data from the table: "Account" using primary key columns */
  account?: Maybe<Accounts>
  /** fetch data from the table: "Account" */
  accounts: Array<Accounts>
  /** fetch aggregated fields from the table: "Account" */
  accounts_aggregate: Accounts_Aggregate
  /** fetch data from the table in a streaming manner: "Account" */
  accounts_stream: Array<Accounts>
  /** execute function "accounts_that_claim_about_account" which returns "Account" */
  accounts_that_claim_about_account: Array<Accounts>
  /** execute function "accounts_that_claim_about_account" and query aggregates on result of table type "Account" */
  accounts_that_claim_about_account_aggregate: Accounts_Aggregate
  /** fetch data from the table: "Atom" using primary key columns */
  atom?: Maybe<Atoms>
  /** fetch data from the table: "AtomValue" using primary key columns */
  atomValue?: Maybe<AtomValues>
  /** fetch data from the table: "AtomValue" */
  atomValues: Array<AtomValues>
  /** fetch aggregated fields from the table: "AtomValue" */
  atomValues_aggregate: AtomValues_Aggregate
  /** fetch data from the table in a streaming manner: "AtomValue" */
  atomValues_stream: Array<AtomValues>
  /** fetch data from the table: "Atom" */
  atoms: Array<Atoms>
  /** fetch aggregated fields from the table: "Atom" */
  atoms_aggregate: Atoms_Aggregate
  /** fetch data from the table in a streaming manner: "Atom" */
  atoms_stream: Array<Atoms>
  /** fetch data from the table: "Book" using primary key columns */
  book?: Maybe<Books>
  /** fetch data from the table: "Book" */
  books: Array<Books>
  /** fetch aggregated fields from the table: "Book" */
  books_aggregate: Books_Aggregate
  /** fetch data from the table in a streaming manner: "Book" */
  books_stream: Array<Books>
  /** fetch data from the table: "ChainlinkPrice" using primary key columns */
  chainLinkPrice?: Maybe<ChainLinkPrices>
  /** fetch data from the table: "ChainlinkPrice" */
  chainLinkPrices: Array<ChainLinkPrices>
  /** fetch data from the table in a streaming manner: "ChainlinkPrice" */
  chainLinkPrices_stream: Array<ChainLinkPrices>
  /** fetch data from the table: "Claim" using primary key columns */
  claim?: Maybe<Claims>
  /** An array relationship */
  claims: Array<Claims>
  /** An aggregate relationship */
  claims_aggregate: Claims_Aggregate
  /** execute function "claims_from_following" which returns "Claim" */
  claims_from_following: Array<Claims>
  /** execute function "claims_from_following" and query aggregates on result of table type "Claim" */
  claims_from_following_aggregate: Claims_Aggregate
  /** fetch data from the table in a streaming manner: "Claim" */
  claims_stream: Array<Claims>
  /** fetch data from the table: "Deposit" using primary key columns */
  deposit?: Maybe<Deposits>
  /** An array relationship */
  deposits: Array<Deposits>
  /** An aggregate relationship */
  deposits_aggregate: Deposits_Aggregate
  /** fetch data from the table in a streaming manner: "Deposit" */
  deposits_stream: Array<Deposits>
  /** fetch data from the table: "Event" using primary key columns */
  event?: Maybe<Events>
  /** fetch data from the table: "Event" */
  events: Array<Events>
  /** fetch aggregated fields from the table: "Event" */
  events_aggregate: Events_Aggregate
  /** fetch data from the table in a streaming manner: "Event" */
  events_stream: Array<Events>
  /** fetch data from the table: "FeeTransfer" */
  feeTranfers: Array<FeeTranfers>
  /** fetch aggregated fields from the table: "FeeTransfer" */
  feeTranfers_aggregate: FeeTranfers_Aggregate
  /** fetch data from the table in a streaming manner: "FeeTransfer" */
  feeTranfers_stream: Array<FeeTranfers>
  /** fetch data from the table: "FeeTransfer" using primary key columns */
  feeTransfers?: Maybe<FeeTranfers>
  /** execute function "following" which returns "Account" */
  following: Array<Accounts>
  /** execute function "following" and query aggregates on result of table type "Account" */
  following_aggregate: Accounts_Aggregate
  /** fetch data from the table: "Organization" using primary key columns */
  organization?: Maybe<Organizations>
  /** fetch data from the table: "Organization" */
  organizations: Array<Organizations>
  /** fetch aggregated fields from the table: "Organization" */
  organizations_aggregate: Organizations_Aggregate
  /** fetch data from the table in a streaming manner: "Organization" */
  organizations_stream: Array<Organizations>
  /** fetch data from the table: "Person" using primary key columns */
  person?: Maybe<Persons>
  /** fetch data from the table: "Person" */
  persons: Array<Persons>
  /** fetch aggregated fields from the table: "Person" */
  persons_aggregate: Persons_Aggregate
  /** fetch data from the table in a streaming manner: "Person" */
  persons_stream: Array<Persons>
  /** fetch data from the table: "Position" using primary key columns */
  position?: Maybe<Positions>
  /** An array relationship */
  positions: Array<Positions>
  /** An aggregate relationship */
  positions_aggregate: Positions_Aggregate
  /** fetch data from the table in a streaming manner: "Position" */
  positions_stream: Array<Positions>
  /** fetch data from the table: "PredicateObject" using primary key columns */
  predicateObject?: Maybe<PredicateObjects>
  /** fetch data from the table: "PredicateObject" */
  predicateObjects: Array<PredicateObjects>
  /** fetch aggregated fields from the table: "PredicateObject" */
  predicateObjects_aggregate: PredicateObjects_Aggregate
  /** fetch data from the table in a streaming manner: "PredicateObject" */
  predicateObjects_stream: Array<PredicateObjects>
  /** fetch data from the table: "Redemption" using primary key columns */
  redemption?: Maybe<Redemptions>
  /** An array relationship */
  redemptions: Array<Redemptions>
  /** An aggregate relationship */
  redemptions_aggregate: Redemptions_Aggregate
  /** fetch data from the table in a streaming manner: "Redemption" */
  redemptions_stream: Array<Redemptions>
  /** fetch data from the table: "Signal" using primary key columns */
  signal?: Maybe<Signals>
  /** An array relationship */
  signals: Array<Signals>
  /** An aggregate relationship */
  signals_aggregate: Signals_Aggregate
  /** execute function "signals_from_following" which returns "Signal" */
  signals_from_following: Array<Signals>
  /** execute function "signals_from_following" and query aggregates on result of table type "Signal" */
  signals_from_following_aggregate: Signals_Aggregate
  /** fetch data from the table in a streaming manner: "Signal" */
  signals_stream: Array<Signals>
  /** fetch data from the table: "Stats" using primary key columns */
  stat?: Maybe<Stats>
  /** fetch data from the table: "StatsHour" using primary key columns */
  statHour?: Maybe<StatHours>
  /** fetch data from the table: "StatsHour" */
  statHours: Array<StatHours>
  /** fetch aggregated fields from the table: "StatsHour" */
  statHours_aggregate: StatHours_Aggregate
  /** fetch data from the table in a streaming manner: "StatsHour" */
  statHours_stream: Array<StatHours>
  /** fetch data from the table: "Stats" */
  stats: Array<Stats>
  /** fetch aggregated fields from the table: "Stats" */
  stats_aggregate: Stats_Aggregate
  /** fetch data from the table in a streaming manner: "Stats" */
  stats_stream: Array<Stats>
  /** fetch data from the table: "Thing" using primary key columns */
  thing?: Maybe<Things>
  /** fetch data from the table: "Thing" */
  things: Array<Things>
  /** fetch aggregated fields from the table: "Thing" */
  things_aggregate: Things_Aggregate
  /** fetch data from the table in a streaming manner: "Thing" */
  things_stream: Array<Things>
  /** fetch data from the table: "Triple" using primary key columns */
  triple?: Maybe<Triples>
  /** fetch data from the table: "Triple" */
  triples: Array<Triples>
  /** fetch aggregated fields from the table: "Triple" */
  triples_aggregate: Triples_Aggregate
  /** fetch data from the table in a streaming manner: "Triple" */
  triples_stream: Array<Triples>
  /** fetch data from the table: "Vault" using primary key columns */
  vault?: Maybe<Vaults>
  /** fetch data from the table: "Vault" */
  vaults: Array<Vaults>
  /** fetch aggregated fields from the table: "Vault" */
  vaults_aggregate: Vaults_Aggregate
  /** fetch data from the table in a streaming manner: "Vault" */
  vaults_stream: Array<Vaults>
}

export type Subscription_RootAccountArgs = {
  id: Scalars['String']['input']
}

export type Subscription_RootAccountsArgs = {
  distinct_on?: InputMaybe<Array<Accounts_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Accounts_Order_By>>
  where?: InputMaybe<Accounts_Bool_Exp>
}

export type Subscription_RootAccounts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Accounts_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Accounts_Order_By>>
  where?: InputMaybe<Accounts_Bool_Exp>
}

export type Subscription_RootAccounts_StreamArgs = {
  batch_size: Scalars['Int']['input']
  cursor: Array<InputMaybe<Accounts_Stream_Cursor_Input>>
  where?: InputMaybe<Accounts_Bool_Exp>
}

export type Subscription_RootAccounts_That_Claim_About_AccountArgs = {
  args: Accounts_That_Claim_About_Account_Args
  distinct_on?: InputMaybe<Array<Accounts_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Accounts_Order_By>>
  where?: InputMaybe<Accounts_Bool_Exp>
}

export type Subscription_RootAccounts_That_Claim_About_Account_AggregateArgs = {
  args: Accounts_That_Claim_About_Account_Args
  distinct_on?: InputMaybe<Array<Accounts_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Accounts_Order_By>>
  where?: InputMaybe<Accounts_Bool_Exp>
}

export type Subscription_RootAtomArgs = {
  id: Scalars['numeric']['input']
}

export type Subscription_RootAtomValueArgs = {
  id: Scalars['numeric']['input']
}

export type Subscription_RootAtomValuesArgs = {
  distinct_on?: InputMaybe<Array<AtomValues_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<AtomValues_Order_By>>
  where?: InputMaybe<AtomValues_Bool_Exp>
}

export type Subscription_RootAtomValues_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AtomValues_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<AtomValues_Order_By>>
  where?: InputMaybe<AtomValues_Bool_Exp>
}

export type Subscription_RootAtomValues_StreamArgs = {
  batch_size: Scalars['Int']['input']
  cursor: Array<InputMaybe<AtomValues_Stream_Cursor_Input>>
  where?: InputMaybe<AtomValues_Bool_Exp>
}

export type Subscription_RootAtomsArgs = {
  distinct_on?: InputMaybe<Array<Atoms_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Atoms_Order_By>>
  where?: InputMaybe<Atoms_Bool_Exp>
}

export type Subscription_RootAtoms_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Atoms_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Atoms_Order_By>>
  where?: InputMaybe<Atoms_Bool_Exp>
}

export type Subscription_RootAtoms_StreamArgs = {
  batch_size: Scalars['Int']['input']
  cursor: Array<InputMaybe<Atoms_Stream_Cursor_Input>>
  where?: InputMaybe<Atoms_Bool_Exp>
}

export type Subscription_RootBookArgs = {
  id: Scalars['numeric']['input']
}

export type Subscription_RootBooksArgs = {
  distinct_on?: InputMaybe<Array<Books_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Books_Order_By>>
  where?: InputMaybe<Books_Bool_Exp>
}

export type Subscription_RootBooks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Books_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Books_Order_By>>
  where?: InputMaybe<Books_Bool_Exp>
}

export type Subscription_RootBooks_StreamArgs = {
  batch_size: Scalars['Int']['input']
  cursor: Array<InputMaybe<Books_Stream_Cursor_Input>>
  where?: InputMaybe<Books_Bool_Exp>
}

export type Subscription_RootChainLinkPriceArgs = {
  id: Scalars['numeric']['input']
}

export type Subscription_RootChainLinkPricesArgs = {
  distinct_on?: InputMaybe<Array<ChainLinkPrices_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<ChainLinkPrices_Order_By>>
  where?: InputMaybe<ChainLinkPrices_Bool_Exp>
}

export type Subscription_RootChainLinkPrices_StreamArgs = {
  batch_size: Scalars['Int']['input']
  cursor: Array<InputMaybe<ChainLinkPrices_Stream_Cursor_Input>>
  where?: InputMaybe<ChainLinkPrices_Bool_Exp>
}

export type Subscription_RootClaimArgs = {
  id: Scalars['String']['input']
}

export type Subscription_RootClaimsArgs = {
  distinct_on?: InputMaybe<Array<Claims_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Claims_Order_By>>
  where?: InputMaybe<Claims_Bool_Exp>
}

export type Subscription_RootClaims_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Claims_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Claims_Order_By>>
  where?: InputMaybe<Claims_Bool_Exp>
}

export type Subscription_RootClaims_From_FollowingArgs = {
  args: Claims_From_Following_Args
  distinct_on?: InputMaybe<Array<Claims_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Claims_Order_By>>
  where?: InputMaybe<Claims_Bool_Exp>
}

export type Subscription_RootClaims_From_Following_AggregateArgs = {
  args: Claims_From_Following_Args
  distinct_on?: InputMaybe<Array<Claims_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Claims_Order_By>>
  where?: InputMaybe<Claims_Bool_Exp>
}

export type Subscription_RootClaims_StreamArgs = {
  batch_size: Scalars['Int']['input']
  cursor: Array<InputMaybe<Claims_Stream_Cursor_Input>>
  where?: InputMaybe<Claims_Bool_Exp>
}

export type Subscription_RootDepositArgs = {
  id: Scalars['String']['input']
}

export type Subscription_RootDepositsArgs = {
  distinct_on?: InputMaybe<Array<Deposits_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Deposits_Order_By>>
  where?: InputMaybe<Deposits_Bool_Exp>
}

export type Subscription_RootDeposits_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Deposits_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Deposits_Order_By>>
  where?: InputMaybe<Deposits_Bool_Exp>
}

export type Subscription_RootDeposits_StreamArgs = {
  batch_size: Scalars['Int']['input']
  cursor: Array<InputMaybe<Deposits_Stream_Cursor_Input>>
  where?: InputMaybe<Deposits_Bool_Exp>
}

export type Subscription_RootEventArgs = {
  id: Scalars['String']['input']
}

export type Subscription_RootEventsArgs = {
  distinct_on?: InputMaybe<Array<Events_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Events_Order_By>>
  where?: InputMaybe<Events_Bool_Exp>
}

export type Subscription_RootEvents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Events_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Events_Order_By>>
  where?: InputMaybe<Events_Bool_Exp>
}

export type Subscription_RootEvents_StreamArgs = {
  batch_size: Scalars['Int']['input']
  cursor: Array<InputMaybe<Events_Stream_Cursor_Input>>
  where?: InputMaybe<Events_Bool_Exp>
}

export type Subscription_RootFeeTranfersArgs = {
  distinct_on?: InputMaybe<Array<FeeTranfers_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<FeeTranfers_Order_By>>
  where?: InputMaybe<FeeTranfers_Bool_Exp>
}

export type Subscription_RootFeeTranfers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<FeeTranfers_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<FeeTranfers_Order_By>>
  where?: InputMaybe<FeeTranfers_Bool_Exp>
}

export type Subscription_RootFeeTranfers_StreamArgs = {
  batch_size: Scalars['Int']['input']
  cursor: Array<InputMaybe<FeeTranfers_Stream_Cursor_Input>>
  where?: InputMaybe<FeeTranfers_Bool_Exp>
}

export type Subscription_RootFeeTransfersArgs = {
  id: Scalars['String']['input']
}

export type Subscription_RootFollowingArgs = {
  args: Following_Args
  distinct_on?: InputMaybe<Array<Accounts_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Accounts_Order_By>>
  where?: InputMaybe<Accounts_Bool_Exp>
}

export type Subscription_RootFollowing_AggregateArgs = {
  args: Following_Args
  distinct_on?: InputMaybe<Array<Accounts_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Accounts_Order_By>>
  where?: InputMaybe<Accounts_Bool_Exp>
}

export type Subscription_RootOrganizationArgs = {
  id: Scalars['numeric']['input']
}

export type Subscription_RootOrganizationsArgs = {
  distinct_on?: InputMaybe<Array<Organizations_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Organizations_Order_By>>
  where?: InputMaybe<Organizations_Bool_Exp>
}

export type Subscription_RootOrganizations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Organizations_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Organizations_Order_By>>
  where?: InputMaybe<Organizations_Bool_Exp>
}

export type Subscription_RootOrganizations_StreamArgs = {
  batch_size: Scalars['Int']['input']
  cursor: Array<InputMaybe<Organizations_Stream_Cursor_Input>>
  where?: InputMaybe<Organizations_Bool_Exp>
}

export type Subscription_RootPersonArgs = {
  id: Scalars['numeric']['input']
}

export type Subscription_RootPersonsArgs = {
  distinct_on?: InputMaybe<Array<Persons_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Persons_Order_By>>
  where?: InputMaybe<Persons_Bool_Exp>
}

export type Subscription_RootPersons_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Persons_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Persons_Order_By>>
  where?: InputMaybe<Persons_Bool_Exp>
}

export type Subscription_RootPersons_StreamArgs = {
  batch_size: Scalars['Int']['input']
  cursor: Array<InputMaybe<Persons_Stream_Cursor_Input>>
  where?: InputMaybe<Persons_Bool_Exp>
}

export type Subscription_RootPositionArgs = {
  id: Scalars['String']['input']
}

export type Subscription_RootPositionsArgs = {
  distinct_on?: InputMaybe<Array<Positions_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Positions_Order_By>>
  where?: InputMaybe<Positions_Bool_Exp>
}

export type Subscription_RootPositions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Positions_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Positions_Order_By>>
  where?: InputMaybe<Positions_Bool_Exp>
}

export type Subscription_RootPositions_StreamArgs = {
  batch_size: Scalars['Int']['input']
  cursor: Array<InputMaybe<Positions_Stream_Cursor_Input>>
  where?: InputMaybe<Positions_Bool_Exp>
}

export type Subscription_RootPredicateObjectArgs = {
  id: Scalars['String']['input']
}

export type Subscription_RootPredicateObjectsArgs = {
  distinct_on?: InputMaybe<Array<PredicateObjects_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<PredicateObjects_Order_By>>
  where?: InputMaybe<PredicateObjects_Bool_Exp>
}

export type Subscription_RootPredicateObjects_AggregateArgs = {
  distinct_on?: InputMaybe<Array<PredicateObjects_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<PredicateObjects_Order_By>>
  where?: InputMaybe<PredicateObjects_Bool_Exp>
}

export type Subscription_RootPredicateObjects_StreamArgs = {
  batch_size: Scalars['Int']['input']
  cursor: Array<InputMaybe<PredicateObjects_Stream_Cursor_Input>>
  where?: InputMaybe<PredicateObjects_Bool_Exp>
}

export type Subscription_RootRedemptionArgs = {
  id: Scalars['String']['input']
}

export type Subscription_RootRedemptionsArgs = {
  distinct_on?: InputMaybe<Array<Redemptions_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Redemptions_Order_By>>
  where?: InputMaybe<Redemptions_Bool_Exp>
}

export type Subscription_RootRedemptions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Redemptions_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Redemptions_Order_By>>
  where?: InputMaybe<Redemptions_Bool_Exp>
}

export type Subscription_RootRedemptions_StreamArgs = {
  batch_size: Scalars['Int']['input']
  cursor: Array<InputMaybe<Redemptions_Stream_Cursor_Input>>
  where?: InputMaybe<Redemptions_Bool_Exp>
}

export type Subscription_RootSignalArgs = {
  id: Scalars['String']['input']
}

export type Subscription_RootSignalsArgs = {
  distinct_on?: InputMaybe<Array<Signals_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Signals_Order_By>>
  where?: InputMaybe<Signals_Bool_Exp>
}

export type Subscription_RootSignals_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Signals_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Signals_Order_By>>
  where?: InputMaybe<Signals_Bool_Exp>
}

export type Subscription_RootSignals_From_FollowingArgs = {
  args: Signals_From_Following_Args
  distinct_on?: InputMaybe<Array<Signals_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Signals_Order_By>>
  where?: InputMaybe<Signals_Bool_Exp>
}

export type Subscription_RootSignals_From_Following_AggregateArgs = {
  args: Signals_From_Following_Args
  distinct_on?: InputMaybe<Array<Signals_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Signals_Order_By>>
  where?: InputMaybe<Signals_Bool_Exp>
}

export type Subscription_RootSignals_StreamArgs = {
  batch_size: Scalars['Int']['input']
  cursor: Array<InputMaybe<Signals_Stream_Cursor_Input>>
  where?: InputMaybe<Signals_Bool_Exp>
}

export type Subscription_RootStatArgs = {
  id: Scalars['Int']['input']
}

export type Subscription_RootStatHourArgs = {
  id: Scalars['Int']['input']
}

export type Subscription_RootStatHoursArgs = {
  distinct_on?: InputMaybe<Array<StatHours_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<StatHours_Order_By>>
  where?: InputMaybe<StatHours_Bool_Exp>
}

export type Subscription_RootStatHours_AggregateArgs = {
  distinct_on?: InputMaybe<Array<StatHours_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<StatHours_Order_By>>
  where?: InputMaybe<StatHours_Bool_Exp>
}

export type Subscription_RootStatHours_StreamArgs = {
  batch_size: Scalars['Int']['input']
  cursor: Array<InputMaybe<StatHours_Stream_Cursor_Input>>
  where?: InputMaybe<StatHours_Bool_Exp>
}

export type Subscription_RootStatsArgs = {
  distinct_on?: InputMaybe<Array<Stats_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Stats_Order_By>>
  where?: InputMaybe<Stats_Bool_Exp>
}

export type Subscription_RootStats_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Stats_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Stats_Order_By>>
  where?: InputMaybe<Stats_Bool_Exp>
}

export type Subscription_RootStats_StreamArgs = {
  batch_size: Scalars['Int']['input']
  cursor: Array<InputMaybe<Stats_Stream_Cursor_Input>>
  where?: InputMaybe<Stats_Bool_Exp>
}

export type Subscription_RootThingArgs = {
  id: Scalars['numeric']['input']
}

export type Subscription_RootThingsArgs = {
  distinct_on?: InputMaybe<Array<Things_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Things_Order_By>>
  where?: InputMaybe<Things_Bool_Exp>
}

export type Subscription_RootThings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Things_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Things_Order_By>>
  where?: InputMaybe<Things_Bool_Exp>
}

export type Subscription_RootThings_StreamArgs = {
  batch_size: Scalars['Int']['input']
  cursor: Array<InputMaybe<Things_Stream_Cursor_Input>>
  where?: InputMaybe<Things_Bool_Exp>
}

export type Subscription_RootTripleArgs = {
  id: Scalars['numeric']['input']
}

export type Subscription_RootTriplesArgs = {
  distinct_on?: InputMaybe<Array<Triples_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Triples_Order_By>>
  where?: InputMaybe<Triples_Bool_Exp>
}

export type Subscription_RootTriples_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Triples_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Triples_Order_By>>
  where?: InputMaybe<Triples_Bool_Exp>
}

export type Subscription_RootTriples_StreamArgs = {
  batch_size: Scalars['Int']['input']
  cursor: Array<InputMaybe<Triples_Stream_Cursor_Input>>
  where?: InputMaybe<Triples_Bool_Exp>
}

export type Subscription_RootVaultArgs = {
  id: Scalars['numeric']['input']
}

export type Subscription_RootVaultsArgs = {
  distinct_on?: InputMaybe<Array<Vaults_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Vaults_Order_By>>
  where?: InputMaybe<Vaults_Bool_Exp>
}

export type Subscription_RootVaults_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Vaults_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Vaults_Order_By>>
  where?: InputMaybe<Vaults_Bool_Exp>
}

export type Subscription_RootVaults_StreamArgs = {
  batch_size: Scalars['Int']['input']
  cursor: Array<InputMaybe<Vaults_Stream_Cursor_Input>>
  where?: InputMaybe<Vaults_Bool_Exp>
}

/** columns and relationships of "Thing" */
export type Things = {
  __typename?: 'things'
  /** An object relationship */
  atom?: Maybe<Atoms>
  atomId: Scalars['numeric']['output']
  description?: Maybe<Scalars['String']['output']>
  id: Scalars['numeric']['output']
  image?: Maybe<Scalars['String']['output']>
  name?: Maybe<Scalars['String']['output']>
  url?: Maybe<Scalars['String']['output']>
}

/** aggregated selection of "Thing" */
export type Things_Aggregate = {
  __typename?: 'things_aggregate'
  aggregate?: Maybe<Things_Aggregate_Fields>
  nodes: Array<Things>
}

/** aggregate fields of "Thing" */
export type Things_Aggregate_Fields = {
  __typename?: 'things_aggregate_fields'
  avg?: Maybe<Things_Avg_Fields>
  count: Scalars['Int']['output']
  max?: Maybe<Things_Max_Fields>
  min?: Maybe<Things_Min_Fields>
  stddev?: Maybe<Things_Stddev_Fields>
  stddev_pop?: Maybe<Things_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Things_Stddev_Samp_Fields>
  sum?: Maybe<Things_Sum_Fields>
  var_pop?: Maybe<Things_Var_Pop_Fields>
  var_samp?: Maybe<Things_Var_Samp_Fields>
  variance?: Maybe<Things_Variance_Fields>
}

/** aggregate fields of "Thing" */
export type Things_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Things_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
}

/** aggregate avg on columns */
export type Things_Avg_Fields = {
  __typename?: 'things_avg_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
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

/** aggregate max on columns */
export type Things_Max_Fields = {
  __typename?: 'things_max_fields'
  atomId?: Maybe<Scalars['numeric']['output']>
  description?: Maybe<Scalars['String']['output']>
  id?: Maybe<Scalars['numeric']['output']>
  image?: Maybe<Scalars['String']['output']>
  name?: Maybe<Scalars['String']['output']>
  url?: Maybe<Scalars['String']['output']>
}

/** aggregate min on columns */
export type Things_Min_Fields = {
  __typename?: 'things_min_fields'
  atomId?: Maybe<Scalars['numeric']['output']>
  description?: Maybe<Scalars['String']['output']>
  id?: Maybe<Scalars['numeric']['output']>
  image?: Maybe<Scalars['String']['output']>
  name?: Maybe<Scalars['String']['output']>
  url?: Maybe<Scalars['String']['output']>
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
export type Things_Select_Column =
  /** column name */
  | 'atomId'
  /** column name */
  | 'description'
  /** column name */
  | 'id'
  /** column name */
  | 'image'
  /** column name */
  | 'name'
  /** column name */
  | 'url'

/** aggregate stddev on columns */
export type Things_Stddev_Fields = {
  __typename?: 'things_stddev_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
}

/** aggregate stddev_pop on columns */
export type Things_Stddev_Pop_Fields = {
  __typename?: 'things_stddev_pop_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
}

/** aggregate stddev_samp on columns */
export type Things_Stddev_Samp_Fields = {
  __typename?: 'things_stddev_samp_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
}

/** Streaming cursor of the table "things" */
export type Things_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Things_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Things_Stream_Cursor_Value_Input = {
  atomId?: InputMaybe<Scalars['numeric']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['numeric']['input']>
  image?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  url?: InputMaybe<Scalars['String']['input']>
}

/** aggregate sum on columns */
export type Things_Sum_Fields = {
  __typename?: 'things_sum_fields'
  atomId?: Maybe<Scalars['numeric']['output']>
  id?: Maybe<Scalars['numeric']['output']>
}

/** aggregate var_pop on columns */
export type Things_Var_Pop_Fields = {
  __typename?: 'things_var_pop_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
}

/** aggregate var_samp on columns */
export type Things_Var_Samp_Fields = {
  __typename?: 'things_var_samp_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
}

/** aggregate variance on columns */
export type Things_Variance_Fields = {
  __typename?: 'things_variance_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
}

/** columns and relationships of "Triple" */
export type Triples = {
  __typename?: 'triples'
  blockNumber: Scalars['numeric']['output']
  blockTimestamp: Scalars['numeric']['output']
  /** An object relationship */
  counterVault?: Maybe<Vaults>
  counterVaultId: Scalars['numeric']['output']
  /** An object relationship */
  creator?: Maybe<Accounts>
  creatorId: Scalars['String']['output']
  id: Scalars['numeric']['output']
  label?: Maybe<Scalars['String']['output']>
  /** An object relationship */
  object?: Maybe<Atoms>
  objectId: Scalars['numeric']['output']
  /** An object relationship */
  predicate?: Maybe<Atoms>
  predicateId: Scalars['numeric']['output']
  /** An object relationship */
  subject?: Maybe<Atoms>
  subjectId: Scalars['numeric']['output']
  transactionHash: Scalars['bytea']['output']
  /** An object relationship */
  vault?: Maybe<Vaults>
  vaultId: Scalars['numeric']['output']
}

/** aggregated selection of "Triple" */
export type Triples_Aggregate = {
  __typename?: 'triples_aggregate'
  aggregate?: Maybe<Triples_Aggregate_Fields>
  nodes: Array<Triples>
}

export type Triples_Aggregate_Bool_Exp = {
  count?: InputMaybe<Triples_Aggregate_Bool_Exp_Count>
}

export type Triples_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Triples_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
  filter?: InputMaybe<Triples_Bool_Exp>
  predicate: Int_Comparison_Exp
}

/** aggregate fields of "Triple" */
export type Triples_Aggregate_Fields = {
  __typename?: 'triples_aggregate_fields'
  avg?: Maybe<Triples_Avg_Fields>
  count: Scalars['Int']['output']
  max?: Maybe<Triples_Max_Fields>
  min?: Maybe<Triples_Min_Fields>
  stddev?: Maybe<Triples_Stddev_Fields>
  stddev_pop?: Maybe<Triples_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Triples_Stddev_Samp_Fields>
  sum?: Maybe<Triples_Sum_Fields>
  var_pop?: Maybe<Triples_Var_Pop_Fields>
  var_samp?: Maybe<Triples_Var_Samp_Fields>
  variance?: Maybe<Triples_Variance_Fields>
}

/** aggregate fields of "Triple" */
export type Triples_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Triples_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
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

/** aggregate avg on columns */
export type Triples_Avg_Fields = {
  __typename?: 'triples_avg_fields'
  blockNumber?: Maybe<Scalars['Float']['output']>
  blockTimestamp?: Maybe<Scalars['Float']['output']>
  counterVaultId?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
  objectId?: Maybe<Scalars['Float']['output']>
  predicateId?: Maybe<Scalars['Float']['output']>
  subjectId?: Maybe<Scalars['Float']['output']>
  vaultId?: Maybe<Scalars['Float']['output']>
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

/** aggregate max on columns */
export type Triples_Max_Fields = {
  __typename?: 'triples_max_fields'
  blockNumber?: Maybe<Scalars['numeric']['output']>
  blockTimestamp?: Maybe<Scalars['numeric']['output']>
  counterVaultId?: Maybe<Scalars['numeric']['output']>
  creatorId?: Maybe<Scalars['String']['output']>
  id?: Maybe<Scalars['numeric']['output']>
  label?: Maybe<Scalars['String']['output']>
  objectId?: Maybe<Scalars['numeric']['output']>
  predicateId?: Maybe<Scalars['numeric']['output']>
  subjectId?: Maybe<Scalars['numeric']['output']>
  vaultId?: Maybe<Scalars['numeric']['output']>
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

/** aggregate min on columns */
export type Triples_Min_Fields = {
  __typename?: 'triples_min_fields'
  blockNumber?: Maybe<Scalars['numeric']['output']>
  blockTimestamp?: Maybe<Scalars['numeric']['output']>
  counterVaultId?: Maybe<Scalars['numeric']['output']>
  creatorId?: Maybe<Scalars['String']['output']>
  id?: Maybe<Scalars['numeric']['output']>
  label?: Maybe<Scalars['String']['output']>
  objectId?: Maybe<Scalars['numeric']['output']>
  predicateId?: Maybe<Scalars['numeric']['output']>
  subjectId?: Maybe<Scalars['numeric']['output']>
  vaultId?: Maybe<Scalars['numeric']['output']>
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
export type Triples_Select_Column =
  /** column name */
  | 'blockNumber'
  /** column name */
  | 'blockTimestamp'
  /** column name */
  | 'counterVaultId'
  /** column name */
  | 'creatorId'
  /** column name */
  | 'id'
  /** column name */
  | 'label'
  /** column name */
  | 'objectId'
  /** column name */
  | 'predicateId'
  /** column name */
  | 'subjectId'
  /** column name */
  | 'transactionHash'
  /** column name */
  | 'vaultId'

/** aggregate stddev on columns */
export type Triples_Stddev_Fields = {
  __typename?: 'triples_stddev_fields'
  blockNumber?: Maybe<Scalars['Float']['output']>
  blockTimestamp?: Maybe<Scalars['Float']['output']>
  counterVaultId?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
  objectId?: Maybe<Scalars['Float']['output']>
  predicateId?: Maybe<Scalars['Float']['output']>
  subjectId?: Maybe<Scalars['Float']['output']>
  vaultId?: Maybe<Scalars['Float']['output']>
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

/** aggregate stddev_pop on columns */
export type Triples_Stddev_Pop_Fields = {
  __typename?: 'triples_stddev_pop_fields'
  blockNumber?: Maybe<Scalars['Float']['output']>
  blockTimestamp?: Maybe<Scalars['Float']['output']>
  counterVaultId?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
  objectId?: Maybe<Scalars['Float']['output']>
  predicateId?: Maybe<Scalars['Float']['output']>
  subjectId?: Maybe<Scalars['Float']['output']>
  vaultId?: Maybe<Scalars['Float']['output']>
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

/** aggregate stddev_samp on columns */
export type Triples_Stddev_Samp_Fields = {
  __typename?: 'triples_stddev_samp_fields'
  blockNumber?: Maybe<Scalars['Float']['output']>
  blockTimestamp?: Maybe<Scalars['Float']['output']>
  counterVaultId?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
  objectId?: Maybe<Scalars['Float']['output']>
  predicateId?: Maybe<Scalars['Float']['output']>
  subjectId?: Maybe<Scalars['Float']['output']>
  vaultId?: Maybe<Scalars['Float']['output']>
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

/** Streaming cursor of the table "triples" */
export type Triples_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Triples_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Triples_Stream_Cursor_Value_Input = {
  blockNumber?: InputMaybe<Scalars['numeric']['input']>
  blockTimestamp?: InputMaybe<Scalars['numeric']['input']>
  counterVaultId?: InputMaybe<Scalars['numeric']['input']>
  creatorId?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['numeric']['input']>
  label?: InputMaybe<Scalars['String']['input']>
  objectId?: InputMaybe<Scalars['numeric']['input']>
  predicateId?: InputMaybe<Scalars['numeric']['input']>
  subjectId?: InputMaybe<Scalars['numeric']['input']>
  transactionHash?: InputMaybe<Scalars['bytea']['input']>
  vaultId?: InputMaybe<Scalars['numeric']['input']>
}

/** aggregate sum on columns */
export type Triples_Sum_Fields = {
  __typename?: 'triples_sum_fields'
  blockNumber?: Maybe<Scalars['numeric']['output']>
  blockTimestamp?: Maybe<Scalars['numeric']['output']>
  counterVaultId?: Maybe<Scalars['numeric']['output']>
  id?: Maybe<Scalars['numeric']['output']>
  objectId?: Maybe<Scalars['numeric']['output']>
  predicateId?: Maybe<Scalars['numeric']['output']>
  subjectId?: Maybe<Scalars['numeric']['output']>
  vaultId?: Maybe<Scalars['numeric']['output']>
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

/** aggregate var_pop on columns */
export type Triples_Var_Pop_Fields = {
  __typename?: 'triples_var_pop_fields'
  blockNumber?: Maybe<Scalars['Float']['output']>
  blockTimestamp?: Maybe<Scalars['Float']['output']>
  counterVaultId?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
  objectId?: Maybe<Scalars['Float']['output']>
  predicateId?: Maybe<Scalars['Float']['output']>
  subjectId?: Maybe<Scalars['Float']['output']>
  vaultId?: Maybe<Scalars['Float']['output']>
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

/** aggregate var_samp on columns */
export type Triples_Var_Samp_Fields = {
  __typename?: 'triples_var_samp_fields'
  blockNumber?: Maybe<Scalars['Float']['output']>
  blockTimestamp?: Maybe<Scalars['Float']['output']>
  counterVaultId?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
  objectId?: Maybe<Scalars['Float']['output']>
  predicateId?: Maybe<Scalars['Float']['output']>
  subjectId?: Maybe<Scalars['Float']['output']>
  vaultId?: Maybe<Scalars['Float']['output']>
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

/** aggregate variance on columns */
export type Triples_Variance_Fields = {
  __typename?: 'triples_variance_fields'
  blockNumber?: Maybe<Scalars['Float']['output']>
  blockTimestamp?: Maybe<Scalars['Float']['output']>
  counterVaultId?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
  objectId?: Maybe<Scalars['Float']['output']>
  predicateId?: Maybe<Scalars['Float']['output']>
  subjectId?: Maybe<Scalars['Float']['output']>
  vaultId?: Maybe<Scalars['Float']['output']>
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

/** columns and relationships of "Vault" */
export type Vaults = {
  __typename?: 'vaults'
  /** An object relationship */
  atom?: Maybe<Atoms>
  atomId?: Maybe<Scalars['numeric']['output']>
  currentSharePrice: Scalars['numeric']['output']
  /** An array relationship */
  deposits: Array<Deposits>
  /** An aggregate relationship */
  deposits_aggregate: Deposits_Aggregate
  id: Scalars['numeric']['output']
  positionCount: Scalars['Int']['output']
  /** An array relationship */
  positions: Array<Positions>
  /** An aggregate relationship */
  positions_aggregate: Positions_Aggregate
  /** An object relationship */
  redemptions?: Maybe<Redemptions>
  totalShares: Scalars['numeric']['output']
  /** An object relationship */
  triple?: Maybe<Triples>
  tripleId?: Maybe<Scalars['numeric']['output']>
}

/** columns and relationships of "Vault" */
export type VaultsDepositsArgs = {
  distinct_on?: InputMaybe<Array<Deposits_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Deposits_Order_By>>
  where?: InputMaybe<Deposits_Bool_Exp>
}

/** columns and relationships of "Vault" */
export type VaultsDeposits_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Deposits_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Deposits_Order_By>>
  where?: InputMaybe<Deposits_Bool_Exp>
}

/** columns and relationships of "Vault" */
export type VaultsPositionsArgs = {
  distinct_on?: InputMaybe<Array<Positions_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Positions_Order_By>>
  where?: InputMaybe<Positions_Bool_Exp>
}

/** columns and relationships of "Vault" */
export type VaultsPositions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Positions_Select_Column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<Positions_Order_By>>
  where?: InputMaybe<Positions_Bool_Exp>
}

/** aggregated selection of "Vault" */
export type Vaults_Aggregate = {
  __typename?: 'vaults_aggregate'
  aggregate?: Maybe<Vaults_Aggregate_Fields>
  nodes: Array<Vaults>
}

/** aggregate fields of "Vault" */
export type Vaults_Aggregate_Fields = {
  __typename?: 'vaults_aggregate_fields'
  avg?: Maybe<Vaults_Avg_Fields>
  count: Scalars['Int']['output']
  max?: Maybe<Vaults_Max_Fields>
  min?: Maybe<Vaults_Min_Fields>
  stddev?: Maybe<Vaults_Stddev_Fields>
  stddev_pop?: Maybe<Vaults_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Vaults_Stddev_Samp_Fields>
  sum?: Maybe<Vaults_Sum_Fields>
  var_pop?: Maybe<Vaults_Var_Pop_Fields>
  var_samp?: Maybe<Vaults_Var_Samp_Fields>
  variance?: Maybe<Vaults_Variance_Fields>
}

/** aggregate fields of "Vault" */
export type Vaults_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Vaults_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
}

/** aggregate avg on columns */
export type Vaults_Avg_Fields = {
  __typename?: 'vaults_avg_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  currentSharePrice?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
  positionCount?: Maybe<Scalars['Float']['output']>
  totalShares?: Maybe<Scalars['Float']['output']>
  tripleId?: Maybe<Scalars['Float']['output']>
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
  deposits_aggregate?: InputMaybe<Deposits_Aggregate_Bool_Exp>
  id?: InputMaybe<Numeric_Comparison_Exp>
  positionCount?: InputMaybe<Int_Comparison_Exp>
  positions?: InputMaybe<Positions_Bool_Exp>
  positions_aggregate?: InputMaybe<Positions_Aggregate_Bool_Exp>
  redemptions?: InputMaybe<Redemptions_Bool_Exp>
  totalShares?: InputMaybe<Numeric_Comparison_Exp>
  triple?: InputMaybe<Triples_Bool_Exp>
  tripleId?: InputMaybe<Numeric_Comparison_Exp>
}

/** aggregate max on columns */
export type Vaults_Max_Fields = {
  __typename?: 'vaults_max_fields'
  atomId?: Maybe<Scalars['numeric']['output']>
  currentSharePrice?: Maybe<Scalars['numeric']['output']>
  id?: Maybe<Scalars['numeric']['output']>
  positionCount?: Maybe<Scalars['Int']['output']>
  totalShares?: Maybe<Scalars['numeric']['output']>
  tripleId?: Maybe<Scalars['numeric']['output']>
}

/** aggregate min on columns */
export type Vaults_Min_Fields = {
  __typename?: 'vaults_min_fields'
  atomId?: Maybe<Scalars['numeric']['output']>
  currentSharePrice?: Maybe<Scalars['numeric']['output']>
  id?: Maybe<Scalars['numeric']['output']>
  positionCount?: Maybe<Scalars['Int']['output']>
  totalShares?: Maybe<Scalars['numeric']['output']>
  tripleId?: Maybe<Scalars['numeric']['output']>
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
export type Vaults_Select_Column =
  /** column name */
  | 'atomId'
  /** column name */
  | 'currentSharePrice'
  /** column name */
  | 'id'
  /** column name */
  | 'positionCount'
  /** column name */
  | 'totalShares'
  /** column name */
  | 'tripleId'

/** aggregate stddev on columns */
export type Vaults_Stddev_Fields = {
  __typename?: 'vaults_stddev_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  currentSharePrice?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
  positionCount?: Maybe<Scalars['Float']['output']>
  totalShares?: Maybe<Scalars['Float']['output']>
  tripleId?: Maybe<Scalars['Float']['output']>
}

/** aggregate stddev_pop on columns */
export type Vaults_Stddev_Pop_Fields = {
  __typename?: 'vaults_stddev_pop_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  currentSharePrice?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
  positionCount?: Maybe<Scalars['Float']['output']>
  totalShares?: Maybe<Scalars['Float']['output']>
  tripleId?: Maybe<Scalars['Float']['output']>
}

/** aggregate stddev_samp on columns */
export type Vaults_Stddev_Samp_Fields = {
  __typename?: 'vaults_stddev_samp_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  currentSharePrice?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
  positionCount?: Maybe<Scalars['Float']['output']>
  totalShares?: Maybe<Scalars['Float']['output']>
  tripleId?: Maybe<Scalars['Float']['output']>
}

/** Streaming cursor of the table "vaults" */
export type Vaults_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Vaults_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Vaults_Stream_Cursor_Value_Input = {
  atomId?: InputMaybe<Scalars['numeric']['input']>
  currentSharePrice?: InputMaybe<Scalars['numeric']['input']>
  id?: InputMaybe<Scalars['numeric']['input']>
  positionCount?: InputMaybe<Scalars['Int']['input']>
  totalShares?: InputMaybe<Scalars['numeric']['input']>
  tripleId?: InputMaybe<Scalars['numeric']['input']>
}

/** aggregate sum on columns */
export type Vaults_Sum_Fields = {
  __typename?: 'vaults_sum_fields'
  atomId?: Maybe<Scalars['numeric']['output']>
  currentSharePrice?: Maybe<Scalars['numeric']['output']>
  id?: Maybe<Scalars['numeric']['output']>
  positionCount?: Maybe<Scalars['Int']['output']>
  totalShares?: Maybe<Scalars['numeric']['output']>
  tripleId?: Maybe<Scalars['numeric']['output']>
}

/** aggregate var_pop on columns */
export type Vaults_Var_Pop_Fields = {
  __typename?: 'vaults_var_pop_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  currentSharePrice?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
  positionCount?: Maybe<Scalars['Float']['output']>
  totalShares?: Maybe<Scalars['Float']['output']>
  tripleId?: Maybe<Scalars['Float']['output']>
}

/** aggregate var_samp on columns */
export type Vaults_Var_Samp_Fields = {
  __typename?: 'vaults_var_samp_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  currentSharePrice?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
  positionCount?: Maybe<Scalars['Float']['output']>
  totalShares?: Maybe<Scalars['Float']['output']>
  tripleId?: Maybe<Scalars['Float']['output']>
}

/** aggregate variance on columns */
export type Vaults_Variance_Fields = {
  __typename?: 'vaults_variance_fields'
  atomId?: Maybe<Scalars['Float']['output']>
  currentSharePrice?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['Float']['output']>
  positionCount?: Maybe<Scalars['Float']['output']>
  totalShares?: Maybe<Scalars['Float']['output']>
  tripleId?: Maybe<Scalars['Float']['output']>
}

export type AccountMetadataFragment = {
  __typename?: 'accounts'
  label: string
  image?: string | null
  id: string
  atomId?: any | null
  type: string
}

export type AccountClaimsFragment = {
  __typename?: 'accounts'
  claims: Array<{
    __typename?: 'claims'
    shares: any
    counterShares: any
    triple?: { __typename?: 'triples'; id: any; label?: string | null } | null
  }>
}

export type AccountPositionsFragment = {
  __typename?: 'accounts'
  positions_aggregate: {
    __typename?: 'positions_aggregate'
    nodes: Array<{
      __typename?: 'positions'
      id: string
      shares: any
      vault?: {
        __typename?: 'vaults'
        id: any
        totalShares: any
        currentSharePrice: any
        atom?: { __typename?: 'atoms'; id: any; label?: string | null } | null
        triple?: {
          __typename?: 'triples'
          id: any
          label?: string | null
        } | null
      } | null
    }>
  }
}

export type AccountCreatedAtomsFragment = {
  __typename?: 'accounts'
  createdAtoms_aggregate: {
    __typename?: 'atoms_aggregate'
    aggregate?: {
      __typename?: 'atoms_aggregate_fields'
      count: number
      sum?: { __typename?: 'atoms_sum_fields'; id?: any | null } | null
    } | null
    nodes: Array<{
      __typename?: 'atoms'
      id: any
      label?: string | null
      data: string
      vault?: {
        __typename?: 'vaults'
        totalShares: any
        positions_aggregate: {
          __typename?: 'positions_aggregate'
          nodes: Array<{
            __typename?: 'positions'
            shares: any
            account?: { __typename?: 'accounts'; id: string } | null
          }>
        }
      } | null
    }>
  }
}

export type AccountCreatedTriplesFragment = {
  __typename?: 'accounts'
  createdTriples_aggregate: {
    __typename?: 'triples_aggregate'
    aggregate?: {
      __typename?: 'triples_aggregate_fields'
      count: number
    } | null
    nodes: Array<{
      __typename?: 'triples'
      id: any
      label?: string | null
      subject?: { __typename?: 'atoms'; id: any; label?: string | null } | null
      predicate?: {
        __typename?: 'atoms'
        id: any
        label?: string | null
      } | null
      object?: { __typename?: 'atoms'; id: any; label?: string | null } | null
    }>
  }
}

export type ThingMetadataFragment = {
  __typename?: 'things'
  id: any
  image?: string | null
  name?: string | null
  description?: string | null
  url?: string | null
}

export type AtomMetadataFragment = {
  __typename?: 'atoms'
  data: string
  id: any
  image?: string | null
  label?: string | null
  emoji?: string | null
  type: string
}

export type AtomTxnFragment = {
  __typename?: 'atoms'
  blockNumber: any
  blockTimestamp: any
  transactionHash: any
  creatorId: string
}

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
}

export type AtomTripleFragment = {
  __typename?: 'atoms'
  asSubject: Array<{
    __typename?: 'triples'
    id: any
    label?: string | null
    object?: {
      __typename?: 'atoms'
      data: string
      id: any
      image?: string | null
      label?: string | null
      emoji?: string | null
      type: string
      creator?: {
        __typename?: 'accounts'
        label: string
        image?: string | null
        id: string
        atomId?: any | null
        type: string
      } | null
    } | null
    predicate?: {
      __typename?: 'atoms'
      data: string
      id: any
      image?: string | null
      label?: string | null
      emoji?: string | null
      type: string
      creator?: {
        __typename?: 'accounts'
        label: string
        image?: string | null
        id: string
        atomId?: any | null
        type: string
      } | null
    } | null
  }>
  asPredicate: Array<{
    __typename?: 'triples'
    id: any
    label?: string | null
    subject?: {
      __typename?: 'atoms'
      data: string
      id: any
      image?: string | null
      label?: string | null
      emoji?: string | null
      type: string
      creator?: {
        __typename?: 'accounts'
        label: string
        image?: string | null
        id: string
        atomId?: any | null
        type: string
      } | null
    } | null
    object?: {
      __typename?: 'atoms'
      data: string
      id: any
      image?: string | null
      label?: string | null
      emoji?: string | null
      type: string
      creator?: {
        __typename?: 'accounts'
        label: string
        image?: string | null
        id: string
        atomId?: any | null
        type: string
      } | null
    } | null
  }>
  asObject: Array<{
    __typename?: 'triples'
    id: any
    label?: string | null
    subject?: {
      __typename?: 'atoms'
      data: string
      id: any
      image?: string | null
      label?: string | null
      emoji?: string | null
      type: string
      creator?: {
        __typename?: 'accounts'
        label: string
        image?: string | null
        id: string
        atomId?: any | null
        type: string
      } | null
    } | null
    predicate?: {
      __typename?: 'atoms'
      data: string
      id: any
      image?: string | null
      label?: string | null
      emoji?: string | null
      type: string
      creator?: {
        __typename?: 'accounts'
        label: string
        image?: string | null
        id: string
        atomId?: any | null
        type: string
      } | null
    } | null
  }>
}

export type EventDetailsFragment = {
  __typename?: 'events'
  blockNumber: any
  blockTimestamp: any
  type: string
  transactionHash: any
  atomId?: any | null
  tripleId?: any | null
  depositId?: string | null
  feeTransferId?: string | null
  redemptionId?: string | null
}

export type PositionDetailsFragment = {
  __typename?: 'positions'
  id: string
  shares: any
  vaultId: any
  account?: { __typename?: 'accounts'; id: string; label: string } | null
  vault?: {
    __typename?: 'vaults'
    id: any
    atom?: { __typename?: 'atoms'; id: any; label?: string | null } | null
    triple?: {
      __typename?: 'triples'
      id: any
      subject?: { __typename?: 'atoms'; id: any; label?: string | null } | null
      predicate?: {
        __typename?: 'atoms'
        id: any
        label?: string | null
      } | null
      object?: { __typename?: 'atoms'; id: any; label?: string | null } | null
    } | null
  } | null
}

export type StatDetailsFragment = {
  __typename?: 'stats'
  contractBalance: any
  totalAccounts: number
  totalFees: any
  totalAtoms: number
  totalTriples: number
  totalPositions: number
  totalSignals: number
}

export type TripleMetadataFragment = {
  __typename?: 'triples'
  id: any
  label?: string | null
  subject?: {
    __typename?: 'atoms'
    data: string
    id: any
    image?: string | null
    label?: string | null
    emoji?: string | null
    type: string
    creator?: {
      __typename?: 'accounts'
      label: string
      image?: string | null
      id: string
      atomId?: any | null
      type: string
    } | null
  } | null
  predicate?: {
    __typename?: 'atoms'
    data: string
    id: any
    image?: string | null
    label?: string | null
    emoji?: string | null
    type: string
    creator?: {
      __typename?: 'accounts'
      label: string
      image?: string | null
      id: string
      atomId?: any | null
      type: string
    } | null
  } | null
  object?: {
    __typename?: 'atoms'
    data: string
    id: any
    image?: string | null
    label?: string | null
    emoji?: string | null
    type: string
    creator?: {
      __typename?: 'accounts'
      label: string
      image?: string | null
      id: string
      atomId?: any | null
      type: string
    } | null
  } | null
}

export type TripleTxnFragment = {
  __typename?: 'triples'
  blockNumber: any
  blockTimestamp: any
  transactionHash: any
  creatorId: string
}

export type TripleVaultDetailsFragment = {
  __typename?: 'triples'
  vaultId: any
  counterVaultId: any
  vault?: {
    __typename?: 'vaults'
    id: any
    currentSharePrice: any
    totalShares: any
    atom?: { __typename?: 'atoms'; id: any; label?: string | null } | null
    triple?: {
      __typename?: 'triples'
      id: any
      subject?: { __typename?: 'atoms'; id: any; label?: string | null } | null
      predicate?: {
        __typename?: 'atoms'
        id: any
        label?: string | null
      } | null
      object?: { __typename?: 'atoms'; id: any; label?: string | null } | null
    } | null
    positions_aggregate: {
      __typename?: 'positions_aggregate'
      nodes: Array<{
        __typename?: 'positions'
        shares: any
        account?: { __typename?: 'accounts'; id: string; label: string } | null
      }>
    }
  } | null
  counterVault?: {
    __typename?: 'vaults'
    id: any
    currentSharePrice: any
    totalShares: any
    atom?: { __typename?: 'atoms'; id: any; label?: string | null } | null
    triple?: {
      __typename?: 'triples'
      id: any
      subject?: { __typename?: 'atoms'; id: any; label?: string | null } | null
      predicate?: {
        __typename?: 'atoms'
        id: any
        label?: string | null
      } | null
      object?: { __typename?: 'atoms'; id: any; label?: string | null } | null
    } | null
    positions_aggregate: {
      __typename?: 'positions_aggregate'
      nodes: Array<{
        __typename?: 'positions'
        shares: any
        account?: { __typename?: 'accounts'; id: string; label: string } | null
      }>
    }
  } | null
}

export type VaultDetailsFragment = {
  __typename?: 'vaults'
  id: any
  currentSharePrice: any
  totalShares: any
  atom?: { __typename?: 'atoms'; id: any; label?: string | null } | null
  triple?: {
    __typename?: 'triples'
    id: any
    subject?: { __typename?: 'atoms'; id: any; label?: string | null } | null
    predicate?: { __typename?: 'atoms'; id: any; label?: string | null } | null
    object?: { __typename?: 'atoms'; id: any; label?: string | null } | null
  } | null
  positions_aggregate: {
    __typename?: 'positions_aggregate'
    nodes: Array<{
      __typename?: 'positions'
      shares: any
      account?: { __typename?: 'accounts'; id: string; label: string } | null
    }>
  }
}

export type GetAccountsQueryVariables = Exact<{ [key: string]: never }>

export type GetAccountsQuery = {
  __typename?: 'query_root'
  accounts: Array<{
    __typename?: 'accounts'
    label: string
    image?: string | null
    id: string
    atomId?: any | null
    type: string
    claims: Array<{
      __typename?: 'claims'
      shares: any
      counterShares: any
      triple?: { __typename?: 'triples'; id: any; label?: string | null } | null
    }>
    positions_aggregate: {
      __typename?: 'positions_aggregate'
      nodes: Array<{
        __typename?: 'positions'
        id: string
        shares: any
        vault?: {
          __typename?: 'vaults'
          id: any
          totalShares: any
          currentSharePrice: any
          atom?: { __typename?: 'atoms'; id: any; label?: string | null } | null
          triple?: {
            __typename?: 'triples'
            id: any
            label?: string | null
          } | null
        } | null
      }>
    }
  }>
}

export type GetAccountQueryVariables = Exact<{
  address: Scalars['String']['input']
  atomsWhere?: InputMaybe<Atoms_Bool_Exp>
  atomsOrderBy?: InputMaybe<Array<Atoms_Order_By> | Atoms_Order_By>
  atomsLimit?: InputMaybe<Scalars['Int']['input']>
  atomsOffset?: InputMaybe<Scalars['Int']['input']>
  triplesWhere?: InputMaybe<Triples_Bool_Exp>
  triplesOrderBy?: InputMaybe<Array<Triples_Order_By> | Triples_Order_By>
  triplesLimit?: InputMaybe<Scalars['Int']['input']>
  triplesOffset?: InputMaybe<Scalars['Int']['input']>
}>

export type GetAccountQuery = {
  __typename?: 'query_root'
  account?: {
    __typename?: 'accounts'
    label: string
    image?: string | null
    id: string
    atomId?: any | null
    type: string
    claims: Array<{
      __typename?: 'claims'
      shares: any
      counterShares: any
      triple?: { __typename?: 'triples'; id: any; label?: string | null } | null
    }>
    positions_aggregate: {
      __typename?: 'positions_aggregate'
      nodes: Array<{
        __typename?: 'positions'
        id: string
        shares: any
        vault?: {
          __typename?: 'vaults'
          id: any
          totalShares: any
          currentSharePrice: any
          atom?: { __typename?: 'atoms'; id: any; label?: string | null } | null
          triple?: {
            __typename?: 'triples'
            id: any
            label?: string | null
          } | null
        } | null
      }>
    }
    createdAtoms_aggregate: {
      __typename?: 'atoms_aggregate'
      aggregate?: {
        __typename?: 'atoms_aggregate_fields'
        count: number
        sum?: { __typename?: 'atoms_sum_fields'; id?: any | null } | null
      } | null
      nodes: Array<{
        __typename?: 'atoms'
        id: any
        label?: string | null
        data: string
        vault?: {
          __typename?: 'vaults'
          totalShares: any
          positions_aggregate: {
            __typename?: 'positions_aggregate'
            nodes: Array<{
              __typename?: 'positions'
              shares: any
              account?: { __typename?: 'accounts'; id: string } | null
            }>
          }
        } | null
      }>
    }
    createdTriples_aggregate: {
      __typename?: 'triples_aggregate'
      aggregate?: {
        __typename?: 'triples_aggregate_fields'
        count: number
      } | null
      nodes: Array<{
        __typename?: 'triples'
        id: any
        label?: string | null
        subject?: {
          __typename?: 'atoms'
          id: any
          label?: string | null
        } | null
        predicate?: {
          __typename?: 'atoms'
          id: any
          label?: string | null
        } | null
        object?: { __typename?: 'atoms'; id: any; label?: string | null } | null
      }>
    }
  } | null
  chainLinkPrices: Array<{ __typename?: 'chainLinkPrices'; usd: any }>
}

export type GetAtomsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<Atoms_Order_By> | Atoms_Order_By>
  where?: InputMaybe<Atoms_Bool_Exp>
}>

export type GetAtomsQuery = {
  __typename?: 'query_root'
  atoms: Array<{
    __typename?: 'atoms'
    data: string
    id: any
    image?: string | null
    label?: string | null
    emoji?: string | null
    type: string
    blockNumber: any
    blockTimestamp: any
    transactionHash: any
    creatorId: string
    vaultId: any
    walletId: string
    creator?: {
      __typename?: 'accounts'
      label: string
      image?: string | null
      id: string
      atomId?: any | null
      type: string
    } | null
    vault?: {
      __typename?: 'vaults'
      positionCount: number
      totalShares: any
      currentSharePrice: any
    } | null
  }>
}

export type GetAtomQueryVariables = Exact<{
  id: Scalars['numeric']['input']
}>

export type GetAtomQuery = {
  __typename?: 'query_root'
  atom?: {
    __typename?: 'atoms'
    data: string
    id: any
    image?: string | null
    label?: string | null
    emoji?: string | null
    type: string
    blockNumber: any
    blockTimestamp: any
    transactionHash: any
    creatorId: string
    vaultId: any
    walletId: string
    creator?: {
      __typename?: 'accounts'
      label: string
      image?: string | null
      id: string
      atomId?: any | null
      type: string
    } | null
    vault?: {
      __typename?: 'vaults'
      positionCount: number
      totalShares: any
      currentSharePrice: any
    } | null
    asSubject: Array<{
      __typename?: 'triples'
      id: any
      label?: string | null
      object?: {
        __typename?: 'atoms'
        data: string
        id: any
        image?: string | null
        label?: string | null
        emoji?: string | null
        type: string
        creator?: {
          __typename?: 'accounts'
          label: string
          image?: string | null
          id: string
          atomId?: any | null
          type: string
        } | null
      } | null
      predicate?: {
        __typename?: 'atoms'
        data: string
        id: any
        image?: string | null
        label?: string | null
        emoji?: string | null
        type: string
        creator?: {
          __typename?: 'accounts'
          label: string
          image?: string | null
          id: string
          atomId?: any | null
          type: string
        } | null
      } | null
    }>
    asPredicate: Array<{
      __typename?: 'triples'
      id: any
      label?: string | null
      subject?: {
        __typename?: 'atoms'
        data: string
        id: any
        image?: string | null
        label?: string | null
        emoji?: string | null
        type: string
        creator?: {
          __typename?: 'accounts'
          label: string
          image?: string | null
          id: string
          atomId?: any | null
          type: string
        } | null
      } | null
      object?: {
        __typename?: 'atoms'
        data: string
        id: any
        image?: string | null
        label?: string | null
        emoji?: string | null
        type: string
        creator?: {
          __typename?: 'accounts'
          label: string
          image?: string | null
          id: string
          atomId?: any | null
          type: string
        } | null
      } | null
    }>
    asObject: Array<{
      __typename?: 'triples'
      id: any
      label?: string | null
      subject?: {
        __typename?: 'atoms'
        data: string
        id: any
        image?: string | null
        label?: string | null
        emoji?: string | null
        type: string
        creator?: {
          __typename?: 'accounts'
          label: string
          image?: string | null
          id: string
          atomId?: any | null
          type: string
        } | null
      } | null
      predicate?: {
        __typename?: 'atoms'
        data: string
        id: any
        image?: string | null
        label?: string | null
        emoji?: string | null
        type: string
        creator?: {
          __typename?: 'accounts'
          label: string
          image?: string | null
          id: string
          atomId?: any | null
          type: string
        } | null
      } | null
    }>
  } | null
  thing?: {
    __typename?: 'things'
    id: any
    image?: string | null
    name?: string | null
    description?: string | null
    url?: string | null
  } | null
}

export type GetClaimsByAddressQueryVariables = Exact<{
  address?: InputMaybe<Scalars['String']['input']>
}>

export type GetClaimsByAddressQuery = {
  __typename?: 'query_root'
  claims_aggregate: {
    __typename?: 'claims_aggregate'
    nodes: Array<{
      __typename?: 'claims'
      id: string
      vaultId: any
      counterVaultId: any
      shares: any
      counterShares: any
      account?: { __typename?: 'accounts'; label: string } | null
      triple?: {
        __typename?: 'triples'
        subject?: { __typename?: 'atoms'; label?: string | null } | null
        predicate?: { __typename?: 'atoms'; label?: string | null } | null
        object?: { __typename?: 'atoms'; label?: string | null } | null
      } | null
    }>
  }
}

export type GetEventsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<Events_Order_By> | Events_Order_By>
  where?: InputMaybe<Events_Bool_Exp>
}>

export type GetEventsQuery = {
  __typename?: 'query_root'
  events_aggregate: {
    __typename?: 'events_aggregate'
    nodes: Array<{
      __typename?: 'events'
      blockNumber: any
      blockTimestamp: any
      type: string
      transactionHash: any
      atomId?: any | null
      tripleId?: any | null
      depositId?: string | null
      feeTransferId?: string | null
      redemptionId?: string | null
    }>
  }
}

export type GetListItemsQueryVariables = Exact<{
  predicateId?: InputMaybe<Scalars['numeric']['input']>
  objectId?: InputMaybe<Scalars['numeric']['input']>
}>

export type GetListItemsQuery = {
  __typename?: 'query_root'
  triples: Array<{
    __typename?: 'triples'
    vaultId: any
    counterVaultId: any
    vault?: {
      __typename?: 'vaults'
      id: any
      currentSharePrice: any
      totalShares: any
      atom?: { __typename?: 'atoms'; id: any; label?: string | null } | null
      triple?: {
        __typename?: 'triples'
        id: any
        subject?: {
          __typename?: 'atoms'
          id: any
          label?: string | null
        } | null
        predicate?: {
          __typename?: 'atoms'
          id: any
          label?: string | null
        } | null
        object?: { __typename?: 'atoms'; id: any; label?: string | null } | null
      } | null
      positions_aggregate: {
        __typename?: 'positions_aggregate'
        nodes: Array<{
          __typename?: 'positions'
          shares: any
          account?: {
            __typename?: 'accounts'
            id: string
            label: string
          } | null
        }>
      }
    } | null
    counterVault?: {
      __typename?: 'vaults'
      id: any
      currentSharePrice: any
      totalShares: any
      atom?: { __typename?: 'atoms'; id: any; label?: string | null } | null
      triple?: {
        __typename?: 'triples'
        id: any
        subject?: {
          __typename?: 'atoms'
          id: any
          label?: string | null
        } | null
        predicate?: {
          __typename?: 'atoms'
          id: any
          label?: string | null
        } | null
        object?: { __typename?: 'atoms'; id: any; label?: string | null } | null
      } | null
      positions_aggregate: {
        __typename?: 'positions_aggregate'
        nodes: Array<{
          __typename?: 'positions'
          shares: any
          account?: {
            __typename?: 'accounts'
            id: string
            label: string
          } | null
        }>
      }
    } | null
  }>
}

export type GetPositionsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<Positions_Order_By> | Positions_Order_By>
  where?: InputMaybe<Positions_Bool_Exp>
}>

export type GetPositionsQuery = {
  __typename?: 'query_root'
  positions_aggregate: {
    __typename?: 'positions_aggregate'
    nodes: Array<{
      __typename?: 'positions'
      id: string
      shares: any
      vaultId: any
      account?: { __typename?: 'accounts'; id: string; label: string } | null
      vault?: {
        __typename?: 'vaults'
        id: any
        atom?: { __typename?: 'atoms'; id: any; label?: string | null } | null
        triple?: {
          __typename?: 'triples'
          id: any
          subject?: {
            __typename?: 'atoms'
            id: any
            label?: string | null
          } | null
          predicate?: {
            __typename?: 'atoms'
            id: any
            label?: string | null
          } | null
          object?: {
            __typename?: 'atoms'
            id: any
            label?: string | null
          } | null
        } | null
      } | null
    }>
  }
}

export type GetPositionQueryVariables = Exact<{
  positionId: Scalars['String']['input']
}>

export type GetPositionQuery = {
  __typename?: 'query_root'
  position?: {
    __typename?: 'positions'
    id: string
    shares: any
    vaultId: any
    account?: { __typename?: 'accounts'; id: string; label: string } | null
    vault?: {
      __typename?: 'vaults'
      id: any
      atom?: { __typename?: 'atoms'; id: any; label?: string | null } | null
      triple?: {
        __typename?: 'triples'
        id: any
        subject?: {
          __typename?: 'atoms'
          id: any
          label?: string | null
        } | null
        predicate?: {
          __typename?: 'atoms'
          id: any
          label?: string | null
        } | null
        object?: { __typename?: 'atoms'; id: any; label?: string | null } | null
      } | null
    } | null
  } | null
}

export type GetStatsQueryVariables = Exact<{ [key: string]: never }>

export type GetStatsQuery = {
  __typename?: 'query_root'
  stats: Array<{
    __typename?: 'stats'
    contractBalance: any
    totalAccounts: number
    totalFees: any
    totalAtoms: number
    totalTriples: number
    totalPositions: number
    totalSignals: number
  }>
}

export type GetTriplesQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<Triples_Order_By> | Triples_Order_By>
  where?: InputMaybe<Triples_Bool_Exp>
}>

export type GetTriplesQuery = {
  __typename?: 'query_root'
  triples: Array<{
    __typename?: 'triples'
    id: any
    label?: string | null
    blockNumber: any
    blockTimestamp: any
    transactionHash: any
    creatorId: string
    vaultId: any
    counterVaultId: any
    creator?: {
      __typename?: 'accounts'
      label: string
      image?: string | null
      id: string
      atomId?: any | null
      type: string
    } | null
    subject?: {
      __typename?: 'atoms'
      data: string
      id: any
      image?: string | null
      label?: string | null
      emoji?: string | null
      type: string
      creator?: {
        __typename?: 'accounts'
        label: string
        image?: string | null
        id: string
        atomId?: any | null
        type: string
      } | null
    } | null
    predicate?: {
      __typename?: 'atoms'
      data: string
      id: any
      image?: string | null
      label?: string | null
      emoji?: string | null
      type: string
      creator?: {
        __typename?: 'accounts'
        label: string
        image?: string | null
        id: string
        atomId?: any | null
        type: string
      } | null
    } | null
    object?: {
      __typename?: 'atoms'
      data: string
      id: any
      image?: string | null
      label?: string | null
      emoji?: string | null
      type: string
      creator?: {
        __typename?: 'accounts'
        label: string
        image?: string | null
        id: string
        atomId?: any | null
        type: string
      } | null
    } | null
    vault?: {
      __typename?: 'vaults'
      id: any
      currentSharePrice: any
      totalShares: any
      atom?: { __typename?: 'atoms'; id: any; label?: string | null } | null
      triple?: {
        __typename?: 'triples'
        id: any
        subject?: {
          __typename?: 'atoms'
          id: any
          label?: string | null
        } | null
        predicate?: {
          __typename?: 'atoms'
          id: any
          label?: string | null
        } | null
        object?: { __typename?: 'atoms'; id: any; label?: string | null } | null
      } | null
      positions_aggregate: {
        __typename?: 'positions_aggregate'
        nodes: Array<{
          __typename?: 'positions'
          shares: any
          account?: {
            __typename?: 'accounts'
            id: string
            label: string
          } | null
        }>
      }
    } | null
    counterVault?: {
      __typename?: 'vaults'
      id: any
      currentSharePrice: any
      totalShares: any
      atom?: { __typename?: 'atoms'; id: any; label?: string | null } | null
      triple?: {
        __typename?: 'triples'
        id: any
        subject?: {
          __typename?: 'atoms'
          id: any
          label?: string | null
        } | null
        predicate?: {
          __typename?: 'atoms'
          id: any
          label?: string | null
        } | null
        object?: { __typename?: 'atoms'; id: any; label?: string | null } | null
      } | null
      positions_aggregate: {
        __typename?: 'positions_aggregate'
        nodes: Array<{
          __typename?: 'positions'
          shares: any
          account?: {
            __typename?: 'accounts'
            id: string
            label: string
          } | null
        }>
      }
    } | null
  }>
}

export type GetTripleQueryVariables = Exact<{
  tripleId: Scalars['numeric']['input']
}>

export type GetTripleQuery = {
  __typename?: 'query_root'
  triple?: {
    __typename?: 'triples'
    id: any
    label?: string | null
    blockNumber: any
    blockTimestamp: any
    transactionHash: any
    creatorId: string
    vaultId: any
    counterVaultId: any
    creator?: {
      __typename?: 'accounts'
      label: string
      image?: string | null
      id: string
      atomId?: any | null
      type: string
    } | null
    subject?: {
      __typename?: 'atoms'
      data: string
      id: any
      image?: string | null
      label?: string | null
      emoji?: string | null
      type: string
      creator?: {
        __typename?: 'accounts'
        label: string
        image?: string | null
        id: string
        atomId?: any | null
        type: string
      } | null
    } | null
    predicate?: {
      __typename?: 'atoms'
      data: string
      id: any
      image?: string | null
      label?: string | null
      emoji?: string | null
      type: string
      creator?: {
        __typename?: 'accounts'
        label: string
        image?: string | null
        id: string
        atomId?: any | null
        type: string
      } | null
    } | null
    object?: {
      __typename?: 'atoms'
      data: string
      id: any
      image?: string | null
      label?: string | null
      emoji?: string | null
      type: string
      creator?: {
        __typename?: 'accounts'
        label: string
        image?: string | null
        id: string
        atomId?: any | null
        type: string
      } | null
    } | null
    vault?: {
      __typename?: 'vaults'
      id: any
      currentSharePrice: any
      totalShares: any
      atom?: { __typename?: 'atoms'; id: any; label?: string | null } | null
      triple?: {
        __typename?: 'triples'
        id: any
        subject?: {
          __typename?: 'atoms'
          id: any
          label?: string | null
        } | null
        predicate?: {
          __typename?: 'atoms'
          id: any
          label?: string | null
        } | null
        object?: { __typename?: 'atoms'; id: any; label?: string | null } | null
      } | null
      positions_aggregate: {
        __typename?: 'positions_aggregate'
        nodes: Array<{
          __typename?: 'positions'
          shares: any
          account?: {
            __typename?: 'accounts'
            id: string
            label: string
          } | null
        }>
      }
    } | null
    counterVault?: {
      __typename?: 'vaults'
      id: any
      currentSharePrice: any
      totalShares: any
      atom?: { __typename?: 'atoms'; id: any; label?: string | null } | null
      triple?: {
        __typename?: 'triples'
        id: any
        subject?: {
          __typename?: 'atoms'
          id: any
          label?: string | null
        } | null
        predicate?: {
          __typename?: 'atoms'
          id: any
          label?: string | null
        } | null
        object?: { __typename?: 'atoms'; id: any; label?: string | null } | null
      } | null
      positions_aggregate: {
        __typename?: 'positions_aggregate'
        nodes: Array<{
          __typename?: 'positions'
          shares: any
          account?: {
            __typename?: 'accounts'
            id: string
            label: string
          } | null
        }>
      }
    } | null
  } | null
}

export type GetVaultsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<Vaults_Order_By> | Vaults_Order_By>
  where?: InputMaybe<Vaults_Bool_Exp>
}>

export type GetVaultsQuery = {
  __typename?: 'query_root'
  vaults_aggregate: {
    __typename?: 'vaults_aggregate'
    nodes: Array<{
      __typename?: 'vaults'
      id: any
      currentSharePrice: any
      totalShares: any
      atom?: { __typename?: 'atoms'; id: any; label?: string | null } | null
      triple?: {
        __typename?: 'triples'
        id: any
        subject?: {
          __typename?: 'atoms'
          id: any
          label?: string | null
        } | null
        predicate?: {
          __typename?: 'atoms'
          id: any
          label?: string | null
        } | null
        object?: { __typename?: 'atoms'; id: any; label?: string | null } | null
      } | null
      positions_aggregate: {
        __typename?: 'positions_aggregate'
        nodes: Array<{
          __typename?: 'positions'
          shares: any
          account?: {
            __typename?: 'accounts'
            id: string
            label: string
          } | null
        }>
      }
    }>
  }
}

export type GetVaultQueryVariables = Exact<{
  vaultId: Scalars['numeric']['input']
}>

export type GetVaultQuery = {
  __typename?: 'query_root'
  vault?: {
    __typename?: 'vaults'
    id: any
    currentSharePrice: any
    totalShares: any
    atom?: { __typename?: 'atoms'; id: any; label?: string | null } | null
    triple?: {
      __typename?: 'triples'
      id: any
      subject?: { __typename?: 'atoms'; id: any; label?: string | null } | null
      predicate?: {
        __typename?: 'atoms'
        id: any
        label?: string | null
      } | null
      object?: { __typename?: 'atoms'; id: any; label?: string | null } | null
    } | null
    positions_aggregate: {
      __typename?: 'positions_aggregate'
      nodes: Array<{
        __typename?: 'positions'
        shares: any
        account?: { __typename?: 'accounts'; id: string; label: string } | null
      }>
    }
  } | null
}

export const AccountClaimsFragmentDoc = `
    fragment AccountClaims on accounts {
  claims(order_by: {shares: desc}) {
    triple {
      id
      label
    }
    shares
    counterShares
  }
}
    `
export const AccountPositionsFragmentDoc = `
    fragment AccountPositions on accounts {
  positions_aggregate(order_by: {shares: desc}) {
    nodes {
      id
      shares
      vault {
        id
        totalShares
        currentSharePrice
        atom {
          id
          label
        }
        triple {
          id
          label
        }
      }
    }
  }
}
    `
export const AccountCreatedAtomsFragmentDoc = `
    fragment AccountCreatedAtoms on accounts {
  createdAtoms_aggregate(
    where: $atomsWhere
    order_by: $atomsOrderBy
    limit: $atomsLimit
    offset: $atomsOffset
  ) {
    aggregate {
      count
      sum {
        id
      }
    }
    nodes {
      id
      label
      data
      vault {
        totalShares
        positions_aggregate(where: {accountId: {_eq: $address}}) {
          nodes {
            account {
              id
            }
            shares
          }
        }
      }
    }
  }
}
    `
export const AccountCreatedTriplesFragmentDoc = `
    fragment AccountCreatedTriples on accounts {
  createdTriples_aggregate(
    where: $triplesWhere
    order_by: $triplesOrderBy
    limit: $triplesLimit
    offset: $triplesOffset
  ) {
    aggregate {
      count
    }
    nodes {
      id
      label
      subject {
        id
        label
      }
      predicate {
        id
        label
      }
      object {
        id
        label
      }
    }
  }
}
    `
export const ThingMetadataFragmentDoc = `
    fragment ThingMetadata on things {
  id
  image
  name
  description
  url
}
    `
export const AtomMetadataFragmentDoc = `
    fragment AtomMetadata on atoms {
  data
  id
  image
  label
  emoji
  type
}
    `
export const AtomTxnFragmentDoc = `
    fragment AtomTxn on atoms {
  blockNumber
  blockTimestamp
  transactionHash
  creatorId
}
    `
export const AtomVaultDetailsFragmentDoc = `
    fragment AtomVaultDetails on atoms {
  vaultId
  walletId
  vault {
    positionCount
    totalShares
    currentSharePrice
  }
}
    `
export const AccountMetadataFragmentDoc = `
    fragment AccountMetadata on accounts {
  label
  image
  id
  atomId
  type
}
    `
export const AtomTripleFragmentDoc = `
    fragment AtomTriple on atoms {
  asSubject {
    id
    label
    object {
      data
      id
      image
      label
      emoji
      type
      creator {
        ...AccountMetadata
      }
    }
    predicate {
      data
      id
      image
      label
      emoji
      type
      creator {
        ...AccountMetadata
      }
    }
  }
  asPredicate {
    id
    label
    subject {
      data
      id
      image
      label
      emoji
      type
      creator {
        ...AccountMetadata
      }
    }
    object {
      data
      id
      image
      label
      emoji
      type
      creator {
        ...AccountMetadata
      }
    }
  }
  asObject {
    id
    label
    subject {
      data
      id
      image
      label
      emoji
      type
      creator {
        ...AccountMetadata
      }
    }
    predicate {
      data
      id
      image
      label
      emoji
      type
      creator {
        ...AccountMetadata
      }
    }
  }
}
    `
export const EventDetailsFragmentDoc = `
    fragment EventDetails on events {
  blockNumber
  blockTimestamp
  type
  transactionHash
  atomId
  tripleId
  depositId
  feeTransferId
  redemptionId
}
    `
export const PositionDetailsFragmentDoc = `
    fragment PositionDetails on positions {
  id
  account {
    id
    label
  }
  vault {
    id
    atom {
      id
      label
    }
    triple {
      id
      subject {
        id
        label
      }
      predicate {
        id
        label
      }
      object {
        id
        label
      }
    }
  }
  shares
  vaultId
}
    `
export const StatDetailsFragmentDoc = `
    fragment StatDetails on stats {
  contractBalance
  totalAccounts
  totalFees
  totalAtoms
  totalTriples
  totalPositions
  totalSignals
}
    `
export const TripleMetadataFragmentDoc = `
    fragment TripleMetadata on triples {
  id
  label
  subject {
    data
    id
    image
    label
    emoji
    type
    creator {
      ...AccountMetadata
    }
  }
  predicate {
    data
    id
    image
    label
    emoji
    type
    creator {
      ...AccountMetadata
    }
  }
  object {
    data
    id
    image
    label
    emoji
    type
    creator {
      ...AccountMetadata
    }
  }
}
    `
export const TripleTxnFragmentDoc = `
    fragment TripleTxn on triples {
  blockNumber
  blockTimestamp
  transactionHash
  creatorId
}
    `
export const VaultDetailsFragmentDoc = `
    fragment VaultDetails on vaults {
  id
  atom {
    id
    label
  }
  triple {
    id
    subject {
      id
      label
    }
    predicate {
      id
      label
    }
    object {
      id
      label
    }
  }
  positions_aggregate {
    nodes {
      account {
        id
        label
      }
      shares
    }
  }
  currentSharePrice
  totalShares
}
    `
export const TripleVaultDetailsFragmentDoc = `
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
    `
export const GetAccountsDocument = `
    query GetAccounts {
  accounts {
    ...AccountMetadata
    ...AccountClaims
    ...AccountPositions
  }
}
    ${AccountMetadataFragmentDoc}
${AccountClaimsFragmentDoc}
${AccountPositionsFragmentDoc}`

export const useGetAccountsQuery = <TData = GetAccountsQuery, TError = unknown>(
  variables?: GetAccountsQueryVariables,
  options?: Omit<
    UseQueryOptions<GetAccountsQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseQueryOptions<GetAccountsQuery, TError, TData>['queryKey']
  },
) => {
  return useQuery<GetAccountsQuery, TError, TData>({
    queryKey:
      variables === undefined ? ['GetAccounts'] : ['GetAccounts', variables],
    queryFn: fetcher<GetAccountsQuery, GetAccountsQueryVariables>(
      GetAccountsDocument,
      variables,
    ),
    ...options,
  })
}

useGetAccountsQuery.document = GetAccountsDocument

useGetAccountsQuery.getKey = (variables?: GetAccountsQueryVariables) =>
  variables === undefined ? ['GetAccounts'] : ['GetAccounts', variables]

export const useInfiniteGetAccountsQuery = <
  TData = InfiniteData<GetAccountsQuery>,
  TError = unknown,
>(
  variables: GetAccountsQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetAccountsQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseInfiniteQueryOptions<
      GetAccountsQuery,
      TError,
      TData
    >['queryKey']
  },
) => {
  return useInfiniteQuery<GetAccountsQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options
      return {
        queryKey:
          optionsQueryKey ?? variables === undefined
            ? ['GetAccounts.infinite']
            : ['GetAccounts.infinite', variables],
        queryFn: (metaData) =>
          fetcher<GetAccountsQuery, GetAccountsQueryVariables>(
            GetAccountsDocument,
            { ...variables, ...(metaData.pageParam ?? {}) },
          )(),
        ...restOptions,
      }
    })(),
  )
}

useInfiniteGetAccountsQuery.getKey = (variables?: GetAccountsQueryVariables) =>
  variables === undefined
    ? ['GetAccounts.infinite']
    : ['GetAccounts.infinite', variables]

useGetAccountsQuery.fetcher = (
  variables?: GetAccountsQueryVariables,
  options?: RequestInit['headers'],
) =>
  fetcher<GetAccountsQuery, GetAccountsQueryVariables>(
    GetAccountsDocument,
    variables,
    options,
  )

export const GetAccountDocument = `
    query GetAccount($address: String!, $atomsWhere: atoms_bool_exp, $atomsOrderBy: [atoms_order_by!], $atomsLimit: Int, $atomsOffset: Int, $triplesWhere: triples_bool_exp, $triplesOrderBy: [triples_order_by!], $triplesLimit: Int, $triplesOffset: Int) {
  account(id: $address) {
    ...AccountMetadata
    ...AccountClaims
    ...AccountPositions
    ...AccountCreatedAtoms
    ...AccountCreatedTriples
  }
  chainLinkPrices(limit: 1, order_by: {id: desc}) {
    usd
  }
}
    ${AccountMetadataFragmentDoc}
${AccountClaimsFragmentDoc}
${AccountPositionsFragmentDoc}
${AccountCreatedAtomsFragmentDoc}
${AccountCreatedTriplesFragmentDoc}`

export const useGetAccountQuery = <TData = GetAccountQuery, TError = unknown>(
  variables: GetAccountQueryVariables,
  options?: Omit<
    UseQueryOptions<GetAccountQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseQueryOptions<GetAccountQuery, TError, TData>['queryKey']
  },
) => {
  return useQuery<GetAccountQuery, TError, TData>({
    queryKey: ['GetAccount', variables],
    queryFn: fetcher<GetAccountQuery, GetAccountQueryVariables>(
      GetAccountDocument,
      variables,
    ),
    ...options,
  })
}

useGetAccountQuery.document = GetAccountDocument

useGetAccountQuery.getKey = (variables: GetAccountQueryVariables) => [
  'GetAccount',
  variables,
]

export const useInfiniteGetAccountQuery = <
  TData = InfiniteData<GetAccountQuery>,
  TError = unknown,
>(
  variables: GetAccountQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetAccountQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseInfiniteQueryOptions<
      GetAccountQuery,
      TError,
      TData
    >['queryKey']
  },
) => {
  return useInfiniteQuery<GetAccountQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options
      return {
        queryKey: optionsQueryKey ?? ['GetAccount.infinite', variables],
        queryFn: (metaData) =>
          fetcher<GetAccountQuery, GetAccountQueryVariables>(
            GetAccountDocument,
            { ...variables, ...(metaData.pageParam ?? {}) },
          )(),
        ...restOptions,
      }
    })(),
  )
}

useInfiniteGetAccountQuery.getKey = (variables: GetAccountQueryVariables) => [
  'GetAccount.infinite',
  variables,
]

useGetAccountQuery.fetcher = (
  variables: GetAccountQueryVariables,
  options?: RequestInit['headers'],
) =>
  fetcher<GetAccountQuery, GetAccountQueryVariables>(
    GetAccountDocument,
    variables,
    options,
  )

export const GetAtomsDocument = `
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
    ${AtomMetadataFragmentDoc}
${AtomTxnFragmentDoc}
${AtomVaultDetailsFragmentDoc}
${AccountMetadataFragmentDoc}`

export const useGetAtomsQuery = <TData = GetAtomsQuery, TError = unknown>(
  variables?: GetAtomsQueryVariables,
  options?: Omit<UseQueryOptions<GetAtomsQuery, TError, TData>, 'queryKey'> & {
    queryKey?: UseQueryOptions<GetAtomsQuery, TError, TData>['queryKey']
  },
) => {
  return useQuery<GetAtomsQuery, TError, TData>({
    queryKey: variables === undefined ? ['GetAtoms'] : ['GetAtoms', variables],
    queryFn: fetcher<GetAtomsQuery, GetAtomsQueryVariables>(
      GetAtomsDocument,
      variables,
    ),
    ...options,
  })
}

useGetAtomsQuery.document = GetAtomsDocument

useGetAtomsQuery.getKey = (variables?: GetAtomsQueryVariables) =>
  variables === undefined ? ['GetAtoms'] : ['GetAtoms', variables]

export const useInfiniteGetAtomsQuery = <
  TData = InfiniteData<GetAtomsQuery>,
  TError = unknown,
>(
  variables: GetAtomsQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetAtomsQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseInfiniteQueryOptions<GetAtomsQuery, TError, TData>['queryKey']
  },
) => {
  return useInfiniteQuery<GetAtomsQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options
      return {
        queryKey:
          optionsQueryKey ?? variables === undefined
            ? ['GetAtoms.infinite']
            : ['GetAtoms.infinite', variables],
        queryFn: (metaData) =>
          fetcher<GetAtomsQuery, GetAtomsQueryVariables>(GetAtomsDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      }
    })(),
  )
}

useInfiniteGetAtomsQuery.getKey = (variables?: GetAtomsQueryVariables) =>
  variables === undefined
    ? ['GetAtoms.infinite']
    : ['GetAtoms.infinite', variables]

useGetAtomsQuery.fetcher = (
  variables?: GetAtomsQueryVariables,
  options?: RequestInit['headers'],
) =>
  fetcher<GetAtomsQuery, GetAtomsQueryVariables>(
    GetAtomsDocument,
    variables,
    options,
  )

export const GetAtomDocument = `
    query GetAtom($id: numeric!) {
  atom(id: $id) {
    ...AtomMetadata
    ...AtomTxn
    ...AtomVaultDetails
    creator {
      ...AccountMetadata
    }
    ...AtomTriple
  }
  thing(id: $id) {
    ...ThingMetadata
  }
}
    ${AtomMetadataFragmentDoc}
${AtomTxnFragmentDoc}
${AtomVaultDetailsFragmentDoc}
${AccountMetadataFragmentDoc}
${AtomTripleFragmentDoc}
${ThingMetadataFragmentDoc}`

export const useGetAtomQuery = <TData = GetAtomQuery, TError = unknown>(
  variables: GetAtomQueryVariables,
  options?: Omit<UseQueryOptions<GetAtomQuery, TError, TData>, 'queryKey'> & {
    queryKey?: UseQueryOptions<GetAtomQuery, TError, TData>['queryKey']
  },
) => {
  return useQuery<GetAtomQuery, TError, TData>({
    queryKey: ['GetAtom', variables],
    queryFn: fetcher<GetAtomQuery, GetAtomQueryVariables>(
      GetAtomDocument,
      variables,
    ),
    ...options,
  })
}

useGetAtomQuery.document = GetAtomDocument

useGetAtomQuery.getKey = (variables: GetAtomQueryVariables) => [
  'GetAtom',
  variables,
]

export const useInfiniteGetAtomQuery = <
  TData = InfiniteData<GetAtomQuery>,
  TError = unknown,
>(
  variables: GetAtomQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetAtomQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseInfiniteQueryOptions<GetAtomQuery, TError, TData>['queryKey']
  },
) => {
  return useInfiniteQuery<GetAtomQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options
      return {
        queryKey: optionsQueryKey ?? ['GetAtom.infinite', variables],
        queryFn: (metaData) =>
          fetcher<GetAtomQuery, GetAtomQueryVariables>(GetAtomDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      }
    })(),
  )
}

useInfiniteGetAtomQuery.getKey = (variables: GetAtomQueryVariables) => [
  'GetAtom.infinite',
  variables,
]

useGetAtomQuery.fetcher = (
  variables: GetAtomQueryVariables,
  options?: RequestInit['headers'],
) =>
  fetcher<GetAtomQuery, GetAtomQueryVariables>(
    GetAtomDocument,
    variables,
    options,
  )

export const GetClaimsByAddressDocument = `
    query GetClaimsByAddress($address: String) {
  claims_aggregate(where: {accountId: {_eq: $address}}) {
    nodes {
      account {
        label
      }
      triple {
        subject {
          label
        }
        predicate {
          label
        }
        object {
          label
        }
      }
      id
      vaultId
      counterVaultId
      shares
      counterShares
    }
  }
}
    `

export const useGetClaimsByAddressQuery = <
  TData = GetClaimsByAddressQuery,
  TError = unknown,
>(
  variables?: GetClaimsByAddressQueryVariables,
  options?: Omit<
    UseQueryOptions<GetClaimsByAddressQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseQueryOptions<
      GetClaimsByAddressQuery,
      TError,
      TData
    >['queryKey']
  },
) => {
  return useQuery<GetClaimsByAddressQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ['GetClaimsByAddress']
        : ['GetClaimsByAddress', variables],
    queryFn: fetcher<GetClaimsByAddressQuery, GetClaimsByAddressQueryVariables>(
      GetClaimsByAddressDocument,
      variables,
    ),
    ...options,
  })
}

useGetClaimsByAddressQuery.document = GetClaimsByAddressDocument

useGetClaimsByAddressQuery.getKey = (
  variables?: GetClaimsByAddressQueryVariables,
) =>
  variables === undefined
    ? ['GetClaimsByAddress']
    : ['GetClaimsByAddress', variables]

export const useInfiniteGetClaimsByAddressQuery = <
  TData = InfiniteData<GetClaimsByAddressQuery>,
  TError = unknown,
>(
  variables: GetClaimsByAddressQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetClaimsByAddressQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseInfiniteQueryOptions<
      GetClaimsByAddressQuery,
      TError,
      TData
    >['queryKey']
  },
) => {
  return useInfiniteQuery<GetClaimsByAddressQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options
      return {
        queryKey:
          optionsQueryKey ?? variables === undefined
            ? ['GetClaimsByAddress.infinite']
            : ['GetClaimsByAddress.infinite', variables],
        queryFn: (metaData) =>
          fetcher<GetClaimsByAddressQuery, GetClaimsByAddressQueryVariables>(
            GetClaimsByAddressDocument,
            { ...variables, ...(metaData.pageParam ?? {}) },
          )(),
        ...restOptions,
      }
    })(),
  )
}

useInfiniteGetClaimsByAddressQuery.getKey = (
  variables?: GetClaimsByAddressQueryVariables,
) =>
  variables === undefined
    ? ['GetClaimsByAddress.infinite']
    : ['GetClaimsByAddress.infinite', variables]

useGetClaimsByAddressQuery.fetcher = (
  variables?: GetClaimsByAddressQueryVariables,
  options?: RequestInit['headers'],
) =>
  fetcher<GetClaimsByAddressQuery, GetClaimsByAddressQueryVariables>(
    GetClaimsByAddressDocument,
    variables,
    options,
  )

export const GetEventsDocument = `
    query GetEvents($limit: Int, $offset: Int, $orderBy: [events_order_by!], $where: events_bool_exp) {
  events_aggregate(
    limit: $limit
    offset: $offset
    order_by: $orderBy
    where: $where
  ) {
    nodes {
      ...EventDetails
    }
  }
}
    ${EventDetailsFragmentDoc}`

export const useGetEventsQuery = <TData = GetEventsQuery, TError = unknown>(
  variables?: GetEventsQueryVariables,
  options?: Omit<UseQueryOptions<GetEventsQuery, TError, TData>, 'queryKey'> & {
    queryKey?: UseQueryOptions<GetEventsQuery, TError, TData>['queryKey']
  },
) => {
  return useQuery<GetEventsQuery, TError, TData>({
    queryKey:
      variables === undefined ? ['GetEvents'] : ['GetEvents', variables],
    queryFn: fetcher<GetEventsQuery, GetEventsQueryVariables>(
      GetEventsDocument,
      variables,
    ),
    ...options,
  })
}

useGetEventsQuery.document = GetEventsDocument

useGetEventsQuery.getKey = (variables?: GetEventsQueryVariables) =>
  variables === undefined ? ['GetEvents'] : ['GetEvents', variables]

export const useInfiniteGetEventsQuery = <
  TData = InfiniteData<GetEventsQuery>,
  TError = unknown,
>(
  variables: GetEventsQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetEventsQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseInfiniteQueryOptions<
      GetEventsQuery,
      TError,
      TData
    >['queryKey']
  },
) => {
  return useInfiniteQuery<GetEventsQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options
      return {
        queryKey:
          optionsQueryKey ?? variables === undefined
            ? ['GetEvents.infinite']
            : ['GetEvents.infinite', variables],
        queryFn: (metaData) =>
          fetcher<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      }
    })(),
  )
}

useInfiniteGetEventsQuery.getKey = (variables?: GetEventsQueryVariables) =>
  variables === undefined
    ? ['GetEvents.infinite']
    : ['GetEvents.infinite', variables]

useGetEventsQuery.fetcher = (
  variables?: GetEventsQueryVariables,
  options?: RequestInit['headers'],
) =>
  fetcher<GetEventsQuery, GetEventsQueryVariables>(
    GetEventsDocument,
    variables,
    options,
  )

export const GetListItemsDocument = `
    query GetListItems($predicateId: numeric, $objectId: numeric) {
  triples(
    where: {predicateId: {_eq: predicateId}, objectId: {_eq: $objectId}}
    order_by: [{vault: {positionCount: desc}, counterVault: {positionCount: desc}}]
  ) {
    ...TripleVaultDetails
  }
}
    ${TripleVaultDetailsFragmentDoc}
${VaultDetailsFragmentDoc}`

export const useGetListItemsQuery = <
  TData = GetListItemsQuery,
  TError = unknown,
>(
  variables?: GetListItemsQueryVariables,
  options?: Omit<
    UseQueryOptions<GetListItemsQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseQueryOptions<GetListItemsQuery, TError, TData>['queryKey']
  },
) => {
  return useQuery<GetListItemsQuery, TError, TData>({
    queryKey:
      variables === undefined ? ['GetListItems'] : ['GetListItems', variables],
    queryFn: fetcher<GetListItemsQuery, GetListItemsQueryVariables>(
      GetListItemsDocument,
      variables,
    ),
    ...options,
  })
}

useGetListItemsQuery.document = GetListItemsDocument

useGetListItemsQuery.getKey = (variables?: GetListItemsQueryVariables) =>
  variables === undefined ? ['GetListItems'] : ['GetListItems', variables]

export const useInfiniteGetListItemsQuery = <
  TData = InfiniteData<GetListItemsQuery>,
  TError = unknown,
>(
  variables: GetListItemsQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetListItemsQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseInfiniteQueryOptions<
      GetListItemsQuery,
      TError,
      TData
    >['queryKey']
  },
) => {
  return useInfiniteQuery<GetListItemsQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options
      return {
        queryKey:
          optionsQueryKey ?? variables === undefined
            ? ['GetListItems.infinite']
            : ['GetListItems.infinite', variables],
        queryFn: (metaData) =>
          fetcher<GetListItemsQuery, GetListItemsQueryVariables>(
            GetListItemsDocument,
            { ...variables, ...(metaData.pageParam ?? {}) },
          )(),
        ...restOptions,
      }
    })(),
  )
}

useInfiniteGetListItemsQuery.getKey = (
  variables?: GetListItemsQueryVariables,
) =>
  variables === undefined
    ? ['GetListItems.infinite']
    : ['GetListItems.infinite', variables]

useGetListItemsQuery.fetcher = (
  variables?: GetListItemsQueryVariables,
  options?: RequestInit['headers'],
) =>
  fetcher<GetListItemsQuery, GetListItemsQueryVariables>(
    GetListItemsDocument,
    variables,
    options,
  )

export const GetPositionsDocument = `
    query GetPositions($limit: Int, $offset: Int, $orderBy: [positions_order_by!], $where: positions_bool_exp) {
  positions_aggregate(
    limit: $limit
    offset: $offset
    order_by: $orderBy
    where: $where
  ) {
    nodes {
      ...PositionDetails
    }
  }
}
    ${PositionDetailsFragmentDoc}`

export const useGetPositionsQuery = <
  TData = GetPositionsQuery,
  TError = unknown,
>(
  variables?: GetPositionsQueryVariables,
  options?: Omit<
    UseQueryOptions<GetPositionsQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseQueryOptions<GetPositionsQuery, TError, TData>['queryKey']
  },
) => {
  return useQuery<GetPositionsQuery, TError, TData>({
    queryKey:
      variables === undefined ? ['GetPositions'] : ['GetPositions', variables],
    queryFn: fetcher<GetPositionsQuery, GetPositionsQueryVariables>(
      GetPositionsDocument,
      variables,
    ),
    ...options,
  })
}

useGetPositionsQuery.document = GetPositionsDocument

useGetPositionsQuery.getKey = (variables?: GetPositionsQueryVariables) =>
  variables === undefined ? ['GetPositions'] : ['GetPositions', variables]

export const useInfiniteGetPositionsQuery = <
  TData = InfiniteData<GetPositionsQuery>,
  TError = unknown,
>(
  variables: GetPositionsQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetPositionsQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseInfiniteQueryOptions<
      GetPositionsQuery,
      TError,
      TData
    >['queryKey']
  },
) => {
  return useInfiniteQuery<GetPositionsQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options
      return {
        queryKey:
          optionsQueryKey ?? variables === undefined
            ? ['GetPositions.infinite']
            : ['GetPositions.infinite', variables],
        queryFn: (metaData) =>
          fetcher<GetPositionsQuery, GetPositionsQueryVariables>(
            GetPositionsDocument,
            { ...variables, ...(metaData.pageParam ?? {}) },
          )(),
        ...restOptions,
      }
    })(),
  )
}

useInfiniteGetPositionsQuery.getKey = (
  variables?: GetPositionsQueryVariables,
) =>
  variables === undefined
    ? ['GetPositions.infinite']
    : ['GetPositions.infinite', variables]

useGetPositionsQuery.fetcher = (
  variables?: GetPositionsQueryVariables,
  options?: RequestInit['headers'],
) =>
  fetcher<GetPositionsQuery, GetPositionsQueryVariables>(
    GetPositionsDocument,
    variables,
    options,
  )

export const GetPositionDocument = `
    query GetPosition($positionId: String!) {
  position(id: $positionId) {
    ...PositionDetails
  }
}
    ${PositionDetailsFragmentDoc}`

export const useGetPositionQuery = <TData = GetPositionQuery, TError = unknown>(
  variables: GetPositionQueryVariables,
  options?: Omit<
    UseQueryOptions<GetPositionQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseQueryOptions<GetPositionQuery, TError, TData>['queryKey']
  },
) => {
  return useQuery<GetPositionQuery, TError, TData>({
    queryKey: ['GetPosition', variables],
    queryFn: fetcher<GetPositionQuery, GetPositionQueryVariables>(
      GetPositionDocument,
      variables,
    ),
    ...options,
  })
}

useGetPositionQuery.document = GetPositionDocument

useGetPositionQuery.getKey = (variables: GetPositionQueryVariables) => [
  'GetPosition',
  variables,
]

export const useInfiniteGetPositionQuery = <
  TData = InfiniteData<GetPositionQuery>,
  TError = unknown,
>(
  variables: GetPositionQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetPositionQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseInfiniteQueryOptions<
      GetPositionQuery,
      TError,
      TData
    >['queryKey']
  },
) => {
  return useInfiniteQuery<GetPositionQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options
      return {
        queryKey: optionsQueryKey ?? ['GetPosition.infinite', variables],
        queryFn: (metaData) =>
          fetcher<GetPositionQuery, GetPositionQueryVariables>(
            GetPositionDocument,
            { ...variables, ...(metaData.pageParam ?? {}) },
          )(),
        ...restOptions,
      }
    })(),
  )
}

useInfiniteGetPositionQuery.getKey = (variables: GetPositionQueryVariables) => [
  'GetPosition.infinite',
  variables,
]

useGetPositionQuery.fetcher = (
  variables: GetPositionQueryVariables,
  options?: RequestInit['headers'],
) =>
  fetcher<GetPositionQuery, GetPositionQueryVariables>(
    GetPositionDocument,
    variables,
    options,
  )

export const GetStatsDocument = `
    query GetStats {
  stats {
    ...StatDetails
  }
}
    ${StatDetailsFragmentDoc}`

export const useGetStatsQuery = <TData = GetStatsQuery, TError = unknown>(
  variables?: GetStatsQueryVariables,
  options?: Omit<UseQueryOptions<GetStatsQuery, TError, TData>, 'queryKey'> & {
    queryKey?: UseQueryOptions<GetStatsQuery, TError, TData>['queryKey']
  },
) => {
  return useQuery<GetStatsQuery, TError, TData>({
    queryKey: variables === undefined ? ['GetStats'] : ['GetStats', variables],
    queryFn: fetcher<GetStatsQuery, GetStatsQueryVariables>(
      GetStatsDocument,
      variables,
    ),
    ...options,
  })
}

useGetStatsQuery.document = GetStatsDocument

useGetStatsQuery.getKey = (variables?: GetStatsQueryVariables) =>
  variables === undefined ? ['GetStats'] : ['GetStats', variables]

export const useInfiniteGetStatsQuery = <
  TData = InfiniteData<GetStatsQuery>,
  TError = unknown,
>(
  variables: GetStatsQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetStatsQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseInfiniteQueryOptions<GetStatsQuery, TError, TData>['queryKey']
  },
) => {
  return useInfiniteQuery<GetStatsQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options
      return {
        queryKey:
          optionsQueryKey ?? variables === undefined
            ? ['GetStats.infinite']
            : ['GetStats.infinite', variables],
        queryFn: (metaData) =>
          fetcher<GetStatsQuery, GetStatsQueryVariables>(GetStatsDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      }
    })(),
  )
}

useInfiniteGetStatsQuery.getKey = (variables?: GetStatsQueryVariables) =>
  variables === undefined
    ? ['GetStats.infinite']
    : ['GetStats.infinite', variables]

useGetStatsQuery.fetcher = (
  variables?: GetStatsQueryVariables,
  options?: RequestInit['headers'],
) =>
  fetcher<GetStatsQuery, GetStatsQueryVariables>(
    GetStatsDocument,
    variables,
    options,
  )

export const GetTriplesDocument = `
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
    ${TripleMetadataFragmentDoc}
${AccountMetadataFragmentDoc}
${TripleTxnFragmentDoc}
${TripleVaultDetailsFragmentDoc}
${VaultDetailsFragmentDoc}`

export const useGetTriplesQuery = <TData = GetTriplesQuery, TError = unknown>(
  variables?: GetTriplesQueryVariables,
  options?: Omit<
    UseQueryOptions<GetTriplesQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseQueryOptions<GetTriplesQuery, TError, TData>['queryKey']
  },
) => {
  return useQuery<GetTriplesQuery, TError, TData>({
    queryKey:
      variables === undefined ? ['GetTriples'] : ['GetTriples', variables],
    queryFn: fetcher<GetTriplesQuery, GetTriplesQueryVariables>(
      GetTriplesDocument,
      variables,
    ),
    ...options,
  })
}

useGetTriplesQuery.document = GetTriplesDocument

useGetTriplesQuery.getKey = (variables?: GetTriplesQueryVariables) =>
  variables === undefined ? ['GetTriples'] : ['GetTriples', variables]

export const useInfiniteGetTriplesQuery = <
  TData = InfiniteData<GetTriplesQuery>,
  TError = unknown,
>(
  variables: GetTriplesQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetTriplesQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseInfiniteQueryOptions<
      GetTriplesQuery,
      TError,
      TData
    >['queryKey']
  },
) => {
  return useInfiniteQuery<GetTriplesQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options
      return {
        queryKey:
          optionsQueryKey ?? variables === undefined
            ? ['GetTriples.infinite']
            : ['GetTriples.infinite', variables],
        queryFn: (metaData) =>
          fetcher<GetTriplesQuery, GetTriplesQueryVariables>(
            GetTriplesDocument,
            { ...variables, ...(metaData.pageParam ?? {}) },
          )(),
        ...restOptions,
      }
    })(),
  )
}

useInfiniteGetTriplesQuery.getKey = (variables?: GetTriplesQueryVariables) =>
  variables === undefined
    ? ['GetTriples.infinite']
    : ['GetTriples.infinite', variables]

useGetTriplesQuery.fetcher = (
  variables?: GetTriplesQueryVariables,
  options?: RequestInit['headers'],
) =>
  fetcher<GetTriplesQuery, GetTriplesQueryVariables>(
    GetTriplesDocument,
    variables,
    options,
  )

export const GetTripleDocument = `
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
    ${TripleMetadataFragmentDoc}
${AccountMetadataFragmentDoc}
${TripleTxnFragmentDoc}
${TripleVaultDetailsFragmentDoc}
${VaultDetailsFragmentDoc}`

export const useGetTripleQuery = <TData = GetTripleQuery, TError = unknown>(
  variables: GetTripleQueryVariables,
  options?: Omit<UseQueryOptions<GetTripleQuery, TError, TData>, 'queryKey'> & {
    queryKey?: UseQueryOptions<GetTripleQuery, TError, TData>['queryKey']
  },
) => {
  return useQuery<GetTripleQuery, TError, TData>({
    queryKey: ['GetTriple', variables],
    queryFn: fetcher<GetTripleQuery, GetTripleQueryVariables>(
      GetTripleDocument,
      variables,
    ),
    ...options,
  })
}

useGetTripleQuery.document = GetTripleDocument

useGetTripleQuery.getKey = (variables: GetTripleQueryVariables) => [
  'GetTriple',
  variables,
]

export const useInfiniteGetTripleQuery = <
  TData = InfiniteData<GetTripleQuery>,
  TError = unknown,
>(
  variables: GetTripleQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetTripleQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseInfiniteQueryOptions<
      GetTripleQuery,
      TError,
      TData
    >['queryKey']
  },
) => {
  return useInfiniteQuery<GetTripleQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options
      return {
        queryKey: optionsQueryKey ?? ['GetTriple.infinite', variables],
        queryFn: (metaData) =>
          fetcher<GetTripleQuery, GetTripleQueryVariables>(GetTripleDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      }
    })(),
  )
}

useInfiniteGetTripleQuery.getKey = (variables: GetTripleQueryVariables) => [
  'GetTriple.infinite',
  variables,
]

useGetTripleQuery.fetcher = (
  variables: GetTripleQueryVariables,
  options?: RequestInit['headers'],
) =>
  fetcher<GetTripleQuery, GetTripleQueryVariables>(
    GetTripleDocument,
    variables,
    options,
  )

export const GetVaultsDocument = `
    query GetVaults($limit: Int, $offset: Int, $orderBy: [vaults_order_by!], $where: vaults_bool_exp) {
  vaults_aggregate(
    limit: $limit
    offset: $offset
    order_by: $orderBy
    where: $where
  ) {
    nodes {
      id
      atom {
        id
        label
      }
      triple {
        id
        subject {
          id
          label
        }
        predicate {
          id
          label
        }
        object {
          id
          label
        }
      }
      positions_aggregate {
        nodes {
          account {
            id
            label
          }
          shares
        }
      }
      currentSharePrice
      totalShares
    }
  }
}
    `

export const useGetVaultsQuery = <TData = GetVaultsQuery, TError = unknown>(
  variables?: GetVaultsQueryVariables,
  options?: Omit<UseQueryOptions<GetVaultsQuery, TError, TData>, 'queryKey'> & {
    queryKey?: UseQueryOptions<GetVaultsQuery, TError, TData>['queryKey']
  },
) => {
  return useQuery<GetVaultsQuery, TError, TData>({
    queryKey:
      variables === undefined ? ['GetVaults'] : ['GetVaults', variables],
    queryFn: fetcher<GetVaultsQuery, GetVaultsQueryVariables>(
      GetVaultsDocument,
      variables,
    ),
    ...options,
  })
}

useGetVaultsQuery.document = GetVaultsDocument

useGetVaultsQuery.getKey = (variables?: GetVaultsQueryVariables) =>
  variables === undefined ? ['GetVaults'] : ['GetVaults', variables]

export const useInfiniteGetVaultsQuery = <
  TData = InfiniteData<GetVaultsQuery>,
  TError = unknown,
>(
  variables: GetVaultsQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetVaultsQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseInfiniteQueryOptions<
      GetVaultsQuery,
      TError,
      TData
    >['queryKey']
  },
) => {
  return useInfiniteQuery<GetVaultsQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options
      return {
        queryKey:
          optionsQueryKey ?? variables === undefined
            ? ['GetVaults.infinite']
            : ['GetVaults.infinite', variables],
        queryFn: (metaData) =>
          fetcher<GetVaultsQuery, GetVaultsQueryVariables>(GetVaultsDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      }
    })(),
  )
}

useInfiniteGetVaultsQuery.getKey = (variables?: GetVaultsQueryVariables) =>
  variables === undefined
    ? ['GetVaults.infinite']
    : ['GetVaults.infinite', variables]

useGetVaultsQuery.fetcher = (
  variables?: GetVaultsQueryVariables,
  options?: RequestInit['headers'],
) =>
  fetcher<GetVaultsQuery, GetVaultsQueryVariables>(
    GetVaultsDocument,
    variables,
    options,
  )

export const GetVaultDocument = `
    query GetVault($vaultId: numeric!) {
  vault(id: $vaultId) {
    ...VaultDetails
  }
}
    ${VaultDetailsFragmentDoc}`

export const useGetVaultQuery = <TData = GetVaultQuery, TError = unknown>(
  variables: GetVaultQueryVariables,
  options?: Omit<UseQueryOptions<GetVaultQuery, TError, TData>, 'queryKey'> & {
    queryKey?: UseQueryOptions<GetVaultQuery, TError, TData>['queryKey']
  },
) => {
  return useQuery<GetVaultQuery, TError, TData>({
    queryKey: ['GetVault', variables],
    queryFn: fetcher<GetVaultQuery, GetVaultQueryVariables>(
      GetVaultDocument,
      variables,
    ),
    ...options,
  })
}

useGetVaultQuery.document = GetVaultDocument

useGetVaultQuery.getKey = (variables: GetVaultQueryVariables) => [
  'GetVault',
  variables,
]

export const useInfiniteGetVaultQuery = <
  TData = InfiniteData<GetVaultQuery>,
  TError = unknown,
>(
  variables: GetVaultQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetVaultQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseInfiniteQueryOptions<GetVaultQuery, TError, TData>['queryKey']
  },
) => {
  return useInfiniteQuery<GetVaultQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options
      return {
        queryKey: optionsQueryKey ?? ['GetVault.infinite', variables],
        queryFn: (metaData) =>
          fetcher<GetVaultQuery, GetVaultQueryVariables>(GetVaultDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      }
    })(),
  )
}

useInfiniteGetVaultQuery.getKey = (variables: GetVaultQueryVariables) => [
  'GetVault.infinite',
  variables,
]

useGetVaultQuery.fetcher = (
  variables: GetVaultQueryVariables,
  options?: RequestInit['headers'],
) =>
  fetcher<GetVaultQuery, GetVaultQueryVariables>(
    GetVaultDocument,
    variables,
    options,
  )

export const AccountClaims = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AccountClaims' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'accounts' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'claims' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'shares' },
                      value: { kind: 'EnumValue', value: 'desc' },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'triple' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'shares' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'counterShares' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode
export const AccountPositions = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AccountPositions' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'accounts' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'positions_aggregate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'shares' },
                      value: { kind: 'EnumValue', value: 'desc' },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'nodes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'shares' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'vault' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'totalShares' },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'currentSharePrice',
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'atom' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'label' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'triple' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'label' },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode
export const AccountCreatedAtoms = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AccountCreatedAtoms' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'accounts' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createdAtoms_aggregate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'atomsWhere' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'atomsOrderBy' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'atomsLimit' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'atomsOffset' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'aggregate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'count' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'sum' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'nodes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'data' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'vault' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'totalShares' },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'positions_aggregate',
                              },
                              arguments: [
                                {
                                  kind: 'Argument',
                                  name: { kind: 'Name', value: 'where' },
                                  value: {
                                    kind: 'ObjectValue',
                                    fields: [
                                      {
                                        kind: 'ObjectField',
                                        name: {
                                          kind: 'Name',
                                          value: 'accountId',
                                        },
                                        value: {
                                          kind: 'ObjectValue',
                                          fields: [
                                            {
                                              kind: 'ObjectField',
                                              name: {
                                                kind: 'Name',
                                                value: '_eq',
                                              },
                                              value: {
                                                kind: 'Variable',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'address',
                                                },
                                              },
                                            },
                                          ],
                                        },
                                      },
                                    ],
                                  },
                                },
                              ],
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'nodes' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'account',
                                          },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'id',
                                                },
                                              },
                                            ],
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'shares',
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode
export const AccountCreatedTriples = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AccountCreatedTriples' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'accounts' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createdTriples_aggregate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'triplesWhere' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'triplesOrderBy' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'triplesLimit' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'triplesOffset' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'aggregate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'count' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'nodes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'subject' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'label' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'predicate' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'label' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'object' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'label' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode
export const ThingMetadata = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ThingMetadata' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'things' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'image' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'url' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode
export const AtomMetadata = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AtomMetadata' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'atoms' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'data' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'image' } },
          { kind: 'Field', name: { kind: 'Name', value: 'label' } },
          { kind: 'Field', name: { kind: 'Name', value: 'emoji' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode
export const AtomTxn = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AtomTxn' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'atoms' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'blockNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'blockTimestamp' } },
          { kind: 'Field', name: { kind: 'Name', value: 'transactionHash' } },
          { kind: 'Field', name: { kind: 'Name', value: 'creatorId' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode
export const AtomVaultDetails = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AtomVaultDetails' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'atoms' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'vaultId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'walletId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'vault' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'positionCount' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'totalShares' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'currentSharePrice' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode
export const AccountMetadata = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AccountMetadata' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'accounts' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'label' } },
          { kind: 'Field', name: { kind: 'Name', value: 'image' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'atomId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode
export const AtomTriple = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AtomTriple' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'atoms' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'asSubject' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'object' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'data' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'emoji' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'creator' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'AccountMetadata' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'predicate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'data' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'emoji' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'creator' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'AccountMetadata' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'asPredicate' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'subject' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'data' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'emoji' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'creator' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'AccountMetadata' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'object' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'data' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'emoji' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'creator' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'AccountMetadata' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'asObject' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'subject' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'data' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'emoji' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'creator' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'AccountMetadata' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'predicate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'data' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'emoji' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'creator' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'AccountMetadata' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AccountMetadata' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'accounts' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'label' } },
          { kind: 'Field', name: { kind: 'Name', value: 'image' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'atomId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode
export const EventDetails = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EventDetails' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'events' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'blockNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'blockTimestamp' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
          { kind: 'Field', name: { kind: 'Name', value: 'transactionHash' } },
          { kind: 'Field', name: { kind: 'Name', value: 'atomId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'tripleId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'depositId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'feeTransferId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'redemptionId' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode
export const PositionDetails = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PositionDetails' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'positions' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'account' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'label' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'vault' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'atom' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'triple' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'subject' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'label' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'predicate' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'label' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'object' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'label' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'shares' } },
          { kind: 'Field', name: { kind: 'Name', value: 'vaultId' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode
export const StatDetails = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'StatDetails' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'stats' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'contractBalance' } },
          { kind: 'Field', name: { kind: 'Name', value: 'totalAccounts' } },
          { kind: 'Field', name: { kind: 'Name', value: 'totalFees' } },
          { kind: 'Field', name: { kind: 'Name', value: 'totalAtoms' } },
          { kind: 'Field', name: { kind: 'Name', value: 'totalTriples' } },
          { kind: 'Field', name: { kind: 'Name', value: 'totalPositions' } },
          { kind: 'Field', name: { kind: 'Name', value: 'totalSignals' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode
export const TripleMetadata = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'TripleMetadata' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'triples' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'label' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'subject' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'data' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                { kind: 'Field', name: { kind: 'Name', value: 'emoji' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'creator' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'AccountMetadata' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'predicate' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'data' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                { kind: 'Field', name: { kind: 'Name', value: 'emoji' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'creator' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'AccountMetadata' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'object' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'data' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                { kind: 'Field', name: { kind: 'Name', value: 'emoji' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'creator' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'AccountMetadata' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AccountMetadata' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'accounts' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'label' } },
          { kind: 'Field', name: { kind: 'Name', value: 'image' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'atomId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode
export const TripleTxn = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'TripleTxn' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'triples' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'blockNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'blockTimestamp' } },
          { kind: 'Field', name: { kind: 'Name', value: 'transactionHash' } },
          { kind: 'Field', name: { kind: 'Name', value: 'creatorId' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode
export const VaultDetails = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'VaultDetails' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'vaults' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'atom' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'label' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'triple' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'subject' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'predicate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'object' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'positions_aggregate' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'nodes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'account' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'label' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'shares' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'currentSharePrice' } },
          { kind: 'Field', name: { kind: 'Name', value: 'totalShares' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode
export const TripleVaultDetails = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'TripleVaultDetails' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'triples' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'vaultId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'counterVaultId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'vault' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'VaultDetails' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'counterVault' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'VaultDetails' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'VaultDetails' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'vaults' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'atom' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'label' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'triple' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'subject' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'predicate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'object' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'positions_aggregate' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'nodes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'account' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'label' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'shares' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'currentSharePrice' } },
          { kind: 'Field', name: { kind: 'Name', value: 'totalShares' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode
export const GetAccounts = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAccounts' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accounts' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AccountMetadata' },
                },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AccountClaims' },
                },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AccountPositions' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AccountMetadata' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'accounts' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'label' } },
          { kind: 'Field', name: { kind: 'Name', value: 'image' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'atomId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AccountClaims' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'accounts' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'claims' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'shares' },
                      value: { kind: 'EnumValue', value: 'desc' },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'triple' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'shares' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'counterShares' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AccountPositions' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'accounts' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'positions_aggregate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'shares' },
                      value: { kind: 'EnumValue', value: 'desc' },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'nodes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'shares' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'vault' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'totalShares' },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'currentSharePrice',
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'atom' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'label' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'triple' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'label' },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode
export const GetAccount = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAccount' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'address' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'atomsWhere' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'atoms_bool_exp' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'atomsOrderBy' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'atoms_order_by' },
              },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'atomsLimit' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'atomsOffset' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'triplesWhere' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'triples_bool_exp' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'triplesOrderBy' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'triples_order_by' },
              },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'triplesLimit' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'triplesOffset' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'account' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'address' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AccountMetadata' },
                },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AccountClaims' },
                },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AccountPositions' },
                },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AccountCreatedAtoms' },
                },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AccountCreatedTriples' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'chainLinkPrices' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'IntValue', value: '1' },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id' },
                      value: { kind: 'EnumValue', value: 'desc' },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'usd' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AccountMetadata' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'accounts' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'label' } },
          { kind: 'Field', name: { kind: 'Name', value: 'image' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'atomId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AccountClaims' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'accounts' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'claims' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'shares' },
                      value: { kind: 'EnumValue', value: 'desc' },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'triple' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'shares' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'counterShares' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AccountPositions' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'accounts' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'positions_aggregate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'shares' },
                      value: { kind: 'EnumValue', value: 'desc' },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'nodes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'shares' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'vault' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'totalShares' },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'currentSharePrice',
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'atom' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'label' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'triple' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'label' },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AccountCreatedAtoms' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'accounts' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createdAtoms_aggregate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'atomsWhere' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'atomsOrderBy' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'atomsLimit' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'atomsOffset' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'aggregate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'count' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'sum' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'nodes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'data' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'vault' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'totalShares' },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'positions_aggregate',
                              },
                              arguments: [
                                {
                                  kind: 'Argument',
                                  name: { kind: 'Name', value: 'where' },
                                  value: {
                                    kind: 'ObjectValue',
                                    fields: [
                                      {
                                        kind: 'ObjectField',
                                        name: {
                                          kind: 'Name',
                                          value: 'accountId',
                                        },
                                        value: {
                                          kind: 'ObjectValue',
                                          fields: [
                                            {
                                              kind: 'ObjectField',
                                              name: {
                                                kind: 'Name',
                                                value: '_eq',
                                              },
                                              value: {
                                                kind: 'Variable',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'address',
                                                },
                                              },
                                            },
                                          ],
                                        },
                                      },
                                    ],
                                  },
                                },
                              ],
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'nodes' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'account',
                                          },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'id',
                                                },
                                              },
                                            ],
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'shares',
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AccountCreatedTriples' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'accounts' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createdTriples_aggregate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'triplesWhere' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'triplesOrderBy' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'triplesLimit' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'triplesOffset' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'aggregate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'count' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'nodes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'subject' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'label' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'predicate' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'label' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'object' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'label' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode
export const GetAtoms = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAtoms' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'limit' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'offset' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'orderBy' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'atoms_order_by' },
              },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'where' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'atoms_bool_exp' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'atoms' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'limit' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'offset' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'orderBy' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'where' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AtomMetadata' },
                },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AtomTxn' },
                },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AtomVaultDetails' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'creator' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'AccountMetadata' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AccountMetadata' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'accounts' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'label' } },
          { kind: 'Field', name: { kind: 'Name', value: 'image' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'atomId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AtomMetadata' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'atoms' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'data' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'image' } },
          { kind: 'Field', name: { kind: 'Name', value: 'label' } },
          { kind: 'Field', name: { kind: 'Name', value: 'emoji' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AtomTxn' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'atoms' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'blockNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'blockTimestamp' } },
          { kind: 'Field', name: { kind: 'Name', value: 'transactionHash' } },
          { kind: 'Field', name: { kind: 'Name', value: 'creatorId' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AtomVaultDetails' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'atoms' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'vaultId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'walletId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'vault' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'positionCount' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'totalShares' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'currentSharePrice' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode
export const GetAtom = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAtom' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'numeric' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'atom' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AtomMetadata' },
                },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AtomTxn' },
                },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AtomVaultDetails' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'creator' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'AccountMetadata' },
                      },
                    ],
                  },
                },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AtomTriple' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'thing' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ThingMetadata' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AccountMetadata' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'accounts' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'label' } },
          { kind: 'Field', name: { kind: 'Name', value: 'image' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'atomId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ThingMetadata' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'things' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'image' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'url' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AtomMetadata' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'atoms' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'data' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'image' } },
          { kind: 'Field', name: { kind: 'Name', value: 'label' } },
          { kind: 'Field', name: { kind: 'Name', value: 'emoji' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AtomTxn' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'atoms' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'blockNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'blockTimestamp' } },
          { kind: 'Field', name: { kind: 'Name', value: 'transactionHash' } },
          { kind: 'Field', name: { kind: 'Name', value: 'creatorId' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AtomVaultDetails' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'atoms' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'vaultId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'walletId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'vault' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'positionCount' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'totalShares' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'currentSharePrice' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AtomTriple' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'atoms' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'asSubject' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'object' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'data' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'emoji' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'creator' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'AccountMetadata' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'predicate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'data' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'emoji' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'creator' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'AccountMetadata' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'asPredicate' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'subject' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'data' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'emoji' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'creator' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'AccountMetadata' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'object' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'data' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'emoji' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'creator' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'AccountMetadata' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'asObject' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'subject' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'data' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'emoji' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'creator' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'AccountMetadata' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'predicate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'data' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'emoji' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'creator' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'AccountMetadata' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode
export const GetClaimsByAddress = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetClaimsByAddress' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'address' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'claims_aggregate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'accountId' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'address' },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'nodes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'account' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'label' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'triple' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'subject' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'label' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'predicate' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'label' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'object' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'label' },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'vaultId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'counterVaultId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'shares' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'counterShares' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode
export const GetEvents = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetEvents' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'limit' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'offset' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'orderBy' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'events_order_by' },
              },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'where' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'events_bool_exp' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'events_aggregate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'limit' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'offset' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'orderBy' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'where' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'nodes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'EventDetails' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EventDetails' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'events' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'blockNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'blockTimestamp' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
          { kind: 'Field', name: { kind: 'Name', value: 'transactionHash' } },
          { kind: 'Field', name: { kind: 'Name', value: 'atomId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'tripleId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'depositId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'feeTransferId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'redemptionId' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode
export const GetListItems = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetListItems' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'predicateId' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'numeric' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'objectId' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'numeric' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'triples' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'predicateId' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: { kind: 'EnumValue', value: 'predicateId' },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'objectId' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'objectId' },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ListValue',
                  values: [
                    {
                      kind: 'ObjectValue',
                      fields: [
                        {
                          kind: 'ObjectField',
                          name: { kind: 'Name', value: 'vault' },
                          value: {
                            kind: 'ObjectValue',
                            fields: [
                              {
                                kind: 'ObjectField',
                                name: { kind: 'Name', value: 'positionCount' },
                                value: { kind: 'EnumValue', value: 'desc' },
                              },
                            ],
                          },
                        },
                        {
                          kind: 'ObjectField',
                          name: { kind: 'Name', value: 'counterVault' },
                          value: {
                            kind: 'ObjectValue',
                            fields: [
                              {
                                kind: 'ObjectField',
                                name: { kind: 'Name', value: 'positionCount' },
                                value: { kind: 'EnumValue', value: 'desc' },
                              },
                            ],
                          },
                        },
                      ],
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'TripleVaultDetails' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'TripleVaultDetails' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'triples' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'vaultId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'counterVaultId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'vault' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'VaultDetails' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'counterVault' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'VaultDetails' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'VaultDetails' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'vaults' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'atom' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'label' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'triple' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'subject' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'predicate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'object' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'positions_aggregate' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'nodes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'account' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'label' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'shares' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'currentSharePrice' } },
          { kind: 'Field', name: { kind: 'Name', value: 'totalShares' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode
export const GetPositions = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetPositions' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'limit' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'offset' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'orderBy' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'positions_order_by' },
              },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'where' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'positions_bool_exp' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'positions_aggregate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'limit' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'offset' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'orderBy' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'where' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'nodes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PositionDetails' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PositionDetails' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'positions' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'account' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'label' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'vault' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'atom' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'triple' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'subject' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'label' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'predicate' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'label' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'object' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'label' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'shares' } },
          { kind: 'Field', name: { kind: 'Name', value: 'vaultId' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode
export const GetPosition = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetPosition' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'positionId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'position' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'positionId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'PositionDetails' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PositionDetails' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'positions' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'account' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'label' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'vault' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'atom' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'triple' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'subject' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'label' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'predicate' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'label' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'object' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'label' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'shares' } },
          { kind: 'Field', name: { kind: 'Name', value: 'vaultId' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode
export const GetStats = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetStats' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'stats' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'StatDetails' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'StatDetails' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'stats' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'contractBalance' } },
          { kind: 'Field', name: { kind: 'Name', value: 'totalAccounts' } },
          { kind: 'Field', name: { kind: 'Name', value: 'totalFees' } },
          { kind: 'Field', name: { kind: 'Name', value: 'totalAtoms' } },
          { kind: 'Field', name: { kind: 'Name', value: 'totalTriples' } },
          { kind: 'Field', name: { kind: 'Name', value: 'totalPositions' } },
          { kind: 'Field', name: { kind: 'Name', value: 'totalSignals' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode
export const GetTriples = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetTriples' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'limit' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'offset' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'orderBy' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'triples_order_by' },
              },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'where' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'triples_bool_exp' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'triples' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'limit' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'offset' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'orderBy' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'where' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'TripleMetadata' },
                },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'TripleTxn' },
                },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'TripleVaultDetails' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'creator' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'AccountMetadata' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AccountMetadata' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'accounts' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'label' } },
          { kind: 'Field', name: { kind: 'Name', value: 'image' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'atomId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'TripleMetadata' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'triples' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'label' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'subject' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'data' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                { kind: 'Field', name: { kind: 'Name', value: 'emoji' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'creator' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'AccountMetadata' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'predicate' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'data' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                { kind: 'Field', name: { kind: 'Name', value: 'emoji' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'creator' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'AccountMetadata' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'object' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'data' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                { kind: 'Field', name: { kind: 'Name', value: 'emoji' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'creator' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'AccountMetadata' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'TripleTxn' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'triples' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'blockNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'blockTimestamp' } },
          { kind: 'Field', name: { kind: 'Name', value: 'transactionHash' } },
          { kind: 'Field', name: { kind: 'Name', value: 'creatorId' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'TripleVaultDetails' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'triples' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'vaultId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'counterVaultId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'vault' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'VaultDetails' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'counterVault' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'VaultDetails' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'VaultDetails' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'vaults' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'atom' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'label' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'triple' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'subject' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'predicate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'object' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'positions_aggregate' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'nodes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'account' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'label' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'shares' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'currentSharePrice' } },
          { kind: 'Field', name: { kind: 'Name', value: 'totalShares' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode
export const GetTriple = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetTriple' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'tripleId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'numeric' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'triple' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'tripleId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'TripleMetadata' },
                },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'TripleTxn' },
                },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'TripleVaultDetails' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'creator' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'AccountMetadata' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AccountMetadata' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'accounts' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'label' } },
          { kind: 'Field', name: { kind: 'Name', value: 'image' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'atomId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'TripleMetadata' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'triples' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'label' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'subject' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'data' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                { kind: 'Field', name: { kind: 'Name', value: 'emoji' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'creator' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'AccountMetadata' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'predicate' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'data' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                { kind: 'Field', name: { kind: 'Name', value: 'emoji' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'creator' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'AccountMetadata' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'object' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'data' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                { kind: 'Field', name: { kind: 'Name', value: 'emoji' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'creator' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'AccountMetadata' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'TripleTxn' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'triples' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'blockNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'blockTimestamp' } },
          { kind: 'Field', name: { kind: 'Name', value: 'transactionHash' } },
          { kind: 'Field', name: { kind: 'Name', value: 'creatorId' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'TripleVaultDetails' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'triples' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'vaultId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'counterVaultId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'vault' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'VaultDetails' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'counterVault' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'VaultDetails' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'VaultDetails' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'vaults' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'atom' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'label' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'triple' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'subject' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'predicate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'object' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'positions_aggregate' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'nodes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'account' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'label' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'shares' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'currentSharePrice' } },
          { kind: 'Field', name: { kind: 'Name', value: 'totalShares' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode
export const GetVaults = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetVaults' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'limit' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'offset' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'orderBy' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'vaults_order_by' },
              },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'where' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'vaults_bool_exp' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'vaults_aggregate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'limit' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'offset' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'orderBy' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'where' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'nodes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'atom' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'label' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'triple' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'subject' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'label' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'predicate' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'label' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'object' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'label' },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'positions_aggregate' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'nodes' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'account' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'id' },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'label',
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'shares' },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'currentSharePrice' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'totalShares' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode
export const GetVault = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetVault' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'vaultId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'numeric' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'vault' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'vaultId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'VaultDetails' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'VaultDetails' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'vaults' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'atom' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'label' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'triple' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'subject' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'predicate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'object' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'positions_aggregate' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'nodes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'account' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'label' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'shares' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'currentSharePrice' } },
          { kind: 'Field', name: { kind: 'Name', value: 'totalShares' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode
