import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@0xintuition/1ui'

import { PrivyVerifiedLinks } from '@client/privy-verified-links'
import logger from '@lib/utils/logger'
import { SessionContext } from '@middleware/session'
import { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

export async function loader({ context }: LoaderFunctionArgs) {
  const session = context.get(SessionContext)
  logger('[Profile-Loader] user:', session.get('user'))
  return { user: session.get('user') }
}

export default function Profile() {
  const { user } = useLoaderData<typeof loader>()
  const hasEnsName = user?.details?.ensName !== undefined

  logger('[Profile-clientside] user from loader:', user)

  return (
    <div className="m-8 flex flex-col items-center">
      <div className="flex flex-col gap-8">
        <pre>Profile Route</pre>
        <div className="flex items-center">
          <div className="flex items-center gap-1.5">
            <span>
              {hasEnsName
                ? user?.details?.ensName
                : user?.details?.wallet?.address}
            </span>
            <span>{hasEnsName ? user?.details?.wallet?.address : null}</span>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Accordion
            type="multiple"
            className="w-full"
            defaultValue={['verified-links']}
          >
            <AccordionItem value="verified-links">
              <AccordionTrigger>
                <span className="text-secondary-foreground text-sm font-normal">
                  Verified Links
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <PrivyVerifiedLinks />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  )
}
