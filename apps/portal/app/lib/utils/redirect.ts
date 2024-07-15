import { invariant } from './misc'

const DEFAULT_REDIRECT_TO = "/"

export async function getRedirectToUrl(
  request: Request,
  path: string = DEFAULT_REDIRECT_TO,
  { redirectTo }: { redirectTo?: string | null } = {},
) {
  invariant(request, 'Request is required')
  const requestUrl = new URL(request.url)

  // Determine the redirectTo value
  redirectTo = redirectTo === null
    ? null
    : redirectTo ?? `${requestUrl.pathname}${requestUrl.search}`

  // Create URLSearchParams if redirectTo is not null
  const params = redirectTo ? new URLSearchParams({ redirectTo }) : null

  // Construct the final redirect URL
  const redirectUrl = [path, params?.toString()]
    .filter(Boolean)
    .join('?')

  return redirectUrl
}