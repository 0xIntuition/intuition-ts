import { createCookie } from '@remix-run/node'

export const onboardingModalCookie = createCookie('onboarding-modal', {
  maxAge: 31_536_000,
})
