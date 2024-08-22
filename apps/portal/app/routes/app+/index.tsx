import { PATHS } from '@consts/paths'
import { redirect } from '@remix-run/node'

export async function loader() {
  throw redirect(PATHS.HOME)
}

export default function App() {
  return (
    <div className="m-8 flex flex-col items-center gap-4">
      <div className="flex flex-col">App Route</div>
    </div>
  )
}
