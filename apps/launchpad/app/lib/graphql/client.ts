import { API_URL_DEV, API_URL_PROD } from '@consts/general'
import { GraphQLClient } from 'graphql-request'

// Safely access environment variables with fallback
const HASURA_POINTS_ENDPOINT =
  import.meta.env?.VITE_HASURA_POINTS_ENDPOINT ||
  process.env?.HASURA_POINTS_ENDPOINT

if (!HASURA_POINTS_ENDPOINT) {
  console.error('Environment variables not found:', {
    processEnv: process?.env?.HASURA_POINTS_ENDPOINT,
    importMetaEnv: import.meta?.env?.VITE_HASURA_POINTS_ENDPOINT,
    allEnv: import.meta?.env,
  })
  throw new Error(
    `Points API endpoint not defined. Environment check failed:
    - Process exists: ${typeof process !== 'undefined'}
    - Process.env available: ${!!process?.env}
    - import.meta.env available: ${!!import.meta?.env}
    Please ensure either HASURA_POINTS_ENDPOINT or VITE_HASURA_POINTS_ENDPOINT is set in your environment variables.`,
  )
}

export const pointsClient = new GraphQLClient(HASURA_POINTS_ENDPOINT)

export interface ClientConfig {
  headers: HeadersInit
  apiUrl?: string
}

const DEFAULT_API_URL =
  import.meta.env.VITE_DEPLOY_ENV === 'production' ? API_URL_PROD : API_URL_DEV

let globalConfig: { apiUrl?: string } = {
  apiUrl: DEFAULT_API_URL,
}

export function configureClient(config: { apiUrl: string }) {
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

export function fetcher<TData, TVariables>(
  query: string,
  variables?: TVariables,
  options?: RequestInit['headers'],
) {
  return async () => {
    if (!globalConfig.apiUrl) {
      throw new Error(
        'GraphQL API URL not configured. Call configureClient first.',
      )
    }

    const res = await fetch(globalConfig.apiUrl, {
      method: 'POST',
      ...fetchParams(),
      ...options,
      body: JSON.stringify({ query, variables }),
    })

    const json = await res.json()

    if (json.errors && (!json.data || Object.keys(json.data).length === 0)) {
      const { message } = json.errors[0]
      throw new Error(message)
    }

    return json.data as TData
  }
}
