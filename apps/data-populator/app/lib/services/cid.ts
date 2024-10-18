/* eslint-disable @typescript-eslint/no-explicit-any */
import { CID } from 'multiformats/cid'
import * as raw from 'multiformats/codecs/raw'
import { sha256 } from 'multiformats/hashes/sha2'
import { Thing, WithContext } from 'schema-dts'

import { pushUpdate } from './request'

if (!process.env.PINATA_GATEWAY_KEY) {
  throw new Error('PINATA_GATEWAY_KEY is not set')
}

export async function precomputeCID<T extends Thing>(
  obj: WithContext<T>,
): Promise<string> {
  try {
    const json = JSON.stringify(obj)
    const blob = new Blob([json], { type: 'text/plain' })
    const uint8array = new Uint8Array(await blob.arrayBuffer())
    const bytes = raw.encode(uint8array)
    const hash = await sha256.digest(bytes)
    const cid = CID.create(1, raw.code, hash)
    return cid.toString()
  } catch (error) {
    console.log(error)
  }
  return ''
}

if (!process.env.IPFS_GATEWAY) {
  throw new Error('IPFS_GATEWAY is not set')
}

const ipfs = process.env.IPFS_GATEWAY
const gatewayToken = process.env.PINATA_GATEWAY_KEY

export async function checkCIDPinned(cid: string): Promise<boolean> {
  try {
    const response = await fetch(
      `${ipfs}/ipfs/${cid}?pinataGatewayToken=${gatewayToken}`,
    )
    return response.ok
  } catch (error) {
    console.log(error)
  }
  return false
}

export async function checkObjectPinned(
  obj: any,
  requestHash?: string,
): Promise<[boolean, string]> {
  try {
    const cid = await precomputeCID(obj)
    requestHash
      ? pushUpdate(
          requestHash,
          `Precomputed CID for atom data - checking if ${cid} is already pinned...`,
        )
      : null
    const pinned = await checkCIDPinned(cid)
    return [pinned, cid]
  } catch (error) {
    console.log(error)
  }
  return [false, '']
}

export async function getDataFromCID(cid: string): Promise<string> {
  try {
    const response = await fetch(
      `${ipfs}/ipfs/${cid}?pinataGatewayToken=${gatewayToken}`,
    )
    return await response.text()
  } catch (error) {
    console.log(error)
  }
  return ''
}
