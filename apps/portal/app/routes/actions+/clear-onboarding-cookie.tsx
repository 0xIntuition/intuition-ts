import { ActionFunctionArgs, json } from '@remix-run/node'
import { onboardingModalCookie } from '@server/onboarding'

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  if (formData.get('action') === 'clearOnboardingCookie') {
    return json(
      { success: true },
      {
        headers: {
          'Set-Cookie': await onboardingModalCookie.serialize(
            {},
            {
              expires: new Date(0),
              maxAge: 0,
            },
          ),
        },
      },
    )
  }
  return json({ success: false })
}
