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
- [Best Practices](#best-practices)
- [Example Queries](#example-queries)
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
import { API_URL_PROD, API_URL_DEV } from '@0xintuition/graphql'

// API_URL_PROD = 'https://mainnet.intuition.sh/v1/graphql'
// API_URL_DEV = 'https://testnet.intuition.sh/v1/graphql'
```

#### graphql-request

```typescript
import { GraphQLClient } from 'graphql-request'
import { API_URL_PROD } from '@0xintuition/graphql'

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
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { API_URL_PROD } from '@0xintuition/graphql'

const client = new ApolloClient({
  uri: API_URL_PROD,
  cache: new InMemoryCache()
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
  variables: { id: '0x...' }
})
```

[@apollo/client documentation](https://www.apollographql.com/docs/react/)

#### urql

```typescript
import { createClient } from 'urql'
import { API_URL_PROD } from '@0xintuition/graphql'

const client = createClient({
  url: API_URL_PROD
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
    variables: { id: '0x...' }
  })
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
    where: {
      created_at: { _gte: "2024-01-01" }
      type: { _eq: Person }
    }
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
    order_by: [
      { term: { total_market_cap: desc } }
      { created_at: desc }
    ]
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
  atom(term_id: $id) {  # Direct lookup by primary key
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
    predicate { label }
    object { label }
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
    subject { label }
    predicate { label }
    object { label }
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
    subject { label }
    predicate { label }
    object { label }
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
  atoms(
    limit: $limit
    offset: $offset
    order_by: { created_at: desc }
  ) {
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
    id  # Fetching all data just to count
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
query GetPositionsWithCount(
  $accountId: String!
  $limit: Int!
  $offset: Int!
) {
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
      creator { id label }
    }
    predicate {
      term_id
      label
      image
      creator { id label }
    }
    object {
      term_id
      label
      image
      creator { id label }
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
    subject { ...AtomBasics }
    predicate { ...AtomBasics }
    object { ...AtomBasics }
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
    where: {
      type: { _eq: Person }
      created_at: { _gte: $since }
    }
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
  atoms(
    limit: $limit
    offset: $offset
    order_by: { created_at: desc }
  ) {
    term_id
    label
  }
}
```

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
query GetTriplesPage(
  $limit: Int!
  $offset: Int!
  $where: triples_bool_exp
) {
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
          subject { label }
          predicate { label }
          object { label }
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
    subject { label }
    predicate { label }
    object { label }
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

    top_positions: positions(
      limit: 5
      order_by: { shares: desc }
    ) {
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
    vaults(where: { curve_id: { _eq: "1" } }) {  # ❌ Hardcoded!
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
    vaults(where: { curve_id: { _eq: $curveId } }) {  # ✅ Variable
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
  positions(where: $where) {  # ❌ Fetches all data
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
  positions_aggregate(where: $where) {  # ✅ Only returns count
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
      atoms {  # ❌ Fetching all creator's atoms when not needed
        term_id
        label
        as_subject_triples {  # ❌ Even deeper unnecessary nesting
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
  atoms(where: { type: { _eq: Person } }) {  # ❌ Hardcoded
    term_id
    label
  }
}
```

**Solution**: Always use variables.

```graphql
# GOOD
query GetAtomsByType($type: atom_type!) {
  atoms(where: { type: { _eq: $type } }) {  # ✅ Variable
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
      creator { id label }  # ❌ Duplicated
    }
    predicate {
      term_id
      label
      creator { id label }  # ❌ Duplicated
    }
    object {
      term_id
      label
      creator { id label }  # ❌ Duplicated
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
    subject { ...AtomBasics }  # ✅ Reusable
    predicate { ...AtomBasics }
    object { ...AtomBasics }
  }
}
```

---

### ❌ Anti-Pattern 6: Using `_ilike` for Exact Matches

**Problem**: Pattern matching operators are slower than exact equality checks.

```graphql
# BAD
query GetAccount($address: String!) {
  accounts(where: { id: { _ilike: $address } }) {  # ❌ Inefficient
    id
    label
  }
}
```

**Solution**: Use `_eq` for exact matches or primary key lookups.

```graphql
# GOOD
query GetAccount($address: String!) {
  account(id: $address) {  # ✅ Primary key lookup
    id
    label
  }
}

# Or with _eq
query GetAccounts($address: String!) {
  accounts(where: { id: { _eq: $address } }) {  # ✅ Exact match
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
