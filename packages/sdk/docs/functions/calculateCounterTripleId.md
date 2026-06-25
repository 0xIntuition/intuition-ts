[**@0xintuition/sdk**](../README.md)

---

[@0xintuition/sdk](../README.md) / calculateCounterTripleId

# Function: calculateCounterTripleId()

> **calculateCounterTripleId**(`tripleId`): `` `0x${string}` ``

Defined in: [packages/sdk/src/utils/calculate-counter-triple-id.ts:9](https://github.com/0xIntuition/intuition-ts/blob/bce09de32d88cea435aa3e46e7756b0a862fcd9b/packages/sdk/src/utils/calculate-counter-triple-id.ts#L9)

Computes a counter triple ID by hashing a triple ID with COUNTER_SALT.

## Parameters

### tripleId

`` `0x${string}` ``

Triple ID to counter.

## Returns

`` `0x${string}` ``

Keccak256 hash representing the counter triple ID.
