import { PIN_API_URL } from '@0xintuition/graphql'

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { configureSdk, pinThing } from '../src'

const thingVariables = {
  url: 'https://www.intuition.systems/',
  name: 'Intuition',
  description: 'A decentralized trust protocol',
  image: 'https://example.com/image.png',
}

function mockFetch(data: unknown) {
  const fetchMock = vi.fn(async () => {
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  })

  vi.stubGlobal('fetch', fetchMock)

  return fetchMock
}

describe('pinThing', () => {
  beforeEach(() => {
    configureSdk({ pinApiKey: undefined, pinApiUrl: undefined })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('uses the configured SDK pinApiKey', async () => {
    configureSdk({ pinApiKey: 'sdk-pin-key' })
    const fetchMock = mockFetch({
      data: { pinThing: { uri: 'ipfs://bafk-test' } },
    })

    const uri = await pinThing(thingVariables)

    expect(uri).toBe('ipfs://bafk-test')

    const [url, init] = fetchMock.mock.calls[0]
    const headers = new Headers(init?.headers as HeadersInit)

    expect(url).toBe(PIN_API_URL)
    expect(headers.get('apikey')).toBe('sdk-pin-key')
  })

  it('lets per-call pinApiKey override configured SDK pinApiKey', async () => {
    configureSdk({ pinApiKey: 'sdk-pin-key' })
    const fetchMock = mockFetch({
      data: { pinThing: { uri: 'ipfs://bafk-test' } },
    })

    await pinThing(thingVariables, { pinApiKey: 'per-call-key' })

    const [, init] = fetchMock.mock.calls[0]
    const headers = new Headers(init?.headers as HeadersInit)

    expect(headers.get('apikey')).toBe('per-call-key')
  })

  it('throws when no pinApiKey is configured or passed', async () => {
    const fetchMock = mockFetch({})

    await expect(pinThing(thingVariables)).rejects.toThrow('pinApiKey')
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('throws a clear error when the pin endpoint returns null data', async () => {
    configureSdk({ pinApiKey: 'sdk-pin-key' })
    mockFetch({ data: null })

    await expect(pinThing(thingVariables)).rejects.toThrow(
      'pinThing returned no URI',
    )
  })
})
