import { EVMCallRequest, callAndConfirm, evmRead } from './evm'
import { ensureLoadConfig } from '../config/config'

import { BytesLike, ethers } from 'ethers'
import { getAtomID } from './offchain-store';

ensureLoadConfig();

const environment = process.env.ENVIRONMENT;
const rpc = environment === 'dev' ? process.env.EVM_RPC_DEV : process.env.EVM_RPC;
const attestorAddress = environment === 'dev' ? process.env.ATTEST_CONTRACT_ADDRESS_DEV : process.env.ATTEST_CONTRACT_ADDRESS;
const multivaultAddress = environment === 'dev' ? process.env.MULTIVAULT_CONTRACT_ADDRESS_DEV : process.env.MULTIVAULT_CONTRACT_ADDRESS;
const additionalStakeAtom = process.env.ADDITIONAL_STAKE_ATOM;
const additionalStakeTriple = process.env.ADDITIONAL_STAKE_TRIPLE;

if (!rpc || !attestorAddress || !additionalStakeAtom || !multivaultAddress || !additionalStakeTriple) {
  throw new Error('Missing required environment variables EVM_RPC, ATTEST_CONTRACT_ADDRESS, ADDITIONAL_STAKE_ATOM, MULTIVAULT_CONTRACT_ADDRESS, ADDITIONAL_STAKE_TRIPLE');
}

const atomValue = (BigInt(additionalStakeAtom as string) + BigInt(await getAtomCost())).toString();
const tripleValue = (BigInt(additionalStakeTriple as string) + BigInt(await getTripleCost())).toString();

console.log("RPC: ", rpc);
console.log("Atom cost: ", atomValue);
console.log("Triple cost: ", tripleValue);

function createAtomRequest(cid: string): EVMCallRequest {
  return {
    RPC: rpc as string,
    address: attestorAddress as string,
    fnDeclaration: ['function createAtom(bytes calldata atomUri) external payable returns (uint256)'],
    fnName: 'createAtom',
    args: [ethers.toUtf8Bytes(cid)],
    txParams: {
      gasLimit: 500000,
      value: atomValue,
    },
  };
}

export function batchCreateAtomRequest(cids: string[]): EVMCallRequest {
  const batchAtomValue = BigInt(atomValue) * BigInt(cids.length);
  return {
    RPC: rpc as string,
    address: attestorAddress as string,
    fnDeclaration: ['function batchCreateAtom(bytes[] calldata atomUris) external payable returns (uint256[])'],
    fnName: 'batchCreateAtom',
    args: [cids.map(cid => ethers.toUtf8Bytes(cid))],
    txParams: {
      gasLimit: 30000000,
      value: batchAtomValue,
    },
  };
}

export function batchCreateTripleRequest(subjectIds: string[], predicateIds: string[], objectIds: string[]): EVMCallRequest {
  const batchTripleValue = BigInt(tripleValue) * BigInt(subjectIds.length);
  return {
    RPC: rpc as string,
    address: attestorAddress as string,
    fnDeclaration: ['function batchCreateTriple(uint256[] subjectIds, uint256[] predicateIds, uint256[] objectIds) external payable returns (uint256[])'],
    fnName: 'batchCreateTriple',
    args: [subjectIds, predicateIds, objectIds],
    txParams: {
      gasLimit: 30000000,
      value: batchTripleValue,
    },
  };
}

function createTripleRequest(subjectId: string, predicateId: string, objectId: string): EVMCallRequest {
  return {
    RPC: rpc as string,
    address: attestorAddress as string,
    fnDeclaration: ['function createTriple(uint256 subjectId, uint256 predicateId, uint256 objectId) external payable returns (uint256)'],
    fnName: 'createTriple',
    args: [subjectId, predicateId, objectId],
    txParams: {
      gasLimit: 1000000,
      value: tripleValue,
    },
  };
}

function hashURI(uri: string): string {
  try {
    return ethers.keccak256(ethers.toUtf8Bytes(uri));
  } catch (error) {
    console.error('Error hashing URI:', error);
  }
  return uri;
}

function decodeURIHash(hash: string): string {
  try {
    return ethers.toUtf8String(hash);
  } catch (error) {
    console.error('Error decoding URI hash:', error);
  }
  return hash;
}

export function hashTriple(subjectId: string, predicateId: string, objectId: string): string {
  try {
    return ethers.solidityPackedKeccak256(['uint256', 'uint256', 'uint256'], [BigInt(subjectId), BigInt(predicateId), BigInt(objectId)]);
  } catch (error) {
    console.error('Error hashing triple:', error);
  }
  return "0";
}

// Do not call this directly, use the wrapper from atom-uri.ts
export async function getAtomIdFromURI(cid: string): Promise<string> {
  const call: EVMCallRequest = {
    RPC: rpc as string,
    address: multivaultAddress as string,
    fnName: 'atomsByHash',
    fnDeclaration: [
      'function atomsByHash(bytes32 calldata atomUri) external view returns (uint256)',
    ],
    args: [hashURI(cid)],
    txParams: {},
  }
  return ((await evmRead(call)) as BigInt).toString();
}

// Do not call this directly, use the wrapper from atom-uri.ts
export async function getAtomURIFromID(atomId: string): Promise<string> {
  const call: EVMCallRequest = {
    RPC: rpc as string,
    address: multivaultAddress as string,
    fnName: 'atoms',
    fnDeclaration: [
      'function atoms(uint256 atomId) external view returns (bytes)',
    ],
    args: [atomId],
    txParams: {},
  }
  return decodeURIHash(((await evmRead(call)) as BytesLike) as string);
}

export async function getTripleByHash(hash: string): Promise<string> {
  const call: EVMCallRequest = {
    RPC: rpc as string,
    address: multivaultAddress as string,
    fnName: 'triplesByHash',
    fnDeclaration: [
      'function triplesByHash(bytes32 calldata tripleHash) external view returns (uint256)',
    ],
    args: [hash],
    txParams: {},
  }
  return ((await evmRead(call)) as BigInt).toString();
}

export async function getAtomCost(): Promise<string> {
  const call: EVMCallRequest = {
    RPC: rpc as string,
    address: multivaultAddress as string,
    fnName: 'getAtomCost',
    fnDeclaration: [
      'function getAtomCost() external view returns (uint256)',
    ],
    args: [],
    txParams: {},
  }
  return ((await evmRead(call)) as BigInt).toString();
}

export async function getTripleCost(): Promise<string> {
  const call: EVMCallRequest = {
    RPC: rpc as string,
    address: multivaultAddress as string,
    fnName: 'getTripleCost',
    fnDeclaration: [
      'function getTripleCost() external view returns (uint256)',
    ],
    args: [],
    txParams: {},
  }
  return ((await evmRead(call)) as BigInt).toString();
}

export async function createAtom(cid: string): Promise<string> {
  const request = createAtomRequest(cid);
  const receipt = await callAndConfirm(request);
  return receipt;
}

export async function batchCreateAtoms(cids: string[]): Promise<string> {
  if (cids.length === 0) {
    console.log("No new atoms to create");
    return "0x0000000000000000000000000000000000000000";
  }
  const request = batchCreateAtomRequest(cids);
  const receipt = await callAndConfirm(request);
  return receipt;
}

export async function batchCreateTriples(subjectIds: string[], predicateIds: string[], objectIds: string[]): Promise<string> {
  if (subjectIds.length === 0) {
    console.log("No new triples to create");
    return "0x0000000000000000000000000000000000000000";
  }
  console.log("Formulating request for batch create triples");
  const request = batchCreateTripleRequest(subjectIds, predicateIds, objectIds);
  console.log("Calling and confirming request for batch create triples");
  const receipt = await callAndConfirm(request);
  return receipt;
}

export async function createTriple(subjectId: string, predicateId: string, objectId: string): Promise<string> {
  const request = createTripleRequest(subjectId, predicateId, objectId);
  const receipt = await callAndConfirm(request);
  return receipt;
}

export async function getOrCreateAtom(uri: string) {
  let atomId = await getAtomID(uri);
  console.log("Atom ID for URI ", uri, " is ", atomId);
  if (atomId !== "0") {
    console.log("Atom found, ID: ", atomId);
    return [atomId];
  } else {
    console.log(`Creating atom: ${uri}`);
    const txId = await createAtom(uri);
    console.log("Transaction ID: ", txId);
    atomId = await getAtomID(uri);
    console.log("New Atom ID for URI ", uri, " is ", atomId);
    return [atomId, txId];
  }
}

// Should the logic calling this be refactored to take the ID?  Or would it be thrown away in scope?
export async function checkAtomExists(uri: string) {
  const atomId = await getAtomID(uri);
  return atomId !== "0";
}

export async function getOrCreateTriple(subjectId: string, predicateId: string, objectId: string) {
  const tripleHash = hashTriple(subjectId, predicateId, objectId);
  const tripleId = await getTripleByHash(tripleHash) as string;
  console.log("TRIPLE ID IN GET OR CREATE TRIPLE: ", tripleId);
  if (tripleId !== "0") {
    return [tripleId];
  } else {
    console.log(`Creating triple: ${subjectId}, ${predicateId}, ${objectId}`);
    const txId = await createTriple(subjectId, predicateId, objectId);
    console.log("Transaction ID: ", txId);
    const tripleId = await getTripleByHash(tripleHash);
    return [tripleId, txId];
  }
}

// Todo: use this to ensure triple does not exist before submitting it in batch call
// Also decide to return ID or boolean - see comment above for checkAtomExists
// Don't call this, use the wrapper from atom-uri.ts
export async function getTripleId(subjectId: string, predicateId: string, objectId: string) {
  const tripleHash = hashTriple(subjectId, predicateId, objectId);
  const tripleId = await getTripleByHash(tripleHash);
  return tripleId;
}