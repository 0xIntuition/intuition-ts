[**@0xintuition/sdk**](../README.md)

---

[@0xintuition/sdk](../README.md) / wait

# Function: wait()

> **wait**(`hash`, `options`): `Promise`\<`void`\>

Defined in: [packages/sdk/src/experimental/utils.ts:160](https://github.com/0xIntuition/intuition-ts/blob/bce09de32d88cea435aa3e46e7756b0a862fcd9b/packages/sdk/src/experimental/utils.ts#L160)

Polls the GraphQL API for transaction events until found or timed out.

## Parameters

### hash

Transaction hash to poll for; null returns immediately.

`string` | `null`

### options

[`WaitOptions`](../interfaces/WaitOptions.md) = `{}`

Polling configuration and progress callback.

## Returns

`Promise`\<`void`\>

Resolves when events are found or after post-transaction delay.
