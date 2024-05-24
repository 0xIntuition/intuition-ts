import { LoaderFunctionArgs, json } from '@remix-run/node'

export async function loader({ request }: LoaderFunctionArgs) {
  return json({})
}

export default function App() {
  return (
    <div className="m-8 flex flex-col items-center gap-4">
      <div className="flex flex-col">App Route</div>
    </div>
  )
}
