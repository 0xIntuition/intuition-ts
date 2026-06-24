[**@0xintuition/sdk**](../README.md)

---

[@0xintuition/sdk](../README.md) / search

# Function: search()

> **search**(`searchFields`, `addresses`): `Promise`\<[`SearchResult`](../type-aliases/SearchResult.md)\>

Defined in: [packages/sdk/src/experimental/utils.ts:54](https://github.com/0xIntuition/intuition-ts/blob/bce09de32d88cea435aa3e46e7756b0a862fcd9b/packages/sdk/src/experimental/utils.ts#L54)

Searches positions for the provided fields and aggregates results by subject.

## Parameters

### searchFields

`Record`\<`string`, `string`\>[]

Array of field match objects for the GraphQL query.

### addresses

`` `0x${string}` ``[]

Wallet addresses to search positions for.

## Returns

`Promise`\<[`SearchResult`](../type-aliases/SearchResult.md)\>

Subject -> predicate -> object(s) mapping.
