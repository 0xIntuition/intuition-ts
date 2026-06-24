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

type ExecuteRequestOptions = {
  headers?: RequestInit['headers']
  pinConfig?: PinRequestConfig
  isPinning?: boolean
}

type GraphQLResponse<TData> = {
  data?: TData
  errors?: Array<{ message?: string }>
  message?: string
}

const DEFAULT_API_URL = API_URL_PROD
const DEFAULT_PIN_API_URL = PIN_API_URL

// Keep in sync with mutations served by the gated pinning GraphQL endpoint.
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

function withoutHeader(
  headers: Record<string, string>,
  headerName: string,
): Record<string, string> {
  const sanitizedHeaders = { ...headers }
  delete sanitizedHeaders[headerName.toLowerCase()]
  return sanitizedHeaders
}

async function parseJsonResponse<TData>(
  res: Response,
): Promise<GraphQLResponse<TData>> {
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

async function parseErrorMessage(res: Response) {
  const fallback = res.statusText || 'Unknown error'

  try {
    const body = await res.text()
    if (!body) {
      return fallback
    }

    try {
      const json = JSON.parse(body) as GraphQLResponse<unknown>
      return json.errors?.[0]?.message ?? json.message ?? fallback
    } catch {
      return fallback
    }
  } catch {
    return fallback
  }
}

async function executeRequest<TData, TVariables>(
  query: string,
  variables?: TVariables,
  options: ExecuteRequestOptions = {},
): Promise<TData> {
  const {
    headers: headersInit,
    pinConfig,
    isPinning: isPinningOverride,
  } = options
  const isPinning = isPinningOverride ?? isPinningOperation(query)
  const extraHeaders = toHeaderRecord(headersInit)
  const requestHeaders = withoutHeader(extraHeaders, 'apikey')
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
      ...requestHeaders,
      ...(isPinning && pinApiKey ? { apikey: pinApiKey } : {}),
    },
    body: JSON.stringify({ query, variables }),
  })

  if (!res.ok) {
    const message = await parseErrorMessage(res)
    const requestType = isPinning ? 'Pinning request' : 'GraphQL request'
    throw new Error(`${requestType} failed (${res.status}): ${message}`)
  }

  const json = await parseJsonResponse<TData>(res)

  if (isPinning && json.errors?.length) {
    const { message } = json.errors[0]
    throw new Error(message)
  }

  if (
    json.errors?.length &&
    (!json.data || Object.keys(json.data).length === 0)
  ) {
    const { message } = json.errors[0]
    throw new Error(message)
  }

  return json.data as TData
}

export async function executeGraphQLRequest<TData, TVariables>(
  query: string,
  variables?: TVariables,
  options?: RequestInit['headers'],
  pinConfig?: PinRequestConfig,
): Promise<TData> {
  return executeRequest(query, variables, {
    headers: options,
    pinConfig,
  })
}

export function fetcher<TData, TVariables>(
  query: string,
  variables?: TVariables,
  options?: RequestInit['headers'],
) {
  const isPinning = isPinningOperation(query)

  return async () => {
    if (!isPinning && !globalConfig.apiUrl) {
      throw new Error(
        'GraphQL API URL not configured. Call configureClient first.',
      )
    }

    return executeRequest<TData, TVariables>(query, variables, {
      headers: options,
      isPinning,
    })
  }
}
