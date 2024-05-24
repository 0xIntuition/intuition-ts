import { LoaderFunctionArgs } from '@remix-run/node'
import { PrivyVerifiedLinks } from '@client/privy-verified-links'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@0xintuition/1ui'

export async function loader({ request }: LoaderFunctionArgs) {}

export default function Profile() {
  return (
    <div className="m-8 flex flex-col items-center">
      <div className="flex flex-col gap-8">
        Profile Route
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
