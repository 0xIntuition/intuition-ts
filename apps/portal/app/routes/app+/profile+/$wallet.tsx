import { LoaderFunctionArgs } from '@remix-run/node'

export async function loader({ request }: LoaderFunctionArgs) {}

export default function PublicProfile() {
  return (
    <div className="m-8 flex flex-col items-center gap-4">
      <div className="flex flex-col">
        Public profile route test
        {/* <PrivyButton /> */}
      </div>
    </div>
  )
}
