import { redirect } from '@remix-run/node'
import { logout } from '@server/auth'

export async function loader() {
  return redirect('/')
}

export async function action() {
  return logout({ redirectTo: '/login' })
}
