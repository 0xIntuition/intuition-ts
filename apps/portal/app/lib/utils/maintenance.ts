import { PATHS } from '@consts/paths'
import { redirect } from '@remix-run/node'

export function getMaintenanceMode() {
  const maintenanceMode = process.env.FF_FULL_LOCKDOWN_ENABLED === 'true'
  if (maintenanceMode) {
    throw redirect(PATHS.MAINTENANCE)
  }
}
