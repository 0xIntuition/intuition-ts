import pinataSDK from '@pinata/sdk'

if (!process.env.PINATA_JWT_KEY) {
  throw new Error('PINATA_JWT_KEY is not set')
}

const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_JWT_KEY })

export async function pinataPinJSON(obj: any): Promise<string> {
  const result = await pinata.pinJSONToIPFS(obj, {
    pinataOptions: { cidVersion: 0 },
  })
  return result.IpfsHash
}
