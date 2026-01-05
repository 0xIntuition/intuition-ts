[**@0xintuition/sdk**](../README.md)

---

[@0xintuition/sdk](../README.md) / semanticSearch

# Function: semanticSearch()

> **semanticSearch**(`query`, `options`): `Promise`\<`SemanticSearchQuery` \| `null`\>

Defined in: [packages/sdk/src/api/semantic-search.ts:18](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/sdk/src/api/semantic-search.ts#L18)

Runs a semantic search query against the GraphQL API.

## Parameters

### query

`string`

Query string for semantic search.

### options

[`SemanticSearchOptions`](../interfaces/SemanticSearchOptions.md)

Search options such as result limit.

## Returns

`Promise`\<`SemanticSearchQuery` \| `null`\>

GraphQL semantic search response data or null on error.
