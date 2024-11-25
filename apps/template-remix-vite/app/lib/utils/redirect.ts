import { RedirectOptions } from 'app/types/navigation'

import { invariant } from './misc'

const DEFAULT_REDIRECT_TO = '/'

export async function getRedirectToUrl(
  request: Request,
  path: string = DEFAULT_REDIRECT_TO,
  options: RedirectOptions = {},
) {
  invariant(request, 'Request is required')
  const requestUrl = new URL(request.url)

  // Determine the redirectTo value
  const redirectTo =
    options.redirectTo === null
      ? null
      : options.redirectTo ?? `${requestUrl.pathname}${requestUrl.search}`

  // Create URLSearchParams if redirectTo is not null
  const params = redirectTo ? new URLSearchParams({ redirectTo }) : null

  // Construct the final redirect URL
  const redirectUrl = [path, params?.toString()].filter(Boolean).join('?')

  return redirectUrl
}
