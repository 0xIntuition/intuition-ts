# @0xintuition/graphql

**GraphQL API Documentation for the Intuition Protocol**

This package provides comprehensive documentation for querying the Intuition knowledge graph via GraphQL. Use any GraphQL client in any language to interact with atoms, triples, vaults, positions, and more.

[![npm version](https://img.shields.io/npm/v/@0xintuition/graphql.svg)](https://www.npmjs.com/package/@0xintuition/graphql)

---

## Table of Contents

- [Introduction](#introduction)
- [Core Concepts](#core-concepts)
- [Getting Started](#getting-started)
- [Schema Reference](#schema-reference)
- [Common Query Patterns](#common-query-patterns)
- [Mutations](#mutations)
- [Subscriptions](#subscriptions)
- [Best Practices](#best-practices)
- [Example Queries](#example-queries)
- [Advanced Examples](#advanced-examples)
- [Code Generation](#code-generation)
- [Anti-Patterns to Avoid](#anti-patterns-to-avoid)
- [Resources](#resources)

---

## Introduction

The Intuition GraphQL API provides access to the complete Intuition knowledge graph, including atoms (entities), triples (relationships), vaults (asset pools), and user positions. The API is powered by Hasura and offers rich querying capabilities with filtering, sorting, pagination, and aggregations.

### Public Endpoints

No authentication required:

- **Mainnet**: `https://mainnet.intuition.sh/v1/graphql`
- **Testnet**: `https://testnet.intuition.sh/v1/graphql`

### Interactive Explorers

Explore the API interactively with Apollo Studio Sandbox:

- [Mainnet Explorer](https://studio.apollographql.com/sandbox/explorer?endpoint=https%3A%2F%2Fmainnet.intuition.sh%2Fv1%2Fgraphql)
- [Testnet Explorer](https://studio.apollographql.com/sandbox/explorer?endpoint=https%3A%2F%2Ftestnet.intuition.sh%2Fv1%2Fgraphql)

---

## Core Concepts

### Atoms

**Atoms** are the fundamental entities in the Intuition knowledge graph. Each atom represents an identity, concept, or piece of data (e.g., a person, organization, tag, or blockchain address).

### Triples

**Triples** are statements that connect atoms in subject-predicate-object relationships. For example: `(Alice, knows, Bob)` or `(Document, hasTag, TypeScript)`.

### Vaults

**Vaults** are asset pools associated with atoms and triples. Users deposit assets into vaults and receive shares based on bonding curves. See the [@0xintuition/protocol](../protocol/README.md) documentation for details on bonding curves and vault mechanics.

### Positions

**Positions** represent user ownership (shares) in vaults. Each position tracks an account's shares in a specific vault.

### Accounts

**Accounts** are blockchain addresses participating in the protocol, including:

- User wallets
- Atom wallets (smart contract wallets for atoms)
- Protocol vaults

### Deposits & Redemptions

**Deposits** are transactions where users add assets to vaults and receive shares. **Redemptions** are the reverse: users burn shares to withdraw assets.

### Events

**Events** capture the complete on-chain event history, including deposits, redemptions, atom creation, triple creation, and more.

### Stats

**Stats** provide protocol-wide statistics and aggregated metrics.

---

## Getting Started

The Intuition GraphQL API works with any GraphQL client. Below are minimal examples for popular clients across different languages.

### JavaScript / TypeScript

**For JavaScript/TypeScript projects**: Instead of hardcoding API endpoints, import them from this package:

```typescript
import { API_URL_DEV, API_URL_PROD } from '@0xintuition/graphql'

// API_URL_PROD = 'https://mainnet.intuition.sh/v1/graphql'
// API_URL_DEV = 'https://testnet.intuition.sh/v1/graphql'
```

#### graphql-request

```typescript
import { API_URL_PROD } from '@0xintuition/graphql'

import { GraphQLClient } from 'graphql-request'

const client = new GraphQLClient(API_URL_PROD)

const query = `
  query GetAtom($id: String!) {
    atom(term_id: $id) {
      term_id
      label
      image
    }
  }
`

const data = await client.request(query, { id: '0x...' })
```

[graphql-request documentation](https://github.com/jasonkuhrt/graphql-request)

#### Apollo Client

```typescript
import { API_URL_PROD } from '@0xintuition/graphql'

import { ApolloClient, gql, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: API_URL_PROD,
  cache: new InMemoryCache(),
})

const { data } = await client.query({
  query: gql`
    query GetAtom($id: String!) {
      atom(term_id: $id) {
        term_id
        label
      }
    }
  `,
  variables: { id: '0x...' },
})
```

[@apollo/client documentation](https://www.apollographql.com/docs/react/)

#### urql

```typescript
import { API_URL_PROD } from '@0xintuition/graphql'

import { createClient } from 'urql'

const client = createClient({
  url: API_URL_PROD,
})

const result = await client.query(query, { id: '0x...' }).toPromise()
```

[urql documentation](https://formidable.com/open-source/urql/docs/)

#### Plain fetch

```typescript
import { API_URL_PROD } from '@0xintuition/graphql'

const response = await fetch(API_URL_PROD, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: `query GetAtom($id: String!) { atom(term_id: $id) { term_id label } }`,
    variables: { id: '0x...' },
  }),
})

const { data } = await response.json()
```

### Python

#### gql

```python
from gql import gql, Client
from gql.transport.requests import RequestsHTTPTransport

transport = RequestsHTTPTransport(url='https://mainnet.intuition.sh/v1/graphql')
client = Client(transport=transport)

query = gql('''
  query GetAtom($id: String!) {
    atom(term_id: $id) {
      term_id
      label
    }
  }
''')

result = client.execute(query, variable_values={'id': '0x...'})
```

[gql documentation](https://gql.readthedocs.io/)

#### python-graphql-client

```python
from python_graphql_client import GraphqlClient

client = GraphqlClient(endpoint='https://mainnet.intuition.sh/v1/graphql')

query = '''
  query GetAtom($id: String!) {
    atom(term_id: $id) {
      term_id
      label
    }
  }
'''

data = client.execute(query=query, variables={'id': '0x...'})
```

[python-graphql-client documentation](https://github.com/prisma-labs/python-graphql-client)

### Go

#### machinebox/graphql

```go
package main

import (
    "context"
    "github.com/machinebox/graphql"
)

func main() {
    client := graphql.NewClient("https://mainnet.intuition.sh/v1/graphql")

    req := graphql.NewRequest(`
        query GetAtom($id: String!) {
            atom(term_id: $id) {
                term_id
                label
            }
        }
    `)
    req.Var("id", "0x...")

    var response map[string]interface{}
    client.Run(context.Background(), req, &response)
}
```

[machinebox/graphql documentation](https://github.com/machinebox/graphql)

### Rust

#### graphql-client

```rust
use graphql_client::{GraphQLQuery, Response};

#[derive(GraphQLQuery)]
#[graphql(
    schema_path = "schema.graphql",
    query_path = "get_atom.graphql",
)]
struct GetAtom;

let client = reqwest::Client::new();
let variables = get_atom::Variables {
    id: "0x...".to_string(),
};

let response = client
    .post("https://mainnet.intuition.sh/v1/graphql")
    .json(&GetAtom::build_query(variables))
    .send()
    .await?;
```

[graphql-client documentation](https://github.com/graphql-rust/graphql-client)

---

## Schema Reference

### Getting the Schema

Generate the GraphQL schema via introspection:

```bash
# Mainnet
npx get-graphql-schema https://mainnet.intuition.sh/v1/graphql > schema.graphql

# Testnet
npx get-graphql-schema https://testnet.intuition.sh/v1/graphql > schema.graphql
```

### Schema Features

The Hasura-powered GraphQL schema provides:

#### Filtering with `where` Clauses

Use boolean expressions to filter results:

```graphql
query GetRecentAtoms {
  atoms(
    where: { created_at: { _gte: "2024-01-01" }, type: { _eq: Person } }
    limit: 10
  ) {
    term_id
    label
  }
}
```

**Available operators**:

- `_eq`, `_neq` - Equality
- `_gt`, `_gte`, `_lt`, `_lte` - Comparisons
- `_in`, `_nin` - Array membership
- `_like`, `_ilike` - Pattern matching (case-sensitive/insensitive)
- `_is_null` - Null checks
- `_and`, `_or`, `_not` - Boolean logic

#### Sorting with `order_by`

```graphql
query GetTopAtoms {
  atoms(
    order_by: [{ term: { total_market_cap: desc } }, { created_at: desc }]
    limit: 10
  ) {
    term_id
    label
  }
}
```

#### Pagination

```graphql
query GetAtomsPage($limit: Int!, $offset: Int!) {
  atoms(limit: $limit, offset: $offset, order_by: { created_at: desc }) {
    term_id
    label
  }

  atoms_aggregate {
    aggregate {
      count
    }
  }
}
```

#### Aggregations

```graphql
query GetPositionStats($accountId: String!) {
  positions_aggregate(where: { account_id: { _eq: $accountId } }) {
    aggregate {
      count
      sum {
        shares
      }
    }
  }
}
```

#### Relationships

GraphQL relationships allow nested queries:

```graphql
query GetAtomWithCreator($id: String!) {
  atom(term_id: $id) {
    term_id
    label
    creator {
      id
      label
      image
    }
  }
}
```

#### Primary Key Lookups

```graphql
query GetAtom($id: String!) {
  atom(term_id: $id) {
    # Direct lookup by primary key
    term_id
    label
  }
}
```

---

## Common Query Patterns

### Querying Atoms

#### Get Single Atom

```graphql
query GetAtom($id: String!) {
  atom(term_id: $id) {
    term_id
    data
    label
    image
    type
    created_at
    creator {
      id
      label
    }
  }
}
```

#### List Atoms with Filtering

```graphql
query GetAtomsByType($type: atom_type!, $limit: Int!) {
  atoms(
    where: { type: { _eq: $type } }
    order_by: { created_at: desc }
    limit: $limit
  ) {
    term_id
    label
    image
    created_at
  }
}
```

#### Get Atom with Vault Details

```graphql
query GetAtomWithVault($id: String!, $curveId: numeric!) {
  atom(term_id: $id) {
    term_id
    label
    term {
      vaults(where: { curve_id: { _eq: $curveId } }) {
        term_id
        curve_id
        total_shares
        current_share_price
        position_count
      }
    }
  }
}
```

### Querying Triples

#### Get Single Triple

```graphql
query GetTriple($id: String!) {
  triple(term_id: $id) {
    term_id
    subject {
      term_id
      label
      image
    }
    predicate {
      term_id
      label
    }
    object {
      term_id
      label
      image
    }
  }
}
```

#### Filter Triples by Subject/Predicate/Object

```graphql
query GetTriplesBySubject($subjectId: String!, $limit: Int!) {
  triples(
    where: { subject_id: { _eq: $subjectId } }
    order_by: { created_at: desc }
    limit: $limit
  ) {
    term_id
    predicate {
      label
    }
    object {
      label
    }
  }
}
```

#### Get Triples with Positions

```graphql
query GetTriplesWithPositions(
  $where: triples_bool_exp!
  $curveId: numeric!
  $limit: Int!
) {
  triples(where: $where, limit: $limit) {
    term_id
    subject {
      label
    }
    predicate {
      label
    }
    object {
      label
    }
    term {
      vaults(where: { curve_id: { _eq: $curveId } }) {
        total_shares
        position_count
      }
    }
    counter_term {
      vaults(where: { curve_id: { _eq: $curveId } }) {
        total_shares
        position_count
      }
    }
  }
}
```

### Querying Positions

#### Get User Positions

```graphql
query GetUserPositions($accountId: String!, $limit: Int!) {
  positions(
    where: { account_id: { _eq: $accountId } }
    order_by: { shares: desc }
    limit: $limit
  ) {
    id
    shares
    vault {
      term_id
      total_shares
      current_share_price
    }
  }
}
```

#### Get Aggregate Position Data

```graphql
query GetPositionAggregates($accountId: String!) {
  positions_aggregate(where: { account_id: { _eq: $accountId } }) {
    aggregate {
      count
      sum {
        shares
      }
    }
  }
}
```

**Best Practice**: Use aggregates when you only need counts or sums - don't fetch all nodes just to count them.

### Querying Vaults

#### Get Vault Details

```graphql
query GetVault($termId: String!, $curveId: numeric!) {
  vault(term_id: $termId, curve_id: $curveId) {
    term_id
    curve_id
    total_shares
    total_assets
    current_share_price
    position_count
    positions(limit: 10, order_by: { shares: desc }) {
      account {
        id
        label
      }
      shares
    }
  }
}
```

### Search Queries

#### Global Search

```graphql
query GlobalSearch(
  $searchTerm: String
  $atomsLimit: Int
  $accountsLimit: Int
  $triplesLimit: Int
) {
  accounts(
    where: {
      _or: [
        { label: { _ilike: $searchTerm } }
        { atom: { data: { _ilike: $searchTerm } } }
      ]
    }
    limit: $accountsLimit
  ) {
    id
    label
    image
  }

  atoms(
    where: {
      _or: [
        { label: { _ilike: $searchTerm } }
        { data: { _ilike: $searchTerm } }
      ]
    }
    limit: $atomsLimit
  ) {
    term_id
    label
    image
  }

  triples(
    where: {
      _or: [
        { subject: { label: { _ilike: $searchTerm } } }
        { predicate: { label: { _ilike: $searchTerm } } }
        { object: { label: { _ilike: $searchTerm } } }
      ]
    }
    limit: $triplesLimit
  ) {
    term_id
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
}
```

#### Semantic Search

```graphql
query SemanticSearch($query: String!, $limit: Int) {
  search_term(args: { query: $query }, limit: $limit) {
    atom {
      term_id
      label
      type
    }
  }
}
```

### Pagination Patterns

#### Offset-Based Pagination

```graphql
query GetAtomsPage($limit: Int!, $offset: Int!) {
  total: atoms_aggregate {
    aggregate {
      count
    }
  }
  atoms(limit: $limit, offset: $offset, order_by: { created_at: desc }) {
    term_id
    label
    created_at
  }
}
```

**Variables**:

```json
{
  "limit": 20,
  "offset": 40
}
```

This fetches page 3 (items 41-60) when using 20 items per page.

### Database Functions

The API provides backend functions for complex queries that would be inefficient to perform client-side.

#### Following/Social Queries

Get accounts a user follows:

```graphql
query GetFollowing($address: String!) {
  following(args: { address: $address }) {
    id
    label
    image
    atom {
      term_id
      label
    }
  }

  following_aggregate(args: { address: $address }) {
    aggregate {
      count
    }
  }
}
```

**Variables**:

```json
{
  "address": "0xd8da6bf26964af9d7eed9e03e53415d37aa96045"
}
```

Get positions from accounts you follow:

```graphql
query GetPositionsFromFollowing(
  $address: String!
  $limit: Int!
  $offset: Int!
) {
  positions_from_following(
    args: { address: $address }
    limit: $limit
    offset: $offset
    order_by: { shares: desc }
  ) {
    id
    shares
    account {
      id
      label
    }
    vault {
      term_id
      current_share_price
    }
  }
}
```

Get signals from followed accounts:

```graphql
query GetSignalsFromFollowing($address: String!, $limit: Int!) {
  signals_from_following(
    args: { address: $address }
    limit: $limit
    order_by: { created_at: desc }
  ) {
    id
    event_type
    created_at
    account {
      id
      label
    }
    atom {
      term_id
      label
    }
  }
}
```

#### Advanced Position Search

Search positions with complex filtering:

```graphql
query SearchPositions($addresses: _text!, $searchFields: jsonb!) {
  search_positions_on_subject(
    args: { addresses: $addresses, search_fields: $searchFields }
  ) {
    id
    shares
    account {
      id
      label
    }
    vault {
      term_id
      term {
        atom {
          label
          image
        }
      }
    }
  }
}
```

**Variables**:

```json
{
  "addresses": "{0xabc..., 0xdef...}",
  "searchFields": {
    "min_shares": "1000000000000000000",
    "term_type": "atom"
  }
}
```

#### Social Search

Search terms within your social graph:

```graphql
query SearchTermsFromFollowing(
  $address: String!
  $query: String!
  $limit: Int
) {
  search_term_from_following(
    args: { address: $address, query: $query }
    limit: $limit
  ) {
    atom {
      term_id
      label
      type
      image
    }
  }
}
```

### Time-Series Analysis

The API includes pre-computed time-series aggregations for efficient analytics.

#### Price Trend Queries

Daily price trends:

```graphql
query GetDailyPriceTrends($termId: String!, $curveId: numeric!, $limit: Int!) {
  share_price_change_stats_daily(
    where: { term_id: { _eq: $termId }, curve_id: { _eq: $curveId } }
    order_by: { bucket: desc }
    limit: $limit
  ) {
    bucket
    first_share_price
    last_share_price
    difference
    change_count
  }
}
```

**Variables**:

```json
{
  "termId": "0x...",
  "curveId": "1",
  "limit": 30
}
```

For different time granularities, use:

- `share_price_change_stats_hourly` - Hourly aggregations
- `share_price_change_stats_weekly` - Weekly aggregations
- `share_price_change_stats_monthly` - Monthly aggregations

#### Signal Statistics

Query aggregated signal data over time:

```graphql
query GetSignalStats($limit: Int!) {
  signal_stats_daily(order_by: { bucket: desc }, limit: $limit) {
    bucket
    deposit_count
    redemption_count
    total_volume
  }
}
```

### Denormalized Tables

#### Predicate-Object Aggregations

Query pre-aggregated collections grouped by (predicate, object):

```graphql
query GetPopularCollections($predicateId: String!, $limit: Int!) {
  predicate_objects(
    where: { predicate_id: { _eq: $predicateId } }
    order_by: { triple_count: desc }
    limit: $limit
  ) {
    predicate_id
    object_id
    triple_count
    total_market_cap
    total_position_count
    object {
      term_id
      label
      image
    }
  }
}
```

**Variables**:

```json
{
  "predicateId": "0x...",
  "limit": 20
}
```

This is more efficient than manually aggregating triples with the same predicate and object.

### Statistical Aggregations

Beyond count and sum, the API supports advanced statistical aggregations:

```graphql
query GetPositionStatistics($accountId: String!) {
  positions_aggregate(where: { account_id: { _eq: $accountId } }) {
    aggregate {
      count
      sum {
        shares
      }
      avg {
        shares
      }
      min {
        shares
      }
      max {
        shares
      }
      stddev {
        shares
      }
      stddev_pop {
        shares
      }
      stddev_samp {
        shares
      }
      variance {
        shares
      }
      var_pop {
        shares
      }
      var_samp {
        shares
      }
    }
  }
}
```

**Use cases**:

- `stddev` - Identify outliers in share distributions
- `variance` - Measure position concentration
- `avg` - Calculate average position size

---

## Mutations

The GraphQL API provides mutations for uploading and pinning content to IPFS. Note that blockchain state changes (creating atoms, triples, deposits, redemptions) are performed through direct smart contract transactions, not GraphQL mutations.

### Pinning Metadata to IPFS

#### Pin Thing

> **⚠️ DEPRECATED**: This mutation is deprecated. Use `uploadJsonToPinata` from `@0xintuition/sdk` instead for direct Pinata uploads. The SDK now supports client-side IPFS pinning without requiring backend mediation. See the SDK documentation for updated implementations in `createAtomFromThing` and `batchCreateAtomsFromThings`.

Pin a "Thing" object (general entity) to IPFS:

```graphql
mutation PinThing($thing: PinThingInput!) {
  pinThing(thing: $thing) {
    hash
    name
    size
  }
}
```

**Variables**:

```json
{
  "thing": {
    "name": "TypeScript Programming Language",
    "description": "A strongly typed programming language that builds on JavaScript",
    "image": "ipfs://QmXnnyufdzAWL5CqZ2RnSNgPbvCc1ALT73s6epPrRnZ1Xy",
    "url": "https://www.typescriptlang.org"
  }
}
```

**Response**:

```json
{
  "data": {
    "pinThing": {
      "hash": "QmYx8...",
      "name": "thing.json",
      "size": 256
    }
  }
}
```

#### Pin Person

Pin a Person entity to IPFS:

```graphql
mutation PinPerson($person: PinPersonInput!) {
  pinPerson(person: $person) {
    hash
    name
    size
  }
}
```

**Variables**:

```json
{
  "person": {
    "name": "Vitalik Buterin",
    "description": "Co-founder of Ethereum",
    "email": "vitalik@ethereum.org",
    "identifier": "vitalik.eth",
    "image": "ipfs://QmXnnyufdzAWL5CqZ2RnSNgPbvCc1ALT73s6epPrRnZ1Xy",
    "url": "https://vitalik.ca"
  }
}
```

#### Pin Organization

Pin an Organization entity to IPFS:

```graphql
mutation PinOrganization($organization: PinOrganizationInput!) {
  pinOrganization(organization: $organization) {
    hash
    name
    size
  }
}
```

**Variables**:

```json
{
  "organization": {
    "name": "Ethereum Foundation",
    "description": "Non-profit organization supporting Ethereum development",
    "email": "info@ethereum.org",
    "image": "ipfs://QmXnnyufdzAWL5CqZ2RnSNgPbvCc1ALT73s6epPrRnZ1Xy",
    "url": "https://ethereum.foundation"
  }
}
```

### Uploading JSON to IPFS

Pin arbitrary JSON data to IPFS:

```graphql
mutation UploadJson($json: jsonb!) {
  uploadJsonToIpfs(json: $json) {
    hash
    name
    size
  }
}
```

**Variables**:

```json
{
  "json": {
    "type": "custom_metadata",
    "attributes": [
      { "trait_type": "Category", "value": "DeFi" },
      { "trait_type": "Chain", "value": "Base" }
    ],
    "version": "1.0"
  }
}
```

### Image Upload

#### Upload Image (Base64)

Upload an image from base64-encoded data:

```graphql
mutation UploadImage($image: UploadImageInput!) {
  uploadImage(image: $image) {
    url
    classification
  }
}
```

**Variables**:

```json
{
  "image": {
    "contentType": "image/png",
    "data": "iVBORw0KGgoAAAANSUhEUgAAAAUA...",
    "filename": "avatar.png"
  }
}
```

**Response**:

```json
{
  "data": {
    "uploadImage": {
      "url": "ipfs://QmXnnyufdzAWL5CqZ2RnSNgPbvCc1ALT73s6epPrRnZ1Xy",
      "classification": "safe"
    }
  }
}
```

The `classification` field indicates if the image passed content moderation.

#### Upload Image from URL

Upload an image from a public URL:

```graphql
mutation UploadImageFromUrl($image: UploadImageFromUrlInput!) {
  uploadImageFromUrl(image: $image) {
    url
    classification
  }
}
```

**Variables**:

```json
{
  "image": {
    "url": "https://example.com/images/logo.png"
  }
}
```

### Mutation Workflow

Typical workflow for creating an atom with pinned metadata:

1. **Pin metadata** using `pinThing`, `pinPerson`, or `pinOrganization`
2. **Get IPFS hash** from the mutation response
3. **Create atom on-chain** via smart contract transaction using the IPFS hash
4. **Query the GraphQL API** to fetch the newly created atom with resolved metadata

---

## Subscriptions

The GraphQL API supports real-time subscriptions for live data updates using cursor-based streaming. All queryable entities support corresponding `_stream` subscriptions.

### Basic Subscription Pattern

Subscribe to new atoms:

```graphql
subscription WatchAtoms(
  $cursor: [atoms_stream_cursor_input]!
  $batchSize: Int!
) {
  atoms_stream(cursor: $cursor, batch_size: $batchSize) {
    term_id
    label
    image
    created_at
  }
}
```

**Variables**:

```json
{
  "cursor": [
    {
      "initial_value": { "created_at": "2024-01-01T00:00:00Z" },
      "ordering": "ASC"
    }
  ],
  "batchSize": 10
}
```

### Cursor-Based Streaming

Subscriptions use cursors to enable resumable streams:

#### Cursor Configuration

- **`initial_value`**: Starting point for the stream (e.g., timestamp, ID)
- **`ordering`**: Sort direction (`ASC` or `DESC`)
- **`batch_size`**: Number of items per batch

#### Resumable Stream Example

```graphql
subscription WatchPositions($cursor: [positions_stream_cursor_input]!) {
  positions_stream(
    cursor: $cursor
    batch_size: 20
    where: { shares: { _gt: "0" } }
  ) {
    id
    shares
    account {
      id
      label
    }
    vault {
      term_id
      current_share_price
    }
  }
}
```

**Variables**:

```json
{
  "cursor": [
    {
      "initial_value": { "created_at": "2024-12-01T00:00:00Z" },
      "ordering": "DESC"
    }
  ]
}
```

To resume from where you left off, update `initial_value` to the last received item's cursor value.

### Common Subscription Use Cases

#### Monitor New Triples

```graphql
subscription WatchNewTriples($cursor: [triples_stream_cursor_input]!) {
  triples_stream(cursor: $cursor, batch_size: 5) {
    term_id
    created_at
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
}
```

#### Track Price Changes

```graphql
subscription WatchPriceChanges(
  $cursor: [share_price_changes_stream_cursor_input]!
  $termId: String!
) {
  share_price_changes_stream(
    cursor: $cursor
    batch_size: 10
    where: { term_id: { _eq: $termId } }
  ) {
    term_id
    curve_id
    old_price
    new_price
    price_change
    created_at
  }
}
```

#### Live Signal Feed

```graphql
subscription WatchSignals(
  $cursor: [deposits_stream_cursor_input, redemptions_stream_cursor_input]!
) {
  deposits_stream(cursor: $cursor, batch_size: 10) {
    id
    event_type
    sender_id
    receiver_id
    assets_for_receiver
    shares_for_receiver
    created_at
  }

  redemptions_stream(cursor: $cursor, batch_size: 10) {
    id
    event_type
    receiver_id
    assets_for_receiver
    shares_from_receiver
    created_at
  }
}
```

### Subscription Best Practices

**Use subscriptions when:**

- Building real-time dashboards
- Monitoring live protocol activity
- Tracking position changes
- Creating notification systems

**Use polling when:**

- Data updates infrequently
- Real-time updates aren't critical
- Minimizing server connections is important

---

## Best Practices

### 1. Avoid Over-Fetching

❌ **Bad**: Fetching all fields when you only need a few

```graphql
query GetAtoms {
  atoms(limit: 10) {
    term_id
    data
    label
    image
    emoji
    type
    wallet_id
    block_number
    created_at
    transaction_hash
    creator_id
    creator {
      id
      label
      image
      atom_id
      type
    }
    # ... many more fields you don't need
  }
}
```

✅ **Good**: Request only what you need

```graphql
query GetAtoms {
  atoms(limit: 10) {
    term_id
    label
    image
  }
}
```

### 2. Use Aggregates Efficiently

❌ **Bad**: Fetching all nodes just to count

```graphql
query CountPositions($accountId: String!) {
  positions(where: { account_id: { _eq: $accountId } }) {
    id # Fetching all data just to count
  }
}
```

✅ **Good**: Use aggregates

```graphql
query CountPositions($accountId: String!) {
  positions_aggregate(where: { account_id: { _eq: $accountId } }) {
    aggregate {
      count
    }
  }
}
```

### 3. Combine Aggregates with Nodes When Needed

✅ **Efficient pattern**: Get both count and paginated data in one query

```graphql
query GetPositionsWithCount($accountId: String!, $limit: Int!, $offset: Int!) {
  total: positions_aggregate(where: { account_id: { _eq: $accountId } }) {
    aggregate {
      count
      sum {
        shares
      }
    }
  }
  positions(
    where: { account_id: { _eq: $accountId } }
    limit: $limit
    offset: $offset
  ) {
    id
    shares
    vault {
      term_id
      current_share_price
    }
  }
}
```

### 4. Use Fragments for Reusable Structures

❌ **Bad**: Duplicating field selections

```graphql
query GetTriple($id: String!) {
  triple(term_id: $id) {
    subject {
      term_id
      label
      image
      creator {
        id
        label
      }
    }
    predicate {
      term_id
      label
      image
      creator {
        id
        label
      }
    }
    object {
      term_id
      label
      image
      creator {
        id
        label
      }
    }
  }
}
```

✅ **Good**: Using fragments

```graphql
fragment AtomBasics on atoms {
  term_id
  label
  image
  creator {
    id
    label
  }
}

query GetTriple($id: String!) {
  triple(term_id: $id) {
    subject {
      ...AtomBasics
    }
    predicate {
      ...AtomBasics
    }
    object {
      ...AtomBasics
    }
  }
}
```

### 5. Use Variables for Dynamic Values

❌ **Bad**: Hardcoding values

```graphql
query {
  atoms(where: { type: { _eq: Person } }) {
    term_id
    label
  }
}
```

✅ **Good**: Using variables

```graphql
query GetAtomsByType($type: atom_type!) {
  atoms(where: { type: { _eq: $type } }) {
    term_id
    label
  }
}
```

### 6. Filter Early and Specifically

✅ **Efficient filtering**:

```graphql
query GetRecentPersonAtoms($since: timestamptz!) {
  atoms(
    where: { type: { _eq: Person }, created_at: { _gte: $since } }
    limit: 100
  ) {
    term_id
    label
  }
}
```

### 7. Use Appropriate Comparison Operators

❌ **Bad**: Using `_ilike` for exact matches

```graphql
query GetAccount($address: String!) {
  accounts(where: { id: { _ilike: $address } }) {
    id
    label
  }
}
```

✅ **Good**: Use `_eq` or primary key lookup

```graphql
query GetAccount($address: String!) {
  account(id: $address) {
    id
    label
  }
}
```

### 8. Paginate Large Result Sets

Always use `limit` and `offset` for queries that could return many results:

```graphql
query GetAllAtoms($limit: Int!, $offset: Int!) {
  atoms(limit: $limit, offset: $offset, order_by: { created_at: desc }) {
    term_id
    label
  }
}
```

### 9. Leverage Pre-Computed Statistics

Use time-series aggregation tables instead of computing statistics client-side:

❌ **Bad**: Computing trends from raw events

```graphql
query GetPriceHistory($termId: String!) {
  # Fetching all price changes then computing daily aggregates in app
  share_price_changes(
    where: { term_id: { _eq: $termId } }
    order_by: { created_at: asc }
  ) {
    created_at
    old_price
    new_price
  }
}
```

✅ **Good**: Using pre-computed daily statistics

```graphql
query GetDailyPriceStats($termId: String!, $curveId: numeric!) {
  share_price_change_stats_daily(
    where: { term_id: { _eq: $termId }, curve_id: { _eq: $curveId } }
    order_by: { bucket: desc }
    limit: 30
  ) {
    bucket
    first_share_price
    last_share_price
    difference
    change_count
  }
}
```

**When to use pre-computed tables**:

- Building charts/graphs for analytics dashboards
- Computing trends over time
- Displaying aggregate metrics by time period

**Available time-series tables**:

- `share_price_change_stats_daily`, `_hourly`, `_weekly`, `_monthly`
- `signal_stats_daily`, `_hourly`, `_monthly`

### 10. Use Database Functions for Complex Queries

Leverage backend functions instead of filtering large datasets client-side:

❌ **Bad**: Manual filtering for social queries

```graphql
query GetFollowingManually($address: String!) {
  # First get all positions for an address
  my_positions: positions(where: { account_id: { _eq: $address } }) {
    vault {
      term {
        triple {
          # Check if it's a "follows" relationship...
          # This is inefficient and complex
        }
      }
    }
  }

  # Then filter in application code...
}
```

✅ **Good**: Using database functions

```graphql
query GetFollowingEfficiently($address: String!) {
  following(args: { address: $address }) {
    id
    label
    atom {
      term_id
      label
    }
  }
}
```

**Available database functions**:

- `following` - Get accounts a user follows
- `positions_from_following` - Social feed of positions
- `search_positions_on_subject` - Complex position filtering
- `search_term` - Full-text search
- `search_term_from_following` - Search within social graph
- `signals_from_following` - Activity from followed accounts

**Benefits**:

- Faster query execution (runs in database, not client)
- Less data transferred over network
- More maintainable code

### 11. Choose Subscriptions vs Polling Appropriately

Use subscriptions for real-time features, polling for everything else:

✅ **Use subscriptions when:**

- Building real-time dashboards
- Monitoring live protocol activity (e.g., new positions, price changes)
- Creating notification systems
- User expects immediate updates
- Data changes frequently (multiple times per minute)

**Example subscription use cases**:

```graphql
subscription WatchMyPositions($cursor: [positions_stream_cursor_input]!) {
  positions_stream(cursor: $cursor, batch_size: 10) {
    id
    shares
    vault {
      current_share_price
    }
  }
}
```

✅ **Use polling when:**

- Data updates infrequently (e.g., daily statistics)
- Real-time updates aren't critical for UX
- Minimizing server connections is important
- Building static reports or analytics

**Example polling pattern**:

```graphql
query GetStats {
  stats {
    total_accounts
    total_atoms
    total_triples
  }
}
# Poll every 30 seconds or on user action
```

**Subscription cursor management**:

- Always provide `initial_value` to start from a specific point
- Use `batch_size` to control data flow (typically 10-50)
- Store last received cursor to resume after disconnection
- Use `ordering: ASC` for chronological updates

---

## Example Queries

### Example 1: Get Atom Details with Vault Info

This example shows how to fetch atom metadata along with vault statistics.

```graphql
query GetAtomWithVault($atomId: String!, $curveId: numeric!) {
  atom(term_id: $atomId) {
    term_id
    label
    image
    type
    created_at
    creator {
      id
      label
    }
    term {
      vaults(where: { curve_id: { _eq: $curveId } }) {
        curve_id
        total_shares
        total_assets
        current_share_price
        position_count
      }
    }
  }
}
```

**Variables**:

```json
{
  "atomId": "0x57d94c116a33bb460428eced262b7ae2ec6f865e7aceef6357cec3d034e8ea21",
  "curveId": "1"
}
```

**Best Practices Used**:

- Uses variables for dynamic values
- Requests only needed fields
- Filters vault by curve_id using a variable

---

### Example 2: List Triples with Pagination

Get a paginated list of triples with total count.

```graphql
query GetTriplesPage($limit: Int!, $offset: Int!, $where: triples_bool_exp) {
  total: triples_aggregate(where: $where) {
    aggregate {
      count
    }
  }
  triples(
    where: $where
    limit: $limit
    offset: $offset
    order_by: { created_at: desc }
  ) {
    term_id
    created_at
    subject {
      term_id
      label
      image
    }
    predicate {
      term_id
      label
    }
    object {
      term_id
      label
      image
    }
  }
}
```

**Variables**:

```json
{
  "limit": 20,
  "offset": 0,
  "where": {
    "predicate_id": {
      "_eq": "0x..."
    }
  }
}
```

**Best Practices Used**:

- Combines aggregate count with paginated nodes
- Uses variables for all dynamic values
- Includes ordering for consistent pagination

---

### Example 3: Get User's Positions with Totals

Fetch user positions with aggregate statistics.

```graphql
query GetUserPositions($accountId: String!, $limit: Int!, $offset: Int!) {
  stats: positions_aggregate(where: { account_id: { _eq: $accountId } }) {
    aggregate {
      count
      sum {
        shares
      }
    }
  }

  positions(
    where: { account_id: { _eq: $accountId } }
    order_by: { shares: desc }
    limit: $limit
    offset: $offset
  ) {
    id
    shares
    vault {
      term_id
      curve_id
      current_share_price
      total_shares
      term {
        atom {
          term_id
          label
          image
        }
        triple {
          term_id
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
      }
    }
  }
}
```

**Variables**:

```json
{
  "accountId": "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
  "limit": 10,
  "offset": 0
}
```

**Best Practices Used**:

- Gets aggregate stats alongside paginated results
- Uses relationship traversal to get atom/triple details
- Aliases aggregate query as `stats` for clarity

---

### Example 4: Global Search Across Types

Search for a term across accounts, atoms, and triples.

```graphql
query GlobalSearch($searchTerm: String!) {
  accounts(
    where: {
      _or: [
        { label: { _ilike: $searchTerm } }
        { atom: { label: { _ilike: $searchTerm } } }
      ]
    }
    limit: 5
  ) {
    id
    label
    image
  }

  atoms(
    where: { label: { _ilike: $searchTerm } }
    order_by: { term: { total_market_cap: desc } }
    limit: 10
  ) {
    term_id
    label
    image
    type
  }

  triples(
    where: {
      _or: [
        { subject: { label: { _ilike: $searchTerm } } }
        { predicate: { label: { _ilike: $searchTerm } } }
        { object: { label: { _ilike: $searchTerm } } }
      ]
    }
    limit: 10
  ) {
    term_id
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
}
```

**Variables**:

```json
{
  "searchTerm": "%ethereum%"
}
```

**Best Practices Used**:

- Uses `_or` conditions for multi-field search
- Limits results per type to avoid over-fetching
- Uses `_ilike` appropriately for pattern matching

---

### Example 5: Get Vault Statistics

Calculate derived metrics from vault data.

```graphql
query GetVaultStats($termId: String!, $curveId: numeric!) {
  vault(term_id: $termId, curve_id: $curveId) {
    term_id
    curve_id
    total_shares
    total_assets
    current_share_price
    position_count

    positions_aggregate {
      aggregate {
        count
        sum {
          shares
        }
        avg {
          shares
        }
      }
    }

    top_positions: positions(limit: 5, order_by: { shares: desc }) {
      account {
        id
        label
      }
      shares
    }
  }
}
```

**Variables**:

```json
{
  "termId": "0x...",
  "curveId": "1"
}
```

**Best Practices Used**:

- Uses aggregates for statistics (count, sum, avg)
- Limits top positions query
- Uses aliases for clarity (`top_positions`)

---

## Advanced Examples

The following examples demonstrate more complex use cases and advanced API features.

### Example 6: Social Graph - Following Feed

Build a social feed showing positions from accounts a user follows.

```graphql
query GetFollowingFeed($address: String!, $limit: Int!, $offset: Int!) {
  # Get total follower count
  following_count: following_aggregate(args: { address: $address }) {
    aggregate {
      count
    }
  }

  # Get positions from followed accounts
  feed: positions_from_following(
    args: { address: $address }
    limit: $limit
    offset: $offset
    order_by: { created_at: desc }
  ) {
    id
    shares
    created_at
    account {
      id
      label
      image
    }
    vault {
      term_id
      curve_id
      current_share_price
      total_shares
      term {
        atom {
          term_id
          label
          image
          type
        }
        triple {
          term_id
          subject {
            label
            image
          }
          predicate {
            label
          }
          object {
            label
            image
          }
        }
      }
    }
  }

  # Also get signals (deposits/redemptions) from followed accounts
  signals: signals_from_following(
    args: { address: $address }
    limit: $limit
    order_by: { created_at: desc }
  ) {
    id
    event_type
    created_at
    account {
      id
      label
      image
    }
    atom {
      term_id
      label
    }
    triple {
      term_id
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
  }
}
```

**Variables**:

```json
{
  "address": "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
  "limit": 20,
  "offset": 0
}
```

**Use Case**: Build a social activity feed showing what the accounts you follow are investing in, similar to Twitter/X feed but for protocol positions.

**Best Practices Used**:

- Uses database functions (`positions_from_following`, `signals_from_following`) instead of manual filtering
- Combines multiple related queries in one request
- Includes aggregate count for pagination UI
- Handles both atoms and triples in vault term relationship

---

### Example 7: Time-Series Analytics - Price Trends

Analyze price trends over time using pre-computed aggregations.

```graphql
query GetPriceTrendAnalysis($termId: String!, $curveId: numeric!, $days: Int!) {
  # Get daily price changes for the last N days
  daily_trends: share_price_change_stats_daily(
    where: { term_id: { _eq: $termId }, curve_id: { _eq: $curveId } }
    order_by: { bucket: desc }
    limit: $days
  ) {
    bucket
    first_share_price
    last_share_price
    difference
    change_count
  }

  # Get hourly data for the last 24 hours for granular view
  hourly_trends: share_price_change_stats_hourly(
    where: { term_id: { _eq: $termId }, curve_id: { _eq: $curveId } }
    order_by: { bucket: desc }
    limit: 24
  ) {
    bucket
    first_share_price
    last_share_price
    difference
  }

  # Get current vault state
  current_state: vault(term_id: $termId, curve_id: $curveId) {
    term_id
    curve_id
    current_share_price
    total_shares
    total_assets
    position_count
  }

  # Get overall signal stats for context
  signal_trends: signal_stats_daily(
    where: { term_id: { _eq: $termId }, curve_id: { _eq: $curveId } }
    order_by: { bucket: desc }
    limit: $days
  ) {
    bucket
    deposit_count
    redemption_count
    total_volume
  }
}
```

**Variables**:

```json
{
  "termId": "0x57d94c116a33bb460428eced262b7ae2ec6f865e7aceef6357cec3d034e8ea21",
  "curveId": "1",
  "days": 30
}
```

**Use Case**: Build analytics dashboards showing price trends, trading volume, and market activity over different time periods.

**Best Practices Used**:

- Leverages pre-computed time-series tables for performance
- Combines multiple time granularities (daily, hourly) in one query
- Includes current state for comparison
- Uses variables for all dynamic values

**Analysis Notes**:

- Calculate percentage change: `(last_share_price - first_share_price) / first_share_price * 100`
- `change_count` shows number of price changes in that time bucket
- Weekly and monthly aggregations available via `share_price_change_stats_weekly` and `share_price_change_stats_monthly`

---

### Example 8: Advanced Search - Multi-Criteria Position Search

Perform complex position searches with custom filtering criteria.

```graphql
query AdvancedPositionSearch(
  $addresses: _text!
  $searchFields: jsonb!
  $limit: Int!
) {
  # Search positions with custom criteria
  results: search_positions_on_subject(
    args: { addresses: $addresses, search_fields: $searchFields }
    limit: $limit
  ) {
    id
    shares
    created_at
    account {
      id
      label
      image
    }
    vault {
      term_id
      curve_id
      current_share_price
      total_shares
      position_count
      term {
        atom {
          term_id
          label
          image
          type
        }
        triple {
          term_id
          subject {
            term_id
            label
            image
          }
          predicate {
            term_id
            label
          }
          object {
            term_id
            label
            image
          }
        }
      }
    }
  }

  # Get count for pagination
  results_aggregate: search_positions_on_subject_aggregate(
    args: { addresses: $addresses, search_fields: $searchFields }
  ) {
    aggregate {
      count
      sum {
        shares
      }
    }
  }
}
```

**Variables**:

```json
{
  "addresses": "{0xd8da6bf26964af9d7eed9e03e53415d37aa96045,0xabc123...}",
  "searchFields": {
    "min_shares": "1000000000000000000",
    "term_type": "atom",
    "atom_type": "Person"
  },
  "limit": 50
}
```

**Use Case**: Build advanced search UIs where users can filter positions by:

- Multiple wallet addresses
- Minimum share amounts
- Term type (atom vs triple)
- Atom type (Person, Organization, Thing)
- Other custom criteria in `search_fields`

**Best Practices Used**:

- Uses backend function for complex filtering (more efficient than client-side)
- Includes aggregate variant for totals
- Handles both atom and triple results
- Uses `_text` type for array of addresses

---

### Example 9: Real-Time Updates - Subscription Pattern

Build a live dashboard with real-time position updates.

```graphql
subscription LivePositionMonitor(
  $cursor: [positions_stream_cursor_input]!
  $accountId: String
  $batchSize: Int!
) {
  # Stream position updates
  positions_stream(
    cursor: $cursor
    batch_size: $batchSize
    where: { account_id: { _eq: $accountId }, shares: { _gt: "0" } }
  ) {
    id
    shares
    created_at
    account {
      id
      label
    }
    vault {
      term_id
      curve_id
      current_share_price
      term {
        atom {
          term_id
          label
          image
        }
        triple {
          term_id
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
      }
    }
  }
}
```

**Variables (Initial)**:

```json
{
  "cursor": [
    {
      "initial_value": { "created_at": "2024-12-01T00:00:00Z" },
      "ordering": "ASC"
    }
  ],
  "accountId": "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
  "batchSize": 10
}
```

**Variables (Resuming)**:

```json
{
  "cursor": [
    {
      "initial_value": { "created_at": "2024-12-12T15:30:00Z" },
      "ordering": "ASC"
    }
  ],
  "accountId": "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
  "batchSize": 10
}
```

**Use Case**: Create real-time dashboards that update automatically when:

- New positions are created
- Existing positions change
- User performs deposits or redemptions

**Implementation Pattern**:

1. Start subscription with initial cursor (e.g., last hour)
2. Process incoming batches of updates
3. Update UI state with new data
4. If connection drops, resume from last received `created_at`

**Best Practices Used**:

- Filters for active positions (`shares > 0`)
- Uses batch_size to control data flow
- Cursor enables resumable streams after disconnection
- Ascending order to get updates chronologically

---

### Example 10: Mutation Flow - Pinning Content to IPFS

Complete workflow for creating an atom with metadata pinning.

```graphql
# Step 1: Pin person metadata to IPFS
mutation PinPersonMetadata($person: PinPersonInput!) {
  pinPerson(person: $person) {
    hash
    name
    size
  }
}

# Step 2: Query to verify atom after on-chain creation
query GetCreatedAtom($termId: String!, $curveId: numeric!) {
  atom(term_id: $termId) {
    term_id
    data
    label
    image
    emoji
    type
    created_at
    creator {
      id
      label
    }
    term {
      vaults(where: { curve_id: { _eq: $curveId } }) {
        term_id
        curve_id
        total_shares
        total_assets
        current_share_price
        position_count
      }
    }
  }
}
```

**Step 1 Variables**:

```json
{
  "person": {
    "name": "Satoshi Nakamoto",
    "description": "Creator of Bitcoin",
    "identifier": "satoshi",
    "image": "ipfs://QmPreviouslyUploadedImage...",
    "url": "https://bitcoin.org"
  }
}
```

**Step 1 Response**:

```json
{
  "data": {
    "pinPerson": {
      "hash": "QmYx8C3kNN1sFSx5b...",
      "name": "person.json",
      "size": 184
    }
  }
}
```

**Step 2 Variables** (after blockchain transaction):

```json
{
  "termId": "0x57d94c116a33bb460428eced262b7ae2ec6f865e7aceef6357cec3d034e8ea21",
  "curveId": "1"
}
```

**Complete Workflow**:

1. **Prepare metadata** - Gather all person/thing/organization data
2. **Upload image** (optional) - Use `uploadImageFromUrl` or `uploadImage` if needed
3. **Pin metadata** - Use `pinPerson`, `pinThing`, or `pinOrganization`
4. **Get IPFS hash** - Extract `hash` from mutation response
5. **Create atom on-chain** - Call smart contract with IPFS hash (via [@0xintuition/protocol](../protocol/README.md))
6. **Wait for indexing** - GraphQL API will index the new atom (usually < 30 seconds)
7. **Query atom** - Fetch complete atom data with vault information
8. **Cache metadata** - Store IPFS hash for future reference

**Error Handling Considerations**:

- Mutation may fail if image classification fails (inappropriate content)
- IPFS pinning may timeout - implement retry logic
- Blockchain transaction may fail - check gas and approval
- Atom may not appear immediately - poll or subscribe for updates

**Best Practices Used**:

- Separates IPFS operations from blockchain operations
- Uses appropriate mutation for entity type
- Queries include vault data for immediate display
- Workflow is idempotent (can retry safely)

---

## Code Generation

### Generating the Schema File

The GraphQL schema is not stored in the repository. Generate it via introspection:

```bash
# Mainnet
npx get-graphql-schema https://mainnet.intuition.sh/v1/graphql > schema.graphql

# Testnet
npx get-graphql-schema https://testnet.intuition.sh/v1/graphql > schema.graphql
```

### Code Generation Tools

Once you have the schema, use it with your preferred code generation tool:

#### JavaScript/TypeScript

- **[GraphQL Code Generator](https://the-guild.dev/graphql/codegen)**: Generate TypeScript types, React hooks, and more
- **[Apollo CLI](https://www.apollographql.com/docs/devtools/cli/)**: Generate types for Apollo Client

#### Python

- **[Ariadne Codegen](https://ariadnegraphql.org/docs/codegen)**: Generate Python types and client code
- **[sgqlc](https://github.com/profusion/sgqlc)**: Generate Python types from schema

#### Go

- **[gqlgen](https://gqlgen.com/)**: Generate Go server and client code
- **[genqlient](https://github.com/Khan/genqlient)**: Generate Go client code

#### Rust

- **[graphql-client](https://github.com/graphql-rust/graphql-client)**: Typed GraphQL queries in Rust
- **[cynic](https://cynic-rs.dev/)**: Type-safe GraphQL client for Rust

Each tool has specific configuration requirements - refer to their official documentation.

---

## Anti-Patterns to Avoid

### ❌ Anti-Pattern 1: Hardcoding Values in Queries

**Problem**: Hardcoding values like curve IDs makes queries inflexible and violates DRY principles.

```graphql
# BAD
fragment VaultDetails on atoms {
  term {
    vaults(where: { curve_id: { _eq: "1" } }) {
      # ❌ Hardcoded!
      total_shares
    }
  }
}
```

**Solution**: Always use variables for dynamic values.

```graphql
# GOOD
fragment VaultDetails on atoms {
  term {
    vaults(where: { curve_id: { _eq: $curveId } }) {
      # ✅ Variable
      total_shares
    }
  }
}

query GetAtom($id: String!, $curveId: numeric!) {
  atom(term_id: $id) {
    ...VaultDetails
  }
}
```

---

### ❌ Anti-Pattern 2: Over-Fetching When Only Aggregates Needed

**Problem**: Fetching all nodes when you only need counts or sums wastes bandwidth and processing.

```graphql
# BAD
query GetPositionCount($where: positions_bool_exp) {
  positions(where: $where) {
    # ❌ Fetches all data
    id
    shares
    account_id
  }
}
# Application code then counts the results
```

**Solution**: Use `_aggregate` queries.

```graphql
# GOOD
query GetPositionCount($where: positions_bool_exp) {
  positions_aggregate(where: $where) {
    # ✅ Only returns count
    aggregate {
      count
      sum {
        shares
      }
    }
  }
}
```

---

### ❌ Anti-Pattern 3: Unnecessary Deep Nesting

**Problem**: Over-nesting queries fetches data you don't need.

```graphql
# BAD
query GetAtom($id: String!) {
  atom(term_id: $id) {
    label
    creator {
      id
      atoms {
        # ❌ Fetching all creator's atoms when not needed
        term_id
        label
        as_subject_triples {
          # ❌ Even deeper unnecessary nesting
          term_id
        }
      }
    }
  }
}
```

**Solution**: Only query what you actually need.

```graphql
# GOOD
query GetAtom($id: String!) {
  atom(term_id: $id) {
    label
    creator {
      id
      label
    }
  }
}
```

---

### ❌ Anti-Pattern 4: Not Using Variables for Filters

**Problem**: Embedding filter values directly makes queries inflexible.

```graphql
# BAD
query {
  atoms(where: { type: { _eq: Person } }) {
    # ❌ Hardcoded
    term_id
    label
  }
}
```

**Solution**: Always use variables.

```graphql
# GOOD
query GetAtomsByType($type: atom_type!) {
  atoms(where: { type: { _eq: $type } }) {
    # ✅ Variable
    term_id
    label
  }
}
```

---

### ❌ Anti-Pattern 5: Fetching Same Data Multiple Times

**Problem**: Duplicating field selections across the query.

```graphql
# BAD
query GetTriple($id: String!) {
  triple(term_id: $id) {
    subject {
      term_id
      label
      creator {
        id
        label
      } # ❌ Duplicated
    }
    predicate {
      term_id
      label
      creator {
        id
        label
      } # ❌ Duplicated
    }
    object {
      term_id
      label
      creator {
        id
        label
      } # ❌ Duplicated
    }
  }
}
```

**Solution**: Use fragments for repeated structures.

```graphql
# GOOD
fragment AtomBasics on atoms {
  term_id
  label
  creator {
    id
    label
  }
}

query GetTriple($id: String!) {
  triple(term_id: $id) {
    subject {
      ...AtomBasics
    } # ✅ Reusable
    predicate {
      ...AtomBasics
    }
    object {
      ...AtomBasics
    }
  }
}
```

---

### ❌ Anti-Pattern 6: Using `_ilike` for Exact Matches

**Problem**: Pattern matching operators are slower than exact equality checks.

```graphql
# BAD
query GetAccount($address: String!) {
  accounts(where: { id: { _ilike: $address } }) {
    # ❌ Inefficient
    id
    label
  }
}
```

**Solution**: Use `_eq` for exact matches or primary key lookups.

```graphql
# GOOD
query GetAccount($address: String!) {
  account(id: $address) {
    # ✅ Primary key lookup
    id
    label
  }
}

# Or with _eq
query GetAccounts($address: String!) {
  accounts(where: { id: { _eq: $address } }) {
    # ✅ Exact match
    id
    label
  }
}
```

---

### ❌ Anti-Pattern 7: Not Using Fragments from the Package

**Problem**: Re-writing common field selections instead of using existing fragments.

This package includes pre-built fragments in `src/fragments/`:

- `atom.graphql` - Atom metadata, values, transactions, vault details
- `triple.graphql` - Triple metadata, vault details
- `position.graphql` - Position details and aggregates
- `account.graphql` - Account metadata
- `vault.graphql` - Vault details

**Solution**: Reference and use these fragments in your queries where appropriate, or create similar reusable fragments in your own codebase.

---

**IMPORTANT NOTE**: Many of these anti-patterns exist in `packages/graphql/src/queries/*.graphql` and need to be refactored. This README serves as the authoritative guide for how queries SHOULD be written.

---

## Resources

### Documentation

- **GraphQL Official Docs**: https://graphql.org/learn/
- **Hasura GraphQL Docs**: https://hasura.io/docs/latest/queries/postgres/index/
- **Intuition Protocol Docs**: https://docs.intuition.systems

### Interactive Explorers

- **Mainnet**: [Apollo Studio Sandbox](https://studio.apollographql.com/sandbox/explorer?endpoint=https%3A%2F%2Fmainnet.intuition.sh%2Fv1%2Fgraphql)
- **Testnet**: [Apollo Studio Sandbox](https://studio.apollographql.com/sandbox/explorer?endpoint=https%3A%2F%2Ftestnet.intuition.sh%2Fv1%2Fgraphql)

### Related Packages

- **[@0xintuition/protocol](../protocol/README.md)**: Low-level smart contract interactions
- **[@0xintuition/sdk](../sdk/README.md)**: High-level SDK combining on-chain and off-chain data

### Block Explorers

- **Mainnet**: https://explorer.intuition.systems
- **Testnet**: https://testnet.explorer.intuition.systems

### Repository

- **GitHub**: https://github.com/0xIntuition/intuition-ts

---

## Contributing

Please see the core [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines.

---

## License

MIT License - see the [repository](https://github.com/0xIntuition/intuition-ts) for details.
