import { redirect } from '@remix-run/node'
import { PATHS } from 'consts'

export async function loader() {
  return redirect(PATHS.GLOBAL_ACTIVITY)
}
