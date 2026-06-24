import { pinThing } from '@0xintuition/sdk'

import { NextResponse } from 'next/server'

type ThingPayload = {
  name: string
  description?: string
  image?: string
  url?: string
}

function optionalString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value : undefined
}

function parseThingPayload(value: unknown): ThingPayload | undefined {
  if (!value || typeof value !== 'object') {
    return undefined
  }

  const record = value as Record<string, unknown>
  const name = optionalString(record.name)

  if (!name) {
    return undefined
  }

  return {
    name,
    description: optionalString(record.description),
    image: optionalString(record.image),
    url: optionalString(record.url),
  }
}

export async function POST(request: Request) {
  const pinApiKey = process.env.INTUITION_PIN_API_KEY

  if (!pinApiKey) {
    return NextResponse.json(
      { error: 'Server is missing INTUITION_PIN_API_KEY.' },
      { status: 500 },
    )
  }

  let requestBody: unknown

  try {
    requestBody = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  const thing = parseThingPayload(requestBody)

  if (!thing) {
    return NextResponse.json(
      { error: 'Thing payload requires a non-empty name.' },
      { status: 400 },
    )
  }

  try {
    const uri = await pinThing(thing, {
      pinApiKey,
      pinApiUrl: process.env.INTUITION_PIN_API_URL,
    })

    return NextResponse.json({ uri })
  } catch (error) {
    console.error('Failed to pin Thing data.', error)

    return NextResponse.json(
      { error: 'Failed to pin Thing data.' },
      { status: 502 },
    )
  }
}
