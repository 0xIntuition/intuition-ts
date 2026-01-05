export type PinataPinResponse = {
  IpfsHash: string
  PinSize: number
  Timestamp: string // ISO date string
  ID: string
  Name: string | null
  NumberOfFiles: number
  MimeType: string
  GroupId: string | null
  Keyvalues: Record<string, string> | null
  isDuplicate: boolean
}

/**
 * Uploads a JSON payload to Pinata's pinJSONToIPFS endpoint.
 * @param apiToken Pinata JWT bearer token.
 * @param jsonData JSON-serializable payload to upload.
 * @returns Pinata response containing the IPFS hash and metadata.
 * @throws Error when the upload fails or the response is not ok.
 */
export async function uploadJsonToPinata(
  apiToken: string,
  jsonData: unknown,
): Promise<PinataPinResponse> {
  try {
    const res = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    })
    if (!res.ok) {
      throw new Error(`Pinata upload failed: ${res.statusText}`)
    }
    return res.json()
  } catch (error) {
    throw new Error(
      `Failed to upload JSON to Pinata: ${error instanceof Error ? error.message : 'Unknown error'}`,
    )
  }
}
