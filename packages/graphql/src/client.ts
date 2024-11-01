import { GraphQLClient } from 'graphql-request'

export interface ClientConfig {
  headers: HeadersInit
}

export function getClientConfig(token?: string): ClientConfig {
  return {
    headers: {
      ...(token && { authorization: `Bearer ${token}` }),
      'Content-Type': 'application/json',
    },
  }
}

// add userId back in when we need to add user auth for mutations
export function createServerClient({ token }: { token?: string }) {
  return new GraphQLClient(
    'https://api.i7n.dev/v1/graphql',
    getClientConfig(token),
  )
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
    const res = await fetch('https://api.i7n.dev/v1/graphql', {
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
