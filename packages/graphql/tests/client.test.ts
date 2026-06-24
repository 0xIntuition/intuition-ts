import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  configureClient,
  createServerClient,
  fetcher,
  isPinningOperation,
} from '../src/client'
import { API_URL_PROD, PIN_API_URL } from '../src/constants'
import {
  PinThingDocument,
  useGetAccountsQuery,
  usePinThingMutation,
} from '../src/generated'

const thingVariables = {
  url: 'https://www.intuition.systems/',
  name: 'Intuition',
  description: 'A decentralized trust protocol',
  image: 'https://example.com/image.png',
}

const customNamedPinThingDocument = `
  mutation PinThing($name: String!) {
    pinThing(thing: { name: $name }) {
      uri
    }
  }
`

const anonymousPinThingDocument = `
  mutation {
    pinThing(thing: { name: "Intuition" }) {
      uri
    }
  }
`

const readQueryNamedPinThingDocument = `
  query pinThing {
    accounts(limit: 1) {
      id
    }
  }
`

const pinPersonDocument = `
  mutation PinPerson {
    pinPerson(person: { name: "Ada Lovelace" }) {
      uri
    }
  }
`

const pinOrganizationDocument = `
  mutation PinOrganization {
    pinOrganization(organization: { name: "Intuition" }) {
      uri
    }
  }
`

function mockFetch(data: unknown, status = 200) {
  const fetchMock = vi.fn(async () => {
    return new Response(JSON.stringify(data), {
      status,
      headers: { 'Content-Type': 'application/json' },
    })
  })

  vi.stubGlobal('fetch', fetchMock)

  return fetchMock
}

// add userId back in when we need to add user auth for mutations
describe('GraphQL Client', () => {
  beforeEach(() => {
    configureClient({
      apiUrl: API_URL_PROD,
      pinApiUrl: PIN_API_URL,
      pinApiKey: undefined,
    })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

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

  it('detects pinThing as a pinning operation', () => {
    expect(isPinningOperation(PinThingDocument)).toBe(true)
    expect(isPinningOperation(customNamedPinThingDocument)).toBe(true)
    expect(isPinningOperation(anonymousPinThingDocument)).toBe(true)
    expect(isPinningOperation(pinPersonDocument)).toBe(true)
    expect(isPinningOperation(pinOrganizationDocument)).toBe(true)
    expect(isPinningOperation(readQueryNamedPinThingDocument)).toBe(false)
  })

  it('routes generated pinThing fetchers to the pin endpoint with an apikey', async () => {
    configureClient({ pinApiKey: 'test-pin-key' })
    const fetchMock = mockFetch({
      data: { pinThing: { uri: 'ipfs://bafk-test' } },
    })

    const data = await usePinThingMutation.fetcher(thingVariables)()

    expect(data.pinThing?.uri).toBe('ipfs://bafk-test')
    expect(fetchMock).toHaveBeenCalledTimes(1)

    const [url, init] = fetchMock.mock.calls[0]
    const headers = new Headers(init?.headers as HeadersInit)

    expect(url).toBe(PIN_API_URL)
    expect(headers.get('apikey')).toBe('test-pin-key')
    expect(JSON.parse(init?.body as string)).toEqual({
      query: PinThingDocument,
      variables: thingVariables,
    })
  })

  it('does not require the read API URL when routing generated pinThing fetchers', async () => {
    configureClient({ apiUrl: undefined, pinApiKey: 'test-pin-key' })
    const fetchMock = mockFetch({
      data: { pinThing: { uri: 'ipfs://bafk-test' } },
    })

    await usePinThingMutation.fetcher(thingVariables)()

    const [url] = fetchMock.mock.calls[0]

    expect(url).toBe(PIN_API_URL)
  })

  it('routes custom-named pinThing mutations to the pin endpoint', async () => {
    configureClient({ pinApiKey: 'test-pin-key' })
    const fetchMock = mockFetch({
      data: { pinThing: { uri: 'ipfs://bafk-test' } },
    })

    const data = await fetcher<{ pinThing: { uri: string } }, { name: string }>(
      customNamedPinThingDocument,
      { name: 'Intuition' },
    )()

    expect(data.pinThing.uri).toBe('ipfs://bafk-test')

    const [url, init] = fetchMock.mock.calls[0]
    const headers = new Headers(init?.headers as HeadersInit)

    expect(url).toBe(PIN_API_URL)
    expect(headers.get('apikey')).toBe('test-pin-key')
  })

  it('routes anonymous pinThing mutations to the pin endpoint', async () => {
    configureClient({ pinApiKey: 'test-pin-key' })
    const fetchMock = mockFetch({
      data: { pinThing: { uri: 'ipfs://bafk-test' } },
    })

    await fetcher<{ pinThing: { uri: string } }, undefined>(
      anonymousPinThingDocument,
    )()

    const [url] = fetchMock.mock.calls[0]

    expect(url).toBe(PIN_API_URL)
  })

  it('allows generated pinThing fetchers to override the configured apikey with headers', async () => {
    configureClient({ pinApiKey: 'configured-key' })
    const fetchMock = mockFetch({
      data: { pinThing: { uri: 'ipfs://bafk-test' } },
    })

    await usePinThingMutation.fetcher(thingVariables, {
      apikey: 'override-key',
    })()

    const [, init] = fetchMock.mock.calls[0]
    const headers = new Headers(init?.headers as HeadersInit)

    expect(headers.get('apikey')).toBe('override-key')
  })

  it('throws before calling fetch when pinning is missing an apikey', async () => {
    const fetchMock = mockFetch({})

    await expect(usePinThingMutation.fetcher(thingVariables)()).rejects.toThrow(
      'pinApiKey',
    )
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('does not send apikey headers with generated read fetchers', async () => {
    configureClient({ pinApiKey: 'test-pin-key' })
    const fetchMock = mockFetch({ data: { accounts: [] } })

    await useGetAccountsQuery.fetcher({ limit: 1 })()

    expect(fetchMock).toHaveBeenCalledTimes(1)

    const [url, init] = fetchMock.mock.calls[0]
    const headers = new Headers(init?.headers as HeadersInit)

    expect(url).toBe(API_URL_PROD)
    expect(headers.get('apikey')).toBeNull()
  })
})
