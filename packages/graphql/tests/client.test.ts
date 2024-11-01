import { describe, expect, it } from 'vitest'

import { createServerClient } from '../src/client'

// add userId back in when we need to add user auth for mutations
describe('GraphQL Client', () => {
  it('should create a client with correct headers', () => {
    const token = 'test-token'
    const graphqlClient = createServerClient({ token })

    expect(graphqlClient.requestConfig.headers).toEqual({
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    })
  })

  it('should create a client without headers when no params are provided', () => {
    const graphqlClient = createServerClient({})

    expect(graphqlClient.requestConfig.headers).toEqual({
      'Content-Type': 'application/json',
    })
  })
})
