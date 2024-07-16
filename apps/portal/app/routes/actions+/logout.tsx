import { redirect, type ActionFunctionArgs } from '@remix-run/node'
import { logout } from '@server/auth'

export async function loader() {
  return redirect('/')
}

export async function action({ request }: ActionFunctionArgs) {
  return logout({ request, redirectTo: '/login' })
}
