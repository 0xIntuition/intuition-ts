import logger from '@lib/utils/logger'
import type { LoaderFunctionArgs } from '@remix-run/node'
import { emitter } from '@server/emitter'
import { eventStream } from 'remix-utils/sse/server'

function eventStreamListener(request: Request, eventName: string) {
  return eventStream(request.signal, (send, abort) => {
    const handler = () => {
      logger(`Event '${eventName}' was emitted at ${new Date().toISOString()}`)
      send({ data: Date.now().toString() })
    }

    request.signal.addEventListener('abort', abort)

    emitter.addListener(eventName, handler)

    return () => {
      emitter.removeListener(eventName, handler)
    }
  })
}

export async function loader({ request }: LoaderFunctionArgs) {
  return eventStreamListener(request, 'attest')
}
