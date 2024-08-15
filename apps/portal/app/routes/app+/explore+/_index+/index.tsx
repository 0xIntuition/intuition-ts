import { redirect } from '@remix-run/node'
import { PATHS } from 'app/consts'

export async function loader() {
  return redirect(PATHS.EXPLORE_IDENTITIES)
}
