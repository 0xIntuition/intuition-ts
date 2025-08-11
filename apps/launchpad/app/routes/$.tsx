import { LoaderFunction } from '@remix-run/node'
import { getMaintenanceMode } from '@lib/utils/maintenance'

// This is a catch-all route that handles all unmatched routes (404s)
export const loader: LoaderFunction = ({ request }) => {
  // Check maintenance mode first - this will redirect if enabled
  getMaintenanceMode(request)
  
  // If not in maintenance mode, throw a 404
  throw new Response('Not Found', { status: 404 })
}