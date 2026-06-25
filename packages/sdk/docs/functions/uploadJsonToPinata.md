[**@0xintuition/sdk**](../README.md)

---

[@0xintuition/sdk](../README.md) / uploadJsonToPinata

# Function: uploadJsonToPinata()

> **uploadJsonToPinata**(`apiToken`, `jsonData`): `Promise`\<[`PinataPinResponse`](../type-aliases/PinataPinResponse.md)\>

Defined in: [packages/sdk/src/external/upload-json-to-pinata.ts:21](https://github.com/0xIntuition/intuition-ts/blob/bce09de32d88cea435aa3e46e7756b0a862fcd9b/packages/sdk/src/external/upload-json-to-pinata.ts#L21)

Uploads a JSON payload to Pinata's pinJSONToIPFS endpoint.

## Parameters

### apiToken

`string`

Pinata JWT bearer token.

### jsonData

`unknown`

JSON-serializable payload to upload.

## Returns

`Promise`\<[`PinataPinResponse`](../type-aliases/PinataPinResponse.md)\>

Pinata response containing the IPFS hash and metadata.

## Throws

Error when the upload fails or the response is not ok.
