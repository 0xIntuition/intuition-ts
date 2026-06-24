import { parse, type DocumentNode, type SelectionSetNode } from 'graphql'
import { GraphQLClient } from 'graphql-request'

import { API_URL_PROD, PIN_API_URL } from './constants'

export interface ClientConfig {
  headers: HeadersInit
  apiUrl?: string
}

export type ClientConfigInput = {
  apiUrl?: string
  pinApiUrl?: string
  pinApiKey?: string
}

type PinRequestConfig = {
  pinApiUrl?: string
  pinApiKey?: string
}

const DEFAULT_API_URL = API_URL_PROD
const DEFAULT_PIN_API_URL = PIN_API_URL

const PINNING_MUTATION_FIELDS = new Set([
  'pinOrganization',
  'pinPerson',
  'pinThing',
  'uploadImage',
  'uploadImageFromUrl',
  'uploadJsonToIpfs',
])

let globalConfig: ClientConfigInput = {
  apiUrl: DEFAULT_API_URL,
  pinApiUrl: DEFAULT_PIN_API_URL,
}

export function configureClient(config: ClientConfigInput) {
  globalConfig = { ...globalConfig, ...config }
}

export function getPinConfig(): Required<Pick<ClientConfigInput, 'pinApiUrl'>> &
  Pick<ClientConfigInput, 'pinApiKey'> {
  return {
    pinApiUrl: globalConfig.pinApiUrl ?? DEFAULT_PIN_API_URL,
    pinApiKey: globalConfig.pinApiKey,
  }
}

export function getClientConfig(token?: string): ClientConfig {
  return {
    headers: {
      ...(token && { authorization: `Bearer ${token}` }),
      'Content-Type': 'application/json',
    },
    apiUrl: globalConfig.apiUrl,
  }
}

export function createServerClient({ token }: { token?: string }) {
  const config = getClientConfig(token)
  if (!config.apiUrl) {
    throw new Error(
      'GraphQL API URL not configured. Call configureClient first.',
    )
  }
  return new GraphQLClient(config.apiUrl, config)
}

export const fetchParams = () => {
  return {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }
}

function selectionSetHasPinningMutationField(
  document: DocumentNode,
  selectionSet: SelectionSetNode,
  visitedFragments = new Set<string>(),
): boolean {
  for (const selection of selectionSet.selections) {
    if (
      selection.kind === 'Field' &&
      PINNING_MUTATION_FIELDS.has(selection.name.value)
    ) {
      return true
    }

    if (selection.kind === 'InlineFragment') {
      if (
        selectionSetHasPinningMutationField(
          document,
          selection.selectionSet,
          visitedFragments,
        )
      ) {
        return true
      }
    }

    if (selection.kind === 'FragmentSpread') {
      const fragmentName = selection.name.value
      if (visitedFragments.has(fragmentName)) {
        continue
      }

      visitedFragments.add(fragmentName)
      const fragment = document.definitions.find(
        (definition) =>
          definition.kind === 'FragmentDefinition' &&
          definition.name.value === fragmentName,
      )

      if (
        fragment?.kind === 'FragmentDefinition' &&
        selectionSetHasPinningMutationField(
          document,
          fragment.selectionSet,
          visitedFragments,
        )
      ) {
        return true
      }
    }
  }

  return false
}

export function isPinningOperation(query: string): boolean {
  try {
    const document = parse(query)
    const operation = document.definitions.find(
      (definition) => definition.kind === 'OperationDefinition',
    )

    if (
      operation?.kind !== 'OperationDefinition' ||
      operation.operation !== 'mutation'
    ) {
      return false
    }

    return selectionSetHasPinningMutationField(document, operation.selectionSet)
  } catch {
    return false
  }
}

function toHeaderRecord(headers?: HeadersInit): Record<string, string> {
  if (!headers) {
    return {}
  }

  const headerRecord: Record<string, string> = {}
  const normalizedHeaders = new Headers(headers)
  normalizedHeaders.forEach((value, key) => {
    headerRecord[key] = value
  })

  return headerRecord
}

function getHeader(
  headers: Record<string, string>,
  headerName: string,
): string | undefined {
  return headers[headerName.toLowerCase()]
}

async function parseJsonResponse(res: Response) {
  try {
    return await res.json()
  } catch (error) {
    throw new Error(
      `GraphQL response was not valid JSON: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`,
    )
  }
}

export async function executeGraphQLRequest<TData, TVariables>(
  query: string,
  variables?: TVariables,
  options?: RequestInit['headers'],
  pinConfig?: PinRequestConfig,
): Promise<TData> {
  const isPinning = isPinningOperation(query)
  const extraHeaders = toHeaderRecord(options)
  const baseHeaders = fetchParams().headers

  const apiUrl = globalConfig.apiUrl ?? DEFAULT_API_URL
  const pinApiUrl =
    pinConfig?.pinApiUrl ?? globalConfig.pinApiUrl ?? DEFAULT_PIN_API_URL
  const pinApiKey =
    pinConfig?.pinApiKey ??
    getHeader(extraHeaders, 'apikey') ??
    globalConfig.pinApiKey

  if (isPinning && !pinApiKey) {
    throw new Error(
      'Pinning requires a pinApiKey. Call configureClient({ pinApiKey }) or pass an apikey header.',
    )
  }

  const res = await fetch(isPinning ? pinApiUrl : apiUrl, {
    method: 'POST',
    headers: {
      ...baseHeaders,
      ...extraHeaders,
      ...(isPinning && pinApiKey ? { apikey: pinApiKey } : {}),
    },
    body: JSON.stringify({ query, variables }),
  })

  const json = await parseJsonResponse(res)

  if (isPinning && !res.ok) {
    const message =
      json?.errors?.[0]?.message ??
      json?.message ??
      res.statusText ??
      'Unknown error'
    throw new Error(`Pinning request failed (${res.status}): ${message}`)
  }

  if (isPinning && json.errors?.length) {
    const { message } = json.errors[0]
    throw new Error(message)
  }

  if (json.errors && (!json.data || Object.keys(json.data).length === 0)) {
    const { message } = json.errors[0]
    throw new Error(message)
  }

  return json.data as TData
}

export function fetcher<TData, TVariables>(
  query: string,
  variables?: TVariables,
  options?: RequestInit['headers'],
) {
  return async () => {
    const isPinning = isPinningOperation(query)

    if (!isPinning && !globalConfig.apiUrl) {
      throw new Error(
        'GraphQL API URL not configured. Call configureClient first.',
      )
    }

    return executeGraphQLRequest<TData, TVariables>(query, variables, options)
  }
}
