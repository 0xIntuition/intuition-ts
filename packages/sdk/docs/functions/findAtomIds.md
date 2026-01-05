[**@0xintuition/sdk**](../README.md)

---

[@0xintuition/sdk](../README.md) / findAtomIds

# Function: findAtomIds()

> **findAtomIds**(`atoms`): `Promise`\<[`AtomWithId`](../type-aliases/AtomWithId.md)[]\>

Defined in: [packages/sdk/src/experimental/utils.ts:108](https://github.com/0xIntuition/intuition-ts/blob/205e10cc7cd6d3c4b27f907604b3b77c2d750145/packages/sdk/src/experimental/utils.ts#L108)

Resolves atom IDs for a list of atom data strings, batching when needed.

## Parameters

### atoms

`string`[]

Atom data strings to look up.

## Returns

`Promise`\<[`AtomWithId`](../type-aliases/AtomWithId.md)[]\>

List of atoms with their term IDs.
