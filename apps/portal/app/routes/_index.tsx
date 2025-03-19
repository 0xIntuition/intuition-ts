import { getMaintenanceMode } from '@lib/utils/maintenance'
import { redirect } from '@remix-run/node'
import { PATHS } from 'app/consts'

export async function loader() {
  getMaintenanceMode()
  return redirect(PATHS.HOME)
}

export default function Index() {
  return null
}
