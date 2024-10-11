import pinataSDK from '@pinata/sdk'

import { checkObjectPinned } from './cid'
import { ensureLoadConfig } from '../config/config'
import { pushUpdate } from './request';

ensureLoadConfig();

if (!process.env.PINATA_JWT_KEY) {
  throw new Error('PINATA_JWT_KEY is not set')
}



const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_JWT_KEY })

export async function pinataPinJSON(obj: any, requestHash?: string): Promise<string> {
  const [alreadyPinned, cid] = await checkObjectPinned(obj, requestHash)
  if (alreadyPinned) {
    // console.log(`Already pinned: ${cid}`)
    requestHash ? pushUpdate(requestHash, `Already pinned: ${cid}`) : null;
    return cid
  }
  const result = await pinata.pinJSONToIPFS(obj, {
    pinataOptions: { cidVersion: 1 },
  })
  // console.log(`Pinned JSON: ${result.IpfsHash}`)
  requestHash ? pushUpdate(requestHash, `Pinned JSON: ${result.IpfsHash}`) : null;
  return result.IpfsHash
}