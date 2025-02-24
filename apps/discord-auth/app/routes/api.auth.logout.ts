import { type ActionFunctionArgs } from '@remix-run/node'

import { destroySession } from '../.server/session'

export async function action({ request }: ActionFunctionArgs) {
  return destroySession(request)
}
