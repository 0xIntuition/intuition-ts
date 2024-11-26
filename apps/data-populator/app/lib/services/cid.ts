/* eslint-disable @typescript-eslint/no-explicit-any */
import { CID } from 'multiformats/cid'
import * as raw from 'multiformats/codecs/raw'
import { sha256 } from 'multiformats/hashes/sha2'
import { Thing, WithContext } from 'schema-dts'

import { pushUpdate } from './request'

if (!process.env.PINATA_GATEWAY_KEY) {
  throw new Error('PINATA_GATEWAY_KEY is not set')
}

export async function precomputeCIDs<T extends Thing>(
  objs: WithContext<T>[],
): Promise<string[]> {
  return await Promise.all(objs.map((obj) => precomputeCID(obj)))
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

async function fetchWithTimeout(
  url: string,
  timeout = 1000,
): Promise<Response> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      signal: controller.signal,
    })
    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)
    throw error
  }
}

export async function checkCIDPinned(cid: string): Promise<boolean> {
  try {
    const response = await fetchWithTimeout(
      `${ipfs}/ipfs/${cid}?pinataGatewayToken=${gatewayToken}`,
    )
    return response.ok
  } catch (error) {
    if ((error as DOMException).name === 'AbortError') {
      return false
    }
    console.log('THROWING, ERROR WAS NOT ABORT FROM TIMEOUT')
    throw error
  }
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
    requestHash ? pushUpdate(requestHash, `IPFS Gateway Error: ${error}`) : null
    console.log(error)
    // continue anyway, worst case scenario we pin the same thing twice
  }
  return [false, '']
}

export async function getDataFromCID(cid: string): Promise<string> {
  try {
    const response = await fetchWithTimeout(
      `${ipfs}/ipfs/${cid}?pinataGatewayToken=${gatewayToken}`,
    )
    return await response.text()
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      console.log('Request timed out')
      return ''
    }
    console.log(error)
    return ''
  }
}
