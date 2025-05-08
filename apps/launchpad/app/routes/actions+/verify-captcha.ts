import { json, type ActionFunctionArgs } from '@remix-run/node'
import { verifyTurnstileToken } from '@server/turnstile'

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const token = formData.get('turnstile_token')

  if (typeof token !== 'string') {
    return json({ ok: false }, { status: 400 })
  }

  const ok = await verifyTurnstileToken(
    token,
    request.headers.get('CF-Connecting-IP') ?? undefined,
  )

  return json({ ok }, { status: ok ? 200 : 400 })
}
