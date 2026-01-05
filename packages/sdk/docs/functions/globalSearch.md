[**@0xintuition/sdk**](../README.md)

---

[@0xintuition/sdk](../README.md) / globalSearch

# Function: globalSearch()

> **globalSearch**(`query`, `options`): `Promise`\<`GlobalSearchQuery` \| `null`\>

Defined in: [packages/sdk/src/api/search.ts:21](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/sdk/src/api/search.ts#L21)

Performs a global search across atoms, accounts, triples, and collections.

## Parameters

### query

`string`

Search query string.

### options

[`GlobalSearchOptions`](../interfaces/GlobalSearchOptions.md)

Result limits for each entity type.

## Returns

`Promise`\<`GlobalSearchQuery` \| `null`\>

GraphQL search response data or null on error.
