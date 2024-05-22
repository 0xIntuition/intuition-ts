import { calculateTotalPages } from '@lib/utils/misc'
import { LoaderFunctionArgs, json } from '@remix-run/node'
import { getIdentities } from '@server/identity'
import type { Identity } from '@types/identity'
import { PrivyVerifiedLinks } from '@client/privy-verified-links'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@0xintuition/1ui'

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)

  // pagination
  const sortBy = searchParams.get('sortBy') ?? 'assets_sum'
  const direction = searchParams.get('direction') ?? 'desc'
  const page = searchParams.get('page')
    ? parseInt(searchParams.get('page') as string)
    : 1
  const limit = searchParams.get('limit') ?? '10'

  // search
  const search = url.searchParams.get('search') || ''

  const { data: identities, total } = (await getIdentities(request, {
    page,
    limit: Number(limit),
    sortBy,
    direction,
    search,
  })) as {
    data: Identity[]
    total: number
  }

  const totalPages = calculateTotalPages(total, Number(limit))

  return json({
    identities: identities ?? [],
    sortBy,
    direction,
    search,
    pagination: { page: Number(page), limit: Number(limit), total, totalPages },
  })
}

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
