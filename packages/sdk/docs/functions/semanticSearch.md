[**@0xintuition/sdk**](../README.md)

---

[@0xintuition/sdk](../README.md) / semanticSearch

# Function: semanticSearch()

> **semanticSearch**(`query`, `options`): `Promise`\<`SemanticSearchQuery` \| `null`\>

Defined in: [packages/sdk/src/api/semantic-search.ts:18](https://github.com/0xIntuition/intuition-ts/blob/bce09de32d88cea435aa3e46e7756b0a862fcd9b/packages/sdk/src/api/semantic-search.ts#L18)

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
