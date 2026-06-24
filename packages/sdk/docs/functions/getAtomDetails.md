[**@0xintuition/sdk**](../README.md)

---

[@0xintuition/sdk](../README.md) / getAtomDetails

# Function: getAtomDetails()

> **getAtomDetails**(`atomId`): `Promise`\<\{ `__typename?`: `"atoms"`; `as_object_triples`: `object`[]; `as_predicate_triples`: `object`[]; `as_subject_triples`: `object`[]; `block_number`: `any`; `created_at`: `any`; `creator?`: \{ `__typename?`: `"accounts"`; `atom_id?`: `string` \| `null`; `id`: `string`; `image?`: `string` \| `null`; `label`: `string`; `type`: `any`; \} \| `null`; `creator_id`: `string`; `data?`: `string` \| `null`; `emoji?`: `string` \| `null`; `image?`: `string` \| `null`; `label?`: `string` \| `null`; `term?`: \{ `__typename?`: `"terms"`; `vaults`: `object`[]; \} \| `null`; `term_id`: `string`; `transaction_hash`: `string`; `type`: `any`; `value?`: \{ `__typename?`: `"atom_values"`; `account?`: \{ `__typename?`: `"accounts"`; `id`: `string`; `image?`: `string` \| `null`; `label`: `string`; \} \| `null`; `organization?`: \{ `__typename?`: `"organizations"`; `description?`: `string` \| `null`; `image?`: `string` \| `null`; `name?`: `string` \| `null`; `url?`: `string` \| `null`; \} \| `null`; `person?`: \{ `__typename?`: `"persons"`; `description?`: `string` \| `null`; `image?`: `string` \| `null`; `name?`: `string` \| `null`; `url?`: `string` \| `null`; \} \| `null`; `thing?`: \{ `__typename?`: `"things"`; `description?`: `string` \| `null`; `image?`: `string` \| `null`; `name?`: `string` \| `null`; `url?`: `string` \| `null`; \} \| `null`; \} \| `null`; `wallet_id`: `string`; \} \| `null`\>

Defined in: [packages/sdk/src/api/get-atom-details.ts:13](https://github.com/0xIntuition/intuition-ts/blob/bce09de32d88cea435aa3e46e7756b0a862fcd9b/packages/sdk/src/api/get-atom-details.ts#L13)

Fetches atom details from the GraphQL API by atom ID.

## Parameters

### atomId

`string`

Atom ID to look up.

## Returns

`Promise`\<\{ `__typename?`: `"atoms"`; `as_object_triples`: `object`[]; `as_predicate_triples`: `object`[]; `as_subject_triples`: `object`[]; `block_number`: `any`; `created_at`: `any`; `creator?`: \{ `__typename?`: `"accounts"`; `atom_id?`: `string` \| `null`; `id`: `string`; `image?`: `string` \| `null`; `label`: `string`; `type`: `any`; \} \| `null`; `creator_id`: `string`; `data?`: `string` \| `null`; `emoji?`: `string` \| `null`; `image?`: `string` \| `null`; `label?`: `string` \| `null`; `term?`: \{ `__typename?`: `"terms"`; `vaults`: `object`[]; \} \| `null`; `term_id`: `string`; `transaction_hash`: `string`; `type`: `any`; `value?`: \{ `__typename?`: `"atom_values"`; `account?`: \{ `__typename?`: `"accounts"`; `id`: `string`; `image?`: `string` \| `null`; `label`: `string`; \} \| `null`; `organization?`: \{ `__typename?`: `"organizations"`; `description?`: `string` \| `null`; `image?`: `string` \| `null`; `name?`: `string` \| `null`; `url?`: `string` \| `null`; \} \| `null`; `person?`: \{ `__typename?`: `"persons"`; `description?`: `string` \| `null`; `image?`: `string` \| `null`; `name?`: `string` \| `null`; `url?`: `string` \| `null`; \} \| `null`; `thing?`: \{ `__typename?`: `"things"`; `description?`: `string` \| `null`; `image?`: `string` \| `null`; `name?`: `string` \| `null`; `url?`: `string` \| `null`; \} \| `null`; \} \| `null`; `wallet_id`: `string`; \} \| `null`\>

Atom details or null if not found or on error.
