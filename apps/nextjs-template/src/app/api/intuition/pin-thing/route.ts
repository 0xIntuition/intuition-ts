import { pinThing } from '@0xintuition/sdk'

import { NextResponse } from 'next/server'
import { z } from 'zod'

const optionalTrimmedString = (maxLength: number) =>
  z.preprocess(
    (value) =>
      typeof value === 'string' && value.trim() === '' ? undefined : value,
    z.string().trim().min(1).max(maxLength).optional(),
  )

const optionalUrl = z.preprocess(
  (value) =>
    typeof value === 'string' && value.trim() === '' ? undefined : value,
  z.string().trim().url().max(2048).optional(),
)

const thingPayloadSchema = z.object({
  name: z.string().trim().min(1).max(200),
  description: optionalTrimmedString(2000),
  image: optionalUrl,
  url: optionalUrl,
})

export async function POST(request: Request) {
  const pinApiKey = process.env.INTUITION_PIN_API_KEY

  if (!pinApiKey) {
    console.error('Server is missing INTUITION_PIN_API_KEY.')

    return NextResponse.json(
      { error: 'Server configuration error.' },
      { status: 500 },
    )
  }

  let requestBody: unknown

  try {
    requestBody = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  const parsedThing = thingPayloadSchema.safeParse(requestBody)

  if (!parsedThing.success) {
    return NextResponse.json(
      {
        error:
          'Thing payload requires a non-empty name and valid optional image/url values.',
      },
      { status: 400 },
    )
  }

  try {
    const uri = await pinThing(parsedThing.data, {
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
