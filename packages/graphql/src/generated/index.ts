import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions, InfiniteData } from '@tanstack/react-query';
import { fetcher } from '../client';
import { DocumentNode } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  account_type: { input: any; output: any; }
  atom_type: { input: any; output: any; }
  bigint: { input: any; output: any; }
  bytea: { input: any; output: any; }
  event_type: { input: any; output: any; }
  float8: { input: any; output: any; }
  numeric: { input: any; output: any; }
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']['input']>;
  _gt?: InputMaybe<Scalars['Boolean']['input']>;
  _gte?: InputMaybe<Scalars['Boolean']['input']>;
  _in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Boolean']['input']>;
  _lte?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Scalars['Boolean']['input']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type PinOrganizationInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type PinOutput = {
  __typename?: 'PinOutput';
  uri?: Maybe<Scalars['String']['output']>;
};

export type PinPersonInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  identifier?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type PinThingInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to compare columns of type "account_type". All fields are combined with logical 'AND'. */
export type Account_Type_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['account_type']['input']>;
  _gt?: InputMaybe<Scalars['account_type']['input']>;
  _gte?: InputMaybe<Scalars['account_type']['input']>;
  _in?: InputMaybe<Array<Scalars['account_type']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['account_type']['input']>;
  _lte?: InputMaybe<Scalars['account_type']['input']>;
  _neq?: InputMaybe<Scalars['account_type']['input']>;
  _nin?: InputMaybe<Array<Scalars['account_type']['input']>>;
};

/** columns and relationships of "account" */
export type Accounts = {
  __typename?: 'accounts';
  /** An object relationship */
  atom?: Maybe<Atoms>;
  atom_id?: Maybe<Scalars['numeric']['output']>;
  /** An array relationship */
  atoms: Array<Atoms>;
  /** An aggregate relationship */
  atoms_aggregate: Atoms_Aggregate;
  /** An array relationship */
  claims: Array<Claims>;
  /** An aggregate relationship */
  claims_aggregate: Claims_Aggregate;
  /** An array relationship */
  deposits_received: Array<Deposits>;
  /** An aggregate relationship */
  deposits_received_aggregate: Deposits_Aggregate;
  /** An array relationship */
  deposits_sent: Array<Deposits>;
  /** An aggregate relationship */
  deposits_sent_aggregate: Deposits_Aggregate;
  /** An array relationship */
  fee_transfers: Array<Fee_Transfers>;
  /** An aggregate relationship */
  fee_transfers_aggregate: Fee_Transfers_Aggregate;
  id: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  label: Scalars['String']['output'];
  /** An array relationship */
  positions: Array<Positions>;
  /** An aggregate relationship */
  positions_aggregate: Positions_Aggregate;
  /** An array relationship */
  redemptions_received: Array<Redemptions>;
  /** An aggregate relationship */
  redemptions_received_aggregate: Redemptions_Aggregate;
  /** An array relationship */
  redemptions_sent: Array<Redemptions>;
  /** An aggregate relationship */
  redemptions_sent_aggregate: Redemptions_Aggregate;
  /** An array relationship */
  signals: Array<Signals>;
  /** An aggregate relationship */
  signals_aggregate: Signals_Aggregate;
  /** An array relationship */
  triples: Array<Triples>;
  /** An aggregate relationship */
  triples_aggregate: Triples_Aggregate;
  type: Scalars['account_type']['output'];
};


/** columns and relationships of "account" */
export type AccountsAtomsArgs = {
  distinct_on?: InputMaybe<Array<Atoms_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Atoms_Order_By>>;
  where?: InputMaybe<Atoms_Bool_Exp>;
};


/** columns and relationships of "account" */
export type AccountsAtoms_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Atoms_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Atoms_Order_By>>;
  where?: InputMaybe<Atoms_Bool_Exp>;
};


/** columns and relationships of "account" */
export type AccountsClaimsArgs = {
  distinct_on?: InputMaybe<Array<Claims_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Claims_Order_By>>;
  where?: InputMaybe<Claims_Bool_Exp>;
};


/** columns and relationships of "account" */
export type AccountsClaims_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Claims_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Claims_Order_By>>;
  where?: InputMaybe<Claims_Bool_Exp>;
};


/** columns and relationships of "account" */
export type AccountsDeposits_ReceivedArgs = {
  distinct_on?: InputMaybe<Array<Deposits_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Deposits_Order_By>>;
  where?: InputMaybe<Deposits_Bool_Exp>;
};


/** columns and relationships of "account" */
export type AccountsDeposits_Received_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Deposits_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Deposits_Order_By>>;
  where?: InputMaybe<Deposits_Bool_Exp>;
};


/** columns and relationships of "account" */
export type AccountsDeposits_SentArgs = {
  distinct_on?: InputMaybe<Array<Deposits_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Deposits_Order_By>>;
  where?: InputMaybe<Deposits_Bool_Exp>;
};


/** columns and relationships of "account" */
export type AccountsDeposits_Sent_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Deposits_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Deposits_Order_By>>;
  where?: InputMaybe<Deposits_Bool_Exp>;
};


/** columns and relationships of "account" */
export type AccountsFee_TransfersArgs = {
  distinct_on?: InputMaybe<Array<Fee_Transfers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Fee_Transfers_Order_By>>;
  where?: InputMaybe<Fee_Transfers_Bool_Exp>;
};


/** columns and relationships of "account" */
export type AccountsFee_Transfers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Fee_Transfers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Fee_Transfers_Order_By>>;
  where?: InputMaybe<Fee_Transfers_Bool_Exp>;
};


/** columns and relationships of "account" */
export type AccountsPositionsArgs = {
  distinct_on?: InputMaybe<Array<Positions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Positions_Order_By>>;
  where?: InputMaybe<Positions_Bool_Exp>;
};


/** columns and relationships of "account" */
export type AccountsPositions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Positions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Positions_Order_By>>;
  where?: InputMaybe<Positions_Bool_Exp>;
};


/** columns and relationships of "account" */
export type AccountsRedemptions_ReceivedArgs = {
  distinct_on?: InputMaybe<Array<Redemptions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Redemptions_Order_By>>;
  where?: InputMaybe<Redemptions_Bool_Exp>;
};


/** columns and relationships of "account" */
export type AccountsRedemptions_Received_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Redemptions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Redemptions_Order_By>>;
  where?: InputMaybe<Redemptions_Bool_Exp>;
};


/** columns and relationships of "account" */
export type AccountsRedemptions_SentArgs = {
  distinct_on?: InputMaybe<Array<Redemptions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Redemptions_Order_By>>;
  where?: InputMaybe<Redemptions_Bool_Exp>;
};


/** columns and relationships of "account" */
export type AccountsRedemptions_Sent_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Redemptions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Redemptions_Order_By>>;
  where?: InputMaybe<Redemptions_Bool_Exp>;
};


/** columns and relationships of "account" */
export type AccountsSignalsArgs = {
  distinct_on?: InputMaybe<Array<Signals_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Signals_Order_By>>;
  where?: InputMaybe<Signals_Bool_Exp>;
};


/** columns and relationships of "account" */
export type AccountsSignals_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Signals_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Signals_Order_By>>;
  where?: InputMaybe<Signals_Bool_Exp>;
};


/** columns and relationships of "account" */
export type AccountsTriplesArgs = {
  distinct_on?: InputMaybe<Array<Triples_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Triples_Order_By>>;
  where?: InputMaybe<Triples_Bool_Exp>;
};


/** columns and relationships of "account" */
export type AccountsTriples_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Triples_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Triples_Order_By>>;
  where?: InputMaybe<Triples_Bool_Exp>;
};

/** aggregated selection of "account" */
export type Accounts_Aggregate = {
  __typename?: 'accounts_aggregate';
  aggregate?: Maybe<Accounts_Aggregate_Fields>;
  nodes: Array<Accounts>;
};

export type Accounts_Aggregate_Bool_Exp = {
  count?: InputMaybe<Accounts_Aggregate_Bool_Exp_Count>;
};

export type Accounts_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Accounts_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Accounts_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "account" */
export type Accounts_Aggregate_Fields = {
  __typename?: 'accounts_aggregate_fields';
  avg?: Maybe<Accounts_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Accounts_Max_Fields>;
  min?: Maybe<Accounts_Min_Fields>;
  stddev?: Maybe<Accounts_Stddev_Fields>;
  stddev_pop?: Maybe<Accounts_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Accounts_Stddev_Samp_Fields>;
  sum?: Maybe<Accounts_Sum_Fields>;
  var_pop?: Maybe<Accounts_Var_Pop_Fields>;
  var_samp?: Maybe<Accounts_Var_Samp_Fields>;
  variance?: Maybe<Accounts_Variance_Fields>;
};


/** aggregate fields of "account" */
export type Accounts_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Accounts_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "account" */
export type Accounts_Aggregate_Order_By = {
  avg?: InputMaybe<Accounts_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Accounts_Max_Order_By>;
  min?: InputMaybe<Accounts_Min_Order_By>;
  stddev?: InputMaybe<Accounts_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Accounts_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Accounts_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Accounts_Sum_Order_By>;
  var_pop?: InputMaybe<Accounts_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Accounts_Var_Samp_Order_By>;
  variance?: InputMaybe<Accounts_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Accounts_Avg_Fields = {
  __typename?: 'accounts_avg_fields';
  atom_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "account" */
export type Accounts_Avg_Order_By = {
  atom_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "account". All fields are combined with a logical 'AND'. */
export type Accounts_Bool_Exp = {
  _and?: InputMaybe<Array<Accounts_Bool_Exp>>;
  _not?: InputMaybe<Accounts_Bool_Exp>;
  _or?: InputMaybe<Array<Accounts_Bool_Exp>>;
  atom?: InputMaybe<Atoms_Bool_Exp>;
  atom_id?: InputMaybe<Numeric_Comparison_Exp>;
  atoms?: InputMaybe<Atoms_Bool_Exp>;
  atoms_aggregate?: InputMaybe<Atoms_Aggregate_Bool_Exp>;
  claims?: InputMaybe<Claims_Bool_Exp>;
  claims_aggregate?: InputMaybe<Claims_Aggregate_Bool_Exp>;
  deposits_received?: InputMaybe<Deposits_Bool_Exp>;
  deposits_received_aggregate?: InputMaybe<Deposits_Aggregate_Bool_Exp>;
  deposits_sent?: InputMaybe<Deposits_Bool_Exp>;
  deposits_sent_aggregate?: InputMaybe<Deposits_Aggregate_Bool_Exp>;
  fee_transfers?: InputMaybe<Fee_Transfers_Bool_Exp>;
  fee_transfers_aggregate?: InputMaybe<Fee_Transfers_Aggregate_Bool_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  image?: InputMaybe<String_Comparison_Exp>;
  label?: InputMaybe<String_Comparison_Exp>;
  positions?: InputMaybe<Positions_Bool_Exp>;
  positions_aggregate?: InputMaybe<Positions_Aggregate_Bool_Exp>;
  redemptions_received?: InputMaybe<Redemptions_Bool_Exp>;
  redemptions_received_aggregate?: InputMaybe<Redemptions_Aggregate_Bool_Exp>;
  redemptions_sent?: InputMaybe<Redemptions_Bool_Exp>;
  redemptions_sent_aggregate?: InputMaybe<Redemptions_Aggregate_Bool_Exp>;
  signals?: InputMaybe<Signals_Bool_Exp>;
  signals_aggregate?: InputMaybe<Signals_Aggregate_Bool_Exp>;
  triples?: InputMaybe<Triples_Bool_Exp>;
  triples_aggregate?: InputMaybe<Triples_Aggregate_Bool_Exp>;
  type?: InputMaybe<Account_Type_Comparison_Exp>;
};

/** aggregate max on columns */
export type Accounts_Max_Fields = {
  __typename?: 'accounts_max_fields';
  atom_id?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['account_type']['output']>;
};

/** order by max() on columns of table "account" */
export type Accounts_Max_Order_By = {
  atom_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image?: InputMaybe<Order_By>;
  label?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Accounts_Min_Fields = {
  __typename?: 'accounts_min_fields';
  atom_id?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['account_type']['output']>;
};

/** order by min() on columns of table "account" */
export type Accounts_Min_Order_By = {
  atom_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image?: InputMaybe<Order_By>;
  label?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "account". */
export type Accounts_Order_By = {
  atom?: InputMaybe<Atoms_Order_By>;
  atom_id?: InputMaybe<Order_By>;
  atoms_aggregate?: InputMaybe<Atoms_Aggregate_Order_By>;
  claims_aggregate?: InputMaybe<Claims_Aggregate_Order_By>;
  deposits_received_aggregate?: InputMaybe<Deposits_Aggregate_Order_By>;
  deposits_sent_aggregate?: InputMaybe<Deposits_Aggregate_Order_By>;
  fee_transfers_aggregate?: InputMaybe<Fee_Transfers_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  image?: InputMaybe<Order_By>;
  label?: InputMaybe<Order_By>;
  positions_aggregate?: InputMaybe<Positions_Aggregate_Order_By>;
  redemptions_received_aggregate?: InputMaybe<Redemptions_Aggregate_Order_By>;
  redemptions_sent_aggregate?: InputMaybe<Redemptions_Aggregate_Order_By>;
  signals_aggregate?: InputMaybe<Signals_Aggregate_Order_By>;
  triples_aggregate?: InputMaybe<Triples_Aggregate_Order_By>;
  type?: InputMaybe<Order_By>;
};

/** select columns of table "account" */
export type Accounts_Select_Column =
  /** column name */
  | 'atom_id'
  /** column name */
  | 'id'
  /** column name */
  | 'image'
  /** column name */
  | 'label'
  /** column name */
  | 'type';

/** aggregate stddev on columns */
export type Accounts_Stddev_Fields = {
  __typename?: 'accounts_stddev_fields';
  atom_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "account" */
export type Accounts_Stddev_Order_By = {
  atom_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Accounts_Stddev_Pop_Fields = {
  __typename?: 'accounts_stddev_pop_fields';
  atom_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "account" */
export type Accounts_Stddev_Pop_Order_By = {
  atom_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Accounts_Stddev_Samp_Fields = {
  __typename?: 'accounts_stddev_samp_fields';
  atom_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "account" */
export type Accounts_Stddev_Samp_Order_By = {
  atom_id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "accounts" */
export type Accounts_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Accounts_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Accounts_Stream_Cursor_Value_Input = {
  atom_id?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['account_type']['input']>;
};

/** aggregate sum on columns */
export type Accounts_Sum_Fields = {
  __typename?: 'accounts_sum_fields';
  atom_id?: Maybe<Scalars['numeric']['output']>;
};

/** order by sum() on columns of table "account" */
export type Accounts_Sum_Order_By = {
  atom_id?: InputMaybe<Order_By>;
};

export type Accounts_That_Claim_About_Account_Args = {
  address?: InputMaybe<Scalars['String']['input']>;
  predicate?: InputMaybe<Scalars['numeric']['input']>;
  subject?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate var_pop on columns */
export type Accounts_Var_Pop_Fields = {
  __typename?: 'accounts_var_pop_fields';
  atom_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "account" */
export type Accounts_Var_Pop_Order_By = {
  atom_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Accounts_Var_Samp_Fields = {
  __typename?: 'accounts_var_samp_fields';
  atom_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "account" */
export type Accounts_Var_Samp_Order_By = {
  atom_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Accounts_Variance_Fields = {
  __typename?: 'accounts_variance_fields';
  atom_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "account" */
export type Accounts_Variance_Order_By = {
  atom_id?: InputMaybe<Order_By>;
};

/** Boolean expression to compare columns of type "atom_type". All fields are combined with logical 'AND'. */
export type Atom_Type_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['atom_type']['input']>;
  _gt?: InputMaybe<Scalars['atom_type']['input']>;
  _gte?: InputMaybe<Scalars['atom_type']['input']>;
  _in?: InputMaybe<Array<Scalars['atom_type']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['atom_type']['input']>;
  _lte?: InputMaybe<Scalars['atom_type']['input']>;
  _neq?: InputMaybe<Scalars['atom_type']['input']>;
  _nin?: InputMaybe<Array<Scalars['atom_type']['input']>>;
};

/** columns and relationships of "atom_value" */
export type Atom_Values = {
  __typename?: 'atom_values';
  /** An object relationship */
  account?: Maybe<Accounts>;
  account_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  atom?: Maybe<Atoms>;
  /** An object relationship */
  book?: Maybe<Books>;
  book_id?: Maybe<Scalars['numeric']['output']>;
  id: Scalars['numeric']['output'];
  /** An object relationship */
  organization?: Maybe<Organizations>;
  organization_id?: Maybe<Scalars['numeric']['output']>;
  /** An object relationship */
  person?: Maybe<Persons>;
  person_id?: Maybe<Scalars['numeric']['output']>;
  /** An object relationship */
  thing?: Maybe<Things>;
  thing_id?: Maybe<Scalars['numeric']['output']>;
};

/** aggregated selection of "atom_value" */
export type Atom_Values_Aggregate = {
  __typename?: 'atom_values_aggregate';
  aggregate?: Maybe<Atom_Values_Aggregate_Fields>;
  nodes: Array<Atom_Values>;
};

/** aggregate fields of "atom_value" */
export type Atom_Values_Aggregate_Fields = {
  __typename?: 'atom_values_aggregate_fields';
  avg?: Maybe<Atom_Values_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Atom_Values_Max_Fields>;
  min?: Maybe<Atom_Values_Min_Fields>;
  stddev?: Maybe<Atom_Values_Stddev_Fields>;
  stddev_pop?: Maybe<Atom_Values_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Atom_Values_Stddev_Samp_Fields>;
  sum?: Maybe<Atom_Values_Sum_Fields>;
  var_pop?: Maybe<Atom_Values_Var_Pop_Fields>;
  var_samp?: Maybe<Atom_Values_Var_Samp_Fields>;
  variance?: Maybe<Atom_Values_Variance_Fields>;
};


/** aggregate fields of "atom_value" */
export type Atom_Values_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Atom_Values_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Atom_Values_Avg_Fields = {
  __typename?: 'atom_values_avg_fields';
  book_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  organization_id?: Maybe<Scalars['Float']['output']>;
  person_id?: Maybe<Scalars['Float']['output']>;
  thing_id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "atom_value". All fields are combined with a logical 'AND'. */
export type Atom_Values_Bool_Exp = {
  _and?: InputMaybe<Array<Atom_Values_Bool_Exp>>;
  _not?: InputMaybe<Atom_Values_Bool_Exp>;
  _or?: InputMaybe<Array<Atom_Values_Bool_Exp>>;
  account?: InputMaybe<Accounts_Bool_Exp>;
  account_id?: InputMaybe<String_Comparison_Exp>;
  atom?: InputMaybe<Atoms_Bool_Exp>;
  book?: InputMaybe<Books_Bool_Exp>;
  book_id?: InputMaybe<Numeric_Comparison_Exp>;
  id?: InputMaybe<Numeric_Comparison_Exp>;
  organization?: InputMaybe<Organizations_Bool_Exp>;
  organization_id?: InputMaybe<Numeric_Comparison_Exp>;
  person?: InputMaybe<Persons_Bool_Exp>;
  person_id?: InputMaybe<Numeric_Comparison_Exp>;
  thing?: InputMaybe<Things_Bool_Exp>;
  thing_id?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Atom_Values_Max_Fields = {
  __typename?: 'atom_values_max_fields';
  account_id?: Maybe<Scalars['String']['output']>;
  book_id?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['numeric']['output']>;
  organization_id?: Maybe<Scalars['numeric']['output']>;
  person_id?: Maybe<Scalars['numeric']['output']>;
  thing_id?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate min on columns */
export type Atom_Values_Min_Fields = {
  __typename?: 'atom_values_min_fields';
  account_id?: Maybe<Scalars['String']['output']>;
  book_id?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['numeric']['output']>;
  organization_id?: Maybe<Scalars['numeric']['output']>;
  person_id?: Maybe<Scalars['numeric']['output']>;
  thing_id?: Maybe<Scalars['numeric']['output']>;
};

/** Ordering options when selecting data from "atom_value". */
export type Atom_Values_Order_By = {
  account?: InputMaybe<Accounts_Order_By>;
  account_id?: InputMaybe<Order_By>;
  atom?: InputMaybe<Atoms_Order_By>;
  book?: InputMaybe<Books_Order_By>;
  book_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  organization?: InputMaybe<Organizations_Order_By>;
  organization_id?: InputMaybe<Order_By>;
  person?: InputMaybe<Persons_Order_By>;
  person_id?: InputMaybe<Order_By>;
  thing?: InputMaybe<Things_Order_By>;
  thing_id?: InputMaybe<Order_By>;
};

/** select columns of table "atom_value" */
export type Atom_Values_Select_Column =
  /** column name */
  | 'account_id'
  /** column name */
  | 'book_id'
  /** column name */
  | 'id'
  /** column name */
  | 'organization_id'
  /** column name */
  | 'person_id'
  /** column name */
  | 'thing_id';

/** aggregate stddev on columns */
export type Atom_Values_Stddev_Fields = {
  __typename?: 'atom_values_stddev_fields';
  book_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  organization_id?: Maybe<Scalars['Float']['output']>;
  person_id?: Maybe<Scalars['Float']['output']>;
  thing_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Atom_Values_Stddev_Pop_Fields = {
  __typename?: 'atom_values_stddev_pop_fields';
  book_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  organization_id?: Maybe<Scalars['Float']['output']>;
  person_id?: Maybe<Scalars['Float']['output']>;
  thing_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Atom_Values_Stddev_Samp_Fields = {
  __typename?: 'atom_values_stddev_samp_fields';
  book_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  organization_id?: Maybe<Scalars['Float']['output']>;
  person_id?: Maybe<Scalars['Float']['output']>;
  thing_id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "atom_values" */
export type Atom_Values_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Atom_Values_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Atom_Values_Stream_Cursor_Value_Input = {
  account_id?: InputMaybe<Scalars['String']['input']>;
  book_id?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['numeric']['input']>;
  organization_id?: InputMaybe<Scalars['numeric']['input']>;
  person_id?: InputMaybe<Scalars['numeric']['input']>;
  thing_id?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Atom_Values_Sum_Fields = {
  __typename?: 'atom_values_sum_fields';
  book_id?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['numeric']['output']>;
  organization_id?: Maybe<Scalars['numeric']['output']>;
  person_id?: Maybe<Scalars['numeric']['output']>;
  thing_id?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Atom_Values_Var_Pop_Fields = {
  __typename?: 'atom_values_var_pop_fields';
  book_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  organization_id?: Maybe<Scalars['Float']['output']>;
  person_id?: Maybe<Scalars['Float']['output']>;
  thing_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Atom_Values_Var_Samp_Fields = {
  __typename?: 'atom_values_var_samp_fields';
  book_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  organization_id?: Maybe<Scalars['Float']['output']>;
  person_id?: Maybe<Scalars['Float']['output']>;
  thing_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Atom_Values_Variance_Fields = {
  __typename?: 'atom_values_variance_fields';
  book_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  organization_id?: Maybe<Scalars['Float']['output']>;
  person_id?: Maybe<Scalars['Float']['output']>;
  thing_id?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "atom" */
export type Atoms = {
  __typename?: 'atoms';
  /** An array relationship */
  accounts: Array<Accounts>;
  /** An aggregate relationship */
  accounts_aggregate: Accounts_Aggregate;
  /** An array relationship */
  as_object_claims: Array<Claims>;
  /** An aggregate relationship */
  as_object_claims_aggregate: Claims_Aggregate;
  /** An array relationship */
  as_object_triples: Array<Triples>;
  /** An aggregate relationship */
  as_object_triples_aggregate: Triples_Aggregate;
  /** An array relationship */
  as_predicate_claims: Array<Claims>;
  /** An aggregate relationship */
  as_predicate_claims_aggregate: Claims_Aggregate;
  /** An array relationship */
  as_predicate_triples: Array<Triples>;
  /** An aggregate relationship */
  as_predicate_triples_aggregate: Triples_Aggregate;
  /** An array relationship */
  as_subject_claims: Array<Claims>;
  /** An aggregate relationship */
  as_subject_claims_aggregate: Claims_Aggregate;
  /** An array relationship */
  as_subject_triples: Array<Triples>;
  /** An aggregate relationship */
  as_subject_triples_aggregate: Triples_Aggregate;
  block_number: Scalars['numeric']['output'];
  block_timestamp: Scalars['bigint']['output'];
  /** An object relationship */
  controler?: Maybe<Accounts>;
  /** An object relationship */
  creator?: Maybe<Accounts>;
  creator_id: Scalars['String']['output'];
  data: Scalars['String']['output'];
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['numeric']['output'];
  image?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  signals: Array<Signals>;
  /** An aggregate relationship */
  signals_aggregate: Signals_Aggregate;
  transaction_hash: Scalars['bytea']['output'];
  type: Scalars['atom_type']['output'];
  /** An object relationship */
  value?: Maybe<Atom_Values>;
  value_id?: Maybe<Scalars['numeric']['output']>;
  /** An object relationship */
  vault?: Maybe<Vaults>;
  vault_id: Scalars['numeric']['output'];
  wallet_id: Scalars['String']['output'];
};


/** columns and relationships of "atom" */
export type AtomsAccountsArgs = {
  distinct_on?: InputMaybe<Array<Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Accounts_Order_By>>;
  where?: InputMaybe<Accounts_Bool_Exp>;
};


/** columns and relationships of "atom" */
export type AtomsAccounts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Accounts_Order_By>>;
  where?: InputMaybe<Accounts_Bool_Exp>;
};


/** columns and relationships of "atom" */
export type AtomsAs_Object_ClaimsArgs = {
  distinct_on?: InputMaybe<Array<Claims_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Claims_Order_By>>;
  where?: InputMaybe<Claims_Bool_Exp>;
};


/** columns and relationships of "atom" */
export type AtomsAs_Object_Claims_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Claims_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Claims_Order_By>>;
  where?: InputMaybe<Claims_Bool_Exp>;
};


/** columns and relationships of "atom" */
export type AtomsAs_Object_TriplesArgs = {
  distinct_on?: InputMaybe<Array<Triples_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Triples_Order_By>>;
  where?: InputMaybe<Triples_Bool_Exp>;
};


/** columns and relationships of "atom" */
export type AtomsAs_Object_Triples_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Triples_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Triples_Order_By>>;
  where?: InputMaybe<Triples_Bool_Exp>;
};


/** columns and relationships of "atom" */
export type AtomsAs_Predicate_ClaimsArgs = {
  distinct_on?: InputMaybe<Array<Claims_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Claims_Order_By>>;
  where?: InputMaybe<Claims_Bool_Exp>;
};


/** columns and relationships of "atom" */
export type AtomsAs_Predicate_Claims_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Claims_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Claims_Order_By>>;
  where?: InputMaybe<Claims_Bool_Exp>;
};


/** columns and relationships of "atom" */
export type AtomsAs_Predicate_TriplesArgs = {
  distinct_on?: InputMaybe<Array<Triples_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Triples_Order_By>>;
  where?: InputMaybe<Triples_Bool_Exp>;
};


/** columns and relationships of "atom" */
export type AtomsAs_Predicate_Triples_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Triples_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Triples_Order_By>>;
  where?: InputMaybe<Triples_Bool_Exp>;
};


/** columns and relationships of "atom" */
export type AtomsAs_Subject_ClaimsArgs = {
  distinct_on?: InputMaybe<Array<Claims_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Claims_Order_By>>;
  where?: InputMaybe<Claims_Bool_Exp>;
};


/** columns and relationships of "atom" */
export type AtomsAs_Subject_Claims_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Claims_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Claims_Order_By>>;
  where?: InputMaybe<Claims_Bool_Exp>;
};


/** columns and relationships of "atom" */
export type AtomsAs_Subject_TriplesArgs = {
  distinct_on?: InputMaybe<Array<Triples_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Triples_Order_By>>;
  where?: InputMaybe<Triples_Bool_Exp>;
};


/** columns and relationships of "atom" */
export type AtomsAs_Subject_Triples_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Triples_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Triples_Order_By>>;
  where?: InputMaybe<Triples_Bool_Exp>;
};


/** columns and relationships of "atom" */
export type AtomsSignalsArgs = {
  distinct_on?: InputMaybe<Array<Signals_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Signals_Order_By>>;
  where?: InputMaybe<Signals_Bool_Exp>;
};


/** columns and relationships of "atom" */
export type AtomsSignals_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Signals_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Signals_Order_By>>;
  where?: InputMaybe<Signals_Bool_Exp>;
};

/** aggregated selection of "atom" */
export type Atoms_Aggregate = {
  __typename?: 'atoms_aggregate';
  aggregate?: Maybe<Atoms_Aggregate_Fields>;
  nodes: Array<Atoms>;
};

export type Atoms_Aggregate_Bool_Exp = {
  count?: InputMaybe<Atoms_Aggregate_Bool_Exp_Count>;
};

export type Atoms_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Atoms_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Atoms_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "atom" */
export type Atoms_Aggregate_Fields = {
  __typename?: 'atoms_aggregate_fields';
  avg?: Maybe<Atoms_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Atoms_Max_Fields>;
  min?: Maybe<Atoms_Min_Fields>;
  stddev?: Maybe<Atoms_Stddev_Fields>;
  stddev_pop?: Maybe<Atoms_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Atoms_Stddev_Samp_Fields>;
  sum?: Maybe<Atoms_Sum_Fields>;
  var_pop?: Maybe<Atoms_Var_Pop_Fields>;
  var_samp?: Maybe<Atoms_Var_Samp_Fields>;
  variance?: Maybe<Atoms_Variance_Fields>;
};


/** aggregate fields of "atom" */
export type Atoms_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Atoms_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "atom" */
export type Atoms_Aggregate_Order_By = {
  avg?: InputMaybe<Atoms_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Atoms_Max_Order_By>;
  min?: InputMaybe<Atoms_Min_Order_By>;
  stddev?: InputMaybe<Atoms_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Atoms_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Atoms_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Atoms_Sum_Order_By>;
  var_pop?: InputMaybe<Atoms_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Atoms_Var_Samp_Order_By>;
  variance?: InputMaybe<Atoms_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Atoms_Avg_Fields = {
  __typename?: 'atoms_avg_fields';
  block_number?: Maybe<Scalars['Float']['output']>;
  block_timestamp?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  value_id?: Maybe<Scalars['Float']['output']>;
  vault_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "atom" */
export type Atoms_Avg_Order_By = {
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  value_id?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "atom". All fields are combined with a logical 'AND'. */
export type Atoms_Bool_Exp = {
  _and?: InputMaybe<Array<Atoms_Bool_Exp>>;
  _not?: InputMaybe<Atoms_Bool_Exp>;
  _or?: InputMaybe<Array<Atoms_Bool_Exp>>;
  accounts?: InputMaybe<Accounts_Bool_Exp>;
  accounts_aggregate?: InputMaybe<Accounts_Aggregate_Bool_Exp>;
  as_object_claims?: InputMaybe<Claims_Bool_Exp>;
  as_object_claims_aggregate?: InputMaybe<Claims_Aggregate_Bool_Exp>;
  as_object_triples?: InputMaybe<Triples_Bool_Exp>;
  as_object_triples_aggregate?: InputMaybe<Triples_Aggregate_Bool_Exp>;
  as_predicate_claims?: InputMaybe<Claims_Bool_Exp>;
  as_predicate_claims_aggregate?: InputMaybe<Claims_Aggregate_Bool_Exp>;
  as_predicate_triples?: InputMaybe<Triples_Bool_Exp>;
  as_predicate_triples_aggregate?: InputMaybe<Triples_Aggregate_Bool_Exp>;
  as_subject_claims?: InputMaybe<Claims_Bool_Exp>;
  as_subject_claims_aggregate?: InputMaybe<Claims_Aggregate_Bool_Exp>;
  as_subject_triples?: InputMaybe<Triples_Bool_Exp>;
  as_subject_triples_aggregate?: InputMaybe<Triples_Aggregate_Bool_Exp>;
  block_number?: InputMaybe<Numeric_Comparison_Exp>;
  block_timestamp?: InputMaybe<Bigint_Comparison_Exp>;
  controler?: InputMaybe<Accounts_Bool_Exp>;
  creator?: InputMaybe<Accounts_Bool_Exp>;
  creator_id?: InputMaybe<String_Comparison_Exp>;
  data?: InputMaybe<String_Comparison_Exp>;
  emoji?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Numeric_Comparison_Exp>;
  image?: InputMaybe<String_Comparison_Exp>;
  label?: InputMaybe<String_Comparison_Exp>;
  signals?: InputMaybe<Signals_Bool_Exp>;
  signals_aggregate?: InputMaybe<Signals_Aggregate_Bool_Exp>;
  transaction_hash?: InputMaybe<Bytea_Comparison_Exp>;
  type?: InputMaybe<Atom_Type_Comparison_Exp>;
  value?: InputMaybe<Atom_Values_Bool_Exp>;
  value_id?: InputMaybe<Numeric_Comparison_Exp>;
  vault?: InputMaybe<Vaults_Bool_Exp>;
  vault_id?: InputMaybe<Numeric_Comparison_Exp>;
  wallet_id?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Atoms_Max_Fields = {
  __typename?: 'atoms_max_fields';
  block_number?: Maybe<Scalars['numeric']['output']>;
  block_timestamp?: Maybe<Scalars['bigint']['output']>;
  creator_id?: Maybe<Scalars['String']['output']>;
  data?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['numeric']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['atom_type']['output']>;
  value_id?: Maybe<Scalars['numeric']['output']>;
  vault_id?: Maybe<Scalars['numeric']['output']>;
  wallet_id?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "atom" */
export type Atoms_Max_Order_By = {
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  creator_id?: InputMaybe<Order_By>;
  data?: InputMaybe<Order_By>;
  emoji?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image?: InputMaybe<Order_By>;
  label?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  value_id?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
  wallet_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Atoms_Min_Fields = {
  __typename?: 'atoms_min_fields';
  block_number?: Maybe<Scalars['numeric']['output']>;
  block_timestamp?: Maybe<Scalars['bigint']['output']>;
  creator_id?: Maybe<Scalars['String']['output']>;
  data?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['numeric']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['atom_type']['output']>;
  value_id?: Maybe<Scalars['numeric']['output']>;
  vault_id?: Maybe<Scalars['numeric']['output']>;
  wallet_id?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "atom" */
export type Atoms_Min_Order_By = {
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  creator_id?: InputMaybe<Order_By>;
  data?: InputMaybe<Order_By>;
  emoji?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image?: InputMaybe<Order_By>;
  label?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  value_id?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
  wallet_id?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "atom". */
export type Atoms_Order_By = {
  accounts_aggregate?: InputMaybe<Accounts_Aggregate_Order_By>;
  as_object_claims_aggregate?: InputMaybe<Claims_Aggregate_Order_By>;
  as_object_triples_aggregate?: InputMaybe<Triples_Aggregate_Order_By>;
  as_predicate_claims_aggregate?: InputMaybe<Claims_Aggregate_Order_By>;
  as_predicate_triples_aggregate?: InputMaybe<Triples_Aggregate_Order_By>;
  as_subject_claims_aggregate?: InputMaybe<Claims_Aggregate_Order_By>;
  as_subject_triples_aggregate?: InputMaybe<Triples_Aggregate_Order_By>;
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  controler?: InputMaybe<Accounts_Order_By>;
  creator?: InputMaybe<Accounts_Order_By>;
  creator_id?: InputMaybe<Order_By>;
  data?: InputMaybe<Order_By>;
  emoji?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image?: InputMaybe<Order_By>;
  label?: InputMaybe<Order_By>;
  signals_aggregate?: InputMaybe<Signals_Aggregate_Order_By>;
  transaction_hash?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  value?: InputMaybe<Atom_Values_Order_By>;
  value_id?: InputMaybe<Order_By>;
  vault?: InputMaybe<Vaults_Order_By>;
  vault_id?: InputMaybe<Order_By>;
  wallet_id?: InputMaybe<Order_By>;
};

/** select columns of table "atom" */
export type Atoms_Select_Column =
  /** column name */
  | 'block_number'
  /** column name */
  | 'block_timestamp'
  /** column name */
  | 'creator_id'
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
  | 'transaction_hash'
  /** column name */
  | 'type'
  /** column name */
  | 'value_id'
  /** column name */
  | 'vault_id'
  /** column name */
  | 'wallet_id';

/** aggregate stddev on columns */
export type Atoms_Stddev_Fields = {
  __typename?: 'atoms_stddev_fields';
  block_number?: Maybe<Scalars['Float']['output']>;
  block_timestamp?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  value_id?: Maybe<Scalars['Float']['output']>;
  vault_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "atom" */
export type Atoms_Stddev_Order_By = {
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  value_id?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Atoms_Stddev_Pop_Fields = {
  __typename?: 'atoms_stddev_pop_fields';
  block_number?: Maybe<Scalars['Float']['output']>;
  block_timestamp?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  value_id?: Maybe<Scalars['Float']['output']>;
  vault_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "atom" */
export type Atoms_Stddev_Pop_Order_By = {
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  value_id?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Atoms_Stddev_Samp_Fields = {
  __typename?: 'atoms_stddev_samp_fields';
  block_number?: Maybe<Scalars['Float']['output']>;
  block_timestamp?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  value_id?: Maybe<Scalars['Float']['output']>;
  vault_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "atom" */
export type Atoms_Stddev_Samp_Order_By = {
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  value_id?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "atoms" */
export type Atoms_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Atoms_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Atoms_Stream_Cursor_Value_Input = {
  block_number?: InputMaybe<Scalars['numeric']['input']>;
  block_timestamp?: InputMaybe<Scalars['bigint']['input']>;
  creator_id?: InputMaybe<Scalars['String']['input']>;
  data?: InputMaybe<Scalars['String']['input']>;
  emoji?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['numeric']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  transaction_hash?: InputMaybe<Scalars['bytea']['input']>;
  type?: InputMaybe<Scalars['atom_type']['input']>;
  value_id?: InputMaybe<Scalars['numeric']['input']>;
  vault_id?: InputMaybe<Scalars['numeric']['input']>;
  wallet_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Atoms_Sum_Fields = {
  __typename?: 'atoms_sum_fields';
  block_number?: Maybe<Scalars['numeric']['output']>;
  block_timestamp?: Maybe<Scalars['bigint']['output']>;
  id?: Maybe<Scalars['numeric']['output']>;
  value_id?: Maybe<Scalars['numeric']['output']>;
  vault_id?: Maybe<Scalars['numeric']['output']>;
};

/** order by sum() on columns of table "atom" */
export type Atoms_Sum_Order_By = {
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  value_id?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Atoms_Var_Pop_Fields = {
  __typename?: 'atoms_var_pop_fields';
  block_number?: Maybe<Scalars['Float']['output']>;
  block_timestamp?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  value_id?: Maybe<Scalars['Float']['output']>;
  vault_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "atom" */
export type Atoms_Var_Pop_Order_By = {
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  value_id?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Atoms_Var_Samp_Fields = {
  __typename?: 'atoms_var_samp_fields';
  block_number?: Maybe<Scalars['Float']['output']>;
  block_timestamp?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  value_id?: Maybe<Scalars['Float']['output']>;
  vault_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "atom" */
export type Atoms_Var_Samp_Order_By = {
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  value_id?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Atoms_Variance_Fields = {
  __typename?: 'atoms_variance_fields';
  block_number?: Maybe<Scalars['Float']['output']>;
  block_timestamp?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  value_id?: Maybe<Scalars['Float']['output']>;
  vault_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "atom" */
export type Atoms_Variance_Order_By = {
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  value_id?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** Boolean expression to compare columns of type "bigint". All fields are combined with logical 'AND'. */
export type Bigint_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['bigint']['input']>;
  _gt?: InputMaybe<Scalars['bigint']['input']>;
  _gte?: InputMaybe<Scalars['bigint']['input']>;
  _in?: InputMaybe<Array<Scalars['bigint']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['bigint']['input']>;
  _lte?: InputMaybe<Scalars['bigint']['input']>;
  _neq?: InputMaybe<Scalars['bigint']['input']>;
  _nin?: InputMaybe<Array<Scalars['bigint']['input']>>;
};

/** columns and relationships of "book" */
export type Books = {
  __typename?: 'books';
  /** An object relationship */
  atom?: Maybe<Atoms>;
  description?: Maybe<Scalars['String']['output']>;
  genre?: Maybe<Scalars['String']['output']>;
  id: Scalars['numeric']['output'];
  name?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

/** aggregated selection of "book" */
export type Books_Aggregate = {
  __typename?: 'books_aggregate';
  aggregate?: Maybe<Books_Aggregate_Fields>;
  nodes: Array<Books>;
};

/** aggregate fields of "book" */
export type Books_Aggregate_Fields = {
  __typename?: 'books_aggregate_fields';
  avg?: Maybe<Books_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Books_Max_Fields>;
  min?: Maybe<Books_Min_Fields>;
  stddev?: Maybe<Books_Stddev_Fields>;
  stddev_pop?: Maybe<Books_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Books_Stddev_Samp_Fields>;
  sum?: Maybe<Books_Sum_Fields>;
  var_pop?: Maybe<Books_Var_Pop_Fields>;
  var_samp?: Maybe<Books_Var_Samp_Fields>;
  variance?: Maybe<Books_Variance_Fields>;
};


/** aggregate fields of "book" */
export type Books_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Books_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Books_Avg_Fields = {
  __typename?: 'books_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "book". All fields are combined with a logical 'AND'. */
export type Books_Bool_Exp = {
  _and?: InputMaybe<Array<Books_Bool_Exp>>;
  _not?: InputMaybe<Books_Bool_Exp>;
  _or?: InputMaybe<Array<Books_Bool_Exp>>;
  atom?: InputMaybe<Atoms_Bool_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  genre?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Numeric_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  url?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Books_Max_Fields = {
  __typename?: 'books_max_fields';
  description?: Maybe<Scalars['String']['output']>;
  genre?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['numeric']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Books_Min_Fields = {
  __typename?: 'books_min_fields';
  description?: Maybe<Scalars['String']['output']>;
  genre?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['numeric']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

/** Ordering options when selecting data from "book". */
export type Books_Order_By = {
  atom?: InputMaybe<Atoms_Order_By>;
  description?: InputMaybe<Order_By>;
  genre?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  url?: InputMaybe<Order_By>;
};

/** select columns of table "book" */
export type Books_Select_Column =
  /** column name */
  | 'description'
  /** column name */
  | 'genre'
  /** column name */
  | 'id'
  /** column name */
  | 'name'
  /** column name */
  | 'url';

/** aggregate stddev on columns */
export type Books_Stddev_Fields = {
  __typename?: 'books_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Books_Stddev_Pop_Fields = {
  __typename?: 'books_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Books_Stddev_Samp_Fields = {
  __typename?: 'books_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "books" */
export type Books_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Books_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Books_Stream_Cursor_Value_Input = {
  description?: InputMaybe<Scalars['String']['input']>;
  genre?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['numeric']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Books_Sum_Fields = {
  __typename?: 'books_sum_fields';
  id?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Books_Var_Pop_Fields = {
  __typename?: 'books_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Books_Var_Samp_Fields = {
  __typename?: 'books_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Books_Variance_Fields = {
  __typename?: 'books_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to compare columns of type "bytea". All fields are combined with logical 'AND'. */
export type Bytea_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['bytea']['input']>;
  _gt?: InputMaybe<Scalars['bytea']['input']>;
  _gte?: InputMaybe<Scalars['bytea']['input']>;
  _in?: InputMaybe<Array<Scalars['bytea']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['bytea']['input']>;
  _lte?: InputMaybe<Scalars['bytea']['input']>;
  _neq?: InputMaybe<Scalars['bytea']['input']>;
  _nin?: InputMaybe<Array<Scalars['bytea']['input']>>;
};

/** columns and relationships of "chainlink_price" */
export type Chainlink_Prices = {
  __typename?: 'chainlink_prices';
  id: Scalars['numeric']['output'];
  usd?: Maybe<Scalars['float8']['output']>;
};

/** Boolean expression to filter rows from the table "chainlink_price". All fields are combined with a logical 'AND'. */
export type Chainlink_Prices_Bool_Exp = {
  _and?: InputMaybe<Array<Chainlink_Prices_Bool_Exp>>;
  _not?: InputMaybe<Chainlink_Prices_Bool_Exp>;
  _or?: InputMaybe<Array<Chainlink_Prices_Bool_Exp>>;
  id?: InputMaybe<Numeric_Comparison_Exp>;
  usd?: InputMaybe<Float8_Comparison_Exp>;
};

/** Ordering options when selecting data from "chainlink_price". */
export type Chainlink_Prices_Order_By = {
  id?: InputMaybe<Order_By>;
  usd?: InputMaybe<Order_By>;
};

/** select columns of table "chainlink_price" */
export type Chainlink_Prices_Select_Column =
  /** column name */
  | 'id'
  /** column name */
  | 'usd';

/** Streaming cursor of the table "chainlink_prices" */
export type Chainlink_Prices_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Chainlink_Prices_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Chainlink_Prices_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['numeric']['input']>;
  usd?: InputMaybe<Scalars['float8']['input']>;
};

/** columns and relationships of "claim" */
export type Claims = {
  __typename?: 'claims';
  /** An object relationship */
  account?: Maybe<Accounts>;
  account_id: Scalars['String']['output'];
  counter_shares: Scalars['numeric']['output'];
  /** An object relationship */
  counter_vault: Vaults;
  counter_vault_id: Scalars['numeric']['output'];
  id: Scalars['String']['output'];
  /** An object relationship */
  object: Atoms;
  object_id: Scalars['numeric']['output'];
  /** An object relationship */
  predicate: Atoms;
  predicate_id: Scalars['numeric']['output'];
  shares: Scalars['numeric']['output'];
  /** An object relationship */
  subject: Atoms;
  subject_id: Scalars['numeric']['output'];
  /** An object relationship */
  triple: Triples;
  triple_id: Scalars['numeric']['output'];
  /** An object relationship */
  vault: Vaults;
  vault_id: Scalars['numeric']['output'];
};

/** aggregated selection of "claim" */
export type Claims_Aggregate = {
  __typename?: 'claims_aggregate';
  aggregate?: Maybe<Claims_Aggregate_Fields>;
  nodes: Array<Claims>;
};

export type Claims_Aggregate_Bool_Exp = {
  count?: InputMaybe<Claims_Aggregate_Bool_Exp_Count>;
};

export type Claims_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Claims_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Claims_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "claim" */
export type Claims_Aggregate_Fields = {
  __typename?: 'claims_aggregate_fields';
  avg?: Maybe<Claims_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Claims_Max_Fields>;
  min?: Maybe<Claims_Min_Fields>;
  stddev?: Maybe<Claims_Stddev_Fields>;
  stddev_pop?: Maybe<Claims_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Claims_Stddev_Samp_Fields>;
  sum?: Maybe<Claims_Sum_Fields>;
  var_pop?: Maybe<Claims_Var_Pop_Fields>;
  var_samp?: Maybe<Claims_Var_Samp_Fields>;
  variance?: Maybe<Claims_Variance_Fields>;
};


/** aggregate fields of "claim" */
export type Claims_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Claims_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "claim" */
export type Claims_Aggregate_Order_By = {
  avg?: InputMaybe<Claims_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Claims_Max_Order_By>;
  min?: InputMaybe<Claims_Min_Order_By>;
  stddev?: InputMaybe<Claims_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Claims_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Claims_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Claims_Sum_Order_By>;
  var_pop?: InputMaybe<Claims_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Claims_Var_Samp_Order_By>;
  variance?: InputMaybe<Claims_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Claims_Avg_Fields = {
  __typename?: 'claims_avg_fields';
  counter_shares?: Maybe<Scalars['Float']['output']>;
  counter_vault_id?: Maybe<Scalars['Float']['output']>;
  object_id?: Maybe<Scalars['Float']['output']>;
  predicate_id?: Maybe<Scalars['Float']['output']>;
  shares?: Maybe<Scalars['Float']['output']>;
  subject_id?: Maybe<Scalars['Float']['output']>;
  triple_id?: Maybe<Scalars['Float']['output']>;
  vault_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "claim" */
export type Claims_Avg_Order_By = {
  counter_shares?: InputMaybe<Order_By>;
  counter_vault_id?: InputMaybe<Order_By>;
  object_id?: InputMaybe<Order_By>;
  predicate_id?: InputMaybe<Order_By>;
  shares?: InputMaybe<Order_By>;
  subject_id?: InputMaybe<Order_By>;
  triple_id?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "claim". All fields are combined with a logical 'AND'. */
export type Claims_Bool_Exp = {
  _and?: InputMaybe<Array<Claims_Bool_Exp>>;
  _not?: InputMaybe<Claims_Bool_Exp>;
  _or?: InputMaybe<Array<Claims_Bool_Exp>>;
  account?: InputMaybe<Accounts_Bool_Exp>;
  account_id?: InputMaybe<String_Comparison_Exp>;
  counter_shares?: InputMaybe<Numeric_Comparison_Exp>;
  counter_vault?: InputMaybe<Vaults_Bool_Exp>;
  counter_vault_id?: InputMaybe<Numeric_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  object?: InputMaybe<Atoms_Bool_Exp>;
  object_id?: InputMaybe<Numeric_Comparison_Exp>;
  predicate?: InputMaybe<Atoms_Bool_Exp>;
  predicate_id?: InputMaybe<Numeric_Comparison_Exp>;
  shares?: InputMaybe<Numeric_Comparison_Exp>;
  subject?: InputMaybe<Atoms_Bool_Exp>;
  subject_id?: InputMaybe<Numeric_Comparison_Exp>;
  triple?: InputMaybe<Triples_Bool_Exp>;
  triple_id?: InputMaybe<Numeric_Comparison_Exp>;
  vault?: InputMaybe<Vaults_Bool_Exp>;
  vault_id?: InputMaybe<Numeric_Comparison_Exp>;
};

export type Claims_From_Following_Args = {
  address?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Claims_Max_Fields = {
  __typename?: 'claims_max_fields';
  account_id?: Maybe<Scalars['String']['output']>;
  counter_shares?: Maybe<Scalars['numeric']['output']>;
  counter_vault_id?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  object_id?: Maybe<Scalars['numeric']['output']>;
  predicate_id?: Maybe<Scalars['numeric']['output']>;
  shares?: Maybe<Scalars['numeric']['output']>;
  subject_id?: Maybe<Scalars['numeric']['output']>;
  triple_id?: Maybe<Scalars['numeric']['output']>;
  vault_id?: Maybe<Scalars['numeric']['output']>;
};

/** order by max() on columns of table "claim" */
export type Claims_Max_Order_By = {
  account_id?: InputMaybe<Order_By>;
  counter_shares?: InputMaybe<Order_By>;
  counter_vault_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  object_id?: InputMaybe<Order_By>;
  predicate_id?: InputMaybe<Order_By>;
  shares?: InputMaybe<Order_By>;
  subject_id?: InputMaybe<Order_By>;
  triple_id?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Claims_Min_Fields = {
  __typename?: 'claims_min_fields';
  account_id?: Maybe<Scalars['String']['output']>;
  counter_shares?: Maybe<Scalars['numeric']['output']>;
  counter_vault_id?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  object_id?: Maybe<Scalars['numeric']['output']>;
  predicate_id?: Maybe<Scalars['numeric']['output']>;
  shares?: Maybe<Scalars['numeric']['output']>;
  subject_id?: Maybe<Scalars['numeric']['output']>;
  triple_id?: Maybe<Scalars['numeric']['output']>;
  vault_id?: Maybe<Scalars['numeric']['output']>;
};

/** order by min() on columns of table "claim" */
export type Claims_Min_Order_By = {
  account_id?: InputMaybe<Order_By>;
  counter_shares?: InputMaybe<Order_By>;
  counter_vault_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  object_id?: InputMaybe<Order_By>;
  predicate_id?: InputMaybe<Order_By>;
  shares?: InputMaybe<Order_By>;
  subject_id?: InputMaybe<Order_By>;
  triple_id?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "claim". */
export type Claims_Order_By = {
  account?: InputMaybe<Accounts_Order_By>;
  account_id?: InputMaybe<Order_By>;
  counter_shares?: InputMaybe<Order_By>;
  counter_vault?: InputMaybe<Vaults_Order_By>;
  counter_vault_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  object?: InputMaybe<Atoms_Order_By>;
  object_id?: InputMaybe<Order_By>;
  predicate?: InputMaybe<Atoms_Order_By>;
  predicate_id?: InputMaybe<Order_By>;
  shares?: InputMaybe<Order_By>;
  subject?: InputMaybe<Atoms_Order_By>;
  subject_id?: InputMaybe<Order_By>;
  triple?: InputMaybe<Triples_Order_By>;
  triple_id?: InputMaybe<Order_By>;
  vault?: InputMaybe<Vaults_Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** select columns of table "claim" */
export type Claims_Select_Column =
  /** column name */
  | 'account_id'
  /** column name */
  | 'counter_shares'
  /** column name */
  | 'counter_vault_id'
  /** column name */
  | 'id'
  /** column name */
  | 'object_id'
  /** column name */
  | 'predicate_id'
  /** column name */
  | 'shares'
  /** column name */
  | 'subject_id'
  /** column name */
  | 'triple_id'
  /** column name */
  | 'vault_id';

/** aggregate stddev on columns */
export type Claims_Stddev_Fields = {
  __typename?: 'claims_stddev_fields';
  counter_shares?: Maybe<Scalars['Float']['output']>;
  counter_vault_id?: Maybe<Scalars['Float']['output']>;
  object_id?: Maybe<Scalars['Float']['output']>;
  predicate_id?: Maybe<Scalars['Float']['output']>;
  shares?: Maybe<Scalars['Float']['output']>;
  subject_id?: Maybe<Scalars['Float']['output']>;
  triple_id?: Maybe<Scalars['Float']['output']>;
  vault_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "claim" */
export type Claims_Stddev_Order_By = {
  counter_shares?: InputMaybe<Order_By>;
  counter_vault_id?: InputMaybe<Order_By>;
  object_id?: InputMaybe<Order_By>;
  predicate_id?: InputMaybe<Order_By>;
  shares?: InputMaybe<Order_By>;
  subject_id?: InputMaybe<Order_By>;
  triple_id?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Claims_Stddev_Pop_Fields = {
  __typename?: 'claims_stddev_pop_fields';
  counter_shares?: Maybe<Scalars['Float']['output']>;
  counter_vault_id?: Maybe<Scalars['Float']['output']>;
  object_id?: Maybe<Scalars['Float']['output']>;
  predicate_id?: Maybe<Scalars['Float']['output']>;
  shares?: Maybe<Scalars['Float']['output']>;
  subject_id?: Maybe<Scalars['Float']['output']>;
  triple_id?: Maybe<Scalars['Float']['output']>;
  vault_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "claim" */
export type Claims_Stddev_Pop_Order_By = {
  counter_shares?: InputMaybe<Order_By>;
  counter_vault_id?: InputMaybe<Order_By>;
  object_id?: InputMaybe<Order_By>;
  predicate_id?: InputMaybe<Order_By>;
  shares?: InputMaybe<Order_By>;
  subject_id?: InputMaybe<Order_By>;
  triple_id?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Claims_Stddev_Samp_Fields = {
  __typename?: 'claims_stddev_samp_fields';
  counter_shares?: Maybe<Scalars['Float']['output']>;
  counter_vault_id?: Maybe<Scalars['Float']['output']>;
  object_id?: Maybe<Scalars['Float']['output']>;
  predicate_id?: Maybe<Scalars['Float']['output']>;
  shares?: Maybe<Scalars['Float']['output']>;
  subject_id?: Maybe<Scalars['Float']['output']>;
  triple_id?: Maybe<Scalars['Float']['output']>;
  vault_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "claim" */
export type Claims_Stddev_Samp_Order_By = {
  counter_shares?: InputMaybe<Order_By>;
  counter_vault_id?: InputMaybe<Order_By>;
  object_id?: InputMaybe<Order_By>;
  predicate_id?: InputMaybe<Order_By>;
  shares?: InputMaybe<Order_By>;
  subject_id?: InputMaybe<Order_By>;
  triple_id?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "claims" */
export type Claims_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Claims_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Claims_Stream_Cursor_Value_Input = {
  account_id?: InputMaybe<Scalars['String']['input']>;
  counter_shares?: InputMaybe<Scalars['numeric']['input']>;
  counter_vault_id?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  object_id?: InputMaybe<Scalars['numeric']['input']>;
  predicate_id?: InputMaybe<Scalars['numeric']['input']>;
  shares?: InputMaybe<Scalars['numeric']['input']>;
  subject_id?: InputMaybe<Scalars['numeric']['input']>;
  triple_id?: InputMaybe<Scalars['numeric']['input']>;
  vault_id?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Claims_Sum_Fields = {
  __typename?: 'claims_sum_fields';
  counter_shares?: Maybe<Scalars['numeric']['output']>;
  counter_vault_id?: Maybe<Scalars['numeric']['output']>;
  object_id?: Maybe<Scalars['numeric']['output']>;
  predicate_id?: Maybe<Scalars['numeric']['output']>;
  shares?: Maybe<Scalars['numeric']['output']>;
  subject_id?: Maybe<Scalars['numeric']['output']>;
  triple_id?: Maybe<Scalars['numeric']['output']>;
  vault_id?: Maybe<Scalars['numeric']['output']>;
};

/** order by sum() on columns of table "claim" */
export type Claims_Sum_Order_By = {
  counter_shares?: InputMaybe<Order_By>;
  counter_vault_id?: InputMaybe<Order_By>;
  object_id?: InputMaybe<Order_By>;
  predicate_id?: InputMaybe<Order_By>;
  shares?: InputMaybe<Order_By>;
  subject_id?: InputMaybe<Order_By>;
  triple_id?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Claims_Var_Pop_Fields = {
  __typename?: 'claims_var_pop_fields';
  counter_shares?: Maybe<Scalars['Float']['output']>;
  counter_vault_id?: Maybe<Scalars['Float']['output']>;
  object_id?: Maybe<Scalars['Float']['output']>;
  predicate_id?: Maybe<Scalars['Float']['output']>;
  shares?: Maybe<Scalars['Float']['output']>;
  subject_id?: Maybe<Scalars['Float']['output']>;
  triple_id?: Maybe<Scalars['Float']['output']>;
  vault_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "claim" */
export type Claims_Var_Pop_Order_By = {
  counter_shares?: InputMaybe<Order_By>;
  counter_vault_id?: InputMaybe<Order_By>;
  object_id?: InputMaybe<Order_By>;
  predicate_id?: InputMaybe<Order_By>;
  shares?: InputMaybe<Order_By>;
  subject_id?: InputMaybe<Order_By>;
  triple_id?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Claims_Var_Samp_Fields = {
  __typename?: 'claims_var_samp_fields';
  counter_shares?: Maybe<Scalars['Float']['output']>;
  counter_vault_id?: Maybe<Scalars['Float']['output']>;
  object_id?: Maybe<Scalars['Float']['output']>;
  predicate_id?: Maybe<Scalars['Float']['output']>;
  shares?: Maybe<Scalars['Float']['output']>;
  subject_id?: Maybe<Scalars['Float']['output']>;
  triple_id?: Maybe<Scalars['Float']['output']>;
  vault_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "claim" */
export type Claims_Var_Samp_Order_By = {
  counter_shares?: InputMaybe<Order_By>;
  counter_vault_id?: InputMaybe<Order_By>;
  object_id?: InputMaybe<Order_By>;
  predicate_id?: InputMaybe<Order_By>;
  shares?: InputMaybe<Order_By>;
  subject_id?: InputMaybe<Order_By>;
  triple_id?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Claims_Variance_Fields = {
  __typename?: 'claims_variance_fields';
  counter_shares?: Maybe<Scalars['Float']['output']>;
  counter_vault_id?: Maybe<Scalars['Float']['output']>;
  object_id?: Maybe<Scalars['Float']['output']>;
  predicate_id?: Maybe<Scalars['Float']['output']>;
  shares?: Maybe<Scalars['Float']['output']>;
  subject_id?: Maybe<Scalars['Float']['output']>;
  triple_id?: Maybe<Scalars['Float']['output']>;
  vault_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "claim" */
export type Claims_Variance_Order_By = {
  counter_shares?: InputMaybe<Order_By>;
  counter_vault_id?: InputMaybe<Order_By>;
  object_id?: InputMaybe<Order_By>;
  predicate_id?: InputMaybe<Order_By>;
  shares?: InputMaybe<Order_By>;
  subject_id?: InputMaybe<Order_By>;
  triple_id?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** ordering argument of a cursor */
export type Cursor_Ordering =
  /** ascending ordering of the cursor */
  | 'ASC'
  /** descending ordering of the cursor */
  | 'DESC';

/** columns and relationships of "deposit" */
export type Deposits = {
  __typename?: 'deposits';
  block_number: Scalars['numeric']['output'];
  block_timestamp: Scalars['bigint']['output'];
  entry_fee: Scalars['numeric']['output'];
  /** An array relationship */
  events: Array<Events>;
  /** An aggregate relationship */
  events_aggregate: Events_Aggregate;
  id: Scalars['String']['output'];
  is_atom_wallet: Scalars['Boolean']['output'];
  is_triple: Scalars['Boolean']['output'];
  /** An object relationship */
  receiver: Accounts;
  receiver_id: Scalars['String']['output'];
  receiver_total_shares_in_vault: Scalars['numeric']['output'];
  /** An object relationship */
  sender?: Maybe<Accounts>;
  sender_assets_after_total_fees: Scalars['numeric']['output'];
  sender_id: Scalars['String']['output'];
  shares_for_receiver: Scalars['numeric']['output'];
  /** An array relationship */
  signals: Array<Signals>;
  /** An aggregate relationship */
  signals_aggregate: Signals_Aggregate;
  transaction_hash: Scalars['bytea']['output'];
  /** An object relationship */
  vault: Vaults;
  vault_id: Scalars['numeric']['output'];
};


/** columns and relationships of "deposit" */
export type DepositsEventsArgs = {
  distinct_on?: InputMaybe<Array<Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Events_Order_By>>;
  where?: InputMaybe<Events_Bool_Exp>;
};


/** columns and relationships of "deposit" */
export type DepositsEvents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Events_Order_By>>;
  where?: InputMaybe<Events_Bool_Exp>;
};


/** columns and relationships of "deposit" */
export type DepositsSignalsArgs = {
  distinct_on?: InputMaybe<Array<Signals_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Signals_Order_By>>;
  where?: InputMaybe<Signals_Bool_Exp>;
};


/** columns and relationships of "deposit" */
export type DepositsSignals_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Signals_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Signals_Order_By>>;
  where?: InputMaybe<Signals_Bool_Exp>;
};

/** aggregated selection of "deposit" */
export type Deposits_Aggregate = {
  __typename?: 'deposits_aggregate';
  aggregate?: Maybe<Deposits_Aggregate_Fields>;
  nodes: Array<Deposits>;
};

export type Deposits_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Deposits_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Deposits_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Deposits_Aggregate_Bool_Exp_Count>;
};

export type Deposits_Aggregate_Bool_Exp_Bool_And = {
  arguments: Deposits_Select_Column_Deposits_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Deposits_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Deposits_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Deposits_Select_Column_Deposits_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Deposits_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Deposits_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Deposits_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Deposits_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "deposit" */
export type Deposits_Aggregate_Fields = {
  __typename?: 'deposits_aggregate_fields';
  avg?: Maybe<Deposits_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Deposits_Max_Fields>;
  min?: Maybe<Deposits_Min_Fields>;
  stddev?: Maybe<Deposits_Stddev_Fields>;
  stddev_pop?: Maybe<Deposits_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Deposits_Stddev_Samp_Fields>;
  sum?: Maybe<Deposits_Sum_Fields>;
  var_pop?: Maybe<Deposits_Var_Pop_Fields>;
  var_samp?: Maybe<Deposits_Var_Samp_Fields>;
  variance?: Maybe<Deposits_Variance_Fields>;
};


/** aggregate fields of "deposit" */
export type Deposits_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Deposits_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "deposit" */
export type Deposits_Aggregate_Order_By = {
  avg?: InputMaybe<Deposits_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Deposits_Max_Order_By>;
  min?: InputMaybe<Deposits_Min_Order_By>;
  stddev?: InputMaybe<Deposits_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Deposits_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Deposits_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Deposits_Sum_Order_By>;
  var_pop?: InputMaybe<Deposits_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Deposits_Var_Samp_Order_By>;
  variance?: InputMaybe<Deposits_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Deposits_Avg_Fields = {
  __typename?: 'deposits_avg_fields';
  block_number?: Maybe<Scalars['Float']['output']>;
  block_timestamp?: Maybe<Scalars['Float']['output']>;
  entry_fee?: Maybe<Scalars['Float']['output']>;
  receiver_total_shares_in_vault?: Maybe<Scalars['Float']['output']>;
  sender_assets_after_total_fees?: Maybe<Scalars['Float']['output']>;
  shares_for_receiver?: Maybe<Scalars['Float']['output']>;
  vault_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "deposit" */
export type Deposits_Avg_Order_By = {
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  entry_fee?: InputMaybe<Order_By>;
  receiver_total_shares_in_vault?: InputMaybe<Order_By>;
  sender_assets_after_total_fees?: InputMaybe<Order_By>;
  shares_for_receiver?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "deposit". All fields are combined with a logical 'AND'. */
export type Deposits_Bool_Exp = {
  _and?: InputMaybe<Array<Deposits_Bool_Exp>>;
  _not?: InputMaybe<Deposits_Bool_Exp>;
  _or?: InputMaybe<Array<Deposits_Bool_Exp>>;
  block_number?: InputMaybe<Numeric_Comparison_Exp>;
  block_timestamp?: InputMaybe<Bigint_Comparison_Exp>;
  entry_fee?: InputMaybe<Numeric_Comparison_Exp>;
  events?: InputMaybe<Events_Bool_Exp>;
  events_aggregate?: InputMaybe<Events_Aggregate_Bool_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  is_atom_wallet?: InputMaybe<Boolean_Comparison_Exp>;
  is_triple?: InputMaybe<Boolean_Comparison_Exp>;
  receiver?: InputMaybe<Accounts_Bool_Exp>;
  receiver_id?: InputMaybe<String_Comparison_Exp>;
  receiver_total_shares_in_vault?: InputMaybe<Numeric_Comparison_Exp>;
  sender?: InputMaybe<Accounts_Bool_Exp>;
  sender_assets_after_total_fees?: InputMaybe<Numeric_Comparison_Exp>;
  sender_id?: InputMaybe<String_Comparison_Exp>;
  shares_for_receiver?: InputMaybe<Numeric_Comparison_Exp>;
  signals?: InputMaybe<Signals_Bool_Exp>;
  signals_aggregate?: InputMaybe<Signals_Aggregate_Bool_Exp>;
  transaction_hash?: InputMaybe<Bytea_Comparison_Exp>;
  vault?: InputMaybe<Vaults_Bool_Exp>;
  vault_id?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Deposits_Max_Fields = {
  __typename?: 'deposits_max_fields';
  block_number?: Maybe<Scalars['numeric']['output']>;
  block_timestamp?: Maybe<Scalars['bigint']['output']>;
  entry_fee?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  receiver_id?: Maybe<Scalars['String']['output']>;
  receiver_total_shares_in_vault?: Maybe<Scalars['numeric']['output']>;
  sender_assets_after_total_fees?: Maybe<Scalars['numeric']['output']>;
  sender_id?: Maybe<Scalars['String']['output']>;
  shares_for_receiver?: Maybe<Scalars['numeric']['output']>;
  vault_id?: Maybe<Scalars['numeric']['output']>;
};

/** order by max() on columns of table "deposit" */
export type Deposits_Max_Order_By = {
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  entry_fee?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  receiver_id?: InputMaybe<Order_By>;
  receiver_total_shares_in_vault?: InputMaybe<Order_By>;
  sender_assets_after_total_fees?: InputMaybe<Order_By>;
  sender_id?: InputMaybe<Order_By>;
  shares_for_receiver?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Deposits_Min_Fields = {
  __typename?: 'deposits_min_fields';
  block_number?: Maybe<Scalars['numeric']['output']>;
  block_timestamp?: Maybe<Scalars['bigint']['output']>;
  entry_fee?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  receiver_id?: Maybe<Scalars['String']['output']>;
  receiver_total_shares_in_vault?: Maybe<Scalars['numeric']['output']>;
  sender_assets_after_total_fees?: Maybe<Scalars['numeric']['output']>;
  sender_id?: Maybe<Scalars['String']['output']>;
  shares_for_receiver?: Maybe<Scalars['numeric']['output']>;
  vault_id?: Maybe<Scalars['numeric']['output']>;
};

/** order by min() on columns of table "deposit" */
export type Deposits_Min_Order_By = {
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  entry_fee?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  receiver_id?: InputMaybe<Order_By>;
  receiver_total_shares_in_vault?: InputMaybe<Order_By>;
  sender_assets_after_total_fees?: InputMaybe<Order_By>;
  sender_id?: InputMaybe<Order_By>;
  shares_for_receiver?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "deposit". */
export type Deposits_Order_By = {
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  entry_fee?: InputMaybe<Order_By>;
  events_aggregate?: InputMaybe<Events_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  is_atom_wallet?: InputMaybe<Order_By>;
  is_triple?: InputMaybe<Order_By>;
  receiver?: InputMaybe<Accounts_Order_By>;
  receiver_id?: InputMaybe<Order_By>;
  receiver_total_shares_in_vault?: InputMaybe<Order_By>;
  sender?: InputMaybe<Accounts_Order_By>;
  sender_assets_after_total_fees?: InputMaybe<Order_By>;
  sender_id?: InputMaybe<Order_By>;
  shares_for_receiver?: InputMaybe<Order_By>;
  signals_aggregate?: InputMaybe<Signals_Aggregate_Order_By>;
  transaction_hash?: InputMaybe<Order_By>;
  vault?: InputMaybe<Vaults_Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** select columns of table "deposit" */
export type Deposits_Select_Column =
  /** column name */
  | 'block_number'
  /** column name */
  | 'block_timestamp'
  /** column name */
  | 'entry_fee'
  /** column name */
  | 'id'
  /** column name */
  | 'is_atom_wallet'
  /** column name */
  | 'is_triple'
  /** column name */
  | 'receiver_id'
  /** column name */
  | 'receiver_total_shares_in_vault'
  /** column name */
  | 'sender_assets_after_total_fees'
  /** column name */
  | 'sender_id'
  /** column name */
  | 'shares_for_receiver'
  /** column name */
  | 'transaction_hash'
  /** column name */
  | 'vault_id';

/** select "deposits_aggregate_bool_exp_bool_and_arguments_columns" columns of table "deposit" */
export type Deposits_Select_Column_Deposits_Aggregate_Bool_Exp_Bool_And_Arguments_Columns =
  /** column name */
  | 'is_atom_wallet'
  /** column name */
  | 'is_triple';

/** select "deposits_aggregate_bool_exp_bool_or_arguments_columns" columns of table "deposit" */
export type Deposits_Select_Column_Deposits_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns =
  /** column name */
  | 'is_atom_wallet'
  /** column name */
  | 'is_triple';

/** aggregate stddev on columns */
export type Deposits_Stddev_Fields = {
  __typename?: 'deposits_stddev_fields';
  block_number?: Maybe<Scalars['Float']['output']>;
  block_timestamp?: Maybe<Scalars['Float']['output']>;
  entry_fee?: Maybe<Scalars['Float']['output']>;
  receiver_total_shares_in_vault?: Maybe<Scalars['Float']['output']>;
  sender_assets_after_total_fees?: Maybe<Scalars['Float']['output']>;
  shares_for_receiver?: Maybe<Scalars['Float']['output']>;
  vault_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "deposit" */
export type Deposits_Stddev_Order_By = {
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  entry_fee?: InputMaybe<Order_By>;
  receiver_total_shares_in_vault?: InputMaybe<Order_By>;
  sender_assets_after_total_fees?: InputMaybe<Order_By>;
  shares_for_receiver?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Deposits_Stddev_Pop_Fields = {
  __typename?: 'deposits_stddev_pop_fields';
  block_number?: Maybe<Scalars['Float']['output']>;
  block_timestamp?: Maybe<Scalars['Float']['output']>;
  entry_fee?: Maybe<Scalars['Float']['output']>;
  receiver_total_shares_in_vault?: Maybe<Scalars['Float']['output']>;
  sender_assets_after_total_fees?: Maybe<Scalars['Float']['output']>;
  shares_for_receiver?: Maybe<Scalars['Float']['output']>;
  vault_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "deposit" */
export type Deposits_Stddev_Pop_Order_By = {
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  entry_fee?: InputMaybe<Order_By>;
  receiver_total_shares_in_vault?: InputMaybe<Order_By>;
  sender_assets_after_total_fees?: InputMaybe<Order_By>;
  shares_for_receiver?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Deposits_Stddev_Samp_Fields = {
  __typename?: 'deposits_stddev_samp_fields';
  block_number?: Maybe<Scalars['Float']['output']>;
  block_timestamp?: Maybe<Scalars['Float']['output']>;
  entry_fee?: Maybe<Scalars['Float']['output']>;
  receiver_total_shares_in_vault?: Maybe<Scalars['Float']['output']>;
  sender_assets_after_total_fees?: Maybe<Scalars['Float']['output']>;
  shares_for_receiver?: Maybe<Scalars['Float']['output']>;
  vault_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "deposit" */
export type Deposits_Stddev_Samp_Order_By = {
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  entry_fee?: InputMaybe<Order_By>;
  receiver_total_shares_in_vault?: InputMaybe<Order_By>;
  sender_assets_after_total_fees?: InputMaybe<Order_By>;
  shares_for_receiver?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "deposits" */
export type Deposits_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Deposits_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Deposits_Stream_Cursor_Value_Input = {
  block_number?: InputMaybe<Scalars['numeric']['input']>;
  block_timestamp?: InputMaybe<Scalars['bigint']['input']>;
  entry_fee?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  is_atom_wallet?: InputMaybe<Scalars['Boolean']['input']>;
  is_triple?: InputMaybe<Scalars['Boolean']['input']>;
  receiver_id?: InputMaybe<Scalars['String']['input']>;
  receiver_total_shares_in_vault?: InputMaybe<Scalars['numeric']['input']>;
  sender_assets_after_total_fees?: InputMaybe<Scalars['numeric']['input']>;
  sender_id?: InputMaybe<Scalars['String']['input']>;
  shares_for_receiver?: InputMaybe<Scalars['numeric']['input']>;
  transaction_hash?: InputMaybe<Scalars['bytea']['input']>;
  vault_id?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Deposits_Sum_Fields = {
  __typename?: 'deposits_sum_fields';
  block_number?: Maybe<Scalars['numeric']['output']>;
  block_timestamp?: Maybe<Scalars['bigint']['output']>;
  entry_fee?: Maybe<Scalars['numeric']['output']>;
  receiver_total_shares_in_vault?: Maybe<Scalars['numeric']['output']>;
  sender_assets_after_total_fees?: Maybe<Scalars['numeric']['output']>;
  shares_for_receiver?: Maybe<Scalars['numeric']['output']>;
  vault_id?: Maybe<Scalars['numeric']['output']>;
};

/** order by sum() on columns of table "deposit" */
export type Deposits_Sum_Order_By = {
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  entry_fee?: InputMaybe<Order_By>;
  receiver_total_shares_in_vault?: InputMaybe<Order_By>;
  sender_assets_after_total_fees?: InputMaybe<Order_By>;
  shares_for_receiver?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Deposits_Var_Pop_Fields = {
  __typename?: 'deposits_var_pop_fields';
  block_number?: Maybe<Scalars['Float']['output']>;
  block_timestamp?: Maybe<Scalars['Float']['output']>;
  entry_fee?: Maybe<Scalars['Float']['output']>;
  receiver_total_shares_in_vault?: Maybe<Scalars['Float']['output']>;
  sender_assets_after_total_fees?: Maybe<Scalars['Float']['output']>;
  shares_for_receiver?: Maybe<Scalars['Float']['output']>;
  vault_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "deposit" */
export type Deposits_Var_Pop_Order_By = {
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  entry_fee?: InputMaybe<Order_By>;
  receiver_total_shares_in_vault?: InputMaybe<Order_By>;
  sender_assets_after_total_fees?: InputMaybe<Order_By>;
  shares_for_receiver?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Deposits_Var_Samp_Fields = {
  __typename?: 'deposits_var_samp_fields';
  block_number?: Maybe<Scalars['Float']['output']>;
  block_timestamp?: Maybe<Scalars['Float']['output']>;
  entry_fee?: Maybe<Scalars['Float']['output']>;
  receiver_total_shares_in_vault?: Maybe<Scalars['Float']['output']>;
  sender_assets_after_total_fees?: Maybe<Scalars['Float']['output']>;
  shares_for_receiver?: Maybe<Scalars['Float']['output']>;
  vault_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "deposit" */
export type Deposits_Var_Samp_Order_By = {
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  entry_fee?: InputMaybe<Order_By>;
  receiver_total_shares_in_vault?: InputMaybe<Order_By>;
  sender_assets_after_total_fees?: InputMaybe<Order_By>;
  shares_for_receiver?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Deposits_Variance_Fields = {
  __typename?: 'deposits_variance_fields';
  block_number?: Maybe<Scalars['Float']['output']>;
  block_timestamp?: Maybe<Scalars['Float']['output']>;
  entry_fee?: Maybe<Scalars['Float']['output']>;
  receiver_total_shares_in_vault?: Maybe<Scalars['Float']['output']>;
  sender_assets_after_total_fees?: Maybe<Scalars['Float']['output']>;
  shares_for_receiver?: Maybe<Scalars['Float']['output']>;
  vault_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "deposit" */
export type Deposits_Variance_Order_By = {
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  entry_fee?: InputMaybe<Order_By>;
  receiver_total_shares_in_vault?: InputMaybe<Order_By>;
  sender_assets_after_total_fees?: InputMaybe<Order_By>;
  shares_for_receiver?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** Boolean expression to compare columns of type "event_type". All fields are combined with logical 'AND'. */
export type Event_Type_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['event_type']['input']>;
  _gt?: InputMaybe<Scalars['event_type']['input']>;
  _gte?: InputMaybe<Scalars['event_type']['input']>;
  _in?: InputMaybe<Array<Scalars['event_type']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['event_type']['input']>;
  _lte?: InputMaybe<Scalars['event_type']['input']>;
  _neq?: InputMaybe<Scalars['event_type']['input']>;
  _nin?: InputMaybe<Array<Scalars['event_type']['input']>>;
};

/** columns and relationships of "event" */
export type Events = {
  __typename?: 'events';
  /** An object relationship */
  atom?: Maybe<Atoms>;
  atom_id?: Maybe<Scalars['numeric']['output']>;
  block_number: Scalars['numeric']['output'];
  block_timestamp: Scalars['bigint']['output'];
  /** An object relationship */
  deposit?: Maybe<Deposits>;
  deposit_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  fee_transfer?: Maybe<Fee_Transfers>;
  fee_transfer_id?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  /** An object relationship */
  redemption?: Maybe<Redemptions>;
  redemption_id?: Maybe<Scalars['String']['output']>;
  transaction_hash: Scalars['bytea']['output'];
  /** An object relationship */
  triple?: Maybe<Triples>;
  triple_id?: Maybe<Scalars['numeric']['output']>;
  type: Scalars['event_type']['output'];
};

/** aggregated selection of "event" */
export type Events_Aggregate = {
  __typename?: 'events_aggregate';
  aggregate?: Maybe<Events_Aggregate_Fields>;
  nodes: Array<Events>;
};

export type Events_Aggregate_Bool_Exp = {
  count?: InputMaybe<Events_Aggregate_Bool_Exp_Count>;
};

export type Events_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Events_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Events_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "event" */
export type Events_Aggregate_Fields = {
  __typename?: 'events_aggregate_fields';
  avg?: Maybe<Events_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Events_Max_Fields>;
  min?: Maybe<Events_Min_Fields>;
  stddev?: Maybe<Events_Stddev_Fields>;
  stddev_pop?: Maybe<Events_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Events_Stddev_Samp_Fields>;
  sum?: Maybe<Events_Sum_Fields>;
  var_pop?: Maybe<Events_Var_Pop_Fields>;
  var_samp?: Maybe<Events_Var_Samp_Fields>;
  variance?: Maybe<Events_Variance_Fields>;
};


/** aggregate fields of "event" */
export type Events_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Events_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "event" */
export type Events_Aggregate_Order_By = {
  avg?: InputMaybe<Events_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Events_Max_Order_By>;
  min?: InputMaybe<Events_Min_Order_By>;
  stddev?: InputMaybe<Events_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Events_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Events_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Events_Sum_Order_By>;
  var_pop?: InputMaybe<Events_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Events_Var_Samp_Order_By>;
  variance?: InputMaybe<Events_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Events_Avg_Fields = {
  __typename?: 'events_avg_fields';
  atom_id?: Maybe<Scalars['Float']['output']>;
  block_number?: Maybe<Scalars['Float']['output']>;
  block_timestamp?: Maybe<Scalars['Float']['output']>;
  triple_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "event" */
export type Events_Avg_Order_By = {
  atom_id?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  triple_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "event". All fields are combined with a logical 'AND'. */
export type Events_Bool_Exp = {
  _and?: InputMaybe<Array<Events_Bool_Exp>>;
  _not?: InputMaybe<Events_Bool_Exp>;
  _or?: InputMaybe<Array<Events_Bool_Exp>>;
  atom?: InputMaybe<Atoms_Bool_Exp>;
  atom_id?: InputMaybe<Numeric_Comparison_Exp>;
  block_number?: InputMaybe<Numeric_Comparison_Exp>;
  block_timestamp?: InputMaybe<Bigint_Comparison_Exp>;
  deposit?: InputMaybe<Deposits_Bool_Exp>;
  deposit_id?: InputMaybe<String_Comparison_Exp>;
  fee_transfer?: InputMaybe<Fee_Transfers_Bool_Exp>;
  fee_transfer_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  redemption?: InputMaybe<Redemptions_Bool_Exp>;
  redemption_id?: InputMaybe<String_Comparison_Exp>;
  transaction_hash?: InputMaybe<Bytea_Comparison_Exp>;
  triple?: InputMaybe<Triples_Bool_Exp>;
  triple_id?: InputMaybe<Numeric_Comparison_Exp>;
  type?: InputMaybe<Event_Type_Comparison_Exp>;
};

/** aggregate max on columns */
export type Events_Max_Fields = {
  __typename?: 'events_max_fields';
  atom_id?: Maybe<Scalars['numeric']['output']>;
  block_number?: Maybe<Scalars['numeric']['output']>;
  block_timestamp?: Maybe<Scalars['bigint']['output']>;
  deposit_id?: Maybe<Scalars['String']['output']>;
  fee_transfer_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  redemption_id?: Maybe<Scalars['String']['output']>;
  triple_id?: Maybe<Scalars['numeric']['output']>;
  type?: Maybe<Scalars['event_type']['output']>;
};

/** order by max() on columns of table "event" */
export type Events_Max_Order_By = {
  atom_id?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  deposit_id?: InputMaybe<Order_By>;
  fee_transfer_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  redemption_id?: InputMaybe<Order_By>;
  triple_id?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Events_Min_Fields = {
  __typename?: 'events_min_fields';
  atom_id?: Maybe<Scalars['numeric']['output']>;
  block_number?: Maybe<Scalars['numeric']['output']>;
  block_timestamp?: Maybe<Scalars['bigint']['output']>;
  deposit_id?: Maybe<Scalars['String']['output']>;
  fee_transfer_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  redemption_id?: Maybe<Scalars['String']['output']>;
  triple_id?: Maybe<Scalars['numeric']['output']>;
  type?: Maybe<Scalars['event_type']['output']>;
};

/** order by min() on columns of table "event" */
export type Events_Min_Order_By = {
  atom_id?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  deposit_id?: InputMaybe<Order_By>;
  fee_transfer_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  redemption_id?: InputMaybe<Order_By>;
  triple_id?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "event". */
export type Events_Order_By = {
  atom?: InputMaybe<Atoms_Order_By>;
  atom_id?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  deposit?: InputMaybe<Deposits_Order_By>;
  deposit_id?: InputMaybe<Order_By>;
  fee_transfer?: InputMaybe<Fee_Transfers_Order_By>;
  fee_transfer_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  redemption?: InputMaybe<Redemptions_Order_By>;
  redemption_id?: InputMaybe<Order_By>;
  transaction_hash?: InputMaybe<Order_By>;
  triple?: InputMaybe<Triples_Order_By>;
  triple_id?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
};

/** select columns of table "event" */
export type Events_Select_Column =
  /** column name */
  | 'atom_id'
  /** column name */
  | 'block_number'
  /** column name */
  | 'block_timestamp'
  /** column name */
  | 'deposit_id'
  /** column name */
  | 'fee_transfer_id'
  /** column name */
  | 'id'
  /** column name */
  | 'redemption_id'
  /** column name */
  | 'transaction_hash'
  /** column name */
  | 'triple_id'
  /** column name */
  | 'type';

/** aggregate stddev on columns */
export type Events_Stddev_Fields = {
  __typename?: 'events_stddev_fields';
  atom_id?: Maybe<Scalars['Float']['output']>;
  block_number?: Maybe<Scalars['Float']['output']>;
  block_timestamp?: Maybe<Scalars['Float']['output']>;
  triple_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "event" */
export type Events_Stddev_Order_By = {
  atom_id?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  triple_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Events_Stddev_Pop_Fields = {
  __typename?: 'events_stddev_pop_fields';
  atom_id?: Maybe<Scalars['Float']['output']>;
  block_number?: Maybe<Scalars['Float']['output']>;
  block_timestamp?: Maybe<Scalars['Float']['output']>;
  triple_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "event" */
export type Events_Stddev_Pop_Order_By = {
  atom_id?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  triple_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Events_Stddev_Samp_Fields = {
  __typename?: 'events_stddev_samp_fields';
  atom_id?: Maybe<Scalars['Float']['output']>;
  block_number?: Maybe<Scalars['Float']['output']>;
  block_timestamp?: Maybe<Scalars['Float']['output']>;
  triple_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "event" */
export type Events_Stddev_Samp_Order_By = {
  atom_id?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  triple_id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "events" */
export type Events_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Events_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Events_Stream_Cursor_Value_Input = {
  atom_id?: InputMaybe<Scalars['numeric']['input']>;
  block_number?: InputMaybe<Scalars['numeric']['input']>;
  block_timestamp?: InputMaybe<Scalars['bigint']['input']>;
  deposit_id?: InputMaybe<Scalars['String']['input']>;
  fee_transfer_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  redemption_id?: InputMaybe<Scalars['String']['input']>;
  transaction_hash?: InputMaybe<Scalars['bytea']['input']>;
  triple_id?: InputMaybe<Scalars['numeric']['input']>;
  type?: InputMaybe<Scalars['event_type']['input']>;
};

/** aggregate sum on columns */
export type Events_Sum_Fields = {
  __typename?: 'events_sum_fields';
  atom_id?: Maybe<Scalars['numeric']['output']>;
  block_number?: Maybe<Scalars['numeric']['output']>;
  block_timestamp?: Maybe<Scalars['bigint']['output']>;
  triple_id?: Maybe<Scalars['numeric']['output']>;
};

/** order by sum() on columns of table "event" */
export type Events_Sum_Order_By = {
  atom_id?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  triple_id?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Events_Var_Pop_Fields = {
  __typename?: 'events_var_pop_fields';
  atom_id?: Maybe<Scalars['Float']['output']>;
  block_number?: Maybe<Scalars['Float']['output']>;
  block_timestamp?: Maybe<Scalars['Float']['output']>;
  triple_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "event" */
export type Events_Var_Pop_Order_By = {
  atom_id?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  triple_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Events_Var_Samp_Fields = {
  __typename?: 'events_var_samp_fields';
  atom_id?: Maybe<Scalars['Float']['output']>;
  block_number?: Maybe<Scalars['Float']['output']>;
  block_timestamp?: Maybe<Scalars['Float']['output']>;
  triple_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "event" */
export type Events_Var_Samp_Order_By = {
  atom_id?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  triple_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Events_Variance_Fields = {
  __typename?: 'events_variance_fields';
  atom_id?: Maybe<Scalars['Float']['output']>;
  block_number?: Maybe<Scalars['Float']['output']>;
  block_timestamp?: Maybe<Scalars['Float']['output']>;
  triple_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "event" */
export type Events_Variance_Order_By = {
  atom_id?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  triple_id?: InputMaybe<Order_By>;
};

/** columns and relationships of "fee_transfer" */
export type Fee_Transfers = {
  __typename?: 'fee_transfers';
  amount: Scalars['numeric']['output'];
  block_number: Scalars['numeric']['output'];
  block_timestamp: Scalars['bigint']['output'];
  /** An array relationship */
  events: Array<Events>;
  /** An aggregate relationship */
  events_aggregate: Events_Aggregate;
  id: Scalars['String']['output'];
  /** An object relationship */
  receiver: Accounts;
  receiver_id: Scalars['String']['output'];
  /** An object relationship */
  sender?: Maybe<Accounts>;
  sender_id: Scalars['String']['output'];
  transaction_hash: Scalars['bytea']['output'];
};


/** columns and relationships of "fee_transfer" */
export type Fee_TransfersEventsArgs = {
  distinct_on?: InputMaybe<Array<Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Events_Order_By>>;
  where?: InputMaybe<Events_Bool_Exp>;
};


/** columns and relationships of "fee_transfer" */
export type Fee_TransfersEvents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Events_Order_By>>;
  where?: InputMaybe<Events_Bool_Exp>;
};

/** aggregated selection of "fee_transfer" */
export type Fee_Transfers_Aggregate = {
  __typename?: 'fee_transfers_aggregate';
  aggregate?: Maybe<Fee_Transfers_Aggregate_Fields>;
  nodes: Array<Fee_Transfers>;
};

export type Fee_Transfers_Aggregate_Bool_Exp = {
  count?: InputMaybe<Fee_Transfers_Aggregate_Bool_Exp_Count>;
};

export type Fee_Transfers_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Fee_Transfers_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Fee_Transfers_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "fee_transfer" */
export type Fee_Transfers_Aggregate_Fields = {
  __typename?: 'fee_transfers_aggregate_fields';
  avg?: Maybe<Fee_Transfers_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Fee_Transfers_Max_Fields>;
  min?: Maybe<Fee_Transfers_Min_Fields>;
  stddev?: Maybe<Fee_Transfers_Stddev_Fields>;
  stddev_pop?: Maybe<Fee_Transfers_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Fee_Transfers_Stddev_Samp_Fields>;
  sum?: Maybe<Fee_Transfers_Sum_Fields>;
  var_pop?: Maybe<Fee_Transfers_Var_Pop_Fields>;
  var_samp?: Maybe<Fee_Transfers_Var_Samp_Fields>;
  variance?: Maybe<Fee_Transfers_Variance_Fields>;
};


/** aggregate fields of "fee_transfer" */
export type Fee_Transfers_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Fee_Transfers_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "fee_transfer" */
export type Fee_Transfers_Aggregate_Order_By = {
  avg?: InputMaybe<Fee_Transfers_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Fee_Transfers_Max_Order_By>;
  min?: InputMaybe<Fee_Transfers_Min_Order_By>;
  stddev?: InputMaybe<Fee_Transfers_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Fee_Transfers_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Fee_Transfers_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Fee_Transfers_Sum_Order_By>;
  var_pop?: InputMaybe<Fee_Transfers_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Fee_Transfers_Var_Samp_Order_By>;
  variance?: InputMaybe<Fee_Transfers_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Fee_Transfers_Avg_Fields = {
  __typename?: 'fee_transfers_avg_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  block_number?: Maybe<Scalars['Float']['output']>;
  block_timestamp?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "fee_transfer" */
export type Fee_Transfers_Avg_Order_By = {
  amount?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "fee_transfer". All fields are combined with a logical 'AND'. */
export type Fee_Transfers_Bool_Exp = {
  _and?: InputMaybe<Array<Fee_Transfers_Bool_Exp>>;
  _not?: InputMaybe<Fee_Transfers_Bool_Exp>;
  _or?: InputMaybe<Array<Fee_Transfers_Bool_Exp>>;
  amount?: InputMaybe<Numeric_Comparison_Exp>;
  block_number?: InputMaybe<Numeric_Comparison_Exp>;
  block_timestamp?: InputMaybe<Bigint_Comparison_Exp>;
  events?: InputMaybe<Events_Bool_Exp>;
  events_aggregate?: InputMaybe<Events_Aggregate_Bool_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  receiver?: InputMaybe<Accounts_Bool_Exp>;
  receiver_id?: InputMaybe<String_Comparison_Exp>;
  sender?: InputMaybe<Accounts_Bool_Exp>;
  sender_id?: InputMaybe<String_Comparison_Exp>;
  transaction_hash?: InputMaybe<Bytea_Comparison_Exp>;
};

/** aggregate max on columns */
export type Fee_Transfers_Max_Fields = {
  __typename?: 'fee_transfers_max_fields';
  amount?: Maybe<Scalars['numeric']['output']>;
  block_number?: Maybe<Scalars['numeric']['output']>;
  block_timestamp?: Maybe<Scalars['bigint']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  receiver_id?: Maybe<Scalars['String']['output']>;
  sender_id?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "fee_transfer" */
export type Fee_Transfers_Max_Order_By = {
  amount?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  receiver_id?: InputMaybe<Order_By>;
  sender_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Fee_Transfers_Min_Fields = {
  __typename?: 'fee_transfers_min_fields';
  amount?: Maybe<Scalars['numeric']['output']>;
  block_number?: Maybe<Scalars['numeric']['output']>;
  block_timestamp?: Maybe<Scalars['bigint']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  receiver_id?: Maybe<Scalars['String']['output']>;
  sender_id?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "fee_transfer" */
export type Fee_Transfers_Min_Order_By = {
  amount?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  receiver_id?: InputMaybe<Order_By>;
  sender_id?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "fee_transfer". */
export type Fee_Transfers_Order_By = {
  amount?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  events_aggregate?: InputMaybe<Events_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  receiver?: InputMaybe<Accounts_Order_By>;
  receiver_id?: InputMaybe<Order_By>;
  sender?: InputMaybe<Accounts_Order_By>;
  sender_id?: InputMaybe<Order_By>;
  transaction_hash?: InputMaybe<Order_By>;
};

/** select columns of table "fee_transfer" */
export type Fee_Transfers_Select_Column =
  /** column name */
  | 'amount'
  /** column name */
  | 'block_number'
  /** column name */
  | 'block_timestamp'
  /** column name */
  | 'id'
  /** column name */
  | 'receiver_id'
  /** column name */
  | 'sender_id'
  /** column name */
  | 'transaction_hash';

/** aggregate stddev on columns */
export type Fee_Transfers_Stddev_Fields = {
  __typename?: 'fee_transfers_stddev_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  block_number?: Maybe<Scalars['Float']['output']>;
  block_timestamp?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "fee_transfer" */
export type Fee_Transfers_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Fee_Transfers_Stddev_Pop_Fields = {
  __typename?: 'fee_transfers_stddev_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  block_number?: Maybe<Scalars['Float']['output']>;
  block_timestamp?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "fee_transfer" */
export type Fee_Transfers_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Fee_Transfers_Stddev_Samp_Fields = {
  __typename?: 'fee_transfers_stddev_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  block_number?: Maybe<Scalars['Float']['output']>;
  block_timestamp?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "fee_transfer" */
export type Fee_Transfers_Stddev_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "fee_transfers" */
export type Fee_Transfers_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Fee_Transfers_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Fee_Transfers_Stream_Cursor_Value_Input = {
  amount?: InputMaybe<Scalars['numeric']['input']>;
  block_number?: InputMaybe<Scalars['numeric']['input']>;
  block_timestamp?: InputMaybe<Scalars['bigint']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  receiver_id?: InputMaybe<Scalars['String']['input']>;
  sender_id?: InputMaybe<Scalars['String']['input']>;
  transaction_hash?: InputMaybe<Scalars['bytea']['input']>;
};

/** aggregate sum on columns */
export type Fee_Transfers_Sum_Fields = {
  __typename?: 'fee_transfers_sum_fields';
  amount?: Maybe<Scalars['numeric']['output']>;
  block_number?: Maybe<Scalars['numeric']['output']>;
  block_timestamp?: Maybe<Scalars['bigint']['output']>;
};

/** order by sum() on columns of table "fee_transfer" */
export type Fee_Transfers_Sum_Order_By = {
  amount?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Fee_Transfers_Var_Pop_Fields = {
  __typename?: 'fee_transfers_var_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  block_number?: Maybe<Scalars['Float']['output']>;
  block_timestamp?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "fee_transfer" */
export type Fee_Transfers_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Fee_Transfers_Var_Samp_Fields = {
  __typename?: 'fee_transfers_var_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  block_number?: Maybe<Scalars['Float']['output']>;
  block_timestamp?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "fee_transfer" */
export type Fee_Transfers_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Fee_Transfers_Variance_Fields = {
  __typename?: 'fee_transfers_variance_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  block_number?: Maybe<Scalars['Float']['output']>;
  block_timestamp?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "fee_transfer" */
export type Fee_Transfers_Variance_Order_By = {
  amount?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
};

/** Boolean expression to compare columns of type "float8". All fields are combined with logical 'AND'. */
export type Float8_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['float8']['input']>;
  _gt?: InputMaybe<Scalars['float8']['input']>;
  _gte?: InputMaybe<Scalars['float8']['input']>;
  _in?: InputMaybe<Array<Scalars['float8']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['float8']['input']>;
  _lte?: InputMaybe<Scalars['float8']['input']>;
  _neq?: InputMaybe<Scalars['float8']['input']>;
  _nin?: InputMaybe<Array<Scalars['float8']['input']>>;
};

export type Following_Args = {
  address?: InputMaybe<Scalars['String']['input']>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** Uploads and pins Organization to IPFS */
  pinOrganization?: Maybe<PinOutput>;
  /** Uploads and pins Person to IPFS */
  pinPerson?: Maybe<PinOutput>;
  /** Uploads and pins Thing to IPFS */
  pinThing?: Maybe<PinOutput>;
};


/** mutation root */
export type Mutation_RootPinOrganizationArgs = {
  organization: PinOrganizationInput;
};


/** mutation root */
export type Mutation_RootPinPersonArgs = {
  person: PinPersonInput;
};


/** mutation root */
export type Mutation_RootPinThingArgs = {
  thing: PinThingInput;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['numeric']['input']>;
  _gt?: InputMaybe<Scalars['numeric']['input']>;
  _gte?: InputMaybe<Scalars['numeric']['input']>;
  _in?: InputMaybe<Array<Scalars['numeric']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['numeric']['input']>;
  _lte?: InputMaybe<Scalars['numeric']['input']>;
  _neq?: InputMaybe<Scalars['numeric']['input']>;
  _nin?: InputMaybe<Array<Scalars['numeric']['input']>>;
};

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
  | 'desc_nulls_last';

/** columns and relationships of "organization" */
export type Organizations = {
  __typename?: 'organizations';
  /** An object relationship */
  atom?: Maybe<Atoms>;
  description?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['numeric']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

/** aggregated selection of "organization" */
export type Organizations_Aggregate = {
  __typename?: 'organizations_aggregate';
  aggregate?: Maybe<Organizations_Aggregate_Fields>;
  nodes: Array<Organizations>;
};

/** aggregate fields of "organization" */
export type Organizations_Aggregate_Fields = {
  __typename?: 'organizations_aggregate_fields';
  avg?: Maybe<Organizations_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Organizations_Max_Fields>;
  min?: Maybe<Organizations_Min_Fields>;
  stddev?: Maybe<Organizations_Stddev_Fields>;
  stddev_pop?: Maybe<Organizations_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Organizations_Stddev_Samp_Fields>;
  sum?: Maybe<Organizations_Sum_Fields>;
  var_pop?: Maybe<Organizations_Var_Pop_Fields>;
  var_samp?: Maybe<Organizations_Var_Samp_Fields>;
  variance?: Maybe<Organizations_Variance_Fields>;
};


/** aggregate fields of "organization" */
export type Organizations_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Organizations_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Organizations_Avg_Fields = {
  __typename?: 'organizations_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "organization". All fields are combined with a logical 'AND'. */
export type Organizations_Bool_Exp = {
  _and?: InputMaybe<Array<Organizations_Bool_Exp>>;
  _not?: InputMaybe<Organizations_Bool_Exp>;
  _or?: InputMaybe<Array<Organizations_Bool_Exp>>;
  atom?: InputMaybe<Atoms_Bool_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Numeric_Comparison_Exp>;
  image?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  url?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Organizations_Max_Fields = {
  __typename?: 'organizations_max_fields';
  description?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['numeric']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Organizations_Min_Fields = {
  __typename?: 'organizations_min_fields';
  description?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['numeric']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

/** Ordering options when selecting data from "organization". */
export type Organizations_Order_By = {
  atom?: InputMaybe<Atoms_Order_By>;
  description?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  url?: InputMaybe<Order_By>;
};

/** select columns of table "organization" */
export type Organizations_Select_Column =
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
  | 'url';

/** aggregate stddev on columns */
export type Organizations_Stddev_Fields = {
  __typename?: 'organizations_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Organizations_Stddev_Pop_Fields = {
  __typename?: 'organizations_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Organizations_Stddev_Samp_Fields = {
  __typename?: 'organizations_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "organizations" */
export type Organizations_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Organizations_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Organizations_Stream_Cursor_Value_Input = {
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['numeric']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Organizations_Sum_Fields = {
  __typename?: 'organizations_sum_fields';
  id?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Organizations_Var_Pop_Fields = {
  __typename?: 'organizations_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Organizations_Var_Samp_Fields = {
  __typename?: 'organizations_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Organizations_Variance_Fields = {
  __typename?: 'organizations_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "person" */
export type Persons = {
  __typename?: 'persons';
  /** An object relationship */
  atom?: Maybe<Atoms>;
  description?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['numeric']['output'];
  identifier?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

/** aggregated selection of "person" */
export type Persons_Aggregate = {
  __typename?: 'persons_aggregate';
  aggregate?: Maybe<Persons_Aggregate_Fields>;
  nodes: Array<Persons>;
};

/** aggregate fields of "person" */
export type Persons_Aggregate_Fields = {
  __typename?: 'persons_aggregate_fields';
  avg?: Maybe<Persons_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Persons_Max_Fields>;
  min?: Maybe<Persons_Min_Fields>;
  stddev?: Maybe<Persons_Stddev_Fields>;
  stddev_pop?: Maybe<Persons_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Persons_Stddev_Samp_Fields>;
  sum?: Maybe<Persons_Sum_Fields>;
  var_pop?: Maybe<Persons_Var_Pop_Fields>;
  var_samp?: Maybe<Persons_Var_Samp_Fields>;
  variance?: Maybe<Persons_Variance_Fields>;
};


/** aggregate fields of "person" */
export type Persons_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Persons_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Persons_Avg_Fields = {
  __typename?: 'persons_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "person". All fields are combined with a logical 'AND'. */
export type Persons_Bool_Exp = {
  _and?: InputMaybe<Array<Persons_Bool_Exp>>;
  _not?: InputMaybe<Persons_Bool_Exp>;
  _or?: InputMaybe<Array<Persons_Bool_Exp>>;
  atom?: InputMaybe<Atoms_Bool_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Numeric_Comparison_Exp>;
  identifier?: InputMaybe<String_Comparison_Exp>;
  image?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  url?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Persons_Max_Fields = {
  __typename?: 'persons_max_fields';
  description?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['numeric']['output']>;
  identifier?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Persons_Min_Fields = {
  __typename?: 'persons_min_fields';
  description?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['numeric']['output']>;
  identifier?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

/** Ordering options when selecting data from "person". */
export type Persons_Order_By = {
  atom?: InputMaybe<Atoms_Order_By>;
  description?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  identifier?: InputMaybe<Order_By>;
  image?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  url?: InputMaybe<Order_By>;
};

/** select columns of table "person" */
export type Persons_Select_Column =
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
  | 'url';

/** aggregate stddev on columns */
export type Persons_Stddev_Fields = {
  __typename?: 'persons_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Persons_Stddev_Pop_Fields = {
  __typename?: 'persons_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Persons_Stddev_Samp_Fields = {
  __typename?: 'persons_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "persons" */
export type Persons_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Persons_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Persons_Stream_Cursor_Value_Input = {
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['numeric']['input']>;
  identifier?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Persons_Sum_Fields = {
  __typename?: 'persons_sum_fields';
  id?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Persons_Var_Pop_Fields = {
  __typename?: 'persons_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Persons_Var_Samp_Fields = {
  __typename?: 'persons_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Persons_Variance_Fields = {
  __typename?: 'persons_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "position" */
export type Positions = {
  __typename?: 'positions';
  /** An object relationship */
  account?: Maybe<Accounts>;
  account_id: Scalars['String']['output'];
  id: Scalars['String']['output'];
  shares: Scalars['numeric']['output'];
  /** An object relationship */
  vault: Vaults;
  vault_id: Scalars['numeric']['output'];
};

/** aggregated selection of "position" */
export type Positions_Aggregate = {
  __typename?: 'positions_aggregate';
  aggregate?: Maybe<Positions_Aggregate_Fields>;
  nodes: Array<Positions>;
};

export type Positions_Aggregate_Bool_Exp = {
  count?: InputMaybe<Positions_Aggregate_Bool_Exp_Count>;
};

export type Positions_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Positions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Positions_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "position" */
export type Positions_Aggregate_Fields = {
  __typename?: 'positions_aggregate_fields';
  avg?: Maybe<Positions_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Positions_Max_Fields>;
  min?: Maybe<Positions_Min_Fields>;
  stddev?: Maybe<Positions_Stddev_Fields>;
  stddev_pop?: Maybe<Positions_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Positions_Stddev_Samp_Fields>;
  sum?: Maybe<Positions_Sum_Fields>;
  var_pop?: Maybe<Positions_Var_Pop_Fields>;
  var_samp?: Maybe<Positions_Var_Samp_Fields>;
  variance?: Maybe<Positions_Variance_Fields>;
};


/** aggregate fields of "position" */
export type Positions_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Positions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "position" */
export type Positions_Aggregate_Order_By = {
  avg?: InputMaybe<Positions_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Positions_Max_Order_By>;
  min?: InputMaybe<Positions_Min_Order_By>;
  stddev?: InputMaybe<Positions_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Positions_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Positions_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Positions_Sum_Order_By>;
  var_pop?: InputMaybe<Positions_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Positions_Var_Samp_Order_By>;
  variance?: InputMaybe<Positions_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Positions_Avg_Fields = {
  __typename?: 'positions_avg_fields';
  shares?: Maybe<Scalars['Float']['output']>;
  vault_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "position" */
export type Positions_Avg_Order_By = {
  shares?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "position". All fields are combined with a logical 'AND'. */
export type Positions_Bool_Exp = {
  _and?: InputMaybe<Array<Positions_Bool_Exp>>;
  _not?: InputMaybe<Positions_Bool_Exp>;
  _or?: InputMaybe<Array<Positions_Bool_Exp>>;
  account?: InputMaybe<Accounts_Bool_Exp>;
  account_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  shares?: InputMaybe<Numeric_Comparison_Exp>;
  vault?: InputMaybe<Vaults_Bool_Exp>;
  vault_id?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Positions_Max_Fields = {
  __typename?: 'positions_max_fields';
  account_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  shares?: Maybe<Scalars['numeric']['output']>;
  vault_id?: Maybe<Scalars['numeric']['output']>;
};

/** order by max() on columns of table "position" */
export type Positions_Max_Order_By = {
  account_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  shares?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Positions_Min_Fields = {
  __typename?: 'positions_min_fields';
  account_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  shares?: Maybe<Scalars['numeric']['output']>;
  vault_id?: Maybe<Scalars['numeric']['output']>;
};

/** order by min() on columns of table "position" */
export type Positions_Min_Order_By = {
  account_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  shares?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "position". */
export type Positions_Order_By = {
  account?: InputMaybe<Accounts_Order_By>;
  account_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  shares?: InputMaybe<Order_By>;
  vault?: InputMaybe<Vaults_Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** select columns of table "position" */
export type Positions_Select_Column =
  /** column name */
  | 'account_id'
  /** column name */
  | 'id'
  /** column name */
  | 'shares'
  /** column name */
  | 'vault_id';

/** aggregate stddev on columns */
export type Positions_Stddev_Fields = {
  __typename?: 'positions_stddev_fields';
  shares?: Maybe<Scalars['Float']['output']>;
  vault_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "position" */
export type Positions_Stddev_Order_By = {
  shares?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Positions_Stddev_Pop_Fields = {
  __typename?: 'positions_stddev_pop_fields';
  shares?: Maybe<Scalars['Float']['output']>;
  vault_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "position" */
export type Positions_Stddev_Pop_Order_By = {
  shares?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Positions_Stddev_Samp_Fields = {
  __typename?: 'positions_stddev_samp_fields';
  shares?: Maybe<Scalars['Float']['output']>;
  vault_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "position" */
export type Positions_Stddev_Samp_Order_By = {
  shares?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "positions" */
export type Positions_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Positions_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Positions_Stream_Cursor_Value_Input = {
  account_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  shares?: InputMaybe<Scalars['numeric']['input']>;
  vault_id?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Positions_Sum_Fields = {
  __typename?: 'positions_sum_fields';
  shares?: Maybe<Scalars['numeric']['output']>;
  vault_id?: Maybe<Scalars['numeric']['output']>;
};

/** order by sum() on columns of table "position" */
export type Positions_Sum_Order_By = {
  shares?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Positions_Var_Pop_Fields = {
  __typename?: 'positions_var_pop_fields';
  shares?: Maybe<Scalars['Float']['output']>;
  vault_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "position" */
export type Positions_Var_Pop_Order_By = {
  shares?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Positions_Var_Samp_Fields = {
  __typename?: 'positions_var_samp_fields';
  shares?: Maybe<Scalars['Float']['output']>;
  vault_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "position" */
export type Positions_Var_Samp_Order_By = {
  shares?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Positions_Variance_Fields = {
  __typename?: 'positions_variance_fields';
  shares?: Maybe<Scalars['Float']['output']>;
  vault_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "position" */
export type Positions_Variance_Order_By = {
  shares?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** columns and relationships of "predicate_object" */
export type Predicate_Objects = {
  __typename?: 'predicate_objects';
  claim_count: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  /** An object relationship */
  object: Atoms;
  object_id: Scalars['numeric']['output'];
  /** An object relationship */
  predicate?: Maybe<Atoms>;
  predicate_id: Scalars['numeric']['output'];
  triple_count: Scalars['Int']['output'];
};

/** aggregated selection of "predicate_object" */
export type Predicate_Objects_Aggregate = {
  __typename?: 'predicate_objects_aggregate';
  aggregate?: Maybe<Predicate_Objects_Aggregate_Fields>;
  nodes: Array<Predicate_Objects>;
};

/** aggregate fields of "predicate_object" */
export type Predicate_Objects_Aggregate_Fields = {
  __typename?: 'predicate_objects_aggregate_fields';
  avg?: Maybe<Predicate_Objects_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Predicate_Objects_Max_Fields>;
  min?: Maybe<Predicate_Objects_Min_Fields>;
  stddev?: Maybe<Predicate_Objects_Stddev_Fields>;
  stddev_pop?: Maybe<Predicate_Objects_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Predicate_Objects_Stddev_Samp_Fields>;
  sum?: Maybe<Predicate_Objects_Sum_Fields>;
  var_pop?: Maybe<Predicate_Objects_Var_Pop_Fields>;
  var_samp?: Maybe<Predicate_Objects_Var_Samp_Fields>;
  variance?: Maybe<Predicate_Objects_Variance_Fields>;
};


/** aggregate fields of "predicate_object" */
export type Predicate_Objects_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Predicate_Objects_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Predicate_Objects_Avg_Fields = {
  __typename?: 'predicate_objects_avg_fields';
  claim_count?: Maybe<Scalars['Float']['output']>;
  object_id?: Maybe<Scalars['Float']['output']>;
  predicate_id?: Maybe<Scalars['Float']['output']>;
  triple_count?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "predicate_object". All fields are combined with a logical 'AND'. */
export type Predicate_Objects_Bool_Exp = {
  _and?: InputMaybe<Array<Predicate_Objects_Bool_Exp>>;
  _not?: InputMaybe<Predicate_Objects_Bool_Exp>;
  _or?: InputMaybe<Array<Predicate_Objects_Bool_Exp>>;
  claim_count?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  object?: InputMaybe<Atoms_Bool_Exp>;
  object_id?: InputMaybe<Numeric_Comparison_Exp>;
  predicate?: InputMaybe<Atoms_Bool_Exp>;
  predicate_id?: InputMaybe<Numeric_Comparison_Exp>;
  triple_count?: InputMaybe<Int_Comparison_Exp>;
};

/** aggregate max on columns */
export type Predicate_Objects_Max_Fields = {
  __typename?: 'predicate_objects_max_fields';
  claim_count?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  object_id?: Maybe<Scalars['numeric']['output']>;
  predicate_id?: Maybe<Scalars['numeric']['output']>;
  triple_count?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type Predicate_Objects_Min_Fields = {
  __typename?: 'predicate_objects_min_fields';
  claim_count?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  object_id?: Maybe<Scalars['numeric']['output']>;
  predicate_id?: Maybe<Scalars['numeric']['output']>;
  triple_count?: Maybe<Scalars['Int']['output']>;
};

/** Ordering options when selecting data from "predicate_object". */
export type Predicate_Objects_Order_By = {
  claim_count?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  object?: InputMaybe<Atoms_Order_By>;
  object_id?: InputMaybe<Order_By>;
  predicate?: InputMaybe<Atoms_Order_By>;
  predicate_id?: InputMaybe<Order_By>;
  triple_count?: InputMaybe<Order_By>;
};

/** select columns of table "predicate_object" */
export type Predicate_Objects_Select_Column =
  /** column name */
  | 'claim_count'
  /** column name */
  | 'id'
  /** column name */
  | 'object_id'
  /** column name */
  | 'predicate_id'
  /** column name */
  | 'triple_count';

/** aggregate stddev on columns */
export type Predicate_Objects_Stddev_Fields = {
  __typename?: 'predicate_objects_stddev_fields';
  claim_count?: Maybe<Scalars['Float']['output']>;
  object_id?: Maybe<Scalars['Float']['output']>;
  predicate_id?: Maybe<Scalars['Float']['output']>;
  triple_count?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Predicate_Objects_Stddev_Pop_Fields = {
  __typename?: 'predicate_objects_stddev_pop_fields';
  claim_count?: Maybe<Scalars['Float']['output']>;
  object_id?: Maybe<Scalars['Float']['output']>;
  predicate_id?: Maybe<Scalars['Float']['output']>;
  triple_count?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Predicate_Objects_Stddev_Samp_Fields = {
  __typename?: 'predicate_objects_stddev_samp_fields';
  claim_count?: Maybe<Scalars['Float']['output']>;
  object_id?: Maybe<Scalars['Float']['output']>;
  predicate_id?: Maybe<Scalars['Float']['output']>;
  triple_count?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "predicate_objects" */
export type Predicate_Objects_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Predicate_Objects_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Predicate_Objects_Stream_Cursor_Value_Input = {
  claim_count?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  object_id?: InputMaybe<Scalars['numeric']['input']>;
  predicate_id?: InputMaybe<Scalars['numeric']['input']>;
  triple_count?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Predicate_Objects_Sum_Fields = {
  __typename?: 'predicate_objects_sum_fields';
  claim_count?: Maybe<Scalars['Int']['output']>;
  object_id?: Maybe<Scalars['numeric']['output']>;
  predicate_id?: Maybe<Scalars['numeric']['output']>;
  triple_count?: Maybe<Scalars['Int']['output']>;
};

/** aggregate var_pop on columns */
export type Predicate_Objects_Var_Pop_Fields = {
  __typename?: 'predicate_objects_var_pop_fields';
  claim_count?: Maybe<Scalars['Float']['output']>;
  object_id?: Maybe<Scalars['Float']['output']>;
  predicate_id?: Maybe<Scalars['Float']['output']>;
  triple_count?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Predicate_Objects_Var_Samp_Fields = {
  __typename?: 'predicate_objects_var_samp_fields';
  claim_count?: Maybe<Scalars['Float']['output']>;
  object_id?: Maybe<Scalars['Float']['output']>;
  predicate_id?: Maybe<Scalars['Float']['output']>;
  triple_count?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Predicate_Objects_Variance_Fields = {
  __typename?: 'predicate_objects_variance_fields';
  claim_count?: Maybe<Scalars['Float']['output']>;
  object_id?: Maybe<Scalars['Float']['output']>;
  predicate_id?: Maybe<Scalars['Float']['output']>;
  triple_count?: Maybe<Scalars['Float']['output']>;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "account" using primary key columns */
  account?: Maybe<Accounts>;
  /** An array relationship */
  accounts: Array<Accounts>;
  /** An aggregate relationship */
  accounts_aggregate: Accounts_Aggregate;
  /** execute function "accounts_that_claim_about_account" which returns "account" */
  accounts_that_claim_about_account: Array<Accounts>;
  /** execute function "accounts_that_claim_about_account" and query aggregates on result of table type "account" */
  accounts_that_claim_about_account_aggregate: Accounts_Aggregate;
  /** fetch data from the table: "atom" using primary key columns */
  atom?: Maybe<Atoms>;
  /** fetch data from the table: "atom_value" using primary key columns */
  atom_value?: Maybe<Atom_Values>;
  /** fetch data from the table: "atom_value" */
  atom_values: Array<Atom_Values>;
  /** fetch aggregated fields from the table: "atom_value" */
  atom_values_aggregate: Atom_Values_Aggregate;
  /** An array relationship */
  atoms: Array<Atoms>;
  /** An aggregate relationship */
  atoms_aggregate: Atoms_Aggregate;
  /** fetch data from the table: "book" using primary key columns */
  book?: Maybe<Books>;
  /** fetch data from the table: "book" */
  books: Array<Books>;
  /** fetch aggregated fields from the table: "book" */
  books_aggregate: Books_Aggregate;
  /** fetch data from the table: "chainlink_price" using primary key columns */
  chainlink_price?: Maybe<Chainlink_Prices>;
  /** fetch data from the table: "chainlink_price" */
  chainlink_prices: Array<Chainlink_Prices>;
  /** fetch data from the table: "claim" using primary key columns */
  claim?: Maybe<Claims>;
  /** An array relationship */
  claims: Array<Claims>;
  /** An aggregate relationship */
  claims_aggregate: Claims_Aggregate;
  /** execute function "claims_from_following" which returns "claim" */
  claims_from_following: Array<Claims>;
  /** execute function "claims_from_following" and query aggregates on result of table type "claim" */
  claims_from_following_aggregate: Claims_Aggregate;
  /** fetch data from the table: "deposit" using primary key columns */
  deposit?: Maybe<Deposits>;
  /** An array relationship */
  deposits: Array<Deposits>;
  /** An aggregate relationship */
  deposits_aggregate: Deposits_Aggregate;
  /** fetch data from the table: "event" using primary key columns */
  event?: Maybe<Events>;
  /** An array relationship */
  events: Array<Events>;
  /** An aggregate relationship */
  events_aggregate: Events_Aggregate;
  /** fetch data from the table: "fee_transfer" using primary key columns */
  fee_transfer?: Maybe<Fee_Transfers>;
  /** An array relationship */
  fee_transfers: Array<Fee_Transfers>;
  /** An aggregate relationship */
  fee_transfers_aggregate: Fee_Transfers_Aggregate;
  /** execute function "following" which returns "account" */
  following: Array<Accounts>;
  /** execute function "following" and query aggregates on result of table type "account" */
  following_aggregate: Accounts_Aggregate;
  /** fetch data from the table: "organization" using primary key columns */
  organization?: Maybe<Organizations>;
  /** fetch data from the table: "organization" */
  organizations: Array<Organizations>;
  /** fetch aggregated fields from the table: "organization" */
  organizations_aggregate: Organizations_Aggregate;
  /** fetch data from the table: "person" using primary key columns */
  person?: Maybe<Persons>;
  /** fetch data from the table: "person" */
  persons: Array<Persons>;
  /** fetch aggregated fields from the table: "person" */
  persons_aggregate: Persons_Aggregate;
  /** fetch data from the table: "position" using primary key columns */
  position?: Maybe<Positions>;
  /** An array relationship */
  positions: Array<Positions>;
  /** An aggregate relationship */
  positions_aggregate: Positions_Aggregate;
  /** fetch data from the table: "predicate_object" */
  predicate_objects: Array<Predicate_Objects>;
  /** fetch aggregated fields from the table: "predicate_object" */
  predicate_objects_aggregate: Predicate_Objects_Aggregate;
  /** fetch data from the table: "predicate_object" using primary key columns */
  predicate_objects_by_pk?: Maybe<Predicate_Objects>;
  /** fetch data from the table: "redemption" using primary key columns */
  redemption?: Maybe<Redemptions>;
  /** An array relationship */
  redemptions: Array<Redemptions>;
  /** An aggregate relationship */
  redemptions_aggregate: Redemptions_Aggregate;
  /** fetch data from the table: "signal" using primary key columns */
  signal?: Maybe<Signals>;
  /** An array relationship */
  signals: Array<Signals>;
  /** An aggregate relationship */
  signals_aggregate: Signals_Aggregate;
  /** execute function "signals_from_following" which returns "signal" */
  signals_from_following: Array<Signals>;
  /** execute function "signals_from_following" and query aggregates on result of table type "signal" */
  signals_from_following_aggregate: Signals_Aggregate;
  /** fetch data from the table: "stats" using primary key columns */
  stat?: Maybe<Stats>;
  /** fetch data from the table: "stats" */
  stats: Array<Stats>;
  /** fetch aggregated fields from the table: "stats" */
  stats_aggregate: Stats_Aggregate;
  /** fetch data from the table: "thing" using primary key columns */
  thing?: Maybe<Things>;
  /** fetch data from the table: "thing" */
  things: Array<Things>;
  /** fetch aggregated fields from the table: "thing" */
  things_aggregate: Things_Aggregate;
  /** fetch data from the table: "triple" using primary key columns */
  triple?: Maybe<Triples>;
  /** An array relationship */
  triples: Array<Triples>;
  /** An aggregate relationship */
  triples_aggregate: Triples_Aggregate;
  /** fetch data from the table: "vault" using primary key columns */
  vault?: Maybe<Vaults>;
  /** fetch data from the table: "vault" */
  vaults: Array<Vaults>;
  /** fetch aggregated fields from the table: "vault" */
  vaults_aggregate: Vaults_Aggregate;
};


export type Query_RootAccountArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootAccountsArgs = {
  distinct_on?: InputMaybe<Array<Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Accounts_Order_By>>;
  where?: InputMaybe<Accounts_Bool_Exp>;
};


export type Query_RootAccounts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Accounts_Order_By>>;
  where?: InputMaybe<Accounts_Bool_Exp>;
};


export type Query_RootAccounts_That_Claim_About_AccountArgs = {
  args: Accounts_That_Claim_About_Account_Args;
  distinct_on?: InputMaybe<Array<Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Accounts_Order_By>>;
  where?: InputMaybe<Accounts_Bool_Exp>;
};


export type Query_RootAccounts_That_Claim_About_Account_AggregateArgs = {
  args: Accounts_That_Claim_About_Account_Args;
  distinct_on?: InputMaybe<Array<Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Accounts_Order_By>>;
  where?: InputMaybe<Accounts_Bool_Exp>;
};


export type Query_RootAtomArgs = {
  id: Scalars['numeric']['input'];
};


export type Query_RootAtom_ValueArgs = {
  id: Scalars['numeric']['input'];
};


export type Query_RootAtom_ValuesArgs = {
  distinct_on?: InputMaybe<Array<Atom_Values_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Atom_Values_Order_By>>;
  where?: InputMaybe<Atom_Values_Bool_Exp>;
};


export type Query_RootAtom_Values_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Atom_Values_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Atom_Values_Order_By>>;
  where?: InputMaybe<Atom_Values_Bool_Exp>;
};


export type Query_RootAtomsArgs = {
  distinct_on?: InputMaybe<Array<Atoms_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Atoms_Order_By>>;
  where?: InputMaybe<Atoms_Bool_Exp>;
};


export type Query_RootAtoms_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Atoms_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Atoms_Order_By>>;
  where?: InputMaybe<Atoms_Bool_Exp>;
};


export type Query_RootBookArgs = {
  id: Scalars['numeric']['input'];
};


export type Query_RootBooksArgs = {
  distinct_on?: InputMaybe<Array<Books_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Books_Order_By>>;
  where?: InputMaybe<Books_Bool_Exp>;
};


export type Query_RootBooks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Books_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Books_Order_By>>;
  where?: InputMaybe<Books_Bool_Exp>;
};


export type Query_RootChainlink_PriceArgs = {
  id: Scalars['numeric']['input'];
};


export type Query_RootChainlink_PricesArgs = {
  distinct_on?: InputMaybe<Array<Chainlink_Prices_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Chainlink_Prices_Order_By>>;
  where?: InputMaybe<Chainlink_Prices_Bool_Exp>;
};


export type Query_RootClaimArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootClaimsArgs = {
  distinct_on?: InputMaybe<Array<Claims_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Claims_Order_By>>;
  where?: InputMaybe<Claims_Bool_Exp>;
};


export type Query_RootClaims_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Claims_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Claims_Order_By>>;
  where?: InputMaybe<Claims_Bool_Exp>;
};


export type Query_RootClaims_From_FollowingArgs = {
  args: Claims_From_Following_Args;
  distinct_on?: InputMaybe<Array<Claims_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Claims_Order_By>>;
  where?: InputMaybe<Claims_Bool_Exp>;
};


export type Query_RootClaims_From_Following_AggregateArgs = {
  args: Claims_From_Following_Args;
  distinct_on?: InputMaybe<Array<Claims_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Claims_Order_By>>;
  where?: InputMaybe<Claims_Bool_Exp>;
};


export type Query_RootDepositArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootDepositsArgs = {
  distinct_on?: InputMaybe<Array<Deposits_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Deposits_Order_By>>;
  where?: InputMaybe<Deposits_Bool_Exp>;
};


export type Query_RootDeposits_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Deposits_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Deposits_Order_By>>;
  where?: InputMaybe<Deposits_Bool_Exp>;
};


export type Query_RootEventArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootEventsArgs = {
  distinct_on?: InputMaybe<Array<Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Events_Order_By>>;
  where?: InputMaybe<Events_Bool_Exp>;
};


export type Query_RootEvents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Events_Order_By>>;
  where?: InputMaybe<Events_Bool_Exp>;
};


export type Query_RootFee_TransferArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootFee_TransfersArgs = {
  distinct_on?: InputMaybe<Array<Fee_Transfers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Fee_Transfers_Order_By>>;
  where?: InputMaybe<Fee_Transfers_Bool_Exp>;
};


export type Query_RootFee_Transfers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Fee_Transfers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Fee_Transfers_Order_By>>;
  where?: InputMaybe<Fee_Transfers_Bool_Exp>;
};


export type Query_RootFollowingArgs = {
  args: Following_Args;
  distinct_on?: InputMaybe<Array<Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Accounts_Order_By>>;
  where?: InputMaybe<Accounts_Bool_Exp>;
};


export type Query_RootFollowing_AggregateArgs = {
  args: Following_Args;
  distinct_on?: InputMaybe<Array<Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Accounts_Order_By>>;
  where?: InputMaybe<Accounts_Bool_Exp>;
};


export type Query_RootOrganizationArgs = {
  id: Scalars['numeric']['input'];
};


export type Query_RootOrganizationsArgs = {
  distinct_on?: InputMaybe<Array<Organizations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Organizations_Order_By>>;
  where?: InputMaybe<Organizations_Bool_Exp>;
};


export type Query_RootOrganizations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Organizations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Organizations_Order_By>>;
  where?: InputMaybe<Organizations_Bool_Exp>;
};


export type Query_RootPersonArgs = {
  id: Scalars['numeric']['input'];
};


export type Query_RootPersonsArgs = {
  distinct_on?: InputMaybe<Array<Persons_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Persons_Order_By>>;
  where?: InputMaybe<Persons_Bool_Exp>;
};


export type Query_RootPersons_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Persons_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Persons_Order_By>>;
  where?: InputMaybe<Persons_Bool_Exp>;
};


export type Query_RootPositionArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootPositionsArgs = {
  distinct_on?: InputMaybe<Array<Positions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Positions_Order_By>>;
  where?: InputMaybe<Positions_Bool_Exp>;
};


export type Query_RootPositions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Positions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Positions_Order_By>>;
  where?: InputMaybe<Positions_Bool_Exp>;
};


export type Query_RootPredicate_ObjectsArgs = {
  distinct_on?: InputMaybe<Array<Predicate_Objects_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Predicate_Objects_Order_By>>;
  where?: InputMaybe<Predicate_Objects_Bool_Exp>;
};


export type Query_RootPredicate_Objects_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Predicate_Objects_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Predicate_Objects_Order_By>>;
  where?: InputMaybe<Predicate_Objects_Bool_Exp>;
};


export type Query_RootPredicate_Objects_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootRedemptionArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootRedemptionsArgs = {
  distinct_on?: InputMaybe<Array<Redemptions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Redemptions_Order_By>>;
  where?: InputMaybe<Redemptions_Bool_Exp>;
};


export type Query_RootRedemptions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Redemptions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Redemptions_Order_By>>;
  where?: InputMaybe<Redemptions_Bool_Exp>;
};


export type Query_RootSignalArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootSignalsArgs = {
  distinct_on?: InputMaybe<Array<Signals_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Signals_Order_By>>;
  where?: InputMaybe<Signals_Bool_Exp>;
};


export type Query_RootSignals_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Signals_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Signals_Order_By>>;
  where?: InputMaybe<Signals_Bool_Exp>;
};


export type Query_RootSignals_From_FollowingArgs = {
  args: Signals_From_Following_Args;
  distinct_on?: InputMaybe<Array<Signals_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Signals_Order_By>>;
  where?: InputMaybe<Signals_Bool_Exp>;
};


export type Query_RootSignals_From_Following_AggregateArgs = {
  args: Signals_From_Following_Args;
  distinct_on?: InputMaybe<Array<Signals_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Signals_Order_By>>;
  where?: InputMaybe<Signals_Bool_Exp>;
};


export type Query_RootStatArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootStatsArgs = {
  distinct_on?: InputMaybe<Array<Stats_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Stats_Order_By>>;
  where?: InputMaybe<Stats_Bool_Exp>;
};


export type Query_RootStats_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Stats_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Stats_Order_By>>;
  where?: InputMaybe<Stats_Bool_Exp>;
};


export type Query_RootThingArgs = {
  id: Scalars['numeric']['input'];
};


export type Query_RootThingsArgs = {
  distinct_on?: InputMaybe<Array<Things_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Things_Order_By>>;
  where?: InputMaybe<Things_Bool_Exp>;
};


export type Query_RootThings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Things_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Things_Order_By>>;
  where?: InputMaybe<Things_Bool_Exp>;
};


export type Query_RootTripleArgs = {
  id: Scalars['numeric']['input'];
};


export type Query_RootTriplesArgs = {
  distinct_on?: InputMaybe<Array<Triples_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Triples_Order_By>>;
  where?: InputMaybe<Triples_Bool_Exp>;
};


export type Query_RootTriples_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Triples_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Triples_Order_By>>;
  where?: InputMaybe<Triples_Bool_Exp>;
};


export type Query_RootVaultArgs = {
  id: Scalars['numeric']['input'];
};


export type Query_RootVaultsArgs = {
  distinct_on?: InputMaybe<Array<Vaults_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Vaults_Order_By>>;
  where?: InputMaybe<Vaults_Bool_Exp>;
};


export type Query_RootVaults_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Vaults_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Vaults_Order_By>>;
  where?: InputMaybe<Vaults_Bool_Exp>;
};

/** columns and relationships of "redemption" */
export type Redemptions = {
  __typename?: 'redemptions';
  assets_for_receiver: Scalars['numeric']['output'];
  block_number: Scalars['numeric']['output'];
  block_timestamp: Scalars['bigint']['output'];
  /** An array relationship */
  events: Array<Events>;
  /** An aggregate relationship */
  events_aggregate: Events_Aggregate;
  exit_fee: Scalars['numeric']['output'];
  id: Scalars['String']['output'];
  /** An object relationship */
  receiver: Accounts;
  receiver_id: Scalars['String']['output'];
  /** An object relationship */
  sender?: Maybe<Accounts>;
  sender_id: Scalars['String']['output'];
  sender_total_shares_in_vault: Scalars['numeric']['output'];
  shares_redeemed_by_sender: Scalars['numeric']['output'];
  /** An array relationship */
  signals: Array<Signals>;
  /** An aggregate relationship */
  signals_aggregate: Signals_Aggregate;
  transaction_hash: Scalars['bytea']['output'];
  /** An object relationship */
  vault: Vaults;
  vault_id: Scalars['numeric']['output'];
};


/** columns and relationships of "redemption" */
export type RedemptionsEventsArgs = {
  distinct_on?: InputMaybe<Array<Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Events_Order_By>>;
  where?: InputMaybe<Events_Bool_Exp>;
};


/** columns and relationships of "redemption" */
export type RedemptionsEvents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Events_Order_By>>;
  where?: InputMaybe<Events_Bool_Exp>;
};


/** columns and relationships of "redemption" */
export type RedemptionsSignalsArgs = {
  distinct_on?: InputMaybe<Array<Signals_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Signals_Order_By>>;
  where?: InputMaybe<Signals_Bool_Exp>;
};


/** columns and relationships of "redemption" */
export type RedemptionsSignals_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Signals_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Signals_Order_By>>;
  where?: InputMaybe<Signals_Bool_Exp>;
};

/** aggregated selection of "redemption" */
export type Redemptions_Aggregate = {
  __typename?: 'redemptions_aggregate';
  aggregate?: Maybe<Redemptions_Aggregate_Fields>;
  nodes: Array<Redemptions>;
};

export type Redemptions_Aggregate_Bool_Exp = {
  count?: InputMaybe<Redemptions_Aggregate_Bool_Exp_Count>;
};

export type Redemptions_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Redemptions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Redemptions_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "redemption" */
export type Redemptions_Aggregate_Fields = {
  __typename?: 'redemptions_aggregate_fields';
  avg?: Maybe<Redemptions_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Redemptions_Max_Fields>;
  min?: Maybe<Redemptions_Min_Fields>;
  stddev?: Maybe<Redemptions_Stddev_Fields>;
  stddev_pop?: Maybe<Redemptions_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Redemptions_Stddev_Samp_Fields>;
  sum?: Maybe<Redemptions_Sum_Fields>;
  var_pop?: Maybe<Redemptions_Var_Pop_Fields>;
  var_samp?: Maybe<Redemptions_Var_Samp_Fields>;
  variance?: Maybe<Redemptions_Variance_Fields>;
};


/** aggregate fields of "redemption" */
export type Redemptions_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Redemptions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "redemption" */
export type Redemptions_Aggregate_Order_By = {
  avg?: InputMaybe<Redemptions_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Redemptions_Max_Order_By>;
  min?: InputMaybe<Redemptions_Min_Order_By>;
  stddev?: InputMaybe<Redemptions_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Redemptions_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Redemptions_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Redemptions_Sum_Order_By>;
  var_pop?: InputMaybe<Redemptions_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Redemptions_Var_Samp_Order_By>;
  variance?: InputMaybe<Redemptions_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Redemptions_Avg_Fields = {
  __typename?: 'redemptions_avg_fields';
  assets_for_receiver?: Maybe<Scalars['Float']['output']>;
  block_number?: Maybe<Scalars['Float']['output']>;
  block_timestamp?: Maybe<Scalars['Float']['output']>;
  exit_fee?: Maybe<Scalars['Float']['output']>;
  sender_total_shares_in_vault?: Maybe<Scalars['Float']['output']>;
  shares_redeemed_by_sender?: Maybe<Scalars['Float']['output']>;
  vault_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "redemption" */
export type Redemptions_Avg_Order_By = {
  assets_for_receiver?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  exit_fee?: InputMaybe<Order_By>;
  sender_total_shares_in_vault?: InputMaybe<Order_By>;
  shares_redeemed_by_sender?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "redemption". All fields are combined with a logical 'AND'. */
export type Redemptions_Bool_Exp = {
  _and?: InputMaybe<Array<Redemptions_Bool_Exp>>;
  _not?: InputMaybe<Redemptions_Bool_Exp>;
  _or?: InputMaybe<Array<Redemptions_Bool_Exp>>;
  assets_for_receiver?: InputMaybe<Numeric_Comparison_Exp>;
  block_number?: InputMaybe<Numeric_Comparison_Exp>;
  block_timestamp?: InputMaybe<Bigint_Comparison_Exp>;
  events?: InputMaybe<Events_Bool_Exp>;
  events_aggregate?: InputMaybe<Events_Aggregate_Bool_Exp>;
  exit_fee?: InputMaybe<Numeric_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  receiver?: InputMaybe<Accounts_Bool_Exp>;
  receiver_id?: InputMaybe<String_Comparison_Exp>;
  sender?: InputMaybe<Accounts_Bool_Exp>;
  sender_id?: InputMaybe<String_Comparison_Exp>;
  sender_total_shares_in_vault?: InputMaybe<Numeric_Comparison_Exp>;
  shares_redeemed_by_sender?: InputMaybe<Numeric_Comparison_Exp>;
  signals?: InputMaybe<Signals_Bool_Exp>;
  signals_aggregate?: InputMaybe<Signals_Aggregate_Bool_Exp>;
  transaction_hash?: InputMaybe<Bytea_Comparison_Exp>;
  vault?: InputMaybe<Vaults_Bool_Exp>;
  vault_id?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Redemptions_Max_Fields = {
  __typename?: 'redemptions_max_fields';
  assets_for_receiver?: Maybe<Scalars['numeric']['output']>;
  block_number?: Maybe<Scalars['numeric']['output']>;
  block_timestamp?: Maybe<Scalars['bigint']['output']>;
  exit_fee?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  receiver_id?: Maybe<Scalars['String']['output']>;
  sender_id?: Maybe<Scalars['String']['output']>;
  sender_total_shares_in_vault?: Maybe<Scalars['numeric']['output']>;
  shares_redeemed_by_sender?: Maybe<Scalars['numeric']['output']>;
  vault_id?: Maybe<Scalars['numeric']['output']>;
};

/** order by max() on columns of table "redemption" */
export type Redemptions_Max_Order_By = {
  assets_for_receiver?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  exit_fee?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  receiver_id?: InputMaybe<Order_By>;
  sender_id?: InputMaybe<Order_By>;
  sender_total_shares_in_vault?: InputMaybe<Order_By>;
  shares_redeemed_by_sender?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Redemptions_Min_Fields = {
  __typename?: 'redemptions_min_fields';
  assets_for_receiver?: Maybe<Scalars['numeric']['output']>;
  block_number?: Maybe<Scalars['numeric']['output']>;
  block_timestamp?: Maybe<Scalars['bigint']['output']>;
  exit_fee?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  receiver_id?: Maybe<Scalars['String']['output']>;
  sender_id?: Maybe<Scalars['String']['output']>;
  sender_total_shares_in_vault?: Maybe<Scalars['numeric']['output']>;
  shares_redeemed_by_sender?: Maybe<Scalars['numeric']['output']>;
  vault_id?: Maybe<Scalars['numeric']['output']>;
};

/** order by min() on columns of table "redemption" */
export type Redemptions_Min_Order_By = {
  assets_for_receiver?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  exit_fee?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  receiver_id?: InputMaybe<Order_By>;
  sender_id?: InputMaybe<Order_By>;
  sender_total_shares_in_vault?: InputMaybe<Order_By>;
  shares_redeemed_by_sender?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "redemption". */
export type Redemptions_Order_By = {
  assets_for_receiver?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  events_aggregate?: InputMaybe<Events_Aggregate_Order_By>;
  exit_fee?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  receiver?: InputMaybe<Accounts_Order_By>;
  receiver_id?: InputMaybe<Order_By>;
  sender?: InputMaybe<Accounts_Order_By>;
  sender_id?: InputMaybe<Order_By>;
  sender_total_shares_in_vault?: InputMaybe<Order_By>;
  shares_redeemed_by_sender?: InputMaybe<Order_By>;
  signals_aggregate?: InputMaybe<Signals_Aggregate_Order_By>;
  transaction_hash?: InputMaybe<Order_By>;
  vault?: InputMaybe<Vaults_Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** select columns of table "redemption" */
export type Redemptions_Select_Column =
  /** column name */
  | 'assets_for_receiver'
  /** column name */
  | 'block_number'
  /** column name */
  | 'block_timestamp'
  /** column name */
  | 'exit_fee'
  /** column name */
  | 'id'
  /** column name */
  | 'receiver_id'
  /** column name */
  | 'sender_id'
  /** column name */
  | 'sender_total_shares_in_vault'
  /** column name */
  | 'shares_redeemed_by_sender'
  /** column name */
  | 'transaction_hash'
  /** column name */
  | 'vault_id';

/** aggregate stddev on columns */
export type Redemptions_Stddev_Fields = {
  __typename?: 'redemptions_stddev_fields';
  assets_for_receiver?: Maybe<Scalars['Float']['output']>;
  block_number?: Maybe<Scalars['Float']['output']>;
  block_timestamp?: Maybe<Scalars['Float']['output']>;
  exit_fee?: Maybe<Scalars['Float']['output']>;
  sender_total_shares_in_vault?: Maybe<Scalars['Float']['output']>;
  shares_redeemed_by_sender?: Maybe<Scalars['Float']['output']>;
  vault_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "redemption" */
export type Redemptions_Stddev_Order_By = {
  assets_for_receiver?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  exit_fee?: InputMaybe<Order_By>;
  sender_total_shares_in_vault?: InputMaybe<Order_By>;
  shares_redeemed_by_sender?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Redemptions_Stddev_Pop_Fields = {
  __typename?: 'redemptions_stddev_pop_fields';
  assets_for_receiver?: Maybe<Scalars['Float']['output']>;
  block_number?: Maybe<Scalars['Float']['output']>;
  block_timestamp?: Maybe<Scalars['Float']['output']>;
  exit_fee?: Maybe<Scalars['Float']['output']>;
  sender_total_shares_in_vault?: Maybe<Scalars['Float']['output']>;
  shares_redeemed_by_sender?: Maybe<Scalars['Float']['output']>;
  vault_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "redemption" */
export type Redemptions_Stddev_Pop_Order_By = {
  assets_for_receiver?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  exit_fee?: InputMaybe<Order_By>;
  sender_total_shares_in_vault?: InputMaybe<Order_By>;
  shares_redeemed_by_sender?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Redemptions_Stddev_Samp_Fields = {
  __typename?: 'redemptions_stddev_samp_fields';
  assets_for_receiver?: Maybe<Scalars['Float']['output']>;
  block_number?: Maybe<Scalars['Float']['output']>;
  block_timestamp?: Maybe<Scalars['Float']['output']>;
  exit_fee?: Maybe<Scalars['Float']['output']>;
  sender_total_shares_in_vault?: Maybe<Scalars['Float']['output']>;
  shares_redeemed_by_sender?: Maybe<Scalars['Float']['output']>;
  vault_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "redemption" */
export type Redemptions_Stddev_Samp_Order_By = {
  assets_for_receiver?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  exit_fee?: InputMaybe<Order_By>;
  sender_total_shares_in_vault?: InputMaybe<Order_By>;
  shares_redeemed_by_sender?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "redemptions" */
export type Redemptions_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Redemptions_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Redemptions_Stream_Cursor_Value_Input = {
  assets_for_receiver?: InputMaybe<Scalars['numeric']['input']>;
  block_number?: InputMaybe<Scalars['numeric']['input']>;
  block_timestamp?: InputMaybe<Scalars['bigint']['input']>;
  exit_fee?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  receiver_id?: InputMaybe<Scalars['String']['input']>;
  sender_id?: InputMaybe<Scalars['String']['input']>;
  sender_total_shares_in_vault?: InputMaybe<Scalars['numeric']['input']>;
  shares_redeemed_by_sender?: InputMaybe<Scalars['numeric']['input']>;
  transaction_hash?: InputMaybe<Scalars['bytea']['input']>;
  vault_id?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Redemptions_Sum_Fields = {
  __typename?: 'redemptions_sum_fields';
  assets_for_receiver?: Maybe<Scalars['numeric']['output']>;
  block_number?: Maybe<Scalars['numeric']['output']>;
  block_timestamp?: Maybe<Scalars['bigint']['output']>;
  exit_fee?: Maybe<Scalars['numeric']['output']>;
  sender_total_shares_in_vault?: Maybe<Scalars['numeric']['output']>;
  shares_redeemed_by_sender?: Maybe<Scalars['numeric']['output']>;
  vault_id?: Maybe<Scalars['numeric']['output']>;
};

/** order by sum() on columns of table "redemption" */
export type Redemptions_Sum_Order_By = {
  assets_for_receiver?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  exit_fee?: InputMaybe<Order_By>;
  sender_total_shares_in_vault?: InputMaybe<Order_By>;
  shares_redeemed_by_sender?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Redemptions_Var_Pop_Fields = {
  __typename?: 'redemptions_var_pop_fields';
  assets_for_receiver?: Maybe<Scalars['Float']['output']>;
  block_number?: Maybe<Scalars['Float']['output']>;
  block_timestamp?: Maybe<Scalars['Float']['output']>;
  exit_fee?: Maybe<Scalars['Float']['output']>;
  sender_total_shares_in_vault?: Maybe<Scalars['Float']['output']>;
  shares_redeemed_by_sender?: Maybe<Scalars['Float']['output']>;
  vault_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "redemption" */
export type Redemptions_Var_Pop_Order_By = {
  assets_for_receiver?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  exit_fee?: InputMaybe<Order_By>;
  sender_total_shares_in_vault?: InputMaybe<Order_By>;
  shares_redeemed_by_sender?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Redemptions_Var_Samp_Fields = {
  __typename?: 'redemptions_var_samp_fields';
  assets_for_receiver?: Maybe<Scalars['Float']['output']>;
  block_number?: Maybe<Scalars['Float']['output']>;
  block_timestamp?: Maybe<Scalars['Float']['output']>;
  exit_fee?: Maybe<Scalars['Float']['output']>;
  sender_total_shares_in_vault?: Maybe<Scalars['Float']['output']>;
  shares_redeemed_by_sender?: Maybe<Scalars['Float']['output']>;
  vault_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "redemption" */
export type Redemptions_Var_Samp_Order_By = {
  assets_for_receiver?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  exit_fee?: InputMaybe<Order_By>;
  sender_total_shares_in_vault?: InputMaybe<Order_By>;
  shares_redeemed_by_sender?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Redemptions_Variance_Fields = {
  __typename?: 'redemptions_variance_fields';
  assets_for_receiver?: Maybe<Scalars['Float']['output']>;
  block_number?: Maybe<Scalars['Float']['output']>;
  block_timestamp?: Maybe<Scalars['Float']['output']>;
  exit_fee?: Maybe<Scalars['Float']['output']>;
  sender_total_shares_in_vault?: Maybe<Scalars['Float']['output']>;
  shares_redeemed_by_sender?: Maybe<Scalars['Float']['output']>;
  vault_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "redemption" */
export type Redemptions_Variance_Order_By = {
  assets_for_receiver?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  exit_fee?: InputMaybe<Order_By>;
  sender_total_shares_in_vault?: InputMaybe<Order_By>;
  shares_redeemed_by_sender?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** columns and relationships of "signal" */
export type Signals = {
  __typename?: 'signals';
  /** An object relationship */
  account?: Maybe<Accounts>;
  account_id: Scalars['String']['output'];
  /** An object relationship */
  atom?: Maybe<Atoms>;
  atom_id?: Maybe<Scalars['numeric']['output']>;
  block_number: Scalars['numeric']['output'];
  block_timestamp: Scalars['bigint']['output'];
  delta: Scalars['numeric']['output'];
  /** An object relationship */
  deposit?: Maybe<Deposits>;
  deposit_id?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  /** An object relationship */
  redemption?: Maybe<Redemptions>;
  redemption_id?: Maybe<Scalars['String']['output']>;
  transaction_hash: Scalars['bytea']['output'];
  /** An object relationship */
  triple?: Maybe<Triples>;
  triple_id?: Maybe<Scalars['numeric']['output']>;
};

/** aggregated selection of "signal" */
export type Signals_Aggregate = {
  __typename?: 'signals_aggregate';
  aggregate?: Maybe<Signals_Aggregate_Fields>;
  nodes: Array<Signals>;
};

export type Signals_Aggregate_Bool_Exp = {
  count?: InputMaybe<Signals_Aggregate_Bool_Exp_Count>;
};

export type Signals_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Signals_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Signals_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "signal" */
export type Signals_Aggregate_Fields = {
  __typename?: 'signals_aggregate_fields';
  avg?: Maybe<Signals_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Signals_Max_Fields>;
  min?: Maybe<Signals_Min_Fields>;
  stddev?: Maybe<Signals_Stddev_Fields>;
  stddev_pop?: Maybe<Signals_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Signals_Stddev_Samp_Fields>;
  sum?: Maybe<Signals_Sum_Fields>;
  var_pop?: Maybe<Signals_Var_Pop_Fields>;
  var_samp?: Maybe<Signals_Var_Samp_Fields>;
  variance?: Maybe<Signals_Variance_Fields>;
};


/** aggregate fields of "signal" */
export type Signals_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Signals_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "signal" */
export type Signals_Aggregate_Order_By = {
  avg?: InputMaybe<Signals_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Signals_Max_Order_By>;
  min?: InputMaybe<Signals_Min_Order_By>;
  stddev?: InputMaybe<Signals_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Signals_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Signals_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Signals_Sum_Order_By>;
  var_pop?: InputMaybe<Signals_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Signals_Var_Samp_Order_By>;
  variance?: InputMaybe<Signals_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Signals_Avg_Fields = {
  __typename?: 'signals_avg_fields';
  atom_id?: Maybe<Scalars['Float']['output']>;
  block_number?: Maybe<Scalars['Float']['output']>;
  block_timestamp?: Maybe<Scalars['Float']['output']>;
  delta?: Maybe<Scalars['Float']['output']>;
  triple_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "signal" */
export type Signals_Avg_Order_By = {
  atom_id?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  delta?: InputMaybe<Order_By>;
  triple_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "signal". All fields are combined with a logical 'AND'. */
export type Signals_Bool_Exp = {
  _and?: InputMaybe<Array<Signals_Bool_Exp>>;
  _not?: InputMaybe<Signals_Bool_Exp>;
  _or?: InputMaybe<Array<Signals_Bool_Exp>>;
  account?: InputMaybe<Accounts_Bool_Exp>;
  account_id?: InputMaybe<String_Comparison_Exp>;
  atom?: InputMaybe<Atoms_Bool_Exp>;
  atom_id?: InputMaybe<Numeric_Comparison_Exp>;
  block_number?: InputMaybe<Numeric_Comparison_Exp>;
  block_timestamp?: InputMaybe<Bigint_Comparison_Exp>;
  delta?: InputMaybe<Numeric_Comparison_Exp>;
  deposit?: InputMaybe<Deposits_Bool_Exp>;
  deposit_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  redemption?: InputMaybe<Redemptions_Bool_Exp>;
  redemption_id?: InputMaybe<String_Comparison_Exp>;
  transaction_hash?: InputMaybe<Bytea_Comparison_Exp>;
  triple?: InputMaybe<Triples_Bool_Exp>;
  triple_id?: InputMaybe<Numeric_Comparison_Exp>;
};

export type Signals_From_Following_Args = {
  address?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Signals_Max_Fields = {
  __typename?: 'signals_max_fields';
  account_id?: Maybe<Scalars['String']['output']>;
  atom_id?: Maybe<Scalars['numeric']['output']>;
  block_number?: Maybe<Scalars['numeric']['output']>;
  block_timestamp?: Maybe<Scalars['bigint']['output']>;
  delta?: Maybe<Scalars['numeric']['output']>;
  deposit_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  redemption_id?: Maybe<Scalars['String']['output']>;
  triple_id?: Maybe<Scalars['numeric']['output']>;
};

/** order by max() on columns of table "signal" */
export type Signals_Max_Order_By = {
  account_id?: InputMaybe<Order_By>;
  atom_id?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  delta?: InputMaybe<Order_By>;
  deposit_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  redemption_id?: InputMaybe<Order_By>;
  triple_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Signals_Min_Fields = {
  __typename?: 'signals_min_fields';
  account_id?: Maybe<Scalars['String']['output']>;
  atom_id?: Maybe<Scalars['numeric']['output']>;
  block_number?: Maybe<Scalars['numeric']['output']>;
  block_timestamp?: Maybe<Scalars['bigint']['output']>;
  delta?: Maybe<Scalars['numeric']['output']>;
  deposit_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  redemption_id?: Maybe<Scalars['String']['output']>;
  triple_id?: Maybe<Scalars['numeric']['output']>;
};

/** order by min() on columns of table "signal" */
export type Signals_Min_Order_By = {
  account_id?: InputMaybe<Order_By>;
  atom_id?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  delta?: InputMaybe<Order_By>;
  deposit_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  redemption_id?: InputMaybe<Order_By>;
  triple_id?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "signal". */
export type Signals_Order_By = {
  account?: InputMaybe<Accounts_Order_By>;
  account_id?: InputMaybe<Order_By>;
  atom?: InputMaybe<Atoms_Order_By>;
  atom_id?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  delta?: InputMaybe<Order_By>;
  deposit?: InputMaybe<Deposits_Order_By>;
  deposit_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  redemption?: InputMaybe<Redemptions_Order_By>;
  redemption_id?: InputMaybe<Order_By>;
  transaction_hash?: InputMaybe<Order_By>;
  triple?: InputMaybe<Triples_Order_By>;
  triple_id?: InputMaybe<Order_By>;
};

/** select columns of table "signal" */
export type Signals_Select_Column =
  /** column name */
  | 'account_id'
  /** column name */
  | 'atom_id'
  /** column name */
  | 'block_number'
  /** column name */
  | 'block_timestamp'
  /** column name */
  | 'delta'
  /** column name */
  | 'deposit_id'
  /** column name */
  | 'id'
  /** column name */
  | 'redemption_id'
  /** column name */
  | 'transaction_hash'
  /** column name */
  | 'triple_id';

/** aggregate stddev on columns */
export type Signals_Stddev_Fields = {
  __typename?: 'signals_stddev_fields';
  atom_id?: Maybe<Scalars['Float']['output']>;
  block_number?: Maybe<Scalars['Float']['output']>;
  block_timestamp?: Maybe<Scalars['Float']['output']>;
  delta?: Maybe<Scalars['Float']['output']>;
  triple_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "signal" */
export type Signals_Stddev_Order_By = {
  atom_id?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  delta?: InputMaybe<Order_By>;
  triple_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Signals_Stddev_Pop_Fields = {
  __typename?: 'signals_stddev_pop_fields';
  atom_id?: Maybe<Scalars['Float']['output']>;
  block_number?: Maybe<Scalars['Float']['output']>;
  block_timestamp?: Maybe<Scalars['Float']['output']>;
  delta?: Maybe<Scalars['Float']['output']>;
  triple_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "signal" */
export type Signals_Stddev_Pop_Order_By = {
  atom_id?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  delta?: InputMaybe<Order_By>;
  triple_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Signals_Stddev_Samp_Fields = {
  __typename?: 'signals_stddev_samp_fields';
  atom_id?: Maybe<Scalars['Float']['output']>;
  block_number?: Maybe<Scalars['Float']['output']>;
  block_timestamp?: Maybe<Scalars['Float']['output']>;
  delta?: Maybe<Scalars['Float']['output']>;
  triple_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "signal" */
export type Signals_Stddev_Samp_Order_By = {
  atom_id?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  delta?: InputMaybe<Order_By>;
  triple_id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "signals" */
export type Signals_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Signals_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Signals_Stream_Cursor_Value_Input = {
  account_id?: InputMaybe<Scalars['String']['input']>;
  atom_id?: InputMaybe<Scalars['numeric']['input']>;
  block_number?: InputMaybe<Scalars['numeric']['input']>;
  block_timestamp?: InputMaybe<Scalars['bigint']['input']>;
  delta?: InputMaybe<Scalars['numeric']['input']>;
  deposit_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  redemption_id?: InputMaybe<Scalars['String']['input']>;
  transaction_hash?: InputMaybe<Scalars['bytea']['input']>;
  triple_id?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Signals_Sum_Fields = {
  __typename?: 'signals_sum_fields';
  atom_id?: Maybe<Scalars['numeric']['output']>;
  block_number?: Maybe<Scalars['numeric']['output']>;
  block_timestamp?: Maybe<Scalars['bigint']['output']>;
  delta?: Maybe<Scalars['numeric']['output']>;
  triple_id?: Maybe<Scalars['numeric']['output']>;
};

/** order by sum() on columns of table "signal" */
export type Signals_Sum_Order_By = {
  atom_id?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  delta?: InputMaybe<Order_By>;
  triple_id?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Signals_Var_Pop_Fields = {
  __typename?: 'signals_var_pop_fields';
  atom_id?: Maybe<Scalars['Float']['output']>;
  block_number?: Maybe<Scalars['Float']['output']>;
  block_timestamp?: Maybe<Scalars['Float']['output']>;
  delta?: Maybe<Scalars['Float']['output']>;
  triple_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "signal" */
export type Signals_Var_Pop_Order_By = {
  atom_id?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  delta?: InputMaybe<Order_By>;
  triple_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Signals_Var_Samp_Fields = {
  __typename?: 'signals_var_samp_fields';
  atom_id?: Maybe<Scalars['Float']['output']>;
  block_number?: Maybe<Scalars['Float']['output']>;
  block_timestamp?: Maybe<Scalars['Float']['output']>;
  delta?: Maybe<Scalars['Float']['output']>;
  triple_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "signal" */
export type Signals_Var_Samp_Order_By = {
  atom_id?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  delta?: InputMaybe<Order_By>;
  triple_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Signals_Variance_Fields = {
  __typename?: 'signals_variance_fields';
  atom_id?: Maybe<Scalars['Float']['output']>;
  block_number?: Maybe<Scalars['Float']['output']>;
  block_timestamp?: Maybe<Scalars['Float']['output']>;
  delta?: Maybe<Scalars['Float']['output']>;
  triple_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "signal" */
export type Signals_Variance_Order_By = {
  atom_id?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  delta?: InputMaybe<Order_By>;
  triple_id?: InputMaybe<Order_By>;
};

/** columns and relationships of "stats" */
export type Stats = {
  __typename?: 'stats';
  contract_balance?: Maybe<Scalars['numeric']['output']>;
  id: Scalars['Int']['output'];
  total_accounts?: Maybe<Scalars['Int']['output']>;
  total_atoms?: Maybe<Scalars['Int']['output']>;
  total_fees?: Maybe<Scalars['numeric']['output']>;
  total_positions?: Maybe<Scalars['Int']['output']>;
  total_signals?: Maybe<Scalars['Int']['output']>;
  total_triples?: Maybe<Scalars['Int']['output']>;
};

/** aggregated selection of "stats" */
export type Stats_Aggregate = {
  __typename?: 'stats_aggregate';
  aggregate?: Maybe<Stats_Aggregate_Fields>;
  nodes: Array<Stats>;
};

/** aggregate fields of "stats" */
export type Stats_Aggregate_Fields = {
  __typename?: 'stats_aggregate_fields';
  avg?: Maybe<Stats_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Stats_Max_Fields>;
  min?: Maybe<Stats_Min_Fields>;
  stddev?: Maybe<Stats_Stddev_Fields>;
  stddev_pop?: Maybe<Stats_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Stats_Stddev_Samp_Fields>;
  sum?: Maybe<Stats_Sum_Fields>;
  var_pop?: Maybe<Stats_Var_Pop_Fields>;
  var_samp?: Maybe<Stats_Var_Samp_Fields>;
  variance?: Maybe<Stats_Variance_Fields>;
};


/** aggregate fields of "stats" */
export type Stats_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Stats_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Stats_Avg_Fields = {
  __typename?: 'stats_avg_fields';
  contract_balance?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  total_accounts?: Maybe<Scalars['Float']['output']>;
  total_atoms?: Maybe<Scalars['Float']['output']>;
  total_fees?: Maybe<Scalars['Float']['output']>;
  total_positions?: Maybe<Scalars['Float']['output']>;
  total_signals?: Maybe<Scalars['Float']['output']>;
  total_triples?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "stats". All fields are combined with a logical 'AND'. */
export type Stats_Bool_Exp = {
  _and?: InputMaybe<Array<Stats_Bool_Exp>>;
  _not?: InputMaybe<Stats_Bool_Exp>;
  _or?: InputMaybe<Array<Stats_Bool_Exp>>;
  contract_balance?: InputMaybe<Numeric_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  total_accounts?: InputMaybe<Int_Comparison_Exp>;
  total_atoms?: InputMaybe<Int_Comparison_Exp>;
  total_fees?: InputMaybe<Numeric_Comparison_Exp>;
  total_positions?: InputMaybe<Int_Comparison_Exp>;
  total_signals?: InputMaybe<Int_Comparison_Exp>;
  total_triples?: InputMaybe<Int_Comparison_Exp>;
};

/** aggregate max on columns */
export type Stats_Max_Fields = {
  __typename?: 'stats_max_fields';
  contract_balance?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  total_accounts?: Maybe<Scalars['Int']['output']>;
  total_atoms?: Maybe<Scalars['Int']['output']>;
  total_fees?: Maybe<Scalars['numeric']['output']>;
  total_positions?: Maybe<Scalars['Int']['output']>;
  total_signals?: Maybe<Scalars['Int']['output']>;
  total_triples?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type Stats_Min_Fields = {
  __typename?: 'stats_min_fields';
  contract_balance?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  total_accounts?: Maybe<Scalars['Int']['output']>;
  total_atoms?: Maybe<Scalars['Int']['output']>;
  total_fees?: Maybe<Scalars['numeric']['output']>;
  total_positions?: Maybe<Scalars['Int']['output']>;
  total_signals?: Maybe<Scalars['Int']['output']>;
  total_triples?: Maybe<Scalars['Int']['output']>;
};

/** Ordering options when selecting data from "stats". */
export type Stats_Order_By = {
  contract_balance?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  total_accounts?: InputMaybe<Order_By>;
  total_atoms?: InputMaybe<Order_By>;
  total_fees?: InputMaybe<Order_By>;
  total_positions?: InputMaybe<Order_By>;
  total_signals?: InputMaybe<Order_By>;
  total_triples?: InputMaybe<Order_By>;
};

/** select columns of table "stats" */
export type Stats_Select_Column =
  /** column name */
  | 'contract_balance'
  /** column name */
  | 'id'
  /** column name */
  | 'total_accounts'
  /** column name */
  | 'total_atoms'
  /** column name */
  | 'total_fees'
  /** column name */
  | 'total_positions'
  /** column name */
  | 'total_signals'
  /** column name */
  | 'total_triples';

/** aggregate stddev on columns */
export type Stats_Stddev_Fields = {
  __typename?: 'stats_stddev_fields';
  contract_balance?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  total_accounts?: Maybe<Scalars['Float']['output']>;
  total_atoms?: Maybe<Scalars['Float']['output']>;
  total_fees?: Maybe<Scalars['Float']['output']>;
  total_positions?: Maybe<Scalars['Float']['output']>;
  total_signals?: Maybe<Scalars['Float']['output']>;
  total_triples?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Stats_Stddev_Pop_Fields = {
  __typename?: 'stats_stddev_pop_fields';
  contract_balance?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  total_accounts?: Maybe<Scalars['Float']['output']>;
  total_atoms?: Maybe<Scalars['Float']['output']>;
  total_fees?: Maybe<Scalars['Float']['output']>;
  total_positions?: Maybe<Scalars['Float']['output']>;
  total_signals?: Maybe<Scalars['Float']['output']>;
  total_triples?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Stats_Stddev_Samp_Fields = {
  __typename?: 'stats_stddev_samp_fields';
  contract_balance?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  total_accounts?: Maybe<Scalars['Float']['output']>;
  total_atoms?: Maybe<Scalars['Float']['output']>;
  total_fees?: Maybe<Scalars['Float']['output']>;
  total_positions?: Maybe<Scalars['Float']['output']>;
  total_signals?: Maybe<Scalars['Float']['output']>;
  total_triples?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "stats" */
export type Stats_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Stats_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Stats_Stream_Cursor_Value_Input = {
  contract_balance?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  total_accounts?: InputMaybe<Scalars['Int']['input']>;
  total_atoms?: InputMaybe<Scalars['Int']['input']>;
  total_fees?: InputMaybe<Scalars['numeric']['input']>;
  total_positions?: InputMaybe<Scalars['Int']['input']>;
  total_signals?: InputMaybe<Scalars['Int']['input']>;
  total_triples?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Stats_Sum_Fields = {
  __typename?: 'stats_sum_fields';
  contract_balance?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  total_accounts?: Maybe<Scalars['Int']['output']>;
  total_atoms?: Maybe<Scalars['Int']['output']>;
  total_fees?: Maybe<Scalars['numeric']['output']>;
  total_positions?: Maybe<Scalars['Int']['output']>;
  total_signals?: Maybe<Scalars['Int']['output']>;
  total_triples?: Maybe<Scalars['Int']['output']>;
};

/** aggregate var_pop on columns */
export type Stats_Var_Pop_Fields = {
  __typename?: 'stats_var_pop_fields';
  contract_balance?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  total_accounts?: Maybe<Scalars['Float']['output']>;
  total_atoms?: Maybe<Scalars['Float']['output']>;
  total_fees?: Maybe<Scalars['Float']['output']>;
  total_positions?: Maybe<Scalars['Float']['output']>;
  total_signals?: Maybe<Scalars['Float']['output']>;
  total_triples?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Stats_Var_Samp_Fields = {
  __typename?: 'stats_var_samp_fields';
  contract_balance?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  total_accounts?: Maybe<Scalars['Float']['output']>;
  total_atoms?: Maybe<Scalars['Float']['output']>;
  total_fees?: Maybe<Scalars['Float']['output']>;
  total_positions?: Maybe<Scalars['Float']['output']>;
  total_signals?: Maybe<Scalars['Float']['output']>;
  total_triples?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Stats_Variance_Fields = {
  __typename?: 'stats_variance_fields';
  contract_balance?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  total_accounts?: Maybe<Scalars['Float']['output']>;
  total_atoms?: Maybe<Scalars['Float']['output']>;
  total_fees?: Maybe<Scalars['Float']['output']>;
  total_positions?: Maybe<Scalars['Float']['output']>;
  total_signals?: Maybe<Scalars['Float']['output']>;
  total_triples?: Maybe<Scalars['Float']['output']>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "account" using primary key columns */
  account?: Maybe<Accounts>;
  /** An array relationship */
  accounts: Array<Accounts>;
  /** An aggregate relationship */
  accounts_aggregate: Accounts_Aggregate;
  /** fetch data from the table in a streaming manner: "account" */
  accounts_stream: Array<Accounts>;
  /** execute function "accounts_that_claim_about_account" which returns "account" */
  accounts_that_claim_about_account: Array<Accounts>;
  /** execute function "accounts_that_claim_about_account" and query aggregates on result of table type "account" */
  accounts_that_claim_about_account_aggregate: Accounts_Aggregate;
  /** fetch data from the table: "atom" using primary key columns */
  atom?: Maybe<Atoms>;
  /** fetch data from the table: "atom_value" using primary key columns */
  atom_value?: Maybe<Atom_Values>;
  /** fetch data from the table: "atom_value" */
  atom_values: Array<Atom_Values>;
  /** fetch aggregated fields from the table: "atom_value" */
  atom_values_aggregate: Atom_Values_Aggregate;
  /** fetch data from the table in a streaming manner: "atom_value" */
  atom_values_stream: Array<Atom_Values>;
  /** An array relationship */
  atoms: Array<Atoms>;
  /** An aggregate relationship */
  atoms_aggregate: Atoms_Aggregate;
  /** fetch data from the table in a streaming manner: "atom" */
  atoms_stream: Array<Atoms>;
  /** fetch data from the table: "book" using primary key columns */
  book?: Maybe<Books>;
  /** fetch data from the table: "book" */
  books: Array<Books>;
  /** fetch aggregated fields from the table: "book" */
  books_aggregate: Books_Aggregate;
  /** fetch data from the table in a streaming manner: "book" */
  books_stream: Array<Books>;
  /** fetch data from the table: "chainlink_price" using primary key columns */
  chainlink_price?: Maybe<Chainlink_Prices>;
  /** fetch data from the table: "chainlink_price" */
  chainlink_prices: Array<Chainlink_Prices>;
  /** fetch data from the table in a streaming manner: "chainlink_price" */
  chainlink_prices_stream: Array<Chainlink_Prices>;
  /** fetch data from the table: "claim" using primary key columns */
  claim?: Maybe<Claims>;
  /** An array relationship */
  claims: Array<Claims>;
  /** An aggregate relationship */
  claims_aggregate: Claims_Aggregate;
  /** execute function "claims_from_following" which returns "claim" */
  claims_from_following: Array<Claims>;
  /** execute function "claims_from_following" and query aggregates on result of table type "claim" */
  claims_from_following_aggregate: Claims_Aggregate;
  /** fetch data from the table in a streaming manner: "claim" */
  claims_stream: Array<Claims>;
  /** fetch data from the table: "deposit" using primary key columns */
  deposit?: Maybe<Deposits>;
  /** An array relationship */
  deposits: Array<Deposits>;
  /** An aggregate relationship */
  deposits_aggregate: Deposits_Aggregate;
  /** fetch data from the table in a streaming manner: "deposit" */
  deposits_stream: Array<Deposits>;
  /** fetch data from the table: "event" using primary key columns */
  event?: Maybe<Events>;
  /** An array relationship */
  events: Array<Events>;
  /** An aggregate relationship */
  events_aggregate: Events_Aggregate;
  /** fetch data from the table in a streaming manner: "event" */
  events_stream: Array<Events>;
  /** fetch data from the table: "fee_transfer" using primary key columns */
  fee_transfer?: Maybe<Fee_Transfers>;
  /** An array relationship */
  fee_transfers: Array<Fee_Transfers>;
  /** An aggregate relationship */
  fee_transfers_aggregate: Fee_Transfers_Aggregate;
  /** fetch data from the table in a streaming manner: "fee_transfer" */
  fee_transfers_stream: Array<Fee_Transfers>;
  /** execute function "following" which returns "account" */
  following: Array<Accounts>;
  /** execute function "following" and query aggregates on result of table type "account" */
  following_aggregate: Accounts_Aggregate;
  /** fetch data from the table: "organization" using primary key columns */
  organization?: Maybe<Organizations>;
  /** fetch data from the table: "organization" */
  organizations: Array<Organizations>;
  /** fetch aggregated fields from the table: "organization" */
  organizations_aggregate: Organizations_Aggregate;
  /** fetch data from the table in a streaming manner: "organization" */
  organizations_stream: Array<Organizations>;
  /** fetch data from the table: "person" using primary key columns */
  person?: Maybe<Persons>;
  /** fetch data from the table: "person" */
  persons: Array<Persons>;
  /** fetch aggregated fields from the table: "person" */
  persons_aggregate: Persons_Aggregate;
  /** fetch data from the table in a streaming manner: "person" */
  persons_stream: Array<Persons>;
  /** fetch data from the table: "position" using primary key columns */
  position?: Maybe<Positions>;
  /** An array relationship */
  positions: Array<Positions>;
  /** An aggregate relationship */
  positions_aggregate: Positions_Aggregate;
  /** fetch data from the table in a streaming manner: "position" */
  positions_stream: Array<Positions>;
  /** fetch data from the table: "predicate_object" */
  predicate_objects: Array<Predicate_Objects>;
  /** fetch aggregated fields from the table: "predicate_object" */
  predicate_objects_aggregate: Predicate_Objects_Aggregate;
  /** fetch data from the table: "predicate_object" using primary key columns */
  predicate_objects_by_pk?: Maybe<Predicate_Objects>;
  /** fetch data from the table in a streaming manner: "predicate_object" */
  predicate_objects_stream: Array<Predicate_Objects>;
  /** fetch data from the table: "redemption" using primary key columns */
  redemption?: Maybe<Redemptions>;
  /** An array relationship */
  redemptions: Array<Redemptions>;
  /** An aggregate relationship */
  redemptions_aggregate: Redemptions_Aggregate;
  /** fetch data from the table in a streaming manner: "redemption" */
  redemptions_stream: Array<Redemptions>;
  /** fetch data from the table: "signal" using primary key columns */
  signal?: Maybe<Signals>;
  /** An array relationship */
  signals: Array<Signals>;
  /** An aggregate relationship */
  signals_aggregate: Signals_Aggregate;
  /** execute function "signals_from_following" which returns "signal" */
  signals_from_following: Array<Signals>;
  /** execute function "signals_from_following" and query aggregates on result of table type "signal" */
  signals_from_following_aggregate: Signals_Aggregate;
  /** fetch data from the table in a streaming manner: "signal" */
  signals_stream: Array<Signals>;
  /** fetch data from the table: "stats" using primary key columns */
  stat?: Maybe<Stats>;
  /** fetch data from the table: "stats" */
  stats: Array<Stats>;
  /** fetch aggregated fields from the table: "stats" */
  stats_aggregate: Stats_Aggregate;
  /** fetch data from the table in a streaming manner: "stats" */
  stats_stream: Array<Stats>;
  /** fetch data from the table: "thing" using primary key columns */
  thing?: Maybe<Things>;
  /** fetch data from the table: "thing" */
  things: Array<Things>;
  /** fetch aggregated fields from the table: "thing" */
  things_aggregate: Things_Aggregate;
  /** fetch data from the table in a streaming manner: "thing" */
  things_stream: Array<Things>;
  /** fetch data from the table: "triple" using primary key columns */
  triple?: Maybe<Triples>;
  /** An array relationship */
  triples: Array<Triples>;
  /** An aggregate relationship */
  triples_aggregate: Triples_Aggregate;
  /** fetch data from the table in a streaming manner: "triple" */
  triples_stream: Array<Triples>;
  /** fetch data from the table: "vault" using primary key columns */
  vault?: Maybe<Vaults>;
  /** fetch data from the table: "vault" */
  vaults: Array<Vaults>;
  /** fetch aggregated fields from the table: "vault" */
  vaults_aggregate: Vaults_Aggregate;
  /** fetch data from the table in a streaming manner: "vault" */
  vaults_stream: Array<Vaults>;
};


export type Subscription_RootAccountArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootAccountsArgs = {
  distinct_on?: InputMaybe<Array<Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Accounts_Order_By>>;
  where?: InputMaybe<Accounts_Bool_Exp>;
};


export type Subscription_RootAccounts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Accounts_Order_By>>;
  where?: InputMaybe<Accounts_Bool_Exp>;
};


export type Subscription_RootAccounts_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Accounts_Stream_Cursor_Input>>;
  where?: InputMaybe<Accounts_Bool_Exp>;
};


export type Subscription_RootAccounts_That_Claim_About_AccountArgs = {
  args: Accounts_That_Claim_About_Account_Args;
  distinct_on?: InputMaybe<Array<Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Accounts_Order_By>>;
  where?: InputMaybe<Accounts_Bool_Exp>;
};


export type Subscription_RootAccounts_That_Claim_About_Account_AggregateArgs = {
  args: Accounts_That_Claim_About_Account_Args;
  distinct_on?: InputMaybe<Array<Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Accounts_Order_By>>;
  where?: InputMaybe<Accounts_Bool_Exp>;
};


export type Subscription_RootAtomArgs = {
  id: Scalars['numeric']['input'];
};


export type Subscription_RootAtom_ValueArgs = {
  id: Scalars['numeric']['input'];
};


export type Subscription_RootAtom_ValuesArgs = {
  distinct_on?: InputMaybe<Array<Atom_Values_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Atom_Values_Order_By>>;
  where?: InputMaybe<Atom_Values_Bool_Exp>;
};


export type Subscription_RootAtom_Values_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Atom_Values_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Atom_Values_Order_By>>;
  where?: InputMaybe<Atom_Values_Bool_Exp>;
};


export type Subscription_RootAtom_Values_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Atom_Values_Stream_Cursor_Input>>;
  where?: InputMaybe<Atom_Values_Bool_Exp>;
};


export type Subscription_RootAtomsArgs = {
  distinct_on?: InputMaybe<Array<Atoms_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Atoms_Order_By>>;
  where?: InputMaybe<Atoms_Bool_Exp>;
};


export type Subscription_RootAtoms_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Atoms_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Atoms_Order_By>>;
  where?: InputMaybe<Atoms_Bool_Exp>;
};


export type Subscription_RootAtoms_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Atoms_Stream_Cursor_Input>>;
  where?: InputMaybe<Atoms_Bool_Exp>;
};


export type Subscription_RootBookArgs = {
  id: Scalars['numeric']['input'];
};


export type Subscription_RootBooksArgs = {
  distinct_on?: InputMaybe<Array<Books_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Books_Order_By>>;
  where?: InputMaybe<Books_Bool_Exp>;
};


export type Subscription_RootBooks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Books_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Books_Order_By>>;
  where?: InputMaybe<Books_Bool_Exp>;
};


export type Subscription_RootBooks_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Books_Stream_Cursor_Input>>;
  where?: InputMaybe<Books_Bool_Exp>;
};


export type Subscription_RootChainlink_PriceArgs = {
  id: Scalars['numeric']['input'];
};


export type Subscription_RootChainlink_PricesArgs = {
  distinct_on?: InputMaybe<Array<Chainlink_Prices_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Chainlink_Prices_Order_By>>;
  where?: InputMaybe<Chainlink_Prices_Bool_Exp>;
};


export type Subscription_RootChainlink_Prices_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Chainlink_Prices_Stream_Cursor_Input>>;
  where?: InputMaybe<Chainlink_Prices_Bool_Exp>;
};


export type Subscription_RootClaimArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootClaimsArgs = {
  distinct_on?: InputMaybe<Array<Claims_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Claims_Order_By>>;
  where?: InputMaybe<Claims_Bool_Exp>;
};


export type Subscription_RootClaims_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Claims_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Claims_Order_By>>;
  where?: InputMaybe<Claims_Bool_Exp>;
};


export type Subscription_RootClaims_From_FollowingArgs = {
  args: Claims_From_Following_Args;
  distinct_on?: InputMaybe<Array<Claims_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Claims_Order_By>>;
  where?: InputMaybe<Claims_Bool_Exp>;
};


export type Subscription_RootClaims_From_Following_AggregateArgs = {
  args: Claims_From_Following_Args;
  distinct_on?: InputMaybe<Array<Claims_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Claims_Order_By>>;
  where?: InputMaybe<Claims_Bool_Exp>;
};


export type Subscription_RootClaims_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Claims_Stream_Cursor_Input>>;
  where?: InputMaybe<Claims_Bool_Exp>;
};


export type Subscription_RootDepositArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootDepositsArgs = {
  distinct_on?: InputMaybe<Array<Deposits_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Deposits_Order_By>>;
  where?: InputMaybe<Deposits_Bool_Exp>;
};


export type Subscription_RootDeposits_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Deposits_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Deposits_Order_By>>;
  where?: InputMaybe<Deposits_Bool_Exp>;
};


export type Subscription_RootDeposits_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Deposits_Stream_Cursor_Input>>;
  where?: InputMaybe<Deposits_Bool_Exp>;
};


export type Subscription_RootEventArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootEventsArgs = {
  distinct_on?: InputMaybe<Array<Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Events_Order_By>>;
  where?: InputMaybe<Events_Bool_Exp>;
};


export type Subscription_RootEvents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Events_Order_By>>;
  where?: InputMaybe<Events_Bool_Exp>;
};


export type Subscription_RootEvents_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Events_Stream_Cursor_Input>>;
  where?: InputMaybe<Events_Bool_Exp>;
};


export type Subscription_RootFee_TransferArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootFee_TransfersArgs = {
  distinct_on?: InputMaybe<Array<Fee_Transfers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Fee_Transfers_Order_By>>;
  where?: InputMaybe<Fee_Transfers_Bool_Exp>;
};


export type Subscription_RootFee_Transfers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Fee_Transfers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Fee_Transfers_Order_By>>;
  where?: InputMaybe<Fee_Transfers_Bool_Exp>;
};


export type Subscription_RootFee_Transfers_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Fee_Transfers_Stream_Cursor_Input>>;
  where?: InputMaybe<Fee_Transfers_Bool_Exp>;
};


export type Subscription_RootFollowingArgs = {
  args: Following_Args;
  distinct_on?: InputMaybe<Array<Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Accounts_Order_By>>;
  where?: InputMaybe<Accounts_Bool_Exp>;
};


export type Subscription_RootFollowing_AggregateArgs = {
  args: Following_Args;
  distinct_on?: InputMaybe<Array<Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Accounts_Order_By>>;
  where?: InputMaybe<Accounts_Bool_Exp>;
};


export type Subscription_RootOrganizationArgs = {
  id: Scalars['numeric']['input'];
};


export type Subscription_RootOrganizationsArgs = {
  distinct_on?: InputMaybe<Array<Organizations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Organizations_Order_By>>;
  where?: InputMaybe<Organizations_Bool_Exp>;
};


export type Subscription_RootOrganizations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Organizations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Organizations_Order_By>>;
  where?: InputMaybe<Organizations_Bool_Exp>;
};


export type Subscription_RootOrganizations_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Organizations_Stream_Cursor_Input>>;
  where?: InputMaybe<Organizations_Bool_Exp>;
};


export type Subscription_RootPersonArgs = {
  id: Scalars['numeric']['input'];
};


export type Subscription_RootPersonsArgs = {
  distinct_on?: InputMaybe<Array<Persons_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Persons_Order_By>>;
  where?: InputMaybe<Persons_Bool_Exp>;
};


export type Subscription_RootPersons_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Persons_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Persons_Order_By>>;
  where?: InputMaybe<Persons_Bool_Exp>;
};


export type Subscription_RootPersons_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Persons_Stream_Cursor_Input>>;
  where?: InputMaybe<Persons_Bool_Exp>;
};


export type Subscription_RootPositionArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootPositionsArgs = {
  distinct_on?: InputMaybe<Array<Positions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Positions_Order_By>>;
  where?: InputMaybe<Positions_Bool_Exp>;
};


export type Subscription_RootPositions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Positions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Positions_Order_By>>;
  where?: InputMaybe<Positions_Bool_Exp>;
};


export type Subscription_RootPositions_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Positions_Stream_Cursor_Input>>;
  where?: InputMaybe<Positions_Bool_Exp>;
};


export type Subscription_RootPredicate_ObjectsArgs = {
  distinct_on?: InputMaybe<Array<Predicate_Objects_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Predicate_Objects_Order_By>>;
  where?: InputMaybe<Predicate_Objects_Bool_Exp>;
};


export type Subscription_RootPredicate_Objects_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Predicate_Objects_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Predicate_Objects_Order_By>>;
  where?: InputMaybe<Predicate_Objects_Bool_Exp>;
};


export type Subscription_RootPredicate_Objects_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootPredicate_Objects_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Predicate_Objects_Stream_Cursor_Input>>;
  where?: InputMaybe<Predicate_Objects_Bool_Exp>;
};


export type Subscription_RootRedemptionArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootRedemptionsArgs = {
  distinct_on?: InputMaybe<Array<Redemptions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Redemptions_Order_By>>;
  where?: InputMaybe<Redemptions_Bool_Exp>;
};


export type Subscription_RootRedemptions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Redemptions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Redemptions_Order_By>>;
  where?: InputMaybe<Redemptions_Bool_Exp>;
};


export type Subscription_RootRedemptions_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Redemptions_Stream_Cursor_Input>>;
  where?: InputMaybe<Redemptions_Bool_Exp>;
};


export type Subscription_RootSignalArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootSignalsArgs = {
  distinct_on?: InputMaybe<Array<Signals_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Signals_Order_By>>;
  where?: InputMaybe<Signals_Bool_Exp>;
};


export type Subscription_RootSignals_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Signals_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Signals_Order_By>>;
  where?: InputMaybe<Signals_Bool_Exp>;
};


export type Subscription_RootSignals_From_FollowingArgs = {
  args: Signals_From_Following_Args;
  distinct_on?: InputMaybe<Array<Signals_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Signals_Order_By>>;
  where?: InputMaybe<Signals_Bool_Exp>;
};


export type Subscription_RootSignals_From_Following_AggregateArgs = {
  args: Signals_From_Following_Args;
  distinct_on?: InputMaybe<Array<Signals_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Signals_Order_By>>;
  where?: InputMaybe<Signals_Bool_Exp>;
};


export type Subscription_RootSignals_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Signals_Stream_Cursor_Input>>;
  where?: InputMaybe<Signals_Bool_Exp>;
};


export type Subscription_RootStatArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootStatsArgs = {
  distinct_on?: InputMaybe<Array<Stats_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Stats_Order_By>>;
  where?: InputMaybe<Stats_Bool_Exp>;
};


export type Subscription_RootStats_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Stats_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Stats_Order_By>>;
  where?: InputMaybe<Stats_Bool_Exp>;
};


export type Subscription_RootStats_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Stats_Stream_Cursor_Input>>;
  where?: InputMaybe<Stats_Bool_Exp>;
};


export type Subscription_RootThingArgs = {
  id: Scalars['numeric']['input'];
};


export type Subscription_RootThingsArgs = {
  distinct_on?: InputMaybe<Array<Things_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Things_Order_By>>;
  where?: InputMaybe<Things_Bool_Exp>;
};


export type Subscription_RootThings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Things_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Things_Order_By>>;
  where?: InputMaybe<Things_Bool_Exp>;
};


export type Subscription_RootThings_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Things_Stream_Cursor_Input>>;
  where?: InputMaybe<Things_Bool_Exp>;
};


export type Subscription_RootTripleArgs = {
  id: Scalars['numeric']['input'];
};


export type Subscription_RootTriplesArgs = {
  distinct_on?: InputMaybe<Array<Triples_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Triples_Order_By>>;
  where?: InputMaybe<Triples_Bool_Exp>;
};


export type Subscription_RootTriples_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Triples_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Triples_Order_By>>;
  where?: InputMaybe<Triples_Bool_Exp>;
};


export type Subscription_RootTriples_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Triples_Stream_Cursor_Input>>;
  where?: InputMaybe<Triples_Bool_Exp>;
};


export type Subscription_RootVaultArgs = {
  id: Scalars['numeric']['input'];
};


export type Subscription_RootVaultsArgs = {
  distinct_on?: InputMaybe<Array<Vaults_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Vaults_Order_By>>;
  where?: InputMaybe<Vaults_Bool_Exp>;
};


export type Subscription_RootVaults_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Vaults_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Vaults_Order_By>>;
  where?: InputMaybe<Vaults_Bool_Exp>;
};


export type Subscription_RootVaults_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Vaults_Stream_Cursor_Input>>;
  where?: InputMaybe<Vaults_Bool_Exp>;
};

/** columns and relationships of "thing" */
export type Things = {
  __typename?: 'things';
  /** An object relationship */
  atom?: Maybe<Things>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['numeric']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

/** aggregated selection of "thing" */
export type Things_Aggregate = {
  __typename?: 'things_aggregate';
  aggregate?: Maybe<Things_Aggregate_Fields>;
  nodes: Array<Things>;
};

/** aggregate fields of "thing" */
export type Things_Aggregate_Fields = {
  __typename?: 'things_aggregate_fields';
  avg?: Maybe<Things_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Things_Max_Fields>;
  min?: Maybe<Things_Min_Fields>;
  stddev?: Maybe<Things_Stddev_Fields>;
  stddev_pop?: Maybe<Things_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Things_Stddev_Samp_Fields>;
  sum?: Maybe<Things_Sum_Fields>;
  var_pop?: Maybe<Things_Var_Pop_Fields>;
  var_samp?: Maybe<Things_Var_Samp_Fields>;
  variance?: Maybe<Things_Variance_Fields>;
};


/** aggregate fields of "thing" */
export type Things_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Things_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Things_Avg_Fields = {
  __typename?: 'things_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "thing". All fields are combined with a logical 'AND'. */
export type Things_Bool_Exp = {
  _and?: InputMaybe<Array<Things_Bool_Exp>>;
  _not?: InputMaybe<Things_Bool_Exp>;
  _or?: InputMaybe<Array<Things_Bool_Exp>>;
  atom?: InputMaybe<Things_Bool_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Numeric_Comparison_Exp>;
  image?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  url?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Things_Max_Fields = {
  __typename?: 'things_max_fields';
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['numeric']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Things_Min_Fields = {
  __typename?: 'things_min_fields';
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['numeric']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

/** Ordering options when selecting data from "thing". */
export type Things_Order_By = {
  atom?: InputMaybe<Things_Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  url?: InputMaybe<Order_By>;
};

/** select columns of table "thing" */
export type Things_Select_Column =
  /** column name */
  | 'description'
  /** column name */
  | 'id'
  /** column name */
  | 'image'
  /** column name */
  | 'name'
  /** column name */
  | 'url';

/** aggregate stddev on columns */
export type Things_Stddev_Fields = {
  __typename?: 'things_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Things_Stddev_Pop_Fields = {
  __typename?: 'things_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Things_Stddev_Samp_Fields = {
  __typename?: 'things_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "things" */
export type Things_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Things_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Things_Stream_Cursor_Value_Input = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['numeric']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Things_Sum_Fields = {
  __typename?: 'things_sum_fields';
  id?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Things_Var_Pop_Fields = {
  __typename?: 'things_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Things_Var_Samp_Fields = {
  __typename?: 'things_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Things_Variance_Fields = {
  __typename?: 'things_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "triple" */
export type Triples = {
  __typename?: 'triples';
  block_number: Scalars['numeric']['output'];
  block_timestamp: Scalars['bigint']['output'];
  /** An array relationship */
  claims: Array<Claims>;
  /** An aggregate relationship */
  claims_aggregate: Claims_Aggregate;
  /** An object relationship */
  counter_vault?: Maybe<Vaults>;
  counter_vault_id: Scalars['numeric']['output'];
  /** An object relationship */
  creator?: Maybe<Accounts>;
  creator_id: Scalars['String']['output'];
  id: Scalars['numeric']['output'];
  /** An object relationship */
  object: Atoms;
  object_id: Scalars['numeric']['output'];
  /** An object relationship */
  predicate: Atoms;
  predicate_id: Scalars['numeric']['output'];
  /** An array relationship */
  signals: Array<Signals>;
  /** An aggregate relationship */
  signals_aggregate: Signals_Aggregate;
  /** An object relationship */
  subject: Atoms;
  subject_id: Scalars['numeric']['output'];
  transaction_hash: Scalars['bytea']['output'];
  /** An object relationship */
  vault?: Maybe<Vaults>;
  vault_id: Scalars['numeric']['output'];
};


/** columns and relationships of "triple" */
export type TriplesClaimsArgs = {
  distinct_on?: InputMaybe<Array<Claims_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Claims_Order_By>>;
  where?: InputMaybe<Claims_Bool_Exp>;
};


/** columns and relationships of "triple" */
export type TriplesClaims_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Claims_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Claims_Order_By>>;
  where?: InputMaybe<Claims_Bool_Exp>;
};


/** columns and relationships of "triple" */
export type TriplesSignalsArgs = {
  distinct_on?: InputMaybe<Array<Signals_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Signals_Order_By>>;
  where?: InputMaybe<Signals_Bool_Exp>;
};


/** columns and relationships of "triple" */
export type TriplesSignals_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Signals_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Signals_Order_By>>;
  where?: InputMaybe<Signals_Bool_Exp>;
};

/** aggregated selection of "triple" */
export type Triples_Aggregate = {
  __typename?: 'triples_aggregate';
  aggregate?: Maybe<Triples_Aggregate_Fields>;
  nodes: Array<Triples>;
};

export type Triples_Aggregate_Bool_Exp = {
  count?: InputMaybe<Triples_Aggregate_Bool_Exp_Count>;
};

export type Triples_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Triples_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Triples_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "triple" */
export type Triples_Aggregate_Fields = {
  __typename?: 'triples_aggregate_fields';
  avg?: Maybe<Triples_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Triples_Max_Fields>;
  min?: Maybe<Triples_Min_Fields>;
  stddev?: Maybe<Triples_Stddev_Fields>;
  stddev_pop?: Maybe<Triples_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Triples_Stddev_Samp_Fields>;
  sum?: Maybe<Triples_Sum_Fields>;
  var_pop?: Maybe<Triples_Var_Pop_Fields>;
  var_samp?: Maybe<Triples_Var_Samp_Fields>;
  variance?: Maybe<Triples_Variance_Fields>;
};


/** aggregate fields of "triple" */
export type Triples_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Triples_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "triple" */
export type Triples_Aggregate_Order_By = {
  avg?: InputMaybe<Triples_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Triples_Max_Order_By>;
  min?: InputMaybe<Triples_Min_Order_By>;
  stddev?: InputMaybe<Triples_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Triples_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Triples_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Triples_Sum_Order_By>;
  var_pop?: InputMaybe<Triples_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Triples_Var_Samp_Order_By>;
  variance?: InputMaybe<Triples_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Triples_Avg_Fields = {
  __typename?: 'triples_avg_fields';
  block_number?: Maybe<Scalars['Float']['output']>;
  block_timestamp?: Maybe<Scalars['Float']['output']>;
  counter_vault_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  object_id?: Maybe<Scalars['Float']['output']>;
  predicate_id?: Maybe<Scalars['Float']['output']>;
  subject_id?: Maybe<Scalars['Float']['output']>;
  vault_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "triple" */
export type Triples_Avg_Order_By = {
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  counter_vault_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  object_id?: InputMaybe<Order_By>;
  predicate_id?: InputMaybe<Order_By>;
  subject_id?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "triple". All fields are combined with a logical 'AND'. */
export type Triples_Bool_Exp = {
  _and?: InputMaybe<Array<Triples_Bool_Exp>>;
  _not?: InputMaybe<Triples_Bool_Exp>;
  _or?: InputMaybe<Array<Triples_Bool_Exp>>;
  block_number?: InputMaybe<Numeric_Comparison_Exp>;
  block_timestamp?: InputMaybe<Bigint_Comparison_Exp>;
  claims?: InputMaybe<Claims_Bool_Exp>;
  claims_aggregate?: InputMaybe<Claims_Aggregate_Bool_Exp>;
  counter_vault?: InputMaybe<Vaults_Bool_Exp>;
  counter_vault_id?: InputMaybe<Numeric_Comparison_Exp>;
  creator?: InputMaybe<Accounts_Bool_Exp>;
  creator_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Numeric_Comparison_Exp>;
  object?: InputMaybe<Atoms_Bool_Exp>;
  object_id?: InputMaybe<Numeric_Comparison_Exp>;
  predicate?: InputMaybe<Atoms_Bool_Exp>;
  predicate_id?: InputMaybe<Numeric_Comparison_Exp>;
  signals?: InputMaybe<Signals_Bool_Exp>;
  signals_aggregate?: InputMaybe<Signals_Aggregate_Bool_Exp>;
  subject?: InputMaybe<Atoms_Bool_Exp>;
  subject_id?: InputMaybe<Numeric_Comparison_Exp>;
  transaction_hash?: InputMaybe<Bytea_Comparison_Exp>;
  vault?: InputMaybe<Vaults_Bool_Exp>;
  vault_id?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Triples_Max_Fields = {
  __typename?: 'triples_max_fields';
  block_number?: Maybe<Scalars['numeric']['output']>;
  block_timestamp?: Maybe<Scalars['bigint']['output']>;
  counter_vault_id?: Maybe<Scalars['numeric']['output']>;
  creator_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['numeric']['output']>;
  object_id?: Maybe<Scalars['numeric']['output']>;
  predicate_id?: Maybe<Scalars['numeric']['output']>;
  subject_id?: Maybe<Scalars['numeric']['output']>;
  vault_id?: Maybe<Scalars['numeric']['output']>;
};

/** order by max() on columns of table "triple" */
export type Triples_Max_Order_By = {
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  counter_vault_id?: InputMaybe<Order_By>;
  creator_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  object_id?: InputMaybe<Order_By>;
  predicate_id?: InputMaybe<Order_By>;
  subject_id?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Triples_Min_Fields = {
  __typename?: 'triples_min_fields';
  block_number?: Maybe<Scalars['numeric']['output']>;
  block_timestamp?: Maybe<Scalars['bigint']['output']>;
  counter_vault_id?: Maybe<Scalars['numeric']['output']>;
  creator_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['numeric']['output']>;
  object_id?: Maybe<Scalars['numeric']['output']>;
  predicate_id?: Maybe<Scalars['numeric']['output']>;
  subject_id?: Maybe<Scalars['numeric']['output']>;
  vault_id?: Maybe<Scalars['numeric']['output']>;
};

/** order by min() on columns of table "triple" */
export type Triples_Min_Order_By = {
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  counter_vault_id?: InputMaybe<Order_By>;
  creator_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  object_id?: InputMaybe<Order_By>;
  predicate_id?: InputMaybe<Order_By>;
  subject_id?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "triple". */
export type Triples_Order_By = {
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  claims_aggregate?: InputMaybe<Claims_Aggregate_Order_By>;
  counter_vault?: InputMaybe<Vaults_Order_By>;
  counter_vault_id?: InputMaybe<Order_By>;
  creator?: InputMaybe<Accounts_Order_By>;
  creator_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  object?: InputMaybe<Atoms_Order_By>;
  object_id?: InputMaybe<Order_By>;
  predicate?: InputMaybe<Atoms_Order_By>;
  predicate_id?: InputMaybe<Order_By>;
  signals_aggregate?: InputMaybe<Signals_Aggregate_Order_By>;
  subject?: InputMaybe<Atoms_Order_By>;
  subject_id?: InputMaybe<Order_By>;
  transaction_hash?: InputMaybe<Order_By>;
  vault?: InputMaybe<Vaults_Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** select columns of table "triple" */
export type Triples_Select_Column =
  /** column name */
  | 'block_number'
  /** column name */
  | 'block_timestamp'
  /** column name */
  | 'counter_vault_id'
  /** column name */
  | 'creator_id'
  /** column name */
  | 'id'
  /** column name */
  | 'object_id'
  /** column name */
  | 'predicate_id'
  /** column name */
  | 'subject_id'
  /** column name */
  | 'transaction_hash'
  /** column name */
  | 'vault_id';

/** aggregate stddev on columns */
export type Triples_Stddev_Fields = {
  __typename?: 'triples_stddev_fields';
  block_number?: Maybe<Scalars['Float']['output']>;
  block_timestamp?: Maybe<Scalars['Float']['output']>;
  counter_vault_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  object_id?: Maybe<Scalars['Float']['output']>;
  predicate_id?: Maybe<Scalars['Float']['output']>;
  subject_id?: Maybe<Scalars['Float']['output']>;
  vault_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "triple" */
export type Triples_Stddev_Order_By = {
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  counter_vault_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  object_id?: InputMaybe<Order_By>;
  predicate_id?: InputMaybe<Order_By>;
  subject_id?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Triples_Stddev_Pop_Fields = {
  __typename?: 'triples_stddev_pop_fields';
  block_number?: Maybe<Scalars['Float']['output']>;
  block_timestamp?: Maybe<Scalars['Float']['output']>;
  counter_vault_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  object_id?: Maybe<Scalars['Float']['output']>;
  predicate_id?: Maybe<Scalars['Float']['output']>;
  subject_id?: Maybe<Scalars['Float']['output']>;
  vault_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "triple" */
export type Triples_Stddev_Pop_Order_By = {
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  counter_vault_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  object_id?: InputMaybe<Order_By>;
  predicate_id?: InputMaybe<Order_By>;
  subject_id?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Triples_Stddev_Samp_Fields = {
  __typename?: 'triples_stddev_samp_fields';
  block_number?: Maybe<Scalars['Float']['output']>;
  block_timestamp?: Maybe<Scalars['Float']['output']>;
  counter_vault_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  object_id?: Maybe<Scalars['Float']['output']>;
  predicate_id?: Maybe<Scalars['Float']['output']>;
  subject_id?: Maybe<Scalars['Float']['output']>;
  vault_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "triple" */
export type Triples_Stddev_Samp_Order_By = {
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  counter_vault_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  object_id?: InputMaybe<Order_By>;
  predicate_id?: InputMaybe<Order_By>;
  subject_id?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "triples" */
export type Triples_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Triples_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Triples_Stream_Cursor_Value_Input = {
  block_number?: InputMaybe<Scalars['numeric']['input']>;
  block_timestamp?: InputMaybe<Scalars['bigint']['input']>;
  counter_vault_id?: InputMaybe<Scalars['numeric']['input']>;
  creator_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['numeric']['input']>;
  object_id?: InputMaybe<Scalars['numeric']['input']>;
  predicate_id?: InputMaybe<Scalars['numeric']['input']>;
  subject_id?: InputMaybe<Scalars['numeric']['input']>;
  transaction_hash?: InputMaybe<Scalars['bytea']['input']>;
  vault_id?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Triples_Sum_Fields = {
  __typename?: 'triples_sum_fields';
  block_number?: Maybe<Scalars['numeric']['output']>;
  block_timestamp?: Maybe<Scalars['bigint']['output']>;
  counter_vault_id?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['numeric']['output']>;
  object_id?: Maybe<Scalars['numeric']['output']>;
  predicate_id?: Maybe<Scalars['numeric']['output']>;
  subject_id?: Maybe<Scalars['numeric']['output']>;
  vault_id?: Maybe<Scalars['numeric']['output']>;
};

/** order by sum() on columns of table "triple" */
export type Triples_Sum_Order_By = {
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  counter_vault_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  object_id?: InputMaybe<Order_By>;
  predicate_id?: InputMaybe<Order_By>;
  subject_id?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Triples_Var_Pop_Fields = {
  __typename?: 'triples_var_pop_fields';
  block_number?: Maybe<Scalars['Float']['output']>;
  block_timestamp?: Maybe<Scalars['Float']['output']>;
  counter_vault_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  object_id?: Maybe<Scalars['Float']['output']>;
  predicate_id?: Maybe<Scalars['Float']['output']>;
  subject_id?: Maybe<Scalars['Float']['output']>;
  vault_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "triple" */
export type Triples_Var_Pop_Order_By = {
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  counter_vault_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  object_id?: InputMaybe<Order_By>;
  predicate_id?: InputMaybe<Order_By>;
  subject_id?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Triples_Var_Samp_Fields = {
  __typename?: 'triples_var_samp_fields';
  block_number?: Maybe<Scalars['Float']['output']>;
  block_timestamp?: Maybe<Scalars['Float']['output']>;
  counter_vault_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  object_id?: Maybe<Scalars['Float']['output']>;
  predicate_id?: Maybe<Scalars['Float']['output']>;
  subject_id?: Maybe<Scalars['Float']['output']>;
  vault_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "triple" */
export type Triples_Var_Samp_Order_By = {
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  counter_vault_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  object_id?: InputMaybe<Order_By>;
  predicate_id?: InputMaybe<Order_By>;
  subject_id?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Triples_Variance_Fields = {
  __typename?: 'triples_variance_fields';
  block_number?: Maybe<Scalars['Float']['output']>;
  block_timestamp?: Maybe<Scalars['Float']['output']>;
  counter_vault_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  object_id?: Maybe<Scalars['Float']['output']>;
  predicate_id?: Maybe<Scalars['Float']['output']>;
  subject_id?: Maybe<Scalars['Float']['output']>;
  vault_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "triple" */
export type Triples_Variance_Order_By = {
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  counter_vault_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  object_id?: InputMaybe<Order_By>;
  predicate_id?: InputMaybe<Order_By>;
  subject_id?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** columns and relationships of "vault" */
export type Vaults = {
  __typename?: 'vaults';
  /** An object relationship */
  atom?: Maybe<Atoms>;
  atom_id?: Maybe<Scalars['numeric']['output']>;
  /** An array relationship */
  claims: Array<Claims>;
  /** An aggregate relationship */
  claims_aggregate: Claims_Aggregate;
  /** An array relationship */
  counter_claims: Array<Claims>;
  /** An aggregate relationship */
  counter_claims_aggregate: Claims_Aggregate;
  current_share_price: Scalars['numeric']['output'];
  /** An array relationship */
  deposits: Array<Deposits>;
  /** An aggregate relationship */
  deposits_aggregate: Deposits_Aggregate;
  id: Scalars['numeric']['output'];
  position_count: Scalars['Int']['output'];
  /** An array relationship */
  positions: Array<Positions>;
  /** An aggregate relationship */
  positions_aggregate: Positions_Aggregate;
  /** An array relationship */
  redemptions: Array<Redemptions>;
  /** An aggregate relationship */
  redemptions_aggregate: Redemptions_Aggregate;
  total_shares: Scalars['numeric']['output'];
  /** An object relationship */
  triple?: Maybe<Triples>;
  triple_id?: Maybe<Scalars['numeric']['output']>;
};


/** columns and relationships of "vault" */
export type VaultsClaimsArgs = {
  distinct_on?: InputMaybe<Array<Claims_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Claims_Order_By>>;
  where?: InputMaybe<Claims_Bool_Exp>;
};


/** columns and relationships of "vault" */
export type VaultsClaims_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Claims_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Claims_Order_By>>;
  where?: InputMaybe<Claims_Bool_Exp>;
};


/** columns and relationships of "vault" */
export type VaultsCounter_ClaimsArgs = {
  distinct_on?: InputMaybe<Array<Claims_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Claims_Order_By>>;
  where?: InputMaybe<Claims_Bool_Exp>;
};


/** columns and relationships of "vault" */
export type VaultsCounter_Claims_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Claims_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Claims_Order_By>>;
  where?: InputMaybe<Claims_Bool_Exp>;
};


/** columns and relationships of "vault" */
export type VaultsDepositsArgs = {
  distinct_on?: InputMaybe<Array<Deposits_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Deposits_Order_By>>;
  where?: InputMaybe<Deposits_Bool_Exp>;
};


/** columns and relationships of "vault" */
export type VaultsDeposits_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Deposits_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Deposits_Order_By>>;
  where?: InputMaybe<Deposits_Bool_Exp>;
};


/** columns and relationships of "vault" */
export type VaultsPositionsArgs = {
  distinct_on?: InputMaybe<Array<Positions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Positions_Order_By>>;
  where?: InputMaybe<Positions_Bool_Exp>;
};


/** columns and relationships of "vault" */
export type VaultsPositions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Positions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Positions_Order_By>>;
  where?: InputMaybe<Positions_Bool_Exp>;
};


/** columns and relationships of "vault" */
export type VaultsRedemptionsArgs = {
  distinct_on?: InputMaybe<Array<Redemptions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Redemptions_Order_By>>;
  where?: InputMaybe<Redemptions_Bool_Exp>;
};


/** columns and relationships of "vault" */
export type VaultsRedemptions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Redemptions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Redemptions_Order_By>>;
  where?: InputMaybe<Redemptions_Bool_Exp>;
};

/** aggregated selection of "vault" */
export type Vaults_Aggregate = {
  __typename?: 'vaults_aggregate';
  aggregate?: Maybe<Vaults_Aggregate_Fields>;
  nodes: Array<Vaults>;
};

/** aggregate fields of "vault" */
export type Vaults_Aggregate_Fields = {
  __typename?: 'vaults_aggregate_fields';
  avg?: Maybe<Vaults_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Vaults_Max_Fields>;
  min?: Maybe<Vaults_Min_Fields>;
  stddev?: Maybe<Vaults_Stddev_Fields>;
  stddev_pop?: Maybe<Vaults_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Vaults_Stddev_Samp_Fields>;
  sum?: Maybe<Vaults_Sum_Fields>;
  var_pop?: Maybe<Vaults_Var_Pop_Fields>;
  var_samp?: Maybe<Vaults_Var_Samp_Fields>;
  variance?: Maybe<Vaults_Variance_Fields>;
};


/** aggregate fields of "vault" */
export type Vaults_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Vaults_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Vaults_Avg_Fields = {
  __typename?: 'vaults_avg_fields';
  atom_id?: Maybe<Scalars['Float']['output']>;
  current_share_price?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  position_count?: Maybe<Scalars['Float']['output']>;
  total_shares?: Maybe<Scalars['Float']['output']>;
  triple_id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "vault". All fields are combined with a logical 'AND'. */
export type Vaults_Bool_Exp = {
  _and?: InputMaybe<Array<Vaults_Bool_Exp>>;
  _not?: InputMaybe<Vaults_Bool_Exp>;
  _or?: InputMaybe<Array<Vaults_Bool_Exp>>;
  atom?: InputMaybe<Atoms_Bool_Exp>;
  atom_id?: InputMaybe<Numeric_Comparison_Exp>;
  claims?: InputMaybe<Claims_Bool_Exp>;
  claims_aggregate?: InputMaybe<Claims_Aggregate_Bool_Exp>;
  counter_claims?: InputMaybe<Claims_Bool_Exp>;
  counter_claims_aggregate?: InputMaybe<Claims_Aggregate_Bool_Exp>;
  current_share_price?: InputMaybe<Numeric_Comparison_Exp>;
  deposits?: InputMaybe<Deposits_Bool_Exp>;
  deposits_aggregate?: InputMaybe<Deposits_Aggregate_Bool_Exp>;
  id?: InputMaybe<Numeric_Comparison_Exp>;
  position_count?: InputMaybe<Int_Comparison_Exp>;
  positions?: InputMaybe<Positions_Bool_Exp>;
  positions_aggregate?: InputMaybe<Positions_Aggregate_Bool_Exp>;
  redemptions?: InputMaybe<Redemptions_Bool_Exp>;
  redemptions_aggregate?: InputMaybe<Redemptions_Aggregate_Bool_Exp>;
  total_shares?: InputMaybe<Numeric_Comparison_Exp>;
  triple?: InputMaybe<Triples_Bool_Exp>;
  triple_id?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Vaults_Max_Fields = {
  __typename?: 'vaults_max_fields';
  atom_id?: Maybe<Scalars['numeric']['output']>;
  current_share_price?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['numeric']['output']>;
  position_count?: Maybe<Scalars['Int']['output']>;
  total_shares?: Maybe<Scalars['numeric']['output']>;
  triple_id?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate min on columns */
export type Vaults_Min_Fields = {
  __typename?: 'vaults_min_fields';
  atom_id?: Maybe<Scalars['numeric']['output']>;
  current_share_price?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['numeric']['output']>;
  position_count?: Maybe<Scalars['Int']['output']>;
  total_shares?: Maybe<Scalars['numeric']['output']>;
  triple_id?: Maybe<Scalars['numeric']['output']>;
};

/** Ordering options when selecting data from "vault". */
export type Vaults_Order_By = {
  atom?: InputMaybe<Atoms_Order_By>;
  atom_id?: InputMaybe<Order_By>;
  claims_aggregate?: InputMaybe<Claims_Aggregate_Order_By>;
  counter_claims_aggregate?: InputMaybe<Claims_Aggregate_Order_By>;
  current_share_price?: InputMaybe<Order_By>;
  deposits_aggregate?: InputMaybe<Deposits_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  position_count?: InputMaybe<Order_By>;
  positions_aggregate?: InputMaybe<Positions_Aggregate_Order_By>;
  redemptions_aggregate?: InputMaybe<Redemptions_Aggregate_Order_By>;
  total_shares?: InputMaybe<Order_By>;
  triple?: InputMaybe<Triples_Order_By>;
  triple_id?: InputMaybe<Order_By>;
};

/** select columns of table "vault" */
export type Vaults_Select_Column =
  /** column name */
  | 'atom_id'
  /** column name */
  | 'current_share_price'
  /** column name */
  | 'id'
  /** column name */
  | 'position_count'
  /** column name */
  | 'total_shares'
  /** column name */
  | 'triple_id';

/** aggregate stddev on columns */
export type Vaults_Stddev_Fields = {
  __typename?: 'vaults_stddev_fields';
  atom_id?: Maybe<Scalars['Float']['output']>;
  current_share_price?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  position_count?: Maybe<Scalars['Float']['output']>;
  total_shares?: Maybe<Scalars['Float']['output']>;
  triple_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Vaults_Stddev_Pop_Fields = {
  __typename?: 'vaults_stddev_pop_fields';
  atom_id?: Maybe<Scalars['Float']['output']>;
  current_share_price?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  position_count?: Maybe<Scalars['Float']['output']>;
  total_shares?: Maybe<Scalars['Float']['output']>;
  triple_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Vaults_Stddev_Samp_Fields = {
  __typename?: 'vaults_stddev_samp_fields';
  atom_id?: Maybe<Scalars['Float']['output']>;
  current_share_price?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  position_count?: Maybe<Scalars['Float']['output']>;
  total_shares?: Maybe<Scalars['Float']['output']>;
  triple_id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "vaults" */
export type Vaults_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Vaults_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Vaults_Stream_Cursor_Value_Input = {
  atom_id?: InputMaybe<Scalars['numeric']['input']>;
  current_share_price?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['numeric']['input']>;
  position_count?: InputMaybe<Scalars['Int']['input']>;
  total_shares?: InputMaybe<Scalars['numeric']['input']>;
  triple_id?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Vaults_Sum_Fields = {
  __typename?: 'vaults_sum_fields';
  atom_id?: Maybe<Scalars['numeric']['output']>;
  current_share_price?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['numeric']['output']>;
  position_count?: Maybe<Scalars['Int']['output']>;
  total_shares?: Maybe<Scalars['numeric']['output']>;
  triple_id?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Vaults_Var_Pop_Fields = {
  __typename?: 'vaults_var_pop_fields';
  atom_id?: Maybe<Scalars['Float']['output']>;
  current_share_price?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  position_count?: Maybe<Scalars['Float']['output']>;
  total_shares?: Maybe<Scalars['Float']['output']>;
  triple_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Vaults_Var_Samp_Fields = {
  __typename?: 'vaults_var_samp_fields';
  atom_id?: Maybe<Scalars['Float']['output']>;
  current_share_price?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  position_count?: Maybe<Scalars['Float']['output']>;
  total_shares?: Maybe<Scalars['Float']['output']>;
  triple_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Vaults_Variance_Fields = {
  __typename?: 'vaults_variance_fields';
  atom_id?: Maybe<Scalars['Float']['output']>;
  current_share_price?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  position_count?: Maybe<Scalars['Float']['output']>;
  total_shares?: Maybe<Scalars['Float']['output']>;
  triple_id?: Maybe<Scalars['Float']['output']>;
};

export type AccountMetadataFragment = { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any };

export type AccountClaimsAggregateFragment = { __typename?: 'accounts', claims_aggregate: { __typename?: 'claims_aggregate', aggregate?: { __typename?: 'claims_aggregate_fields', count: number } | null, nodes: Array<{ __typename?: 'claims', shares: any, counter_shares: any, triple: { __typename?: 'triples', id: any } }> } };

export type AccountClaimsFragment = { __typename?: 'accounts', claims: Array<{ __typename?: 'claims', shares: any, counter_shares: any, triple: { __typename?: 'triples', id: any } }> };

export type AccountPositionsAggregateFragment = { __typename?: 'accounts', positions_aggregate: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', count: number } | null, nodes: Array<{ __typename?: 'positions', id: string, shares: any, vault: { __typename?: 'vaults', id: any, total_shares: any, current_share_price: any, atom?: { __typename?: 'atoms', id: any, label?: string | null } | null, triple?: { __typename?: 'triples', id: any } | null } }> } };

export type AccountPositionsFragment = { __typename?: 'accounts', positions: Array<{ __typename?: 'positions', id: string, shares: any, vault: { __typename?: 'vaults', id: any, total_shares: any, current_share_price: any, atom?: { __typename?: 'atoms', id: any, label?: string | null } | null, triple?: { __typename?: 'triples', id: any } | null } }> };

export type AccountAtomsFragment = { __typename?: 'accounts', atoms: Array<{ __typename?: 'atoms', id: any, label?: string | null, data: string, vault?: { __typename?: 'vaults', total_shares: any, positions_aggregate: { __typename?: 'positions_aggregate', nodes: Array<{ __typename?: 'positions', shares: any, account?: { __typename?: 'accounts', id: string } | null }> } } | null }> };

export type AccountAtomsAggregateFragment = { __typename?: 'accounts', atoms_aggregate: { __typename?: 'atoms_aggregate', aggregate?: { __typename?: 'atoms_aggregate_fields', count: number, sum?: { __typename?: 'atoms_sum_fields', id?: any | null } | null } | null, nodes: Array<{ __typename?: 'atoms', id: any, label?: string | null, data: string, vault?: { __typename?: 'vaults', total_shares: any, positions_aggregate: { __typename?: 'positions_aggregate', nodes: Array<{ __typename?: 'positions', shares: any, account?: { __typename?: 'accounts', id: string } | null }> } } | null }> } };

export type AccountTriplesFragment = { __typename?: 'accounts', triples_aggregate: { __typename?: 'triples_aggregate', aggregate?: { __typename?: 'triples_aggregate_fields', count: number } | null, nodes: Array<{ __typename?: 'triples', id: any, subject: { __typename?: 'atoms', id: any, label?: string | null }, predicate: { __typename?: 'atoms', id: any, label?: string | null }, object: { __typename?: 'atoms', id: any, label?: string | null } }> } };

export type AccountTriplesAggregateFragment = { __typename?: 'accounts', triples_aggregate: { __typename?: 'triples_aggregate', aggregate?: { __typename?: 'triples_aggregate_fields', count: number } | null, nodes: Array<{ __typename?: 'triples', id: any, subject: { __typename?: 'atoms', id: any, label?: string | null }, predicate: { __typename?: 'atoms', id: any, label?: string | null }, object: { __typename?: 'atoms', id: any, label?: string | null } }> } };

export type AtomValueFragment = { __typename?: 'atoms', value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null };

export type AtomMetadataFragment = { __typename?: 'atoms', id: any, data: string, image?: string | null, label?: string | null, emoji?: string | null, type: any, wallet_id: string, creator?: { __typename?: 'accounts', id: string, label: string, image?: string | null } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null };

export type AtomTxnFragment = { __typename?: 'atoms', block_number: any, block_timestamp: any, transaction_hash: any, creator_id: string };

export type AtomVaultDetailsFragment = { __typename?: 'atoms', vault_id: any, wallet_id: string, vault?: { __typename?: 'vaults', position_count: number, total_shares: any, current_share_price: any, positions_aggregate: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', count: number, sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null }, positions: Array<{ __typename?: 'positions', id: string, shares: any, account?: { __typename?: 'accounts', label: string, id: string } | null }> } | null };

export type AtomTripleFragment = { __typename?: 'atoms', as_subject_triples: Array<{ __typename?: 'triples', id: any, object: { __typename?: 'atoms', data: string, id: any, image?: string | null, label?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null }, predicate: { __typename?: 'atoms', data: string, id: any, image?: string | null, label?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null } }>, as_predicate_triples: Array<{ __typename?: 'triples', id: any, subject: { __typename?: 'atoms', data: string, id: any, image?: string | null, label?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null }, object: { __typename?: 'atoms', data: string, id: any, image?: string | null, label?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null } }>, as_object_triples: Array<{ __typename?: 'triples', id: any, subject: { __typename?: 'atoms', data: string, id: any, image?: string | null, label?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null }, predicate: { __typename?: 'atoms', data: string, id: any, image?: string | null, label?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null } }> };

export type AtomVaultDetailsWithPositionsFragment = { __typename?: 'atoms', vault?: { __typename?: 'vaults', total_shares: any, current_share_price: any, positions_aggregate: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null, nodes: Array<{ __typename?: 'positions', shares: any, account?: { __typename?: 'accounts', id: string } | null }> } } | null };

export type DepositEventFragmentFragment = { __typename?: 'events', deposit?: { __typename?: 'deposits', vault_id: any, sender_assets_after_total_fees: any, shares_for_receiver: any, receiver: { __typename?: 'accounts', id: string }, sender?: { __typename?: 'accounts', id: string } | null } | null };

export type EventDetailsFragment = { __typename?: 'events', block_number: any, block_timestamp: any, type: any, transaction_hash: any, atom_id?: any | null, triple_id?: any | null, deposit_id?: string | null, redemption_id?: string | null, atom?: { __typename?: 'atoms', id: any, data: string, image?: string | null, label?: string | null, emoji?: string | null, type: any, wallet_id: string, vault?: { __typename?: 'vaults', total_shares: any, position_count: number, positions: Array<{ __typename?: 'positions', account_id: string, shares: any, account?: { __typename?: 'accounts', id: string, label: string, image?: string | null } | null }> } | null, creator?: { __typename?: 'accounts', id: string, label: string, image?: string | null } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null } | null, triple?: { __typename?: 'triples', id: any, subject_id: any, predicate_id: any, object_id: any, vault?: { __typename?: 'vaults', total_shares: any, position_count: number, current_share_price: any, positions: Array<{ __typename?: 'positions', account_id: string, shares: any, account?: { __typename?: 'accounts', id: string, label: string, image?: string | null } | null, vault: { __typename?: 'vaults', id: any, total_shares: any, current_share_price: any } }>, allPositions: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', count: number, sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null } } | null, counter_vault?: { __typename?: 'vaults', total_shares: any, position_count: number, current_share_price: any, positions: Array<{ __typename?: 'positions', account_id: string, shares: any, account?: { __typename?: 'accounts', id: string, label: string, image?: string | null } | null, vault: { __typename?: 'vaults', id: any, total_shares: any, current_share_price: any } }>, allPositions: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', count: number, sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null } } | null, subject: { __typename?: 'atoms', data: string, id: any, image?: string | null, label?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, predicate: { __typename?: 'atoms', data: string, id: any, image?: string | null, label?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, object: { __typename?: 'atoms', data: string, id: any, image?: string | null, label?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null } } | null, deposit?: { __typename?: 'deposits', vault_id: any, sender_assets_after_total_fees: any, shares_for_receiver: any, receiver: { __typename?: 'accounts', id: string }, sender?: { __typename?: 'accounts', id: string } | null } | null, redemption?: { __typename?: 'redemptions', vault_id: any, receiver_id: string, shares_redeemed_by_sender: any, assets_for_receiver: any } | null };

export type FollowMetadataFragment = { __typename?: 'triples', id: any, subject: { __typename?: 'atoms', id: any, label?: string | null }, predicate: { __typename?: 'atoms', id: any, label?: string | null }, object: { __typename?: 'atoms', id: any, label?: string | null }, vault?: { __typename?: 'vaults', id: any, total_shares: any, current_share_price: any, positions_aggregate: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', count: number, sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null }, positions: Array<{ __typename?: 'positions', shares: any, account?: { __typename?: 'accounts', id: string, label: string } | null }> } | null };

export type FollowAggregateFragment = { __typename?: 'triples_aggregate', aggregate?: { __typename?: 'triples_aggregate_fields', count: number } | null };

export type PositionDetailsFragment = { __typename?: 'positions', id: string, shares: any, vault_id: any, account?: { __typename?: 'accounts', id: string, label: string, image?: string | null } | null, vault: { __typename?: 'vaults', id: any, atom?: { __typename?: 'atoms', id: any, label?: string | null, image?: string | null } | null, triple?: { __typename?: 'triples', id: any, vault?: { __typename?: 'vaults', id: any, position_count: number, positions_aggregate: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null } } | null, counter_vault?: { __typename?: 'vaults', id: any, position_count: number, positions_aggregate: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null } } | null, subject: { __typename?: 'atoms', data: string, id: any, label?: string | null, image?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, predicate: { __typename?: 'atoms', data: string, id: any, label?: string | null, image?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, object: { __typename?: 'atoms', data: string, id: any, label?: string | null, image?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null } } | null } };

export type PositionFieldsFragment = { __typename?: 'positions', shares: any, account?: { __typename?: 'accounts', id: string, label: string } | null, vault: { __typename?: 'vaults', id: any, total_shares: any, current_share_price: any } };

export type PositionAggregateFieldsFragment = { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', count: number, sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null };

export type RedemptionEventFragmentFragment = { __typename?: 'events', redemption?: { __typename?: 'redemptions', vault_id: any, receiver_id: string, shares_redeemed_by_sender: any, assets_for_receiver: any } | null };

export type StatDetailsFragment = { __typename?: 'stats', contract_balance?: any | null, total_accounts?: number | null, total_fees?: any | null, total_atoms?: number | null, total_triples?: number | null, total_positions?: number | null, total_signals?: number | null };

export type TripleMetadataFragment = { __typename?: 'triples', id: any, subject_id: any, predicate_id: any, object_id: any, subject: { __typename?: 'atoms', data: string, id: any, image?: string | null, label?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, predicate: { __typename?: 'atoms', data: string, id: any, image?: string | null, label?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, object: { __typename?: 'atoms', data: string, id: any, image?: string | null, label?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, vault?: { __typename?: 'vaults', total_shares: any, current_share_price: any, allPositions: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', count: number, sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null }, positions: Array<{ __typename?: 'positions', shares: any, account?: { __typename?: 'accounts', id: string, label: string } | null, vault: { __typename?: 'vaults', id: any, total_shares: any, current_share_price: any } }> } | null, counter_vault?: { __typename?: 'vaults', total_shares: any, current_share_price: any, allPositions: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', count: number, sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null }, positions: Array<{ __typename?: 'positions', shares: any, account?: { __typename?: 'accounts', id: string, label: string } | null, vault: { __typename?: 'vaults', id: any, total_shares: any, current_share_price: any } }> } | null };

export type TripleTxnFragment = { __typename?: 'triples', block_number: any, block_timestamp: any, transaction_hash: any, creator_id: string };

export type TripleVaultDetailsFragment = { __typename?: 'triples', vault_id: any, counter_vault_id: any, vault?: { __typename?: 'vaults', positions: Array<{ __typename?: 'positions', id: string, shares: any, vault_id: any, account?: { __typename?: 'accounts', id: string, label: string, image?: string | null } | null, vault: { __typename?: 'vaults', id: any, atom?: { __typename?: 'atoms', id: any, label?: string | null, image?: string | null } | null, triple?: { __typename?: 'triples', id: any, vault?: { __typename?: 'vaults', id: any, position_count: number, positions_aggregate: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null } } | null, counter_vault?: { __typename?: 'vaults', id: any, position_count: number, positions_aggregate: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null } } | null, subject: { __typename?: 'atoms', data: string, id: any, label?: string | null, image?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, predicate: { __typename?: 'atoms', data: string, id: any, label?: string | null, image?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, object: { __typename?: 'atoms', data: string, id: any, label?: string | null, image?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null } } | null } }> } | null, counter_vault?: { __typename?: 'vaults', positions: Array<{ __typename?: 'positions', id: string, shares: any, vault_id: any, account?: { __typename?: 'accounts', id: string, label: string, image?: string | null } | null, vault: { __typename?: 'vaults', id: any, atom?: { __typename?: 'atoms', id: any, label?: string | null, image?: string | null } | null, triple?: { __typename?: 'triples', id: any, vault?: { __typename?: 'vaults', id: any, position_count: number, positions_aggregate: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null } } | null, counter_vault?: { __typename?: 'vaults', id: any, position_count: number, positions_aggregate: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null } } | null, subject: { __typename?: 'atoms', data: string, id: any, label?: string | null, image?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, predicate: { __typename?: 'atoms', data: string, id: any, label?: string | null, image?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, object: { __typename?: 'atoms', data: string, id: any, label?: string | null, image?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null } } | null } }> } | null };

export type TripleVaultCouterVaultDetailsWithPositionsFragment = { __typename?: 'triples', vault_id: any, counter_vault_id: any, vault?: { __typename?: 'vaults', id: any, current_share_price: any, total_shares: any, atom?: { __typename?: 'atoms', id: any, label?: string | null } | null, triple?: { __typename?: 'triples', id: any, subject: { __typename?: 'atoms', id: any, label?: string | null }, predicate: { __typename?: 'atoms', id: any, label?: string | null }, object: { __typename?: 'atoms', id: any, label?: string | null } } | null, positions: Array<{ __typename?: 'positions', shares: any, account?: { __typename?: 'accounts', id: string, label: string } | null, vault: { __typename?: 'vaults', id: any, total_shares: any, current_share_price: any } }> } | null, counter_vault?: { __typename?: 'vaults', id: any, current_share_price: any, total_shares: any, atom?: { __typename?: 'atoms', id: any, label?: string | null } | null, triple?: { __typename?: 'triples', id: any, subject: { __typename?: 'atoms', id: any, label?: string | null }, predicate: { __typename?: 'atoms', id: any, label?: string | null }, object: { __typename?: 'atoms', id: any, label?: string | null } } | null, positions: Array<{ __typename?: 'positions', shares: any, account?: { __typename?: 'accounts', id: string, label: string } | null, vault: { __typename?: 'vaults', id: any, total_shares: any, current_share_price: any } }> } | null };

export type VaultBasicDetailsFragment = { __typename?: 'vaults', id: any, current_share_price: any, total_shares: any, atom?: { __typename?: 'atoms', id: any, label?: string | null } | null, triple?: { __typename?: 'triples', id: any, subject: { __typename?: 'atoms', id: any, label?: string | null }, predicate: { __typename?: 'atoms', id: any, label?: string | null }, object: { __typename?: 'atoms', id: any, label?: string | null } } | null };

export type VaultPositionsAggregateFragment = { __typename?: 'vaults', positions_aggregate: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', count: number, sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null } };

export type VaultFilteredPositionsFragment = { __typename?: 'vaults', positions: Array<{ __typename?: 'positions', shares: any, account?: { __typename?: 'accounts', id: string, label: string } | null, vault: { __typename?: 'vaults', id: any, total_shares: any, current_share_price: any } }> };

export type VaultUnfilteredPositionsFragment = { __typename?: 'vaults', positions: Array<{ __typename?: 'positions', shares: any, account?: { __typename?: 'accounts', id: string, label: string } | null, vault: { __typename?: 'vaults', id: any, total_shares: any, current_share_price: any } }> };

export type VaultDetailsFragment = { __typename?: 'vaults', id: any, current_share_price: any, total_shares: any, atom?: { __typename?: 'atoms', id: any, label?: string | null } | null, triple?: { __typename?: 'triples', id: any, subject: { __typename?: 'atoms', id: any, label?: string | null }, predicate: { __typename?: 'atoms', id: any, label?: string | null }, object: { __typename?: 'atoms', id: any, label?: string | null } } | null };

export type VaultDetailsWithFilteredPositionsFragment = { __typename?: 'vaults', id: any, current_share_price: any, total_shares: any, atom?: { __typename?: 'atoms', id: any, label?: string | null } | null, triple?: { __typename?: 'triples', id: any, subject: { __typename?: 'atoms', id: any, label?: string | null }, predicate: { __typename?: 'atoms', id: any, label?: string | null }, object: { __typename?: 'atoms', id: any, label?: string | null } } | null, positions: Array<{ __typename?: 'positions', shares: any, account?: { __typename?: 'accounts', id: string, label: string } | null, vault: { __typename?: 'vaults', id: any, total_shares: any, current_share_price: any } }> };

export type VaultFieldsForTripleFragment = { __typename?: 'vaults', total_shares: any, current_share_price: any, positions_aggregate: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', count: number, sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null }, positions: Array<{ __typename?: 'positions', shares: any, account?: { __typename?: 'accounts', id: string, label: string } | null, vault: { __typename?: 'vaults', id: any, total_shares: any, current_share_price: any } }> };

export type GetAccountsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Accounts_Order_By> | Accounts_Order_By>;
  where?: InputMaybe<Accounts_Bool_Exp>;
  claimsLimit?: InputMaybe<Scalars['Int']['input']>;
  claimsOffset?: InputMaybe<Scalars['Int']['input']>;
  claimsWhere?: InputMaybe<Claims_Bool_Exp>;
  positionsLimit?: InputMaybe<Scalars['Int']['input']>;
  positionsOffset?: InputMaybe<Scalars['Int']['input']>;
  positionsWhere?: InputMaybe<Positions_Bool_Exp>;
}>;


export type GetAccountsQuery = { __typename?: 'query_root', accounts: Array<{ __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any, atom?: { __typename?: 'atoms', vault_id: any, wallet_id: string, vault?: { __typename?: 'vaults', position_count: number, total_shares: any, positions_aggregate: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', count: number, sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null }, positions: Array<{ __typename?: 'positions', id: string, shares: any, account?: { __typename?: 'accounts', label: string, id: string } | null }> } | null } | null, claims: Array<{ __typename?: 'claims', shares: any, counter_shares: any, triple: { __typename?: 'triples', id: any } }>, positions: Array<{ __typename?: 'positions', id: string, shares: any, vault: { __typename?: 'vaults', id: any, total_shares: any, current_share_price: any, atom?: { __typename?: 'atoms', id: any, label?: string | null } | null, triple?: { __typename?: 'triples', id: any } | null } }> }> };

export type GetAccountsWithAggregatesQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Accounts_Order_By> | Accounts_Order_By>;
  where?: InputMaybe<Accounts_Bool_Exp>;
  claimsLimit?: InputMaybe<Scalars['Int']['input']>;
  claimsOffset?: InputMaybe<Scalars['Int']['input']>;
  claimsWhere?: InputMaybe<Claims_Bool_Exp>;
  positionsLimit?: InputMaybe<Scalars['Int']['input']>;
  positionsOffset?: InputMaybe<Scalars['Int']['input']>;
  positionsWhere?: InputMaybe<Positions_Bool_Exp>;
  atomsWhere?: InputMaybe<Atoms_Bool_Exp>;
  atomsOrderBy?: InputMaybe<Array<Atoms_Order_By> | Atoms_Order_By>;
  atomsLimit?: InputMaybe<Scalars['Int']['input']>;
  atomsOffset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetAccountsWithAggregatesQuery = { __typename?: 'query_root', accounts_aggregate: { __typename?: 'accounts_aggregate', aggregate?: { __typename?: 'accounts_aggregate_fields', count: number } | null, nodes: Array<{ __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any, claims: Array<{ __typename?: 'claims', shares: any, counter_shares: any, triple: { __typename?: 'triples', id: any } }>, positions: Array<{ __typename?: 'positions', id: string, shares: any, vault: { __typename?: 'vaults', id: any, total_shares: any, current_share_price: any, atom?: { __typename?: 'atoms', id: any, label?: string | null } | null, triple?: { __typename?: 'triples', id: any } | null } }> }> } };

export type GetAccountsCountQueryVariables = Exact<{
  where?: InputMaybe<Accounts_Bool_Exp>;
}>;


export type GetAccountsCountQuery = { __typename?: 'query_root', accounts_aggregate: { __typename?: 'accounts_aggregate', aggregate?: { __typename?: 'accounts_aggregate_fields', count: number } | null } };

export type GetAccountQueryVariables = Exact<{
  address: Scalars['String']['input'];
  claimsLimit?: InputMaybe<Scalars['Int']['input']>;
  claimsOffset?: InputMaybe<Scalars['Int']['input']>;
  claimsWhere?: InputMaybe<Claims_Bool_Exp>;
  positionsLimit?: InputMaybe<Scalars['Int']['input']>;
  positionsOffset?: InputMaybe<Scalars['Int']['input']>;
  positionsWhere?: InputMaybe<Positions_Bool_Exp>;
  atomsWhere?: InputMaybe<Atoms_Bool_Exp>;
  atomsOrderBy?: InputMaybe<Array<Atoms_Order_By> | Atoms_Order_By>;
  atomsLimit?: InputMaybe<Scalars['Int']['input']>;
  atomsOffset?: InputMaybe<Scalars['Int']['input']>;
  triplesWhere?: InputMaybe<Triples_Bool_Exp>;
  triplesOrderBy?: InputMaybe<Array<Triples_Order_By> | Triples_Order_By>;
  triplesLimit?: InputMaybe<Scalars['Int']['input']>;
  triplesOffset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetAccountQuery = { __typename?: 'query_root', account?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any, atom?: { __typename?: 'atoms', id: any, data: string, image?: string | null, label?: string | null, emoji?: string | null, type: any, wallet_id: string, vault_id: any, creator?: { __typename?: 'accounts', id: string, label: string, image?: string | null } | null, vault?: { __typename?: 'vaults', position_count: number, total_shares: any, current_share_price: any, positions_aggregate: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', count: number, sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null }, positions: Array<{ __typename?: 'positions', id: string, shares: any, account?: { __typename?: 'accounts', label: string, id: string } | null }> } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null } | null, claims: Array<{ __typename?: 'claims', shares: any, counter_shares: any, triple: { __typename?: 'triples', id: any } }>, positions: Array<{ __typename?: 'positions', id: string, shares: any, vault: { __typename?: 'vaults', id: any, total_shares: any, current_share_price: any, atom?: { __typename?: 'atoms', id: any, label?: string | null } | null, triple?: { __typename?: 'triples', id: any } | null } }>, atoms: Array<{ __typename?: 'atoms', id: any, label?: string | null, data: string, vault?: { __typename?: 'vaults', total_shares: any, positions_aggregate: { __typename?: 'positions_aggregate', nodes: Array<{ __typename?: 'positions', shares: any, account?: { __typename?: 'accounts', id: string } | null }> } } | null }>, triples_aggregate: { __typename?: 'triples_aggregate', aggregate?: { __typename?: 'triples_aggregate_fields', count: number } | null, nodes: Array<{ __typename?: 'triples', id: any, subject: { __typename?: 'atoms', id: any, label?: string | null }, predicate: { __typename?: 'atoms', id: any, label?: string | null }, object: { __typename?: 'atoms', id: any, label?: string | null } }> } } | null, chainlink_prices: Array<{ __typename?: 'chainlink_prices', usd?: any | null }> };

export type GetAccountWithPaginatedRelationsQueryVariables = Exact<{
  address: Scalars['String']['input'];
  claimsLimit?: InputMaybe<Scalars['Int']['input']>;
  claimsOffset?: InputMaybe<Scalars['Int']['input']>;
  claimsWhere?: InputMaybe<Claims_Bool_Exp>;
  positionsLimit?: InputMaybe<Scalars['Int']['input']>;
  positionsOffset?: InputMaybe<Scalars['Int']['input']>;
  positionsWhere?: InputMaybe<Positions_Bool_Exp>;
  atomsLimit?: InputMaybe<Scalars['Int']['input']>;
  atomsOffset?: InputMaybe<Scalars['Int']['input']>;
  atomsWhere?: InputMaybe<Atoms_Bool_Exp>;
  atomsOrderBy?: InputMaybe<Array<Atoms_Order_By> | Atoms_Order_By>;
  triplesLimit?: InputMaybe<Scalars['Int']['input']>;
  triplesOffset?: InputMaybe<Scalars['Int']['input']>;
  triplesWhere?: InputMaybe<Triples_Bool_Exp>;
  triplesOrderBy?: InputMaybe<Array<Triples_Order_By> | Triples_Order_By>;
}>;


export type GetAccountWithPaginatedRelationsQuery = { __typename?: 'query_root', account?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any, claims: Array<{ __typename?: 'claims', shares: any, counter_shares: any, triple: { __typename?: 'triples', id: any } }>, positions: Array<{ __typename?: 'positions', id: string, shares: any, vault: { __typename?: 'vaults', id: any, total_shares: any, current_share_price: any, atom?: { __typename?: 'atoms', id: any, label?: string | null } | null, triple?: { __typename?: 'triples', id: any } | null } }>, atoms: Array<{ __typename?: 'atoms', id: any, label?: string | null, data: string, vault?: { __typename?: 'vaults', total_shares: any, positions_aggregate: { __typename?: 'positions_aggregate', nodes: Array<{ __typename?: 'positions', shares: any, account?: { __typename?: 'accounts', id: string } | null }> } } | null }>, triples_aggregate: { __typename?: 'triples_aggregate', aggregate?: { __typename?: 'triples_aggregate_fields', count: number } | null, nodes: Array<{ __typename?: 'triples', id: any, subject: { __typename?: 'atoms', id: any, label?: string | null }, predicate: { __typename?: 'atoms', id: any, label?: string | null }, object: { __typename?: 'atoms', id: any, label?: string | null } }> } } | null };

export type GetAccountWithAggregatesQueryVariables = Exact<{
  address: Scalars['String']['input'];
  claimsLimit?: InputMaybe<Scalars['Int']['input']>;
  claimsOffset?: InputMaybe<Scalars['Int']['input']>;
  claimsWhere?: InputMaybe<Claims_Bool_Exp>;
  positionsLimit?: InputMaybe<Scalars['Int']['input']>;
  positionsOffset?: InputMaybe<Scalars['Int']['input']>;
  positionsWhere?: InputMaybe<Positions_Bool_Exp>;
  atomsWhere?: InputMaybe<Atoms_Bool_Exp>;
  atomsOrderBy?: InputMaybe<Array<Atoms_Order_By> | Atoms_Order_By>;
  atomsLimit?: InputMaybe<Scalars['Int']['input']>;
  atomsOffset?: InputMaybe<Scalars['Int']['input']>;
  triplesWhere?: InputMaybe<Triples_Bool_Exp>;
  triplesOrderBy?: InputMaybe<Array<Triples_Order_By> | Triples_Order_By>;
  triplesLimit?: InputMaybe<Scalars['Int']['input']>;
  triplesOffset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetAccountWithAggregatesQuery = { __typename?: 'query_root', account?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any, claims_aggregate: { __typename?: 'claims_aggregate', aggregate?: { __typename?: 'claims_aggregate_fields', count: number } | null, nodes: Array<{ __typename?: 'claims', shares: any, counter_shares: any, triple: { __typename?: 'triples', id: any } }> }, positions_aggregate: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', count: number } | null, nodes: Array<{ __typename?: 'positions', id: string, shares: any, vault: { __typename?: 'vaults', id: any, total_shares: any, current_share_price: any, atom?: { __typename?: 'atoms', id: any, label?: string | null } | null, triple?: { __typename?: 'triples', id: any } | null } }> }, atoms_aggregate: { __typename?: 'atoms_aggregate', aggregate?: { __typename?: 'atoms_aggregate_fields', count: number, sum?: { __typename?: 'atoms_sum_fields', id?: any | null } | null } | null, nodes: Array<{ __typename?: 'atoms', id: any, label?: string | null, data: string, vault?: { __typename?: 'vaults', total_shares: any, positions_aggregate: { __typename?: 'positions_aggregate', nodes: Array<{ __typename?: 'positions', shares: any, account?: { __typename?: 'accounts', id: string } | null }> } } | null }> }, triples_aggregate: { __typename?: 'triples_aggregate', aggregate?: { __typename?: 'triples_aggregate_fields', count: number } | null, nodes: Array<{ __typename?: 'triples', id: any, subject: { __typename?: 'atoms', id: any, label?: string | null }, predicate: { __typename?: 'atoms', id: any, label?: string | null }, object: { __typename?: 'atoms', id: any, label?: string | null } }> } } | null };

export type GetAtomsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Atoms_Order_By> | Atoms_Order_By>;
  where?: InputMaybe<Atoms_Bool_Exp>;
}>;


export type GetAtomsQuery = { __typename?: 'query_root', total: { __typename?: 'atoms_aggregate', aggregate?: { __typename?: 'atoms_aggregate_fields', count: number } | null }, atoms: Array<{ __typename?: 'atoms', id: any, data: string, image?: string | null, label?: string | null, emoji?: string | null, type: any, wallet_id: string, block_number: any, block_timestamp: any, transaction_hash: any, creator_id: string, vault_id: any, creator?: { __typename?: 'accounts', id: string, label: string, image?: string | null, atom_id?: any | null, type: any } | null, vault?: { __typename?: 'vaults', position_count: number, total_shares: any, current_share_price: any, positions_aggregate: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', count: number, sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null }, positions: Array<{ __typename?: 'positions', id: string, shares: any, account?: { __typename?: 'accounts', label: string, id: string } | null }> } | null, as_subject_triples: Array<{ __typename?: 'triples', id: any, object: { __typename?: 'atoms', data: string, id: any, image?: string | null, label?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null }, predicate: { __typename?: 'atoms', data: string, id: any, image?: string | null, label?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null } }>, as_predicate_triples: Array<{ __typename?: 'triples', id: any, subject: { __typename?: 'atoms', data: string, id: any, image?: string | null, label?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null }, object: { __typename?: 'atoms', data: string, id: any, image?: string | null, label?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null } }>, as_object_triples: Array<{ __typename?: 'triples', id: any, subject: { __typename?: 'atoms', data: string, id: any, image?: string | null, label?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null }, predicate: { __typename?: 'atoms', data: string, id: any, image?: string | null, label?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null } }>, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }> };

export type GetAtomsWithPositionsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Atoms_Order_By> | Atoms_Order_By>;
  where?: InputMaybe<Atoms_Bool_Exp>;
  address?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAtomsWithPositionsQuery = { __typename?: 'query_root', total: { __typename?: 'atoms_aggregate', aggregate?: { __typename?: 'atoms_aggregate_fields', count: number } | null }, atoms: Array<{ __typename?: 'atoms', id: any, data: string, image?: string | null, label?: string | null, emoji?: string | null, type: any, wallet_id: string, block_number: any, block_timestamp: any, transaction_hash: any, creator_id: string, vault?: { __typename?: 'vaults', position_count: number, total_shares: any, current_share_price: any, total: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', count: number, sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null }, positions: Array<{ __typename?: 'positions', id: string, shares: any, account?: { __typename?: 'accounts', label: string, id: string } | null }> } | null, creator?: { __typename?: 'accounts', id: string, label: string, image?: string | null, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }> };

export type GetAtomsWithAggregatesQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Atoms_Order_By> | Atoms_Order_By>;
  where?: InputMaybe<Atoms_Bool_Exp>;
}>;


export type GetAtomsWithAggregatesQuery = { __typename?: 'query_root', atoms_aggregate: { __typename?: 'atoms_aggregate', aggregate?: { __typename?: 'atoms_aggregate_fields', count: number } | null, nodes: Array<{ __typename?: 'atoms', id: any, data: string, image?: string | null, label?: string | null, emoji?: string | null, type: any, wallet_id: string, block_number: any, block_timestamp: any, transaction_hash: any, creator_id: string, vault_id: any, creator?: { __typename?: 'accounts', id: string, label: string, image?: string | null, atom_id?: any | null, type: any } | null, vault?: { __typename?: 'vaults', position_count: number, total_shares: any, current_share_price: any, positions_aggregate: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', count: number, sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null }, positions: Array<{ __typename?: 'positions', id: string, shares: any, account?: { __typename?: 'accounts', label: string, id: string } | null }> } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }> } };

export type GetAtomsCountQueryVariables = Exact<{
  where?: InputMaybe<Atoms_Bool_Exp>;
}>;


export type GetAtomsCountQuery = { __typename?: 'query_root', atoms_aggregate: { __typename?: 'atoms_aggregate', aggregate?: { __typename?: 'atoms_aggregate_fields', count: number } | null } };

export type GetAtomQueryVariables = Exact<{
  id: Scalars['numeric']['input'];
}>;


export type GetAtomQuery = { __typename?: 'query_root', atom?: { __typename?: 'atoms', id: any, data: string, image?: string | null, label?: string | null, emoji?: string | null, type: any, wallet_id: string, block_number: any, block_timestamp: any, transaction_hash: any, creator_id: string, vault_id: any, creator?: { __typename?: 'accounts', id: string, label: string, image?: string | null, atom_id?: any | null, type: any } | null, vault?: { __typename?: 'vaults', position_count: number, total_shares: any, current_share_price: any, positions_aggregate: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', count: number, sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null }, positions: Array<{ __typename?: 'positions', id: string, shares: any, account?: { __typename?: 'accounts', label: string, id: string } | null }> } | null, as_subject_triples: Array<{ __typename?: 'triples', id: any, object: { __typename?: 'atoms', data: string, id: any, image?: string | null, label?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null }, predicate: { __typename?: 'atoms', data: string, id: any, image?: string | null, label?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null } }>, as_predicate_triples: Array<{ __typename?: 'triples', id: any, subject: { __typename?: 'atoms', data: string, id: any, image?: string | null, label?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null }, object: { __typename?: 'atoms', data: string, id: any, image?: string | null, label?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null } }>, as_object_triples: Array<{ __typename?: 'triples', id: any, subject: { __typename?: 'atoms', data: string, id: any, image?: string | null, label?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null }, predicate: { __typename?: 'atoms', data: string, id: any, image?: string | null, label?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null } }>, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null } | null };

export type GetClaimsByAddressQueryVariables = Exact<{
  address?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetClaimsByAddressQuery = { __typename?: 'query_root', claims_aggregate: { __typename?: 'claims_aggregate', aggregate?: { __typename?: 'claims_aggregate_fields', count: number } | null, nodes: Array<{ __typename?: 'claims', id: string, vault_id: any, counter_vault_id: any, shares: any, counter_shares: any, account?: { __typename?: 'accounts', label: string } | null, triple: { __typename?: 'triples', subject: { __typename?: 'atoms', label?: string | null }, predicate: { __typename?: 'atoms', label?: string | null }, object: { __typename?: 'atoms', label?: string | null } } }> } };

export type GetEventsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Events_Order_By> | Events_Order_By>;
  where?: InputMaybe<Events_Bool_Exp>;
  addresses?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type GetEventsQuery = { __typename?: 'query_root', total: { __typename?: 'events_aggregate', aggregate?: { __typename?: 'events_aggregate_fields', count: number } | null }, events: Array<{ __typename?: 'events', id: string, block_number: any, block_timestamp: any, type: any, transaction_hash: any, atom_id?: any | null, triple_id?: any | null, deposit_id?: string | null, redemption_id?: string | null, atom?: { __typename?: 'atoms', id: any, data: string, image?: string | null, label?: string | null, emoji?: string | null, type: any, wallet_id: string, vault?: { __typename?: 'vaults', total_shares: any, position_count: number, positions: Array<{ __typename?: 'positions', account_id: string, shares: any, account?: { __typename?: 'accounts', id: string, label: string, image?: string | null } | null }> } | null, creator?: { __typename?: 'accounts', id: string, label: string, image?: string | null } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null } | null, triple?: { __typename?: 'triples', id: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, subject: { __typename?: 'atoms', data: string, id: any, image?: string | null, label?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, predicate: { __typename?: 'atoms', data: string, id: any, image?: string | null, label?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, object: { __typename?: 'atoms', data: string, id: any, image?: string | null, label?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, vault?: { __typename?: 'vaults', total_shares: any, position_count: number, positions: Array<{ __typename?: 'positions', account_id: string, shares: any, account?: { __typename?: 'accounts', id: string, label: string, image?: string | null } | null }> } | null, counter_vault?: { __typename?: 'vaults', total_shares: any, position_count: number, positions: Array<{ __typename?: 'positions', account_id: string, shares: any, account?: { __typename?: 'accounts', id: string, label: string, image?: string | null } | null }> } | null } | null, deposit?: { __typename?: 'deposits', sender_id: string, shares_for_receiver: any, sender_assets_after_total_fees: any, sender?: { __typename?: 'accounts', id: string } | null, vault: { __typename?: 'vaults', total_shares: any, position_count: number, positions: Array<{ __typename?: 'positions', account_id: string, shares: any, account?: { __typename?: 'accounts', id: string, label: string, image?: string | null } | null }> } } | null, redemption?: { __typename?: 'redemptions', sender_id: string, sender?: { __typename?: 'accounts', id: string } | null } | null }> };

export type GetEventsWithAggregatesQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Events_Order_By> | Events_Order_By>;
  where?: InputMaybe<Events_Bool_Exp>;
  addresses?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type GetEventsWithAggregatesQuery = { __typename?: 'query_root', events_aggregate: { __typename?: 'events_aggregate', aggregate?: { __typename?: 'events_aggregate_fields', count: number, max?: { __typename?: 'events_max_fields', block_timestamp?: any | null, block_number?: any | null } | null, min?: { __typename?: 'events_min_fields', block_timestamp?: any | null, block_number?: any | null } | null } | null, nodes: Array<{ __typename?: 'events', block_number: any, block_timestamp: any, type: any, transaction_hash: any, atom_id?: any | null, triple_id?: any | null, deposit_id?: string | null, redemption_id?: string | null, atom?: { __typename?: 'atoms', id: any, data: string, image?: string | null, label?: string | null, emoji?: string | null, type: any, wallet_id: string, vault?: { __typename?: 'vaults', total_shares: any, position_count: number, positions: Array<{ __typename?: 'positions', account_id: string, shares: any, account?: { __typename?: 'accounts', id: string, label: string, image?: string | null } | null }> } | null, creator?: { __typename?: 'accounts', id: string, label: string, image?: string | null } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null } | null, triple?: { __typename?: 'triples', id: any, subject_id: any, predicate_id: any, object_id: any, vault?: { __typename?: 'vaults', total_shares: any, position_count: number, current_share_price: any, positions: Array<{ __typename?: 'positions', account_id: string, shares: any, account?: { __typename?: 'accounts', id: string, label: string, image?: string | null } | null, vault: { __typename?: 'vaults', id: any, total_shares: any, current_share_price: any } }>, allPositions: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', count: number, sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null } } | null, counter_vault?: { __typename?: 'vaults', total_shares: any, position_count: number, current_share_price: any, positions: Array<{ __typename?: 'positions', account_id: string, shares: any, account?: { __typename?: 'accounts', id: string, label: string, image?: string | null } | null, vault: { __typename?: 'vaults', id: any, total_shares: any, current_share_price: any } }>, allPositions: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', count: number, sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null } } | null, subject: { __typename?: 'atoms', data: string, id: any, image?: string | null, label?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, predicate: { __typename?: 'atoms', data: string, id: any, image?: string | null, label?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, object: { __typename?: 'atoms', data: string, id: any, image?: string | null, label?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null } } | null, deposit?: { __typename?: 'deposits', vault_id: any, sender_assets_after_total_fees: any, shares_for_receiver: any, receiver: { __typename?: 'accounts', id: string }, sender?: { __typename?: 'accounts', id: string } | null } | null, redemption?: { __typename?: 'redemptions', vault_id: any, receiver_id: string, shares_redeemed_by_sender: any, assets_for_receiver: any } | null }> } };

export type GetEventsCountQueryVariables = Exact<{
  where?: InputMaybe<Events_Bool_Exp>;
}>;


export type GetEventsCountQuery = { __typename?: 'query_root', events_aggregate: { __typename?: 'events_aggregate', aggregate?: { __typename?: 'events_aggregate_fields', count: number } | null } };

export type GetEventsDataQueryVariables = Exact<{
  where?: InputMaybe<Events_Bool_Exp>;
}>;


export type GetEventsDataQuery = { __typename?: 'query_root', events_aggregate: { __typename?: 'events_aggregate', aggregate?: { __typename?: 'events_aggregate_fields', count: number, max?: { __typename?: 'events_max_fields', block_timestamp?: any | null, block_number?: any | null } | null, min?: { __typename?: 'events_min_fields', block_timestamp?: any | null, block_number?: any | null } | null, avg?: { __typename?: 'events_avg_fields', block_number?: number | null } | null } | null } };

export type GetDebugEventsQueryVariables = Exact<{
  addresses?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type GetDebugEventsQuery = { __typename?: 'query_root', debug_events: Array<{ __typename?: 'events', id: string, atom?: { __typename?: 'atoms', vault?: { __typename?: 'vaults', positions: Array<{ __typename?: 'positions', account_id: string, shares: any }> } | null } | null }> };

export type GetFollowingPositionsQueryVariables = Exact<{
  subjectId: Scalars['numeric']['input'];
  predicateId: Scalars['numeric']['input'];
  address: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  positionsOrderBy?: InputMaybe<Array<Positions_Order_By> | Positions_Order_By>;
}>;


export type GetFollowingPositionsQuery = { __typename?: 'query_root', triples_aggregate: { __typename?: 'triples_aggregate', aggregate?: { __typename?: 'triples_aggregate_fields', count: number } | null }, triples: Array<{ __typename?: 'triples', id: any, subject: { __typename?: 'atoms', id: any, data: string, image?: string | null, label?: string | null, emoji?: string | null, type: any, wallet_id: string, creator?: { __typename?: 'accounts', id: string, label: string, image?: string | null } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, predicate: { __typename?: 'atoms', id: any, data: string, image?: string | null, label?: string | null, emoji?: string | null, type: any, wallet_id: string, creator?: { __typename?: 'accounts', id: string, label: string, image?: string | null } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, object: { __typename?: 'atoms', id: any, data: string, image?: string | null, label?: string | null, emoji?: string | null, type: any, wallet_id: string, creator?: { __typename?: 'accounts', id: string, label: string, image?: string | null } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, vault?: { __typename?: 'vaults', total_shares: any, current_share_price: any, positions_aggregate: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', count: number, sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null }, positions: Array<{ __typename?: 'positions', account_id: string, shares: any, account?: { __typename?: 'accounts', id: string, label: string } | null }> } | null }> };

export type GetFollowerPositionsQueryVariables = Exact<{
  subjectId: Scalars['numeric']['input'];
  predicateId: Scalars['numeric']['input'];
  objectId: Scalars['numeric']['input'];
  positionsLimit?: InputMaybe<Scalars['Int']['input']>;
  positionsOffset?: InputMaybe<Scalars['Int']['input']>;
  positionsOrderBy?: InputMaybe<Array<Positions_Order_By> | Positions_Order_By>;
  positionsWhere?: InputMaybe<Positions_Bool_Exp>;
}>;


export type GetFollowerPositionsQuery = { __typename?: 'query_root', triples: Array<{ __typename?: 'triples', id: any, subject: { __typename?: 'atoms', id: any, data: string, image?: string | null, label?: string | null, emoji?: string | null, type: any, wallet_id: string, creator?: { __typename?: 'accounts', id: string, label: string, image?: string | null } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, predicate: { __typename?: 'atoms', id: any, data: string, image?: string | null, label?: string | null, emoji?: string | null, type: any, wallet_id: string, creator?: { __typename?: 'accounts', id: string, label: string, image?: string | null } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, object: { __typename?: 'atoms', id: any, data: string, image?: string | null, label?: string | null, emoji?: string | null, type: any, wallet_id: string, creator?: { __typename?: 'accounts', id: string, label: string, image?: string | null } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, vault?: { __typename?: 'vaults', total_shares: any, current_share_price: any, positions_aggregate: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', count: number, sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null }, positions: Array<{ __typename?: 'positions', shares: any, account?: { __typename?: 'accounts', id: string, label: string, image?: string | null } | null }> } | null }> };

export type GetConnectionsQueryVariables = Exact<{
  subjectId: Scalars['numeric']['input'];
  predicateId: Scalars['numeric']['input'];
  objectId: Scalars['numeric']['input'];
  addresses?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  positionsLimit?: InputMaybe<Scalars['Int']['input']>;
  positionsOffset?: InputMaybe<Scalars['Int']['input']>;
  positionsOrderBy?: InputMaybe<Array<Positions_Order_By> | Positions_Order_By>;
  positionsWhere?: InputMaybe<Positions_Bool_Exp>;
}>;


export type GetConnectionsQuery = { __typename?: 'query_root', following_count: { __typename?: 'triples_aggregate', aggregate?: { __typename?: 'triples_aggregate_fields', count: number } | null }, following: Array<{ __typename?: 'triples', id: any, subject: { __typename?: 'atoms', id: any, label?: string | null }, predicate: { __typename?: 'atoms', id: any, label?: string | null }, object: { __typename?: 'atoms', id: any, label?: string | null }, vault?: { __typename?: 'vaults', id: any, total_shares: any, current_share_price: any, positions_aggregate: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', count: number, sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null }, positions: Array<{ __typename?: 'positions', shares: any, account?: { __typename?: 'accounts', id: string, label: string } | null }> } | null }>, followers_count: { __typename?: 'triples_aggregate', aggregate?: { __typename?: 'triples_aggregate_fields', count: number } | null }, followers: Array<{ __typename?: 'triples', id: any, subject: { __typename?: 'atoms', id: any, label?: string | null }, predicate: { __typename?: 'atoms', id: any, label?: string | null }, object: { __typename?: 'atoms', id: any, label?: string | null }, vault?: { __typename?: 'vaults', id: any, total_shares: any, current_share_price: any, positions_aggregate: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', count: number, sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null }, positions: Array<{ __typename?: 'positions', shares: any, account?: { __typename?: 'accounts', id: string, label: string } | null }> } | null }> };

export type GetConnectionsCountQueryVariables = Exact<{
  subjectId: Scalars['numeric']['input'];
  predicateId: Scalars['numeric']['input'];
  objectId: Scalars['numeric']['input'];
  address: Scalars['String']['input'];
}>;


export type GetConnectionsCountQuery = { __typename?: 'query_root', following_count: { __typename?: 'triples_aggregate', aggregate?: { __typename?: 'triples_aggregate_fields', count: number } | null }, followers_count: Array<{ __typename?: 'triples', vault?: { __typename?: 'vaults', positions_aggregate: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', count: number, sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null } } | null }> };

export type GetListsQueryVariables = Exact<{
  where?: InputMaybe<Predicate_Objects_Bool_Exp>;
}>;


export type GetListsQuery = { __typename?: 'query_root', predicate_objects_aggregate: { __typename?: 'predicate_objects_aggregate', aggregate?: { __typename?: 'predicate_objects_aggregate_fields', count: number } | null }, predicate_objects: Array<{ __typename?: 'predicate_objects', id: string, claim_count: number, triple_count: number, object: { __typename?: 'atoms', id: any, label?: string | null, image?: string | null } }> };

export type GetListItemsQueryVariables = Exact<{
  predicateId?: InputMaybe<Scalars['numeric']['input']>;
  objectId?: InputMaybe<Scalars['numeric']['input']>;
}>;


export type GetListItemsQuery = { __typename?: 'query_root', triples_aggregate: { __typename?: 'triples_aggregate', aggregate?: { __typename?: 'triples_aggregate_fields', count: number } | null, nodes: Array<{ __typename?: 'triples', vault_id: any, counter_vault_id: any, vault?: { __typename?: 'vaults', positions: Array<{ __typename?: 'positions', id: string, shares: any, vault_id: any, account?: { __typename?: 'accounts', id: string, label: string, image?: string | null } | null, vault: { __typename?: 'vaults', id: any, atom?: { __typename?: 'atoms', id: any, label?: string | null, image?: string | null } | null, triple?: { __typename?: 'triples', id: any, vault?: { __typename?: 'vaults', id: any, position_count: number, positions_aggregate: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null } } | null, counter_vault?: { __typename?: 'vaults', id: any, position_count: number, positions_aggregate: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null } } | null, subject: { __typename?: 'atoms', data: string, id: any, label?: string | null, image?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, predicate: { __typename?: 'atoms', data: string, id: any, label?: string | null, image?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, object: { __typename?: 'atoms', data: string, id: any, label?: string | null, image?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null } } | null } }> } | null, counter_vault?: { __typename?: 'vaults', positions: Array<{ __typename?: 'positions', id: string, shares: any, vault_id: any, account?: { __typename?: 'accounts', id: string, label: string, image?: string | null } | null, vault: { __typename?: 'vaults', id: any, atom?: { __typename?: 'atoms', id: any, label?: string | null, image?: string | null } | null, triple?: { __typename?: 'triples', id: any, vault?: { __typename?: 'vaults', id: any, position_count: number, positions_aggregate: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null } } | null, counter_vault?: { __typename?: 'vaults', id: any, position_count: number, positions_aggregate: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null } } | null, subject: { __typename?: 'atoms', data: string, id: any, label?: string | null, image?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, predicate: { __typename?: 'atoms', data: string, id: any, label?: string | null, image?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, object: { __typename?: 'atoms', data: string, id: any, label?: string | null, image?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null } } | null } }> } | null }> } };

export type GetListDetailsQueryVariables = Exact<{
  globalWhere?: InputMaybe<Triples_Bool_Exp>;
  userWhere?: InputMaybe<Triples_Bool_Exp>;
  tagPredicateId?: InputMaybe<Scalars['numeric']['input']>;
}>;


export type GetListDetailsQuery = { __typename?: 'query_root', globalTriplesAggregate: { __typename?: 'triples_aggregate', aggregate?: { __typename?: 'triples_aggregate_fields', count: number } | null }, globalTriples: Array<{ __typename?: 'triples', id: any, vault_id: any, counter_vault_id: any, subject: { __typename?: 'atoms', id: any, vault_id: any, label?: string | null, wallet_id: string, image?: string | null, type: any, tags: { __typename?: 'triples_aggregate', nodes: Array<{ __typename?: 'triples', object: { __typename?: 'atoms', label?: string | null, vault_id: any, taggedIdentities: { __typename?: 'triples_aggregate', nodes: Array<{ __typename?: 'triples', vault_id: any, subject: { __typename?: 'atoms', label?: string | null, vault_id: any } }>, aggregate?: { __typename?: 'triples_aggregate_fields', count: number } | null } } }>, aggregate?: { __typename?: 'triples_aggregate_fields', count: number } | null } }, object: { __typename?: 'atoms', id: any, vault_id: any, label?: string | null, wallet_id: string, image?: string | null, type: any }, predicate: { __typename?: 'atoms', id: any, vault_id: any, label?: string | null, wallet_id: string, image?: string | null, type: any }, vault?: { __typename?: 'vaults', positions_aggregate: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', count: number, sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null } } | null }>, userTriplesAggregate: { __typename?: 'triples_aggregate', aggregate?: { __typename?: 'triples_aggregate_fields', count: number } | null }, userTriples: Array<{ __typename?: 'triples', id: any, vault_id: any, counter_vault_id: any, subject: { __typename?: 'atoms', id: any, vault_id: any, label?: string | null, wallet_id: string, image?: string | null, type: any, tags: { __typename?: 'triples_aggregate', nodes: Array<{ __typename?: 'triples', object: { __typename?: 'atoms', label?: string | null, vault_id: any, taggedIdentities: { __typename?: 'triples_aggregate', nodes: Array<{ __typename?: 'triples', vault_id: any, subject: { __typename?: 'atoms', label?: string | null, vault_id: any } }>, aggregate?: { __typename?: 'triples_aggregate_fields', count: number } | null } } }>, aggregate?: { __typename?: 'triples_aggregate_fields', count: number } | null } }, object: { __typename?: 'atoms', id: any, vault_id: any, label?: string | null, wallet_id: string, image?: string | null, type: any }, vault?: { __typename?: 'vaults', positions_aggregate: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', count: number, sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null } } | null }> };

export type GetPositionsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Positions_Order_By> | Positions_Order_By>;
  where?: InputMaybe<Positions_Bool_Exp>;
}>;


export type GetPositionsQuery = { __typename?: 'query_root', total: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', count: number, sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null }, positions: Array<{ __typename?: 'positions', id: string, shares: any, vault_id: any, account?: { __typename?: 'accounts', id: string, label: string, image?: string | null } | null, vault: { __typename?: 'vaults', id: any, atom?: { __typename?: 'atoms', id: any, label?: string | null, image?: string | null } | null, triple?: { __typename?: 'triples', id: any, vault?: { __typename?: 'vaults', id: any, position_count: number, positions_aggregate: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null } } | null, counter_vault?: { __typename?: 'vaults', id: any, position_count: number, positions_aggregate: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null } } | null, subject: { __typename?: 'atoms', data: string, id: any, label?: string | null, image?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, predicate: { __typename?: 'atoms', data: string, id: any, label?: string | null, image?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, object: { __typename?: 'atoms', data: string, id: any, label?: string | null, image?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null } } | null } }> };

export type GetTriplePositionsByAddressQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Positions_Order_By> | Positions_Order_By>;
  where?: InputMaybe<Positions_Bool_Exp>;
  address: Scalars['String']['input'];
}>;


export type GetTriplePositionsByAddressQuery = { __typename?: 'query_root', total: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', count: number, sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null }, positions: Array<{ __typename?: 'positions', id: string, shares: any, vault_id: any, vault: { __typename?: 'vaults', atom_id?: any | null, triple_id?: any | null, id: any, triple?: { __typename?: 'triples', id: any, vault?: { __typename?: 'vaults', id: any, position_count: number, positions: Array<{ __typename?: 'positions', shares: any, account?: { __typename?: 'accounts', id: string, label: string, image?: string | null } | null }>, positions_aggregate: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null } } | null, counter_vault?: { __typename?: 'vaults', id: any, position_count: number, positions: Array<{ __typename?: 'positions', shares: any, account?: { __typename?: 'accounts', id: string, label: string, image?: string | null } | null }>, positions_aggregate: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null } } | null, subject: { __typename?: 'atoms', data: string, id: any, label?: string | null, image?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, predicate: { __typename?: 'atoms', data: string, id: any, label?: string | null, image?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, object: { __typename?: 'atoms', data: string, id: any, label?: string | null, image?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null } } | null, atom?: { __typename?: 'atoms', id: any, label?: string | null, image?: string | null } | null }, account?: { __typename?: 'accounts', id: string, label: string, image?: string | null } | null }> };

export type GetPositionsWithAggregatesQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Positions_Order_By> | Positions_Order_By>;
  where?: InputMaybe<Positions_Bool_Exp>;
}>;


export type GetPositionsWithAggregatesQuery = { __typename?: 'query_root', positions_aggregate: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', count: number } | null, nodes: Array<{ __typename?: 'positions', id: string, shares: any, vault_id: any, account?: { __typename?: 'accounts', id: string, label: string, image?: string | null } | null, vault: { __typename?: 'vaults', id: any, atom?: { __typename?: 'atoms', id: any, label?: string | null, image?: string | null } | null, triple?: { __typename?: 'triples', id: any, vault?: { __typename?: 'vaults', id: any, position_count: number, positions_aggregate: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null } } | null, counter_vault?: { __typename?: 'vaults', id: any, position_count: number, positions_aggregate: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null } } | null, subject: { __typename?: 'atoms', data: string, id: any, label?: string | null, image?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, predicate: { __typename?: 'atoms', data: string, id: any, label?: string | null, image?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, object: { __typename?: 'atoms', data: string, id: any, label?: string | null, image?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null } } | null } }> } };

export type GetPositionsCountQueryVariables = Exact<{
  where?: InputMaybe<Positions_Bool_Exp>;
}>;


export type GetPositionsCountQuery = { __typename?: 'query_root', positions_aggregate: { __typename?: 'positions_aggregate', total?: { __typename?: 'positions_aggregate_fields', count: number, sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null } };

export type GetPositionQueryVariables = Exact<{
  positionId: Scalars['String']['input'];
}>;


export type GetPositionQuery = { __typename?: 'query_root', position?: { __typename?: 'positions', id: string, shares: any, vault_id: any, account?: { __typename?: 'accounts', id: string, label: string, image?: string | null } | null, vault: { __typename?: 'vaults', id: any, atom?: { __typename?: 'atoms', id: any, label?: string | null, image?: string | null } | null, triple?: { __typename?: 'triples', id: any, vault?: { __typename?: 'vaults', id: any, position_count: number, positions_aggregate: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null } } | null, counter_vault?: { __typename?: 'vaults', id: any, position_count: number, positions_aggregate: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null } } | null, subject: { __typename?: 'atoms', data: string, id: any, label?: string | null, image?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, predicate: { __typename?: 'atoms', data: string, id: any, label?: string | null, image?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, object: { __typename?: 'atoms', data: string, id: any, label?: string | null, image?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null } } | null } } | null };

export type GetPositionsCountByTypeQueryVariables = Exact<{
  where?: InputMaybe<Positions_Bool_Exp>;
}>;


export type GetPositionsCountByTypeQuery = { __typename?: 'query_root', positions_aggregate: { __typename?: 'positions_aggregate', total?: { __typename?: 'positions_aggregate_fields', count: number, sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null }, positions: Array<{ __typename?: 'positions', vault: { __typename?: 'vaults', atom_id?: any | null, triple_id?: any | null } }> };

export type GetStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStatsQuery = { __typename?: 'query_root', stats: Array<{ __typename?: 'stats', contract_balance?: any | null, total_accounts?: number | null, total_fees?: any | null, total_atoms?: number | null, total_triples?: number | null, total_positions?: number | null, total_signals?: number | null }> };

export type GetTagsQueryVariables = Exact<{
  subjectId: Scalars['numeric']['input'];
  predicateId: Scalars['numeric']['input'];
}>;


export type GetTagsQuery = { __typename?: 'query_root', triples: Array<{ __typename?: 'triples', id: any, subject_id: any, predicate_id: any, object_id: any, subject: { __typename?: 'atoms', data: string, id: any, image?: string | null, label?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, predicate: { __typename?: 'atoms', data: string, id: any, image?: string | null, label?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, object: { __typename?: 'atoms', data: string, id: any, image?: string | null, label?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, vault?: { __typename?: 'vaults', total_shares: any, current_share_price: any, allPositions: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', count: number, sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null }, positions: Array<{ __typename?: 'positions', shares: any, account?: { __typename?: 'accounts', id: string, label: string } | null, vault: { __typename?: 'vaults', id: any, total_shares: any, current_share_price: any } }> } | null, counter_vault?: { __typename?: 'vaults', total_shares: any, current_share_price: any, allPositions: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', count: number, sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null }, positions: Array<{ __typename?: 'positions', shares: any, account?: { __typename?: 'accounts', id: string, label: string } | null, vault: { __typename?: 'vaults', id: any, total_shares: any, current_share_price: any } }> } | null }> };

export type GetTagsCustomQueryVariables = Exact<{
  where?: InputMaybe<Triples_Bool_Exp>;
}>;


export type GetTagsCustomQuery = { __typename?: 'query_root', triples: Array<{ __typename?: 'triples', id: any, subject_id: any, predicate_id: any, object_id: any, subject: { __typename?: 'atoms', data: string, id: any, image?: string | null, label?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, predicate: { __typename?: 'atoms', data: string, id: any, image?: string | null, label?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, object: { __typename?: 'atoms', data: string, id: any, image?: string | null, label?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, vault?: { __typename?: 'vaults', total_shares: any, current_share_price: any, allPositions: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', count: number, sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null }, positions: Array<{ __typename?: 'positions', shares: any, account?: { __typename?: 'accounts', id: string, label: string } | null, vault: { __typename?: 'vaults', id: any, total_shares: any, current_share_price: any } }> } | null, counter_vault?: { __typename?: 'vaults', total_shares: any, current_share_price: any, allPositions: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', count: number, sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null }, positions: Array<{ __typename?: 'positions', shares: any, account?: { __typename?: 'accounts', id: string, label: string } | null, vault: { __typename?: 'vaults', id: any, total_shares: any, current_share_price: any } }> } | null }> };

export type GetTriplesQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Triples_Order_By> | Triples_Order_By>;
  where?: InputMaybe<Triples_Bool_Exp>;
}>;


export type GetTriplesQuery = { __typename?: 'query_root', total: { __typename?: 'triples_aggregate', aggregate?: { __typename?: 'triples_aggregate_fields', count: number } | null }, triples: Array<{ __typename?: 'triples', id: any, subject_id: any, predicate_id: any, object_id: any, block_number: any, block_timestamp: any, transaction_hash: any, creator_id: string, vault_id: any, counter_vault_id: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, subject: { __typename?: 'atoms', data: string, id: any, image?: string | null, label?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, predicate: { __typename?: 'atoms', data: string, id: any, image?: string | null, label?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, object: { __typename?: 'atoms', data: string, id: any, image?: string | null, label?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, vault?: { __typename?: 'vaults', total_shares: any, current_share_price: any, allPositions: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', count: number, sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null }, positions: Array<{ __typename?: 'positions', shares: any, id: string, vault_id: any, account?: { __typename?: 'accounts', id: string, label: string, image?: string | null } | null, vault: { __typename?: 'vaults', id: any, total_shares: any, current_share_price: any, atom?: { __typename?: 'atoms', id: any, label?: string | null, image?: string | null } | null, triple?: { __typename?: 'triples', id: any, vault?: { __typename?: 'vaults', id: any, position_count: number, positions_aggregate: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null } } | null, counter_vault?: { __typename?: 'vaults', id: any, position_count: number, positions_aggregate: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null } } | null, subject: { __typename?: 'atoms', data: string, id: any, label?: string | null, image?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, predicate: { __typename?: 'atoms', data: string, id: any, label?: string | null, image?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, object: { __typename?: 'atoms', data: string, id: any, label?: string | null, image?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null } } | null } }> } | null, counter_vault?: { __typename?: 'vaults', total_shares: any, current_share_price: any, allPositions: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', count: number, sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null }, positions: Array<{ __typename?: 'positions', shares: any, id: string, vault_id: any, account?: { __typename?: 'accounts', id: string, label: string, image?: string | null } | null, vault: { __typename?: 'vaults', id: any, total_shares: any, current_share_price: any, atom?: { __typename?: 'atoms', id: any, label?: string | null, image?: string | null } | null, triple?: { __typename?: 'triples', id: any, vault?: { __typename?: 'vaults', id: any, position_count: number, positions_aggregate: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null } } | null, counter_vault?: { __typename?: 'vaults', id: any, position_count: number, positions_aggregate: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null } } | null, subject: { __typename?: 'atoms', data: string, id: any, label?: string | null, image?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, predicate: { __typename?: 'atoms', data: string, id: any, label?: string | null, image?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, object: { __typename?: 'atoms', data: string, id: any, label?: string | null, image?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null } } | null } }> } | null }> };

export type GetTriplesWithAggregatesQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Triples_Order_By> | Triples_Order_By>;
  where?: InputMaybe<Triples_Bool_Exp>;
}>;


export type GetTriplesWithAggregatesQuery = { __typename?: 'query_root', triples_aggregate: { __typename?: 'triples_aggregate', aggregate?: { __typename?: 'triples_aggregate_fields', count: number } | null, nodes: Array<{ __typename?: 'triples', id: any, subject_id: any, predicate_id: any, object_id: any, block_number: any, block_timestamp: any, transaction_hash: any, creator_id: string, vault_id: any, counter_vault_id: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, subject: { __typename?: 'atoms', data: string, id: any, image?: string | null, label?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, predicate: { __typename?: 'atoms', data: string, id: any, image?: string | null, label?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, object: { __typename?: 'atoms', data: string, id: any, image?: string | null, label?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, vault?: { __typename?: 'vaults', total_shares: any, current_share_price: any, allPositions: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', count: number, sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null }, positions: Array<{ __typename?: 'positions', shares: any, id: string, vault_id: any, account?: { __typename?: 'accounts', id: string, label: string, image?: string | null } | null, vault: { __typename?: 'vaults', id: any, total_shares: any, current_share_price: any, atom?: { __typename?: 'atoms', id: any, label?: string | null, image?: string | null } | null, triple?: { __typename?: 'triples', id: any, vault?: { __typename?: 'vaults', id: any, position_count: number, positions_aggregate: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null } } | null, counter_vault?: { __typename?: 'vaults', id: any, position_count: number, positions_aggregate: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null } } | null, subject: { __typename?: 'atoms', data: string, id: any, label?: string | null, image?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, predicate: { __typename?: 'atoms', data: string, id: any, label?: string | null, image?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, object: { __typename?: 'atoms', data: string, id: any, label?: string | null, image?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null } } | null } }> } | null, counter_vault?: { __typename?: 'vaults', total_shares: any, current_share_price: any, allPositions: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', count: number, sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null }, positions: Array<{ __typename?: 'positions', shares: any, id: string, vault_id: any, account?: { __typename?: 'accounts', id: string, label: string, image?: string | null } | null, vault: { __typename?: 'vaults', id: any, total_shares: any, current_share_price: any, atom?: { __typename?: 'atoms', id: any, label?: string | null, image?: string | null } | null, triple?: { __typename?: 'triples', id: any, vault?: { __typename?: 'vaults', id: any, position_count: number, positions_aggregate: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null } } | null, counter_vault?: { __typename?: 'vaults', id: any, position_count: number, positions_aggregate: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null } } | null, subject: { __typename?: 'atoms', data: string, id: any, label?: string | null, image?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, predicate: { __typename?: 'atoms', data: string, id: any, label?: string | null, image?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, object: { __typename?: 'atoms', data: string, id: any, label?: string | null, image?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null } } | null } }> } | null }> } };

export type GetTriplesCountQueryVariables = Exact<{
  where?: InputMaybe<Triples_Bool_Exp>;
}>;


export type GetTriplesCountQuery = { __typename?: 'query_root', triples_aggregate: { __typename?: 'triples_aggregate', total?: { __typename?: 'triples_aggregate_fields', count: number } | null } };

export type GetTripleQueryVariables = Exact<{
  tripleId: Scalars['numeric']['input'];
}>;


export type GetTripleQuery = { __typename?: 'query_root', triple?: { __typename?: 'triples', id: any, subject_id: any, predicate_id: any, object_id: any, block_number: any, block_timestamp: any, transaction_hash: any, creator_id: string, vault_id: any, counter_vault_id: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, subject: { __typename?: 'atoms', data: string, id: any, image?: string | null, label?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, predicate: { __typename?: 'atoms', data: string, id: any, image?: string | null, label?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, object: { __typename?: 'atoms', data: string, id: any, image?: string | null, label?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, vault?: { __typename?: 'vaults', total_shares: any, current_share_price: any, allPositions: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', count: number, sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null }, positions: Array<{ __typename?: 'positions', shares: any, id: string, vault_id: any, account?: { __typename?: 'accounts', id: string, label: string, image?: string | null } | null, vault: { __typename?: 'vaults', id: any, total_shares: any, current_share_price: any, atom?: { __typename?: 'atoms', id: any, label?: string | null, image?: string | null } | null, triple?: { __typename?: 'triples', id: any, vault?: { __typename?: 'vaults', id: any, position_count: number, positions_aggregate: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null } } | null, counter_vault?: { __typename?: 'vaults', id: any, position_count: number, positions_aggregate: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null } } | null, subject: { __typename?: 'atoms', data: string, id: any, label?: string | null, image?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, predicate: { __typename?: 'atoms', data: string, id: any, label?: string | null, image?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, object: { __typename?: 'atoms', data: string, id: any, label?: string | null, image?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null } } | null } }> } | null, counter_vault?: { __typename?: 'vaults', total_shares: any, current_share_price: any, allPositions: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', count: number, sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null }, positions: Array<{ __typename?: 'positions', shares: any, id: string, vault_id: any, account?: { __typename?: 'accounts', id: string, label: string, image?: string | null } | null, vault: { __typename?: 'vaults', id: any, total_shares: any, current_share_price: any, atom?: { __typename?: 'atoms', id: any, label?: string | null, image?: string | null } | null, triple?: { __typename?: 'triples', id: any, vault?: { __typename?: 'vaults', id: any, position_count: number, positions_aggregate: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null } } | null, counter_vault?: { __typename?: 'vaults', id: any, position_count: number, positions_aggregate: { __typename?: 'positions_aggregate', aggregate?: { __typename?: 'positions_aggregate_fields', sum?: { __typename?: 'positions_sum_fields', shares?: any | null } | null } | null } } | null, subject: { __typename?: 'atoms', data: string, id: any, label?: string | null, image?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, predicate: { __typename?: 'atoms', data: string, id: any, label?: string | null, image?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null }, object: { __typename?: 'atoms', data: string, id: any, label?: string | null, image?: string | null, emoji?: string | null, type: any, creator?: { __typename?: 'accounts', label: string, image?: string | null, id: string, atom_id?: any | null, type: any } | null, value?: { __typename?: 'atom_values', person?: { __typename?: 'persons', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, thing?: { __typename?: 'things', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null, organization?: { __typename?: 'organizations', name?: string | null, image?: string | null, description?: string | null, url?: string | null } | null } | null } } | null } }> } | null } | null };

export type GetAtomTriplesWithPositionsQueryVariables = Exact<{
  where?: InputMaybe<Triples_Bool_Exp>;
}>;


export type GetAtomTriplesWithPositionsQuery = { __typename?: 'query_root', triples_aggregate: { __typename?: 'triples_aggregate', aggregate?: { __typename?: 'triples_aggregate_fields', count: number } | null } };

export type GetTriplesWithPositionsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Triples_Order_By> | Triples_Order_By>;
  where?: InputMaybe<Triples_Bool_Exp>;
  address?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetTriplesWithPositionsQuery = { __typename?: 'query_root', total: { __typename?: 'triples_aggregate', aggregate?: { __typename?: 'triples_aggregate_fields', count: number } | null }, triples: Array<{ __typename?: 'triples', id: any, subject: { __typename?: 'atoms', id: any, label?: string | null, image?: string | null }, predicate: { __typename?: 'atoms', id: any, label?: string | null, image?: string | null }, object: { __typename?: 'atoms', id: any, label?: string | null, image?: string | null }, vault?: { __typename?: 'vaults', total_shares: any, position_count: number, positions: Array<{ __typename?: 'positions', shares: any, account?: { __typename?: 'accounts', id: string, label: string, image?: string | null } | null }> } | null, counter_vault?: { __typename?: 'vaults', total_shares: any, position_count: number, positions: Array<{ __typename?: 'positions', shares: any, account?: { __typename?: 'accounts', id: string, label: string, image?: string | null } | null }> } | null }> };

export type GetVaultsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Vaults_Order_By> | Vaults_Order_By>;
  where?: InputMaybe<Vaults_Bool_Exp>;
}>;


export type GetVaultsQuery = { __typename?: 'query_root', vaults_aggregate: { __typename?: 'vaults_aggregate', aggregate?: { __typename?: 'vaults_aggregate_fields', count: number } | null, nodes: Array<{ __typename?: 'vaults', id: any, current_share_price: any, total_shares: any, atom?: { __typename?: 'atoms', id: any, label?: string | null } | null, triple?: { __typename?: 'triples', id: any, subject: { __typename?: 'atoms', id: any, label?: string | null }, predicate: { __typename?: 'atoms', id: any, label?: string | null }, object: { __typename?: 'atoms', id: any, label?: string | null } } | null, positions_aggregate: { __typename?: 'positions_aggregate', nodes: Array<{ __typename?: 'positions', shares: any, account?: { __typename?: 'accounts', id: string, label: string } | null }> } }> } };

export type GetVaultQueryVariables = Exact<{
  vaultId: Scalars['numeric']['input'];
}>;


export type GetVaultQuery = { __typename?: 'query_root', vault?: { __typename?: 'vaults', id: any, current_share_price: any, total_shares: any, atom?: { __typename?: 'atoms', id: any, label?: string | null } | null, triple?: { __typename?: 'triples', id: any, subject: { __typename?: 'atoms', id: any, label?: string | null }, predicate: { __typename?: 'atoms', id: any, label?: string | null }, object: { __typename?: 'atoms', id: any, label?: string | null } } | null } | null };


export const AccountClaimsAggregateFragmentDoc = `
    fragment AccountClaimsAggregate on accounts {
  claims_aggregate(order_by: {shares: desc}) {
    aggregate {
      count
    }
    nodes {
      triple {
        id
      }
      shares
      counter_shares
    }
  }
}
    `;
export const AccountClaimsFragmentDoc = `
    fragment AccountClaims on accounts {
  claims(
    order_by: {shares: desc}
    limit: $claimsLimit
    offset: $claimsOffset
    where: $claimsWhere
  ) {
    triple {
      id
    }
    shares
    counter_shares
  }
}
    `;
export const AccountPositionsAggregateFragmentDoc = `
    fragment AccountPositionsAggregate on accounts {
  positions_aggregate(order_by: {shares: desc}) {
    aggregate {
      count
    }
    nodes {
      id
      shares
      vault {
        id
        total_shares
        current_share_price
        atom {
          id
          label
        }
        triple {
          id
        }
      }
    }
  }
}
    `;
export const AccountPositionsFragmentDoc = `
    fragment AccountPositions on accounts {
  positions(
    order_by: {shares: desc}
    limit: $positionsLimit
    offset: $positionsOffset
    where: $positionsWhere
  ) {
    id
    shares
    vault {
      id
      total_shares
      current_share_price
      atom {
        id
        label
      }
      triple {
        id
      }
    }
  }
}
    `;
export const AccountAtomsFragmentDoc = `
    fragment AccountAtoms on accounts {
  atoms(
    where: $atomsWhere
    order_by: $atomsOrderBy
    limit: $atomsLimit
    offset: $atomsOffset
  ) {
    id
    label
    data
    vault {
      total_shares
      positions_aggregate(where: {account_id: {_eq: $address}}) {
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
    `;
export const AccountAtomsAggregateFragmentDoc = `
    fragment AccountAtomsAggregate on accounts {
  atoms_aggregate(
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
        total_shares
        positions_aggregate(where: {account_id: {_eq: $address}}) {
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
    `;
export const AccountTriplesFragmentDoc = `
    fragment AccountTriples on accounts {
  triples_aggregate(
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
    `;
export const AccountTriplesAggregateFragmentDoc = `
    fragment AccountTriplesAggregate on accounts {
  triples_aggregate(
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
    `;
export const AtomTxnFragmentDoc = `
    fragment AtomTxn on atoms {
  block_number
  block_timestamp
  transaction_hash
  creator_id
}
    `;
export const AtomVaultDetailsFragmentDoc = `
    fragment AtomVaultDetails on atoms {
  vault_id
  wallet_id
  vault {
    position_count
    total_shares
    current_share_price
    positions_aggregate {
      aggregate {
        count
        sum {
          shares
        }
      }
    }
    positions {
      id
      account {
        label
        id
      }
      shares
    }
  }
}
    `;
export const AccountMetadataFragmentDoc = `
    fragment AccountMetadata on accounts {
  label
  image
  id
  atom_id
  type
}
    `;
export const AtomTripleFragmentDoc = `
    fragment AtomTriple on atoms {
  as_subject_triples {
    id
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
  as_predicate_triples {
    id
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
  as_object_triples {
    id
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
    `;
export const AtomVaultDetailsWithPositionsFragmentDoc = `
    fragment AtomVaultDetailsWithPositions on atoms {
  vault {
    total_shares
    current_share_price
    positions_aggregate(where: {account_id: {_in: $addresses}}) {
      aggregate {
        sum {
          shares
        }
      }
      nodes {
        account {
          id
        }
        shares
      }
    }
  }
}
    `;
export const DepositEventFragmentFragmentDoc = `
    fragment DepositEventFragment on events {
  deposit {
    vault_id
    sender_assets_after_total_fees
    shares_for_receiver
    receiver {
      id
    }
    sender {
      id
    }
  }
}
    `;
export const RedemptionEventFragmentFragmentDoc = `
    fragment RedemptionEventFragment on events {
  redemption {
    vault_id
    receiver_id
    shares_redeemed_by_sender
    assets_for_receiver
  }
}
    `;
export const AtomValueFragmentDoc = `
    fragment AtomValue on atoms {
  value {
    person {
      name
      image
      description
      url
    }
    thing {
      name
      image
      description
      url
    }
    organization {
      name
      image
      description
      url
    }
  }
}
    `;
export const AtomMetadataFragmentDoc = `
    fragment AtomMetadata on atoms {
  id
  data
  image
  label
  emoji
  type
  wallet_id
  creator {
    id
    label
    image
  }
  ...AtomValue
}
    `;
export const PositionAggregateFieldsFragmentDoc = `
    fragment PositionAggregateFields on positions_aggregate {
  aggregate {
    count
    sum {
      shares
    }
  }
}
    `;
export const PositionFieldsFragmentDoc = `
    fragment PositionFields on positions {
  account {
    id
    label
  }
  shares
  vault {
    id
    total_shares
    current_share_price
  }
}
    `;
export const TripleMetadataFragmentDoc = `
    fragment TripleMetadata on triples {
  id
  subject_id
  predicate_id
  object_id
  subject {
    data
    id
    image
    label
    emoji
    type
    ...AtomValue
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
    ...AtomValue
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
    ...AtomValue
    creator {
      ...AccountMetadata
    }
  }
  vault {
    total_shares
    current_share_price
    allPositions: positions_aggregate {
      ...PositionAggregateFields
    }
    positions {
      ...PositionFields
    }
  }
  counter_vault {
    total_shares
    current_share_price
    allPositions: positions_aggregate {
      ...PositionAggregateFields
    }
    positions {
      ...PositionFields
    }
  }
}
    `;
export const EventDetailsFragmentDoc = `
    fragment EventDetails on events {
  block_number
  block_timestamp
  type
  transaction_hash
  atom_id
  triple_id
  deposit_id
  redemption_id
  ...DepositEventFragment
  ...RedemptionEventFragment
  atom {
    ...AtomMetadata
    vault {
      total_shares
      position_count
      positions {
        account_id
        shares
        account {
          id
          label
          image
        }
      }
    }
  }
  triple {
    ...TripleMetadata
    vault {
      total_shares
      position_count
      positions {
        account_id
        shares
        account {
          id
          label
          image
        }
      }
    }
    counter_vault {
      total_shares
      position_count
      positions {
        account_id
        shares
        account {
          id
          label
          image
        }
      }
    }
  }
}
    `;
export const FollowMetadataFragmentDoc = `
    fragment FollowMetadata on triples {
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
  vault {
    id
    total_shares
    current_share_price
    positions_aggregate(where: $positionsWhere) {
      aggregate {
        count
        sum {
          shares
        }
      }
    }
    positions(
      limit: $positionsLimit
      offset: $positionsOffset
      order_by: $positionsOrderBy
      where: $positionsWhere
    ) {
      account {
        id
        label
      }
      shares
    }
  }
}
    `;
export const FollowAggregateFragmentDoc = `
    fragment FollowAggregate on triples_aggregate {
  aggregate {
    count
  }
}
    `;
export const StatDetailsFragmentDoc = `
    fragment StatDetails on stats {
  contract_balance
  total_accounts
  total_fees
  total_atoms
  total_triples
  total_positions
  total_signals
}
    `;
export const TripleTxnFragmentDoc = `
    fragment TripleTxn on triples {
  block_number
  block_timestamp
  transaction_hash
  creator_id
}
    `;
export const PositionDetailsFragmentDoc = `
    fragment PositionDetails on positions {
  id
  account {
    id
    label
    image
  }
  vault {
    id
    atom {
      id
      label
      image
    }
    triple {
      id
      vault {
        id
        position_count
        positions_aggregate {
          aggregate {
            sum {
              shares
            }
          }
        }
      }
      counter_vault {
        id
        position_count
        positions_aggregate {
          aggregate {
            sum {
              shares
            }
          }
        }
      }
      subject {
        data
        id
        label
        image
        emoji
        type
        ...AtomValue
        creator {
          ...AccountMetadata
        }
      }
      predicate {
        data
        id
        label
        image
        emoji
        type
        ...AtomValue
        creator {
          ...AccountMetadata
        }
      }
      object {
        data
        id
        label
        image
        emoji
        type
        ...AtomValue
        creator {
          ...AccountMetadata
        }
      }
    }
  }
  shares
  vault_id
}
    `;
export const TripleVaultDetailsFragmentDoc = `
    fragment TripleVaultDetails on triples {
  vault_id
  counter_vault_id
  vault {
    positions {
      ...PositionDetails
    }
  }
  counter_vault {
    positions {
      ...PositionDetails
    }
  }
}
    `;
export const VaultBasicDetailsFragmentDoc = `
    fragment VaultBasicDetails on vaults {
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
  current_share_price
  total_shares
}
    `;
export const VaultFilteredPositionsFragmentDoc = `
    fragment VaultFilteredPositions on vaults {
  positions(where: {account_id: {_in: $addresses}}) {
    ...PositionFields
  }
}
    `;
export const VaultDetailsWithFilteredPositionsFragmentDoc = `
    fragment VaultDetailsWithFilteredPositions on vaults {
  ...VaultBasicDetails
  ...VaultFilteredPositions
}
    `;
export const TripleVaultCouterVaultDetailsWithPositionsFragmentDoc = `
    fragment TripleVaultCouterVaultDetailsWithPositions on triples {
  vault_id
  counter_vault_id
  vault {
    ...VaultDetailsWithFilteredPositions
  }
  counter_vault {
    ...VaultDetailsWithFilteredPositions
  }
}
    `;
export const VaultUnfilteredPositionsFragmentDoc = `
    fragment VaultUnfilteredPositions on vaults {
  positions {
    ...PositionFields
  }
}
    `;
export const VaultDetailsFragmentDoc = `
    fragment VaultDetails on vaults {
  ...VaultBasicDetails
}
    `;
export const VaultPositionsAggregateFragmentDoc = `
    fragment VaultPositionsAggregate on vaults {
  positions_aggregate {
    ...PositionAggregateFields
  }
}
    `;
export const VaultFieldsForTripleFragmentDoc = `
    fragment VaultFieldsForTriple on vaults {
  total_shares
  current_share_price
  ...VaultPositionsAggregate
  ...VaultFilteredPositions
}
    `;
export const GetAccountsDocument = `
    query GetAccounts($limit: Int, $offset: Int, $orderBy: [accounts_order_by!], $where: accounts_bool_exp, $claimsLimit: Int, $claimsOffset: Int, $claimsWhere: claims_bool_exp, $positionsLimit: Int, $positionsOffset: Int, $positionsWhere: positions_bool_exp) {
  accounts(limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
    ...AccountMetadata
    ...AccountClaims
    ...AccountPositions
    atom {
      vault_id
      wallet_id
      vault {
        position_count
        total_shares
        positions_aggregate {
          aggregate {
            count
            sum {
              shares
            }
          }
        }
        positions {
          id
          account {
            label
            id
          }
          shares
        }
      }
    }
  }
}
    ${AccountMetadataFragmentDoc}
${AccountClaimsFragmentDoc}
${AccountPositionsFragmentDoc}`;

export const useGetAccountsQuery = <
      TData = GetAccountsQuery,
      TError = unknown
    >(
      variables?: GetAccountsQueryVariables,
      options?: Omit<UseQueryOptions<GetAccountsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetAccountsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetAccountsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetAccounts'] : ['GetAccounts', variables],
    queryFn: fetcher<GetAccountsQuery, GetAccountsQueryVariables>(GetAccountsDocument, variables),
    ...options
  }
    )};

useGetAccountsQuery.document = GetAccountsDocument;

useGetAccountsQuery.getKey = (variables?: GetAccountsQueryVariables) => variables === undefined ? ['GetAccounts'] : ['GetAccounts', variables];

export const useInfiniteGetAccountsQuery = <
      TData = InfiniteData<GetAccountsQuery>,
      TError = unknown
    >(
      variables: GetAccountsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetAccountsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetAccountsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetAccountsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetAccounts.infinite'] : ['GetAccounts.infinite', variables],
      queryFn: (metaData) => fetcher<GetAccountsQuery, GetAccountsQueryVariables>(GetAccountsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetAccountsQuery.getKey = (variables?: GetAccountsQueryVariables) => variables === undefined ? ['GetAccounts.infinite'] : ['GetAccounts.infinite', variables];


useGetAccountsQuery.fetcher = (variables?: GetAccountsQueryVariables, options?: RequestInit['headers']) => fetcher<GetAccountsQuery, GetAccountsQueryVariables>(GetAccountsDocument, variables, options);

export const GetAccountsWithAggregatesDocument = `
    query GetAccountsWithAggregates($limit: Int, $offset: Int, $orderBy: [accounts_order_by!], $where: accounts_bool_exp, $claimsLimit: Int, $claimsOffset: Int, $claimsWhere: claims_bool_exp, $positionsLimit: Int, $positionsOffset: Int, $positionsWhere: positions_bool_exp, $atomsWhere: atoms_bool_exp, $atomsOrderBy: [atoms_order_by!], $atomsLimit: Int, $atomsOffset: Int) {
  accounts_aggregate(
    limit: $limit
    offset: $offset
    order_by: $orderBy
    where: $where
  ) {
    aggregate {
      count
    }
    nodes {
      ...AccountMetadata
      ...AccountClaims
      ...AccountPositions
    }
  }
}
    ${AccountMetadataFragmentDoc}
${AccountClaimsFragmentDoc}
${AccountPositionsFragmentDoc}`;

export const useGetAccountsWithAggregatesQuery = <
      TData = GetAccountsWithAggregatesQuery,
      TError = unknown
    >(
      variables?: GetAccountsWithAggregatesQueryVariables,
      options?: Omit<UseQueryOptions<GetAccountsWithAggregatesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetAccountsWithAggregatesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetAccountsWithAggregatesQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetAccountsWithAggregates'] : ['GetAccountsWithAggregates', variables],
    queryFn: fetcher<GetAccountsWithAggregatesQuery, GetAccountsWithAggregatesQueryVariables>(GetAccountsWithAggregatesDocument, variables),
    ...options
  }
    )};

useGetAccountsWithAggregatesQuery.document = GetAccountsWithAggregatesDocument;

useGetAccountsWithAggregatesQuery.getKey = (variables?: GetAccountsWithAggregatesQueryVariables) => variables === undefined ? ['GetAccountsWithAggregates'] : ['GetAccountsWithAggregates', variables];

export const useInfiniteGetAccountsWithAggregatesQuery = <
      TData = InfiniteData<GetAccountsWithAggregatesQuery>,
      TError = unknown
    >(
      variables: GetAccountsWithAggregatesQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetAccountsWithAggregatesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetAccountsWithAggregatesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetAccountsWithAggregatesQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetAccountsWithAggregates.infinite'] : ['GetAccountsWithAggregates.infinite', variables],
      queryFn: (metaData) => fetcher<GetAccountsWithAggregatesQuery, GetAccountsWithAggregatesQueryVariables>(GetAccountsWithAggregatesDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetAccountsWithAggregatesQuery.getKey = (variables?: GetAccountsWithAggregatesQueryVariables) => variables === undefined ? ['GetAccountsWithAggregates.infinite'] : ['GetAccountsWithAggregates.infinite', variables];


useGetAccountsWithAggregatesQuery.fetcher = (variables?: GetAccountsWithAggregatesQueryVariables, options?: RequestInit['headers']) => fetcher<GetAccountsWithAggregatesQuery, GetAccountsWithAggregatesQueryVariables>(GetAccountsWithAggregatesDocument, variables, options);

export const GetAccountsCountDocument = `
    query GetAccountsCount($where: accounts_bool_exp) {
  accounts_aggregate(where: $where) {
    aggregate {
      count
    }
  }
}
    `;

export const useGetAccountsCountQuery = <
      TData = GetAccountsCountQuery,
      TError = unknown
    >(
      variables?: GetAccountsCountQueryVariables,
      options?: Omit<UseQueryOptions<GetAccountsCountQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetAccountsCountQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetAccountsCountQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetAccountsCount'] : ['GetAccountsCount', variables],
    queryFn: fetcher<GetAccountsCountQuery, GetAccountsCountQueryVariables>(GetAccountsCountDocument, variables),
    ...options
  }
    )};

useGetAccountsCountQuery.document = GetAccountsCountDocument;

useGetAccountsCountQuery.getKey = (variables?: GetAccountsCountQueryVariables) => variables === undefined ? ['GetAccountsCount'] : ['GetAccountsCount', variables];

export const useInfiniteGetAccountsCountQuery = <
      TData = InfiniteData<GetAccountsCountQuery>,
      TError = unknown
    >(
      variables: GetAccountsCountQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetAccountsCountQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetAccountsCountQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetAccountsCountQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetAccountsCount.infinite'] : ['GetAccountsCount.infinite', variables],
      queryFn: (metaData) => fetcher<GetAccountsCountQuery, GetAccountsCountQueryVariables>(GetAccountsCountDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetAccountsCountQuery.getKey = (variables?: GetAccountsCountQueryVariables) => variables === undefined ? ['GetAccountsCount.infinite'] : ['GetAccountsCount.infinite', variables];


useGetAccountsCountQuery.fetcher = (variables?: GetAccountsCountQueryVariables, options?: RequestInit['headers']) => fetcher<GetAccountsCountQuery, GetAccountsCountQueryVariables>(GetAccountsCountDocument, variables, options);

export const GetAccountDocument = `
    query GetAccount($address: String!, $claimsLimit: Int, $claimsOffset: Int, $claimsWhere: claims_bool_exp, $positionsLimit: Int, $positionsOffset: Int, $positionsWhere: positions_bool_exp, $atomsWhere: atoms_bool_exp, $atomsOrderBy: [atoms_order_by!], $atomsLimit: Int, $atomsOffset: Int, $triplesWhere: triples_bool_exp, $triplesOrderBy: [triples_order_by!], $triplesLimit: Int, $triplesOffset: Int) {
  account(id: $address) {
    ...AccountMetadata
    atom {
      ...AtomMetadata
      ...AtomVaultDetails
    }
    ...AccountClaims
    ...AccountPositions
    ...AccountAtoms
    ...AccountTriples
  }
  chainlink_prices(limit: 1, order_by: {id: desc}) {
    usd
  }
}
    ${AccountMetadataFragmentDoc}
${AtomMetadataFragmentDoc}
${AtomValueFragmentDoc}
${AtomVaultDetailsFragmentDoc}
${AccountClaimsFragmentDoc}
${AccountPositionsFragmentDoc}
${AccountAtomsFragmentDoc}
${AccountTriplesFragmentDoc}`;

export const useGetAccountQuery = <
      TData = GetAccountQuery,
      TError = unknown
    >(
      variables: GetAccountQueryVariables,
      options?: Omit<UseQueryOptions<GetAccountQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetAccountQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetAccountQuery, TError, TData>(
      {
    queryKey: ['GetAccount', variables],
    queryFn: fetcher<GetAccountQuery, GetAccountQueryVariables>(GetAccountDocument, variables),
    ...options
  }
    )};

useGetAccountQuery.document = GetAccountDocument;

useGetAccountQuery.getKey = (variables: GetAccountQueryVariables) => ['GetAccount', variables];

export const useInfiniteGetAccountQuery = <
      TData = InfiniteData<GetAccountQuery>,
      TError = unknown
    >(
      variables: GetAccountQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetAccountQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetAccountQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetAccountQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['GetAccount.infinite', variables],
      queryFn: (metaData) => fetcher<GetAccountQuery, GetAccountQueryVariables>(GetAccountDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetAccountQuery.getKey = (variables: GetAccountQueryVariables) => ['GetAccount.infinite', variables];


useGetAccountQuery.fetcher = (variables: GetAccountQueryVariables, options?: RequestInit['headers']) => fetcher<GetAccountQuery, GetAccountQueryVariables>(GetAccountDocument, variables, options);

export const GetAccountWithPaginatedRelationsDocument = `
    query GetAccountWithPaginatedRelations($address: String!, $claimsLimit: Int, $claimsOffset: Int, $claimsWhere: claims_bool_exp, $positionsLimit: Int, $positionsOffset: Int, $positionsWhere: positions_bool_exp, $atomsLimit: Int, $atomsOffset: Int, $atomsWhere: atoms_bool_exp, $atomsOrderBy: [atoms_order_by!], $triplesLimit: Int, $triplesOffset: Int, $triplesWhere: triples_bool_exp, $triplesOrderBy: [triples_order_by!]) {
  account(id: $address) {
    ...AccountMetadata
    ...AccountClaims
    ...AccountPositions
    ...AccountAtoms
    ...AccountTriples
  }
}
    ${AccountMetadataFragmentDoc}
${AccountClaimsFragmentDoc}
${AccountPositionsFragmentDoc}
${AccountAtomsFragmentDoc}
${AccountTriplesFragmentDoc}`;

export const useGetAccountWithPaginatedRelationsQuery = <
      TData = GetAccountWithPaginatedRelationsQuery,
      TError = unknown
    >(
      variables: GetAccountWithPaginatedRelationsQueryVariables,
      options?: Omit<UseQueryOptions<GetAccountWithPaginatedRelationsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetAccountWithPaginatedRelationsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetAccountWithPaginatedRelationsQuery, TError, TData>(
      {
    queryKey: ['GetAccountWithPaginatedRelations', variables],
    queryFn: fetcher<GetAccountWithPaginatedRelationsQuery, GetAccountWithPaginatedRelationsQueryVariables>(GetAccountWithPaginatedRelationsDocument, variables),
    ...options
  }
    )};

useGetAccountWithPaginatedRelationsQuery.document = GetAccountWithPaginatedRelationsDocument;

useGetAccountWithPaginatedRelationsQuery.getKey = (variables: GetAccountWithPaginatedRelationsQueryVariables) => ['GetAccountWithPaginatedRelations', variables];

export const useInfiniteGetAccountWithPaginatedRelationsQuery = <
      TData = InfiniteData<GetAccountWithPaginatedRelationsQuery>,
      TError = unknown
    >(
      variables: GetAccountWithPaginatedRelationsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetAccountWithPaginatedRelationsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetAccountWithPaginatedRelationsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetAccountWithPaginatedRelationsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['GetAccountWithPaginatedRelations.infinite', variables],
      queryFn: (metaData) => fetcher<GetAccountWithPaginatedRelationsQuery, GetAccountWithPaginatedRelationsQueryVariables>(GetAccountWithPaginatedRelationsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetAccountWithPaginatedRelationsQuery.getKey = (variables: GetAccountWithPaginatedRelationsQueryVariables) => ['GetAccountWithPaginatedRelations.infinite', variables];


useGetAccountWithPaginatedRelationsQuery.fetcher = (variables: GetAccountWithPaginatedRelationsQueryVariables, options?: RequestInit['headers']) => fetcher<GetAccountWithPaginatedRelationsQuery, GetAccountWithPaginatedRelationsQueryVariables>(GetAccountWithPaginatedRelationsDocument, variables, options);

export const GetAccountWithAggregatesDocument = `
    query GetAccountWithAggregates($address: String!, $claimsLimit: Int, $claimsOffset: Int, $claimsWhere: claims_bool_exp, $positionsLimit: Int, $positionsOffset: Int, $positionsWhere: positions_bool_exp, $atomsWhere: atoms_bool_exp, $atomsOrderBy: [atoms_order_by!], $atomsLimit: Int, $atomsOffset: Int, $triplesWhere: triples_bool_exp, $triplesOrderBy: [triples_order_by!], $triplesLimit: Int, $triplesOffset: Int) {
  account(id: $address) {
    ...AccountMetadata
    ...AccountClaimsAggregate
    ...AccountPositionsAggregate
    ...AccountAtomsAggregate
    ...AccountTriplesAggregate
  }
}
    ${AccountMetadataFragmentDoc}
${AccountClaimsAggregateFragmentDoc}
${AccountPositionsAggregateFragmentDoc}
${AccountAtomsAggregateFragmentDoc}
${AccountTriplesAggregateFragmentDoc}`;

export const useGetAccountWithAggregatesQuery = <
      TData = GetAccountWithAggregatesQuery,
      TError = unknown
    >(
      variables: GetAccountWithAggregatesQueryVariables,
      options?: Omit<UseQueryOptions<GetAccountWithAggregatesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetAccountWithAggregatesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetAccountWithAggregatesQuery, TError, TData>(
      {
    queryKey: ['GetAccountWithAggregates', variables],
    queryFn: fetcher<GetAccountWithAggregatesQuery, GetAccountWithAggregatesQueryVariables>(GetAccountWithAggregatesDocument, variables),
    ...options
  }
    )};

useGetAccountWithAggregatesQuery.document = GetAccountWithAggregatesDocument;

useGetAccountWithAggregatesQuery.getKey = (variables: GetAccountWithAggregatesQueryVariables) => ['GetAccountWithAggregates', variables];

export const useInfiniteGetAccountWithAggregatesQuery = <
      TData = InfiniteData<GetAccountWithAggregatesQuery>,
      TError = unknown
    >(
      variables: GetAccountWithAggregatesQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetAccountWithAggregatesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetAccountWithAggregatesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetAccountWithAggregatesQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['GetAccountWithAggregates.infinite', variables],
      queryFn: (metaData) => fetcher<GetAccountWithAggregatesQuery, GetAccountWithAggregatesQueryVariables>(GetAccountWithAggregatesDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetAccountWithAggregatesQuery.getKey = (variables: GetAccountWithAggregatesQueryVariables) => ['GetAccountWithAggregates.infinite', variables];


useGetAccountWithAggregatesQuery.fetcher = (variables: GetAccountWithAggregatesQueryVariables, options?: RequestInit['headers']) => fetcher<GetAccountWithAggregatesQuery, GetAccountWithAggregatesQueryVariables>(GetAccountWithAggregatesDocument, variables, options);

export const GetAtomsDocument = `
    query GetAtoms($limit: Int, $offset: Int, $orderBy: [atoms_order_by!], $where: atoms_bool_exp) {
  total: atoms_aggregate(where: $where) {
    aggregate {
      count
    }
  }
  atoms(limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
    ...AtomMetadata
    ...AtomTxn
    ...AtomVaultDetails
    ...AtomTriple
    creator {
      ...AccountMetadata
    }
  }
}
    ${AtomMetadataFragmentDoc}
${AtomValueFragmentDoc}
${AtomTxnFragmentDoc}
${AtomVaultDetailsFragmentDoc}
${AtomTripleFragmentDoc}
${AccountMetadataFragmentDoc}`;

export const useGetAtomsQuery = <
      TData = GetAtomsQuery,
      TError = unknown
    >(
      variables?: GetAtomsQueryVariables,
      options?: Omit<UseQueryOptions<GetAtomsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetAtomsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetAtomsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetAtoms'] : ['GetAtoms', variables],
    queryFn: fetcher<GetAtomsQuery, GetAtomsQueryVariables>(GetAtomsDocument, variables),
    ...options
  }
    )};

useGetAtomsQuery.document = GetAtomsDocument;

useGetAtomsQuery.getKey = (variables?: GetAtomsQueryVariables) => variables === undefined ? ['GetAtoms'] : ['GetAtoms', variables];

export const useInfiniteGetAtomsQuery = <
      TData = InfiniteData<GetAtomsQuery>,
      TError = unknown
    >(
      variables: GetAtomsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetAtomsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetAtomsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetAtomsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetAtoms.infinite'] : ['GetAtoms.infinite', variables],
      queryFn: (metaData) => fetcher<GetAtomsQuery, GetAtomsQueryVariables>(GetAtomsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetAtomsQuery.getKey = (variables?: GetAtomsQueryVariables) => variables === undefined ? ['GetAtoms.infinite'] : ['GetAtoms.infinite', variables];


useGetAtomsQuery.fetcher = (variables?: GetAtomsQueryVariables, options?: RequestInit['headers']) => fetcher<GetAtomsQuery, GetAtomsQueryVariables>(GetAtomsDocument, variables, options);

export const GetAtomsWithPositionsDocument = `
    query GetAtomsWithPositions($limit: Int, $offset: Int, $orderBy: [atoms_order_by!], $where: atoms_bool_exp, $address: String) {
  total: atoms_aggregate(where: $where) {
    aggregate {
      count
    }
  }
  atoms(limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
    ...AtomMetadata
    ...AtomTxn
    vault {
      position_count
      total_shares
      current_share_price
      total: positions_aggregate {
        aggregate {
          count
          sum {
            shares
          }
        }
      }
      positions(where: {account_id: {_eq: $address}}) {
        id
        account {
          label
          id
        }
        shares
      }
    }
    creator {
      ...AccountMetadata
    }
  }
}
    ${AtomMetadataFragmentDoc}
${AtomValueFragmentDoc}
${AtomTxnFragmentDoc}
${AccountMetadataFragmentDoc}`;

export const useGetAtomsWithPositionsQuery = <
      TData = GetAtomsWithPositionsQuery,
      TError = unknown
    >(
      variables?: GetAtomsWithPositionsQueryVariables,
      options?: Omit<UseQueryOptions<GetAtomsWithPositionsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetAtomsWithPositionsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetAtomsWithPositionsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetAtomsWithPositions'] : ['GetAtomsWithPositions', variables],
    queryFn: fetcher<GetAtomsWithPositionsQuery, GetAtomsWithPositionsQueryVariables>(GetAtomsWithPositionsDocument, variables),
    ...options
  }
    )};

useGetAtomsWithPositionsQuery.document = GetAtomsWithPositionsDocument;

useGetAtomsWithPositionsQuery.getKey = (variables?: GetAtomsWithPositionsQueryVariables) => variables === undefined ? ['GetAtomsWithPositions'] : ['GetAtomsWithPositions', variables];

export const useInfiniteGetAtomsWithPositionsQuery = <
      TData = InfiniteData<GetAtomsWithPositionsQuery>,
      TError = unknown
    >(
      variables: GetAtomsWithPositionsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetAtomsWithPositionsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetAtomsWithPositionsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetAtomsWithPositionsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetAtomsWithPositions.infinite'] : ['GetAtomsWithPositions.infinite', variables],
      queryFn: (metaData) => fetcher<GetAtomsWithPositionsQuery, GetAtomsWithPositionsQueryVariables>(GetAtomsWithPositionsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetAtomsWithPositionsQuery.getKey = (variables?: GetAtomsWithPositionsQueryVariables) => variables === undefined ? ['GetAtomsWithPositions.infinite'] : ['GetAtomsWithPositions.infinite', variables];


useGetAtomsWithPositionsQuery.fetcher = (variables?: GetAtomsWithPositionsQueryVariables, options?: RequestInit['headers']) => fetcher<GetAtomsWithPositionsQuery, GetAtomsWithPositionsQueryVariables>(GetAtomsWithPositionsDocument, variables, options);

export const GetAtomsWithAggregatesDocument = `
    query GetAtomsWithAggregates($limit: Int, $offset: Int, $orderBy: [atoms_order_by!], $where: atoms_bool_exp) {
  atoms_aggregate(
    limit: $limit
    offset: $offset
    order_by: $orderBy
    where: $where
  ) {
    aggregate {
      count
    }
    nodes {
      ...AtomMetadata
      ...AtomTxn
      ...AtomVaultDetails
      creator {
        ...AccountMetadata
      }
    }
  }
}
    ${AtomMetadataFragmentDoc}
${AtomValueFragmentDoc}
${AtomTxnFragmentDoc}
${AtomVaultDetailsFragmentDoc}
${AccountMetadataFragmentDoc}`;

export const useGetAtomsWithAggregatesQuery = <
      TData = GetAtomsWithAggregatesQuery,
      TError = unknown
    >(
      variables?: GetAtomsWithAggregatesQueryVariables,
      options?: Omit<UseQueryOptions<GetAtomsWithAggregatesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetAtomsWithAggregatesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetAtomsWithAggregatesQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetAtomsWithAggregates'] : ['GetAtomsWithAggregates', variables],
    queryFn: fetcher<GetAtomsWithAggregatesQuery, GetAtomsWithAggregatesQueryVariables>(GetAtomsWithAggregatesDocument, variables),
    ...options
  }
    )};

useGetAtomsWithAggregatesQuery.document = GetAtomsWithAggregatesDocument;

useGetAtomsWithAggregatesQuery.getKey = (variables?: GetAtomsWithAggregatesQueryVariables) => variables === undefined ? ['GetAtomsWithAggregates'] : ['GetAtomsWithAggregates', variables];

export const useInfiniteGetAtomsWithAggregatesQuery = <
      TData = InfiniteData<GetAtomsWithAggregatesQuery>,
      TError = unknown
    >(
      variables: GetAtomsWithAggregatesQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetAtomsWithAggregatesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetAtomsWithAggregatesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetAtomsWithAggregatesQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetAtomsWithAggregates.infinite'] : ['GetAtomsWithAggregates.infinite', variables],
      queryFn: (metaData) => fetcher<GetAtomsWithAggregatesQuery, GetAtomsWithAggregatesQueryVariables>(GetAtomsWithAggregatesDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetAtomsWithAggregatesQuery.getKey = (variables?: GetAtomsWithAggregatesQueryVariables) => variables === undefined ? ['GetAtomsWithAggregates.infinite'] : ['GetAtomsWithAggregates.infinite', variables];


useGetAtomsWithAggregatesQuery.fetcher = (variables?: GetAtomsWithAggregatesQueryVariables, options?: RequestInit['headers']) => fetcher<GetAtomsWithAggregatesQuery, GetAtomsWithAggregatesQueryVariables>(GetAtomsWithAggregatesDocument, variables, options);

export const GetAtomsCountDocument = `
    query GetAtomsCount($where: atoms_bool_exp) {
  atoms_aggregate(where: $where) {
    aggregate {
      count
    }
  }
}
    `;

export const useGetAtomsCountQuery = <
      TData = GetAtomsCountQuery,
      TError = unknown
    >(
      variables?: GetAtomsCountQueryVariables,
      options?: Omit<UseQueryOptions<GetAtomsCountQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetAtomsCountQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetAtomsCountQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetAtomsCount'] : ['GetAtomsCount', variables],
    queryFn: fetcher<GetAtomsCountQuery, GetAtomsCountQueryVariables>(GetAtomsCountDocument, variables),
    ...options
  }
    )};

useGetAtomsCountQuery.document = GetAtomsCountDocument;

useGetAtomsCountQuery.getKey = (variables?: GetAtomsCountQueryVariables) => variables === undefined ? ['GetAtomsCount'] : ['GetAtomsCount', variables];

export const useInfiniteGetAtomsCountQuery = <
      TData = InfiniteData<GetAtomsCountQuery>,
      TError = unknown
    >(
      variables: GetAtomsCountQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetAtomsCountQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetAtomsCountQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetAtomsCountQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetAtomsCount.infinite'] : ['GetAtomsCount.infinite', variables],
      queryFn: (metaData) => fetcher<GetAtomsCountQuery, GetAtomsCountQueryVariables>(GetAtomsCountDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetAtomsCountQuery.getKey = (variables?: GetAtomsCountQueryVariables) => variables === undefined ? ['GetAtomsCount.infinite'] : ['GetAtomsCount.infinite', variables];


useGetAtomsCountQuery.fetcher = (variables?: GetAtomsCountQueryVariables, options?: RequestInit['headers']) => fetcher<GetAtomsCountQuery, GetAtomsCountQueryVariables>(GetAtomsCountDocument, variables, options);

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
}
    ${AtomMetadataFragmentDoc}
${AtomValueFragmentDoc}
${AtomTxnFragmentDoc}
${AtomVaultDetailsFragmentDoc}
${AccountMetadataFragmentDoc}
${AtomTripleFragmentDoc}`;

export const useGetAtomQuery = <
      TData = GetAtomQuery,
      TError = unknown
    >(
      variables: GetAtomQueryVariables,
      options?: Omit<UseQueryOptions<GetAtomQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetAtomQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetAtomQuery, TError, TData>(
      {
    queryKey: ['GetAtom', variables],
    queryFn: fetcher<GetAtomQuery, GetAtomQueryVariables>(GetAtomDocument, variables),
    ...options
  }
    )};

useGetAtomQuery.document = GetAtomDocument;

useGetAtomQuery.getKey = (variables: GetAtomQueryVariables) => ['GetAtom', variables];

export const useInfiniteGetAtomQuery = <
      TData = InfiniteData<GetAtomQuery>,
      TError = unknown
    >(
      variables: GetAtomQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetAtomQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetAtomQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetAtomQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['GetAtom.infinite', variables],
      queryFn: (metaData) => fetcher<GetAtomQuery, GetAtomQueryVariables>(GetAtomDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetAtomQuery.getKey = (variables: GetAtomQueryVariables) => ['GetAtom.infinite', variables];


useGetAtomQuery.fetcher = (variables: GetAtomQueryVariables, options?: RequestInit['headers']) => fetcher<GetAtomQuery, GetAtomQueryVariables>(GetAtomDocument, variables, options);

export const GetClaimsByAddressDocument = `
    query GetClaimsByAddress($address: String) {
  claims_aggregate(where: {account_id: {_eq: $address}}) {
    aggregate {
      count
    }
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
      vault_id
      counter_vault_id
      shares
      counter_shares
    }
  }
}
    `;

export const useGetClaimsByAddressQuery = <
      TData = GetClaimsByAddressQuery,
      TError = unknown
    >(
      variables?: GetClaimsByAddressQueryVariables,
      options?: Omit<UseQueryOptions<GetClaimsByAddressQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetClaimsByAddressQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetClaimsByAddressQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetClaimsByAddress'] : ['GetClaimsByAddress', variables],
    queryFn: fetcher<GetClaimsByAddressQuery, GetClaimsByAddressQueryVariables>(GetClaimsByAddressDocument, variables),
    ...options
  }
    )};

useGetClaimsByAddressQuery.document = GetClaimsByAddressDocument;

useGetClaimsByAddressQuery.getKey = (variables?: GetClaimsByAddressQueryVariables) => variables === undefined ? ['GetClaimsByAddress'] : ['GetClaimsByAddress', variables];

export const useInfiniteGetClaimsByAddressQuery = <
      TData = InfiniteData<GetClaimsByAddressQuery>,
      TError = unknown
    >(
      variables: GetClaimsByAddressQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetClaimsByAddressQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetClaimsByAddressQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetClaimsByAddressQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetClaimsByAddress.infinite'] : ['GetClaimsByAddress.infinite', variables],
      queryFn: (metaData) => fetcher<GetClaimsByAddressQuery, GetClaimsByAddressQueryVariables>(GetClaimsByAddressDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetClaimsByAddressQuery.getKey = (variables?: GetClaimsByAddressQueryVariables) => variables === undefined ? ['GetClaimsByAddress.infinite'] : ['GetClaimsByAddress.infinite', variables];


useGetClaimsByAddressQuery.fetcher = (variables?: GetClaimsByAddressQueryVariables, options?: RequestInit['headers']) => fetcher<GetClaimsByAddressQuery, GetClaimsByAddressQueryVariables>(GetClaimsByAddressDocument, variables, options);

export const GetEventsDocument = `
    query GetEvents($limit: Int, $offset: Int, $orderBy: [events_order_by!], $where: events_bool_exp, $addresses: [String!]) {
  total: events_aggregate(where: $where) {
    aggregate {
      count
    }
  }
  events(limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
    id
    block_number
    block_timestamp
    type
    transaction_hash
    atom_id
    triple_id
    deposit_id
    redemption_id
    atom {
      ...AtomMetadata
      vault {
        total_shares
        position_count
        positions(where: {account: {id: {_in: $addresses}}}) {
          account_id
          shares
          account {
            id
            label
            image
          }
        }
      }
    }
    triple {
      id
      creator {
        ...AccountMetadata
      }
      subject {
        data
        id
        image
        label
        emoji
        type
        ...AtomValue
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
        ...AtomValue
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
        ...AtomValue
        creator {
          ...AccountMetadata
        }
      }
      vault {
        total_shares
        position_count
        positions(where: {account: {id: {_in: $addresses}}}) {
          account_id
          shares
          account {
            id
            label
            image
          }
        }
      }
      counter_vault {
        total_shares
        position_count
        positions(where: {account: {id: {_in: $addresses}}}) {
          account_id
          shares
          account {
            id
            label
            image
          }
        }
      }
    }
    deposit {
      sender_id
      sender {
        id
      }
      shares_for_receiver
      sender_assets_after_total_fees
      vault {
        total_shares
        position_count
        positions(where: {account: {id: {_in: $addresses}}}) {
          account_id
          shares
          account {
            id
            label
            image
          }
        }
      }
    }
    redemption {
      sender_id
      sender {
        id
      }
    }
  }
}
    ${AtomMetadataFragmentDoc}
${AtomValueFragmentDoc}
${AccountMetadataFragmentDoc}`;

export const useGetEventsQuery = <
      TData = GetEventsQuery,
      TError = unknown
    >(
      variables?: GetEventsQueryVariables,
      options?: Omit<UseQueryOptions<GetEventsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetEventsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetEventsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetEvents'] : ['GetEvents', variables],
    queryFn: fetcher<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, variables),
    ...options
  }
    )};

useGetEventsQuery.document = GetEventsDocument;

useGetEventsQuery.getKey = (variables?: GetEventsQueryVariables) => variables === undefined ? ['GetEvents'] : ['GetEvents', variables];

export const useInfiniteGetEventsQuery = <
      TData = InfiniteData<GetEventsQuery>,
      TError = unknown
    >(
      variables: GetEventsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetEventsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetEventsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetEventsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetEvents.infinite'] : ['GetEvents.infinite', variables],
      queryFn: (metaData) => fetcher<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetEventsQuery.getKey = (variables?: GetEventsQueryVariables) => variables === undefined ? ['GetEvents.infinite'] : ['GetEvents.infinite', variables];


useGetEventsQuery.fetcher = (variables?: GetEventsQueryVariables, options?: RequestInit['headers']) => fetcher<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, variables, options);

export const GetEventsWithAggregatesDocument = `
    query GetEventsWithAggregates($limit: Int, $offset: Int, $orderBy: [events_order_by!], $where: events_bool_exp, $addresses: [String!]) {
  events_aggregate(
    where: $where
    limit: $limit
    offset: $offset
    order_by: $orderBy
  ) {
    aggregate {
      count
      max {
        block_timestamp
        block_number
      }
      min {
        block_timestamp
        block_number
      }
    }
    nodes {
      ...EventDetails
    }
  }
}
    ${EventDetailsFragmentDoc}
${DepositEventFragmentFragmentDoc}
${RedemptionEventFragmentFragmentDoc}
${AtomMetadataFragmentDoc}
${AtomValueFragmentDoc}
${TripleMetadataFragmentDoc}
${AccountMetadataFragmentDoc}
${PositionAggregateFieldsFragmentDoc}
${PositionFieldsFragmentDoc}`;

export const useGetEventsWithAggregatesQuery = <
      TData = GetEventsWithAggregatesQuery,
      TError = unknown
    >(
      variables?: GetEventsWithAggregatesQueryVariables,
      options?: Omit<UseQueryOptions<GetEventsWithAggregatesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetEventsWithAggregatesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetEventsWithAggregatesQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetEventsWithAggregates'] : ['GetEventsWithAggregates', variables],
    queryFn: fetcher<GetEventsWithAggregatesQuery, GetEventsWithAggregatesQueryVariables>(GetEventsWithAggregatesDocument, variables),
    ...options
  }
    )};

useGetEventsWithAggregatesQuery.document = GetEventsWithAggregatesDocument;

useGetEventsWithAggregatesQuery.getKey = (variables?: GetEventsWithAggregatesQueryVariables) => variables === undefined ? ['GetEventsWithAggregates'] : ['GetEventsWithAggregates', variables];

export const useInfiniteGetEventsWithAggregatesQuery = <
      TData = InfiniteData<GetEventsWithAggregatesQuery>,
      TError = unknown
    >(
      variables: GetEventsWithAggregatesQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetEventsWithAggregatesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetEventsWithAggregatesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetEventsWithAggregatesQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetEventsWithAggregates.infinite'] : ['GetEventsWithAggregates.infinite', variables],
      queryFn: (metaData) => fetcher<GetEventsWithAggregatesQuery, GetEventsWithAggregatesQueryVariables>(GetEventsWithAggregatesDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetEventsWithAggregatesQuery.getKey = (variables?: GetEventsWithAggregatesQueryVariables) => variables === undefined ? ['GetEventsWithAggregates.infinite'] : ['GetEventsWithAggregates.infinite', variables];


useGetEventsWithAggregatesQuery.fetcher = (variables?: GetEventsWithAggregatesQueryVariables, options?: RequestInit['headers']) => fetcher<GetEventsWithAggregatesQuery, GetEventsWithAggregatesQueryVariables>(GetEventsWithAggregatesDocument, variables, options);

export const GetEventsCountDocument = `
    query GetEventsCount($where: events_bool_exp) {
  events_aggregate(where: $where) {
    aggregate {
      count
    }
  }
}
    `;

export const useGetEventsCountQuery = <
      TData = GetEventsCountQuery,
      TError = unknown
    >(
      variables?: GetEventsCountQueryVariables,
      options?: Omit<UseQueryOptions<GetEventsCountQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetEventsCountQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetEventsCountQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetEventsCount'] : ['GetEventsCount', variables],
    queryFn: fetcher<GetEventsCountQuery, GetEventsCountQueryVariables>(GetEventsCountDocument, variables),
    ...options
  }
    )};

useGetEventsCountQuery.document = GetEventsCountDocument;

useGetEventsCountQuery.getKey = (variables?: GetEventsCountQueryVariables) => variables === undefined ? ['GetEventsCount'] : ['GetEventsCount', variables];

export const useInfiniteGetEventsCountQuery = <
      TData = InfiniteData<GetEventsCountQuery>,
      TError = unknown
    >(
      variables: GetEventsCountQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetEventsCountQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetEventsCountQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetEventsCountQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetEventsCount.infinite'] : ['GetEventsCount.infinite', variables],
      queryFn: (metaData) => fetcher<GetEventsCountQuery, GetEventsCountQueryVariables>(GetEventsCountDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetEventsCountQuery.getKey = (variables?: GetEventsCountQueryVariables) => variables === undefined ? ['GetEventsCount.infinite'] : ['GetEventsCount.infinite', variables];


useGetEventsCountQuery.fetcher = (variables?: GetEventsCountQueryVariables, options?: RequestInit['headers']) => fetcher<GetEventsCountQuery, GetEventsCountQueryVariables>(GetEventsCountDocument, variables, options);

export const GetEventsDataDocument = `
    query GetEventsData($where: events_bool_exp) {
  events_aggregate(where: $where) {
    aggregate {
      count
      max {
        block_timestamp
        block_number
      }
      min {
        block_timestamp
        block_number
      }
      avg {
        block_number
      }
    }
  }
}
    `;

export const useGetEventsDataQuery = <
      TData = GetEventsDataQuery,
      TError = unknown
    >(
      variables?: GetEventsDataQueryVariables,
      options?: Omit<UseQueryOptions<GetEventsDataQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetEventsDataQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetEventsDataQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetEventsData'] : ['GetEventsData', variables],
    queryFn: fetcher<GetEventsDataQuery, GetEventsDataQueryVariables>(GetEventsDataDocument, variables),
    ...options
  }
    )};

useGetEventsDataQuery.document = GetEventsDataDocument;

useGetEventsDataQuery.getKey = (variables?: GetEventsDataQueryVariables) => variables === undefined ? ['GetEventsData'] : ['GetEventsData', variables];

export const useInfiniteGetEventsDataQuery = <
      TData = InfiniteData<GetEventsDataQuery>,
      TError = unknown
    >(
      variables: GetEventsDataQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetEventsDataQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetEventsDataQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetEventsDataQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetEventsData.infinite'] : ['GetEventsData.infinite', variables],
      queryFn: (metaData) => fetcher<GetEventsDataQuery, GetEventsDataQueryVariables>(GetEventsDataDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetEventsDataQuery.getKey = (variables?: GetEventsDataQueryVariables) => variables === undefined ? ['GetEventsData.infinite'] : ['GetEventsData.infinite', variables];


useGetEventsDataQuery.fetcher = (variables?: GetEventsDataQueryVariables, options?: RequestInit['headers']) => fetcher<GetEventsDataQuery, GetEventsDataQueryVariables>(GetEventsDataDocument, variables, options);

export const GetDebugEventsDocument = `
    query GetDebugEvents($addresses: [String!]) {
  debug_events: events {
    id
    atom {
      vault {
        positions(where: {account_id: {_in: $addresses}}) {
          account_id
          shares
        }
      }
    }
  }
}
    `;

export const useGetDebugEventsQuery = <
      TData = GetDebugEventsQuery,
      TError = unknown
    >(
      variables?: GetDebugEventsQueryVariables,
      options?: Omit<UseQueryOptions<GetDebugEventsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetDebugEventsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetDebugEventsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetDebugEvents'] : ['GetDebugEvents', variables],
    queryFn: fetcher<GetDebugEventsQuery, GetDebugEventsQueryVariables>(GetDebugEventsDocument, variables),
    ...options
  }
    )};

useGetDebugEventsQuery.document = GetDebugEventsDocument;

useGetDebugEventsQuery.getKey = (variables?: GetDebugEventsQueryVariables) => variables === undefined ? ['GetDebugEvents'] : ['GetDebugEvents', variables];

export const useInfiniteGetDebugEventsQuery = <
      TData = InfiniteData<GetDebugEventsQuery>,
      TError = unknown
    >(
      variables: GetDebugEventsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetDebugEventsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetDebugEventsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetDebugEventsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetDebugEvents.infinite'] : ['GetDebugEvents.infinite', variables],
      queryFn: (metaData) => fetcher<GetDebugEventsQuery, GetDebugEventsQueryVariables>(GetDebugEventsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetDebugEventsQuery.getKey = (variables?: GetDebugEventsQueryVariables) => variables === undefined ? ['GetDebugEvents.infinite'] : ['GetDebugEvents.infinite', variables];


useGetDebugEventsQuery.fetcher = (variables?: GetDebugEventsQueryVariables, options?: RequestInit['headers']) => fetcher<GetDebugEventsQuery, GetDebugEventsQueryVariables>(GetDebugEventsDocument, variables, options);

export const GetFollowingPositionsDocument = `
    query GetFollowingPositions($subjectId: numeric!, $predicateId: numeric!, $address: String!, $limit: Int, $offset: Int, $positionsOrderBy: [positions_order_by!]) {
  triples_aggregate(
    where: {_and: [{subject_id: {_eq: $subjectId}}, {predicate_id: {_eq: $predicateId}}, {vault: {positions: {account_id: {_eq: $address}}}}]}
  ) {
    aggregate {
      count
    }
  }
  triples(
    limit: $limit
    offset: $offset
    where: {_and: [{subject_id: {_eq: $subjectId}}, {predicate_id: {_eq: $predicateId}}, {vault: {positions: {account_id: {_eq: $address}}}}]}
  ) {
    id
    subject {
      ...AtomMetadata
    }
    predicate {
      ...AtomMetadata
    }
    object {
      ...AtomMetadata
    }
    vault {
      total_shares
      current_share_price
      positions_aggregate {
        aggregate {
          count
          sum {
            shares
          }
        }
      }
      positions(where: {account_id: {_eq: $address}}, order_by: $positionsOrderBy) {
        account_id
        account {
          id
          label
        }
        shares
      }
    }
  }
}
    ${AtomMetadataFragmentDoc}
${AtomValueFragmentDoc}`;

export const useGetFollowingPositionsQuery = <
      TData = GetFollowingPositionsQuery,
      TError = unknown
    >(
      variables: GetFollowingPositionsQueryVariables,
      options?: Omit<UseQueryOptions<GetFollowingPositionsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetFollowingPositionsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetFollowingPositionsQuery, TError, TData>(
      {
    queryKey: ['GetFollowingPositions', variables],
    queryFn: fetcher<GetFollowingPositionsQuery, GetFollowingPositionsQueryVariables>(GetFollowingPositionsDocument, variables),
    ...options
  }
    )};

useGetFollowingPositionsQuery.document = GetFollowingPositionsDocument;

useGetFollowingPositionsQuery.getKey = (variables: GetFollowingPositionsQueryVariables) => ['GetFollowingPositions', variables];

export const useInfiniteGetFollowingPositionsQuery = <
      TData = InfiniteData<GetFollowingPositionsQuery>,
      TError = unknown
    >(
      variables: GetFollowingPositionsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetFollowingPositionsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetFollowingPositionsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetFollowingPositionsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['GetFollowingPositions.infinite', variables],
      queryFn: (metaData) => fetcher<GetFollowingPositionsQuery, GetFollowingPositionsQueryVariables>(GetFollowingPositionsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetFollowingPositionsQuery.getKey = (variables: GetFollowingPositionsQueryVariables) => ['GetFollowingPositions.infinite', variables];


useGetFollowingPositionsQuery.fetcher = (variables: GetFollowingPositionsQueryVariables, options?: RequestInit['headers']) => fetcher<GetFollowingPositionsQuery, GetFollowingPositionsQueryVariables>(GetFollowingPositionsDocument, variables, options);

export const GetFollowerPositionsDocument = `
    query GetFollowerPositions($subjectId: numeric!, $predicateId: numeric!, $objectId: numeric!, $positionsLimit: Int, $positionsOffset: Int, $positionsOrderBy: [positions_order_by!], $positionsWhere: positions_bool_exp) {
  triples(
    where: {_and: [{subject_id: {_eq: $subjectId}}, {predicate_id: {_eq: $predicateId}}, {object_id: {_eq: $objectId}}]}
  ) {
    id
    subject {
      ...AtomMetadata
    }
    predicate {
      ...AtomMetadata
    }
    object {
      ...AtomMetadata
    }
    vault {
      total_shares
      current_share_price
      positions_aggregate {
        aggregate {
          count
          sum {
            shares
          }
        }
      }
      positions(
        limit: $positionsLimit
        offset: $positionsOffset
        order_by: $positionsOrderBy
        where: $positionsWhere
      ) {
        account {
          id
          label
          image
        }
        shares
      }
    }
  }
}
    ${AtomMetadataFragmentDoc}
${AtomValueFragmentDoc}`;

export const useGetFollowerPositionsQuery = <
      TData = GetFollowerPositionsQuery,
      TError = unknown
    >(
      variables: GetFollowerPositionsQueryVariables,
      options?: Omit<UseQueryOptions<GetFollowerPositionsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetFollowerPositionsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetFollowerPositionsQuery, TError, TData>(
      {
    queryKey: ['GetFollowerPositions', variables],
    queryFn: fetcher<GetFollowerPositionsQuery, GetFollowerPositionsQueryVariables>(GetFollowerPositionsDocument, variables),
    ...options
  }
    )};

useGetFollowerPositionsQuery.document = GetFollowerPositionsDocument;

useGetFollowerPositionsQuery.getKey = (variables: GetFollowerPositionsQueryVariables) => ['GetFollowerPositions', variables];

export const useInfiniteGetFollowerPositionsQuery = <
      TData = InfiniteData<GetFollowerPositionsQuery>,
      TError = unknown
    >(
      variables: GetFollowerPositionsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetFollowerPositionsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetFollowerPositionsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetFollowerPositionsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['GetFollowerPositions.infinite', variables],
      queryFn: (metaData) => fetcher<GetFollowerPositionsQuery, GetFollowerPositionsQueryVariables>(GetFollowerPositionsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetFollowerPositionsQuery.getKey = (variables: GetFollowerPositionsQueryVariables) => ['GetFollowerPositions.infinite', variables];


useGetFollowerPositionsQuery.fetcher = (variables: GetFollowerPositionsQueryVariables, options?: RequestInit['headers']) => fetcher<GetFollowerPositionsQuery, GetFollowerPositionsQueryVariables>(GetFollowerPositionsDocument, variables, options);

export const GetConnectionsDocument = `
    query GetConnections($subjectId: numeric!, $predicateId: numeric!, $objectId: numeric!, $addresses: [String!], $positionsLimit: Int, $positionsOffset: Int, $positionsOrderBy: [positions_order_by!], $positionsWhere: positions_bool_exp) {
  following_count: triples_aggregate(
    where: {_and: [{subject_id: {_eq: $subjectId}}, {predicate_id: {_eq: $predicateId}}, {object_id: {_eq: $objectId}}]}
  ) {
    aggregate {
      count
    }
  }
  following: triples(
    where: {_and: [{subject_id: {_eq: $subjectId}}, {predicate_id: {_eq: $predicateId}}, {object_id: {_eq: $objectId}}]}
  ) {
    ...FollowMetadata
  }
  followers_count: triples_aggregate(
    where: {_and: [{subject_id: {_eq: $subjectId}}, {predicate_id: {_eq: $predicateId}}, {vault: {positions: {account_id: {_in: $addresses}}}}]}
  ) {
    aggregate {
      count
    }
  }
  followers: triples(
    where: {_and: [{subject_id: {_eq: $subjectId}}, {predicate_id: {_eq: $predicateId}}, {vault: {positions: {account_id: {_in: $addresses}}}}]}
  ) {
    ...FollowMetadata
  }
}
    ${FollowMetadataFragmentDoc}`;

export const useGetConnectionsQuery = <
      TData = GetConnectionsQuery,
      TError = unknown
    >(
      variables: GetConnectionsQueryVariables,
      options?: Omit<UseQueryOptions<GetConnectionsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetConnectionsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetConnectionsQuery, TError, TData>(
      {
    queryKey: ['GetConnections', variables],
    queryFn: fetcher<GetConnectionsQuery, GetConnectionsQueryVariables>(GetConnectionsDocument, variables),
    ...options
  }
    )};

useGetConnectionsQuery.document = GetConnectionsDocument;

useGetConnectionsQuery.getKey = (variables: GetConnectionsQueryVariables) => ['GetConnections', variables];

export const useInfiniteGetConnectionsQuery = <
      TData = InfiniteData<GetConnectionsQuery>,
      TError = unknown
    >(
      variables: GetConnectionsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetConnectionsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetConnectionsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetConnectionsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['GetConnections.infinite', variables],
      queryFn: (metaData) => fetcher<GetConnectionsQuery, GetConnectionsQueryVariables>(GetConnectionsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetConnectionsQuery.getKey = (variables: GetConnectionsQueryVariables) => ['GetConnections.infinite', variables];


useGetConnectionsQuery.fetcher = (variables: GetConnectionsQueryVariables, options?: RequestInit['headers']) => fetcher<GetConnectionsQuery, GetConnectionsQueryVariables>(GetConnectionsDocument, variables, options);

export const GetConnectionsCountDocument = `
    query GetConnectionsCount($subjectId: numeric!, $predicateId: numeric!, $objectId: numeric!, $address: String!) {
  following_count: triples_aggregate(
    where: {_and: [{subject_id: {_eq: $subjectId}}, {predicate_id: {_eq: $predicateId}}, {vault: {positions: {account_id: {_eq: $address}}}}]}
  ) {
    aggregate {
      count
    }
  }
  followers_count: triples(
    where: {_and: [{subject_id: {_eq: $subjectId}}, {predicate_id: {_eq: $predicateId}}, {object_id: {_eq: $objectId}}]}
  ) {
    vault {
      positions_aggregate {
        aggregate {
          count
          sum {
            shares
          }
        }
      }
    }
  }
}
    `;

export const useGetConnectionsCountQuery = <
      TData = GetConnectionsCountQuery,
      TError = unknown
    >(
      variables: GetConnectionsCountQueryVariables,
      options?: Omit<UseQueryOptions<GetConnectionsCountQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetConnectionsCountQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetConnectionsCountQuery, TError, TData>(
      {
    queryKey: ['GetConnectionsCount', variables],
    queryFn: fetcher<GetConnectionsCountQuery, GetConnectionsCountQueryVariables>(GetConnectionsCountDocument, variables),
    ...options
  }
    )};

useGetConnectionsCountQuery.document = GetConnectionsCountDocument;

useGetConnectionsCountQuery.getKey = (variables: GetConnectionsCountQueryVariables) => ['GetConnectionsCount', variables];

export const useInfiniteGetConnectionsCountQuery = <
      TData = InfiniteData<GetConnectionsCountQuery>,
      TError = unknown
    >(
      variables: GetConnectionsCountQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetConnectionsCountQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetConnectionsCountQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetConnectionsCountQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['GetConnectionsCount.infinite', variables],
      queryFn: (metaData) => fetcher<GetConnectionsCountQuery, GetConnectionsCountQueryVariables>(GetConnectionsCountDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetConnectionsCountQuery.getKey = (variables: GetConnectionsCountQueryVariables) => ['GetConnectionsCount.infinite', variables];


useGetConnectionsCountQuery.fetcher = (variables: GetConnectionsCountQueryVariables, options?: RequestInit['headers']) => fetcher<GetConnectionsCountQuery, GetConnectionsCountQueryVariables>(GetConnectionsCountDocument, variables, options);

export const GetListsDocument = `
    query GetLists($where: predicate_objects_bool_exp) {
  predicate_objects_aggregate(where: $where) {
    aggregate {
      count
    }
  }
  predicate_objects(
    where: $where
    order_by: [{claim_count: desc}, {triple_count: desc}]
  ) {
    id
    claim_count
    triple_count
    object {
      id
      label
      image
    }
  }
}
    `;

export const useGetListsQuery = <
      TData = GetListsQuery,
      TError = unknown
    >(
      variables?: GetListsQueryVariables,
      options?: Omit<UseQueryOptions<GetListsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetListsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetListsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetLists'] : ['GetLists', variables],
    queryFn: fetcher<GetListsQuery, GetListsQueryVariables>(GetListsDocument, variables),
    ...options
  }
    )};

useGetListsQuery.document = GetListsDocument;

useGetListsQuery.getKey = (variables?: GetListsQueryVariables) => variables === undefined ? ['GetLists'] : ['GetLists', variables];

export const useInfiniteGetListsQuery = <
      TData = InfiniteData<GetListsQuery>,
      TError = unknown
    >(
      variables: GetListsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetListsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetListsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetListsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetLists.infinite'] : ['GetLists.infinite', variables],
      queryFn: (metaData) => fetcher<GetListsQuery, GetListsQueryVariables>(GetListsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetListsQuery.getKey = (variables?: GetListsQueryVariables) => variables === undefined ? ['GetLists.infinite'] : ['GetLists.infinite', variables];


useGetListsQuery.fetcher = (variables?: GetListsQueryVariables, options?: RequestInit['headers']) => fetcher<GetListsQuery, GetListsQueryVariables>(GetListsDocument, variables, options);

export const GetListItemsDocument = `
    query GetListItems($predicateId: numeric, $objectId: numeric) {
  triples_aggregate(
    where: {predicate_id: {_eq: predicateId}, object_id: {_eq: $objectId}}
    order_by: [{vault: {position_count: desc}, counter_vault: {position_count: desc}}]
  ) {
    aggregate {
      count
    }
    nodes {
      ...TripleVaultDetails
    }
  }
}
    ${TripleVaultDetailsFragmentDoc}
${PositionDetailsFragmentDoc}
${AtomValueFragmentDoc}
${AccountMetadataFragmentDoc}`;

export const useGetListItemsQuery = <
      TData = GetListItemsQuery,
      TError = unknown
    >(
      variables?: GetListItemsQueryVariables,
      options?: Omit<UseQueryOptions<GetListItemsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetListItemsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetListItemsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetListItems'] : ['GetListItems', variables],
    queryFn: fetcher<GetListItemsQuery, GetListItemsQueryVariables>(GetListItemsDocument, variables),
    ...options
  }
    )};

useGetListItemsQuery.document = GetListItemsDocument;

useGetListItemsQuery.getKey = (variables?: GetListItemsQueryVariables) => variables === undefined ? ['GetListItems'] : ['GetListItems', variables];

export const useInfiniteGetListItemsQuery = <
      TData = InfiniteData<GetListItemsQuery>,
      TError = unknown
    >(
      variables: GetListItemsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetListItemsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetListItemsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetListItemsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetListItems.infinite'] : ['GetListItems.infinite', variables],
      queryFn: (metaData) => fetcher<GetListItemsQuery, GetListItemsQueryVariables>(GetListItemsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetListItemsQuery.getKey = (variables?: GetListItemsQueryVariables) => variables === undefined ? ['GetListItems.infinite'] : ['GetListItems.infinite', variables];


useGetListItemsQuery.fetcher = (variables?: GetListItemsQueryVariables, options?: RequestInit['headers']) => fetcher<GetListItemsQuery, GetListItemsQueryVariables>(GetListItemsDocument, variables, options);

export const GetListDetailsDocument = `
    query GetListDetails($globalWhere: triples_bool_exp, $userWhere: triples_bool_exp, $tagPredicateId: numeric) {
  globalTriplesAggregate: triples_aggregate(where: $globalWhere) {
    aggregate {
      count
    }
  }
  globalTriples: triples(where: $globalWhere) {
    id
    vault_id
    counter_vault_id
    subject {
      id
      vault_id
      label
      wallet_id
      image
      type
      tags: as_subject_triples_aggregate(
        where: {predicate_id: {_eq: $tagPredicateId}}
      ) {
        nodes {
          object {
            label
            vault_id
            taggedIdentities: as_object_triples_aggregate {
              nodes {
                subject {
                  label
                  vault_id
                }
                vault_id
              }
              aggregate {
                count
              }
            }
          }
        }
        aggregate {
          count
        }
      }
    }
    object {
      id
      vault_id
      label
      wallet_id
      image
      type
    }
    predicate {
      id
      vault_id
      label
      wallet_id
      image
      type
    }
    vault {
      positions_aggregate {
        aggregate {
          count
          sum {
            shares
          }
        }
      }
    }
  }
  userTriplesAggregate: triples_aggregate(where: $userWhere) {
    aggregate {
      count
    }
  }
  userTriples: triples(where: $userWhere) {
    id
    vault_id
    counter_vault_id
    subject {
      id
      vault_id
      label
      wallet_id
      image
      type
      tags: as_subject_triples_aggregate(
        where: {predicate_id: {_eq: $tagPredicateId}}
      ) {
        nodes {
          object {
            label
            vault_id
            taggedIdentities: as_object_triples_aggregate {
              nodes {
                subject {
                  label
                  vault_id
                }
                vault_id
              }
              aggregate {
                count
              }
            }
          }
        }
        aggregate {
          count
        }
      }
    }
    object {
      id
      vault_id
      label
      wallet_id
      image
      type
    }
    vault {
      positions_aggregate {
        aggregate {
          count
          sum {
            shares
          }
        }
      }
    }
  }
}
    `;

export const useGetListDetailsQuery = <
      TData = GetListDetailsQuery,
      TError = unknown
    >(
      variables?: GetListDetailsQueryVariables,
      options?: Omit<UseQueryOptions<GetListDetailsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetListDetailsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetListDetailsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetListDetails'] : ['GetListDetails', variables],
    queryFn: fetcher<GetListDetailsQuery, GetListDetailsQueryVariables>(GetListDetailsDocument, variables),
    ...options
  }
    )};

useGetListDetailsQuery.document = GetListDetailsDocument;

useGetListDetailsQuery.getKey = (variables?: GetListDetailsQueryVariables) => variables === undefined ? ['GetListDetails'] : ['GetListDetails', variables];

export const useInfiniteGetListDetailsQuery = <
      TData = InfiniteData<GetListDetailsQuery>,
      TError = unknown
    >(
      variables: GetListDetailsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetListDetailsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetListDetailsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetListDetailsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetListDetails.infinite'] : ['GetListDetails.infinite', variables],
      queryFn: (metaData) => fetcher<GetListDetailsQuery, GetListDetailsQueryVariables>(GetListDetailsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetListDetailsQuery.getKey = (variables?: GetListDetailsQueryVariables) => variables === undefined ? ['GetListDetails.infinite'] : ['GetListDetails.infinite', variables];


useGetListDetailsQuery.fetcher = (variables?: GetListDetailsQueryVariables, options?: RequestInit['headers']) => fetcher<GetListDetailsQuery, GetListDetailsQueryVariables>(GetListDetailsDocument, variables, options);

export const GetPositionsDocument = `
    query GetPositions($limit: Int, $offset: Int, $orderBy: [positions_order_by!], $where: positions_bool_exp) {
  total: positions_aggregate(where: $where) {
    aggregate {
      count
      sum {
        shares
      }
    }
  }
  positions(limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
    ...PositionDetails
  }
}
    ${PositionDetailsFragmentDoc}
${AtomValueFragmentDoc}
${AccountMetadataFragmentDoc}`;

export const useGetPositionsQuery = <
      TData = GetPositionsQuery,
      TError = unknown
    >(
      variables?: GetPositionsQueryVariables,
      options?: Omit<UseQueryOptions<GetPositionsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetPositionsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetPositionsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetPositions'] : ['GetPositions', variables],
    queryFn: fetcher<GetPositionsQuery, GetPositionsQueryVariables>(GetPositionsDocument, variables),
    ...options
  }
    )};

useGetPositionsQuery.document = GetPositionsDocument;

useGetPositionsQuery.getKey = (variables?: GetPositionsQueryVariables) => variables === undefined ? ['GetPositions'] : ['GetPositions', variables];

export const useInfiniteGetPositionsQuery = <
      TData = InfiniteData<GetPositionsQuery>,
      TError = unknown
    >(
      variables: GetPositionsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetPositionsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetPositionsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetPositionsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetPositions.infinite'] : ['GetPositions.infinite', variables],
      queryFn: (metaData) => fetcher<GetPositionsQuery, GetPositionsQueryVariables>(GetPositionsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetPositionsQuery.getKey = (variables?: GetPositionsQueryVariables) => variables === undefined ? ['GetPositions.infinite'] : ['GetPositions.infinite', variables];


useGetPositionsQuery.fetcher = (variables?: GetPositionsQueryVariables, options?: RequestInit['headers']) => fetcher<GetPositionsQuery, GetPositionsQueryVariables>(GetPositionsDocument, variables, options);

export const GetTriplePositionsByAddressDocument = `
    query GetTriplePositionsByAddress($limit: Int, $offset: Int, $orderBy: [positions_order_by!], $where: positions_bool_exp, $address: String!) {
  total: positions_aggregate(where: $where) {
    aggregate {
      count
      sum {
        shares
      }
    }
  }
  positions(limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
    ...PositionDetails
    vault {
      atom_id
      triple_id
      triple {
        vault {
          positions(where: {account_id: {_eq: $address}}) {
            account {
              id
              label
              image
            }
            shares
          }
        }
        counter_vault {
          positions(where: {account_id: {_eq: $address}}) {
            account {
              id
              label
              image
            }
            shares
          }
        }
      }
    }
  }
}
    ${PositionDetailsFragmentDoc}
${AtomValueFragmentDoc}
${AccountMetadataFragmentDoc}`;

export const useGetTriplePositionsByAddressQuery = <
      TData = GetTriplePositionsByAddressQuery,
      TError = unknown
    >(
      variables: GetTriplePositionsByAddressQueryVariables,
      options?: Omit<UseQueryOptions<GetTriplePositionsByAddressQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetTriplePositionsByAddressQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetTriplePositionsByAddressQuery, TError, TData>(
      {
    queryKey: ['GetTriplePositionsByAddress', variables],
    queryFn: fetcher<GetTriplePositionsByAddressQuery, GetTriplePositionsByAddressQueryVariables>(GetTriplePositionsByAddressDocument, variables),
    ...options
  }
    )};

useGetTriplePositionsByAddressQuery.document = GetTriplePositionsByAddressDocument;

useGetTriplePositionsByAddressQuery.getKey = (variables: GetTriplePositionsByAddressQueryVariables) => ['GetTriplePositionsByAddress', variables];

export const useInfiniteGetTriplePositionsByAddressQuery = <
      TData = InfiniteData<GetTriplePositionsByAddressQuery>,
      TError = unknown
    >(
      variables: GetTriplePositionsByAddressQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetTriplePositionsByAddressQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetTriplePositionsByAddressQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetTriplePositionsByAddressQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['GetTriplePositionsByAddress.infinite', variables],
      queryFn: (metaData) => fetcher<GetTriplePositionsByAddressQuery, GetTriplePositionsByAddressQueryVariables>(GetTriplePositionsByAddressDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetTriplePositionsByAddressQuery.getKey = (variables: GetTriplePositionsByAddressQueryVariables) => ['GetTriplePositionsByAddress.infinite', variables];


useGetTriplePositionsByAddressQuery.fetcher = (variables: GetTriplePositionsByAddressQueryVariables, options?: RequestInit['headers']) => fetcher<GetTriplePositionsByAddressQuery, GetTriplePositionsByAddressQueryVariables>(GetTriplePositionsByAddressDocument, variables, options);

export const GetPositionsWithAggregatesDocument = `
    query GetPositionsWithAggregates($limit: Int, $offset: Int, $orderBy: [positions_order_by!], $where: positions_bool_exp) {
  positions_aggregate(
    limit: $limit
    offset: $offset
    order_by: $orderBy
    where: $where
  ) {
    aggregate {
      count
    }
    nodes {
      ...PositionDetails
    }
  }
}
    ${PositionDetailsFragmentDoc}
${AtomValueFragmentDoc}
${AccountMetadataFragmentDoc}`;

export const useGetPositionsWithAggregatesQuery = <
      TData = GetPositionsWithAggregatesQuery,
      TError = unknown
    >(
      variables?: GetPositionsWithAggregatesQueryVariables,
      options?: Omit<UseQueryOptions<GetPositionsWithAggregatesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetPositionsWithAggregatesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetPositionsWithAggregatesQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetPositionsWithAggregates'] : ['GetPositionsWithAggregates', variables],
    queryFn: fetcher<GetPositionsWithAggregatesQuery, GetPositionsWithAggregatesQueryVariables>(GetPositionsWithAggregatesDocument, variables),
    ...options
  }
    )};

useGetPositionsWithAggregatesQuery.document = GetPositionsWithAggregatesDocument;

useGetPositionsWithAggregatesQuery.getKey = (variables?: GetPositionsWithAggregatesQueryVariables) => variables === undefined ? ['GetPositionsWithAggregates'] : ['GetPositionsWithAggregates', variables];

export const useInfiniteGetPositionsWithAggregatesQuery = <
      TData = InfiniteData<GetPositionsWithAggregatesQuery>,
      TError = unknown
    >(
      variables: GetPositionsWithAggregatesQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetPositionsWithAggregatesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetPositionsWithAggregatesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetPositionsWithAggregatesQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetPositionsWithAggregates.infinite'] : ['GetPositionsWithAggregates.infinite', variables],
      queryFn: (metaData) => fetcher<GetPositionsWithAggregatesQuery, GetPositionsWithAggregatesQueryVariables>(GetPositionsWithAggregatesDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetPositionsWithAggregatesQuery.getKey = (variables?: GetPositionsWithAggregatesQueryVariables) => variables === undefined ? ['GetPositionsWithAggregates.infinite'] : ['GetPositionsWithAggregates.infinite', variables];


useGetPositionsWithAggregatesQuery.fetcher = (variables?: GetPositionsWithAggregatesQueryVariables, options?: RequestInit['headers']) => fetcher<GetPositionsWithAggregatesQuery, GetPositionsWithAggregatesQueryVariables>(GetPositionsWithAggregatesDocument, variables, options);

export const GetPositionsCountDocument = `
    query GetPositionsCount($where: positions_bool_exp) {
  positions_aggregate(where: $where) {
    total: aggregate {
      count
      sum {
        shares
      }
    }
  }
}
    `;

export const useGetPositionsCountQuery = <
      TData = GetPositionsCountQuery,
      TError = unknown
    >(
      variables?: GetPositionsCountQueryVariables,
      options?: Omit<UseQueryOptions<GetPositionsCountQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetPositionsCountQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetPositionsCountQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetPositionsCount'] : ['GetPositionsCount', variables],
    queryFn: fetcher<GetPositionsCountQuery, GetPositionsCountQueryVariables>(GetPositionsCountDocument, variables),
    ...options
  }
    )};

useGetPositionsCountQuery.document = GetPositionsCountDocument;

useGetPositionsCountQuery.getKey = (variables?: GetPositionsCountQueryVariables) => variables === undefined ? ['GetPositionsCount'] : ['GetPositionsCount', variables];

export const useInfiniteGetPositionsCountQuery = <
      TData = InfiniteData<GetPositionsCountQuery>,
      TError = unknown
    >(
      variables: GetPositionsCountQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetPositionsCountQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetPositionsCountQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetPositionsCountQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetPositionsCount.infinite'] : ['GetPositionsCount.infinite', variables],
      queryFn: (metaData) => fetcher<GetPositionsCountQuery, GetPositionsCountQueryVariables>(GetPositionsCountDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetPositionsCountQuery.getKey = (variables?: GetPositionsCountQueryVariables) => variables === undefined ? ['GetPositionsCount.infinite'] : ['GetPositionsCount.infinite', variables];


useGetPositionsCountQuery.fetcher = (variables?: GetPositionsCountQueryVariables, options?: RequestInit['headers']) => fetcher<GetPositionsCountQuery, GetPositionsCountQueryVariables>(GetPositionsCountDocument, variables, options);

export const GetPositionDocument = `
    query GetPosition($positionId: String!) {
  position(id: $positionId) {
    ...PositionDetails
  }
}
    ${PositionDetailsFragmentDoc}
${AtomValueFragmentDoc}
${AccountMetadataFragmentDoc}`;

export const useGetPositionQuery = <
      TData = GetPositionQuery,
      TError = unknown
    >(
      variables: GetPositionQueryVariables,
      options?: Omit<UseQueryOptions<GetPositionQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetPositionQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetPositionQuery, TError, TData>(
      {
    queryKey: ['GetPosition', variables],
    queryFn: fetcher<GetPositionQuery, GetPositionQueryVariables>(GetPositionDocument, variables),
    ...options
  }
    )};

useGetPositionQuery.document = GetPositionDocument;

useGetPositionQuery.getKey = (variables: GetPositionQueryVariables) => ['GetPosition', variables];

export const useInfiniteGetPositionQuery = <
      TData = InfiniteData<GetPositionQuery>,
      TError = unknown
    >(
      variables: GetPositionQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetPositionQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetPositionQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetPositionQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['GetPosition.infinite', variables],
      queryFn: (metaData) => fetcher<GetPositionQuery, GetPositionQueryVariables>(GetPositionDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetPositionQuery.getKey = (variables: GetPositionQueryVariables) => ['GetPosition.infinite', variables];


useGetPositionQuery.fetcher = (variables: GetPositionQueryVariables, options?: RequestInit['headers']) => fetcher<GetPositionQuery, GetPositionQueryVariables>(GetPositionDocument, variables, options);

export const GetPositionsCountByTypeDocument = `
    query GetPositionsCountByType($where: positions_bool_exp) {
  positions_aggregate(where: $where) {
    total: aggregate {
      count
      sum {
        shares
      }
    }
  }
  positions {
    vault {
      atom_id
      triple_id
    }
  }
}
    `;

export const useGetPositionsCountByTypeQuery = <
      TData = GetPositionsCountByTypeQuery,
      TError = unknown
    >(
      variables?: GetPositionsCountByTypeQueryVariables,
      options?: Omit<UseQueryOptions<GetPositionsCountByTypeQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetPositionsCountByTypeQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetPositionsCountByTypeQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetPositionsCountByType'] : ['GetPositionsCountByType', variables],
    queryFn: fetcher<GetPositionsCountByTypeQuery, GetPositionsCountByTypeQueryVariables>(GetPositionsCountByTypeDocument, variables),
    ...options
  }
    )};

useGetPositionsCountByTypeQuery.document = GetPositionsCountByTypeDocument;

useGetPositionsCountByTypeQuery.getKey = (variables?: GetPositionsCountByTypeQueryVariables) => variables === undefined ? ['GetPositionsCountByType'] : ['GetPositionsCountByType', variables];

export const useInfiniteGetPositionsCountByTypeQuery = <
      TData = InfiniteData<GetPositionsCountByTypeQuery>,
      TError = unknown
    >(
      variables: GetPositionsCountByTypeQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetPositionsCountByTypeQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetPositionsCountByTypeQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetPositionsCountByTypeQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetPositionsCountByType.infinite'] : ['GetPositionsCountByType.infinite', variables],
      queryFn: (metaData) => fetcher<GetPositionsCountByTypeQuery, GetPositionsCountByTypeQueryVariables>(GetPositionsCountByTypeDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetPositionsCountByTypeQuery.getKey = (variables?: GetPositionsCountByTypeQueryVariables) => variables === undefined ? ['GetPositionsCountByType.infinite'] : ['GetPositionsCountByType.infinite', variables];


useGetPositionsCountByTypeQuery.fetcher = (variables?: GetPositionsCountByTypeQueryVariables, options?: RequestInit['headers']) => fetcher<GetPositionsCountByTypeQuery, GetPositionsCountByTypeQueryVariables>(GetPositionsCountByTypeDocument, variables, options);

export const GetStatsDocument = `
    query GetStats {
  stats {
    ...StatDetails
  }
}
    ${StatDetailsFragmentDoc}`;

export const useGetStatsQuery = <
      TData = GetStatsQuery,
      TError = unknown
    >(
      variables?: GetStatsQueryVariables,
      options?: Omit<UseQueryOptions<GetStatsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetStatsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetStatsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetStats'] : ['GetStats', variables],
    queryFn: fetcher<GetStatsQuery, GetStatsQueryVariables>(GetStatsDocument, variables),
    ...options
  }
    )};

useGetStatsQuery.document = GetStatsDocument;

useGetStatsQuery.getKey = (variables?: GetStatsQueryVariables) => variables === undefined ? ['GetStats'] : ['GetStats', variables];

export const useInfiniteGetStatsQuery = <
      TData = InfiniteData<GetStatsQuery>,
      TError = unknown
    >(
      variables: GetStatsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetStatsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetStatsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetStatsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetStats.infinite'] : ['GetStats.infinite', variables],
      queryFn: (metaData) => fetcher<GetStatsQuery, GetStatsQueryVariables>(GetStatsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetStatsQuery.getKey = (variables?: GetStatsQueryVariables) => variables === undefined ? ['GetStats.infinite'] : ['GetStats.infinite', variables];


useGetStatsQuery.fetcher = (variables?: GetStatsQueryVariables, options?: RequestInit['headers']) => fetcher<GetStatsQuery, GetStatsQueryVariables>(GetStatsDocument, variables, options);

export const GetTagsDocument = `
    query GetTags($subjectId: numeric!, $predicateId: numeric!) {
  triples(
    where: {_and: [{subject_id: {_eq: $subjectId}}, {predicate_id: {_eq: $predicateId}}]}
  ) {
    ...TripleMetadata
  }
}
    ${TripleMetadataFragmentDoc}
${AtomValueFragmentDoc}
${AccountMetadataFragmentDoc}
${PositionAggregateFieldsFragmentDoc}
${PositionFieldsFragmentDoc}`;

export const useGetTagsQuery = <
      TData = GetTagsQuery,
      TError = unknown
    >(
      variables: GetTagsQueryVariables,
      options?: Omit<UseQueryOptions<GetTagsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetTagsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetTagsQuery, TError, TData>(
      {
    queryKey: ['GetTags', variables],
    queryFn: fetcher<GetTagsQuery, GetTagsQueryVariables>(GetTagsDocument, variables),
    ...options
  }
    )};

useGetTagsQuery.document = GetTagsDocument;

useGetTagsQuery.getKey = (variables: GetTagsQueryVariables) => ['GetTags', variables];

export const useInfiniteGetTagsQuery = <
      TData = InfiniteData<GetTagsQuery>,
      TError = unknown
    >(
      variables: GetTagsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetTagsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetTagsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetTagsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['GetTags.infinite', variables],
      queryFn: (metaData) => fetcher<GetTagsQuery, GetTagsQueryVariables>(GetTagsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetTagsQuery.getKey = (variables: GetTagsQueryVariables) => ['GetTags.infinite', variables];


useGetTagsQuery.fetcher = (variables: GetTagsQueryVariables, options?: RequestInit['headers']) => fetcher<GetTagsQuery, GetTagsQueryVariables>(GetTagsDocument, variables, options);

export const GetTagsCustomDocument = `
    query GetTagsCustom($where: triples_bool_exp) {
  triples(where: $where) {
    ...TripleMetadata
  }
}
    ${TripleMetadataFragmentDoc}
${AtomValueFragmentDoc}
${AccountMetadataFragmentDoc}
${PositionAggregateFieldsFragmentDoc}
${PositionFieldsFragmentDoc}`;

export const useGetTagsCustomQuery = <
      TData = GetTagsCustomQuery,
      TError = unknown
    >(
      variables?: GetTagsCustomQueryVariables,
      options?: Omit<UseQueryOptions<GetTagsCustomQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetTagsCustomQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetTagsCustomQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetTagsCustom'] : ['GetTagsCustom', variables],
    queryFn: fetcher<GetTagsCustomQuery, GetTagsCustomQueryVariables>(GetTagsCustomDocument, variables),
    ...options
  }
    )};

useGetTagsCustomQuery.document = GetTagsCustomDocument;

useGetTagsCustomQuery.getKey = (variables?: GetTagsCustomQueryVariables) => variables === undefined ? ['GetTagsCustom'] : ['GetTagsCustom', variables];

export const useInfiniteGetTagsCustomQuery = <
      TData = InfiniteData<GetTagsCustomQuery>,
      TError = unknown
    >(
      variables: GetTagsCustomQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetTagsCustomQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetTagsCustomQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetTagsCustomQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetTagsCustom.infinite'] : ['GetTagsCustom.infinite', variables],
      queryFn: (metaData) => fetcher<GetTagsCustomQuery, GetTagsCustomQueryVariables>(GetTagsCustomDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetTagsCustomQuery.getKey = (variables?: GetTagsCustomQueryVariables) => variables === undefined ? ['GetTagsCustom.infinite'] : ['GetTagsCustom.infinite', variables];


useGetTagsCustomQuery.fetcher = (variables?: GetTagsCustomQueryVariables, options?: RequestInit['headers']) => fetcher<GetTagsCustomQuery, GetTagsCustomQueryVariables>(GetTagsCustomDocument, variables, options);

export const GetTriplesDocument = `
    query GetTriples($limit: Int, $offset: Int, $orderBy: [triples_order_by!], $where: triples_bool_exp) {
  total: triples_aggregate(where: $where) {
    aggregate {
      count
    }
  }
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
${AtomValueFragmentDoc}
${AccountMetadataFragmentDoc}
${PositionAggregateFieldsFragmentDoc}
${PositionFieldsFragmentDoc}
${TripleTxnFragmentDoc}
${TripleVaultDetailsFragmentDoc}
${PositionDetailsFragmentDoc}`;

export const useGetTriplesQuery = <
      TData = GetTriplesQuery,
      TError = unknown
    >(
      variables?: GetTriplesQueryVariables,
      options?: Omit<UseQueryOptions<GetTriplesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetTriplesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetTriplesQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetTriples'] : ['GetTriples', variables],
    queryFn: fetcher<GetTriplesQuery, GetTriplesQueryVariables>(GetTriplesDocument, variables),
    ...options
  }
    )};

useGetTriplesQuery.document = GetTriplesDocument;

useGetTriplesQuery.getKey = (variables?: GetTriplesQueryVariables) => variables === undefined ? ['GetTriples'] : ['GetTriples', variables];

export const useInfiniteGetTriplesQuery = <
      TData = InfiniteData<GetTriplesQuery>,
      TError = unknown
    >(
      variables: GetTriplesQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetTriplesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetTriplesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetTriplesQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetTriples.infinite'] : ['GetTriples.infinite', variables],
      queryFn: (metaData) => fetcher<GetTriplesQuery, GetTriplesQueryVariables>(GetTriplesDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetTriplesQuery.getKey = (variables?: GetTriplesQueryVariables) => variables === undefined ? ['GetTriples.infinite'] : ['GetTriples.infinite', variables];


useGetTriplesQuery.fetcher = (variables?: GetTriplesQueryVariables, options?: RequestInit['headers']) => fetcher<GetTriplesQuery, GetTriplesQueryVariables>(GetTriplesDocument, variables, options);

export const GetTriplesWithAggregatesDocument = `
    query GetTriplesWithAggregates($limit: Int, $offset: Int, $orderBy: [triples_order_by!], $where: triples_bool_exp) {
  triples_aggregate(
    limit: $limit
    offset: $offset
    order_by: $orderBy
    where: $where
  ) {
    aggregate {
      count
    }
    nodes {
      ...TripleMetadata
      ...TripleTxn
      ...TripleVaultDetails
      creator {
        ...AccountMetadata
      }
    }
  }
}
    ${TripleMetadataFragmentDoc}
${AtomValueFragmentDoc}
${AccountMetadataFragmentDoc}
${PositionAggregateFieldsFragmentDoc}
${PositionFieldsFragmentDoc}
${TripleTxnFragmentDoc}
${TripleVaultDetailsFragmentDoc}
${PositionDetailsFragmentDoc}`;

export const useGetTriplesWithAggregatesQuery = <
      TData = GetTriplesWithAggregatesQuery,
      TError = unknown
    >(
      variables?: GetTriplesWithAggregatesQueryVariables,
      options?: Omit<UseQueryOptions<GetTriplesWithAggregatesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetTriplesWithAggregatesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetTriplesWithAggregatesQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetTriplesWithAggregates'] : ['GetTriplesWithAggregates', variables],
    queryFn: fetcher<GetTriplesWithAggregatesQuery, GetTriplesWithAggregatesQueryVariables>(GetTriplesWithAggregatesDocument, variables),
    ...options
  }
    )};

useGetTriplesWithAggregatesQuery.document = GetTriplesWithAggregatesDocument;

useGetTriplesWithAggregatesQuery.getKey = (variables?: GetTriplesWithAggregatesQueryVariables) => variables === undefined ? ['GetTriplesWithAggregates'] : ['GetTriplesWithAggregates', variables];

export const useInfiniteGetTriplesWithAggregatesQuery = <
      TData = InfiniteData<GetTriplesWithAggregatesQuery>,
      TError = unknown
    >(
      variables: GetTriplesWithAggregatesQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetTriplesWithAggregatesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetTriplesWithAggregatesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetTriplesWithAggregatesQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetTriplesWithAggregates.infinite'] : ['GetTriplesWithAggregates.infinite', variables],
      queryFn: (metaData) => fetcher<GetTriplesWithAggregatesQuery, GetTriplesWithAggregatesQueryVariables>(GetTriplesWithAggregatesDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetTriplesWithAggregatesQuery.getKey = (variables?: GetTriplesWithAggregatesQueryVariables) => variables === undefined ? ['GetTriplesWithAggregates.infinite'] : ['GetTriplesWithAggregates.infinite', variables];


useGetTriplesWithAggregatesQuery.fetcher = (variables?: GetTriplesWithAggregatesQueryVariables, options?: RequestInit['headers']) => fetcher<GetTriplesWithAggregatesQuery, GetTriplesWithAggregatesQueryVariables>(GetTriplesWithAggregatesDocument, variables, options);

export const GetTriplesCountDocument = `
    query GetTriplesCount($where: triples_bool_exp) {
  triples_aggregate(where: $where) {
    total: aggregate {
      count
    }
  }
}
    `;

export const useGetTriplesCountQuery = <
      TData = GetTriplesCountQuery,
      TError = unknown
    >(
      variables?: GetTriplesCountQueryVariables,
      options?: Omit<UseQueryOptions<GetTriplesCountQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetTriplesCountQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetTriplesCountQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetTriplesCount'] : ['GetTriplesCount', variables],
    queryFn: fetcher<GetTriplesCountQuery, GetTriplesCountQueryVariables>(GetTriplesCountDocument, variables),
    ...options
  }
    )};

useGetTriplesCountQuery.document = GetTriplesCountDocument;

useGetTriplesCountQuery.getKey = (variables?: GetTriplesCountQueryVariables) => variables === undefined ? ['GetTriplesCount'] : ['GetTriplesCount', variables];

export const useInfiniteGetTriplesCountQuery = <
      TData = InfiniteData<GetTriplesCountQuery>,
      TError = unknown
    >(
      variables: GetTriplesCountQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetTriplesCountQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetTriplesCountQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetTriplesCountQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetTriplesCount.infinite'] : ['GetTriplesCount.infinite', variables],
      queryFn: (metaData) => fetcher<GetTriplesCountQuery, GetTriplesCountQueryVariables>(GetTriplesCountDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetTriplesCountQuery.getKey = (variables?: GetTriplesCountQueryVariables) => variables === undefined ? ['GetTriplesCount.infinite'] : ['GetTriplesCount.infinite', variables];


useGetTriplesCountQuery.fetcher = (variables?: GetTriplesCountQueryVariables, options?: RequestInit['headers']) => fetcher<GetTriplesCountQuery, GetTriplesCountQueryVariables>(GetTriplesCountDocument, variables, options);

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
${AtomValueFragmentDoc}
${AccountMetadataFragmentDoc}
${PositionAggregateFieldsFragmentDoc}
${PositionFieldsFragmentDoc}
${TripleTxnFragmentDoc}
${TripleVaultDetailsFragmentDoc}
${PositionDetailsFragmentDoc}`;

export const useGetTripleQuery = <
      TData = GetTripleQuery,
      TError = unknown
    >(
      variables: GetTripleQueryVariables,
      options?: Omit<UseQueryOptions<GetTripleQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetTripleQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetTripleQuery, TError, TData>(
      {
    queryKey: ['GetTriple', variables],
    queryFn: fetcher<GetTripleQuery, GetTripleQueryVariables>(GetTripleDocument, variables),
    ...options
  }
    )};

useGetTripleQuery.document = GetTripleDocument;

useGetTripleQuery.getKey = (variables: GetTripleQueryVariables) => ['GetTriple', variables];

export const useInfiniteGetTripleQuery = <
      TData = InfiniteData<GetTripleQuery>,
      TError = unknown
    >(
      variables: GetTripleQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetTripleQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetTripleQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetTripleQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['GetTriple.infinite', variables],
      queryFn: (metaData) => fetcher<GetTripleQuery, GetTripleQueryVariables>(GetTripleDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetTripleQuery.getKey = (variables: GetTripleQueryVariables) => ['GetTriple.infinite', variables];


useGetTripleQuery.fetcher = (variables: GetTripleQueryVariables, options?: RequestInit['headers']) => fetcher<GetTripleQuery, GetTripleQueryVariables>(GetTripleDocument, variables, options);

export const GetAtomTriplesWithPositionsDocument = `
    query GetAtomTriplesWithPositions($where: triples_bool_exp) {
  triples_aggregate(where: $where) {
    aggregate {
      count
    }
  }
}
    `;

export const useGetAtomTriplesWithPositionsQuery = <
      TData = GetAtomTriplesWithPositionsQuery,
      TError = unknown
    >(
      variables?: GetAtomTriplesWithPositionsQueryVariables,
      options?: Omit<UseQueryOptions<GetAtomTriplesWithPositionsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetAtomTriplesWithPositionsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetAtomTriplesWithPositionsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetAtomTriplesWithPositions'] : ['GetAtomTriplesWithPositions', variables],
    queryFn: fetcher<GetAtomTriplesWithPositionsQuery, GetAtomTriplesWithPositionsQueryVariables>(GetAtomTriplesWithPositionsDocument, variables),
    ...options
  }
    )};

useGetAtomTriplesWithPositionsQuery.document = GetAtomTriplesWithPositionsDocument;

useGetAtomTriplesWithPositionsQuery.getKey = (variables?: GetAtomTriplesWithPositionsQueryVariables) => variables === undefined ? ['GetAtomTriplesWithPositions'] : ['GetAtomTriplesWithPositions', variables];

export const useInfiniteGetAtomTriplesWithPositionsQuery = <
      TData = InfiniteData<GetAtomTriplesWithPositionsQuery>,
      TError = unknown
    >(
      variables: GetAtomTriplesWithPositionsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetAtomTriplesWithPositionsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetAtomTriplesWithPositionsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetAtomTriplesWithPositionsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetAtomTriplesWithPositions.infinite'] : ['GetAtomTriplesWithPositions.infinite', variables],
      queryFn: (metaData) => fetcher<GetAtomTriplesWithPositionsQuery, GetAtomTriplesWithPositionsQueryVariables>(GetAtomTriplesWithPositionsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetAtomTriplesWithPositionsQuery.getKey = (variables?: GetAtomTriplesWithPositionsQueryVariables) => variables === undefined ? ['GetAtomTriplesWithPositions.infinite'] : ['GetAtomTriplesWithPositions.infinite', variables];


useGetAtomTriplesWithPositionsQuery.fetcher = (variables?: GetAtomTriplesWithPositionsQueryVariables, options?: RequestInit['headers']) => fetcher<GetAtomTriplesWithPositionsQuery, GetAtomTriplesWithPositionsQueryVariables>(GetAtomTriplesWithPositionsDocument, variables, options);

export const GetTriplesWithPositionsDocument = `
    query GetTriplesWithPositions($limit: Int, $offset: Int, $orderBy: [triples_order_by!], $where: triples_bool_exp, $address: String) {
  total: triples_aggregate(where: $where) {
    aggregate {
      count
    }
  }
  triples(limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
    id
    subject {
      id
      label
      image
    }
    predicate {
      id
      label
      image
    }
    object {
      id
      label
      image
    }
    vault {
      total_shares
      position_count
      positions(where: {account_id: {_eq: $address}}) {
        account {
          id
          label
          image
        }
        shares
      }
    }
    counter_vault {
      total_shares
      position_count
      positions(where: {account_id: {_eq: $address}}) {
        account {
          id
          label
          image
        }
        shares
      }
    }
  }
}
    `;

export const useGetTriplesWithPositionsQuery = <
      TData = GetTriplesWithPositionsQuery,
      TError = unknown
    >(
      variables?: GetTriplesWithPositionsQueryVariables,
      options?: Omit<UseQueryOptions<GetTriplesWithPositionsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetTriplesWithPositionsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetTriplesWithPositionsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetTriplesWithPositions'] : ['GetTriplesWithPositions', variables],
    queryFn: fetcher<GetTriplesWithPositionsQuery, GetTriplesWithPositionsQueryVariables>(GetTriplesWithPositionsDocument, variables),
    ...options
  }
    )};

useGetTriplesWithPositionsQuery.document = GetTriplesWithPositionsDocument;

useGetTriplesWithPositionsQuery.getKey = (variables?: GetTriplesWithPositionsQueryVariables) => variables === undefined ? ['GetTriplesWithPositions'] : ['GetTriplesWithPositions', variables];

export const useInfiniteGetTriplesWithPositionsQuery = <
      TData = InfiniteData<GetTriplesWithPositionsQuery>,
      TError = unknown
    >(
      variables: GetTriplesWithPositionsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetTriplesWithPositionsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetTriplesWithPositionsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetTriplesWithPositionsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetTriplesWithPositions.infinite'] : ['GetTriplesWithPositions.infinite', variables],
      queryFn: (metaData) => fetcher<GetTriplesWithPositionsQuery, GetTriplesWithPositionsQueryVariables>(GetTriplesWithPositionsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetTriplesWithPositionsQuery.getKey = (variables?: GetTriplesWithPositionsQueryVariables) => variables === undefined ? ['GetTriplesWithPositions.infinite'] : ['GetTriplesWithPositions.infinite', variables];


useGetTriplesWithPositionsQuery.fetcher = (variables?: GetTriplesWithPositionsQueryVariables, options?: RequestInit['headers']) => fetcher<GetTriplesWithPositionsQuery, GetTriplesWithPositionsQueryVariables>(GetTriplesWithPositionsDocument, variables, options);

export const GetVaultsDocument = `
    query GetVaults($limit: Int, $offset: Int, $orderBy: [vaults_order_by!], $where: vaults_bool_exp) {
  vaults_aggregate(
    limit: $limit
    offset: $offset
    order_by: $orderBy
    where: $where
  ) {
    aggregate {
      count
    }
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
      current_share_price
      total_shares
    }
  }
}
    `;

export const useGetVaultsQuery = <
      TData = GetVaultsQuery,
      TError = unknown
    >(
      variables?: GetVaultsQueryVariables,
      options?: Omit<UseQueryOptions<GetVaultsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetVaultsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetVaultsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetVaults'] : ['GetVaults', variables],
    queryFn: fetcher<GetVaultsQuery, GetVaultsQueryVariables>(GetVaultsDocument, variables),
    ...options
  }
    )};

useGetVaultsQuery.document = GetVaultsDocument;

useGetVaultsQuery.getKey = (variables?: GetVaultsQueryVariables) => variables === undefined ? ['GetVaults'] : ['GetVaults', variables];

export const useInfiniteGetVaultsQuery = <
      TData = InfiniteData<GetVaultsQuery>,
      TError = unknown
    >(
      variables: GetVaultsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetVaultsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetVaultsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetVaultsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetVaults.infinite'] : ['GetVaults.infinite', variables],
      queryFn: (metaData) => fetcher<GetVaultsQuery, GetVaultsQueryVariables>(GetVaultsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetVaultsQuery.getKey = (variables?: GetVaultsQueryVariables) => variables === undefined ? ['GetVaults.infinite'] : ['GetVaults.infinite', variables];


useGetVaultsQuery.fetcher = (variables?: GetVaultsQueryVariables, options?: RequestInit['headers']) => fetcher<GetVaultsQuery, GetVaultsQueryVariables>(GetVaultsDocument, variables, options);

export const GetVaultDocument = `
    query GetVault($vaultId: numeric!) {
  vault(id: $vaultId) {
    ...VaultDetails
  }
}
    ${VaultDetailsFragmentDoc}
${VaultBasicDetailsFragmentDoc}`;

export const useGetVaultQuery = <
      TData = GetVaultQuery,
      TError = unknown
    >(
      variables: GetVaultQueryVariables,
      options?: Omit<UseQueryOptions<GetVaultQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetVaultQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetVaultQuery, TError, TData>(
      {
    queryKey: ['GetVault', variables],
    queryFn: fetcher<GetVaultQuery, GetVaultQueryVariables>(GetVaultDocument, variables),
    ...options
  }
    )};

useGetVaultQuery.document = GetVaultDocument;

useGetVaultQuery.getKey = (variables: GetVaultQueryVariables) => ['GetVault', variables];

export const useInfiniteGetVaultQuery = <
      TData = InfiniteData<GetVaultQuery>,
      TError = unknown
    >(
      variables: GetVaultQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetVaultQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetVaultQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetVaultQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['GetVault.infinite', variables],
      queryFn: (metaData) => fetcher<GetVaultQuery, GetVaultQueryVariables>(GetVaultDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetVaultQuery.getKey = (variables: GetVaultQueryVariables) => ['GetVault.infinite', variables];


useGetVaultQuery.fetcher = (variables: GetVaultQueryVariables, options?: RequestInit['headers']) => fetcher<GetVaultQuery, GetVaultQueryVariables>(GetVaultDocument, variables, options);

export const AccountClaimsAggregate = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountClaimsAggregate"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"accounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"claims_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"shares"},"value":{"kind":"EnumValue","value":"desc"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"triple"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"counter_shares"}}]}}]}}]}}]} as unknown as DocumentNode;
export const AccountClaims = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountClaims"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"accounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"claims"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"shares"},"value":{"kind":"EnumValue","value":"desc"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"claimsLimit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"claimsOffset"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"claimsWhere"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"triple"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"counter_shares"}}]}}]}}]} as unknown as DocumentNode;
export const AccountPositionsAggregate = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountPositionsAggregate"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"accounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"positions_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"shares"},"value":{"kind":"EnumValue","value":"desc"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"current_share_price"}},{"kind":"Field","name":{"kind":"Name","value":"atom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"triple"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode;
export const AccountPositions = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountPositions"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"accounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"positions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"shares"},"value":{"kind":"EnumValue","value":"desc"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"positionsLimit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"positionsOffset"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"positionsWhere"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"current_share_price"}},{"kind":"Field","name":{"kind":"Name","value":"atom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"triple"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode;
export const AccountAtoms = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountAtoms"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"accounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"atoms"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"atomsWhere"}}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"Variable","name":{"kind":"Name","value":"atomsOrderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"atomsLimit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"atomsOffset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"positions_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"account_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode;
export const AccountAtomsAggregate = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountAtomsAggregate"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"accounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"atoms_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"atomsWhere"}}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"Variable","name":{"kind":"Name","value":"atomsOrderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"atomsLimit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"atomsOffset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"sum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"positions_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"account_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode;
export const AccountTriples = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountTriples"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"accounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"triples_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"triplesWhere"}}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"Variable","name":{"kind":"Name","value":"triplesOrderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"triplesLimit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"triplesOffset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"predicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"object"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}}]}}]}}]} as unknown as DocumentNode;
export const AccountTriplesAggregate = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountTriplesAggregate"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"accounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"triples_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"triplesWhere"}}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"Variable","name":{"kind":"Name","value":"triplesOrderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"triplesLimit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"triplesOffset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"predicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"object"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}}]}}]}}]} as unknown as DocumentNode;
export const AtomTxn = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AtomTxn"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"atoms"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"block_number"}},{"kind":"Field","name":{"kind":"Name","value":"block_timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"transaction_hash"}},{"kind":"Field","name":{"kind":"Name","value":"creator_id"}}]}}]} as unknown as DocumentNode;
export const AtomVaultDetails = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AtomVaultDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"atoms"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vault_id"}},{"kind":"Field","name":{"kind":"Name","value":"wallet_id"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"position_count"}},{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"current_share_price"}},{"kind":"Field","name":{"kind":"Name","value":"positions_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"sum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}}]} as unknown as DocumentNode;
export const AccountMetadata = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"accounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"atom_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]} as unknown as DocumentNode;
export const AtomTriple = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AtomTriple"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"atoms"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"as_subject_triples"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"object"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"predicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"as_predicate_triples"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"object"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"as_object_triples"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"predicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"accounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"atom_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]} as unknown as DocumentNode;
export const AtomVaultDetailsWithPositions = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AtomVaultDetailsWithPositions"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"atoms"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"current_share_price"}},{"kind":"Field","name":{"kind":"Name","value":"positions_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"account_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"addresses"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}}]}}]} as unknown as DocumentNode;
export const DepositEventFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DepositEventFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"events"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deposit"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vault_id"}},{"kind":"Field","name":{"kind":"Name","value":"sender_assets_after_total_fees"}},{"kind":"Field","name":{"kind":"Name","value":"shares_for_receiver"}},{"kind":"Field","name":{"kind":"Name","value":"receiver"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode;
export const RedemptionEventFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RedemptionEventFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"events"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"redemption"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vault_id"}},{"kind":"Field","name":{"kind":"Name","value":"receiver_id"}},{"kind":"Field","name":{"kind":"Name","value":"shares_redeemed_by_sender"}},{"kind":"Field","name":{"kind":"Name","value":"assets_for_receiver"}}]}}]}}]} as unknown as DocumentNode;
export const AtomValue = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AtomValue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"atoms"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"person"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"thing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode;
export const AtomMetadata = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AtomMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"atoms"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"wallet_id"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AtomValue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"atoms"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"person"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"thing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode;
export const PositionAggregateFields = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionAggregateFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"positions_aggregate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"sum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}}]} as unknown as DocumentNode;
export const PositionFields = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"positions"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"current_share_price"}}]}}]}}]} as unknown as DocumentNode;
export const TripleMetadata = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TripleMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"triples"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject_id"}},{"kind":"Field","name":{"kind":"Name","value":"predicate_id"}},{"kind":"Field","name":{"kind":"Name","value":"object_id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"predicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"object"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"current_share_price"}},{"kind":"Field","alias":{"kind":"Name","value":"allPositions"},"name":{"kind":"Name","value":"positions_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionAggregateFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionFields"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"counter_vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"current_share_price"}},{"kind":"Field","alias":{"kind":"Name","value":"allPositions"},"name":{"kind":"Name","value":"positions_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionAggregateFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"accounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"atom_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AtomValue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"atoms"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"person"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"thing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"positions"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"current_share_price"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionAggregateFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"positions_aggregate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"sum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}}]} as unknown as DocumentNode;
export const EventDetails = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"events"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"block_number"}},{"kind":"Field","name":{"kind":"Name","value":"block_timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"transaction_hash"}},{"kind":"Field","name":{"kind":"Name","value":"atom_id"}},{"kind":"Field","name":{"kind":"Name","value":"triple_id"}},{"kind":"Field","name":{"kind":"Name","value":"deposit_id"}},{"kind":"Field","name":{"kind":"Name","value":"redemption_id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"DepositEventFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"RedemptionEventFragment"}},{"kind":"Field","name":{"kind":"Name","value":"atom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomMetadata"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"position_count"}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account_id"}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"triple"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TripleMetadata"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"position_count"}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account_id"}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"counter_vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"position_count"}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account_id"}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"accounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"atom_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AtomValue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"atoms"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"person"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"thing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AtomMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"atoms"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"wallet_id"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DepositEventFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"events"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deposit"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vault_id"}},{"kind":"Field","name":{"kind":"Name","value":"sender_assets_after_total_fees"}},{"kind":"Field","name":{"kind":"Name","value":"shares_for_receiver"}},{"kind":"Field","name":{"kind":"Name","value":"receiver"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"positions"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"current_share_price"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionAggregateFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"positions_aggregate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"sum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RedemptionEventFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"events"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"redemption"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vault_id"}},{"kind":"Field","name":{"kind":"Name","value":"receiver_id"}},{"kind":"Field","name":{"kind":"Name","value":"shares_redeemed_by_sender"}},{"kind":"Field","name":{"kind":"Name","value":"assets_for_receiver"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TripleMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"triples"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject_id"}},{"kind":"Field","name":{"kind":"Name","value":"predicate_id"}},{"kind":"Field","name":{"kind":"Name","value":"object_id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"predicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"object"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"current_share_price"}},{"kind":"Field","alias":{"kind":"Name","value":"allPositions"},"name":{"kind":"Name","value":"positions_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionAggregateFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionFields"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"counter_vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"current_share_price"}},{"kind":"Field","alias":{"kind":"Name","value":"allPositions"},"name":{"kind":"Name","value":"positions_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionAggregateFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionFields"}}]}}]}}]}}]} as unknown as DocumentNode;
export const FollowMetadata = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"triples"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"predicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"object"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"current_share_price"}},{"kind":"Field","name":{"kind":"Name","value":"positions_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"positionsWhere"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"sum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"positionsLimit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"positionsOffset"}}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"Variable","name":{"kind":"Name","value":"positionsOrderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"positionsWhere"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}}]} as unknown as DocumentNode;
export const FollowAggregate = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowAggregate"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"triples_aggregate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode;
export const StatDetails = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StatDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"stats"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contract_balance"}},{"kind":"Field","name":{"kind":"Name","value":"total_accounts"}},{"kind":"Field","name":{"kind":"Name","value":"total_fees"}},{"kind":"Field","name":{"kind":"Name","value":"total_atoms"}},{"kind":"Field","name":{"kind":"Name","value":"total_triples"}},{"kind":"Field","name":{"kind":"Name","value":"total_positions"}},{"kind":"Field","name":{"kind":"Name","value":"total_signals"}}]}}]} as unknown as DocumentNode;
export const TripleTxn = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TripleTxn"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"triples"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"block_number"}},{"kind":"Field","name":{"kind":"Name","value":"block_timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"transaction_hash"}},{"kind":"Field","name":{"kind":"Name","value":"creator_id"}}]}}]} as unknown as DocumentNode;
export const PositionDetails = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"positions"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"atom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"triple"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"position_count"}},{"kind":"Field","name":{"kind":"Name","value":"positions_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"counter_vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"position_count"}},{"kind":"Field","name":{"kind":"Name","value":"positions_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"predicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"object"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"vault_id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"accounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"atom_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AtomValue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"atoms"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"person"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"thing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode;
export const TripleVaultDetails = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TripleVaultDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"triples"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vault_id"}},{"kind":"Field","name":{"kind":"Name","value":"counter_vault_id"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionDetails"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"counter_vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionDetails"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"accounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"atom_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AtomValue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"atoms"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"person"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"thing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"positions"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"atom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"triple"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"position_count"}},{"kind":"Field","name":{"kind":"Name","value":"positions_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"counter_vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"position_count"}},{"kind":"Field","name":{"kind":"Name","value":"positions_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"predicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"object"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"vault_id"}}]}}]} as unknown as DocumentNode;
export const VaultBasicDetails = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VaultBasicDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"vaults"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"atom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"triple"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"predicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"object"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"current_share_price"}},{"kind":"Field","name":{"kind":"Name","value":"total_shares"}}]}}]} as unknown as DocumentNode;
export const VaultFilteredPositions = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VaultFilteredPositions"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"vaults"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"positions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"account_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"addresses"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"positions"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"current_share_price"}}]}}]}}]} as unknown as DocumentNode;
export const VaultDetailsWithFilteredPositions = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VaultDetailsWithFilteredPositions"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"vaults"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VaultBasicDetails"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"VaultFilteredPositions"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"positions"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"current_share_price"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VaultBasicDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"vaults"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"atom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"triple"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"predicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"object"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"current_share_price"}},{"kind":"Field","name":{"kind":"Name","value":"total_shares"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VaultFilteredPositions"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"vaults"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"positions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"account_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"addresses"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionFields"}}]}}]}}]} as unknown as DocumentNode;
export const TripleVaultCouterVaultDetailsWithPositions = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TripleVaultCouterVaultDetailsWithPositions"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"triples"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vault_id"}},{"kind":"Field","name":{"kind":"Name","value":"counter_vault_id"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VaultDetailsWithFilteredPositions"}}]}},{"kind":"Field","name":{"kind":"Name","value":"counter_vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VaultDetailsWithFilteredPositions"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"positions"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"current_share_price"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VaultBasicDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"vaults"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"atom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"triple"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"predicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"object"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"current_share_price"}},{"kind":"Field","name":{"kind":"Name","value":"total_shares"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VaultFilteredPositions"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"vaults"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"positions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"account_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"addresses"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VaultDetailsWithFilteredPositions"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"vaults"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VaultBasicDetails"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"VaultFilteredPositions"}}]}}]} as unknown as DocumentNode;
export const VaultUnfilteredPositions = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VaultUnfilteredPositions"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"vaults"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"positions"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"current_share_price"}}]}}]}}]} as unknown as DocumentNode;
export const VaultDetails = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VaultDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"vaults"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VaultBasicDetails"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VaultBasicDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"vaults"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"atom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"triple"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"predicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"object"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"current_share_price"}},{"kind":"Field","name":{"kind":"Name","value":"total_shares"}}]}}]} as unknown as DocumentNode;
export const VaultPositionsAggregate = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VaultPositionsAggregate"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"vaults"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"positions_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionAggregateFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionAggregateFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"positions_aggregate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"sum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}}]} as unknown as DocumentNode;
export const VaultFieldsForTriple = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VaultFieldsForTriple"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"vaults"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"current_share_price"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"VaultPositionsAggregate"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"VaultFilteredPositions"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"positions"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"current_share_price"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionAggregateFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"positions_aggregate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"sum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VaultPositionsAggregate"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"vaults"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"positions_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionAggregateFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VaultFilteredPositions"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"vaults"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"positions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"account_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"addresses"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionFields"}}]}}]}}]} as unknown as DocumentNode;
export const GetAccounts = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAccounts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"accounts_order_by"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"accounts_bool_exp"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"claimsLimit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"claimsOffset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"claimsWhere"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"claims_bool_exp"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"positionsLimit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"positionsOffset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"positionsWhere"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"positions_bool_exp"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accounts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountClaims"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountPositions"}},{"kind":"Field","name":{"kind":"Name","value":"atom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vault_id"}},{"kind":"Field","name":{"kind":"Name","value":"wallet_id"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"position_count"}},{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"positions_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"sum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"accounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"atom_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountClaims"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"accounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"claims"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"shares"},"value":{"kind":"EnumValue","value":"desc"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"claimsLimit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"claimsOffset"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"claimsWhere"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"triple"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"counter_shares"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountPositions"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"accounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"positions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"shares"},"value":{"kind":"EnumValue","value":"desc"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"positionsLimit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"positionsOffset"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"positionsWhere"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"current_share_price"}},{"kind":"Field","name":{"kind":"Name","value":"atom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"triple"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode;
export const GetAccountsWithAggregates = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAccountsWithAggregates"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"accounts_order_by"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"accounts_bool_exp"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"claimsLimit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"claimsOffset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"claimsWhere"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"claims_bool_exp"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"positionsLimit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"positionsOffset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"positionsWhere"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"positions_bool_exp"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"atomsWhere"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"atoms_bool_exp"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"atomsOrderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"atoms_order_by"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"atomsLimit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"atomsOffset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accounts_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountClaims"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountPositions"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"accounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"atom_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountClaims"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"accounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"claims"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"shares"},"value":{"kind":"EnumValue","value":"desc"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"claimsLimit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"claimsOffset"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"claimsWhere"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"triple"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"counter_shares"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountPositions"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"accounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"positions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"shares"},"value":{"kind":"EnumValue","value":"desc"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"positionsLimit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"positionsOffset"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"positionsWhere"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"current_share_price"}},{"kind":"Field","name":{"kind":"Name","value":"atom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"triple"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode;
export const GetAccountsCount = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAccountsCount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"accounts_bool_exp"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accounts_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]}}]} as unknown as DocumentNode;
export const GetAccount = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"claimsLimit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"claimsOffset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"claimsWhere"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"claims_bool_exp"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"positionsLimit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"positionsOffset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"positionsWhere"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"positions_bool_exp"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"atomsWhere"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"atoms_bool_exp"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"atomsOrderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"atoms_order_by"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"atomsLimit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"atomsOffset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"triplesWhere"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"triples_bool_exp"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"triplesOrderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"triples_order_by"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"triplesLimit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"triplesOffset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}},{"kind":"Field","name":{"kind":"Name","value":"atom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomMetadata"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomVaultDetails"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountClaims"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountPositions"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountAtoms"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountTriples"}}]}},{"kind":"Field","name":{"kind":"Name","value":"chainlink_prices"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1"}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"EnumValue","value":"desc"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usd"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"accounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"atom_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountClaims"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"accounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"claims"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"shares"},"value":{"kind":"EnumValue","value":"desc"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"claimsLimit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"claimsOffset"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"claimsWhere"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"triple"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"counter_shares"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountPositions"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"accounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"positions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"shares"},"value":{"kind":"EnumValue","value":"desc"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"positionsLimit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"positionsOffset"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"positionsWhere"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"current_share_price"}},{"kind":"Field","name":{"kind":"Name","value":"atom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"triple"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountAtoms"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"accounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"atoms"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"atomsWhere"}}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"Variable","name":{"kind":"Name","value":"atomsOrderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"atomsLimit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"atomsOffset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"positions_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"account_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountTriples"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"accounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"triples_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"triplesWhere"}}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"Variable","name":{"kind":"Name","value":"triplesOrderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"triplesLimit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"triplesOffset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"predicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"object"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AtomValue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"atoms"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"person"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"thing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AtomMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"atoms"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"wallet_id"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AtomVaultDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"atoms"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vault_id"}},{"kind":"Field","name":{"kind":"Name","value":"wallet_id"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"position_count"}},{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"current_share_price"}},{"kind":"Field","name":{"kind":"Name","value":"positions_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"sum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}}]} as unknown as DocumentNode;
export const GetAccountWithPaginatedRelations = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAccountWithPaginatedRelations"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"claimsLimit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"claimsOffset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"claimsWhere"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"claims_bool_exp"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"positionsLimit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"positionsOffset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"positionsWhere"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"positions_bool_exp"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"atomsLimit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"atomsOffset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"atomsWhere"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"atoms_bool_exp"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"atomsOrderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"atoms_order_by"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"triplesLimit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"triplesOffset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"triplesWhere"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"triples_bool_exp"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"triplesOrderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"triples_order_by"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountClaims"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountPositions"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountAtoms"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountTriples"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"accounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"atom_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountClaims"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"accounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"claims"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"shares"},"value":{"kind":"EnumValue","value":"desc"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"claimsLimit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"claimsOffset"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"claimsWhere"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"triple"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"counter_shares"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountPositions"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"accounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"positions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"shares"},"value":{"kind":"EnumValue","value":"desc"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"positionsLimit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"positionsOffset"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"positionsWhere"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"current_share_price"}},{"kind":"Field","name":{"kind":"Name","value":"atom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"triple"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountAtoms"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"accounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"atoms"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"atomsWhere"}}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"Variable","name":{"kind":"Name","value":"atomsOrderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"atomsLimit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"atomsOffset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"positions_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"account_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountTriples"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"accounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"triples_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"triplesWhere"}}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"Variable","name":{"kind":"Name","value":"triplesOrderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"triplesLimit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"triplesOffset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"predicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"object"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}}]}}]}}]} as unknown as DocumentNode;
export const GetAccountWithAggregates = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAccountWithAggregates"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"claimsLimit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"claimsOffset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"claimsWhere"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"claims_bool_exp"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"positionsLimit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"positionsOffset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"positionsWhere"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"positions_bool_exp"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"atomsWhere"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"atoms_bool_exp"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"atomsOrderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"atoms_order_by"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"atomsLimit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"atomsOffset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"triplesWhere"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"triples_bool_exp"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"triplesOrderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"triples_order_by"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"triplesLimit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"triplesOffset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountClaimsAggregate"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountPositionsAggregate"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountAtomsAggregate"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountTriplesAggregate"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"accounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"atom_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountClaimsAggregate"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"accounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"claims_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"shares"},"value":{"kind":"EnumValue","value":"desc"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"triple"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"counter_shares"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountPositionsAggregate"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"accounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"positions_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"shares"},"value":{"kind":"EnumValue","value":"desc"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"current_share_price"}},{"kind":"Field","name":{"kind":"Name","value":"atom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"triple"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountAtomsAggregate"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"accounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"atoms_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"atomsWhere"}}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"Variable","name":{"kind":"Name","value":"atomsOrderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"atomsLimit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"atomsOffset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"sum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"positions_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"account_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountTriplesAggregate"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"accounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"triples_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"triplesWhere"}}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"Variable","name":{"kind":"Name","value":"triplesOrderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"triplesLimit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"triplesOffset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"predicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"object"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}}]}}]}}]} as unknown as DocumentNode;
export const GetAtoms = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAtoms"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"atoms_order_by"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"atoms_bool_exp"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"total"},"name":{"kind":"Name","value":"atoms_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"atoms"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomMetadata"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomTxn"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomVaultDetails"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomTriple"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"accounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"atom_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AtomValue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"atoms"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"person"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"thing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AtomMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"atoms"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"wallet_id"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AtomTxn"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"atoms"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"block_number"}},{"kind":"Field","name":{"kind":"Name","value":"block_timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"transaction_hash"}},{"kind":"Field","name":{"kind":"Name","value":"creator_id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AtomVaultDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"atoms"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vault_id"}},{"kind":"Field","name":{"kind":"Name","value":"wallet_id"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"position_count"}},{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"current_share_price"}},{"kind":"Field","name":{"kind":"Name","value":"positions_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"sum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AtomTriple"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"atoms"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"as_subject_triples"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"object"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"predicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"as_predicate_triples"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"object"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"as_object_triples"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"predicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}}]}}]}}]} as unknown as DocumentNode;
export const GetAtomsWithPositions = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAtomsWithPositions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"atoms_order_by"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"atoms_bool_exp"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"total"},"name":{"kind":"Name","value":"atoms_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"atoms"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomMetadata"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomTxn"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"position_count"}},{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"current_share_price"}},{"kind":"Field","alias":{"kind":"Name","value":"total"},"name":{"kind":"Name","value":"positions_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"sum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"account_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"accounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"atom_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AtomValue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"atoms"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"person"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"thing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AtomMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"atoms"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"wallet_id"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AtomTxn"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"atoms"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"block_number"}},{"kind":"Field","name":{"kind":"Name","value":"block_timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"transaction_hash"}},{"kind":"Field","name":{"kind":"Name","value":"creator_id"}}]}}]} as unknown as DocumentNode;
export const GetAtomsWithAggregates = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAtomsWithAggregates"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"atoms_order_by"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"atoms_bool_exp"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"atoms_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomMetadata"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomTxn"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomVaultDetails"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"accounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"atom_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AtomValue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"atoms"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"person"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"thing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AtomMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"atoms"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"wallet_id"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AtomTxn"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"atoms"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"block_number"}},{"kind":"Field","name":{"kind":"Name","value":"block_timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"transaction_hash"}},{"kind":"Field","name":{"kind":"Name","value":"creator_id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AtomVaultDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"atoms"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vault_id"}},{"kind":"Field","name":{"kind":"Name","value":"wallet_id"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"position_count"}},{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"current_share_price"}},{"kind":"Field","name":{"kind":"Name","value":"positions_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"sum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}}]} as unknown as DocumentNode;
export const GetAtomsCount = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAtomsCount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"atoms_bool_exp"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"atoms_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]}}]} as unknown as DocumentNode;
export const GetAtom = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAtom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"numeric"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"atom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomMetadata"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomTxn"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomVaultDetails"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomTriple"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"accounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"atom_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AtomValue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"atoms"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"person"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"thing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AtomMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"atoms"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"wallet_id"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AtomTxn"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"atoms"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"block_number"}},{"kind":"Field","name":{"kind":"Name","value":"block_timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"transaction_hash"}},{"kind":"Field","name":{"kind":"Name","value":"creator_id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AtomVaultDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"atoms"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vault_id"}},{"kind":"Field","name":{"kind":"Name","value":"wallet_id"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"position_count"}},{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"current_share_price"}},{"kind":"Field","name":{"kind":"Name","value":"positions_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"sum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AtomTriple"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"atoms"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"as_subject_triples"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"object"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"predicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"as_predicate_triples"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"object"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"as_object_triples"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"predicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}}]}}]}}]} as unknown as DocumentNode;
export const GetClaimsByAddress = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetClaimsByAddress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"claims_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"account_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"triple"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"predicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"object"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vault_id"}},{"kind":"Field","name":{"kind":"Name","value":"counter_vault_id"}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"counter_shares"}}]}}]}}]}}]} as unknown as DocumentNode;
export const GetEvents = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEvents"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"events_order_by"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"events_bool_exp"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"addresses"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"total"},"name":{"kind":"Name","value":"events_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"events"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"block_number"}},{"kind":"Field","name":{"kind":"Name","value":"block_timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"transaction_hash"}},{"kind":"Field","name":{"kind":"Name","value":"atom_id"}},{"kind":"Field","name":{"kind":"Name","value":"triple_id"}},{"kind":"Field","name":{"kind":"Name","value":"deposit_id"}},{"kind":"Field","name":{"kind":"Name","value":"redemption_id"}},{"kind":"Field","name":{"kind":"Name","value":"atom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomMetadata"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"position_count"}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"account"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"addresses"}}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account_id"}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"triple"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"predicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"object"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"position_count"}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"account"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"addresses"}}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account_id"}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"counter_vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"position_count"}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"account"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"addresses"}}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account_id"}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"deposit"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sender_id"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares_for_receiver"}},{"kind":"Field","name":{"kind":"Name","value":"sender_assets_after_total_fees"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"position_count"}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"account"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"addresses"}}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account_id"}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"redemption"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sender_id"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"accounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"atom_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AtomValue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"atoms"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"person"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"thing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AtomMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"atoms"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"wallet_id"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}}]}}]} as unknown as DocumentNode;
export const GetEventsWithAggregates = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEventsWithAggregates"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"events_order_by"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"events_bool_exp"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"addresses"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"events_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"max"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"block_timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"block_number"}}]}},{"kind":"Field","name":{"kind":"Name","value":"min"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"block_timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"block_number"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventDetails"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"accounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"atom_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AtomValue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"atoms"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"person"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"thing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AtomMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"atoms"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"wallet_id"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DepositEventFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"events"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deposit"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vault_id"}},{"kind":"Field","name":{"kind":"Name","value":"sender_assets_after_total_fees"}},{"kind":"Field","name":{"kind":"Name","value":"shares_for_receiver"}},{"kind":"Field","name":{"kind":"Name","value":"receiver"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"events"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"block_number"}},{"kind":"Field","name":{"kind":"Name","value":"block_timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"transaction_hash"}},{"kind":"Field","name":{"kind":"Name","value":"atom_id"}},{"kind":"Field","name":{"kind":"Name","value":"triple_id"}},{"kind":"Field","name":{"kind":"Name","value":"deposit_id"}},{"kind":"Field","name":{"kind":"Name","value":"redemption_id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"DepositEventFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"RedemptionEventFragment"}},{"kind":"Field","name":{"kind":"Name","value":"atom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomMetadata"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"position_count"}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account_id"}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"triple"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TripleMetadata"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"position_count"}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account_id"}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"counter_vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"position_count"}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account_id"}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"positions"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"current_share_price"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionAggregateFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"positions_aggregate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"sum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RedemptionEventFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"events"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"redemption"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vault_id"}},{"kind":"Field","name":{"kind":"Name","value":"receiver_id"}},{"kind":"Field","name":{"kind":"Name","value":"shares_redeemed_by_sender"}},{"kind":"Field","name":{"kind":"Name","value":"assets_for_receiver"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TripleMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"triples"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject_id"}},{"kind":"Field","name":{"kind":"Name","value":"predicate_id"}},{"kind":"Field","name":{"kind":"Name","value":"object_id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"predicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"object"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"current_share_price"}},{"kind":"Field","alias":{"kind":"Name","value":"allPositions"},"name":{"kind":"Name","value":"positions_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionAggregateFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionFields"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"counter_vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"current_share_price"}},{"kind":"Field","alias":{"kind":"Name","value":"allPositions"},"name":{"kind":"Name","value":"positions_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionAggregateFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionFields"}}]}}]}}]}}]} as unknown as DocumentNode;
export const GetEventsCount = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEventsCount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"events_bool_exp"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"events_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]}}]} as unknown as DocumentNode;
export const GetEventsData = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEventsData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"events_bool_exp"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"events_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"max"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"block_timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"block_number"}}]}},{"kind":"Field","name":{"kind":"Name","value":"min"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"block_timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"block_number"}}]}},{"kind":"Field","name":{"kind":"Name","value":"avg"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"block_number"}}]}}]}}]}}]}}]} as unknown as DocumentNode;
export const GetDebugEvents = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDebugEvents"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"addresses"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"debug_events"},"name":{"kind":"Name","value":"events"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"atom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"positions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"account_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"addresses"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account_id"}},{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode;
export const GetFollowingPositions = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFollowingPositions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"subjectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"numeric"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"predicateId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"numeric"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"positionsOrderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"positions_order_by"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"triples_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_and"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subject_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"subjectId"}}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"predicate_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"predicateId"}}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vault"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"positions"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"account_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}]}}]}}]}}]}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"triples"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_and"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subject_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"subjectId"}}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"predicate_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"predicateId"}}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vault"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"positions"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"account_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}]}}]}}]}}]}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomMetadata"}}]}},{"kind":"Field","name":{"kind":"Name","value":"predicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomMetadata"}}]}},{"kind":"Field","name":{"kind":"Name","value":"object"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomMetadata"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"current_share_price"}},{"kind":"Field","name":{"kind":"Name","value":"positions_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"sum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"account_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"Variable","name":{"kind":"Name","value":"positionsOrderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account_id"}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AtomValue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"atoms"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"person"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"thing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AtomMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"atoms"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"wallet_id"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}}]}}]} as unknown as DocumentNode;
export const GetFollowerPositions = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFollowerPositions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"subjectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"numeric"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"predicateId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"numeric"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"objectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"numeric"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"positionsLimit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"positionsOffset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"positionsOrderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"positions_order_by"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"positionsWhere"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"positions_bool_exp"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"triples"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_and"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subject_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"subjectId"}}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"predicate_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"predicateId"}}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"object_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"objectId"}}}]}}]}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomMetadata"}}]}},{"kind":"Field","name":{"kind":"Name","value":"predicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomMetadata"}}]}},{"kind":"Field","name":{"kind":"Name","value":"object"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomMetadata"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"current_share_price"}},{"kind":"Field","name":{"kind":"Name","value":"positions_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"sum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"positionsLimit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"positionsOffset"}}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"Variable","name":{"kind":"Name","value":"positionsOrderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"positionsWhere"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AtomValue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"atoms"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"person"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"thing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AtomMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"atoms"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"wallet_id"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}}]}}]} as unknown as DocumentNode;
export const GetConnections = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetConnections"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"subjectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"numeric"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"predicateId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"numeric"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"objectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"numeric"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"addresses"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"positionsLimit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"positionsOffset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"positionsOrderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"positions_order_by"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"positionsWhere"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"positions_bool_exp"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"following_count"},"name":{"kind":"Name","value":"triples_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_and"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subject_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"subjectId"}}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"predicate_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"predicateId"}}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"object_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"objectId"}}}]}}]}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"following"},"name":{"kind":"Name","value":"triples"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_and"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subject_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"subjectId"}}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"predicate_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"predicateId"}}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"object_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"objectId"}}}]}}]}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowMetadata"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"followers_count"},"name":{"kind":"Name","value":"triples_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_and"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subject_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"subjectId"}}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"predicate_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"predicateId"}}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vault"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"positions"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"account_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"addresses"}}}]}}]}}]}}]}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"followers"},"name":{"kind":"Name","value":"triples"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_and"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subject_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"subjectId"}}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"predicate_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"predicateId"}}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vault"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"positions"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"account_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"addresses"}}}]}}]}}]}}]}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowMetadata"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"triples"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"predicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"object"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"current_share_price"}},{"kind":"Field","name":{"kind":"Name","value":"positions_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"positionsWhere"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"sum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"positionsLimit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"positionsOffset"}}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"Variable","name":{"kind":"Name","value":"positionsOrderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"positionsWhere"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}}]} as unknown as DocumentNode;
export const GetConnectionsCount = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetConnectionsCount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"subjectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"numeric"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"predicateId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"numeric"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"objectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"numeric"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"following_count"},"name":{"kind":"Name","value":"triples_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_and"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subject_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"subjectId"}}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"predicate_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"predicateId"}}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vault"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"positions"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"account_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}]}}]}}]}}]}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"followers_count"},"name":{"kind":"Name","value":"triples"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_and"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subject_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"subjectId"}}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"predicate_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"predicateId"}}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"object_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"objectId"}}}]}}]}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"positions_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"sum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode;
export const GetLists = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLists"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"predicate_objects_bool_exp"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"predicate_objects_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"predicate_objects"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"claim_count"},"value":{"kind":"EnumValue","value":"desc"}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"triple_count"},"value":{"kind":"EnumValue","value":"desc"}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"claim_count"}},{"kind":"Field","name":{"kind":"Name","value":"triple_count"}},{"kind":"Field","name":{"kind":"Name","value":"object"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]}}]} as unknown as DocumentNode;
export const GetListItems = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetListItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"predicateId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"numeric"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"objectId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"numeric"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"triples_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"predicate_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"EnumValue","value":"predicateId"}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"object_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"objectId"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vault"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"position_count"},"value":{"kind":"EnumValue","value":"desc"}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"counter_vault"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"position_count"},"value":{"kind":"EnumValue","value":"desc"}}]}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TripleVaultDetails"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"accounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"atom_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AtomValue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"atoms"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"person"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"thing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"positions"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"atom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"triple"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"position_count"}},{"kind":"Field","name":{"kind":"Name","value":"positions_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"counter_vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"position_count"}},{"kind":"Field","name":{"kind":"Name","value":"positions_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"predicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"object"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"vault_id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TripleVaultDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"triples"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vault_id"}},{"kind":"Field","name":{"kind":"Name","value":"counter_vault_id"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionDetails"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"counter_vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionDetails"}}]}}]}}]}}]} as unknown as DocumentNode;
export const GetListDetails = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetListDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"globalWhere"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"triples_bool_exp"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userWhere"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"triples_bool_exp"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tagPredicateId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"numeric"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"globalTriplesAggregate"},"name":{"kind":"Name","value":"triples_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"globalWhere"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"globalTriples"},"name":{"kind":"Name","value":"triples"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"globalWhere"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vault_id"}},{"kind":"Field","name":{"kind":"Name","value":"counter_vault_id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vault_id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"wallet_id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","alias":{"kind":"Name","value":"tags"},"name":{"kind":"Name","value":"as_subject_triples_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"predicate_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tagPredicateId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"object"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"vault_id"}},{"kind":"Field","alias":{"kind":"Name","value":"taggedIdentities"},"name":{"kind":"Name","value":"as_object_triples_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"vault_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vault_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"object"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vault_id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"wallet_id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"predicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vault_id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"wallet_id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"positions_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"sum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"userTriplesAggregate"},"name":{"kind":"Name","value":"triples_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userWhere"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"userTriples"},"name":{"kind":"Name","value":"triples"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userWhere"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vault_id"}},{"kind":"Field","name":{"kind":"Name","value":"counter_vault_id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vault_id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"wallet_id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","alias":{"kind":"Name","value":"tags"},"name":{"kind":"Name","value":"as_subject_triples_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"predicate_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tagPredicateId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"object"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"vault_id"}},{"kind":"Field","alias":{"kind":"Name","value":"taggedIdentities"},"name":{"kind":"Name","value":"as_object_triples_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"vault_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vault_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"object"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vault_id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"wallet_id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"positions_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"sum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode;
export const GetPositions = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPositions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"positions_order_by"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"positions_bool_exp"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"total"},"name":{"kind":"Name","value":"positions_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"sum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionDetails"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"accounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"atom_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AtomValue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"atoms"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"person"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"thing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"positions"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"atom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"triple"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"position_count"}},{"kind":"Field","name":{"kind":"Name","value":"positions_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"counter_vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"position_count"}},{"kind":"Field","name":{"kind":"Name","value":"positions_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"predicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"object"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"vault_id"}}]}}]} as unknown as DocumentNode;
export const GetTriplePositionsByAddress = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTriplePositionsByAddress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"positions_order_by"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"positions_bool_exp"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"total"},"name":{"kind":"Name","value":"positions_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"sum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionDetails"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"atom_id"}},{"kind":"Field","name":{"kind":"Name","value":"triple_id"}},{"kind":"Field","name":{"kind":"Name","value":"triple"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"positions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"account_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"counter_vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"positions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"account_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"accounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"atom_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AtomValue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"atoms"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"person"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"thing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"positions"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"atom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"triple"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"position_count"}},{"kind":"Field","name":{"kind":"Name","value":"positions_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"counter_vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"position_count"}},{"kind":"Field","name":{"kind":"Name","value":"positions_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"predicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"object"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"vault_id"}}]}}]} as unknown as DocumentNode;
export const GetPositionsWithAggregates = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPositionsWithAggregates"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"positions_order_by"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"positions_bool_exp"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"positions_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionDetails"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"accounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"atom_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AtomValue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"atoms"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"person"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"thing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"positions"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"atom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"triple"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"position_count"}},{"kind":"Field","name":{"kind":"Name","value":"positions_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"counter_vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"position_count"}},{"kind":"Field","name":{"kind":"Name","value":"positions_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"predicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"object"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"vault_id"}}]}}]} as unknown as DocumentNode;
export const GetPositionsCount = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPositionsCount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"positions_bool_exp"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"positions_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"total"},"name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"sum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}}]}}]} as unknown as DocumentNode;
export const GetPosition = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPosition"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"positionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"position"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"positionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionDetails"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"accounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"atom_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AtomValue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"atoms"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"person"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"thing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"positions"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"atom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"triple"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"position_count"}},{"kind":"Field","name":{"kind":"Name","value":"positions_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"counter_vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"position_count"}},{"kind":"Field","name":{"kind":"Name","value":"positions_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"predicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"object"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"vault_id"}}]}}]} as unknown as DocumentNode;
export const GetPositionsCountByType = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPositionsCountByType"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"positions_bool_exp"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"positions_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"total"},"name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"sum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"atom_id"}},{"kind":"Field","name":{"kind":"Name","value":"triple_id"}}]}}]}}]}}]} as unknown as DocumentNode;
export const GetStats = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StatDetails"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StatDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"stats"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contract_balance"}},{"kind":"Field","name":{"kind":"Name","value":"total_accounts"}},{"kind":"Field","name":{"kind":"Name","value":"total_fees"}},{"kind":"Field","name":{"kind":"Name","value":"total_atoms"}},{"kind":"Field","name":{"kind":"Name","value":"total_triples"}},{"kind":"Field","name":{"kind":"Name","value":"total_positions"}},{"kind":"Field","name":{"kind":"Name","value":"total_signals"}}]}}]} as unknown as DocumentNode;
export const GetTags = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTags"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"subjectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"numeric"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"predicateId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"numeric"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"triples"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_and"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"subject_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"subjectId"}}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"predicate_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"predicateId"}}}]}}]}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TripleMetadata"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"accounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"atom_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AtomValue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"atoms"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"person"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"thing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"positions"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"current_share_price"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionAggregateFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"positions_aggregate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"sum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TripleMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"triples"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject_id"}},{"kind":"Field","name":{"kind":"Name","value":"predicate_id"}},{"kind":"Field","name":{"kind":"Name","value":"object_id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"predicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"object"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"current_share_price"}},{"kind":"Field","alias":{"kind":"Name","value":"allPositions"},"name":{"kind":"Name","value":"positions_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionAggregateFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionFields"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"counter_vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"current_share_price"}},{"kind":"Field","alias":{"kind":"Name","value":"allPositions"},"name":{"kind":"Name","value":"positions_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionAggregateFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionFields"}}]}}]}}]}}]} as unknown as DocumentNode;
export const GetTagsCustom = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTagsCustom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"triples_bool_exp"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"triples"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TripleMetadata"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"accounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"atom_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AtomValue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"atoms"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"person"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"thing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"positions"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"current_share_price"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionAggregateFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"positions_aggregate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"sum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TripleMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"triples"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject_id"}},{"kind":"Field","name":{"kind":"Name","value":"predicate_id"}},{"kind":"Field","name":{"kind":"Name","value":"object_id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"predicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"object"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"current_share_price"}},{"kind":"Field","alias":{"kind":"Name","value":"allPositions"},"name":{"kind":"Name","value":"positions_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionAggregateFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionFields"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"counter_vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"current_share_price"}},{"kind":"Field","alias":{"kind":"Name","value":"allPositions"},"name":{"kind":"Name","value":"positions_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionAggregateFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionFields"}}]}}]}}]}}]} as unknown as DocumentNode;
export const GetTriples = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTriples"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"triples_order_by"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"triples_bool_exp"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"total"},"name":{"kind":"Name","value":"triples_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"triples"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TripleMetadata"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"TripleTxn"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"TripleVaultDetails"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"accounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"atom_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AtomValue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"atoms"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"person"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"thing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"positions"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"atom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"triple"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"position_count"}},{"kind":"Field","name":{"kind":"Name","value":"positions_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"counter_vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"position_count"}},{"kind":"Field","name":{"kind":"Name","value":"positions_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"predicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"object"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"vault_id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"positions"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"current_share_price"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionAggregateFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"positions_aggregate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"sum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TripleMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"triples"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject_id"}},{"kind":"Field","name":{"kind":"Name","value":"predicate_id"}},{"kind":"Field","name":{"kind":"Name","value":"object_id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"predicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"object"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"current_share_price"}},{"kind":"Field","alias":{"kind":"Name","value":"allPositions"},"name":{"kind":"Name","value":"positions_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionAggregateFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionFields"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"counter_vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"current_share_price"}},{"kind":"Field","alias":{"kind":"Name","value":"allPositions"},"name":{"kind":"Name","value":"positions_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionAggregateFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TripleTxn"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"triples"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"block_number"}},{"kind":"Field","name":{"kind":"Name","value":"block_timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"transaction_hash"}},{"kind":"Field","name":{"kind":"Name","value":"creator_id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TripleVaultDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"triples"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vault_id"}},{"kind":"Field","name":{"kind":"Name","value":"counter_vault_id"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionDetails"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"counter_vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionDetails"}}]}}]}}]}}]} as unknown as DocumentNode;
export const GetTriplesWithAggregates = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTriplesWithAggregates"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"triples_order_by"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"triples_bool_exp"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"triples_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TripleMetadata"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"TripleTxn"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"TripleVaultDetails"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"accounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"atom_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AtomValue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"atoms"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"person"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"thing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"positions"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"atom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"triple"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"position_count"}},{"kind":"Field","name":{"kind":"Name","value":"positions_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"counter_vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"position_count"}},{"kind":"Field","name":{"kind":"Name","value":"positions_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"predicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"object"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"vault_id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"positions"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"current_share_price"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionAggregateFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"positions_aggregate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"sum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TripleMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"triples"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject_id"}},{"kind":"Field","name":{"kind":"Name","value":"predicate_id"}},{"kind":"Field","name":{"kind":"Name","value":"object_id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"predicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"object"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"current_share_price"}},{"kind":"Field","alias":{"kind":"Name","value":"allPositions"},"name":{"kind":"Name","value":"positions_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionAggregateFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionFields"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"counter_vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"current_share_price"}},{"kind":"Field","alias":{"kind":"Name","value":"allPositions"},"name":{"kind":"Name","value":"positions_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionAggregateFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TripleTxn"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"triples"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"block_number"}},{"kind":"Field","name":{"kind":"Name","value":"block_timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"transaction_hash"}},{"kind":"Field","name":{"kind":"Name","value":"creator_id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TripleVaultDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"triples"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vault_id"}},{"kind":"Field","name":{"kind":"Name","value":"counter_vault_id"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionDetails"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"counter_vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionDetails"}}]}}]}}]}}]} as unknown as DocumentNode;
export const GetTriplesCount = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTriplesCount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"triples_bool_exp"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"triples_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"total"},"name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]}}]} as unknown as DocumentNode;
export const GetTriple = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTriple"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tripleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"numeric"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"triple"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tripleId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TripleMetadata"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"TripleTxn"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"TripleVaultDetails"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"accounts"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"atom_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AtomValue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"atoms"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"person"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"thing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"positions"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"atom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"triple"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"position_count"}},{"kind":"Field","name":{"kind":"Name","value":"positions_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"counter_vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"position_count"}},{"kind":"Field","name":{"kind":"Name","value":"positions_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"predicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"object"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"vault_id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"positions"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"current_share_price"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionAggregateFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"positions_aggregate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"sum"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TripleMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"triples"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject_id"}},{"kind":"Field","name":{"kind":"Name","value":"predicate_id"}},{"kind":"Field","name":{"kind":"Name","value":"object_id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"predicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"object"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"emoji"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AtomValue"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountMetadata"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"current_share_price"}},{"kind":"Field","alias":{"kind":"Name","value":"allPositions"},"name":{"kind":"Name","value":"positions_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionAggregateFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionFields"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"counter_vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"current_share_price"}},{"kind":"Field","alias":{"kind":"Name","value":"allPositions"},"name":{"kind":"Name","value":"positions_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionAggregateFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TripleTxn"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"triples"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"block_number"}},{"kind":"Field","name":{"kind":"Name","value":"block_timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"transaction_hash"}},{"kind":"Field","name":{"kind":"Name","value":"creator_id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TripleVaultDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"triples"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vault_id"}},{"kind":"Field","name":{"kind":"Name","value":"counter_vault_id"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionDetails"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"counter_vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionDetails"}}]}}]}}]}}]} as unknown as DocumentNode;
export const GetAtomTriplesWithPositions = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAtomTriplesWithPositions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"triples_bool_exp"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"triples_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]}}]} as unknown as DocumentNode;
export const GetTriplesWithPositions = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTriplesWithPositions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"triples_order_by"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"triples_bool_exp"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"total"},"name":{"kind":"Name","value":"triples_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"triples"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"predicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"object"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"position_count"}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"account_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"counter_vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total_shares"}},{"kind":"Field","name":{"kind":"Name","value":"position_count"}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"account_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}}]}}]}}]} as unknown as DocumentNode;
export const GetVaults = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetVaults"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"vaults_order_by"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"vaults_bool_exp"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vaults_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"atom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"triple"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"predicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"object"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"positions_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"current_share_price"}},{"kind":"Field","name":{"kind":"Name","value":"total_shares"}}]}}]}}]}}]} as unknown as DocumentNode;
export const GetVault = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetVault"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vaultId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"numeric"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vault"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vaultId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VaultDetails"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VaultBasicDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"vaults"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"atom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"triple"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"predicate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"object"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"current_share_price"}},{"kind":"Field","name":{"kind":"Name","value":"total_shares"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VaultDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"vaults"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VaultBasicDetails"}}]}}]} as unknown as DocumentNode;