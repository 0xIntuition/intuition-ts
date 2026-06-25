[**@0xintuition/sdk**](../README.md)

---

[@0xintuition/sdk](../README.md) / findAtomIds

# Function: findAtomIds()

> **findAtomIds**(`atoms`): `Promise`\<[`AtomWithId`](../type-aliases/AtomWithId.md)[]\>

Defined in: [packages/sdk/src/experimental/utils.ts:108](https://github.com/0xIntuition/intuition-ts/blob/bce09de32d88cea435aa3e46e7756b0a862fcd9b/packages/sdk/src/experimental/utils.ts#L108)

Resolves atom IDs for a list of atom data strings, batching when needed.

## Parameters

### atoms

`string`[]

Atom data strings to look up.

## Returns

`Promise`\<[`AtomWithId`](../type-aliases/AtomWithId.md)[]\>

List of atoms with their term IDs.
