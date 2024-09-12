import logger from '@lib/utils/logger'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

export async function loader() {
  const test = 'this is the readonly index loader running'
  logger('this is the readonly index loader running')

  return json({
    test,
  })
}

export default function ReadOnly() {
  const { test } = useLoaderData<typeof loader>()
  logger('test', test)

  return (
    <div className="m-8 flex flex-col items-center gap-4">
      <div className="flex flex-col">ReadOnly Route</div>
    </div>
  )
}
