[**@0xintuition/sdk**](../README.md)

---

[@0xintuition/sdk](../README.md) / globalSearch

# Function: globalSearch()

> **globalSearch**(`query`, `options`): `Promise`\<`GlobalSearchQuery` \| `null`\>

Defined in: [packages/sdk/src/api/search.ts:21](https://github.com/0xIntuition/intuition-ts/blob/bce09de32d88cea435aa3e46e7756b0a862fcd9b/packages/sdk/src/api/search.ts#L21)

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
