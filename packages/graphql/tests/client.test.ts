import { describe, expect, it } from 'vitest'

import client from '../src/client'

describe('GraphQL Client', () => {
  it('should create a client with correct headers', () => {
    const token = 'test-token'
    const userId = 'test-user-id'
    const graphqlClient = client({ token, userId })

    expect(graphqlClient.requestConfig.headers).toEqual({
      authorization: `Bearer ${token}`,
      'x-hasura-user-id': userId,
    })
  })

  it('should create a client without headers when no params are provided', () => {
    const graphqlClient = client({})

    expect(graphqlClient.requestConfig.headers).toEqual({})
  })
})
