import { GraphQLClient } from 'graphql-request'

import { API_URL_PROD } from './constants'

export interface ClientConfig {
  headers: HeadersInit
  apiUrl?: string
}

const DEFAULT_API_URL = API_URL_PROD

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
