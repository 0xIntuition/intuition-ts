import { useState } from 'react'

import { TurnstileWidget } from '@components/turnstile-widget'
import {
  json,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from '@remix-run/node'
import { Form, useActionData, useLoaderData } from '@remix-run/react'
import { verifyTurnstileToken } from '@server/turnstile'

export async function loader({}: LoaderFunctionArgs) {
  return json({ siteKey: process.env.TURNSTILE_SITE_KEY ?? null })
}

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData()
  const token = form.get('turnstile_token') as string | null
  const verified = token
    ? await verifyTurnstileToken(
        token,
        request.headers.get('CF-Connecting-IP') ?? undefined,
      )
    : false
  return json({ verified })
}

export default function TurnstileTest() {
  const { siteKey } = useLoaderData<typeof loader>()
  const actionData = useActionData<typeof action>()
  const [token, setToken] = useState<string | null>(null)

  if (!siteKey) {
    return (
      <p className="m-10 text-red-600">
        TURNSTILE_SITE_KEY env variable is not set. Add it to your .env file.
      </p>
    )
  }

  return (
    <div className="mx-auto mt-10 max-w-md space-y-6 p-4 text-center">
      <h1 className="text-2xl font-bold">Turnstile CAPTCHA Demo</h1>

      <Form method="post" className="space-y-4">
        <TurnstileWidget siteKey={siteKey} onSuccess={setToken} />
        <input type="hidden" name="turnstile_token" value={token ?? ''} />
        <button
          type="submit"
          disabled={!token}
          className="w-full rounded bg-blue-600 px-4 py-2 font-semibold text-white disabled:opacity-50"
        >
          Submit
        </button>
      </Form>

      {actionData && (
        <p className={actionData.verified ? 'text-green-600' : 'text-red-600'}>
          {actionData.verified
            ? '✅ Verification passed'
            : '❌ Verification failed'}
        </p>
      )}
    </div>
  )
}
