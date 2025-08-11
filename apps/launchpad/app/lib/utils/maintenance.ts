import { PATHS } from '@consts/paths'
import { redirect } from '@remix-run/node'

export function getMaintenanceMode(request: Request) {
  const maintenanceMode = process.env.FF_FULL_LOCKDOWN_ENABLED === 'true'
  
  if (maintenanceMode) {
    const url = new URL(request.url)
    
    // Don't redirect if already on maintenance page to prevent loops
    if (url.pathname === PATHS.MAINTENANCE) {
      return
    }
    
    throw redirect(PATHS.MAINTENANCE)
  }
}