import { redirect } from '@remix-run/node'

export async function loader() {
  return redirect('/app/profile/data-created/identities')
}
