// request.ts

import { supabase } from './supabase';
import crypto from 'crypto';
import { ensureLoadConfig } from '../config/config';
import { getSender } from './evm';
ensureLoadConfig();

const environment = process.env.ENVIRONMENT!;
const requestsTable = environment === 'dev' ? 'requests_dev' : 'requests';

/**
 * Interface representing the structure of a request in the database.
 */
export interface RequestData {
  hash: string;
  sender: string;
  status: 'pending' | 'processing' | 'fulfilled' | 'failed';
  type: 'createAtoms' | 'createTriples';
  created_at: string;
  updated_at: string;
  data: any;
  updates: any;
}

/**
 * Creates a new request in the 'requests' table.
 *
 * @param data - The data associated with the request.
 * @param sender - The sender identifier (e.g., email or user ID).
 * @param type - The type of the request ('createAtoms' or 'createTriples').
 * @returns The unique hash identifying the request.
 */
export async function createRequest(
  data: any,
  sender: string,
  type: 'createAtoms' | 'createTriples'
): Promise<string> {
  // Generate a unique hash for the request
  const hash = crypto
    .createHash('sha256')
    .update(JSON.stringify(data) + sender + Date.now().toString())
    .digest('hex');

  // Insert the new request into the 'requests' table
  const { error } = await supabase.from(requestsTable).insert([
    {
      hash,
      sender,
      status: 'pending',
      type,
      data,
      updates: [],
    },
  ]);

  if (error) {
    throw new Error(`Error creating request: ${error.message}`);
  }

  return hash;
}

/**
 * Updates an existing request with new data.
 *
 * @param hash - The unique hash of the request to update.
 * @param updates - An object containing the fields to update.
 */
export async function updateRequest(
  hash: string,
  updates: Partial<Omit<RequestData, 'hash' | 'sender' | 'created_at' | 'updated_at' | 'data' | 'type'>>
): Promise<void> {
  // Update the request with the provided updates
  const { error } = await supabase
    .from(requestsTable)
    .update(updates)
    .eq('hash', hash);

  if (error) {
    throw new Error(`Error updating request: ${error.message}`);
  }
}

export async function pushUpdate(hash: string, update: string): Promise<void> {
  let request = await getRequest(hash);
  request.updates.push(update);
  await updateRequest(hash, request);
}

/**
 * Retrieves a request from the 'requests' table by its hash.
 *
 * @param hash - The unique hash of the request to retrieve.
 * @param sender - (Optional) The sender identifier to verify ownership.
 * @returns The request data if found.
 */
export async function getRequest(
  hash: string
  // sender?: string
): Promise<RequestData> {
  let query = supabase
    .from(requestsTable)
    .select(
      'hash, sender, status, type, created_at, updated_at, data, updates'
    )
    .eq('hash', hash)
    .single();

  // If sender is provided, include it in the query for ownership verification
  // if (sender) {
  //   query = query.eq('sender', sender);
  // }

  const { data, error } = await query;

  if (error || !data) {
    throw new Error(
      `Request not found or access denied: ${error ? error.message : 'No data returned'
      }`
    );
  }

  return {
    hash: data.hash,
    sender: data.sender,
    status: data.status,
    type: data.type,
    created_at: data.created_at,
    updated_at: data.updated_at,
    data: data.data,
    updates: data.updates,
  };
}

export async function getMyRequests(limit: number = 100, offset: number = 0): Promise<RequestData[]> {
  const sender = await getSender();

  const { data, error } = await supabase
    .from(requestsTable)
    .select('*')
    .eq('sender', sender)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    throw new Error(`Error fetching requests: ${error.message}`);
  }

  return data as RequestData[];
}